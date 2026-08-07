import React from 'react';
import { ArrowDownRight, FileText, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, ENGLISH_TRANSLATIONS } from '../data/portfolioData';
import { Language } from '../types';
import { motion } from 'motion/react';

interface HeroProps {
  language: Language;
  onOpenCvModal: () => void;
  onOpenPitchModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onOpenCvModal, onOpenPitchModal }) => {
  const isEs = language === 'es';

  return (
    <section id="top" className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#1a1a1a]/10 bg-[#fcfaf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-4xl space-y-8"
        >
          {/* Status & Secondary Descriptor Bar */}
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.4 }}
            className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono font-semibold uppercase tracking-wider text-[#0d4d4d]"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#0d4d4d] animate-pulse" />
              <span>{isEs ? PERSONAL_INFO.location : ENGLISH_TRANSLATIONS.availableBadge}</span>
            </div>
            <span className="text-[#666666] font-normal tracking-normal lowercase font-sans text-xs bg-black/5 px-2.5 py-1">
              {PERSONAL_INFO.secondaryDescriptor}
            </span>
          </motion.div>

          {/* Main Editorial Value Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal italic text-[#1a1a1a] tracking-tight leading-[1.08]"
          >
            {isEs ? PERSONAL_INFO.headline : ENGLISH_TRANSLATIONS.heroTitle}
          </motion.h1>

          {/* Editorial Subtitle / Core Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-base sm:text-lg text-[#666666] leading-relaxed font-sans max-w-2xl"
          >
            {isEs ? PERSONAL_INFO.subheadline : ENGLISH_TRANSLATIONS.heroSubtitle}
          </motion.p>

          {/* Target Roles Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="pt-2"
          >
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#666666] block mb-2.5">
              {isEs ? 'Roles Objetivo:' : ENGLISH_TRANSLATIONS.targetRolesLabel}
            </span>
            <div className="flex flex-wrap gap-2">
              {PERSONAL_INFO.targetRoles.map((role, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ scale: 1.05, backgroundColor: '#0d4d4d', color: '#ffffff' }}
                  transition={{ duration: 0.15 }}
                  className="px-3 py-1 bg-black/5 border border-black/10 text-[#1a1a1a] text-xs font-semibold font-mono cursor-default"
                >
                  {role}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="pt-4 flex flex-wrap items-center gap-3"
          >
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              href="#proyectos"
              className="px-6 py-3.5 btn-editorial-dark flex items-center gap-2"
            >
              <span>{isEs ? 'Ver Proyectos & Casos' : ENGLISH_TRANSLATIONS.ctaProjects}</span>
              <ArrowDownRight className="w-4 h-4 text-[#fcfaf7]" />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenCvModal}
              className="px-5 py-3.5 btn-editorial-outline flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#0d4d4d]" />
              <span>{isEs ? 'Descargar CV (ATS)' : ENGLISH_TRANSLATIONS.ctaCv}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenPitchModal}
              className="px-4 py-3.5 bg-transparent text-[#1a1a1a] hover:text-[#0d4d4d] font-bold text-xs uppercase tracking-wider underline underline-offset-4 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-[#0d4d4d]" />
              <span>{isEs ? 'Pitches & Bio' : ENGLISH_TRANSLATIONS.ctaPitch}</span>
            </motion.button>
          </motion.div>

          {/* Key Differentiators Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#1a1a1a]/10 font-sans text-xs"
          >
            <div className="flex items-start gap-3 text-[#666666]">
              <div className="w-1.5 h-1.5 bg-[#0d4d4d] shrink-0 mt-1.5" />
              <div>
                <strong className="block text-[#1a1a1a] font-bold uppercase tracking-wider text-[11px] font-mono mb-0.5">
                  {isEs ? 'Criterio de Producto' : 'Product Judgment'}
                </strong>
                <span>
                  {isEs
                    ? 'Priorización de estabilidad y valor real sobre complejidad innecesaria.'
                    : 'Prioritizing stability and real value over unnecessary complexity.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-[#666666]">
              <div className="w-1.5 h-1.5 bg-[#0d4d4d] shrink-0 mt-1.5" />
              <div>
                <strong className="block text-[#1a1a1a] font-bold uppercase tracking-wider text-[11px] font-mono mb-0.5">
                  {isEs ? 'Automatización de Procesos' : 'Process Automation'}
                </strong>
                <span>
                  {isEs
                    ? 'Reducción de trabajo manual repetitivo en logística, deportes y redacción.'
                    : 'Reducing repetitive manual work in logistics, sports, and reporting.'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-[#666666]">
              <div className="w-1.5 h-1.5 bg-[#0d4d4d] shrink-0 mt-1.5" />
              <div>
                <strong className="block text-[#1a1a1a] font-bold uppercase tracking-wider text-[11px] font-mono mb-0.5">
                  {isEs ? 'IA Aplicada con Grounding' : 'Grounded Applied AI'}
                </strong>
                <span>
                  {isEs
                    ? 'Uso pragmático de Gemini 2.0 con fuentes oficializadas y cero alucinaciones.'
                    : 'Pragmatic use of Gemini 2.0 with official sources and zero hallucinations.'}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
