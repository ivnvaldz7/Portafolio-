import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, FileSearch, LoaderCircle, Search, ShieldAlert } from 'lucide-react';
import { Language } from '../../types';
import type { PreviewResponse } from '../../lib/checarPreview';
import { MAX_PREVIEW_TEXT_LENGTH } from '../../lib/checarPreview';

const EXAMPLES = [
  {
    titleEs: 'Declaración pública',
    titleEn: 'Public statement',
    textEs: 'El comunicado afirma que la medida fue aprobada por unanimidad. También sostiene que el presupuesto aumentó un 20% respecto del año anterior.',
    textEn: 'The statement says the measure was approved unanimously. It also claims the budget rose 20% from the previous year.',
  },
  {
    titleEs: 'Nota periodística',
    titleEn: 'News article',
    textEs: 'La nota indica que el programa alcanzó a todas las provincias. Según el artículo, la inversión se duplicó en los últimos dos años.',
    textEn: 'The article says the program reached every province. According to the report, investment doubled over the last two years.',
  },
];

export const ChecARDemo: React.FC<{ language: Language; liveUrl?: string }> = ({ language, liveUrl }) => {
  const isEs = language === 'es';
  const reduceMotion = useReducedMotion();
  const [inputText, setInputText] = useState(isEs ? EXAMPLES[0].textEs : EXAMPLES[0].textEn);
  const [selectedExample, setSelectedExample] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PreviewResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const transition = { duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] as const };

  useEffect(() => {
    if (selectedExample === null) return;
    setInputText(isEs ? EXAMPLES[selectedExample].textEs : EXAMPLES[selectedExample].textEn);
    setResults(null);
  }, [isEs, selectedExample]);

  const handleAnalyze = async (text = inputText) => {
    if (loading || text.trim().length < 5) return;
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/checar/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        const message = data && typeof data === 'object' && 'error' in data ? String(data.error) : '';
        const fallback = response.status === 429
          ? (isEs ? 'Llegaste al límite de intentos. Probá de nuevo en un minuto.' : 'You reached the request limit. Try again in a minute.')
          : (isEs ? 'No se pudo preparar la muestra.' : 'Could not prepare the preview.');
        throw new Error(message || fallback);
      }
      if (!data || typeof data !== 'object' || !('mode' in data) || data.mode !== 'preview'
        || !('candidates' in data) || !Array.isArray(data.candidates)) {
        throw new Error(isEs ? 'La respuesta de la muestra no es válida.' : 'The preview response is invalid.');
      }
      setResults(data as PreviewResponse);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : (isEs ? 'Error de conexión.' : 'Connection error.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 shadow-xl font-sans">
      <div className="border-b border-slate-800 bg-slate-900/70 px-5 py-5 md:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-2 text-emerald-300"><FileSearch className="h-5 w-5" /></span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-semibold text-white">ChecAR</h3>
                <span className="rounded-full border border-emerald-400/30 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-emerald-300">
                  {isEs ? 'Vista previa interactiva' : 'Interactive preview'}
                </span>
              </div>
              <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-400">
                {isEs
                  ? 'Explorá cómo se separan fragmentos para investigar. El contraste con fuentes y los veredictos pertenecen a la aplicación completa.'
                  : 'Explore how passages are prepared for investigation. Source checks and verdicts belong to the full application.'}
              </p>
            </div>
          </div>
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-400/40 px-3 py-2 text-xs font-semibold text-emerald-200 transition-colors hover:bg-emerald-400/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300">
              {isEs ? 'Probar app completa' : 'Try full app'} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>

      <div className="space-y-5 p-5 md:p-6">
        <div className="space-y-2">
          <p className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
            {isEs ? 'Textos de ejemplo ficticios' : 'Fictional sample texts'}
          </p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((example, index) => (
              <button key={example.titleEs} type="button" disabled={loading} onClick={() => {
                setSelectedExample(index);
                setInputText(isEs ? example.textEs : example.textEn);
                setResults(null);
                setError(null);
              }} className={`rounded-lg border px-3 py-2 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 ${selectedExample === index ? 'border-emerald-400/60 bg-emerald-400/10 text-emerald-100' : 'border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-900'}`}>
                {isEs ? example.titleEs : example.titleEn}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label htmlFor="checar-preview-text" className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-300">
              {isEs ? 'Texto para explorar' : 'Text to explore'}
            </label>
            <span className="text-[11px] font-mono text-slate-500">{inputText.length}/{MAX_PREVIEW_TEXT_LENGTH}</span>
          </div>
          <textarea id="checar-preview-text" rows={4} maxLength={MAX_PREVIEW_TEXT_LENGTH} value={inputText} onChange={(event) => {
            setInputText(event.target.value);
            setSelectedExample(null);
            setResults(null);
            setError(null);
          }} className="w-full resize-y rounded-xl border border-slate-700 bg-slate-900 p-3 text-sm leading-relaxed text-slate-100 outline-none transition-colors placeholder:text-slate-500 focus:border-emerald-400" placeholder={isEs ? 'Pegá una declaración o un fragmento de una nota...' : 'Paste a statement or news excerpt...'} />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-500">{isEs ? 'La muestra identifica fragmentos; no realiza fact-checking.' : 'This preview finds passages; it does not fact-check.'}</p>
            <motion.button type="button" disabled={loading || inputText.trim().length < 5} onClick={() => handleAnalyze()} whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }} className="inline-flex min-w-40 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300">
              {loading ? <LoaderCircle className="h-4 w-4 motion-safe:animate-spin" /> : <Search className="h-4 w-4" />}
              {loading ? (isEs ? 'Preparando...' : 'Preparing...') : (isEs ? 'Explorar texto' : 'Explore text')}
            </motion.button>
          </div>
        </div>

        <div aria-live="polite" aria-busy={loading}>
          <AnimatePresence mode="wait" initial={false}>
            {loading ? (
              <motion.div key="loading" initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }} transition={transition} className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-xs text-slate-300">
                {isEs ? 'Preparando fragmentos para la vista previa…' : 'Preparing passages for the preview…'}
              </motion.div>
            ) : error ? (
              <motion.div key="error" role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={transition} className="flex items-start gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-200">
                <ShieldAlert className="h-4 w-4 shrink-0" /> {error}
              </motion.div>
            ) : results ? (
              <motion.div key="results" initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={transition} className="space-y-4">
                <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
                  <div className="mb-1 flex items-center justify-between gap-2 text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald-300">
                    <span>{isEs ? 'Resultado de la muestra' : 'Preview result'}</span>
                    <span>{results.candidates.length} {isEs ? 'fragmentos' : 'passages'}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-300">{isEs ? results.summary : `Found ${results.candidates.length} passages to review. This preview does not issue verdicts or consult sources.`}</p>
                </div>
                <div className="space-y-2">
                  {results.candidates.map((candidate, index) => (
                    <motion.div key={`${index}-${candidate}`} initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: reduceMotion ? 0 : index * 0.07 }} className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                      <span className="font-mono text-xs text-emerald-300">0{index + 1}</span>
                      <div className="min-w-0">
                        <p className="text-sm leading-relaxed text-slate-100">{candidate}</p>
                        <p className="mt-2 text-[11px] font-mono uppercase tracking-wider text-slate-500">{isEs ? 'Pendiente de contraste con fuentes' : 'Awaiting source verification'}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
