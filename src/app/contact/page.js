'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuler l'envoi (à remplacer par votre logique d'envoi réelle)
    setTimeout(() => {
      console.log('Formulaire soumis:', formData);
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Message envoyé !</h2>
          <p className="text-gray-600 mb-6">
            Merci pour votre message. Notre équipe vous contactera dans les plus brefs délais.
          </p>
          <Link 
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              S.M.Consulting
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Accueil
              </Link>
              <Link href="/consultants" className="text-gray-700 hover:text-blue-600 transition-colors">
                Consultants
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors">
                Services
              </Link>
              <Link href="/contact" className="text-blue-600 font-medium">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contactez-nous
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Prêt à démarrer votre projet ? Notre équipe est là pour vous accompagner 
              et répondre à toutes vos questions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Informations Contact */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Parlons de votre projet
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <span className="text-blue-600 text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">contact@sm-consulting.fr</p>
                    <p className="text-gray-600">Réponse sous 24h</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <span className="text-blue-600 text-xl">📱</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Téléphone</h3>
                    <p className="text-gray-600">+33 (0)6 XX XX XX XX</p>
                    <p className="text-gray-600">Lun-Ven 9h-18h</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <span className="text-blue-600 text-xl">⏱️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Consultation gratuite</h3>
                    <p className="text-gray-600">30 minutes pour analyser vos besoins</p>
                    <Link 
                      href="#"
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Réserver un créneau →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Pourquoi choisir S.M.Consulting ?
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Expertise multi-domaines
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Accompagnement personnalisé
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Résultats mesurables
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Support continu
                  </li>
                </ul>
              </div>
            </div>

            {/* Formulaire */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Démarrons la conversation
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* ... tous tes inputs ... */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
