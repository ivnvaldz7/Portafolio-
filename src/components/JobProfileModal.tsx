import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { motion } from 'motion/react';
import { getCareerProfile } from '../data/cvData';
import { Language } from '../types';

interface JobProfileModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
}

export const JobProfileModal: React.FC<JobProfileModalProps> = ({ isOpen, language, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const profile = getCareerProfile(language);
  const isEs = language === 'es';

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) modalRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="job-profile-title" tabIndex={-1}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:p-6">
      <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
        className="w-full max-w-3xl bg-[#1a1a1a] p-6 text-[#fcfaf7] shadow-2xl sm:p-10">
        <header className="flex items-start justify-between gap-5 border-b border-white/15 pb-6">
          <div>
            <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#9bc5bd]">{isEs ? 'Carta de presentación profesional' : 'Professional introduction'}</p>
            <h1 id="job-profile-title" className="font-serif-editorial text-3xl sm:text-4xl">{profile.name}</h1>
            <p className="mt-2 text-sm font-semibold text-[#c8e0db]">{profile.title}</p>
          </div>
          <button type="button" onClick={onClose} aria-label={isEs ? 'Cerrar presentación profesional' : 'Close professional introduction'} className="p-2 text-stone-400 transition-colors hover:text-white"><X className="h-5 w-5" /></button>
        </header>
        <div className="mt-7 space-y-7 text-base leading-7 text-stone-200">
          <p>{profile.jobSearch}</p>
          <section aria-labelledby="principles-title" className="border-l-2 border-[#7fb4a8] pl-5">
            <h2 id="principles-title" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#9bc5bd]">{isEs ? 'Cómo trabajo' : 'How I work'}</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-300">
              {profile.principles.map((principle) => <li key={principle}>{principle}</li>)}
            </ul>
          </section>
          <p className="text-sm leading-6 text-stone-400">{isEs ? 'Esta presentación resume el perfil de búsqueda y está pensada para acompañar la revisión del portfolio y los proyectos seleccionados.' : 'This introduction summarizes the job-search profile and is intended to accompany a review of the portfolio and selected projects.'}</p>
        </div>
      </motion.article>
    </motion.div>
  );
};
