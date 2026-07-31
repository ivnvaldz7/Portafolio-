import React from 'react';
import { STACK_MATRIX, ENGLISH_TRANSLATIONS } from '../data/portfolioData';
import { Language } from '../types';
import { Cpu, Layout, Server, Sparkles, Cloud } from 'lucide-react';
import { motion } from 'motion/react';

interface StackSectionProps {
  language: Language;
}

export const StackSection: React.FC<StackSectionProps> = ({ language }) => {
  const isEs = language === 'es';

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Layout className="w-4 h-4 text-[#0d4d4d]" />;
      case 1:
        return <Cpu className="w-4 h-4 text-[#0d4d4d]" />;
      case 2:
        return <Server className="w-4 h-4 text-[#0d4d4d]" />;
      case 3:
        return <Sparkles className="w-4 h-4 text-[#0d4d4d]" />;
      default:
        return <Cloud className="w-4 h-4 text-[#0d4d4d]" />;
    }
  };

  return (
    <section id="stack" className="py-16 md:py-24 bg-[#fcfaf7] border-b border-[#1a1a1a]/10">
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
            {isEs ? 'Tecnología & Herramientas' : 'Technical Matrix'}
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#1a1a1a] tracking-tight">
            {isEs ? 'Capacidades agrupadas por dominio de producto' : ENGLISH_TRANSLATIONS.stackTitle}
          </h2>
          <p className="text-[#666666] text-sm sm:text-base leading-relaxed font-sans">
            {isEs ? 'Sin barras porcentuales ficticias. Cada tecnología seleccionada responde a una necesidad concreta de rendimiento, mantenibilidad y experiencia de usuario.' : ENGLISH_TRANSLATIONS.stackSubtitle}
          </p>
        </motion.div>

        {/* Stack Grid Grouped by Capability */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STACK_MATRIX.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="p-6 bg-white border border-[#1a1a1a]/15 space-y-4 hover:border-[#0d4d4d] transition-colors shadow-sm"
            >
              <div className="flex items-center gap-3 pb-3 border-b border-[#1a1a1a]/10">
                <div className="p-2 bg-[#fcfaf7] border border-[#1a1a1a]/10">
                  {getCategoryIcon(idx)}
                </div>
                <div>
                  <h3 className="font-serif-editorial font-bold text-[#1a1a1a] text-base">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-[#666666] font-sans">
                    {cat.subtitle}
                  </p>
                </div>
              </div>

              <ul className="space-y-3.5">
                {cat.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono font-bold">
                      <span className="text-[#1a1a1a]">{item.name}</span>
                      {item.tag && (
                        <span className="text-[10px] px-2 py-0.5 bg-black/5 text-[#0d4d4d] uppercase font-bold tracking-wider">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#666666] leading-snug font-sans">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
