import { Language } from '../types';
import { PROJECTS_DATA } from './portfolioData';
import { PROJECTS_DATA_EN } from './portfolioDataEn';

interface CvProject {
  id: string;
  name: string;
  role: string;
  period: string;
  focus: string;
  evidence: string[];
}

export interface CareerProfile {
  name: string;
  title: string;
  availability: string;
  location: string;
  contact: string[];
  summary: string;
  jobSearch: string;
  principles: string[];
  capabilities: Array<{ title: string; description: string }>;
  projects: CvProject[];
  education: string;
  continuousLearning: string;
}

const profileByLanguage: Record<Language, Omit<CareerProfile, 'projects'>> = {
  es: {
    name: 'Iván Valdez',
    title: 'Desarrollador Web orientado a producto',
    availability: 'Disponible para roles remotos e híbridos en Argentina y Latinoamérica',
    location: 'Argentina',
    contact: ['ivnvaldz@gmail.com', 'linkedin.com/in/ivnvaldz', 'github.com/ivnvaldz7'],
    summary: 'Desarrollador web con foco en React, TypeScript y Node.js. Convierto problemas operativos y de negocio en productos claros: defino la necesidad, diseño la experiencia, construyo la solución y cuido su entrega.',
    jobSearch: 'Busco integrarme a equipos donde pueda aportar criterio de producto, desarrollo frontend sólido y automatización pragmática. Me interesan roles de Frontend Developer, Full-Stack JavaScript/TypeScript, Product Engineer y automatización aplicada.',
    principles: ['Entender el problema antes de elegir la tecnología.', 'Priorizar claridad, estabilidad y fricción baja para quien usa el producto.', 'Tomar decisiones técnicas que sostengan el valor y el contexto operativo.'],
    capabilities: [
      { title: 'Producto de punta a punta', description: 'Transformo necesidades operativas en flujos, interfaces y entregables digitales concretos.' },
      { title: 'Frontend con criterio', description: 'Construyo interfaces mantenibles con React, TypeScript, estado claro y atención al uso real.' },
      { title: 'Automatización e integración', description: 'Conecto APIs, procesos y herramientas de IA cuando reducen trabajo manual o mejoran trazabilidad.' },
    ],
    education: 'Formación autodidacta en sistemas y desarrollo web · Platzi y cursos especializados',
    continuousLearning: 'Formación continua en arquitectura frontend, React, TypeScript y desarrollo de producto.',
  },
  en: {
    name: 'Iván Valdez',
    title: 'Product-focused Web Developer',
    availability: 'Available for remote and hybrid roles across Argentina and Latin America',
    location: 'Argentina',
    contact: ['ivnvaldz@gmail.com', 'linkedin.com/in/ivnvaldz', 'github.com/ivnvaldz7'],
    summary: 'Web developer focused on React, TypeScript, and Node.js. I turn operational and business problems into clear products: define the need, design the experience, build the solution, and support delivery.',
    jobSearch: 'I am looking to join teams where I can contribute product judgment, strong frontend development, and pragmatic automation. I am interested in Frontend Developer, Full-Stack JavaScript/TypeScript, Product Engineer, and applied automation roles.',
    principles: ['Understand the problem before choosing the technology.', 'Prioritize clarity, stability, and low friction for the person using the product.', 'Make technical decisions that fit both value and the operational context.'],
    capabilities: [
      { title: 'End-to-end product work', description: 'I turn operational needs into concrete digital flows, interfaces, and deliverables.' },
      { title: 'Purposeful frontend', description: 'I build maintainable interfaces with React, TypeScript, clear state, and attention to real usage.' },
      { title: 'Automation and integration', description: 'I connect APIs, processes, and AI tools when they reduce manual work or improve traceability.' },
    ],
    education: 'Self-directed training in systems and web development · Platzi and specialized courses',
    continuousLearning: 'Continuous learning in frontend architecture, React, TypeScript, and product development.',
  },
};

export function getCareerProfile(language: Language): CareerProfile {
  const sourceProjects = language === 'es' ? PROJECTS_DATA : PROJECTS_DATA_EN;

  return {
    ...profileByLanguage[language],
    projects: sourceProjects.map(({ id, name, role, period, tagline, cvHighlights }) => ({
      id,
      name,
      role,
      period,
      focus: tagline,
      evidence: cvHighlights,
    })),
  };
}
