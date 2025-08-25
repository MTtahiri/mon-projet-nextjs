import { ClaudeAIClient } from './claude.js';
import { MistralAIClient } from './mistral.js';

export class MultiAICoordinator {
  constructor() {
    this.claude = new ClaudeAIClient();
    this.mistral = new MistralAIClient();
  }

  async analyzeCandidate(candidate, projectContext = null) {
    try {
      const [claudeAnalysis, mistralOptimization] = await Promise.all([
        this.claude.analyzeCandidate(candidate, projectContext),
        this.mistral.optimizeForEuropeanMarket(candidate)
      ]);

      const hybridScore = this.calculateHybridScore({
        appsScriptScore: candidate.scoreIA,
        claudeScore: claudeAnalysis.score_claude,
        mistralScore: mistralOptimization.score_marche_europeen
      });

      return {
        candidate: {
          ...candidate,
          hybridScore,
          claudeAnalysis,
          mistralOptimization
        },
        analysis: {
          technical: claudeAnalysis.evaluation_technique,
          strengths: claudeAnalysis.points_forts,
          improvements: claudeAnalysis.axes_amelioration,
          europeanFit: mistralOptimization.description_optimisee,
          keywords: mistralOptimization.mots_cles_france,
          confidence: (claudeAnalysis.confiance + 0.8) / 2
        },
        scoring: {
          appsScript: candidate.scoreIA,
          claude: claudeAnalysis.score_claude,
          mistral: mistralOptimization.score_marche_europeen,
          hybrid: hybridScore
        }
      };
    } catch (error) {
      console.error('Multi-AI Coordination Error:', error);
      return this.getFallbackAnalysis(candidate);
    }
  }

  calculateHybridScore({ appsScriptScore, claudeScore, mistralScore }) {
    const weights = {
      appsScript: 0.3,
      claude: 0.5,
      mistral: 0.2
    };

    return Math.round(
      (appsScriptScore * weights.appsScript) +
      (claudeScore * weights.claude) +
      (mistralScore * weights.mistral)
    );
  }

  getFallbackAnalysis(candidate) {
    return {
      candidate: { ...candidate, hybridScore: candidate.scoreIA },
      analysis: {
        technical: `Profil ${candidate.niveau} fiable`,
        strengths: candidate.competences.slice(0, 3),
        improvements: ['Formation continue'],
        europeanFit: `${candidate.poste} expérimenté`,
        keywords: candidate.competences,
        confidence: 0.7
      },
      scoring: {
        appsScript: candidate.scoreIA,
        claude: candidate.scoreIA,
        mistral: candidate.scoreIA,
        hybrid: candidate.scoreIA
      }
    };
  }
}