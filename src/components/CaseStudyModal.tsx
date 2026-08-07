import React, { useEffect, useRef } from 'react';
import { Project, Language } from '../types';
import { X, ExternalLink, ShieldCheck, Cpu, ArrowLeft, Lightbulb, AlertTriangle, Layers, Play } from 'lucide-react';
import { ChecARDemo } from './InteractiveDemos/ChecARDemo';
import { FretLabsDemo } from './InteractiveDemos/FretLabsDemo';
import { ElFulboDemo } from './InteractiveDemos/ElFulboDemo';
import { AleBetDemo } from './InteractiveDemos/AleBetDemo';
import { motion } from 'motion/react';

interface CaseStudyModalProps {
  project: Project | null;
  language: Language;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, language, onClose }) => {
  if (!project) return null;

  const isEs = language === 'es';
  const { caseStudy } = project;
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, [project]);

  const renderDemoWidget = () => {
    switch (project.demoType) {
      case 'checar':
        return <ChecARDemo />;
      case 'fretlabs':
        return <FretLabsDemo />;
      case 'elfulbo':
        return <ElFulboDemo />;
      case 'alebet':
        return <AleBetDemo />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-end outline-none"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-4xl bg-[#fcfaf7] text-[#1a1a1a] min-h-full p-6 md:p-10 shadow-2xl border-l border-[#1a1a1a]/20 space-y-8 overflow-y-auto"
      >
        {/* Top Sticky Bar */}
        <div className="sticky top-0 z-10 -mt-6 -mx-6 p-4 bg-[#fcfaf7]/95 backdrop-blur-md border-b border-[#1a1a1a]/10 flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 btn-editorial-outline text-xs font-bold font-mono"
          >
            <ArrowLeft className="w-4 h-4 text-[#0d4d4d]" />
            <span>{isEs ? 'Volver al Portfolio' : 'Back to Portfolio'}</span>
          </motion.button>

          <span className="text-xs font-mono font-bold text-[#666666]">
            {isEs ? 'Caso de Estudio' : 'Case Study'} • {project.name}
          </span>

          <button
            onClick={onClose}
            className="p-2 text-[#666666] hover:text-[#1a1a1a] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Case Study Header */}
        <div className="space-y-3 pt-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0d4d4d] bg-black/5 px-2.5 py-1 inline-block">
            {project.typeBadge}
          </span>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#1a1a1a] tracking-tight">
            {project.name}: {isEs ? 'Caso de Estudio Completo' : 'Full Case Study'}
          </h2>
          <p className="text-sm text-[#666666] font-sans">
            {project.tagline}
          </p>
        </div>

        {/* Interactive Live Demo Embedded Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold font-mono text-[#1a1a1a] uppercase tracking-widest flex items-center gap-2">
            <Play className="w-3.5 h-3.5 text-[#0d4d4d] fill-current" />
            {isEs ? 'Simulación / Demo Interactiva del Producto' : 'Interactive Product Simulation / Demo'}
          </h3>
          {renderDemoWidget()}
        </div>

        {/* 1. Contexto & Problema */}
        <div className="p-6 bg-white border border-[#1a1a1a]/15 space-y-3">
          <h3 className="font-serif-editorial text-lg text-[#1a1a1a] font-normal flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#0d4d4d]" />
            {isEs ? '1. Contexto & Problema Operativo' : '1. Context & Operational Problem'}
          </h3>
          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-sans">
            {caseStudy.contextAndProblem}
          </p>
        </div>

        {/* 2. Usuarios Afectados & Restricciones Reales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white border border-[#1a1a1a]/15 space-y-2">
            <h4 className="text-xs font-bold text-[#1a1a1a] flex items-center gap-1.5 font-mono uppercase tracking-wider">
              👥 {isEs ? 'Usuarios Afectados' : 'Affected Users'}
            </h4>
            <p className="text-xs text-[#666666] leading-relaxed font-sans">
              {caseStudy.affectedUsers}
            </p>
          </div>

          <div className="p-5 bg-white border border-[#1a1a1a]/15 space-y-2">
            <h4 className="text-xs font-bold text-[#1a1a1a] flex items-center gap-1.5 font-mono uppercase tracking-wider">
              🛡️ {isEs ? 'Restricciones Reales de Negocio' : 'Real Business Constraints'}
            </h4>
            <ul className="space-y-1.5 text-xs text-[#666666] font-sans">
              {caseStudy.realConstraints.map((constraint, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#0d4d4d] font-bold">•</span>
                  <span>{constraint}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. Solución Desarrollada */}
        <div className="p-6 bg-white border border-[#1a1a1a]/15 space-y-3">
          <h3 className="font-serif-editorial text-lg text-[#1a1a1a] font-normal flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#0d4d4d]" />
            {isEs ? '3. Solución de Producto Desarrollada' : '3. Developed Product Solution'}
          </h3>
          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-sans">
            {caseStudy.developedSolution}
          </p>
        </div>

        {/* 4. Decisiones de Producto */}
        <div className="space-y-3">
          <h3 className="font-serif-editorial text-lg text-[#1a1a1a] font-normal flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[#0d4d4d]" />
            {isEs ? '4. Decisiones Clave de Producto & Trade-offs' : '4. Key Product Decisions & Trade-offs'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caseStudy.productDecisions.map((dec, idx) => (
              <div key={idx} className="p-5 bg-white border border-[#1a1a1a]/15 space-y-2">
                <h4 className="font-bold text-[#0d4d4d] text-xs font-mono uppercase tracking-wider">
                  {dec.title}
                </h4>
                <p className="text-xs text-[#1a1a1a] font-sans">{dec.description}</p>
                <p className="text-xs text-[#666666] italic font-sans">
                  <strong>{isEs ? 'Por qué:' : 'Why:'} </strong> {dec.reasoning}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Decisiones Técnicas */}
        <div className="space-y-3">
          <h3 className="font-serif-editorial text-lg text-[#1a1a1a] font-normal flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#0d4d4d]" />
            {isEs ? '5. Decisiones de Arquitectura & Código' : '5. Architecture & Code Decisions'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caseStudy.techDecisions.map((dec, idx) => (
              <div key={idx} className="p-5 bg-white border border-[#1a1a1a]/15 space-y-2">
                <h4 className="font-bold text-[#0d4d4d] text-xs font-mono uppercase tracking-wider">
                  {dec.title}
                </h4>
                <p className="text-xs text-[#1a1a1a] font-sans">{dec.description}</p>
                <p className="text-xs text-[#666666] italic font-sans">
                  <strong>{isEs ? 'Impacto:' : 'Impact:'} </strong> {dec.reasoning}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Resultado, Aprendizaje & Key Takeaway */}
        <div className="p-6 bg-[#0d4d4d] text-[#fcfaf7] space-y-3">
          <h3 className="font-serif-editorial text-lg font-normal flex items-center gap-2 text-white">
            <Layers className="w-5 h-5 text-emerald-300" />
            {isEs ? '6. Resultado, Aprendizaje & Conclusión de Producto' : '6. Result, Learning & Product Conclusion'}
          </h3>
          <p className="text-xs sm:text-sm text-[#fcfaf7]/90 leading-relaxed font-sans">
            {caseStudy.resultAndLearnings}
          </p>
          <div className="pt-2 border-t border-white/20 text-xs font-mono text-emerald-200">
            <strong>Key Takeaway: </strong> {caseStudy.keyTakeaway}
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#1a1a1a]/10">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 btn-editorial-outline text-xs font-mono flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#0d4d4d]" />
                <span>{isEs ? 'Repositorio GitHub' : 'GitHub Repository'}</span>
              </a>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={onClose}
            className="px-6 py-2.5 btn-editorial-dark text-xs"
          >
            {isEs ? 'Cerrar Caso de Estudio' : 'Close Case Study'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
