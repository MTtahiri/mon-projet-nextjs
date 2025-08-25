// src/components/Header.js
export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">SaveursMaghrebines</h1>
        <nav>
          <a href="/" className="mr-4 hover:underline">Accueil</a>
          <a href="/consultants" className="hover:underline">Consultants</a>
        </nav>
      </div>
    </header>
  );
}
