export class ClaudeAIClient {
  constructor() {
    this.apiKey = process.env.ANTHROPIC_API_KEY;
    this.baseUrl = 'https://api.anthropic.com/v1/messages';
  }

  async analyzeCandidate(candidate, projectContext = null) {
    const prompt = `
Analyse ce profil consultant pour SaveursMaghrebines :

CANDIDAT:
- Poste: ${candidate.poste}
- Expérience: ${candidate.experience} ans
- Compétences: ${candidate.competences.join(', ')}
- Niveau: ${candidate.niveau}
- Score Apps Script: ${candidate.scoreIA}/100

${projectContext ? `CONTEXTE PROJET: ${JSON.stringify(projectContext)}` : ''}

Réponds en JSON uniquement:
{
  "evaluation_technique": "Évaluation détaillée",
  "points_forts": ["Point 1", "Point 2"],
  "axes_amelioration": ["Amélioration 1"],
  "score_claude": 85,
  "recommandations": ["Conseil 1", "Conseil 2"],
  "confiance": 0.9
}
`;

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }]
        })
      });

      const data = await response.json();
      const analysis = JSON.parse(data.content[0].text);
      
      return {
        ...analysis,
        timestamp: new Date().toISOString(),
        source: 'claude-ai'
      };
    } catch (error) {
      console.error('Claude AI Error:', error);
      return this.getFallbackAnalysis(candidate);
    }
  }

  getFallbackAnalysis(candidate) {
    return {
      evaluation_technique: `Profil ${candidate.niveau} avec ${candidate.experience} ans d'expérience`,
      points_forts: candidate.competences.slice(0, 3),
      axes_amelioration: ['Développement continu'],
      score_claude: Math.min(95, candidate.scoreIA + 15),
      recommandations: ['Formation continue', 'Veille technologique'],
      confiance: 0.7,
      timestamp: new Date().toISOString(),
      source: 'fallback'
    };
  }
}