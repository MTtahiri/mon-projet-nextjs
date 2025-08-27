import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recrutement Anonyme',
  description: 'Plateforme de recrutement RGPD compliant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}