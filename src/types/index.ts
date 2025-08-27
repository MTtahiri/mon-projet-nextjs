export interface ConsultantProfile {
  id: string;
  anonymousId: string;
  title: string;
  experience: number;
  skills: string[];
  skillCategories: SkillCategory[];
  location: string;
  availability: 'immediate' | 'short' | 'negotiable';
  matchScore: number;
  summary: string;
  experiences: Experience[];
  education: Education[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Experience {
  role: string;
  sector: string;
  companySize: string;
  duration: string;
  description: string;
  achievements?: string[];
}

export interface Education {
  degree: string;
  field: string;
  year: string;
}

export interface FilterOptions {
  skills: string;
  experience: 'junior' | 'mid' | 'senior' | '';
  availability: 'immediate' | 'short' | 'negotiable' | '';
}

// Types pour les réponses API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ConsultantsResponse {
  success: boolean;
  data: ConsultantProfile[];
  count: number;
  filters?: FilterOptions;
}

// Types pour la sécurité RGPD
export interface AnonymizedProfile {
  id: string;
  anonymousId: string;
  title: string;
  experience: number;
  skills: string[];
  location: string; // Région seulement, pas d'adresse précise
  availability: 'immediate' | 'short' | 'negotiable';
  matchScore: number;
  summary: string;
  // Note: Pas de nom, email, photo ou données personnelles
}