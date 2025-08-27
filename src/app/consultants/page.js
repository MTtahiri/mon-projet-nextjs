// FICHIER: src/app/consultants/page.js - Page consultants complète
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Données de démonstration réalistes
const mockConsultants = [
  {
    id: 1, anonymousId: 'DEV001', title: 'Développeur Full-Stack Senior',
    experience: 8, skills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'TypeScript'],
    location: 'Région Parisienne', availability: 'immediate', matchScore: 95,
    summary: 'Expert en développement web moderne avec une forte expérience en architecture cloud et méthodologies agiles.',
    skillCategories: [
      { name: 'Frontend', skills: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS'] },
      { name: 'Backend', skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'] },
      { name: 'Cloud', skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'] }
    ],
    experiences: [{
      role: 'Lead Developer', duration: '2020 - Présent', sector: 'FinTech', companySize: '50-200 employés',
      description: 'Direction technique d\'une équipe de 6 développeurs sur plateforme de paiement B2B.',
      achievements: ['Réduction 40% temps de déploiement', 'Migration cloud (99.9% uptime)', 'Architecture microservices']
    }],
    education: [{ degree: 'Master Informatique', field: 'Génie Logiciel', year: '2016' }]
  },
  {
    id: 2, anonymousId: 'DS002', title: 'Data Scientist / ML Engineer',
    experience: 5, skills: ['Python', 'TensorFlow', 'AWS', 'Docker', 'SQL'],
    location: 'Lyon', availability: 'short', matchScore: 88,
    summary: 'Spécialiste en machine learning et analyse de données avec expérience industrielle en IA prédictive.',
    skillCategories: [
      { name: 'ML/AI', skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'MLflow'] },
      { name: 'Data Engineering', skills: ['Python', 'Spark', 'Airflow', 'Kafka'] },
      { name: 'Cloud', skills: ['AWS', 'GCP', 'Docker', 'Kubernetes'] }
    ],
    experiences: [{
      role: 'Data Scientist Senior', duration: '2021 - Présent', sector: 'Industrie 4.0', companySize: '500+ employés',
      description: 'Développement de modèles prédictifs pour optimisation chaînes de production.',
      achievements: ['Réduction 25% défauts qualité', 'ROI 300% sur projets IA', '12 modèles en production']
    }],
    education: [{ degree: 'Master Data Science', field: 'Intelligence Artificielle', year: '2019' }]
  },
  {
    id: 3, anonymousId: 'OPS003', title: 'DevOps / Cloud Architect',
    experience: 6, skills: ['Kubernetes', 'Terraform', 'AWS', 'Docker', 'Python'],
    location: 'Remote', availability: 'negotiable', matchScore: 92,
    summary: 'Expert en infrastructure cloud et automatisation avec forte expérience en transformation digitale.',
    skillCategories: [
      { name: 'Cloud', skills: ['AWS', 'Azure', 'GCP', 'Multi-cloud'] },
      { name: 'Containers', skills: ['Docker', 'Kubernetes', 'Helm', 'Istio'] },
      { name: 'IaC', skills: ['Terraform', 'Ansible', 'CloudFormation', 'Pulumi'] }
    ],
    experiences: [{
      role: 'Cloud Architect', duration: '2022 - Présent', sector: 'Media & Entertainment', companySize: '1000+ employés',
      description: 'Architecture et migration cloud pour plateforme de streaming.',
      achievements: ['Migration 100+ services cloud', 'Réduction 50% coûts infrastructure', 'CI/CD 200+ projets']
    }],
    education: [{ degree: 'Ingénieur Systèmes', field: 'Infrastructure & Réseaux', year: '2018' }]
  },
  {
    id: 4, anonymousId: 'UX004', title: 'UX/UI Designer Senior',
    experience: 7, skills: ['Figma', 'Adobe XD', 'React', 'Design System', 'Prototyping'],
    location: 'Bordeaux', availability: 'immediate', matchScore: 91,
    summary: 'Designer expérimenté spécialisé dans la création d\'expériences utilisateur exceptionnelles pour applications web et mobile.',
    skillCategories: [
      { name: 'Design', skills: ['Figma', 'Adobe Creative Suite', 'Sketch', 'Principle'] },
      { name: 'UX Research', skills: ['User Testing', 'Analytics', 'Personas', 'Journey Mapping'] },
      { name: 'Tech', skills: ['HTML/CSS', 'React', 'Design Systems', 'Accessibilité'] }
    ],
    experiences: [{
      role: 'Lead UX Designer', duration: '2019 - Présent', sector: 'E-commerce', companySize: '200-500 employés',
      description: 'Direction design produit pour marketplace avec +2M utilisateurs.',
      achievements: ['+35% conversion checkout', 'Design system adopté par 15 équipes', 'Prix UX Award 2023']
    }],
    education: [{ degree: 'Master Design Interactif', field: 'UX/UI Design', year: '2017' }]
  },
  {
    id: 5, anonymousId: 'PM005', title: 'Product Manager Tech',
    experience: 9, skills: ['Agile', 'Scrum', 'Analytics', 'A/B Testing', 'SQL'],
    location: 'Nantes', availability: 'short', matchScore: 87,
    summary: 'Product Manager expérimenté avec background technique, spécialisé dans la croissance produit et l\'innovation.',
    skillCategories: [
      { name: 'Product', skills: ['Product Strategy', 'Roadmapping', 'OKRs', 'Go-to-Market'] },
      { name: 'Analytics', skills: ['Google Analytics', 'Mixpanel', 'SQL', 'Data Visualization'] },
      { name: 'Tech', skills: ['Agile', 'Scrum', 'Kanban', 'API Design'] }
    ],
    experiences: [{
      role: 'Senior Product Manager', duration: '2020 - Présent', sector: 'SaaS B2B', companySize: '100-300 employés',
      description: 'Gestion produit plateforme CRM avec +10k utilisateurs entreprise.',
      achievements: ['Croissance 150% ARR', 'Lancement 3 features majeures', 'NPS score 72+']
    }],
    education: [{ degree: 'École de Commerce', field: 'Management & Innovation', year: '2015' }]
  },
  {
    id: 6, anonymousId: 'SEC006', title: 'Security Engineer / Pentester',
    experience: 4, skills: ['Pentesting', 'OWASP', 'Python', 'Burp Suite', 'Kali Linux'],
    location: 'Toulouse', availability: 'negotiable', matchScore: 89,
    summary: 'Expert en sécurité informatique spécialisé dans les tests de pénétration et l\'audit sécurité d\'applications web.',
    skillCategories: [
      { name: 'Security', skills: ['Pentesting', 'OWASP Top 10', 'Vulnerability Assessment', 'SIEM'] },
      { name: 'Tools', skills: ['Burp Suite', 'Metasploit', 'Nmap', 'Wireshark'] },
      { name: 'Dev', skills: ['Python', 'Bash', 'PowerShell', 'C++'] }
    ],
    experiences: [{
      role: 'Security Consultant', duration: '2021 - Présent', sector: 'Cybersécurité', companySize: '20-50 employés',
      description: 'Audits sécurité et tests de pénétration pour clients grands comptes.',
      achievements: ['50+ audits sécurité réalisés', 'Certification OSCP', 'Formation équipes dev']
    }],
    education: [{ degree: 'Master Cybersécurité', field: 'Sécurité des Systèmes', year: '2020' }]
  }
];

// Composants UI
const Button = ({ variant = 'primary', size = 'md', children, onClick, className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-blue-500'
  };
  const sizes = {
    sm: 'h-8 px-3 text-sm rounded-md', md: 'h-10 px-4 py-2 rounded-md', lg: 'h-12 px-6 py-3 text-lg rounded-lg'
  };
  
  return <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick} {...props}>{children}</button>;
};

