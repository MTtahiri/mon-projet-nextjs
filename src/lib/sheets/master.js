import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export class MasterCandidatesClient {
  constructor() {
    this.sheetId = process.env.GOOGLE_SHEET_ID_Base_Candidats_Master_2025;
    try {
      this.credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || '{}');
    } catch (error) {
      console.error('Erreur parsing credentials:', error);
      this.credentials = {};
    }
  }

  async connect() {
    try {
      const doc = new GoogleSpreadsheet(this.sheetId);
      
      // Nouvelle méthode d'authentification pour google-spreadsheet v4+
      const serviceAccountAuth = new JWT({
        email: this.credentials.client_email,
        key: this.credentials.private_key,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      doc.useServiceAccountAuth(serviceAccountAuth);
      await doc.loadInfo();
      return doc;
    } catch (error) {
      console.error('Erreur connexion Google Sheets:', error);
      throw error;
    }
  }

  async getAllCandidates() {
    try {
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
    } catch (error) {
      console.error('Erreur getAllCandidates:', error);
      return this.getMockData(); // Données de test si erreur
    }
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

  // Données de test si Google Sheets ne fonctionne pas
  getMockData() {
    return [
      {
        id: 'test1',
        candidat: 'Test1',
        nom: 'D***',
        prenom: 'M***',
        poste: 'Développeur Full-Stack',
        experience: '5',
        competences: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
        niveau: 'senior',
        dateAjout: '2025-08-25',
        scoreIA: 85
      },
      {
        id: 'test2',
        candidat: 'Test2',
        nom: 'A***',
        prenom: 'S***',
        poste: 'Consultant IA',
        experience: '8',
        competences: ['Python', 'Machine Learning', 'TensorFlow', 'Docker'],
        niveau: 'expert',
        dateAjout: '2025-08-24',
        scoreIA: 92
      },
      {
        id: 'test3',
        candidat: 'Test3',
        nom: 'K***',
        prenom: 'L***',
        poste: 'Chef de Projet Digital',
        experience: '3',
        competences: ['Scrum', 'Jira', 'Management', 'Agile'],
        niveau: 'confirmé',
        dateAjout: '2025-08-23',
        scoreIA: 78
      }
    ]; 
  }
}