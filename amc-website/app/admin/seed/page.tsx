"use client";

import { useState } from "react";

type SeedResult = {
  ok: boolean;
  log: string[];
  error?: string;
};

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SeedResult | null>(null);
  const [force, setForce] = useState(false);

  async function runSeed() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/seed-now", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ force }),
      });
      const data = await res.json() as SeedResult;
      setResult(data);
    } catch (e) {
      setResult({ ok: false, log: [], error: String(e) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Import initial des données</h1>
        <p className="text-sm text-gray-500 mt-1">
          Peuple Vercel KV avec toutes les données existantes du site (catalogues, équipe, articles, avis, partenaires, contenus, services).
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
        <p className="font-semibold mb-1">À utiliser une seule fois</p>
        <p>Par défaut, les clés KV déjà renseignées sont ignorées. Cochez &quot;Forcer&quot; pour tout écraser.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
        <p className="text-sm font-medium text-gray-700 mb-3">Données qui seront importées :</p>
        <ul className="space-y-1.5 text-sm text-gray-600">
          {[
            "catalogue:wacker_neuson — machines WACKER NEUSON",
            "catalogue:magni — machines Magni",
            "catalogue:promove — machines Promove Demolition",
            "team — 4 membres de l'équipe",
            "articles — 10 articles existants (converti en Markdown)",
            "reviews — 11 avis clients + note globale 4.6",
            "partners — 3 fiches partenaires",
            "site-content — contact, hero, ticker, stats, SEO…",
            "services — financement, maintenance, certification SAV",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <svg className="mt-0.5 flex-shrink-0 text-green-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={force}
            onChange={(e) => setForce(e.target.checked)}
            className="w-4 h-4 accent-yellow-400"
          />
          <span className="text-sm text-gray-700 font-medium">Forcer l&apos;écrasement des données existantes</span>
        </label>
      </div>

      <button
        onClick={runSeed}
        disabled={loading}
        className="w-full px-6 py-3 bg-[#ffd500] hover:bg-[#e6c000] text-gray-900 font-bold rounded-xl text-sm disabled:opacity-60 transition-colors"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" opacity=".25"/><path d="M21 12a9 9 0 0 1-9 9"/></svg>
            Import en cours…
          </span>
        ) : (
          "🚀 Lancer l'import"
        )}
      </button>

      {result && (
        <div className={`mt-6 rounded-xl border p-4 ${result.ok ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
          <p className={`font-semibold text-sm mb-3 ${result.ok ? "text-green-800" : "text-red-800"}`}>
            {result.ok ? "✅ Import terminé avec succès" : "❌ Erreur pendant l'import"}
          </p>
          {result.error && (
            <p className="text-xs text-red-700 mb-2 font-mono bg-red-100 rounded px-2 py-1">{result.error}</p>
          )}
          <ul className="space-y-1">
            {result.log.map((line, i) => (
              <li key={i} className="text-xs font-mono text-gray-700 flex items-start gap-1.5">
                <span className={line.includes("skipped") ? "text-gray-400" : "text-green-600"}>
                  {line.includes("skipped") ? "–" : "✓"}
                </span>
                {line}
              </li>
            ))}
          </ul>
          {result.ok && (
            <p className="mt-3 text-xs text-green-700">
              Toutes les pages publiques lisent maintenant depuis KV. Les modifications dans l&apos;admin sont immédiatement visibles sur le site.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
