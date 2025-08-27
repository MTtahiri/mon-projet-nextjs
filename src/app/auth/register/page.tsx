export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">
          Recrutement Anonyme
        </h1>
        
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-soft">
            <h2 className="text-xl font-semibold mb-4">Test Couleurs</h2>
            <div className="flex gap-2">
              <div className="w-12 h-12 bg-primary-100 rounded"></div>
              <div className="w-12 h-12 bg-primary-500 rounded"></div>
              <div className="w-12 h-12 bg-primary-700 rounded"></div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}