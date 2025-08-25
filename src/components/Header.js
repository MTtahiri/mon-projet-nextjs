'use client';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Saveurs Maghrebines</h1>
        <nav className="space-x-6">
          <a href="/" className="hover:underline">Accueil</a>
          <a href="/consultants" className="hover:underline">Consultants</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </nav>
      </div>
    </header>
  );
}
