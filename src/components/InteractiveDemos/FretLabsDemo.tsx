import { ExternalLink } from 'lucide-react';
import { Language } from '../../types';

interface FretLabsDemoProps {
  language: Language;
  liveUrl: string;
}

export function FretLabsDemo({ language, liveUrl }: FretLabsDemoProps) {
  const isEs = language === 'es';

  return (
    <section className="overflow-hidden border border-[#0d4d4d]/25 bg-white" aria-label={isEs ? 'Demo real de FretLabs' : 'Live FretLabs demo'}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#0d4d4d]/15 bg-[#f0f4f4] px-4 py-3">
        <div>
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0d4d4d]">
            {isEs ? 'Aplicación real' : 'Live application'}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[#315555]">
            {isEs
              ? 'Elegí un instrumento, ajustá la escala y observá cómo cambian el diapasón y sus medidas.'
              : 'Choose an instrument, adjust the scale, and watch the fretboard and measurements update.'}
          </p>
        </div>
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 border border-[#0d4d4d] px-3 py-2 text-xs font-mono font-bold text-[#0d4d4d] transition-colors hover:bg-[#0d4d4d] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d4d4d]"
        >
          {isEs ? 'Abrir pantalla completa' : 'Open full screen'}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
      <iframe
        title={isEs ? 'Aplicación interactiva FretLabs' : 'Interactive FretLabs application'}
        src={liveUrl}
        loading="lazy"
        className="block h-[680px] w-full border-0 sm:h-[740px]"
      />
    </section>
  );
}
