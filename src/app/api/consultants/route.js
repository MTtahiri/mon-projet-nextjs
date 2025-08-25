import { NextResponse } from 'next/server';
import { MasterCandidatesClient } from '@/lib/sheets/master';
import { MultiAICoordinator } from '@/lib/ai/coordinator';

const masterClient = new MasterCandidatesClient();
const aiCoordinator = new MultiAICoordinator();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filters = {
      competences: searchParams.get('skills')?.split(',').filter(Boolean) || [],
      niveau: searchParams.get('niveau') || null,
      minExperience: parseInt(searchParams.get('minExp')) || 0,
      enhanced: searchParams.get('enhanced') === 'true'
    };

    const candidates = await masterClient.getCandidatesByFilter(filters);
    
    if (filters.enhanced) {
      const enhancedCandidates = await Promise.all(
        candidates.slice(0, 10).map(async (candidate) => {
          const analysis = await aiCoordinator.analyzeCandidate(candidate);
          return analysis;
        })
      );
      
      return NextResponse.json({
        success: true,
        count: enhancedCandidates.length,
        data: enhancedCandidates,
        enhanced: true
      });
    }

    return NextResponse.json({
      success: true,
      count: candidates.length,
      data: candidates.map(candidate => ({
        ...candidate,
        nom: candidate.nom ? candidate.nom[0] + '***' : 'Anonyme',
        prenom: candidate.prenom ? candidate.prenom[0] + '***' : '',
        posteAnonyme: `${candidate.niveau} ${candidate.poste}`.trim()
      })),
      enhanced: false
    });

  } catch (error) {
    console.error('API Consultants Error:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la récupération des consultants',
      details: error.message
    }, { status: 500 });
  }
}