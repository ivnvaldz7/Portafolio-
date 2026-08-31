import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { motion } from 'motion/react';
import { getCareerProfile } from '../data/cvData';
import { Language } from '../types';

interface AtsCvModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
}

export const AtsCvModal: React.FC<AtsCvModalProps> = ({ isOpen, language, onClose }) => {
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
    <motion.div ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="cv-profile-title" tabIndex={-1}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:p-6">
      <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
        className="relative mx-auto my-4 w-full max-w-5xl bg-[#fcfaf7] text-[#1a1a1a] shadow-2xl">
        <header className="border-b border-[#1a1a1a]/15 px-6 py-6 sm:px-10 sm:py-8">
          <div className="flex items-start justify-between gap-5">
            <div className="max-w-3xl">
              <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#0d4d4d]">{isEs ? 'Perfil profesional' : 'Professional profile'}</p>
              <h1 id="cv-profile-title" className="font-serif-editorial text-3xl tracking-tight sm:text-5xl">{profile.name}</h1>
              <p className="mt-2 text-base font-semibold text-[#0d4d4d] sm:text-lg">{profile.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#666666]">{profile.availability} · {profile.location}</p>
            </div>
            <button type="button" onClick={onClose} aria-label={isEs ? 'Cerrar perfil profesional' : 'Close professional profile'} className="shrink-0 p-2 text-[#666666] transition-colors hover:text-[#1a1a1a]">
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-5 break-words font-mono text-xs text-[#4f4f4f]">{profile.contact.join('  ·  ')}</p>
        </header>

        <div className="grid gap-10 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(16rem,0.8fr)]">
          <div className="space-y-10">
            <section aria-labelledby="cv-summary-title">
              <h2 id="cv-summary-title" className="border-b border-[#1a1a1a]/15 pb-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#0d4d4d]">{isEs ? 'Posicionamiento profesional' : 'Professional positioning'}</h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-[#303030]">{profile.summary}</p>
            </section>
            <section aria-labelledby="cv-projects-title">
              <h2 id="cv-projects-title" className="border-b border-[#1a1a1a]/15 pb-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#0d4d4d]">{isEs ? 'Evidencia seleccionada' : 'Selected evidence'}</h2>
              <div className="mt-5 space-y-7">
                {profile.selectedProjects.map((project) => (
                  <article key={project.id} className="border-l-2 border-[#0d4d4d]/70 pl-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-lg font-bold">{project.name}</h3>
                      <span className="font-mono text-[11px] font-semibold text-[#0d4d4d]">{project.period}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-[#555555]">{project.role} · {project.focus}</p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-[#303030]">
                      {project.evidence.map((item) => <li key={item} className="flex gap-2"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#0d4d4d]" />{item}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
          </div>
          <aside className="space-y-8">
            <section aria-labelledby="cv-capabilities-title" className="bg-[#edf3f1] p-5 sm:p-6">
              <h2 id="cv-capabilities-title" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#0d4d4d]">{isEs ? 'Aptitudes principales' : 'Core capabilities'}</h2>
              <dl className="mt-5 space-y-5">
                {profile.capabilities.map((capability) => <div key={capability.title}><dt className="text-sm font-bold">{capability.title}</dt><dd className="mt-1 text-sm leading-6 text-[#4f4f4f]">{capability.description}</dd></div>)}
              </dl>
            </section>
            <section aria-labelledby="cv-learning-title">
              <h2 id="cv-learning-title" className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#0d4d4d]">{isEs ? 'Formación' : 'Learning'}</h2>
              <p className="mt-3 text-sm font-medium leading-6">{profile.education}</p>
              <p className="mt-2 text-sm leading-6 text-[#666666]">{profile.continuousLearning}</p>
            </section>
          </aside>
        </div>
      </motion.article>
    </motion.div>
  );
};
