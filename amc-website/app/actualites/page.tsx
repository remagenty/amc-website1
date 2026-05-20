import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Actualités & Expertise | AMC Alpes Matériel Compact",
  description:
    "Retrouvez les dernières actualités, conseils d'experts et guides pratiques d'AMC, votre partenaire matériel de chantier en Rhône-Alpes.",
};

const CATEGORY_STYLES: Record<string, { bg: string; color: string }> = {
  Nouveautés: { bg: "#d1fae5", color: "#065f46" },
  Conseils:   { bg: "#dbeafe", color: "#1e40af" },
  Actualités: { bg: "#fef3c7", color: "#92400e" },
  Guides:     { bg: "#ede9fe", color: "#5b21b6" },
};

const ARTICLES = [
  {
    slug: "wacker-neuson-gamme-zero-emission-2026",
    title: "Wacker Neuson lance sa nouvelle gamme zéro émission 2026",
    category: "Nouveautés",
    summary:
      "Découvrez la révolution électrique avec les nouvelles mini-pelles et compacteurs 100% électriques. Performance maximale, zéro émission, pour des chantiers urbains plus propres.",
    date: "15 mai 2026",
    readTime: "3 min",
    gradientFrom: "#34d399",
    gradientTo: "#0f766e",
    icon: "⚡",
  },
  {
    slug: "5-conseils-maintenance-engins-chantier",
    title: "5 conseils pour optimiser la maintenance de vos engins de chantier",
    category: "Conseils",
    summary:
      "Prolongez la durée de vie de votre matériel et réduisez vos coûts d'exploitation grâce à ces bonnes pratiques d'entretien préventif recommandées par nos experts.",
    date: "10 mai 2026",
    readTime: "5 min",
    gradientFrom: "#60a5fa",
    gradientTo: "#1d4ed8",
    icon: "🔧",
  },
  {
    slug: "amc-certification-se-plus-saint-felix",
    title: "AMC obtient la certification SE+ pour son atelier de Saint-Félix",
    category: "Actualités",
    summary:
      "Notre atelier est désormais certifié SE+ par Wacker Neuson, garantissant un service après-vente d'excellence avec des techniciens qualifiés et un stock de pièces détachées optimal.",
    date: "3 mai 2026",
    readTime: "4 min",
    gradientFrom: "#fbbf24",
    gradientTo: "#d97706",
    icon: "🏆",
  },
  {
    slug: "chantiers-montagne-quel-equipement-choisir",
    title: "Chantiers en montagne : quel équipement choisir ?",
    category: "Guides",
    summary:
      "Altitude, pentes raides, accès difficiles : nos experts vous guident dans le choix du matériel adapté aux contraintes spécifiques des chantiers alpins.",
    date: "28 avril 2026",
    readTime: "6 min",
    gradientFrom: "#94a3b8",
    gradientTo: "#334155",
    icon: "⛰️",
  },
];

export default function ActualitesPage() {
  return (
    <div className="min-h-screen bg-amc-cream">

      {/* Hero */}
      <section className="bg-amc-cream py-6 md:py-8">
        <div className="container-amc">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-amc-text">
              Actualités & Expertise
            </h1>
            <p className="mt-4 text-lg text-amc-text leading-relaxed">
              Conseils terrain, nouveautés constructeurs, guides pratiques — tout ce qu'il faut savoir
              pour optimiser vos chantiers.
            </p>
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="section-padding">
        <div className="container-amc">

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {["Tous", "Nouveautés", "Conseils", "Actualités", "Guides"].map((tag) => (
              <span
                key={tag}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold cursor-pointer transition-all ${
                  tag === "Tous"
                    ? "bg-amc-text text-white"
                    : "bg-white text-amc-text-secondary hover:bg-amc-yellow/10 border border-gray-200"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTICLES.map((article) => {
              const catStyle = CATEGORY_STYLES[article.category] ?? { bg: "#f3f4f6", color: "#374151" };
              return (
                <article
                  key={article.slug}
                  className="group bg-white rounded-2xl shadow-card overflow-hidden flex flex-col transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
                >
                  {/* Image placeholder */}
                  <div className="relative overflow-hidden" style={{ paddingTop: "56.25%" }}>
                    <div
                      className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${article.gradientFrom}, ${article.gradientTo})`,
                      }}
                    >
                      <span className="text-6xl select-none">{article.icon}</span>
                    </div>
                    {/* Category badge over image */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-bold"
                        style={{ backgroundColor: catStyle.bg, color: catStyle.color }}
                      >
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    {/* Meta */}
                    <div className="flex items-center gap-2 text-xs text-amc-text-secondary mb-3">
                      <span>{article.date}</span>
                      <span>·</span>
                      <span>{article.readTime} de lecture</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-base font-bold text-amc-text leading-snug mb-3 group-hover:text-amc-yellow-dark transition-colors">
                      {article.title}
                    </h2>

                    {/* Summary */}
                    <p className="text-sm text-amc-text-secondary leading-relaxed flex-1 mb-5">
                      {article.summary}
                    </p>

                    {/* CTA */}
                    <Link
                      href={`/actualites/${article.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all hover:brightness-95 active:scale-[0.99] self-start"
                      style={{ backgroundColor: "#FFD500", color: "#000000" }}
                    >
                      Lire la suite
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Load more placeholder */}
          <div className="text-center mt-12">
            <button
              type="button"
              className="px-8 py-3 rounded-full text-sm font-bold border-2 border-amc-text text-amc-text hover:bg-amc-text hover:text-white transition-all"
            >
              Voir plus d&apos;articles
            </button>
          </div>
        </div>
      </section>

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
