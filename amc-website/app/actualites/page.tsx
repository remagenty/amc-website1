import type { Metadata } from "next";
import { Suspense } from "react";
import { ActualitesFeed } from "./ActualitesFeed";

export const metadata: Metadata = {
  title: "Actualités & Expertise | AMC Alpes Matériel Compact",
  description:
    "Retrouvez les dernières actualités, conseils d'experts et guides pratiques d'AMC, votre partenaire matériel de chantier en Rhône-Alpes.",
};

export default function ActualitesPage() {
  return (
    <div className="min-h-screen bg-amc-cream">

      {/* Header compact — sans séparation visuelle avec les filtres */}
      <section className="bg-amc-cream pt-8 pb-0">
        <div className="container-amc">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-amc-text">
              Actualités & Expertise
            </h1>
            <p className="mt-3 text-lg text-amc-text leading-relaxed">
              Conseils terrain, nouveautés constructeurs, guides pratiques — tout ce qu&apos;il faut savoir
              pour optimiser vos chantiers.
            </p>
          </div>
        </div>
      </section>

      {/* Feed filtrable (client component) */}
      <Suspense fallback={<div className="container-amc py-16 text-center text-amc-text-secondary text-sm">Chargement…</div>}>
        <ActualitesFeed />
      </Suspense>

      {/* Newsletter CTA */}
      <section className="bg-white border-t border-gray-100 py-14">
        <div className="container-amc">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-amc-text mb-2">
              Restez informé
            </h2>
            <p className="text-amc-text-secondary text-sm mb-6">
              Recevez nos derniers articles, conseils d&apos;experts et actualités matériel directement dans votre boîte mail.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-amc-yellow focus:ring-2 focus:ring-amc-yellow/20"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg text-sm font-bold transition-all hover:brightness-95 whitespace-nowrap"
                style={{ backgroundColor: "#FFD500", color: "#000000" }}
              >
                S&apos;abonner
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
