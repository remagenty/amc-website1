import type { Metadata } from "next";
import { HeroSlider } from "@/components/home/HeroSlider";
import { ReassuranceBar } from "@/components/home/ReassuranceBar";
import { ActivitiesSection } from "@/components/home/ActivitiesSection";
import { PartnersSection } from "@/components/home/PartnersSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { MapInteractive } from "@/components/ui/MapInteractive";

export const metadata: Metadata = {
  title: "Accueil | AMC — Vente matériels de chantier Rhône-Alpes",
  description:
    "AMC, votre spécialiste de la vente de matériels de chantier neufs et d'occasion en Rhône-Alpes. Distributeur officiel Wacker Neuson, Magni, Promove Demolition. SAV certifié SE+ à Saint-Félix.",
};

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <ReassuranceBar />
      <PartnersSection />
      <ActivitiesSection />
      <FeaturedProducts />
      <WhyChooseSection />

      {/* Carte — juste avant le footer */}
      <section className="bg-amc-cream py-12">
        <div className="container-amc">
          <MapInteractive />
        </div>
      </section>
    </>
  );
}
