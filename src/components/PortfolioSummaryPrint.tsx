import React from 'react';
import { Language, Project } from '../types';
import { PERSONAL_INFO, STACK_MATRIX, WORK_PROCESS, ENGLISH_TRANSLATIONS } from '../data/portfolioData';

interface PortfolioSummaryPrintProps {
  language: Language;
  projects: Project[];
}

export const PortfolioSummaryPrint: React.FC<PortfolioSummaryPrintProps> = ({ language, projects }) => {
  const isEs = language === 'es';
  const processSteps = isEs ? WORK_PROCESS : ENGLISH_TRANSLATIONS.workProcess;
  const stackCategories = isEs ? STACK_MATRIX : ENGLISH_TRANSLATIONS.stackMatrix;
  const currentDate = new Date().toLocaleDateString(isEs ? 'es-AR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div id="portfolio-summary-print" className="cv-print-document hidden print:block text-[#1a1a1a] bg-white p-8 font-sans max-w-[210mm] mx-auto text-[11px] leading-relaxed">
      {/* Header */}
      <header className="border-b-2 border-[#0d4d4d] pb-4 mb-5">
        <div className="flex justify-between items-baseline">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#1a1a1a] tracking-tight">{PERSONAL_INFO.name}</h1>
            <p className="text-[#0d4d4d] font-semibold text-xs mt-0.5">{PERSONAL_INFO.roleTitle}</p>
          </div>
          <div className="text-right text-[10px] text-[#666666] font-mono">
            <p>{isEs ? 'Resumen Ejecutivo de Portafolio' : 'Executive Portfolio Summary'}</p>
            <p>{currentDate}</p>
          </div>
        </div>
        <p className="mt-2 text-[#444444] text-[11px] leading-normal">{PERSONAL_INFO.headline} {PERSONAL_INFO.subheadline}</p>
        <div className="mt-2.5 pt-2 border-t border-gray-200 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-[#555555]">
          <span>📧 {PERSONAL_INFO.contact.email}</span>
          <span>🔗 {PERSONAL_INFO.contact.linkedIn.replace('https://www.', '')}</span>
          <span>💻 {PERSONAL_INFO.contact.github.replace('https://', '')}</span>
          <span>📍 {PERSONAL_INFO.contact.location}</span>
        </div>
      </header>

      {/* Main Grid */}
      <div className="space-y-5">
        {/* Proyectos Destacados */}
        <section className="cv-section">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0d4d4d] border-b border-gray-300 pb-1 mb-3">
            {isEs ? 'Proyectos & Casos de Estudio' : 'Featured Projects & Case Studies'}
          </h2>
          <div className="space-y-3.5">
            {projects.map((project) => (
              <div key={project.id} className="cv-project border-l-2 border-[#0d4d4d]/60 pl-3">
                <div className="flex justify-between items-baseline gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#1a1a1a]">{project.name}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[#0d4d4d] font-medium">
                      {project.typeBadge}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#666666] shrink-0">{project.period}</span>
                </div>
                <p className="text-[10px] text-[#555555] font-medium mt-0.5">{project.role}</p>
                <p className="text-[10.5px] text-[#222222] mt-1">{project.tagline}</p>
                <div className="mt-1.5 text-[10px] text-[#333333]">
                  <strong>{isEs ? 'Problema resuelto:' : 'Problem solved:'}</strong> {project.problemSummary}
                </div>
                <div className="mt-1 text-[10px] text-[#333333]">
                  <strong>{isEs ? 'Aporte clave:' : 'Key contribution:'}</strong> {project.myContribution}
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {project.stack.map((tech) => (
                    <span key={tech} className="text-[9px] font-mono bg-gray-100 text-[#444444] px-1.5 py-0.2 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Metodología de Trabajo */}
        <section className="cv-section">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0d4d4d] border-b border-gray-300 pb-1 mb-2.5">
            {isEs ? 'Metodología de Trabajo & Enfoque Operativo' : 'Work Methodology & Operational Approach'}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {processSteps.map((step) => (
              <div key={step.number} className="bg-gray-50 border border-gray-200 p-2.5 rounded">
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#0d4d4d]">
                  <span>{step.number}.</span>
                  <span>{step.title}</span>
                </div>
                <p className="text-[10px] text-[#444444] mt-1 leading-snug">{step.shortDesc}</p>
                <p className="text-[9px] text-[#666666] font-mono mt-1.5">
                  <strong>{isEs ? 'Entregable:' : 'Deliverable:'}</strong> {step.keyDeliverable}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Matriz de Tecnologías y Competencias */}
        <section className="cv-section">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0d4d4d] border-b border-gray-300 pb-1 mb-2.5">
            {isEs ? 'Tecnologías & Competencias Principales' : 'Technologies & Core Competencies'}
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {stackCategories.map((cat, idx) => (
              <div key={idx} className="text-[10px]">
                <h3 className="font-bold text-[#1a1a1a] font-mono text-[10px] text-[#0d4d4d]">{cat.title}</h3>
                <p className="text-[#555555] text-[9.5px] mt-0.5">
                  {cat.items.map((item) => `${item.name} (${item.tag})`).join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-6 pt-3 border-t border-gray-300 flex justify-between items-center text-[9px] font-mono text-[#777777]">
        <span>{PERSONAL_INFO.name} — {isEs ? 'Portafolio Web interactivo disponible en línea' : 'Interactive Web Portfolio available online'}</span>
        <span>{isEs ? 'Actualizado en tiempo real' : 'Updated in real-time'}</span>
      </footer>
    </div>
  );
};
