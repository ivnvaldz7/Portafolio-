import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ValueProp } from './components/ValueProp';
import { ProjectCard } from './components/ProjectCard';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ProcessSection } from './components/ProcessSection';
import { StackSection } from './components/StackSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AtsCvModal } from './components/AtsCvModal';
import { PitchKitModal } from './components/PitchKitModal';
import { PROJECTS_DATA, ENGLISH_TRANSLATIONS } from './data/portfolioData';
import { Project, Language } from './types';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [language, setLanguage] = useState<Language>('es');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isPitchOpen, setIsPitchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const isEs = language === 'es';

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Toggle Language
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  // Filter projects by category & search query
  const filteredProjects = useMemo(() => PROJECTS_DATA.filter((proj) => {
    const matchesSearch =
      proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.stack.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      proj.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'hero') return matchesSearch && proj.priority === 'hero';
    if (selectedCategory === 'pwa') return matchesSearch && (proj.demoType === 'elfulbo' || proj.demoType === 'fretlabs');
    if (selectedCategory === 'ai') return matchesSearch && proj.demoType === 'checar';

    return matchesSearch;
  }), [searchQuery, selectedCategory]);

  // Handler when user clicks "Probar Demo Interactiva" on a project card
  const handleOpenDemo = (demoType: Project['demoType']) => {
    const matchingProj = PROJECTS_DATA.find((p) => p.demoType === demoType);
    if (matchingProj) {
      setSelectedProject(matchingProj);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-[#1a1a1a] font-sans selection:bg-[#0d4d4d] selection:text-white transition-colors">
      
      {/* Top Header Navigation */}
      <Header
        language={language}
        onToggleLanguage={toggleLanguage}
        onOpenCvModal={() => setIsCvOpen(true)}
        onOpenPitchModal={() => setIsPitchOpen(true)}
        onOpenContact={() => {
          const el = document.getElementById('contacto');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Area with Smooth Language Transition */}
      <motion.main
        key={language}
        initial={{ opacity: 0.88, y: 2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Hero Section */}
        <Hero
          language={language}
          onOpenCvModal={() => setIsCvOpen(true)}
          onOpenPitchModal={() => setIsPitchOpen(true)}
        />

        {/* Value Proposition Philosophy */}
        <ValueProp language={language} />

        {/* Projects Section */}
        <section id="proyectos" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Section Header & Filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1a1a1a]/10 pb-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#0d4d4d] bg-black/5 px-2.5 py-1 inline-block">
                {isEs ? 'Casos de Estudio & Productos' : 'Featured Case Studies'}
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#1a1a1a] tracking-tight">
                {isEs ? 'Proyectos Reales con Enfoque de Producto' : ENGLISH_TRANSLATIONS.projectsTitle}
              </h2>
              <p className="text-[#666666] text-sm leading-relaxed font-sans">
                {isEs ? 'Explora cada producto para conocer el problema operativo, las decisiones de arquitectura y los aprendizajes técnicos.' : ENGLISH_TRANSLATIONS.projectsSubtitle}
              </p>
            </div>

            {/* Search & Category Filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isEs ? 'Buscar tecnología o proyecto...' : 'Search stack or project...'}
                  className="w-full bg-white border border-[#1a1a1a]/20 pl-9 pr-3 py-2 text-xs text-[#1a1a1a] placeholder-stone-400 focus:outline-none focus:border-[#0d4d4d]"
                />
              </div>

              {/* Category Pills */}
              <div className="flex bg-white p-1 border border-[#1a1a1a]/20 text-xs font-mono">
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
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                language={language}
                onSelectCaseStudy={(p) => setSelectedProject(p)}
                onOpenDemo={handleOpenDemo}
              />
            ))}
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

      {/* Deep Case Study Modal / Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            language={language}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* ATS CV Printable Generator Modal */}
      <AnimatePresence>
        {isCvOpen && (
          <AtsCvModal
            isOpen={isCvOpen}
            language={language}
            onClose={() => setIsCvOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Pitches & Bio Kit Modal */}
      <AnimatePresence>
        {isPitchOpen && (
          <PitchKitModal
            isOpen={isPitchOpen}
            language={language}
            onClose={() => setIsPitchOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
