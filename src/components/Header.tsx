import React from 'react';
import { FileText, Sparkles, Globe } from 'lucide-react';
import { Language } from '../types';
import { motion } from 'motion/react';
import { AutomationLogo } from './AutomationLogo';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  onOpenCvModal: () => void;
  onOpenPitchModal: () => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  onOpenCvModal,
  onOpenPitchModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#fcfaf7]/95 backdrop-blur-md border-b border-[#1a1a1a]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Animated Automation Wordmark */}
        <AutomationLogo />

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-[#1a1a1a]/70 font-sans">
          {[
            { href: '#proyectos', label: language === 'es' ? 'Proyectos' : 'Case Studies' },
            { href: '#proceso', label: language === 'es' ? 'Proceso' : 'Process' },
            { href: '#stack', label: language === 'es' ? 'Capacidades' : 'Capabilities' },
            { href: '#contacto', label: language === 'es' ? 'Contacto' : 'Contact' },
          ].map((item, idx) => (
            <motion.a
              key={idx}
              href={item.href}
              initial="initial"
              whileHover="hover"
              className="relative py-1 text-[#1a1a1a]/80 hover:text-[#0d4d4d] transition-colors"
            >
              <span>{item.label}</span>
              <motion.span
                variants={{
                  initial: { scaleX: 0 },
                  hover: { scaleX: 1 },
                }}
                transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0d4d4d] origin-left"
              />
            </motion.a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Language Toggle */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleLanguage}
            title="Cambiar Idioma / Switch Language"
            className="px-2.5 py-1.5 bg-transparent border border-[#1a1a1a]/20 hover:border-[#0d4d4d] text-[#1a1a1a] hover:text-[#0d4d4d] text-[11px] font-bold font-mono transition-all flex items-center gap-1"
          >
            <Globe className="w-3.5 h-3.5 text-[#0d4d4d]" />
            <span>{language.toUpperCase()}</span>
          </motion.button>

          {/* Pitches Kit Modal Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenPitchModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-transparent border border-[#1a1a1a]/20 hover:border-[#0d4d4d] text-[#1a1a1a] text-[11px] font-bold uppercase tracking-wider transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0d4d4d]" />
            <span>Pitches & Bio</span>
          </motion.button>

          {/* Download ATS CV Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenCvModal}
            className="flex items-center gap-1.5 px-4 py-1.5 btn-editorial-dark"
          >
            <FileText className="w-3.5 h-3.5 text-[#fcfaf7]" />
            <span>Descargar CV</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
};
