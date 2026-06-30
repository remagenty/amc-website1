import type { Metadata } from "next";
import Link from "next/link";
import { getOccasionProductsAsync } from "@/lib/data";

export const dynamic = "force-dynamic";
import { ProductCard } from "@/components/ui/ProductCard";
import { IconShield, IconCheck, IconArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: { absolute: "Matériels d'occasion certifiés | AMC Rhône-Alpes" },
  description: "Machines d'occasion inspectées, révisées et garanties par nos techniciens. Compacteurs, pelles, dumpers, télescopiques disponibles immédiatement.",
  openGraph: {
    title: "Matériels d'occasion certifiés | AMC Rhône-Alpes",
    description: "Machines d'occasion inspectées, révisées et garanties par nos techniciens. Compacteurs, pelles, dumpers, télescopiques disponibles immédiatement.",
    images: [{ url: "/images/Slide-1.jpg" }],
    type: "website",
    url: `https://www.amc-savoie.fr/occasion`,
    siteName: "AMC — Alpes Matériel Compact",
  },
};

const GUARANTEES = [
  { icon: <IconCheck size={18} className="text-amc-yellow" />, text: "Inspection technique complète (50 points de contrôle)" },
  { icon: <IconCheck size={18} className="text-amc-yellow" />, text: "Révision générale certifiée" },
  { icon: <IconCheck size={18} className="text-amc-yellow" />, text: "Garantie 6 mois pièces et main d'œuvre" },
  { icon: <IconCheck size={18} className="text-amc-yellow" />, text: "Historique d'entretien fourni" },
  { icon: <IconCheck size={18} className="text-amc-yellow" />, text: "Pièces d'origine remplacées si nécessaire" },
  { icon: <IconCheck size={18} className="text-amc-yellow" />, text: "Nettoyage et remise en état esthétique" },
];

export default async function OccasionPage() {
  const products = await getOccasionProductsAsync();

  return (
    <div className="min-h-screen bg-amc-cream">
      {/* Hero */}
      <section className="bg-amc-gray text-white py-16 md:py-20">
        <div className="container-amc">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
              Matériel d'occasion certifié
            </h1>
            <p className="mt-5 text-lg text-white/75 leading-relaxed max-w-2xl">
              Chaque machine d'occasion AMC est rigoureusement inspectée, révisée et certifiée par nos
              techniciens agréés. Qualité garantie au meilleur prix pour vos chantiers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/devis" className="btn-primary rounded-lg">
                Demander un devis <IconArrowRight size={16} />
              </Link>
              <Link href="/sav" className="btn-outline rounded-lg">
                En savoir plus sur nos certifications
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="bg-white py-12">
        <div className="container-amc">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-amc-text mb-6 flex items-center gap-2">
                <IconShield size={20} className="text-amc-yellow" />
                Notre processus de certification
              </h2>
              <ul className="space-y-3">
                {GUARANTEES.map((g, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-amc-text">
                    {g.icon}
                    {g.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-amc-yellow rounded-2xl p-8 text-center max-w-xs">
                <h3 className="text-2xl font-black text-amc-text">Certifié</h3>
                <p className="text-sm text-amc-text/70 mt-2">
                  Tous nos matériels d'occasion passent par notre atelier certifié avant livraison.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding">
        <div className="container-amc">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title text-2xl">
                Nos matériels d'occasion disponibles
              </h2>
              <p className="text-amc-text-secondary text-sm mt-1">
                <strong>{products.length}</strong> machine{products.length > 1 ? "s" : ""} disponible{products.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl shadow-card">
              <p className="text-amc-text-secondary text-lg mb-4">
                Aucun matériel d'occasion disponible pour le moment.
              </p>
              <p className="text-sm text-amc-text-secondary mb-6">
                Contactez-nous pour connaître nos prochaines disponibilités ou consulter notre catalogue neuf.
              </p>
              <Link href="/contact" className="btn-primary rounded-lg">
                Nous contacter <IconArrowRight size={16} />
              </Link>
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-amc-text-secondary text-sm mb-4">
              Vous ne trouvez pas le matériel recherché ?
            </p>
            <Link href="/devis?type=recherche" className="btn-secondary rounded-lg">
              Déposer une demande de recherche <IconArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
