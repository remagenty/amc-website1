import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";
import { kvGet, kvSet } from "@/lib/kv";
import { ARTICLES, type ContentBlock } from "@/app/actualites/articles-data";
import teamData from "@/lib/team.json";
import wnData from "@/lib/catalogue_wacker_neuson.json";
import magniData from "@/lib/catalogue_magni.json";
import promoveData from "@/lib/catalogue_promove.json";

export const dynamic = "force-dynamic";

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return token ? await verifyToken(token) : null;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const FRENCH_MONTHS: Record<string, string> = {
  janvier: "01", février: "02", mars: "03", avril: "04",
  mai: "05", juin: "06", juillet: "07", août: "08",
  septembre: "09", octobre: "10", novembre: "11", décembre: "12",
};

function frenchDateToIso(d: string): string {
  const parts = d.trim().toLowerCase().split(" ");
  if (parts.length !== 3) return new Date().toISOString().slice(0, 10);
  const [day, monthName, year] = parts;
  const month = FRENCH_MONTHS[monthName] ?? "01";
  return `${year}-${month}-${day.padStart(2, "0")}`;
}

function blocksToMarkdown(blocks: ContentBlock[]): string {
  return blocks.map((b) => {
    if (b.type === "intro") return b.text + "\n";
    if (b.type === "h2") return `## ${b.text}\n`;
    if (b.type === "p") return b.text + "\n";
    if (b.type === "ul") return b.items.map((item) => `- ${item}`).join("\n") + "\n";
    if (b.type === "callout") return `> **${b.title}**\n> ${b.body}\n`;
    if (b.type === "quote") return `> *"${b.text}"*\n> — ${b.author}, ${b.role}\n`;
    if (b.type === "cta") return `[${b.label}](${b.href})\n`;
    return "";
  }).join("\n");
}

// ── Seed functions ─────────────────────────────────────────────────────────────

async function seedCatalogues(force: boolean) {
  const results: string[] = [];
  const entries = [
    { key: "catalogue:wacker_neuson", data: wnData },
    { key: "catalogue:magni", data: magniData },
    { key: "catalogue:promove", data: promoveData },
  ] as const;
  for (const { key, data } of entries) {
    const existing = await kvGet(key);
    if (!force && existing) { results.push(`${key}: skipped (already exists)`); continue; }
    await kvSet(key, data);
    const count = (data as { machines: unknown[] }).machines.length;
    results.push(`${key}: seeded ${count} machines`);
  }
  return results;
}

async function seedTeam(force: boolean) {
  const existing = await kvGet("team");
  if (!force && existing) return ["team: skipped (already exists)"];
  await kvSet("team", teamData);
  return [`team: seeded ${(teamData as unknown[]).length} members`];
}

async function seedArticles(force: boolean) {
  const existing = await kvGet("articles");
  if (!force && existing) return ["articles: skipped (already exists)"];
  const adminArticles = ARTICLES.map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
    summary: a.summary,
    content: blocksToMarkdown(a.content),
    coverImage: a.image ?? null,
    status: "published",
    publishedAt: frenchDateToIso(a.date),
    createdAt: frenchDateToIso(a.date),
  }));
  await kvSet("articles", adminArticles);
  return [`articles: seeded ${adminArticles.length} articles`];
}

