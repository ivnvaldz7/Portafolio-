import React from 'react';
import { Project, Language } from '../types';
import { ArrowUpRight, ExternalLink, Play, CheckCircle2, ShieldAlert, Wrench } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectCardProps {
  project: Project;
  language: Language;
  isFullWidth: boolean;
  onSelectCaseStudy: (project: Project) => void;
  onOpenDemo: (demoType: Project['demoType']) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  language,
  isFullWidth,
  onSelectCaseStudy,
  onOpenDemo,
}) => {
  const isEs = language === 'es';
  const isHero = project.priority === 'hero';
  const isConcept = project.status === 'in-progress';

  return (
    <motion.article
      aria-label={project.name}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
      className={`border transition-all duration-300 flex flex-col justify-between p-6 sm:p-8 ${
        isFullWidth ? 'lg:col-span-2' : ''
      } ${
        isConcept
          ? 'bg-[#f3f0f8] border-[#a994c6] hover:border-[#584472] hover:shadow-lg'
          : isHero
          ? 'bg-[#f0f4f4] border-[#0d4d4d] hover:border-[#0d4d4d] hover:shadow-lg'
          : 'bg-white border-[#1a1a1a]/15 hover:border-[#0d4d4d]/80 hover:shadow-md'
      }`}
    >
      <div>
        {/* Top Header & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 ${isConcept ? 'bg-[#e8e0f3] text-[#584472]' : 'bg-black/5 text-[#0d4d4d]'}`}>
            {project.typeBadge}
          </span>
          {isConcept && (
            <span className="border border-[#9d87bd] bg-white/80 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-[#584472]">
              {isEs ? 'En desarrollo · demo conceptual' : 'In progress · concept demo'}
            </span>
          )}
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
        <div className={`grid grid-cols-1 ${isHero || isFullWidth ? 'md:grid-cols-2' : ''} gap-4 my-4 text-xs font-sans`}>
          {/* Problem */}
          <div className="p-4 bg-white/80 border border-[#1a1a1a]/10 space-y-1">
            <span className="font-mono font-bold text-[#1a1a1a] text-[10px] uppercase tracking-widest flex items-center gap-1">
              <ShieldAlert className={`w-3.5 h-3.5 ${isConcept ? 'text-[#765b9b]' : 'text-[#0d4d4d]'}`} />
              {isEs ? 'Problema Operativo:' : 'Problem:'}
            </span>
            <p className="text-[#666666] leading-relaxed">
              {project.problemSummary}
            </p>
          </div>

          {/* My Contribution */}
          <div className="p-4 bg-white/80 border border-[#1a1a1a]/10 space-y-1">
            <span className="font-mono font-bold text-[#1a1a1a] text-[10px] uppercase tracking-widest flex items-center gap-1">
              <Wrench className={`w-3.5 h-3.5 ${isConcept ? 'text-[#765b9b]' : 'text-[#0d4d4d]'}`} />
              {isConcept ? (isEs ? 'Propuesta:' : 'Proposal:') : (isEs ? 'Aporte Principal:' : 'Contribution:')}
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
              className={`px-2.5 py-1 text-[#1a1a1a] text-[10px] font-mono font-semibold uppercase tracking-wider ${isConcept ? 'bg-[#e8e0f3]' : 'bg-black/5'}`}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-[#1a1a1a]/10 flex flex-wrap items-center justify-between gap-3">
        {(project.liveUrl || project.githubUrl) && (
          <a
            href={project.liveUrl || project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={project.liveUrl
              ? (isEs ? `Abrir aplicación real de ${project.name}` : `Open live application for ${project.name}`)
              : (isEs ? `Ver repositorio de ${project.name}` : `View repository for ${project.name}`)}
            className="px-4 py-2.5 btn-editorial-outline transition-all duration-150 flex items-center gap-1.5 shadow-xs hover:shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#0d4d4d]" />
            <span>{project.liveUrl ? (isEs ? 'Abrir App Real' : 'Open Live App') : (isEs ? 'Ver Repositorio' : 'View Repository')}</span>
          </a>
        )}
        <motion.button
          aria-label={isConcept ? (isEs ? `Explorar concepto de ${project.name}` : `Explore concept for ${project.name}`) : (isEs ? `Leer caso de estudio de ${project.name}` : `Read case study for ${project.name}`)}
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onSelectCaseStudy(project)}
          className={`px-4 py-2.5 transition-all duration-150 flex items-center gap-1.5 shadow-xs hover:shadow-sm ${isConcept ? 'border border-[#584472] bg-white text-[#584472] hover:bg-[#e8e0f3]' : 'btn-editorial-outline'}`}
        >
          <span>{isConcept ? (isEs ? 'Explorar concepto' : 'Explore concept') : (isEs ? 'Leer Caso de Estudio' : 'Read Case Study')}</span>
          <ArrowUpRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isConcept ? 'text-[#584472]' : 'text-[#0d4d4d]'}`} />
        </motion.button>

        {project.hasInteractiveDemo !== false && <motion.button
          aria-label={isConcept ? (isEs ? `Probar prototipo de ${project.name}` : `Try prototype for ${project.name}`) : (isEs ? `Ver muestra interactiva de ${project.name}` : `View interactive sample for ${project.name}`)}
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onOpenDemo(project.demoType)}
          className={`px-4 py-2.5 transition-all duration-150 flex items-center gap-1.5 shadow-xs hover:shadow-md ${isConcept ? 'bg-[#584472] text-white hover:bg-[#46355e]' : 'btn-editorial-dark'}`}
        >
          <Play className="w-3 h-3 fill-current text-[#fcfaf7]" />
          <span>{isConcept ? (isEs ? 'Probar prototipo' : 'Try prototype') : (isEs ? 'Ver Muestra Interactiva' : 'View Interactive Sample')}</span>
        </motion.button>}
      </div>
    </motion.article>
  );
};
