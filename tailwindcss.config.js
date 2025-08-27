// 📁 tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs principales
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Couleurs neutres
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        // Couleurs sémantiques
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.2s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'soft': '0 2px 8px 0 rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 16px 0 rgba(0, 0, 0, 0.12)',
        'strong': '0 8px 32px 0 rgba(0, 0, 0, 0.16)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

// 📁 src/app/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply text-neutral-900 bg-neutral-50;
    font-feature-settings: 'rlig' 1, 'calt' 1;
  }
  
  * {
    @apply border-neutral-200;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply text-neutral-900;
    font-weight: 600;
    line-height: 1.25;
  }
  
  p {
    @apply text-neutral-700;
    line-height: 1.6;
  }
  
  /* Focus styles améliorés */
  *:focus-visible {
    @apply outline-2 outline-offset-2 outline-primary-500;
  }
}

@layer components {
  /* Scrollbar personnalisée */
  .scrollbar-thin {
    scrollbar-width: thin;
    scrollbar-color: rgb(209 213 219) transparent;
  }
  
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: rgb(209 213 219);
    border-radius: 3px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background-color: rgb(156 163 175);
  }
}

// 📁 package.json (Ajout des dépendances Tailwind)
{
  "name": "plateforme-recrutement-anonyme",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^15.0.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "typescript": "^5.3.3",
    "eslint": "^8.56.0",
    "eslint-config-next": "^15.0.3",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "@tailwindcss/forms": "^0.5.7",
    "@tailwindcss/typography": "^0.5.10"
  }
}

// 📁 postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

// 📁 src/app/page.tsx (Test des couleurs)
export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">
          Recrutement Anonyme
        </h1>
        
        <div className="space-y-6">
          {/* Test des couleurs primaires */}
          <section className="bg-white p-6 rounded-lg shadow-soft">
            <h2 className="text-xl font-semibold mb-4">Test Couleurs Primaires</h2>
            <div className="flex gap-2">
              <div className="w-12 h-12 bg-primary-100 rounded"></div>
              <div className="w-12 h-12 bg-primary-300 rounded"></div>
              <div className="w-12 h-12 bg-primary-500 rounded"></div>
              <div className="w-12 h-12 bg-primary-700 rounded"></div>
            </div>
          </section>

          {/* Test des couleurs sémantiques */}
          <section className="bg-white p-6 rounded-lg shadow-soft">
            <h2 className="text-xl font-semibold mb-4">Test Couleurs Sémantiques</h2>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-success-100 text-success-700 rounded">
                Succès
              </div>
              <div className="px-4 py-2 bg-warning-100 text-warning-700 rounded">
                Attention
              </div>
              <div className="px-4 py-2 bg-error-100 text-error-700 rounded">
                Erreur
              </div>
            </div>
          </section>

          {/* Test des ombres */}
          <section className="bg-white p-6 rounded-lg shadow-soft">
            <h2 className="text-xl font-semibold mb-4">Test Ombres</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-20 bg-white rounded shadow-soft flex items-center justify-center">
                Soft
              </div>
              <div className="h-20 bg-white rounded shadow-medium flex items-center justify-center">
                Medium
              </div>
              <div className="h-20 bg-white rounded shadow-strong flex items-center justify-center">
                Strong
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

git add src/auth.ts src/app/layout.js
git commit -m "fix: Final attempt to resolve auth function import issue with default export"
git push origin main
