import { GoogleSpreadsheet } from 'google-spreadsheet';

export class MasterCandidatesClient {
  constructor() {
    this.sheetId = process.env.GOOGLE_SHEET_ID_Base_Candidats_Master_2025;
    this.credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || '{}');
  }

  async connect() {
    const doc = new GoogleSpreadsheet(this.sheetId);
    await doc.useServiceAccountAuth(this.credentials);
    await doc.loadInfo();
    return doc;
  }

  async getAllCandidates() {
    const doc = await this.connect();
    const sheet = doc.sheetsByTitle['Master_KPI_Candidats'] || doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    
    return rows.map(row => ({
      id: row.get('Candidat') || `candidate_${row.rowNumber}`,
      candidat: row.get('Candidat'),
      cvUrl: row.get('CV_URL'),
      nom: row.get('Nom'),
      prenom: row.get('Prenom'),
      poste: row.get('Poste'),
      experience: row.get('Experience'),
      competences: this.parseCompetences(row.get('Competences')),
      niveau: row.get('Niveau'),
      dateAjout: row.get('Date_Ajout'),
      scoreIA: this.parseScore(row.get('Score_IA') || '0')
    }));
  }

  parseCompetences(competencesStr) {
    if (!competencesStr) return [];
    return competencesStr.split(',').map(c => c.trim()).filter(Boolean);
  }

  parseScore(score) {
    const parsed = parseInt(score);
    return isNaN(parsed) ? 0 : Math.min(100, Math.max(0, parsed));
  }

  async getCandidatesByFilter(filters) {
    const candidates = await this.getAllCandidates();
    
    return candidates.filter(candidate => {
      if (filters.competences?.length) {
        const hasSkill = filters.competences.some(skill => 
          candidate.competences.some(c => 
            c.toLowerCase().includes(skill.toLowerCase())
          )
        );
        if (!hasSkill) return false;
      }
      
      if (filters.niveau && candidate.niveau !== filters.niveau) {
        return false;
      }
      
      if (filters.minExperience && parseInt(candidate.experience) < filters.minExperience) {
        return false;
      }
      
      return true;
    });
  }
}