import type { Metadata } from "next";
import Link from "next/link";
import { getGammesData } from "@/lib/gammes";
import { IconArrowRight } from "@/components/ui/Icons";
import { CategoryCard } from "@/components/gammes/CategoryCard";

export const metadata: Metadata = {
  title: { absolute: "Nos gammes par catégorie | AMC" },
  description:
    "Parcourez les gammes de matériels AMC par catégorie — WACKER NEUSON, Magni, Promove Demolition. Mini-pelles, dumpers, télescopiques, équipements de démolition.",
};

export default function GammesPage({
  searchParams,
}: {
  searchParams: { etat?: string };
}) {
  const brands = getGammesData();
  const etat = searchParams.etat === "neuf" || searchParams.etat === "occasion" ? searchParams.etat : null;

  function catHref(slug: string) {
    if (etat) return `/catalogue?categorie=${slug}&etat=${etat}`;
    return `/catalogue?categorie=${slug}`;
  }

  return (
    <div className="min-h-screen bg-amc-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-amc py-3">
          <nav className="text-sm text-amc-text-secondary" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-amc-yellow-dark transition-colors">Accueil</Link></li>
              <li aria-hidden>/</li>
              <li className="font-medium text-amc-text">Nos gammes</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-amc py-10">
        <div className="mb-10 max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-black text-amc-text">Nos gammes par catégorie</h1>
          <p className="text-amc-text-secondary mt-2 text-sm">
            Choisissez une catégorie de matériel pour accéder directement aux machines disponibles
            dans notre catalogue, filtrées par marque et par usage.
          </p>

          {etat && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-amc-yellow/10 border border-amc-yellow/30 rounded-full text-sm text-amc-text">
              <span>
                Filtré sur : <strong>{etat === "neuf" ? "Matériel neuf" : "Matériel d'occasion"}</strong>
              </span>
              <Link
                href="/gammes"
                className="text-amc-text-secondary hover:text-red-500 transition-colors text-base leading-none"
                aria-label="Retirer le filtre"
              >
                ×
              </Link>
            </div>
          )}
        </div>

        <div className="space-y-12">
          {brands.map((brand) => (
            <section key={brand.brandId} aria-labelledby={`brand-${brand.brandId}`}>
              <div className="flex items-center justify-between mb-5">
                <h2 id={`brand-${brand.brandId}`} className="text-lg md:text-xl font-bold text-amc-text">
                  {brand.brandName}
                </h2>
                <Link
                  href={`/partenaires/${brand.brandId}`}
                  className="text-sm font-semibold text-amc-yellow-dark hover:text-amc-text transition-colors inline-flex items-center gap-1"
                >
                  Voir le partenaire <IconArrowRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {brand.categories.map((cat) => (
                  <CategoryCard
                    key={cat.slug}
                    href={catHref(cat.slug)}
                    label={cat.label}
                    count={cat.count}
                    image={cat.image}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
