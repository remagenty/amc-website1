import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getGammesData } from "@/lib/gammes";
import { IconArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: { absolute: "Nos gammes par catégorie | AMC" },
  description:
    "Parcourez les gammes de matériels AMC par catégorie — Wacker Neuson, Magni, Promove Demolition. Mini-pelles, dumpers, télescopiques, équipements de démolition.",
};

export default function GammesPage() {
  const brands = getGammesData();

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
                  <Link
                    key={cat.slug}
                    href={`/catalogue?categorie=${cat.slug}`}
                    className="group flex flex-row items-stretch bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-amc-yellow hover:shadow-card transition-all h-32"
                  >
                    {/* Texte — côté gauche */}
                    <div className="flex flex-col justify-between p-5 flex-1 min-w-0">
                      <div>
                        <h3 className="font-bold text-amc-text text-sm leading-snug">{cat.label}</h3>
                        <p className="text-xs text-amc-text-secondary mt-1">
                          {cat.count} machine{cat.count > 1 ? "s" : ""}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amc-yellow-dark group-hover:text-amc-text group-hover:gap-1.5 transition-all">
                        Voir la catégorie <IconArrowRight size={12} />
                      </span>
                    </div>

                    {/* Photo — côté droit */}
                    {cat.image && (
                      <div className="relative w-32 flex-shrink-0 bg-gray-50">
                        <Image
                          src={cat.image}
                          alt={cat.label}
                          fill
                          sizes="128px"
                          className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
