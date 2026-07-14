import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getBrandInfo, getCategoriesForBrand, BRANDS } from "@/lib/data";
import { getGammeCategoryImage } from "@/lib/gammes";
import { CategoryCard } from "@/components/gammes/CategoryCard";
import { IconArrowRight } from "@/components/ui/Icons";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { kvGet } from "@/lib/kv";

export const dynamic = "force-dynamic";

type PartnerOverride = { slug?: string; name?: string; tagline?: string; description?: string; logo?: string | null; heroImage?: string | null; website?: string; stats?: Array<{ value: string; label: string }> };

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

const BRAND_OG: Record<string, { title: string; description: string; image: string; url: string }> = {
  "wacker-neuson": {
    title: "WACKER NEUSON Haute-Savoie | Distributeur officiel AMC Saint-Félix (74)",
    description: "AMC distributeur agréé WACKER NEUSON en Haute-Savoie. Compacteurs, mini-pelles, dumpers neufs et occasion à Saint-Félix (74). SAV certifié constructeur. Livraison Annecy, Chambéry, Aix-les-Bains.",
    image: "/images/logo-wacker.png",
    url: "https://www.amc-savoie.fr/partenaires/wacker-neuson",
  },
  magni: {
    title: "Magni Haute-Savoie | Distributeur officiel télescopiques AMC Saint-Félix (74)",
    description: "AMC distributeur agréé Magni en Haute-Savoie. Télescopiques rotatifs et fixes neufs à Saint-Félix (74). Support technique et pièces d'origine. Zone Annecy, Chambéry, Albertville.",
    image: "/images/logo-magni.png",
    url: "https://www.amc-savoie.fr/partenaires/magni",
  },
  "promove-demolition": {
    title: "Promove Demolition Haute-Savoie | Distributeur officiel AMC Saint-Félix (74)",
    description: "AMC distributeur agréé Promove Demolition en Haute-Savoie et Savoie. Équipements de démolition et attachements hydrauliques pour chantiers BTP. Livraison Annecy, Chambéry, Aix-les-Bains.",
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

const BRAND_SALES_REP: Record<string, string> = {
  "wacker-neuson": "jean-pierre",
  magni: "valentin",
  "promove-demolition": "valentin",
};

const BRAND_EXPERT_PROFILE: Record<string, string> = {
  "wacker-neuson": "/a-propos/commercial-1",
  magni: "/a-propos/commercial-2",
  "promove-demolition": "/a-propos/commercial-2",
};

export default async function PartnerPage({ params }: Props) {
  const brand = getBrandInfo(params.slug);
  if (!brand) notFound();

  const allPartners = (await kvGet<Record<string, PartnerOverride>>("partners")) ?? {};
  const ov = allPartners[params.slug] ?? {};

  const salesRep = BRAND_SALES_REP[params.slug];
  const expertProfileHref =
    BRAND_EXPERT_PROFILE[params.slug] ??
    `/devis?type=information&commercial=${salesRep}&marque=${brand.id}`;

  const categories = getCategoriesForBrand(params.slug);

  const BRAND_IMAGES: Record<string, string> = {
    "wacker-neuson": "/images/photo-wacker-catalogue.webp",
    magni: "/images/Magni-catalogue.webp",
    "promove-demolition": "/images/catalogue-promove-demolition.webp",
  };

  const heroImage = (ov.heroImage as string | null | undefined) ?? BRAND_IMAGES[params.slug];
  const brandName = ov.name ?? brand.name;
  const brandTagline = ov.tagline ?? brand.tagline;
  const brandDescription = ov.description ?? brand.description;
  const brandLogo = (ov.logo as string | null | undefined) ?? brand.logo;

  const DEFAULT_STATS = [
    { value: `${brand.productCount}+`, label: "Références disponibles" },
    { value: "15+", label: "Années de partenariat" },
    { value: "SAV", label: "Certification SAV" },
  ];
  const stats = ov.stats ?? DEFAULT_STATS;

  return (
    <div className="min-h-screen bg-amc-cream">
      {/* Hero */}
      <section className="relative text-white py-20 md:py-28 overflow-hidden">
        {/* Fond couleur fallback */}
        <div className="absolute inset-0 bg-gray-900" />

        {/* Photo catalogue */}
        {heroImage && (
          <Image
            src={heroImage}
            alt=""
            aria-hidden="true"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center"
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
              {brandName}
            </h1>
            <p className="mt-3 text-xl font-semibold text-white/80">
              {brandTagline}
            </p>
            <p className="mt-5 text-base text-white/70 leading-relaxed max-w-2xl">
              {brandDescription}
            </p>
            <div className="mt-8">
              <Link
                href={`/catalogue?marque=${brand.id}`}
                className="btn-primary rounded-lg"
              >
                Voir toute la gamme {brandName}
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
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black text-amc-text">{s.value}</div>
                <div className="text-xs text-amc-text-secondary mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding">
        <div className="container-amc">
          <div className="mb-8">
            <h2 className="section-title text-2xl">
              Gamme {brandName} disponible
            </h2>
            <p className="text-amc-text-secondary text-sm mt-1">
              {categories.length} catégorie{categories.length > 1 ? "s" : ""} disponible{categories.length > 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                href={`/catalogue?categorie=${cat.id}`}
                label={cat.label}
                count={cat.count}
                image={getGammeCategoryImage(cat.id)}
              />
            ))}
          </div>
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
          <Link href={expertProfileHref} className="btn-primary rounded-lg">
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
