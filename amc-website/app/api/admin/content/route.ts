import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";
import { kvGet, kvSet } from "@/lib/kv";

export type SiteStat = { value: string; label: string };
export type FooterLink = { label: string; href: string; section: string };

export type TickerItem = { text: string };

export type HeroSlideKV = {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  image?: string;
  video?: string;
  badge?: string;
};

export type HomepageStat = { value: string; label: string };
export type SocialSettings = { facebookUrl: string; instagramUrl: string; facebookEnabled: boolean; instagramEnabled: boolean };
export type SeoSettings = { homeTitle: string; homeDescription: string; keywords: string };

export type SiteContent = {
  contact: {
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    activitiesText: string;
  };
  apropos: {
    intro: string;
    stats: SiteStat[];
  };
  footer: {
    links: FooterLink[];
  };
  ticker: { items: TickerItem[] };
  heroSlides: HeroSlideKV[];
  homepageStats: HomepageStat[];
  social: SocialSettings;
  seo: SeoSettings;
  copyright: string;
};

const DEFAULT_CONTENT: SiteContent = {
  contact: {
    address: "ZAC D'Orsan, 330 Rue du Mont Blanc\n74540 Saint-Félix",
    phone: "04 26 78 43 90",
    email: "contact@amc-savoie.fr",
    hours: "Lun–Ven : 8h–18h\nSam : 8h–12h",
  },
  home: {
    heroTitle: "Votre partenaire matériel de chantier en Rhône-Alpes",
    heroSubtitle: "Distributeur officiel WACKER NEUSON, Magni et Promove Demolition",
    activitiesText: "Vente, location et service après-vente de matériels compacts pour le BTP.",
  },
  apropos: {
    intro: "AMC — Alpes Matériel Compact est votre distributeur officiel de matériels de chantier en Rhône-Alpes.",
    stats: [
      { value: "2009", label: "Année de création" },
      { value: "5", label: "Techniciens certifiés" },
      { value: "800 m²", label: "Surface atelier" },
      { value: "Rhône-Alpes", label: "Zone d'intervention" },
    ],
  },
  footer: {
    links: [
      { label: "WACKER NEUSON", href: "/partenaires/wacker-neuson", section: "Nos matériels" },
      { label: "Magni", href: "/partenaires/magni", section: "Nos matériels" },
      { label: "Promove Demolition", href: "/partenaires/promove-demolition", section: "Nos matériels" },
      { label: "Catalogue", href: "/catalogue", section: "Nos matériels" },
      { label: "SAV & Maintenance", href: "/services", section: "Nos services" },
      { label: "Financement", href: "/financement", section: "Nos services" },
      { label: "Devis", href: "/devis", section: "Nos services" },
      { label: "Notre équipe", href: "/a-propos", section: "L'entreprise" },
      { label: "Actualités", href: "/actualites", section: "L'entreprise" },
      { label: "Contact", href: "/contact", section: "L'entreprise" },
    ],
  },
  ticker: {
    items: [
      { text: "Certification SAV" },
      { text: "Livraison Rhône-Alpes" },
      { text: "Garantie constructeur" },
      { text: "Financement disponible" },
      { text: "Stock disponible — Livraison immédiate" },
      { text: "Pièces d'origine constructeur" },
      { text: "Techniciens certifiés usine" },
      { text: "Devis gratuit sous 24h" },
      { text: "+15 ans d'expérience" },
      { text: "Service après-vente sur site" },
    ],
  },
  heroSlides: [
    {
      id: "slide-1",
      title: "Votre partenaire machines neuves et occasion",
      subtitle: "Spécialiste de la vente de matériel de chantier en Rhône-Alpes. Compacteurs, dumpers, pelles, télescopiques et équipements de démolition.",
      ctaLabel: "Découvrir nos machines",
      ctaHref: "/gammes",
      ctaSecondaryLabel: "Demander un devis",
      ctaSecondaryHref: "/contact?type=devis",
      image: "/images/chantier-realiste-fusion-des-engins.jpg",
    },
    {
      id: "slide-2",
      title: "Distributeur officiel WACKER NEUSON",
      subtitle: "Accédez à toute la gamme WACKER NEUSON : équipements compacts haute performance pour tous vos chantiers. Stock disponible, livraison Rhône-Alpes.",
      ctaLabel: "Voir la gamme WACKER NEUSON",
      ctaHref: "/partenaires/wacker-neuson",
      ctaSecondaryLabel: "Contactez-nous",
      ctaSecondaryHref: "/contact",
      video: "/videos/Slide-2.mp4",
      badge: "Partenaire officiel",
    },
    {
      id: "slide-3",
      title: "Atelier certifié et techniciens qualifiés",
      subtitle: "Un service après-vente d'excellence avec des techniciens certifiés et un atelier équipé",
      ctaLabel: "Découvrir nos services",
      ctaHref: "/services",
      ctaSecondaryLabel: "Prendre rendez-vous",
      ctaSecondaryHref: "/contact?type=sav",
      image: "/images/sav-sur-terrain.jpg",
      badge: "Certification SAV",
    },
  ],
  homepageStats: [
    { value: "3", label: "Marques partenaires" },
    { value: "15+", label: "Années d'expérience" },
    { value: "500+", label: "Machines disponibles" },
    { value: "100%", label: "Pièces d'origine" },
  ],
  social: {
    facebookUrl: "https://www.facebook.com/amcalpesmc",
    instagramUrl: "https://www.instagram.com/amc_savoie",
    facebookEnabled: true,
    instagramEnabled: true,
  },
  seo: {
    homeTitle: "AMC — Vente matériels de chantier Rhône-Alpes | WACKER NEUSON, Magni, Promove",
    homeDescription: "AMC, votre spécialiste de la vente de matériels de chantier neufs et d'occasion en Rhône-Alpes. Distributeur officiel WACKER NEUSON, Magni, Promove Demolition. SAV certifié à Saint-Félix.",
    keywords: "matériel chantier, WACKER NEUSON, Magni, Promove, Rhône-Alpes, SAV certifié, mini-pelle, dumper, compacteur",
  },
  copyright: `© ${new Date().getFullYear()} AMC — Alpes Matériel Compact. Tous droits réservés.`,
};

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return token ? await verifyToken(token) : null;
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  let stored = await kvGet<SiteContent>("site-content");

  // Auto-migrate stale KV data
  if (stored) {
    let dirty = false;

    if (stored.heroSlides?.some((s) => s.id === "slide-1" && s.image && s.image !== "/images/chantier-realiste-fusion-des-engins.jpg")) {
      stored = {
        ...stored,
        heroSlides: stored.heroSlides!.map((s) =>
          s.id === "slide-1" && s.image && s.image !== "/images/chantier-realiste-fusion-des-engins.jpg"
            ? { ...s, image: "/images/chantier-realiste-fusion-des-engins.jpg" }
            : s
        ),
      };
      dirty = true;
    }

    if (stored.ticker?.items?.some((i) => i.text.includes("SE+"))) {
      stored = {
        ...stored,
        ticker: {
          ...stored.ticker,
          items: stored.ticker.items.filter((i) => !i.text.includes("SE+")),
        },
      };
      dirty = true;
    }

    if (dirty) await kvSet("site-content", stored);
  }

  const merged = stored ? {
    ...DEFAULT_CONTENT,
    ...stored,
    ticker: stored.ticker ?? DEFAULT_CONTENT.ticker,
    heroSlides: stored.heroSlides ?? DEFAULT_CONTENT.heroSlides,
    homepageStats: stored.homepageStats ?? DEFAULT_CONTENT.homepageStats,
    social: { ...DEFAULT_CONTENT.social, ...stored.social },
    seo: { ...DEFAULT_CONTENT.seo, ...stored.seo },
    copyright: stored.copyright ?? DEFAULT_CONTENT.copyright,
  } : DEFAULT_CONTENT;
  return NextResponse.json(merged);
}

export async function PUT(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json() as SiteContent;
  await kvSet("site-content", body);
  return NextResponse.json({ ok: true });
}