async function seedReviews(force: boolean) {
  const existing = await kvGet("reviews");
  if (!force && existing) return ["reviews: skipped (already exists)"];
  const reviews = [
    { id: "r1", name: "David Carrozza", initials: "DC", text: "AMC a fait preuve d'un grand professionnalisme et d'une excellente disponibilité malgré la distance géographique. Leur accompagnement a été clair, sérieux et utile. Rare de trouver un tel niveau de service et d'écoute aujourd'hui. Une entreprise fiable que je recommande.", date: "Février 2025", rating: 5, visible: true },
    { id: "r2", name: "Florent Blanc", initials: "FB", text: "Un grand merci à l'équipe SAV pour la qualité de leurs prestations, leur écoute et leur rapidité d'intervention. À très vite pour de nouvelles aventures !", date: "Mars 2025", rating: 5, visible: true },
    { id: "r3", name: "Anthony", initials: "AN", text: "Équipe SAV au top ! Ils ont su me dépanner par téléphone avec beaucoup de professionnalisme. La personne que j'ai eue était claire, précise, et allait droit au but — aucun blabla inutile. Franchement, je recommande les yeux fermés !", date: "Mai 2025", rating: 5, visible: true },
    { id: "r4", name: "Vincent Figueiredo", initials: "VF", text: "Équipe professionnel, respect des délais, qualité des échanges. Je recommande fortement.", date: "Juin 2025", rating: 5, visible: true },
    { id: "r5", name: "Florian", initials: "FR", text: "Équipe au top, à l'écoute et très réactif sur les commandes de pièces détachées, je recommande !", date: "Juillet 2023", rating: 5, visible: true },
    { id: "r6", name: "Enrico Avola", initials: "EA", text: "Grand choix, très pro, excellent services.", date: "Octobre 2022", rating: 5, visible: true },
    { id: "r7", name: "francketflo", initials: "FF", text: "SAV très réactif et compétent. Je recommande.", date: "Mai 2025", rating: 5, visible: true },
    { id: "r8", name: "Florent Bottollier", initials: "FB", text: "Une belle équipe au service SAV, à l'écoute, professionnelle et arrangeante...", date: "Mars 2025", rating: 5, visible: true },
    { id: "r9", name: "Kevin Veyrier", initials: "KV", text: "Un grand merci à Camille et Romain du service client qui ont géré mon dossier pour une recherche de pièce dans un délai remarquable. Cette équipe est très compétente dans ce domaine. Vous pouvez y aller les yeux fermés.", date: "Mars 2025", rating: 5, visible: true },
    { id: "r10", name: "Lucas", initials: "LU", text: "Un grand bravo à Romain et à toute son équipe SAV. De nos jours, c'est rare de trouver un service aussi à l'écoute, réactif et professionnel. Merci pour votre efficacité. Je recommande sans hésiter.", date: "Mars 2025", rating: 5, visible: true },
    { id: "r11", name: "Eric Floquet", initials: "EF", text: "WACKER NEUSON, c'est tout ce qu'il faut !", date: "Mai 2022", rating: 5, visible: true },
  ];
  await kvSet("reviews", reviews);
  await kvSet("review-settings", { globalRating: 4.6 });
  return [`reviews: seeded ${reviews.length} reviews`];
}

async function seedPartners(force: boolean) {
  const existing = await kvGet("partners");
  if (!force && existing) return ["partners: skipped (already exists)"];
  const partners = {
    "wacker-neuson": {
      slug: "wacker-neuson",
      name: "WACKER NEUSON",
      tagline: "Partenaire officiel — Gamme complète",
      description: "Leader mondial des équipements compacts de construction. AMC est distributeur officiel WACKER NEUSON pour la région Rhône-Alpes, proposant l'ensemble de la gamme : compacteurs, dumpers, pelles, plaques vibrantes et bien plus.",
      logo: "/images/logo-wacker.png",
      heroImage: "/images/photo-wacker-catalogue.webp",
      website: "https://www.wackerneuson.com",
    },
    magni: {
      slug: "magni",
      name: "Magni",
      tagline: "Spécialiste télescopiques",
      description: "Magni est le spécialiste des chariots télescopiques rotatifs haute performance. Des machines robustes et précises pour la manutention et la construction.",
      logo: "/images/logo-magni.png",
      heroImage: "/images/Magni-catalogue.webp",
      website: "https://www.magni.it",
    },
    "promove-demolition": {
      slug: "promove-demolition",
      name: "Promove Demolition",
      tagline: "Équipements de démolition professionnels",
      description: "Promove Demolition propose des équipements hydrauliques de démolition de haute qualité pour tous types de chantiers BTP. AMC est distributeur officiel en Rhône-Alpes.",
      logo: "/images/logo-promove.jpg",
      heroImage: "/images/catalogue-promove-demolition.webp",
      website: "https://www.promovedemolition.com",
    },
  };
  await kvSet("partners", partners);
  return ["partners: seeded 3 partners"];
}

