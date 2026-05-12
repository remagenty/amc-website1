import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBrandInfo, getProductsByBrand, BRANDS } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";
import { IconArrowRight, IconExternalLink } from "@/components/ui/Icons";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brand = getBrandInfo(params.slug);
  if (!brand) return {};
  return {
    title: `${brand.name} — Distributeur officiel | AMC Alpes Matériel Compact`,
    description: `AMC, distributeur officiel ${brand.name} en Rhône-Alpes. ${brand.description}`,
  };
}

export default function PartnerPage({ params }: Props) {
  const brand = getBrandInfo(params.slug);
  if (!brand) notFound();

  const products = getProductsByBrand(params.slug);

  const BG_COLORS: Record<string, string> = {
    "wacker-neuson": "from-red-900 to-red-700",
    magni: "from-blue-900 to-blue-700",
    "promove-demolition": "from-orange-900 to-orange-700",
  };

  return (
    <div className="min-h-screen bg-amc-cream">
      {/* Hero */}
      <section className={`bg-gradient-to-br ${BG_COLORS[params.slug] ?? "from-amc-gray to-gray-800"} text-white py-20 md:py-28`}>
        <div className="container-amc">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amc-yellow text-amc-text mb-6">
              Partenaire officiel
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black">
              {brand.name}
            </h1>
            <p className="mt-3 text-xl font-semibold text-white/80">
              {brand.tagline}
            </p>
            <p className="mt-5 text-base text-white/70 leading-relaxed max-w-2xl">
              {brand.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/catalogue?marque=${brand.id}`}
                className="btn-primary rounded-lg"
              >
                Voir toute la gamme {brand.name}
                <IconArrowRight size={16} />
              </Link>
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline rounded-lg text-sm"
              >
                Site officiel
                <IconExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="container-amc">
          <div className="grid grid-cols-3 gap-8 max-w-2xl">
            <div className="text-center">
              <div className="text-3xl font-black text-amc-text">{brand.productCount}+</div>
              <div className="text-xs text-amc-text-secondary mt-1">Références disponibles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-amc-text">15+</div>
              <div className="text-xs text-amc-text-secondary mt-1">Années de partenariat</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-amc-text">SE+</div>
              <div className="text-xs text-amc-text-secondary mt-1">SAV certifié</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-padding">
        <div className="container-amc">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="section-title text-2xl">
                Gamme {brand.name} disponible
              </h2>
              <p className="text-amc-text-secondary text-sm mt-1">
                {products.length > 0
                  ? `${products.length} modèle${products.length > 1 ? "s" : ""} en stock`
                  : "Consultez-nous pour la disponibilité"}
              </p>
            </div>
            <Link
              href={`/catalogue?marque=${brand.id}`}
              className="text-sm font-semibold text-amc-text hover:text-amc-yellow-dark flex items-center gap-1 transition-colors"
            >
              Voir tout <IconArrowRight size={14} />
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl shadow-card">
              <p className="text-amc-text-secondary mb-4">
                Consultez-nous pour connaître la disponibilité des produits {brand.name}.
              </p>
              <Link href="/contact" className="btn-primary rounded-lg">
                Nous contacter <IconArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amc-gray py-14 text-white">
        <div className="container-amc text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Besoin d'un conseil sur la gamme {brand.name} ?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8 text-sm">
            Nos experts AMC, partenaires officiels {brand.name}, vous accompagnent dans le choix
            du matériel le mieux adapté à vos chantiers.
          </p>
          <Link href="/contact?type=information" className="btn-primary rounded-lg">
            Parler à un expert <IconArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
