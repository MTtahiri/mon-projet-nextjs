import { z } from 'zod';

// Schéma de validation pour les filtres
export const filterSchema = z.object({
  skills: z.string().optional().default(''),
  experience: z.enum(['junior', 'mid', 'senior', '']).optional().default(''),
  availability: z.enum(['immediate', 'short', 'negotiable', '']).optional().default(''),
});

// Schéma pour un profil consultant (côté serveur)
export const consultantProfileSchema = z.object({
  id: z.string().min(1),
  anonymousId: z.string().min(1),
  title: z.string().min(1).max(100),
  experience: z.number().int().min(0).max(50),
  skills: z.array(z.string().min(1).max(50)),
  location: z.string().min(1).max(100),
  availability: z.enum(['immediate', 'short', 'negotiable']),
  matchScore: z.number().int().min(0).max(100),
  summary: z.string().min(10).max(500),
});

// Validation de sécurité pour les paramètres d'URL
export function validateSearchParams(searchParams: URLSearchParams) {
  const result = filterSchema.safeParse({
    skills: searchParams.get('skills'),
    experience: searchParams.get('experience'),
    availability: searchParams.get('availability'),
  });
  
  return result.success ? result.data : filterSchema.parse({});
}