const Card = ({ children, className = '', hover = false, onClick }) => (
  <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${hover ? 'hover:shadow-md hover:border-gray-300 transition-all duration-200 cursor-pointer' : ''} ${className}`} onClick={onClick}>
    {children}
  </div>
);

const Badge = ({ variant = 'default', children }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800', success: 'bg-green-50 text-green-700',
    warning: 'bg-yellow-50 text-yellow-700', primary: 'bg-blue-50 text-blue-700'
  };
  return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>{children}</span>;
};

// Modal consultant détaillé
function ConsultantModal({ consultant, onClose }) {
  const [showContactForm, setShowContactForm] = useState(false);

  if (showContactForm) {
    return <ContactForm consultant={consultant} onClose={onClose} onBack={() => setShowContactForm(false)} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{consultant.title}</h2>
              <p className="text-gray-600">Profil anonyme • ID: {consultant.anonymousId}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">×</button>
          </div>
        </div>

        <div className="p-6">
          {/* Résumé */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé professionnel</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <p className="text-gray-700 leading-relaxed">{consultant.summary}</p>
              </div>
              <div className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Expérience</dt>
                  <dd className="text-lg font-semibold text-gray-900">{consultant.experience} ans</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Disponibilité</dt>
                  <dd><Badge variant={consultant.availability === 'immediate' ? 'success' : 'warning'}>{consultant.availability}</Badge></dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Localisation</dt>
                  <dd className="text-gray-900">{consultant.location}</dd>
                </div>
              </div>
            </div>
          </section>

          {/* Compétences */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compétences techniques</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {consultant.skillCategories.map((category, idx) => (
                <div key={idx}>
                  <h4 className="font-medium text-gray-700 mb-2">{category.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIdx) => (
                      <Badge key={skillIdx} variant="primary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Expérience */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Expérience professionnelle</h3>
            <div className="space-y-6">
              {consultant.experiences.map((exp, idx) => (
                <div key={idx} className="border-l-2 border-blue-200 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{exp.role}</h4>
                    <span className="text-sm text-gray-500">{exp.duration}</span>
                  </div>
                  <p className="text-gray-600 mb-2">{exp.sector} • {exp.companySize}</p>
                  <p className="text-gray-700">{exp.description}</p>
                  {exp.achievements && (
                    <ul className="mt-2 text-sm text-gray-600">
                      {exp.achievements.map((achievement, achIdx) => (
                        <li key={achIdx} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>{achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Formation */}
          <section className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Formation & Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {consultant.education.map((edu, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                  <p className="text-gray-600">{edu.field} • {edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex justify-between">
            <Button variant="secondary" onClick={onClose}>Retour à la liste</Button>
            <Button onClick={() => setShowContactForm(true)}>Organiser une rencontre</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Formulaire de contact
function ContactForm({ consultant, onClose, onBack }) {
  const [formData, setFormData] = useState({
    company: '', recruiterName: '', email: '', phone: '', position: '', projectDescription: '', timeline: '', meetingPreference: 'video', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Demande de contact:', { consultantId: consultant.id, ...formData });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <span className="text-green-600 text-xl">✓</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Demande envoyée avec succès</h3>
            <p className="text-gray-600 mb-6">Votre demande a été transmise. Le consultant peut choisir de vous contacter.</p>
            <Button onClick={onClose} className="w-full">Fermer</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Demande de contact</h2>
              <p className="text-gray-600">Profil: {consultant.title}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">×</button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise *</label>
              <input type="text" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Votre nom *</label>
              <input type="text" required value={formData.recruiterName} onChange={(e) => setFormData({ ...formData, recruiterName: e.target.value })} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email professionnel *</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Poste à pourvoir *</label>
            <input type="text" required value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description du projet/mission *</label>
            <textarea rows={4} required value={formData.projectDescription} onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Contexte, missions principales, équipe..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timeline souhaitée</label>
              <select value={formData.timeline} onChange={(e) => setFormData({ ...formData, timeline: e.target.value })} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">Sélectionner</option>
                <option value="immediate">Immédiat</option>
                <option value="1month">Dans le mois</option>
                <option value="3months">Dans les 3 mois</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Modalité de rencontre</label>
              <select value={formData.meetingPreference} onChange={(e) => setFormData({ ...formData, meetingPreference: e.target.value })} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="video">Visioconférence</option>
                <option value="phone">Téléphone</option>
                <option value="inperson">En présentiel</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message complémentaire</label>
            <textarea rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Informations complémentaires..." />
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">
              <strong>Protection des données :</strong> Vos informations ne seront transmises au consultant qu'après son accord explicite. 
              Conformément au RGPD, vous disposez de droits sur vos données personnelles.
            </p>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="secondary" onClick={onBack}>Retour au profil</Button>
            <Button type="submit">Envoyer la demande</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Composant carte consultant
function ConsultantCard({ consultant, onSelect }) {
  return (
    <Card hover onClick={onSelect} className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{consultant.title}</h3>
          <p className="text-gray-600">{consultant.experience} ans d'expérience</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{consultant.matchScore}%</div>
          <div className="text-xs text-gray-500">Compatibilité</div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Compétences principales</h4>
        <div className="flex flex-wrap gap-1">
          {consultant.skills.slice(0, 4).map((skill, idx) => (
            <Badge key={idx} variant="primary">{skill}</Badge>
          ))}
          {consultant.skills.length > 4 && <Badge variant="default">+{consultant.skills.length - 4}</Badge>}
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <span>📍 {consultant.location}</span>
        <Badge variant={consultant.availability === 'immediate' ? 'success' : 'warning'}>
          {consultant.availability === 'immediate' ? '🟢 Immédiat' : 
           consultant.availability === 'short' ? '🟡 Court terme' : '🔵 Négociable'}
        </Badge>
      </div>

      <Button className="w-full">Voir le profil détaillé</Button>
    </Card>
  );
}

// Page principale
export default function ConsultantsPage() {
  const [consultants] = useState(mockConsultants);
  const [filteredConsultants, setFilteredConsultants] = useState(mockConsultants);
  const [filters, setFilters] = useState({ skills: '', experience: '', availability: '' });
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [loading] = useState(false);

  // Filtrage
  useEffect(() => {
    let filtered = consultants;

    if (filters.skills) {
      filtered = filtered.filter(consultant =>
        consultant.skills.some(skill => skill.toLowerCase().includes(filters.skills.toLowerCase()))
      );
    }

    if (filters.experience) {
      const experienceMap = { junior: [1, 3], mid: [3, 7], senior: [7, 100] };
      const [min, max] = experienceMap[filters.experience] || [0, 100];
      filtered = filtered.filter(consultant => consultant.experience >= min && consultant.experience < max);
    }

    if (filters.availability) {
      filtered = filtered.filter(consultant => consultant.availability === filters.availability);
    }

    setFilteredConsultants(filtered);
  }, [filters, consultants]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">🔒 RecrutAnonymE</Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Accueil</Link>
              <Link href="/consultants" className="text-blue-600 font-medium">Consultants</Link>
              <Link href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profils Consultants</h1>
          <p className="mt-2 text-gray-600">
            {filteredConsultants.length} profils disponibles • Tous anonymisés • Conformes RGPD 🔒
          </p>
        </div>

        {/* Filtres */}
        <Card className="mb-8 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">🔍 Compétences</label>
              <input type="text" placeholder="Ex: React, Python, AWS" value={filters.skills} onChange={(e) => setFilters({ ...filters, skills: e.target.value })} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">⏳ Expérience</label>
              <select value={filters.experience} onChange={(e) => setFilters({ ...filters, experience: e.target.value })} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">Toutes</option>
                <option value="junior">Junior (1-3 ans)</option>
                <option value="mid">Confirmé (3-7 ans)</option>
                <option value="senior">Senior (7+ ans)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">📅 Disponibilité</label>
              <select value={filters.availability} onChange={(e) => setFilters({ ...filters, availability: e.target.value })} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">Toutes</option>
                <option value="immediate">🟢 Immédiate</option>
                <option value="short">🟡 Court terme</option>
                <option value="negotiable">🔵 Négociable</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Liste des consultants */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 w-16 bg-gray-200 rounded"></div>
                  <div className="h-6 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </Card>
            ))
          ) : filteredConsultants.length > 0 ? (
            filteredConsultants.map((consultant) => (
              <ConsultantCard key={consultant.id} consultant={consultant} onSelect={() => setSelectedConsultant(consultant)} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-medium mb-2">Aucun profil trouvé</h3>
                <p>Essayez de modifier vos critères de recherche</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal détail */}
      {selectedConsultant && (
        <ConsultantModal consultant={selectedConsultant} onClose={() => setSelectedConsultant(null)} />
      )}
    </div>
  );
}