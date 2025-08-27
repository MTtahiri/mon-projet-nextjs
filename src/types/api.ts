export interface GoogleSheetsRow {
  [key: string]: string | number;
}

export interface ConsultantRawData {
  nom?: string;
  prenom?: string;
  email?: string;
  poste: string;
  experience: number;
  competences: string;
  niveau: string;
  localisation: string;
  disponibilite: string;
  // Plus de champs selon votre structure Google Sheets
}

// Type pour l'audit RGPD
export interface AuditLog {
  id: string;
  timestamp: Date;
  action: 'view_profile' | 'search' | 'filter' | 'api_call';
  anonymousUserId?: string;
  profileId?: string;
  metadata?: Record<string, any>;
}