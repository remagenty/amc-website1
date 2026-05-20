"use client";

import { useState } from "react";
import Link from "next/link";
import { ARTICLES } from "./articles-data";

const FILTERS = ["Tous", "Nouveautés", "Conseils", "Actualités"];

const CATEGORY_STYLES: Record<string, { bg: string; color: string }> = {
  Nouveautés: { bg: "#d1fae5", color: "#065f46" },
  Conseils:   { bg: "#dbeafe", color: "#1e40af" },
  Actualités: { bg: "#fef3c7", color: "#92400e" },
};

export function ActualitesFeed() {
  const [activeFilter, setActiveFilter] = useState("Tous");

  const filtered =
    activeFilter === "Tous"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeFilter);

  return (
    <section className="pt-6 pb-16">
      <div className="container-amc">

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                activeFilter === tag
                  ? "bg-amc-text text-white"
                  : "bg-white text-amc-text-secondary hover:bg-amc-yellow/10 border border-gray-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => {
            const catStyle = CATEGORY_STYLES[article.category] ?? { bg: "#f3f4f6", color: "#374151" };
            return (
              <article
                key={article.slug}
                className="group bg-white rounded-2xl shadow-card overflow-hidden flex flex-col transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ paddingTop: "56.25%" }}>
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${article.gradientFrom}, ${article.gradientTo})` }}
                  >
                    <span className="text-6xl select-none">{article.icon}</span>
                  </div>
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
                  <div className="flex items-center gap-2 text-xs text-amc-text-secondary mb-3">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime} de lecture</span>
                  </div>
                  <h2 className="text-base font-bold text-amc-text leading-snug mb-3 group-hover:text-amc-yellow-dark transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-amc-text-secondary leading-relaxed flex-1 mb-5">
                    {article.summary}
                  </p>
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

        {filtered.length === 0 && (
          <div className="text-center py-16 text-amc-text-secondary text-sm">
            Aucun article dans cette catégorie pour le moment.
          </div>
        )}

        {filtered.length > 0 && (
          <div className="text-center mt-12">
            <button
              type="button"
              className="px-8 py-3 rounded-full text-sm font-bold border-2 border-amc-text text-amc-text hover:bg-amc-text hover:text-white transition-all"
            >
              Voir plus d&apos;articles
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
