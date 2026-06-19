export default function ActualitesPage() {
  return (
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Actualités & Expertise</h1>
      <p className="text-gray-500 text-sm mb-6">Section en cours de développement.</p>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800 max-w-lg">
        <strong>À venir :</strong> gestion des articles de blog, guides techniques et actualités AMC.
        Les articles seront stockés dans <code>lib/articles.json</code>.
      </div>
    </div>
  );
}
