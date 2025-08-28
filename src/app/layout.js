import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'S.M.Consulting - Expertise & Solutions',
  description: 'Plateforme de consulting spécialisée. Trouvez les experts dont vous avez besoin.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}