export default function ContenuPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Textes & Contenus</h1>
      <p className="text-gray-500 text-sm mb-6">Section en cours de développement.</p>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800 max-w-lg">
        <strong>À venir :</strong> édition inline des textes de la page d'accueil, à propos, contact, et du footer.
        Les contenus seront centralisés dans <code>lib/site-content.json</code>.
      </div>
    </div>
  );
}
