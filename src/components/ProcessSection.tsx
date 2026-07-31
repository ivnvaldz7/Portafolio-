import React from 'react';
import { WORK_PROCESS, ENGLISH_TRANSLATIONS } from '../data/portfolioData';
import { Language } from '../types';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ProcessSectionProps {
  language: Language;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ language }) => {
  const isEs = language === 'es';

  return (
    <section id="proceso" className="py-16 md:py-24 bg-[#fcfaf7] border-b border-[#1a1a1a]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl space-y-3"
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0d4d4d] bg-black/5 px-2.5 py-1 inline-block">
            {isEs ? 'Metodología de Trabajo' : 'Engineering Methodology'}
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#1a1a1a] tracking-tight">
            {isEs ? 'De la fricción operativa al producto desplegado' : ENGLISH_TRANSLATIONS.processTitle}
          </h2>
          <p className="text-[#666666] text-sm sm:text-base leading-relaxed font-sans">
            {isEs ? 'Un flujo transparente y riguroso diseñado para eliminar la incertidumbre y garantizar entregables útiles en producción.' : ENGLISH_TRANSLATIONS.processSubtitle}
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORK_PROCESS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-6 bg-white border border-[#1a1a1a]/15 flex flex-col justify-between space-y-4 hover:border-[#0d4d4d] transition-colors shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold font-mono text-[#0d4d4d]">
                    {step.number}
                  </span>
                  <div className="w-7 h-7 bg-[#fcfaf7] border border-[#1a1a1a]/10 flex items-center justify-center text-[#1a1a1a] font-mono text-xs">
                    <ArrowRight className="w-3.5 h-3.5 text-[#0d4d4d]" />
                  </div>
                </div>

                <h3 className="font-serif-editorial text-lg text-[#1a1a1a] font-normal">
                  {step.title}
                </h3>

                <p className="text-xs text-[#666666] leading-relaxed font-sans">
                  {step.fullDesc}
                </p>
              </div>

              {/* Deliverable Badge */}
              <div className="pt-3 border-t border-[#1a1a1a]/10 text-[10px] font-mono text-[#0d4d4d] flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0d4d4d] shrink-0 mt-0.5" />
                <span>
                  <strong className="uppercase font-bold">Entregable: </strong>
                  {step.keyDeliverable}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
