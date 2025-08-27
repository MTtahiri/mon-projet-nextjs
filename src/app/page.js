// FICHIER 1: src/app/page.js - Page d'accueil
import Link from 'next/link';

const Button = ({ children, href, variant = 'primary', size = 'md', className = '' }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-blue-500'
  };
  const sizes = {
    sm: 'h-8 px-3 text-sm rounded-md',
    md: 'h-10 px-4 py-2 rounded-md',
    lg: 'h-12 px-6 py-3 text-lg rounded-lg'
  };

  const Component = href ? Link : 'button';
  const props = href ? { href } : {};
  
  return (
    <Component className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </Component>
  );
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-blue-600">🔒 RecrutAnonymE</div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/consultants" className="text-gray-700 hover:text-blue-600 transition-colors">Consultants</Link>
              <Link href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">À propos</Link>
              <Link href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Recrutement <span className="text-blue-600">anonyme</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Découvrez des talents exceptionnels dans le respect total du RGPD. 
              Nos profils anonymisés vous permettent de recruter sur la compétence, pas sur les préjugés.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" href="/consultants">Explorer les profils</Button>
              <Button variant="ghost" size="lg">En savoir plus</Button>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Recrutement moderne</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Pourquoi choisir notre plateforme ?
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-x-3 mb-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-600">
                    <span className="text-white text-xl">🔒</span>
                  </div>
                  <h3 className="text-base font-semibold leading-7 text-gray-900">RGPD Compliant</h3>
                </div>
                <p className="text-base leading-7 text-gray-600">
                  Respect total de la confidentialité. Aucune donnée personnelle n'est exposée sans consentement explicite.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-x-3 mb-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-600">
                    <span className="text-white text-xl">⚡</span>
                  </div>
                  <h3 className="text-base font-semibold leading-7 text-gray-900">Process Optimisé</h3>
                </div>
                <p className="text-base leading-7 text-gray-600">
                  Interface intuitive pour une sélection rapide et efficace basée sur les compétences.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-x-3 mb-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-600">
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  <h3 className="text-base font-semibold leading-7 text-gray-900">Matching Précis</h3>
                </div>
                <p className="text-base leading-7 text-gray-600">
                  Algorithmes avancés pour matcher les compétences exactes avec vos besoins métier.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Nos résultats parlent d'eux-mêmes
            </h2>
            <p className="mt-4 text-lg leading-8 text-blue-200">Plus de 500 entreprises nous font confiance</p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col bg-blue-700/10 p-8">
              <dt className="text-sm font-semibold leading-6 text-blue-200">Consultants</dt>
              <dd className="order-first text-3xl font-bold tracking-tight text-white">2,500+</dd>
            </div>
            <div className="flex flex-col bg-blue-700/10 p-8">
              <dt className="text-sm font-semibold leading-6 text-blue-200">Entreprises</dt>
              <dd className="order-first text-3xl font-bold tracking-tight text-white">500+</dd>
            </div>
            <div className="flex flex-col bg-blue-700/10 p-8">
              <dt className="text-sm font-semibold leading-6 text-blue-200">Taux de succès</dt>
              <dd className="order-first text-3xl font-bold tracking-tight text-white">94%</dd>
            </div>
            <div className="flex flex-col bg-blue-700/10 p-8">
              <dt className="text-sm font-semibold leading-6 text-blue-200">Conformité RGPD</dt>
              <dd className="order-first text-3xl font-bold tracking-tight text-white">100%</dd>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Prêt à découvrir votre prochain talent ?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Explorez nos profils anonymisés et trouvez le consultant parfait pour votre projet.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" href="/consultants">Commencer maintenant</Button>
              <Button variant="ghost" size="lg">Planifier une démo</Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link href="#privacy" className="text-gray-400 hover:text-gray-500">Confidentialité</Link>
            <Link href="#terms" className="text-gray-400 hover:text-gray-500">CGU</Link>
            <Link href="#contact" className="text-gray-400 hover:text-gray-500">Contact</Link>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; 2025 RecrutAnonymE. Tous droits réservés. Conforme RGPD.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============================================================================
// FICHIER 2: src/app/layout.js - Layout principal
import './globals.css';

export const metadata = {
  title: 'RecrutAnonymE - Plateforme RGPD Compliant',
  description: 'Plateforme de recrutement respectueuse du RGPD. Découvrez des talents exceptionnels grâce à nos profils anonymisés.',
  keywords: ['recrutement', 'talents', 'RGPD', 'anonyme', 'consultants', 'tech'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

// ============================================================================  
// FICHIER 3: src/app/globals.css - Styles globaux
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Styles personnalisés */
.font-sans {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

/* Animations personnalisées */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
.animate-slide-up { animation: slideUp 0.3s ease-out; }

/* Responsive amélioré */
@media (max-width: 640px) {
  .text-responsive { font-size: 1.5rem !important; }
  .px-responsive { padding-left: 1rem !important; padding-right: 1rem !important; }
}

// ============================================================================
// FICHIER 4: package.json - Dependencies corrigées
{
  "name": "recrutement-anonyme",
  "version": "1.0.0",
  "description": "Plateforme de recrutement RGPD compliant avec profils anonymisés",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.5.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.5.0",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.6.3"
  },
  "keywords": [
    "recrutement", "RGPD", "anonyme", "nextjs", "react", "tailwindcss"
  ],
  "author": "Votre Nom",
  "license": "MIT"
}

// ============================================================================
// FICHIER 5: next.config.js - Configuration Next.js
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['your-domain.com'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;

// ============================================================================
// FICHIER 6: tailwind.config.js - Configuration Tailwind
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
    },
  },
  plugins: [],
};

// ============================================================================
// FICHIER 7: postcss.config.js - Configuration PostCSS
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};