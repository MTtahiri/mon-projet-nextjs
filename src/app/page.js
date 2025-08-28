'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // Modal Devenir Consultant
  function DevenirConsultantModal({ onClose }) {
    const [formData, setFormData] = useState({
      name: '', email: '', expertise: '', experience: '', message: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Inscription consultant:', formData);
      alert('Merci pour votre intérêt ! Nous vous contacterons bientôt.');
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Rejoindre S.M.Consulting</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
              <input
                type="text" required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email" required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Domaine d'expertise *</label>
              <select
                required
                value={formData.expertise}
                onChange={(e) => setFormData({...formData, expertise: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Sélectionnez votre domaine</option>
                <option value="dev">Développement Web</option>
                <option value="marketing">Marketing Digital</option>
                <option value="design">Design & UX/UI</option>
                <option value="strategie">Stratégie d'Entreprise</option>
                <option value="data">Data Science</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Années d'expérience *</label>
              <select
                required
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Sélectionnez</option>
                <option value="1-3">1-3 ans</option>
                <option value="3-5">3-5 ans</option>
                <option value="5-10">5-10 ans</option>
                <option value="10+">Plus de 10 ans</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message de présentation</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Présentez-vous et décrivez votre expertise..."
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
                Annuler
              </button>
              <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                Envoyer ma candidature
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-indigo-600">S.M.Consulting</h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Accueil
              </Link>
              <Link href="/consultants" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Consultants
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Services
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </Link>
              <button 
                onClick={() => setShowContactModal(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Connexion
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:text-indigo-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link href="/" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">
                Accueil
              </Link>
              <Link href="/consultants" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">
                Consultants
              </Link>
              <Link href="/services" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">
                Services
              </Link>
              <Link href="/contact" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium">
                Contact
              </Link>
              <button 
                onClick={() => setShowContactModal(true)}
                className="w-full text-left bg-indigo-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700"
              >
                Connexion
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Trouvez le <span className="text-indigo-600">consultant parfait</span> pour votre projet
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connectez-vous avec des experts qualifiés dans tous les domaines. 
              Notre plateforme vous aide à trouver le bon consultant pour faire avancer votre entreprise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultants" className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-300">
                Parcourir les consultants
              </Link>
              <button 
                onClick={() => setShowContactModal(true)}
                className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition duration-300"
              >
                Devenir consultant
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir S.M.Consulting ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Notre plateforme offre une expérience unique pour connecter les entreprises avec les meilleurs consultants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Consultants vérifiés</h3>
              <p className="text-gray-600">
                Tous nos consultants sont soigneusement sélectionnés et leurs compétences sont vérifiées.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Matching intelligent</h3>
              <p className="text-gray-600">
                Notre algorithme trouve le consultant idéal selon vos besoins spécifiques.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tarifs transparents</h3>
              <p className="text-gray-600">
                Pas de frais cachés. Vous savez exactement ce que vous payez avant de commencer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-indigo-200">Consultants experts</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-indigo-200">Projets réalisés</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-indigo-200">Satisfaction client</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24h</div>
              <div className="text-indigo-200">Temps de réponse moyen</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Rejoignez des milliers d'entreprises qui font confiance à S.M.Consulting pour leurs besoins en consulting.
          </p>
          <Link href="/consultants" className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-300 inline-block">
            Commencer maintenant
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">S.M.Consulting</h3>
              <p className="text-gray-400">
                La plateforme de référence pour connecter entreprises et consultants experts.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/services" className="hover:text-white">Développement</Link></li>
                <li><Link href="/services" className="hover:text-white">Marketing</Link></li>
                <li><Link href="/services" className="hover:text-white">Design</Link></li>
                <li><Link href="/services" className="hover:text-white">Stratégie</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact" className="hover:text-white">À propos</Link></li>
                <li><Link href="/contact" className="hover:text-white">Carrières</Link></li>
                <li><Link href="/contact" className="hover:text-white">Presse</Link></li>
                <li><Link href="/contact" className="hover:text-white">Partenaires</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact" className="hover:text-white">Centre d'aide</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/contact" className="hover:text-white">Conditions</Link></li>
                <li><Link href="/contact" className="hover:text-white">Confidentialité</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 S.M.Consulting. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Modal Devenir Consultant */}
      {showContactModal && (
        <DevenirConsultantModal onClose={() => setShowContactModal(false)} />
      )}
    </div>
  );
}