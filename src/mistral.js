export class MistralAIClient {
  constructor() {
    this.apiKey = process.env.MISTRAL_API_KEY;
    this.baseUrl = 'https://api.mistral.ai/v1/chat/completions';
  }

  async optimizeForEuropeanMarket(candidate) {
    const prompt = `
Optimise ce profil pour le marché franco-européen :

PROFIL: ${JSON.stringify(candidate, null, 2)}

Réponds en JSON uniquement:
{
  "description_optimisee": "Description française engageante",
  "atouts_franco_maghreb": ["Bilinguisme", "Culture"],
  "score_marche_europeen": 88,
  "mots_cles_france": ["mot1", "mot2"]
}
`;

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'mistral-large-latest',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 800
        })
      });

      const data = await response.json();
      const optimization = JSON.parse(data.choices[0].message.content);
      
      return {
        ...optimization,
        timestamp: new Date().toISOString(),
        source: 'mistral-ai'
      };
    } catch (error) {
      console.error('Mistral AI Error:', error);
      return this.getFallbackOptimization(candidate);
    }
  }

  getFallbackOptimization(candidate) {
    return {
      description_optimisee: `${candidate.niveau} ${candidate.poste} avec ${candidate.experience} ans d'expérience`,
      atouts_franco_maghreb: ['Bilinguisme français-arabe', 'Compréhension culturelle'],
      score_marche_europeen: Math.min(90, candidate.scoreIA + 10),
      mots_cles_france: candidate.competences.slice(0, 6),
      timestamp: new Date().toISOString(),
      source: 'fallback'
    };
  }
}