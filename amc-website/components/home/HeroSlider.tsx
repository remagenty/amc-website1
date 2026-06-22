"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { HERO_SLIDES } from "@/lib/data";
import { IconArrowRight, IconChevronLeft, IconChevronRight } from "@/components/ui/Icons";
import { SEBadge } from "@/components/ui/SEBadge";

type HeroSlideKV = {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  image?: string;
  badge?: string;
};

export function HeroSlider({ slides }: { slides?: HeroSlideKV[] }) {
  const activeSlides = slides && slides.length > 0 ? slides : HERO_SLIDES;
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
    goTo((current + 1) % activeSlides.length);
  }, [current, goTo, activeSlides.length]);

  const prev = useCallback(() => {
    goTo((current - 1 + activeSlides.length) % activeSlides.length);
  }, [current, goTo, activeSlides.length]);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const slide = activeSlides[current];

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
      {activeSlides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={i !== current}
        >
          {/* Background gradient fallback */}
          <div className={`absolute inset-0 bg-gradient-to-br ${BG_COLORS[i % BG_COLORS.length]}`} />

          {/* Vidéo de fond */}
          {"video" in s && (s as { video?: string }).video && (
            <video
              src={(s as { video?: string }).video}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center"
              aria-hidden="true"
            />
          )}

          {/* Photo de fond */}
          {!("video" in s && (s as { video?: string }).video) && s.image && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={s.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          )}

          {/* Overlay sombre pour lisibilité du texte */}
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.4)" }} />
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
        {activeSlides.map((s, i) => (
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
        {current + 1} / {activeSlides.length}
      </div>
    </section>
  );
}
