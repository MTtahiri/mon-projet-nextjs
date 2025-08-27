import { type ClassValue, clsx } from 'clsx';
import { ConsultantProfile, AnonymizedProfile } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Génération d'ID opaques pour RGPD
export function generateOpaqueId(prefix: string = 'anon'): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 9);
  return `${prefix}_${timestamp}_${random}`;
}

// Anonymisation côté serveur
export function anonymizeProfile(profile: ConsultantProfile): AnonymizedProfile {
  return {
    id: profile.id,
    anonymousId: profile.anonymousId,
    title: profile.title,
    experience: profile.experience,
    skills: profile.skills,
    location: extractRegionOnly(profile.location),
    availability: profile.availability,
    matchScore: profile.matchScore,
    summary: profile.summary,
    // Suppression explicite des données personnelles
  };
}

// Extraction de région sans données précises
function extractRegionOnly(fullLocation: string): string {
  // Exemple: "75001 Paris, France" -> "Île-de-France, France"
  // Cette fonction doit être adaptée selon vos données
  if (fullLocation.includes('Paris')) return 'Île-de-France, France';
  if (fullLocation.includes('Lyon')) return 'Auvergne-Rhône-Alpes, France';
  if (fullLocation.includes('Marseille')) return 'Provence-Alpes-Côte d\'Azur, France';
  
  // Par défaut, retourner une région générique
  return fullLocation.split(',').slice(-1)[0].trim() || 'France';
}

// Validation des filtres
export function validateFilters(filters: any): FilterOptions {
  return {
    skills: typeof filters.skills === 'string' ? filters.skills : '',
    experience: ['junior', 'mid', 'senior'].includes(filters.experience) ? filters.experience : '',
    availability: ['immediate', 'short', 'negotiable'].includes(filters.availability) ? filters.availability : '',
  };
}

// Utilitaire pour le scoring
export function calculateMatchScore(
  profile: ConsultantProfile, 
  searchSkills: string[]
): number {
  if (searchSkills.length === 0) return 85; // Score par défaut
  
  const profileSkills = profile.skills.map(s => s.toLowerCase());
  const searchSkillsLower = searchSkills.map(s => s.toLowerCase());
  
  const matches = searchSkillsLower.filter(skill => 
    profileSkills.some(pSkill => pSkill.includes(skill))
  );
  
  const baseScore = (matches.length / searchSkills.length) * 100;
  
  // Bonus expérience
  const experienceBonus = Math.min(profile.experience * 2, 15);
  
  return Math.min(Math.round(baseScore + experienceBonus), 100);
}