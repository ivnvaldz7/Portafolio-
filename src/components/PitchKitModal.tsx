import React, { useState, useEffect, useRef } from 'react';
import { PITCHES_DATA } from '../data/portfolioData';
import { Language } from '../types';
import { X, Copy, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';

interface PitchKitModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
}

export const PitchKitModal: React.FC<PitchKitModalProps> = ({ isOpen, language, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>('pitch-30');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPitch = PITCHES_DATA.find(p => p.id === activeTab) || PITCHES_DATA[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    confetti({ particleCount: 25, spread: 40 });
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <motion.div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 sm:p-6"
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
        className="w-full max-w-3xl bg-[#1a1a1a] text-[#fcfaf7] p-6 sm:p-8 border border-white/20 space-y-6"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#0d4d4d] text-[#fcfaf7]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-editorial text-xl font-normal text-[#fcfaf7]">
                Kit de Pitches & Postulación
              </h3>
              <p className="text-xs text-stone-400 font-sans">Guiones preparados para entrevistas, recruiters y perfil de LinkedIn</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-black/40 border border-white/10 text-xs font-mono">
          {PITCHES_DATA.map((p) => (
            <motion.button
              key={p.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab(p.id)}
              className={`px-3.5 py-2 transition-all flex items-center gap-2 ${
                activeTab === p.id
                  ? 'bg-[#0d4d4d] text-white font-bold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <span className="text-[10px] px-1.5 py-0.5 bg-black/30 text-white uppercase tracking-widest border border-white/10">
                {p.badge}
              </span>
              <span>{p.title}</span>
            </motion.button>
          ))}
        </div>

        {/* Content Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPitch.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-6 bg-[#fcfaf7] text-[#1a1a1a] border border-[#1a1a1a]/20 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-serif-editorial font-bold text-base text-[#1a1a1a]">
                {currentPitch.title}
              </h4>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleCopy(currentPitch.content, currentPitch.id)}
                className="px-4 py-2 btn-editorial-dark text-xs flex items-center gap-1.5"
              >
                {copiedId === currentPitch.id ? (
                  <>
                    <Check className="w-4 h-4 text-[#fcfaf7]" /> ¡Texto Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#fcfaf7]" /> Copiar al Portapapeles
                  </>
                )}
              </motion.button>
            </div>

            <p className="text-xs text-[#666666] italic border-b border-[#1a1a1a]/10 pb-3 font-sans">
              💡 {currentPitch.subtitle}
            </p>

            <div className="p-4 bg-white border border-[#1a1a1a]/15 text-xs sm:text-sm text-[#1a1a1a] whitespace-pre-line leading-relaxed font-sans">
              {currentPitch.content}
            </div>

            <div className="p-3 bg-[#f0f4f4] border border-[#0d4d4d] text-[#0d4d4d] text-xs font-mono">
              <strong>Recomendación de uso: </strong> {currentPitch.usageAdvice}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Close */}
        <div className="flex justify-end pt-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={onClose}
            className="px-5 py-2.5 bg-black/40 hover:bg-black/60 border border-white/20 text-[#fcfaf7] font-bold text-xs font-mono uppercase tracking-wider transition-all"
          >
            Cerrar Kit
          </motion.button>
        </div>

      </motion.div>
    </motion.div>
  );
};
