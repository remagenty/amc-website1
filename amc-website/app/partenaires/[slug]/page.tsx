import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBrandInfo, getProductsByBrand, BRANDS } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";
import { IconArrowRight } from "@/components/ui/Icons";

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

  const BRAND_IMAGES: Record<string, string> = {
    "wacker-neuson": "/images/photo-wacker-catalogue.jpg",
    magni: "/images/Magni-catalogue.avif",
    "promove-demolition": "/images/promove-catalogue.png",
  };

  const heroImage = BRAND_IMAGES[params.slug];

  return (
    <div className="min-h-screen bg-amc-cream">
      {/* Hero */}
      <section className="relative text-white py-20 md:py-28 overflow-hidden">
        {/* Fond couleur fallback */}
        <div className="absolute inset-0 bg-gray-900" />

        {/* Photo catalogue */}
        {heroImage && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={heroImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}

        {/* Overlay sombre pour lisibilité */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.55)" }} />

        <div className="relative z-10 container-amc">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amc-yellow text-amc-text mb-6">
              Partenaire officiel
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
              {brand.name}
            </h1>
            <p className="mt-3 text-xl font-semibold text-white/80">
              {brand.tagline}
            </p>
            <p className="mt-5 text-base text-white/70 leading-relaxed max-w-2xl">
              {brand.description}
            </p>
            <div className="mt-8">
              <Link
                href={`/catalogue?marque=${brand.id}`}
                className="btn-primary rounded-lg"
              >
                Voir toute la gamme {brand.name}
                <IconArrowRight size={16} />
              </Link>
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
