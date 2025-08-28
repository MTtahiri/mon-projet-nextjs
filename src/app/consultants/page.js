// src/app/consultants/page.js - VERSION PROPRE
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Données de démonstration
const mockConsultants = [
  {
    id: 1,
    anonymousId: 'DEV001',
    title: 'Développeur Full-Stack Senior',
    experience: 8,
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'TypeScript'],
    location: 'Région Parisienne',
    availability: 'immediate',
    matchScore: 95,
    summary: 'Expert en développement web moderne avec une forte expérience en architecture cloud.'
  },
  {
    id: 2,
    anonymousId: 'DS002', 
    title: 'Data Scientist / ML Engineer',
    experience: 5,
    skills: ['Python', 'TensorFlow', 'AWS', 'Docker', 'SQL'],
    location: 'Lyon',
    availability: 'short',
    matchScore: 88,
    summary: 'Spécialiste en machine learning et analyse de données.'
  },
  {
    id: 3,
    anonymousId: 'OPS003',
    title: 'DevOps / Cloud Architect', 
    experience: 6,
    skills: ['Kubernetes', 'Terraform', 'AWS', 'Docker', 'Python'],
    location: 'Remote',
    availability: 'negotiable',
    matchScore: 92,
    summary: 'Expert en infrastructure cloud et automatisation.'
  }
];

// Composants UI simples
const Button = ({ children, onClick, className = '', variant = 'primary' }) => {
  const baseClasses = 'px-4 py-2 rounded font-medium transition-colors';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = '', onClick }) => (
  <div 
    className={`bg-white border border-gray-200 rounded-lg shadow-sm p-4 ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800'
  };
  
  return (
    <span className={`inline-block px-2 py-1 rounded text-xs ${variants[variant]}`}>
      {children}
    </span>
  );
};

// Composant carte consultant
function ConsultantCard({ consultant, onSelect }) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onSelect}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{consultant.title}</h3>
          <p className="text-gray-600">{consultant.experience} ans d'expérience</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{consultant.matchScore}%</div>
          <div className="text-xs text-gray-500">Compatibilité</div>
        </div>
      </div>

      <div className="mb-3">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Compétences principales</h4>
        <div className="flex flex-wrap gap-1">
          {consultant.skills.slice(0, 4).map((skill, idx) => (
            <Badge key={idx} variant="primary">{skill}</Badge>
          ))}
          {consultant.skills.length > 4 && (
            <Badge variant="default">+{consultant.skills.length - 4}</Badge>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
        <span>{consultant.location}</span>
        <Badge variant={consultant.availability === 'immediate' ? 'success' : 'warning'}>
          {consultant.availability === 'immediate' ? 'Immédiat' : 
           consultant.availability === 'short' ? 'Court terme' : 'Négociable'}
        </Badge>
      </div>

      <Button className="w-full">
        Voir le profil détaillé
      </Button>
    </Card>
  );
}

// Modal simple
function ConsultantModal({ consultant, onClose }) {
  if (!consultant) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{consultant.title}</h2>
              <p className="text-gray-600">ID: {consultant.anonymousId}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Résumé professionnel</h3>
            <p className="text-gray-700">{consultant.summary}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Informations</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Expérience</p>
                <p className="font-medium">{consultant.experience} ans</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Localisation</p>
                <p className="font-medium">{consultant.location}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Compétences</h3>
            <div className="flex flex-wrap gap-2">
              {consultant.skills.map((skill, idx) => (
                <Badge key={idx} variant="primary">{skill}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t flex justify-between">
          <Button variant="secondary" onClick={onClose}>
            Fermer
          </Button>
          <Button>
            Contacter
          </Button>
        </div>
      </div>
    </div>
  );
}

// Page principale
export default function ConsultantsPage() {
  const [consultants] = useState(mockConsultants);
  const [filteredConsultants, setFilteredConsultants] = useState(mockConsultants);
  const [filters, setFilters] = useState({
    skills: '',
    experience: '',
    availability: ''
  });
  const [selectedConsultant, setSelectedConsultant] = useState(null);

  // Filtrage
  useEffect(() => {
    let filtered = consultants;

    if (filters.skills) {
      filtered = filtered.filter(consultant =>
        consultant.skills.some(skill => 
          skill.toLowerCase().includes(filters.skills.toLowerCase())
        )
      );
    }

    if (filters.experience) {
      const ranges = { junior: [1, 3], mid: [3, 7], senior: [7, 100] };
      const [min, max] = ranges[filters.experience] || [0, 100];
      filtered = filtered.filter(c => c.experience >= min && c.experience < max);
    }

    if (filters.availability) {
      filtered = filtered.filter(c => c.availability === filters.availability);
    }

    setFilteredConsultants(filtered);
  }, [filters, consultants]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              RecrutAnonymE
            </Link>
            <nav className="space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Accueil
              </Link>
              <Link href="/consultants" className="text-blue-600 font-medium">
                Consultants
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profils Consultants</h1>
          <p className="mt-2 text-gray-600">
            {filteredConsultants.length} profils disponibles • Tous anonymisés
          </p>
        </div>

        {/* Filtres */}
        <Card className="mb-8 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Compétences
              </label>
              <input
                type="text"
                placeholder="Ex: React, Python"
                value={filters.skills}
                onChange={(e) => setFilters({...filters, skills: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expérience
              </label>
              <select
                value={filters.experience}
                onChange={(e) => setFilters({...filters, experience: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Toutes</option>
                <option value="junior">Junior (1-3 ans)</option>
                <option value="mid">Confirmé (3-7 ans)</option>
                <option value="senior">Senior (7+ ans)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Disponibilité
              </label>
              <select
                value={filters.availability}
                onChange={(e) => setFilters({...filters, availability: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Toutes</option>
                <option value="immediate">Immédiate</option>
                <option value="short">Court terme</option>
                <option value="negotiable">Négociable</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Liste des consultants */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConsultants.map((consultant) => (
            <ConsultantCard
              key={consultant.id}
              consultant={consultant}
              onSelect={() => setSelectedConsultant(consultant)}
            />
          ))}
        </div>

        {filteredConsultants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun profil trouvé avec ces critères</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedConsultant && (
        <ConsultantModal
          consultant={selectedConsultant}
          onClose={() => setSelectedConsultant(null)}
        />
      )}
    </div>
  );
}