import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { X, Copy, Check, Sparkles, Wand2, Building, Briefcase, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';

interface CoverLetterModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
}

export const CoverLetterModal: React.FC<CoverLetterModalProps> = ({ isOpen, language, onClose }) => {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');
  const [loadingStep, setLoadingStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'coverLetter' | 'bio'>('coverLetter');
  const [bioCopied, setBioCopied] = useState(false);
  
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

  const handleGenerate = async () => {
    if (!company || !role) return;
    
    setIsGenerating(true);
    setGeneratedText(null);
    setLoadingStep(1);

    const steps = [
      "Analizando perfil y skills de Ivan...",
      "Interpretando requerimientos del rol...",
      "Contrastando con proyectos del portfolio...",
      "Redactando versión final ultraprofesional..."
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        setLoadingStep(stepIndex + 1);
      }
    }, 800);

    try {
      const response = await fetch('/api/cover-letter/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, role, description })
      });
      const data = await response.json();
      
      clearInterval(interval);
      setLoadingStep(steps.length);
      
      setTimeout(() => {
        setIsGenerating(false);
        setGeneratedText(data.text);
      }, 500);

    } catch (error) {
      clearInterval(interval);
      setIsGenerating(false);
      setGeneratedText("Hubo un error al generar la cover letter. Por favor intenta nuevamente.");
    }
  };

  const handleCopy = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
      setCopied(true);
      confetti({ particleCount: 30, spread: 50 });
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReset = () => {
    setGeneratedText(null);
    setCompany('');
    setRole('');
    setDescription('');
    setLoadingStep(0);
  };

  if (!isOpen) return null;

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
                Generador IA de Cover Letter
              </h3>
              <p className="text-xs text-stone-400 font-sans">Redacción ultraprofesional a medida basada en el rol</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
          <button 
            onClick={() => setActiveTab('coverLetter')}
            className={`px-4 py-2 text-xs font-mono font-bold transition-colors ${activeTab === 'coverLetter' ? 'bg-[#0d4d4d] text-white' : 'text-stone-400 hover:bg-white/5'}`}
          >
            COVER LETTER IA
          </button>
          <button 
            onClick={() => setActiveTab('bio')}
            className={`px-4 py-2 text-xs font-mono font-bold transition-colors ${activeTab === 'bio' ? 'bg-[#0d4d4d] text-white' : 'text-stone-400 hover:bg-white/5'}`}
          >
            BIO PROFESIONAL
          </button>
        </div>

        {activeTab === 'coverLetter' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form Side */}
          <div className="space-y-4">
            <div>
              <label className="text-[#fcfaf7] text-xs font-mono uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#0d4d4d]" /> Empresa Destino
              </label>
              <input 
                type="text" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Ej. Mercado Libre, Globant"
                className="w-full p-2.5 bg-black/30 border border-white/10 focus:border-[#0d4d4d] text-sm text-white placeholder-stone-500 transition-colors"
                disabled={isGenerating || !!generatedText}
              />
            </div>
            
            <div>
              <label className="text-[#fcfaf7] text-xs font-mono uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#0d4d4d]" /> Puesto / Rol
              </label>
              <input 
                type="text" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Ej. Frontend Developer, React Engineer"
                className="w-full p-2.5 bg-black/30 border border-white/10 focus:border-[#0d4d4d] text-sm text-white placeholder-stone-500 transition-colors"
                disabled={isGenerating || !!generatedText}
              />
            </div>

            <div>
              <label className="text-[#fcfaf7] text-xs font-mono uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#0d4d4d]" /> Info Extra (Opcional)
              </label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Pega la descripción de la oferta o palabras clave..."
                rows={3}
                className="w-full p-2.5 bg-black/30 border border-white/10 focus:border-[#0d4d4d] text-sm text-white placeholder-stone-500 transition-colors resize-none"
                disabled={isGenerating || !!generatedText}
              />
            </div>

            {!generatedText && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={!company || !role || isGenerating}
                className={`w-full py-3 flex justify-center items-center gap-2 text-sm font-bold uppercase tracking-widest font-mono transition-colors ${
                  !company || !role || isGenerating ? 'bg-black/40 text-stone-500 border border-white/10 cursor-not-allowed' : 'bg-[#0d4d4d] text-white hover:bg-[#0a3a3a] border border-[#0d4d4d]'
                }`}
              >
                <Wand2 className="w-4 h-4" />
                {isGenerating ? 'Generando...' : 'Generar Carta de Presentación'}
              </motion.button>
            )}
            
            {generatedText && (
              <button
                onClick={handleReset}
                className="w-full py-3 border border-white/20 text-stone-300 text-xs font-mono uppercase tracking-widest hover:bg-white/5 transition-colors"
              >
                Generar Otra
              </button>
            )}
          </div>

          {/* Result Side */}
          <div className="bg-[#fcfaf7] text-[#1a1a1a] border border-[#1a1a1a]/20 flex flex-col relative min-h-[300px]">
            
            <AnimatePresence mode="wait">
              {!isGenerating && !generatedText && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-stone-400 space-y-3"
                >
                  <Sparkles className="w-8 h-8 opacity-20" />
                  <p className="text-sm">Completa los datos de la oferta para generar una carta de presentación ultraprofesional y a medida.</p>
                </motion.div>
              )}

              {isGenerating && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[#fcfaf7]/90 backdrop-blur"
                >
                  <div className="w-full max-w-[200px] space-y-4">
                    <div className="flex justify-between text-[10px] font-mono text-[#0d4d4d] uppercase font-bold tracking-widest">
                      <span>Procesando</span>
                      <span>{Math.round((loadingStep / 4) * 100)}%</span>
                    </div>
                    <div className="h-1 bg-stone-200 w-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-[#0d4d4d]" 
                        initial={{ width: 0 }} 
                        animate={{ width: `${(loadingStep / 4) * 100}%` }} 
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="text-xs text-[#666666] text-center italic h-4">
                      {loadingStep === 1 && "Analizando perfil de Ivan..."}
                      {loadingStep === 2 && "Interpretando requerimientos del rol..."}
                      {loadingStep === 3 && "Contrastando con proyectos del portfolio..."}
                      {loadingStep >= 4 && "Redactando versión final..."}
                    </div>
                  </div>
                </motion.div>
              )}

              {generatedText && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col h-full"
                >
                  <div className="flex items-center justify-between p-3 border-b border-[#1a1a1a]/10 bg-[#f0f4f4]">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#0d4d4d] font-bold">Resultado</span>
                    <button 
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 text-xs font-bold text-[#0d4d4d] hover:text-black transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? '¡Copiado!' : 'Copiar Texto'}
                    </button>
                  </div>
                  <div className="p-4 sm:p-5 overflow-y-auto max-h-[400px] text-xs sm:text-sm text-[#1a1a1a] whitespace-pre-line leading-relaxed font-sans">
                    {generatedText}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </div>
        ) : (
          <div className="bg-[#1a1a1a] p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
              <span className="text-xs font-mono text-stone-400 uppercase tracking-widest">
                {language === 'es' ? 'Presentación Ejecutiva' : 'Executive Overview'}
              </span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(
                    language === 'es' 
                    ? "Soy Iván Valdez, Desarrollador Full Stack con foco en la creación de productos digitales que resuelven problemas reales de negocio. Especializado en arquitecturas escalables, diseño de interfaces precisas (UI/UX) y rendimiento. Construyo puentes entre requerimientos complejos y soluciones tecnológicas elegantes, utilizando ecosistemas modernos." 
                    : "I am Iván Valdez, a Full Stack Developer focused on creating digital products that solve real business problems. Specialized in scalable architectures, precise interface design (UI/UX), and performance. I build bridges between complex requirements and elegant technological solutions using modern ecosystems."
                  );
                  setBioCopied(true);
                  setTimeout(() => setBioCopied(false), 2000);
                }}
                className="flex items-center gap-1.5 text-xs font-bold text-[#0d4d4d] hover:text-white transition-colors"
              >
                {bioCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {bioCopied ? (language === 'es' ? '¡Copiado!' : 'Copied!') : (language === 'es' ? 'Copiar Bio' : 'Copy Bio')}
              </button>
            </div>
            <p className="text-sm text-stone-200 leading-relaxed font-sans whitespace-pre-line">
              {language === 'es' ? (
                "Soy Iván Valdez, Desarrollador Full Stack con foco en la creación de productos digitales que resuelven problemas reales de negocio. Especializado en arquitecturas escalables, diseño de interfaces precisas (UI/UX) y rendimiento. Construyo puentes entre requerimientos complejos y soluciones tecnológicas elegantes, utilizando ecosistemas modernos."
              ) : (
                "I am Iván Valdez, a Full Stack Developer focused on creating digital products that solve real business problems. Specialized in scalable architectures, precise interface design (UI/UX), and performance. I build bridges between complex requirements and elegant technological solutions using modern ecosystems."
              )}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
