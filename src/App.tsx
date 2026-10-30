import React, { lazy, Suspense, useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ValueProp } from './components/ValueProp';
import { ProjectCard } from './components/ProjectCard';
import { ProcessSection } from './components/ProcessSection';
import { StackSection } from './components/StackSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AtsCvModal } from './components/AtsCvModal';
import { PortfolioSummaryPrint } from './components/PortfolioSummaryPrint';
import { JobProfileModal } from './components/JobProfileModal';
import { ShareQrModal } from './components/ShareQrModal';
import { PROJECTS_DATA, ENGLISH_TRANSLATIONS } from './data/portfolioData';
import { PROJECTS_DATA_EN } from './data/portfolioDataEn';
import { Project, Language } from './types';
import { motion, AnimatePresence } from 'motion/react';

const CaseStudyModal = lazy(() => import('./components/CaseStudyModal').then(({ CaseStudyModal }) => ({ default: CaseStudyModal })));

export default function App() {
  const [language, setLanguage] = useState<Language>('es');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isJobProfileOpen, setIsJobProfileOpen] = useState(false);
  const [isShareQrOpen, setIsShareQrOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [modalInitialTab, setModalInitialTab] = useState<'caseStudy' | 'demo'>('caseStudy');

  const handleDownloadSummary = () => {
    window.print();
  };

  const isEs = language === 'es';

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Toggle Language
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    const activeProjects = language === 'en' ? PROJECTS_DATA_EN : PROJECTS_DATA;
    return activeProjects.filter((proj) => {
      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'hero') return proj.priority === 'hero';
      if (selectedCategory === 'pwa') return proj.demoType === 'elfulbo' || proj.demoType === 'fretlabs';
      if (selectedCategory === 'ai') return proj.demoType === 'checar';
      return true;
    });
  }, [selectedCategory, language]);

  // Handler when user clicks "Probar Demo Interactiva" on a project card
  const handleOpenDemo = (demoType: Project['demoType']) => {
    const activeProjects = language === 'en' ? PROJECTS_DATA_EN : PROJECTS_DATA;
    const matchingProj = activeProjects.find((p) => p.demoType === demoType);
    if (matchingProj) {
      setModalInitialTab('demo');
      setSelectedProject(matchingProj);
    }
  };

  // Handler when user clicks "Leer Caso de Estudio"
  const handleOpenCaseStudy = (project: Project) => {
    setModalInitialTab('caseStudy');
    setSelectedProject(project);
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-[#1a1a1a] font-sans selection:bg-[#0d4d4d] selection:text-white transition-colors">
      
      {/* Top Header Navigation */}
      <Header
        language={language}
        onToggleLanguage={toggleLanguage}
        onOpenCvModal={() => setIsCvOpen(true)}
        onOpenShareQr={() => setIsShareQrOpen(true)}
        onOpenJobProfile={() => setIsJobProfileOpen(true)}
      />

      {/* Main Content Area with Smooth Language Transition */}
      <motion.main
        initial={{ opacity: 0.88, y: 2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Hero Section */}
        <Hero
          language={language}
          onOpenCvModal={() => setIsCvOpen(true)}
          onOpenJobProfile={() => setIsJobProfileOpen(true)}
          onDownloadSummary={handleDownloadSummary}
        />

        {/* Value Proposition Philosophy */}
        <ValueProp language={language} />

        {/* Projects Section */}
        <section id="proyectos" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Section Header & Filters */}
          <div className="space-y-3 border-b border-[#1a1a1a]/10 pb-6">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0d4d4d] bg-black/5 px-2.5 py-1 inline-block">
                {isEs ? 'Casos de Estudio & Productos' : 'Featured Case Studies'}
              </span>
            </div>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#1a1a1a] tracking-tight">
                {isEs ? 'Proyectos Reales con Enfoque de Producto' : ENGLISH_TRANSLATIONS.projectsTitle}
              </h2>
              <div role="group" aria-label={isEs ? 'Filtrar proyectos' : 'Filter projects'} className="flex shrink-0 self-start bg-white p-1 border border-[#1a1a1a]/20 text-xs font-mono lg:self-auto">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 uppercase font-bold transition-all ${
                    selectedCategory === 'all'
                      ? 'btn-editorial-dark text-xs'
                      : 'text-[#666666] hover:text-[#1a1a1a]'
                  }`}
                >
                  {isEs ? 'Todos' : 'All'}
                </button>
                <button
                  onClick={() => setSelectedCategory('hero')}
                  className={`px-3 py-1.5 uppercase font-bold transition-all ${
                    selectedCategory === 'hero'
                      ? 'btn-editorial-dark text-xs'
                      : 'text-[#666666] hover:text-[#1a1a1a]'
                  }`}
                >
                  {isEs ? 'Prioritarios' : 'Hero'}
                </button>
                <button
                  onClick={() => setSelectedCategory('ai')}
                  className={`px-3 py-1.5 uppercase font-bold transition-all ${
                    selectedCategory === 'ai'
                      ? 'btn-editorial-dark text-xs'
                      : 'text-[#666666] hover:text-[#1a1a1a]'
                  }`}
                >
                  IA
                </button>
                <button
                  onClick={() => setSelectedCategory('pwa')}
                  className={`px-3 py-1.5 uppercase font-bold transition-all ${
                    selectedCategory === 'pwa'
                      ? 'btn-editorial-dark text-xs'
                      : 'text-[#666666] hover:text-[#1a1a1a]'
                  }`}
                >
                  PWA
                </button>
              </div>
            </div>
            <p className="max-w-2xl text-[#666666] text-sm leading-relaxed font-sans">
              {isEs ? 'Explora cada producto para conocer el problema operativo, las decisiones de arquitectura y los aprendizajes técnicos.' : ENGLISH_TRANSLATIONS.projectsSubtitle}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => {
              const isLastOdd = filteredProjects.length % 2 !== 0 && index === filteredProjects.length - 1;
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  language={language}
                  isFullWidth={isLastOdd}
                  onSelectCaseStudy={handleOpenCaseStudy}
                  onOpenDemo={handleOpenDemo}
                />
              );
            })}
          </div>
        </section>

        {/* Work Process Methodology Section */}
        <ProcessSection language={language} />

        {/* Grouped Capabilities & Tech Matrix */}
        <StackSection language={language} />

        {/* Contact Section */}
        <ContactSection language={language} />
      </motion.main>

      {/* Footer */}
      <Footer language={language} />

      {/* Printable Portfolio Summary Document */}
      <PortfolioSummaryPrint language={language} projects={isEs ? PROJECTS_DATA : PROJECTS_DATA_EN} />

      {/* Deep Case Study Modal / Drawer */}
      <Suspense fallback={selectedProject ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 text-center text-sm text-white" role="status">
          {isEs ? 'Cargando caso de estudio…' : 'Loading case study…'}
        </div>
      ) : null}>
        <AnimatePresence>
          {selectedProject && (
            <CaseStudyModal
              project={selectedProject}
              language={language}
              initialTab={modalInitialTab}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </Suspense>

      {/* Professional profile modal */}
      <AnimatePresence>
        {isCvOpen && (
          <AtsCvModal
            isOpen={isCvOpen}
            language={language}
            onClose={() => setIsCvOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Fixed job-search introduction */}
      <AnimatePresence>
        {isJobProfileOpen && (
          <JobProfileModal
            isOpen={isJobProfileOpen}
            language={language}
            onClose={() => setIsJobProfileOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isShareQrOpen && <ShareQrModal language={language} onClose={() => setIsShareQrOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

