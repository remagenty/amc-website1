"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";
import { IconArrowRight, IconChevronLeft, IconChevronRight } from "@/components/ui/Icons";

export function FeaturedProducts() {
  const products = getFeaturedProducts();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = dir === "right" ? 320 : -320;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="section-padding bg-amc-cream" aria-labelledby="featured-title">
      <div className="container-amc">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 id="featured-title" className="section-title">
              Matériel en vedette
            </h2>
            <p className="section-subtitle mt-3">
              Notre sélection de machines disponibles immédiatement
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="p-2.5 rounded-full border border-gray-200 text-amc-text hover:bg-amc-yellow hover:border-amc-yellow disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Défiler vers la gauche"
              >
                <IconChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="p-2.5 rounded-full border border-gray-200 text-amc-text hover:bg-amc-yellow hover:border-amc-yellow disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                aria-label="Défiler vers la droite"
              >
                <IconChevronRight size={18} />
              </button>
            </div>
            <Link
              href="/catalogue"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amc-text hover:text-amc-yellow-dark transition-colors"
            >
              Voir tout le catalogue
              <IconArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-72 md:w-80"
              style={{ scrollSnapAlign: "start" }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/catalogue" className="btn-primary rounded-lg">
            Voir tout le catalogue <IconArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
