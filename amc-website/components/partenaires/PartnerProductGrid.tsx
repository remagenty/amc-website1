"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ui/ProductCard";
import { IconArrowRight } from "@/components/ui/Icons";
import type { Product } from "@/types";

interface Category {
  id: string;
  label: string;
  count: number;
}

interface Props {
  products: Product[];
  brandId: string;
  brandName: string;
  categories: Category[];
}

export function PartnerProductGrid({ products, brandId, brandName, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? products.filter((p) => p.categorySlug === activeCategory)
    : products;

  return (
    <div>
      {/* Category filter pills */}
      {categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
              activeCategory === null
                ? "bg-amc-yellow text-amc-text border-amc-yellow shadow-sm"
                : "bg-white text-amc-text-secondary border-gray-200 hover:border-amc-yellow hover:text-amc-text"
            }`}
          >
            Tous ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setActiveCategory(activeCategory === cat.id ? null : cat.id)
              }
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                activeCategory === cat.id
                  ? "bg-amc-yellow text-amc-text border-amc-yellow shadow-sm"
                  : "bg-white text-amc-text-secondary border-gray-200 hover:border-amc-yellow hover:text-amc-text"
              }`}
            >
              {cat.label}
              <span className="ml-1.5 opacity-60 text-xs">({cat.count})</span>
            </button>
          ))}
        </div>
      )}

      {/* Count */}
      <p className="text-sm text-amc-text-secondary mb-5">
        <strong className="text-amc-text">{filtered.length}</strong>{" "}
        modèle{filtered.length > 1 ? "s" : ""}
        {activeCategory && (
          <button
            onClick={() => setActiveCategory(null)}
            className="ml-2 text-xs underline hover:text-red-500 transition-colors"
          >
            Effacer le filtre
          </button>
        )}
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl shadow-card">
          <p className="text-amc-text-secondary mb-4">
            Aucun produit dans cette catégorie.
          </p>
          <button
            onClick={() => setActiveCategory(null)}
            className="btn-secondary rounded-lg text-sm"
          >
            Voir toute la gamme
          </button>
        </div>
      )}

      {/* Link to full catalogue */}
      <div className="mt-8 text-center">
        <Link
          href={`/catalogue?marque=${brandId}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-amc-text hover:text-amc-yellow-dark transition-colors"
        >
          Voir toute la gamme {brandName} dans le catalogue
          <IconArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
