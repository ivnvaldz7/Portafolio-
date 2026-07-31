import React, { useState } from 'react';
import { ATS_CV_DATA } from '../data/portfolioData';
import { Language } from '../types';
import { X, Printer, Copy, Check, Edit3, Sparkles, MapPin, Mail, Linkedin, Github } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';

interface AtsCvModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
}

export const AtsCvModal: React.FC<AtsCvModalProps> = ({ isOpen, language, onClose }) => {
  if (!isOpen) return null;

  const isEs = language === 'es';
  const [copied, setCopied] = useState(false);
  // Helper to get stored item or fallback if it contains obsolete placeholders
  const getSanitizedStoredItem = (key: string, fallback: string) => {
    const item = localStorage.getItem(key);
    if (!item || item.includes('[COMPLETAR]') || item.includes('Institución de Nivel Superior')) {
      return fallback;
    }
    return item;
  };

  const [customName, setCustomName] = useState(() => getSanitizedStoredItem('ats_custom_name', "Ivan Valdez"));
  const [customEmail, setCustomEmail] = useState(() => getSanitizedStoredItem('ats_custom_email', ATS_CV_DATA.contactInfo.email));
  const [customLinkedIn, setCustomLinkedIn] = useState(() => getSanitizedStoredItem('ats_custom_linkedin', ATS_CV_DATA.contactInfo.linkedIn));
  const [customGithub, setCustomGithub] = useState(() => getSanitizedStoredItem('ats_custom_github', ATS_CV_DATA.contactInfo.github));
  const [customEducation, setCustomEducation] = useState(() => getSanitizedStoredItem('ats_custom_edu', ATS_CV_DATA.education[0].degree));
  const [customInstitution, setCustomInstitution] = useState(() => getSanitizedStoredItem('ats_custom_inst', ATS_CV_DATA.education[0].institution));
  const [showCustomizer, setShowCustomizer] = useState(false);

  // Save changes to localStorage on edit
  const handleNameChange = (val: string) => { setCustomName(val); localStorage.setItem('ats_custom_name', val); };
  const handleEmailChange = (val: string) => { setCustomEmail(val); localStorage.setItem('ats_custom_email', val); };
  const handleLinkedInChange = (val: string) => { setCustomLinkedIn(val); localStorage.setItem('ats_custom_linkedin', val); };
  const handleGithubChange = (val: string) => { setCustomGithub(val); localStorage.setItem('ats_custom_github', val); };
  const handleEducationChange = (val: string) => { setCustomEducation(val); localStorage.setItem('ats_custom_edu', val); };
  const handleInstitutionChange = (val: string) => { setCustomInstitution(val); localStorage.setItem('ats_custom_inst', val); };

  const handleResetDefaults = () => {
    localStorage.removeItem('ats_custom_name');
    localStorage.removeItem('ats_custom_email');
    localStorage.removeItem('ats_custom_linkedin');
    localStorage.removeItem('ats_custom_github');
    localStorage.removeItem('ats_custom_edu');
    localStorage.removeItem('ats_custom_inst');
    setCustomName("Ivan Valdez");
    setCustomEmail(ATS_CV_DATA.contactInfo.email);
    setCustomLinkedIn(ATS_CV_DATA.contactInfo.linkedIn);
    setCustomGithub(ATS_CV_DATA.contactInfo.github);
    setCustomEducation(ATS_CV_DATA.education[0].degree);
    setCustomInstitution(ATS_CV_DATA.education[0].institution);
  };

  const handlePrint = () => {
    window.print();
    confetti({ particleCount: 30, spread: 50 });
  };

  const generatePlainText = () => {
    return `
================================================================
${customName.toUpperCase()}
${ATS_CV_DATA.title}
================================================================
Ubicación: ${ATS_CV_DATA.contactInfo.location}
Email: ${customEmail} | LinkedIn: ${customLinkedIn} | GitHub: ${customGithub}

----------------------------------------------------------------
RESUMEN PROFESIONAL
----------------------------------------------------------------
${ATS_CV_DATA.summary}

----------------------------------------------------------------
COMPETENCIAS CLAVE
----------------------------------------------------------------
${ATS_CV_DATA.coreCompetencies.map(c => `• ${c}`).join('\n')}

----------------------------------------------------------------
HABILIDADES TÉCNICAS
----------------------------------------------------------------
${ATS_CV_DATA.skillsByCategory.map(s => `${s.category}: ${s.skills.join(', ')}`).join('\n')}

----------------------------------------------------------------
EXPERIENCIA BASADA EN PROYECTOS DE PRODUCTO
----------------------------------------------------------------
${ATS_CV_DATA.projectExperience.map(p => `
* ${p.name} (${p.period})
  Rol: ${p.role} | Stack: ${p.techStack}
  ${p.highlights.map(h => `  - ${h}`).join('\n')}
`).join('\n')}

----------------------------------------------------------------
EDUCACIÓN Y FORMACIÓN
----------------------------------------------------------------
• ${customEducation} - ${customInstitution}
• Formación Continua en Arquitectura Frontend y React (Autodidacta / Cursos)
`;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generatePlainText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center items-start p-4 sm:p-6 print:p-0 print:bg-white print:static print:inset-auto"
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
        className="w-full max-w-4xl bg-[#fcfaf7] text-[#1a1a1a] p-6 sm:p-10 border border-[#1a1a1a]/20 my-4 relative space-y-6 print:shadow-none print:border-none print:m-0 print:p-0"
      >
        
        {/* Header Bar - Hidden in Print Mode */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1a1a1a]/15 print:hidden">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-black/5 text-[#0d4d4d] border border-[#0d4d4d]/30 font-mono text-[10px] font-bold uppercase tracking-widest">
              ATS-Friendly CV Standard
            </span>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowCustomizer(!showCustomizer)}
              className="px-3 py-1.5 btn-editorial-outline text-xs font-semibold flex items-center gap-1 transition-all"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#0d4d4d]" />
              <span>{showCustomizer ? 'Ocultar Editor' : 'Personalizar Datos'}</span>
            </motion.button>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleCopyText}
              className="px-3.5 py-2 btn-editorial-outline text-xs font-bold transition-all flex items-center gap-1.5"
            >
              {copied ? <Check className="w-4 h-4 text-[#0d4d4d]" /> : <Copy className="w-4 h-4 text-[#666666]" />}
              <span>{copied ? '¡Texto Copiado!' : 'Copiar Texto Plano ATS'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={handlePrint}
              className="px-4 py-2 btn-editorial-dark text-xs flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-[#fcfaf7]" />
              <span>Imprimir / Exportar PDF</span>
            </motion.button>

            <button
              onClick={onClose}
              className="p-2 text-[#666666] hover:text-[#1a1a1a] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Customizer Drawer */}
        {showCustomizer && (
          <div className="p-4 bg-white border border-[#1a1a1a]/20 text-xs space-y-3 print:hidden">
            <h4 className="font-bold text-[#0d4d4d] font-mono flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Sparkles className="w-4 h-4 text-[#0d4d4d]" />
              Editor de Campos Personalizables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="text-[#666666] font-mono block mb-1">Nombre Completo:</label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full p-2 bg-[#fcfaf7] border border-[#1a1a1a]/20 focus:border-[#0d4d4d]"
                />
              </div>
              <div>
                <label className="text-[#666666] font-mono block mb-1">Email:</label>
                <input
                  type="text"
                  value={customEmail}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className="w-full p-2 bg-[#fcfaf7] border border-[#1a1a1a]/20 focus:border-[#0d4d4d]"
                />
              </div>
              <div>
                <label className="text-[#666666] font-mono block mb-1">LinkedIn URL:</label>
                <input
                  type="text"
                  value={customLinkedIn}
                  onChange={(e) => handleLinkedInChange(e.target.value)}
                  className="w-full p-2 bg-[#fcfaf7] border border-[#1a1a1a]/20 focus:border-[#0d4d4d]"
                />
              </div>
              <div>
                <label className="text-[#666666] font-mono block mb-1">GitHub URL:</label>
                <input
                  type="text"
                  value={customGithub}
                  onChange={(e) => handleGithubChange(e.target.value)}
                  className="w-full p-2 bg-[#fcfaf7] border border-[#1a1a1a]/20 focus:border-[#0d4d4d]"
                />
              </div>
              <div>
                <label className="text-[#666666] font-mono block mb-1">Título Universitario / Técnico:</label>
                <input
                  type="text"
                  value={customEducation}
                  onChange={(e) => handleEducationChange(e.target.value)}
                  className="w-full p-2 bg-[#fcfaf7] border border-[#1a1a1a]/20 focus:border-[#0d4d4d]"
                />
              </div>
              <div>
                <label className="text-[#666666] font-mono block mb-1">Universidad / Instituto / Platzi:</label>
                <input
                  type="text"
                  value={customInstitution}
                  onChange={(e) => handleInstitutionChange(e.target.value)}
                  className="w-full p-2 bg-[#fcfaf7] border border-[#1a1a1a]/20 focus:border-[#0d4d4d]"
                />
              </div>
            </div>
            <div className="flex justify-end pt-1">
              <button
                onClick={handleResetDefaults}
                className="text-[11px] font-mono text-[#0d4d4d] underline hover:text-[#1a1a1a] transition-colors"
              >
                Restablecer a valores predeterminados
              </button>
            </div>
          </div>
        )}

        {/* Printable ATS Document Layout */}
        <div className="space-y-6 font-sans text-[#1a1a1a] leading-normal bg-white p-8 border border-[#1a1a1a]/15">
          {/* Header CV Section */}
          <div className="border-b-2 border-[#1a1a1a] pb-4 space-y-2">
            <h1 className="font-serif-editorial text-2xl sm:text-3xl font-bold tracking-tight uppercase text-[#1a1a1a]">
              {customName}
            </h1>
            <p className="text-sm font-bold text-[#0d4d4d] font-mono">
              {ATS_CV_DATA.title}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#666666] font-mono pt-1">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#0d4d4d]" /> {ATS_CV_DATA.contactInfo.location}</span>
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-[#0d4d4d]" /> {customEmail}</span>
              <span className="flex items-center gap-1"><Linkedin className="w-3.5 h-3.5 text-[#0d4d4d]" /> {customLinkedIn}</span>
              <span className="flex items-center gap-1"><Github className="w-3.5 h-3.5 text-[#0d4d4d]" /> {customGithub}</span>
            </div>
          </div>

          {/* Resumen Profesional */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-[#1a1a1a] border-b border-[#1a1a1a]/20 pb-1">
              Resumen Profesional
            </h2>
            <p className="text-xs text-[#1a1a1a] leading-relaxed">
              {ATS_CV_DATA.summary}
            </p>
          </div>

          {/* Habilidades & Competencias */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-[#1a1a1a] border-b border-[#1a1a1a]/20 pb-1">
              Habilidades Técnicas & Competencias Clave
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {ATS_CV_DATA.skillsByCategory.map((cat, idx) => (
                <div key={idx} className="space-x-1">
                  <strong className="text-[#1a1a1a]">{cat.category}:</strong>
                  <span className="text-[#666666]">{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Experiencia Basada en Proyectos */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-[#1a1a1a] border-b border-[#1a1a1a]/20 pb-1">
              Experiencia & Desarrollo de Productos
            </h2>

            {ATS_CV_DATA.projectExperience.map((proj, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between font-bold text-[#1a1a1a]">
                  <span>{proj.name} — <span className="font-normal text-[#666666]">{proj.role}</span></span>
                  <span className="font-mono text-[#0d4d4d]">{proj.period}</span>
                </div>
                <div className="text-[11px] font-mono text-[#666666] italic">
                  Stack: {proj.techStack}
                </div>
                <ul className="list-disc pl-4 space-y-1 text-[#1a1a1a]">
                  {proj.highlights.map((h, hIdx) => (
                    <li key={hIdx}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Educación */}
          <div className="space-y-2 pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-[#1a1a1a] border-b border-[#1a1a1a]/20 pb-1">
              Educación & Formación
            </h2>
            <div className="text-xs space-y-1">
              <div className="flex justify-between font-bold text-[#1a1a1a]">
                <span>{customEducation} — <span className="font-normal text-[#666666]">{customInstitution}</span></span>
                <span className="font-mono text-[#0d4d4d]">Graduado / En curso</span>
              </div>
              <div className="text-[#666666]">
                Formación Continua en Arquitectura Frontend, React, TypeScript y Desarrollo de Producto.
              </div>
            </div>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};
