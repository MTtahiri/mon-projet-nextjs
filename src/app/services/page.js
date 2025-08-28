'use client';
import Link from 'next/link';

const ServiceCard = ({ icon, title, description, features, price }) => (
  <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 mb-6">{description}</p>
    <ul className="space-y-2 mb-6">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-center text-gray-700">
          <span className="text-green-500 mr-2">✓</span>
          {feature}
        </li>
      ))}
    </ul>
    <div className="border-t pt-4">
      <div className="text-2xl font-bold text-blue-600 mb-4">{price}</div>
      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
        Demander un devis
      </button>
    </div>
  </div>
);

export default function ServicesPage() {
  const services = [
    {
      icon: "💻",
      title: "Développement Web",
      description: "Solutions digitales sur-mesure pour votre entreprise",
      features: [
        "Sites web responsive",
        "Applications web complexes",
        "E-commerce personnalisé",
        "Maintenance et support",
        "SEO et performance"
      ],
      price: "À partir de 2 500€"
    },
    {
      icon: "📈",
      title: "Marketing Digital",
      description: "Stratégies marketing pour augmenter votre visibilité",
      features: [
        "Stratégie social media",
        "Campagnes publicitaires",
        "Content marketing",
        "Analytics et reporting",
        "Email marketing"
      ],
      price: "À partir de 1 800€"
    },
    {
      icon: "🎨",
      title: "Design & UX/UI",
      description: "Créations visuelles impactantes et expérience utilisateur optimale",
      features: [
        "Identité visuelle",
        "Design d'interface",
        "Prototype interactif",
        "Design system",
        "Tests utilisateur"
      ],
      price: "À partir de 2 200€"
    },
    {
      icon: "🎯",
      title: "Stratégie d'Entreprise",
      description: "Conseil et accompagnement pour développer votre activité",
      features: [
        "Audit concurrentiel",
        "Plan de développement",
        "Optimisation processus",
        "Formation équipes",
        "Suivi personnalisé"
      ],
      price: "À partir de 3 000€"
    }
  ];

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
              <Link href="/services" className="text-blue-600 font-medium">
                Services
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Nos Services
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Des solutions complètes pour accompagner votre transformation digitale 
            et développer votre activité
          </p>
          <Link 
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Discuter de votre projet
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Expertise & Savoir-faire
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nous mettons notre expertise au service de votre réussite avec des solutions 
              personnalisées et un accompagnement de qualité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <ServiceCard key={idx} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-xl mb-8">
            Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Nous contacter
            </Link>
            <Link 
              href="/consultants"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Voir nos consultants
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}