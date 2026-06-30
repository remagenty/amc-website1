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

  // Auto-migrate: replace old slide-1 image if KV still has the previous value
  if (content?.heroSlides?.some((s) => s.id === "slide-1" && s.image === "/images/Slide-1.jpg")) {
    content = {
      ...content,
      heroSlides: content.heroSlides!.map((s) =>
        s.id === "slide-1" && s.image === "/images/Slide-1.jpg"
          ? { ...s, image: "/images/chantier-realiste-fusion-des-engins.jpg" }
          : s
      ),
    };
    kvSet("site-content", content); // fire-and-forget: update KV for future requests
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
