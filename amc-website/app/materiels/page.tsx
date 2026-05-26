import type { Metadata } from "next";
import Link from "next/link";
import { getWnCategories } from "@/lib/wn-catalogue";
import { IconArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Nos matériels Wacker Neuson — AMC Alpes Matériel Compact",
  description:
    "Découvrez la gamme complète de matériels Wacker Neuson disponibles chez AMC : mini-pelles, dumpers, chargeuses, compacteurs, plaques vibrantes, pilonneuses. Distributeur officiel Rhône-Alpes.",
};

const CATEGORY_ICONS: Record<string, string> = {
  "mini-pelles": "⛏️",
  "dumpers": "🚛",
  "chargeuses": "🏗️",
  "compacteurs": "⚫",
  "plaques-vibrantes": "📳",
  "pilonneuses": "🔨",
  "marteaux-piqueurs": "🪛",
  "outillage": "🔧",
  "telescopiques": "🏢",
};

export default function MaterielHubPage() {
  const categories = getWnCategories();

  return (
    <div className="min-h-screen bg-amc-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-amc py-3">
          <nav className="text-sm text-amc-text-secondary" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-amc-yellow-dark">Accueil</Link></li>
              <li aria-hidden>/</li>
              <li className="font-medium text-amc-text">Nos matériels</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-amc py-12">
        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amc-text-secondary bg-white px-3 py-1 rounded-full border border-gray-200">
              Distributeur officiel
            </span>
            <span className="text-xs font-bold uppercase tracking-wider bg-amc-yellow text-amc-text px-3 py-1 rounded-full">
              Wacker Neuson
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-amc-text mb-4">
            Nos matériels de chantier
          </h1>
          <p className="text-amc-text-secondary leading-relaxed">
            AMC est distributeur officiel Wacker Neuson pour la région Rhône-Alpes.
            Découvrez notre gamme complète de matériels neufs avec garantie constructeur,
            SAV certifié SE+ et pièces d'origine.
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/materiels/${cat.slug}`}
              className="group bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 p-6 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amc-yellow/10 flex items-center justify-center text-2xl group-hover:bg-amc-yellow/20 transition-colors">
                  {CATEGORY_ICONS[cat.slug] ?? "🔧"}
                </div>
                <span className="text-xs text-amc-text-secondary bg-gray-100 px-2.5 py-1 rounded-full">
                  {cat.count} machine{cat.count > 1 ? "s" : ""}
                </span>
              </div>
              <h2 className="font-bold text-amc-text text-lg mb-1 group-hover:text-amc-yellow-dark transition-colors">
                {cat.label}
              </h2>
              <p className="text-sm text-amc-text-secondary flex-1 mb-4">
                Gamme Wacker Neuson — matériels neufs, SAV certifié SE+
              </p>
              <div className="flex items-center gap-1 text-sm font-semibold text-amc-yellow-dark group-hover:gap-2 transition-all">
                Voir la gamme <IconArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>

        {/* Reassurance strip */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: "🛡️", title: "Garantie constructeur", desc: "Tous les matériels neufs sont couverts par la garantie complète Wacker Neuson" },
            { icon: "🔧", title: "SAV certifié SE+", desc: "Atelier agréé et techniciens certifiés pour la maintenance et les réparations" },
            { icon: "🚚", title: "Livraison Rhône-Alpes", desc: "Nous livrons votre matériel partout en région Rhône-Alpes" },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl p-5 flex gap-4 shadow-card">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <p className="font-bold text-amc-text text-sm mb-1">{item.title}</p>
                <p className="text-xs text-amc-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 bg-amc-gray rounded-2xl p-8 text-center text-white">
          <h2 className="text-xl font-bold mb-3">Vous ne trouvez pas ce que vous cherchez ?</h2>
          <p className="text-white/70 mb-6 text-sm">
            Contactez nos experts — nous avons accès à l'ensemble du catalogue Wacker Neuson.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="btn-primary rounded-lg">
              Contacter un expert <IconArrowRight size={16} />
            </Link>
            <Link href="/devis" className="btn-outline rounded-lg">
              Demander un devis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
