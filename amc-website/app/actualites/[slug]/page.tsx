import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ARTICLES, getArticleBySlug, getRelatedArticles } from "../articles-data";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.metaTitle,
    description: article.metaDescription,
  };
}

const CATEGORY_STYLES: Record<string, { bg: string; color: string }> = {
  Nouveautés: { bg: "#d1fae5", color: "#065f46" },
  Conseils:   { bg: "#dbeafe", color: "#1e40af" },
  Actualités: { bg: "#fef3c7", color: "#92400e" },
};

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = getRelatedArticles(params.slug, 3);
  const catStyle = CATEGORY_STYLES[article.category] ?? { bg: "#f3f4f6", color: "#374151" };

  return (
    <div className="min-h-screen bg-amc-cream">

      {/* Hero image */}
      <div className="relative h-[260px] md:h-[340px] overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${article.gradientFrom}, ${article.gradientTo})` }}
        >
          <span className="text-[100px] md:text-[140px] select-none opacity-80">{article.icon}</span>
        </div>
        <div className="absolute inset-0 bg-black/25" />

        {/* Breadcrumb over hero */}
        <div className="absolute bottom-4 left-0 right-0">
          <div className="container-amc">
            <nav className="flex items-center gap-1.5 text-xs text-white/80">
              <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
              <span>/</span>
              <Link href="/actualites" className="hover:text-white transition-colors">Actualités & Expertise</Link>
              <span>/</span>
              <span className="text-white font-medium line-clamp-1">{article.title}</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container-amc py-10">
        <div className="grid grid-cols-12 gap-8">

          {/* ── MAIN CONTENT ── */}
          <main className="col-span-12 lg:col-span-8">

            {/* Article header card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card mb-6">
              {/* Category + meta */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: catStyle.bg, color: catStyle.color }}
                >
                  {article.category}
                </span>
                <span className="text-xs text-amc-text-secondary">{article.date}</span>
                <span className="text-xs text-amc-text-secondary">·</span>
                <span className="text-xs text-amc-text-secondary">{article.readTime} de lecture</span>
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-amc-text leading-tight mb-4">
                {article.title}
              </h1>

              <p className="text-amc-text-secondary leading-relaxed">
                {article.summary}
              </p>

              {/* Social share */}
              <div className="flex items-center gap-2 mt-6 pt-5 border-t border-gray-100">
                <span className="text-xs font-semibold text-amc-text-secondary mr-1">Partager :</span>
                {[
                  { label: "LinkedIn", color: "#0A66C2" },
                  { label: "Facebook", color: "#1877F2" },
                  { label: "Email", color: "#374151" },
                ].map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-80"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Article content */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card space-y-5">
              {article.content.map((block, i) => {
                if (block.type === "intro") {
                  return (
                    <p key={i} className="text-base text-amc-text leading-relaxed font-medium border-l-4 border-amc-yellow pl-4">
                      {block.text}
                    </p>
                  );
                }
                if (block.type === "h2") {
                  return (
                    <h2 key={i} className="text-xl font-bold text-amc-text pt-3 pb-1">
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "p") {
                  return (
                    <p key={i} className="text-sm text-amc-text-secondary leading-relaxed">
                      {block.text}
                    </p>
                  );
                }
                if (block.type === "ul") {
                  return (
                    <ul key={i} className="space-y-2.5">
                      {block.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-amc-text-secondary">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amc-yellow flex items-center justify-center mt-0.5">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === "callout") {
                  return (
                    <div key={i} className="bg-amc-yellow/10 border border-amc-yellow/30 rounded-xl p-5">
                      <div className="font-bold text-amc-text mb-2">{block.title}</div>
                      <p className="text-sm text-amc-text-secondary leading-relaxed">{block.body}</p>
                    </div>
                  );
                }
                if (block.type === "quote") {
                  return (
                    <blockquote key={i} className="bg-gray-50 rounded-xl p-5 border-l-4 border-amc-yellow">
                      <p className="text-sm text-amc-text leading-relaxed italic mb-3">
                        &ldquo;{block.text}&rdquo;
                      </p>
                      <footer className="text-xs font-semibold text-amc-text-secondary">
                        — {block.author}, <span className="font-normal">{block.role}</span>
                      </footer>
                    </blockquote>
                  );
                }
                if (block.type === "cta") {
                  return (
                    <div key={i} className="pt-4 pb-2">
                      <Link
                        href={block.href}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all hover:brightness-95"
                        style={{ backgroundColor: "#FFD500", color: "#000000" }}
                      >
                        {block.label}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </main>

          {/* ── SIDEBAR ── */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">

            {/* Contact CTA */}
            <div className="bg-amc-gray rounded-2xl p-6 text-white">
              <div className="text-base font-bold mb-2">Un projet en tête ?</div>
              <p className="text-white/75 text-sm leading-relaxed mb-4">
                Nos experts AMC vous répondent sous 24h pour toute demande de devis ou de conseil technique.
              </p>
              <Link
                href="/contact?type=information"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-bold transition-all hover:brightness-95"
                style={{ backgroundColor: "#FFD500", color: "#000000" }}
              >
                Parler à un expert
              </Link>
              <a
                href="tel:+33426784390"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold text-white border border-white/30 hover:bg-white/10 transition-colors mt-2"
              >
                04 26 78 43 90
              </a>
            </div>

            {/* Related articles */}
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <h3 className="text-sm font-bold text-amc-text uppercase tracking-wider mb-4">
                Articles similaires
              </h3>
              <div className="space-y-4">
                {related.map((rel) => {
                  const relCat = CATEGORY_STYLES[rel.category] ?? { bg: "#f3f4f6", color: "#374151" };
                  return (
                    <Link
                      key={rel.slug}
                      href={`/actualites/${rel.slug}`}
                      className="flex items-start gap-3 group"
                    >
                      <div
                        className="flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center text-xl"
                        style={{ background: `linear-gradient(135deg, ${rel.gradientFrom}, ${rel.gradientTo})` }}
                      >
                        {rel.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: relCat.bg, color: relCat.color }}
                        >
                          {rel.category}
                        </span>
                        <p className="text-xs font-semibold text-amc-text mt-1 leading-snug group-hover:text-amc-yellow-dark transition-colors line-clamp-2">
                          {rel.title}
                        </p>
                        <p className="text-[10px] text-amc-text-secondary mt-0.5">{rel.date}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Category nav */}
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <h3 className="text-sm font-bold text-amc-text uppercase tracking-wider mb-3">
                Catégories
              </h3>
              <div className="space-y-1">
                {[
                  { label: "Tous les articles", href: "/actualites" },
                  { label: "Nouveautés", href: "/actualites?filter=nouveautes" },
                  { label: "Conseils", href: "/actualites?filter=conseils" },
                  { label: "Actualités", href: "/actualites?filter=actualites" },
                ].map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-amc-text-secondary hover:bg-amc-yellow/5 hover:text-amc-text transition-colors"
                  >
                    <span>{label}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* ── RELATED ARTICLES (bottom) ── */}
        <div className="mt-14">
          <h2 className="text-xl font-bold text-amc-text mb-6">Articles similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rel) => {
              const relCat = CATEGORY_STYLES[rel.category] ?? { bg: "#f3f4f6", color: "#374151" };
              return (
                <Link
                  key={rel.slug}
                  href={`/actualites/${rel.slug}`}
                  className="group bg-white rounded-2xl shadow-card overflow-hidden flex flex-col transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden" style={{ paddingTop: "50%" }}>
                    <div
                      className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${rel.gradientFrom}, ${rel.gradientTo})` }}
                    >
                      <span className="text-5xl select-none">{rel.icon}</span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: relCat.bg, color: relCat.color }}>
                        {rel.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="text-xs text-amc-text-secondary mb-2">{rel.date} · {rel.readTime} de lecture</div>
                    <h3 className="text-sm font-bold text-amc-text leading-snug mb-3 group-hover:text-amc-yellow-dark transition-colors flex-1">
                      {rel.title}
                    </h3>
                    <span className="text-xs font-bold text-amc-yellow-dark flex items-center gap-1">
                      Lire la suite
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
