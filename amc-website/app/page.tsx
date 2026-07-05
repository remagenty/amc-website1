import type { Metadata } from "next";
import { HeroSlider } from "@/components/home/HeroSlider";
import { ReassuranceBar } from "@/components/home/ReassuranceBar";
import { ActivitiesSection } from "@/components/home/ActivitiesSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { TestimonialsStrip } from "@/components/home/TestimonialsStrip";
import { MapInteractive } from "@/components/ui/MapInteractive";
import { kvGet, kvSet } from "@/lib/kv";
import type { SiteContent } from "@/app/api/admin/content/route";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "AMC — Vente matériels de chantier Rhône-Alpes | WACKER NEUSON, Magni, Promove" },
  description:
    "AMC, votre spécialiste de la vente de matériels de chantier neufs et d'occasion en Rhône-Alpes. Distributeur officiel WACKER NEUSON, Magni, Promove Demolition. SAV certifié à Saint-Félix.",
};

export default async function HomePage() {
  let content = await kvGet<SiteContent>("site-content");

  // Auto-migrate stale KV data
  if (content) {
    let dirty = false;

    // 1. Replace old slide-1 image (any path other than the new one)
    if (content.heroSlides?.some((s) => s.id === "slide-1" && s.image !== "/images/immage-accueil-site-internet.png" && s.image)) {
      content = {
        ...content,
        heroSlides: content.heroSlides!.map((s) =>
          s.id === "slide-1" && s.image && s.image !== "/images/immage-accueil-site-internet.png"
            ? { ...s, image: "/images/immage-accueil-site-internet.png" }
            : s
        ),
      };
      dirty = true;
    }

    // 2. Remove "Certification SE+" from ticker items
    if (content.ticker?.items?.some((i) => i.text.includes("SE+"))) {
      content = {
        ...content,
        ticker: {
          ...content.ticker,
          items: content.ticker.items.filter((i) => !i.text.includes("SE+")),
        },
      };
      dirty = true;
    }

    // 3. Fix slide-3: remove "SE+" from title and badge
    if (content.heroSlides?.some((s) => s.id === "slide-3" && (s.title?.includes("SE+") || s.badge?.includes("SE+")))) {
      content = {
        ...content,
        heroSlides: content.heroSlides!.map((s) =>
          s.id === "slide-3"
            ? {
                ...s,
                title: s.title?.replace(/SE\+\s*/g, "").trim(),
                badge: s.badge?.includes("SE+") ? "Certification SAV" : s.badge,
              }
            : s
        ),
      };
      dirty = true;
    }

    if (dirty) kvSet("site-content", content); // fire-and-forget
  }

  return (
    <>
      <HeroSlider slides={content?.heroSlides} />
      <ReassuranceBar items={content?.ticker?.items?.map((i) => i.text)} />
      <ActivitiesSection />
      <WhyChooseSection stats={content?.homepageStats} />
      <TestimonialsStrip />
      <PartnersSection />
      <FeaturedProducts />

      {/* Carte — juste avant le footer */}
      <section className="py-12" style={{ backgroundColor: "#F5F4EF" }}>
        <div className="container-amc">
          <MapInteractive />
        </div>
      </section>
    </>
  );
}
