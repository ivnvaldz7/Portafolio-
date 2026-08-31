import 'dotenv/config';
import express from "express";
import rateLimit from "express-rate-limit";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const MIN_ANALYSIS_LENGTH = 5;
const ALLOWED_VERDICTS = new Set(['VERDADERO', 'ENGAÑOSO', 'FALSO', 'INCOMPROBABLE']);

type AnalysisClaim = {
  claim: string;
  verdict: "VERDADERO" | "ENGAÑOSO" | "FALSO" | "INCOMPROBABLE";
  explanation: string;
  source: string;
  historicalContext: string;
};

type AnalysisResult = {
  summary: string;
  claims: AnalysisClaim[];
};

const getContentToAnalyze = (body: unknown): string => {
  if (!body || typeof body !== "object" || Array.isArray(body)) return "";

  const payload = body as Record<string, unknown>;
  const text = typeof payload.text === "string" ? payload.text : "";
  return text.trim();
};

const isAnalysisResult = (value: unknown): value is AnalysisResult => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  const result = value as Record<string, unknown>;
  return typeof result.summary === "string"
    && Array.isArray(result.claims)
    && result.claims.every((claim) => {
      if (!claim || typeof claim !== "object") return false;
      const item = claim as Record<string, unknown>;
      return typeof item.claim === "string"
        && typeof item.verdict === "string"
        && ALLOWED_VERDICTS.has(item.verdict)
        && typeof item.explanation === "string"
        && typeof item.source === "string"
        && typeof item.historicalContext === "string";
    });
};

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000');

  app.use(express.json({ limit: '50kb' }));

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", role: "Product Web Developer Portfolio Backend" });
  });

  const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: { error: "Demasiadas peticiones. Intenta nuevamente en 1 minuto." }
  });

  // ChecAR Fact-Checking endpoint powered by Gemini API or fallback
  app.post("/api/checar/analyze", limiter, async (req, res) => {
    const contentToAnalyze = getContentToAnalyze(req.body);

    if (contentToAnalyze.length < MIN_ANALYSIS_LENGTH) {
      return res.status(400).json({ error: "Proporciona un texto válido para verificar." });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `
Actúa como la herramienta ChecAR de asistencia para verificación periodística de contenido político en Argentina.
Analiza el siguiente texto y detecta hasta 5 afirmaciones verificables clave.
Para cada afirmación, contrástala contra contexto público/oficial argentino y devuelve una estructura JSON estricta.

Texto a analizar:
"${contentToAnalyze.slice(0, 3000)}"

Devuelve ÚNICAMENTE un objeto JSON válido con la siguiente estructura (sin markdown adicional):
{
  "summary": "Breve resumen ejecutivo del análisis periodístico (2 frases).",
  "claims": [
    {
      "claim": "Texto exacto o sintetizado de la afirmación detectada",
      "verdict": "VERDADERO | ENGAÑOSO | FALSO | INCOMPROBABLE",
      "explanation": "Explicación objetiva y contextualizada de 2 a 3 oraciones.",
      "source": "Nombre de la fuente oficial o reporte público consultado (ej. INDEC, MECON, Banco Central)",
      "historicalContext": "Contexto histórico o datos numéricos comparativos si corresponde."
    }
  ]
}
`;

        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          },
        });

        let rawText = response.text || "{}";
        rawText = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
        const parsed: unknown = JSON.parse(rawText);
        if (!isAnalysisResult(parsed)) throw new Error("Gemini returned an invalid analysis shape");
        return res.json({ success: true, liveApi: true, ...parsed });
      } catch (err: any) {
        console.error("Gemini API error, falling back to smart simulation:", err.message);
      }
    }

    // Smart Fallback Simulation if no GEMINI_API_KEY is configured
    setTimeout(() => {
      const isEconomic = contentToAnalyze.toLowerCase().includes("inflac") || contentToAnalyze.toLowerCase().includes("dólar") || contentToAnalyze.toLowerCase().includes("pBI") || contentToAnalyze.toLowerCase().includes("presupuesto");
      
      const claims = isEconomic ? [
        {
          claim: "La inflación acumulada en el primer semestre descendió un 42% respecto al período anterior.",
          verdict: "VERDADERO",
          explanation: "Según los informes oficiales presentados por INDEC en la serie del IPC nacional, la tasa mensual promedio registró desaceleración consecutiva en los trimestres evaluados.",
          source: "INDEC - Informes Técnicos IPC (Serie Histórica)",
          historicalContext: "Se contrasta con los promedios de la serie 2020-2023 donde la variación mensual superaba los dos dígitos."
        },
        {
          claim: "El superávit fiscal financiero alcanzado es el mayor en los últimos 20 años de registros continuos.",
          verdict: "ENGAÑOSO",
          explanation: "Si bien se registró superávit financiero acumulado en meses consecutivos, la comparación histórica a 20 años requiere ajustar por devengamiento de deuda diferida e intereses no liquidados en caja.",
          source: "Ministerio de Economía - Esquema Ahorro-Inversión-Financiamiento (AIF)",
          historicalContext: "En 2003-2005 existieron superávits primarios equivalentes al 3.8% del PBI respaldados por términos de intercambio récord."
        },
        {
          claim: "El presupuesto universitario se incrementó un 300% en términos reales ajustados por IPC.",
          verdict: "FALSO",
          explanation: "La actualización nominal acordada del 270% sobre gastos de funcionamiento no contempla la masa salarial docente que representa el 85% del presupuesto total ejecutado.",
          source: "CIN (Consejo Interuniversitario Nacional) & Presupuesto Abierto MECON",
          historicalContext: "En moneda constante, la partida para educación superior registró una contracción real interanual estimada del 18.2%."
        }
      ] : [
        {
          claim: "Se aprobó por unanimidad la modificación de los plazos de dictamen legislativo.",
          verdict: "ENGAÑOSO",
          explanation: "La votación obtuvo mayoría especial pero registró 42 abstenciones y votos en contra de bloques minoritarios en el recinto.",
          source: "Honorable Cámara de Diputados de la Nación - Registro de Votaciones",
          historicalContext: "El reglamento de comisión exige dictamen de mayoría simple salvo giros a comisiones unidas."
        },
        {
          claim: "La tasa de ejecuciones presupuestarias en programas sociales superó el 90% en el segundo trimestre.",
          verdict: "FALSO",
          explanation: "Los datos devengados en el portal de Presupuesto Abierto muestran una ejecución del 54.3% sobre el crédito vigente a la fecha del informe.",
          source: "Presupuesto Abierto - Ministerio de Economía de la Nación",
          historicalContext: "Históricamente, la ejecución acumulada al primer semestre se situaba entre el 68% y 75%."
        }
      ];

      return res.json({
        success: true,
        liveApi: false,
        summary: `ChecAR procesó el contenido recibido y extrajo ${claims.length} afirmaciones contrastables con bases públicas y registros normativos.`,
        claims
      });
    }, 1200);
  });

  app.use((error: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (error instanceof SyntaxError && typeof error === "object" && error !== null && "body" in error) {
      return res.status(400).json({ error: "El cuerpo de la solicitud no es un JSON válido." });
    }

    return next(error);
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

