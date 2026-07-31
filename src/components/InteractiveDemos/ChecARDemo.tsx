import React, { useState } from 'react';
import { Search, Sparkles, CheckCircle2, AlertTriangle, XCircle, HelpCircle, ExternalLink, RefreshCw, Layers } from 'lucide-react';

interface ClaimResult {
  claim: string;
  verdict: 'VERDADERO' | 'ENGAÑOSO' | 'FALSO' | 'INCOMPROBABLE';
  explanation: string;
  source: string;
  historicalContext: string;
}

const SAMPLE_ARTICLES = [
  {
    title: "Declaración sobre Inflación acumulada y Precios INDEC",
    text: "El vocero oficial afirmó en conferencia de prensa que la inflación acumulada del primer semestre descendió un 42% respecto al período anterior y que el superávit fiscal financiero alcanzado es el mayor en los últimos 20 años de registros continuos del Ministerio de Economía."
  },
  {
    title: "Debate sobre Presupuesto Universitario y Masa Salarial",
    text: "Autoridades del área educativa remarcaron que el presupuesto universitario se incrementó un 300% en términos reales ajustados por IPC nacional, garantizando el funcionamiento de todas las casas de altos estudios públicas."
  }
];

export const ChecARDemo: React.FC = () => {
  const [inputText, setInputText] = useState(SAMPLE_ARTICLES[0].text);
  const [loading, setLoading] = useState(false);
  const [progressStep, setProgressStep] = useState<string>('');
  const [results, setResults] = useState<{ summary: string; claims: ClaimResult[]; liveApi?: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (textToUse?: string) => {
    const text = textToUse || inputText;
    if (!text || text.trim().length < 5) return;

    setLoading(true);
    setError(null);
    setResults(null);

    // Simulate real-time streaming progress steps
    const steps = [
      "Extrayendo texto con @mozilla/readability...",
      "Identificando afirmaciones verificables clave...",
      "Anclando búsquedas en fuentes oficiales (INDEC, MECON, BCRA)...",
      "Sintetizando veredictos con Gemini 2.0 Flash..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setProgressStep(steps[i]);
      await new Promise((r) => setTimeout(r, 450));
    }

    try {
      const response = await fetch('/api/checar/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (data.success) {
        setResults({
          summary: data.summary,
          claims: data.claims,
          liveApi: data.liveApi
        });
      } else {
        setError(data.error || 'Error al procesar el análisis.');
      }
    } catch (err: any) {
      console.error(err);
      setError('Error de conexión con el servidor de análisis.');
    } finally {
      setLoading(false);
      setProgressStep('');
    }
  };

  const getVerdictBadge = (verdict: ClaimResult['verdict']) => {
    switch (verdict) {
      case 'VERDADERO':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" /> VERDADERO
          </span>
        );
      case 'ENGAÑOSO':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 text-xs font-bold">
            <AlertTriangle className="w-3.5 h-3.5" /> ENGAÑOSO
          </span>
        );
      case 'FALSO':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 text-xs font-bold">
            <XCircle className="w-3.5 h-3.5" /> FALSO
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5" /> INCOMPROBABLE
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 md:p-6 shadow-2xl border border-slate-800 my-4 text-sm font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              ChecAR <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">Live Demo</span>
            </h3>
            <p className="text-xs text-slate-400">Verificación asistida con IA & Grounding de datos oficiales</p>
          </div>
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-2 font-mono">
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          <span>Gemini 2.0 Flash + Grounding</span>
        </div>
      </div>

      {/* Preset Selectors */}
      <div className="mt-4">
        <label className="text-xs font-semibold text-slate-300 block mb-2">
          Cargar artículo de prueba o pegar texto político:
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {SAMPLE_ARTICLES.map((art, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInputText(art.text);
                handleAnalyze(art.text);
              }}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg transition-colors text-left"
            >
              📄 {art.title}
            </button>
          ))}
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Pega aquí el texto de la noticia, discurso o publicación para verificar..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all font-mono"
          />
          <button
            type="button"
            disabled={loading}
            onClick={() => handleAnalyze()}
            className="mt-2 w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-xl transition-all shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-200" />
                <span>Analizando...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Ejecutar Análisis ChecAR</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading Progress Stream */}
      {loading && (
        <div className="mt-5 p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex items-center gap-3 animate-pulse">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs text-emerald-300 font-mono">{progressStep}</span>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="mt-4 p-3 bg-rose-950/50 border border-rose-800 rounded-xl text-rose-300 text-xs">
          {error}
        </div>
      )}

      {/* Results Section */}
      {results && !loading && (
        <div className="mt-6 space-y-4 animate-fade-in">
          {/* Executive Summary */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                Briefing Ejecutivo ChecAR
              </span>
              {results.liveApi && (
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded font-mono">
                  ● Respuesta en Vivo (Gemini 2.0 API)
                </span>
              )}
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">{results.summary}</p>
          </div>

          {/* Claims List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
              Afirmaciones Analizadas ({results.claims.length})
            </h4>

            {results.claims.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all space-y-2.5"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="font-semibold text-slate-100 text-xs leading-snug flex-1">
                    "{item.claim}"
                  </p>
                  <div>{getVerdictBadge(item.verdict)}</div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-850">
                  {item.explanation}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 pt-1 border-t border-slate-900 font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <ExternalLink className="w-3 h-3" />
                    Fuente: {item.source}
                  </span>
                  {item.historicalContext && (
                    <span className="text-slate-400 truncate max-w-full">
                      📊 Contexto: {item.historicalContext}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
