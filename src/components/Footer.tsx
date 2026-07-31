import React from 'react';
import { PERSONAL_INFO, ENGLISH_TRANSLATIONS } from '../data/portfolioData';
import { Language } from '../types';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const isEs = language === 'es';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1a1a1a] text-[#fcfaf7]/70 py-12 border-t border-white/10 text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="font-serif-editorial font-bold text-[#fcfaf7] text-base block">
              Estrategia de producto & Desarrollo Web
            </span>
            <p className="text-stone-400 text-xs mt-0.5 font-mono">
              React 19 • TypeScript • Vite • Tailwind CSS • Gemini API Grounding
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 bg-black/40 hover:bg-black/80 text-[#fcfaf7] transition-colors border border-white/10 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider font-bold"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#0d4d4d]" />
            <span>{isEs ? 'Volver Arriba' : 'Back to Top'}</span>
          </button>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[11px] text-stone-400 font-mono">
          <span>
            © {new Date().getFullYear()} — {PERSONAL_INFO.location}
          </span>
          <span>
            {isEs ? 'Diseño editorial sobrio y arquitectura de producto.' : 'Editorial product architecture.'}
          </span>
        </div>
      </div>
    </footer>
  );
};
