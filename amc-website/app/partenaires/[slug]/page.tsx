import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBrandInfo, getProductsByBrand, getCategoriesForBrand, BRANDS } from "@/lib/data";
import { PartnerProductGrid } from "@/components/partenaires/PartnerProductGrid";
import { IconArrowRight } from "@/components/ui/Icons";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

const BRAND_OG: Record<string, { title: string; description: string; image: string; url: string }> = {
  "wacker-neuson": {
    title: "Wacker Neuson | Distributeur officiel AMC — Rhône-Alpes",
    description: "AMC distributeur agréé Wacker Neuson en Rhône-Alpes. Compacteurs, mini-pelles, dumpers avec garantie constructeur et SAV certifié.",
    image: "/images/logo-wacker.png",
    url: "https://www.amc-savoie.fr/partenaires/wacker-neuson",
  },
  magni: {
    title: "Magni | Distributeur officiel AMC — Rhône-Alpes",
    description: "AMC distributeur agréé Magni en Rhône-Alpes. Télescopiques rotatifs et fixes avec support technique et pièces d'origine.",
    image: "/images/logo-magni.png",
    url: "https://www.amc-savoie.fr/partenaires/magni",
  },
  "promove-demolition": {
    title: "Promove Demolition | Distributeur officiel AMC",
    description: "AMC distributeur agréé Promove Demolition en Rhône-Alpes. Équipements de démolition et attachements pour chantiers BTP.",
    image: "/images/logo-promove.jpg",
    url: "https://www.amc-savoie.fr/partenaires/promove-demolition",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brand = getBrandInfo(params.slug);
  if (!brand) return {};
  const og = BRAND_OG[params.slug];
  const title = og?.title ?? `${brand.name} — Distributeur officiel`;
  const description = og?.description ?? `AMC, distributeur officiel ${brand.name} en Rhône-Alpes. ${brand.description}`;
  return {
    title: { absolute: title },
    description,
    openGraph: {
      title: og?.title ?? title,
      description,
      ...(og?.image ? { images: [{ url: og.image }] } : {}),
      type: "website",
      ...(og?.url ? { url: og.url } : {}),
      siteName: "AMC — Alpes Matériel Compact",
    },
  };
}

export default function PartnerPage({ params }: Props) {
  const brand = getBrandInfo(params.slug);
  if (!brand) notFound();

  const products = getProductsByBrand(params.slug);
  const categories = getCategoriesForBrand(params.slug);

  const BRAND_IMAGES: Record<string, string> = {
    "wacker-neuson": "/images/photo-wacker-catalogue.jpg",
    magni: "/images/Magni-catalogue.avif",
    "promove-demolition": "/images/catalogue-promove-demolition.jpg",
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
          <div className="mb-8">
            <h2 className="section-title text-2xl">
              Gamme {brand.name} disponible
            </h2>
            <p className="text-amc-text-secondary text-sm mt-1">
              {products.length > 0
                ? `${products.length} modèle${products.length > 1 ? "s" : ""} disponible${products.length > 1 ? "s" : ""}`
                : "Consultez-nous pour la disponibilité"}
            </p>
          </div>

          {products.length > 0 ? (
            <PartnerProductGrid
              products={products}
              brandId={brand.id}
              brandName={brand.name}
              categories={categories}
            />
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
      <section className="bg-white py-14">
        <div className="container-amc text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-amc-text">
            Besoin d&apos;un conseil sur la gamme {brand.name} ?
          </h2>
          <p className="text-black max-w-xl mx-auto mb-8 text-sm">
            Nos experts AMC, partenaires officiels {brand.name}, vous accompagnent dans le choix
            du matériel le mieux adapté à vos chantiers.
          </p>
          <Link href="/devis?type=information" className="btn-primary rounded-lg">
            Parler à un expert <IconArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Newsletter — fond blanc, au-dessus du footer */}
      <section className="bg-white border-t border-gray-100 py-10">
        <div className="container-amc">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1">
              <p className="font-bold text-amc-text text-lg">Restez informé des nouveaux matériels</p>
              <p className="text-sm text-amc-text-secondary mt-1">Recevez nos actualités et nouveautés en avant-première</p>
            </div>
            <NewsletterForm variant="light" />
          </div>
        </div>
      </section>
    </div>
  );
}
