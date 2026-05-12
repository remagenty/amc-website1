"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { HERO_SLIDES } from "@/lib/data";
import { IconArrowRight, IconChevronLeft, IconChevronRight } from "@/components/ui/Icons";
import { SEBadge } from "@/components/ui/SEBadge";

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % HERO_SLIDES.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, [current, goTo]);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const slide = HERO_SLIDES[current];

  const BG_COLORS = [
    "from-slate-900 to-slate-700",
    "from-red-900 to-red-700",
    "from-zinc-900 to-zinc-700",
    "from-stone-900 to-stone-700",
  ];

  return (
    <section
      className="relative h-[520px] md:h-[600px] lg:h-[680px] overflow-hidden"
      aria-label="Diaporama principal"
    >
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={i !== current}
        >
          {/* Background gradient fallback (when no images) */}
          <div className={`absolute inset-0 bg-gradient-to-br ${BG_COLORS[i % BG_COLORS.length]}`} />

          {/* Overlay pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container-amc w-full">
          <div className="max-w-2xl animate-slide-up" key={current}>
            {slide.badge && (
              <div className="mb-4">
                {slide.badge === "Certification SE+" ? (
                  <SEBadge size="md" />
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-amc-yellow text-amc-text">
                    {slide.badge}
                  </span>
                )}
              </div>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight text-balance">
              {slide.title}
            </h1>

            <p className="mt-4 md:mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-xl">
              {slide.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={slide.ctaHref} className="btn-primary text-base py-3.5 px-7 rounded-lg">
                {slide.ctaLabel}
                <IconArrowRight size={16} />
              </Link>
              {slide.ctaSecondaryLabel && slide.ctaSecondaryHref && (
                <Link
                  href={slide.ctaSecondaryHref}
                  className="btn-outline text-base py-3.5 px-7 rounded-lg"
                >
                  {slide.ctaSecondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Diapositive précédente"
      >
        <IconChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Diapositive suivante"
      >
        <IconChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2" role="tablist" aria-label="Navigation diaporama">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Diapositive ${i + 1}: ${s.title}`}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-8 bg-amc-yellow"
                : "w-2.5 bg-white/40 hover:bg-white/60"
            } h-2.5`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 right-6 z-20 text-white/60 text-sm font-medium">
        {current + 1} / {HERO_SLIDES.length}
      </div>
    </section>
  );
}
