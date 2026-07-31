export type Language = 'es' | 'en';

export type ProjectPriority = 'hero' | 'featured' | 'standard';

export interface ProjectDecision {
  title: string;
  description: string;
  reasoning: string;
}

export interface CaseStudy {
  contextAndProblem: string;
  affectedUsers: string;
  realConstraints: string[];
  developedSolution: string;
  productDecisions: ProjectDecision[];
  techDecisions: ProjectDecision[];
  resultAndLearnings: string;
  keyTakeaway: string;
  architectureNotes?: string;
  tradeOffPivot?: string;
}

export interface Project {
  id: string;
  name: string;
  typeBadge: string;
  tagline: string;
  problemSummary: string;
  targetUser: string;
  myContribution: string;
  priority: ProjectPriority;
  stack: string[];
  skills: string[];
  caseStudy: CaseStudy;
  demoType: 'checar' | 'fretlabs' | 'elfulbo' | 'alebet';
  githubUrl?: string;
  liveUrl?: string;
}

export interface PitchVersion {
  id: 'pitch-30' | 'pitch-60' | 'postulacion' | 'linkedin';
  title: string;
  badge: string;
  subtitle: string;
  content: string;
  usageAdvice: string;
}

export interface WorkProcessStep {
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  keyDeliverable: string;
}

export interface StackCategory {
  title: string;
  subtitle: string;
  items: {
    name: string;
    description: string;
    tag?: string;
  }[];
}

export interface ATSCVData {
  title: string;
  summary: string;
  targetRoles: string[];
  locationAvailability: string;
  coreCompetencies: string[];
  skillsByCategory: {
    category: string;
    skills: string[];
  }[];
  projectExperience: {
    name: string;
    role: string;
    period: string;
    techStack: string;
    highlights: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    status: string;
  }[];
  contactInfo: {
    email: string;
    linkedIn: string;
    github: string;
    location: string;
  };
}