async function seedSiteContent(force: boolean) {
  const existing = await kvGet("site-content");
  if (!force && existing) return ["site-content: skipped (already exists)"];
  const siteContent = {
    contact: {
      address: "ZAC D'Orsan, 330 Rue du Mont Blanc\n74540 Saint-Félix",
      phone: "04 26 78 43 90",
      email: "contact@amc-savoie.fr",
      hours: "Lun–Ven : 8h–12h / 14h–18h\nSam : Fermé",
    },
    home: {
      heroTitle: "Votre partenaire matériel de chantier en Rhône-Alpes",
      heroSubtitle: "Distributeur officiel WACKER NEUSON, Magni et Promove Demolition",
      activitiesText: "Vente, location et service après-vente de matériels compacts pour le BTP.",
    },
    apropos: {
      intro: "AMC — Alpes Matériel Compact est votre distributeur officiel de matériels de chantier en Rhône-Alpes. Fondée en 2013, notre entreprise s'est imposée comme le partenaire de confiance des professionnels du BTP savoyards.",
      stats: [
        { value: "2013", label: "Année de création" },
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
        { text: "Certification SE+" },
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
      { id: "slide-1", title: "Votre partenaire machines neuves et occasion", subtitle: "Spécialiste de la vente de matériel de chantier en Rhône-Alpes. Compacteurs, dumpers, pelles, télescopiques et équipements de démolition.", ctaLabel: "Découvrir nos machines", ctaHref: "/gammes", ctaSecondaryLabel: "Demander un devis", ctaSecondaryHref: "/contact?type=devis", image: "/images/Slide-1.jpg" },
      { id: "slide-2", title: "Distributeur officiel WACKER NEUSON", subtitle: "Accédez à toute la gamme WACKER NEUSON : équipements compacts haute performance pour tous vos chantiers. Stock disponible, livraison Rhône-Alpes.", ctaLabel: "Voir la gamme WACKER NEUSON", ctaHref: "/partenaires/wacker-neuson", ctaSecondaryLabel: "Contactez-nous", ctaSecondaryHref: "/contact", badge: "Partenaire officiel" },
      { id: "slide-3", title: "Atelier certifié SE+ et techniciens qualifiés", subtitle: "Un service après-vente d'excellence avec des techniciens certifiés et un atelier équipé", ctaLabel: "Découvrir nos services", ctaHref: "/services", ctaSecondaryLabel: "Prendre rendez-vous", ctaSecondaryHref: "/contact?type=sav", image: "/images/Slide-3.jpg", badge: "Certification SE+" },
    ],
    homepageStats: [
      { value: "3", label: "Marques partenaires" },
      { value: "15+", label: "Années d'expérience" },
      { value: "500+", label: "Machines disponibles" },
      { value: "100%", label: "Pièces d'origine" },
    ],
    social: { facebookUrl: "https://www.facebook.com/amcalpesmc", instagramUrl: "https://www.instagram.com/amc_savoie", facebookEnabled: true, instagramEnabled: true },
    seo: { homeTitle: "AMC — Vente matériels de chantier Rhône-Alpes | WACKER NEUSON, Magni, Promove", homeDescription: "AMC, votre spécialiste de la vente de matériels de chantier neufs et d'occasion en Rhône-Alpes. Distributeur officiel WACKER NEUSON, Magni, Promove Demolition. SAV certifié SE+ à Saint-Félix.", keywords: "matériel chantier, WACKER NEUSON, Magni, Promove, Rhône-Alpes, SAV certifié" },
    copyright: `© ${new Date().getFullYear()} AMC — Alpes Matériel Compact. Tous droits réservés.`,
  };
  await kvSet("site-content", siteContent);
  return ["site-content: seeded (contact, home, apropos, footer, ticker, hero, stats, social, seo)"];
}

async function seedServices(force: boolean) {
  const existing = await kvGet("services");
  if (!force && existing) return ["services: skipped (already exists)"];
  const services = {
    financement: { slug: "financement", title: "Solutions de financement", description: "AMC vous propose des solutions de financement adaptées à votre activité et à vos besoins pour l'acquisition de matériels de chantier neufs ou d'occasion.", heroImage: null, keyPoints: ["Crédit-bail : gardez votre trésorerie pour votre activité", "LOA (Location avec Option d'Achat) : flexibilité maximale", "Financement classique avec nos partenaires bancaires", "Réponse sous 48h après dépôt du dossier", "Accompagnement personnalisé par nos conseillers"], ctaText: "Demander un devis financement", ctaHref: "/devis?type=financement" },
    maintenance: { slug: "maintenance", title: "SAV & Maintenance", description: "Notre atelier certifié SE+ prend en charge la maintenance préventive, les réparations et la fourniture de pièces d'origine pour tous vos équipements de chantier.", heroImage: null, keyPoints: ["Maintenance préventive selon les préconisations constructeur", "Réparations toutes marques", "Pièces détachées d'origine WACKER NEUSON, Magni, Promove", "Intervention rapide — atelier et déplacement sur site", "Techniciens certifiés usine SE+", "Contrats d'entretien annuels disponibles"], ctaText: "Prendre rendez-vous SAV", ctaHref: "/contact?type=sav" },
    "certification-se-plus": { slug: "certification-se-plus", title: "Certification SE+", description: "L'atelier AMC est certifié SE+ par WACKER NEUSON — la certification d'excellence du service après-vente pour les équipements compacts de construction.", heroImage: null, keyPoints: ["Seul atelier certifié SE+ de la région Rhône-Alpes", "Techniciens formés directement par les constructeurs", "Accès aux outils de diagnostic officiels", "Garanties constructeur maintenues", "Stock de pièces d'origine certifiées", "Formation opérateurs disponible"], ctaText: "En savoir plus", ctaHref: "/contact" },
  };
  await kvSet("services", services);
  return ["services: seeded 3 services"];
}

// ── Route ──────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  if (!(await requireAuth(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({})) as { force?: boolean };
  const force = body.force === true;

  const log: string[] = [];
  try {
    log.push(...await seedCatalogues(force));
    log.push(...await seedTeam(force));
    log.push(...await seedArticles(force));
    log.push(...await seedReviews(force));
    log.push(...await seedPartners(force));
    log.push(...await seedSiteContent(force));
    log.push(...await seedServices(force));
    return NextResponse.json({ ok: true, log });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message, log }, { status: 500 });
  }
}
