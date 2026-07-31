import React from 'react';
import { Project, Language } from '../types';
import { ArrowUpRight, Play, CheckCircle2, ShieldAlert, Wrench } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectCardProps {
  project: Project;
  language: Language;
  onSelectCaseStudy: (project: Project) => void;
  onOpenDemo: (demoType: Project['demoType']) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  language,
  onSelectCaseStudy,
  onOpenDemo,
}) => {
  const isEs = language === 'es';
  const isHero = project.priority === 'hero';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
      className={`border transition-all duration-300 flex flex-col justify-between p-6 sm:p-8 ${
        isHero
          ? 'lg:col-span-2 bg-[#f0f4f4] border-[#0d4d4d] hover:border-[#0d4d4d] hover:shadow-lg'
          : 'bg-white border-[#1a1a1a]/15 hover:border-[#0d4d4d]/80 hover:shadow-md'
      }`}
    >
      <div>
        {/* Top Header & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0d4d4d] bg-black/5 px-2.5 py-1">
            {project.typeBadge}
          </span>
          {isHero && (
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0d4d4d] flex items-center gap-1 border border-[#0d4d4d]/30 px-2.5 py-1 bg-white">
              <CheckCircle2 className="w-3 h-3 text-[#0d4d4d]" />
              {isEs ? 'Proyecto Principal' : 'Featured Product'}
            </span>
          )}
        </div>

        {/* Project Name & Tagline */}
        <h3 className="font-serif-editorial text-2xl sm:text-3xl font-normal text-[#1a1a1a] tracking-tight mb-1">
          {project.name}
        </h3>
        <p className="text-xs sm:text-sm font-medium text-[#666666] font-sans mb-4">
          {project.tagline}
        </p>

        {/* Core Content Grid */}
        <div className={`grid grid-cols-1 ${isHero ? 'md:grid-cols-2' : ''} gap-4 my-4 text-xs font-sans`}>
          {/* Problem */}
          <div className="p-4 bg-white/80 border border-[#1a1a1a]/10 space-y-1">
            <span className="font-mono font-bold text-[#1a1a1a] text-[10px] uppercase tracking-widest flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5 text-[#0d4d4d]" />
              {isEs ? 'Problema Operativo:' : 'Problem:'}
            </span>
            <p className="text-[#666666] leading-relaxed">
              {project.problemSummary}
            </p>
          </div>

          {/* My Contribution */}
          <div className="p-4 bg-white/80 border border-[#1a1a1a]/10 space-y-1">
            <span className="font-mono font-bold text-[#1a1a1a] text-[10px] uppercase tracking-widest flex items-center gap-1">
              <Wrench className="w-3.5 h-3.5 text-[#0d4d4d]" />
              {isEs ? 'Aporte Principal:' : 'Contribution:'}
            </span>
            <p className="text-[#666666] leading-relaxed">
              {project.myContribution}
            </p>
          </div>
        </div>

        {/* Target User */}
        <div className="mb-4 text-xs font-mono text-[#666666]">
          <strong className="text-[#1a1a1a]">{isEs ? 'Usuario Objetivo: ' : 'Target User: '}</strong>
          {project.targetUser}
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 my-4">
          {project.stack.map((tech, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="px-2.5 py-1 bg-black/5 text-[#1a1a1a] text-[10px] font-mono font-semibold uppercase tracking-wider"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-[#1a1a1a]/10 flex flex-wrap items-center justify-between gap-3">
        <motion.button
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onSelectCaseStudy(project)}
          className="px-4 py-2.5 btn-editorial-outline transition-all duration-150 flex items-center gap-1.5 shadow-xs hover:shadow-sm"
        >
          <span>{isEs ? 'Leer Caso de Estudio' : 'Read Case Study'}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#0d4d4d] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onOpenDemo(project.demoType)}
          className="px-4 py-2.5 btn-editorial-dark transition-all duration-150 flex items-center gap-1.5 shadow-xs hover:shadow-md"
        >
          <Play className="w-3 h-3 fill-current text-[#fcfaf7]" />
          <span>{isEs ? 'Probar Demo Interactiva' : 'Try Live Demo'}</span>
        </motion.button>
      </div>
    </motion.article>
  );
};
