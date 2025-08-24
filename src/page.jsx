'use client';
import { useState, useEffect } from 'react';
import { Search, Briefcase, Star, Calendar } from 'lucide-react';

export default function ConsultantsPage() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    skills: '',
    niveau: '',
    minExp: 0,
    enhanced: false
  });

  useEffect(() => {
    fetchCandidates();
  }, [filters]);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        skills: filters.skills,
        niveau: filters.niveau,
        minExp: filters.minExp.toString(),
        enhanced: filters.enhanced.toString()
      });

      const response = await fetch(`/api/consultants?${params}`);
      const result = await response.json();
      
      if (result.success) {
        setCandidates(result.data);
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🤝 Consultants SaveursMaghrebines
          </h1>
          <p className="text-xl text-gray-600">
            {candidates.length} consultants qualifiés • Scoring IA avancé
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Compétences</label>
              <input
                type="text"
                placeholder="React, Node.js, Python..."
                value={filters.skills}
                onChange={(e) => setFilters({...filters, skills: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Niveau</label>
              <select
                value={filters.niveau}
                onChange={(e) => setFilters({...filters, niveau: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Tous</option>
                <option value="junior">Junior</option>
                <option value="confirmé">Confirmé</option>
                <option value="senior">Senior</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Expérience min</label>
              <select
                value={filters.minExp}
                onChange={(e) => setFilters({...filters, minExp: parseInt(e.target.value)})}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="0">Tous</option>
                <option value="2">2+ ans</option>
                <option value="5">5+ ans</option>
                <option value="10">10+ ans</option>
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.enhanced}
                  onChange={(e) => setFilters({...filters, enhanced: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm">Analyse IA avancée</span>
              </label>
            </div>
          </div>
        </div>

        {/* Liste candidats */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 w-16 bg-gray-200 rounded"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))
          ) : (
            candidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                enhanced={filters.enhanced}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function CandidateCard({ candidate, enhanced }) {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const displayScore = enhanced ? 
    (candidate.scoring?.hybrid || candidate.scoreIA) : 
    candidate.scoreIA;

  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">
            {candidate.posteAnonyme || `${candidate.niveau} ${candidate.poste}`}
          </h3>
          <p className="text-gray-600 flex items-center mt-1">
            <Briefcase className="h-4 w-4 mr-1" />
            {candidate.experience} ans d'expérience
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(displayScore)}`}>
          {displayScore}/100
          {enhanced && <span className="block text-xs">IA Avancée</span>}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-sm text-gray-700 mb-2">Compétences</h4>
        <div className="flex flex-wrap gap-2">
          {(candidate.competences || []).slice(0, 4).map((skill, idx) => (
            <span 
              key={idx}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
            >
              {skill}
            </span>
          ))}
          {candidate.competences?.length > 4 && (
            <span className="text-gray-500 text-xs">
              +{candidate.competences.length - 4} autres
            </span>
          )}
        </div>
      </div>

      {enhanced && candidate.analysis && (
        <div className="mb-4 p-3 bg-purple-50 rounded">
          <h4 className="font-medium text-sm text-purple-800 mb-1">Analyse IA</h4>
          <p className="text-xs text-purple-700">
            {candidate.analysis.technical?.substring(0, 100)}...
          </p>
        </div>
      )}

      <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
        <span className="flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          {candidate.dateAjout || 'Récent'}
        </span>
        <span className="flex items-center">
          <Star className="h-3 w-3 mr-1" />
          Vérifié ✓
        </span>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        Voir le profil
      </button>
    </div>
  );
}