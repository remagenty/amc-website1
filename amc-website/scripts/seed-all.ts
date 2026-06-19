/**
 * Comprehensive KV seed — migrates ALL existing site data to Vercel KV.
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/seed-all.ts
 *
 * Keys written:
 *   catalogue:wacker_neuson  → { machines: Machine[] }
 *   catalogue:magni          → { machines: Machine[] }
 *   catalogue:promove        → { machines: Machine[] }
 *   team                     → Member[]
 *   articles                 → AdminArticle[]
 *   partners                 → Record<slug, PartnerOverride>
 *   site-content             → SiteContent
 */

import { createClient } from "@vercel/kv";
import * as fs from "fs";
import * as path from "path";

const KV_REST_API_URL = process.env.KV_REST_API_URL;
const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN;

if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
  console.error("❌  Missing env vars: KV_REST_API_URL and KV_REST_API_TOKEN");
  console.error("   npx tsx --env-file=.env.local scripts/seed-all.ts");
  process.exit(1);
}

const kv = createClient({ url: KV_REST_API_URL, token: KV_REST_API_TOKEN });

const LIB = path.join(process.cwd(), "lib");

function readJson<T>(filename: string): T {
  return JSON.parse(fs.readFileSync(path.join(LIB, filename), "utf-8")) as T;
}

// ─── Catalogues ──────────────────────────────────────────────────────────────

async function seedCatalogues() {
  const entries = [
    { key: "catalogue:wacker_neuson", file: "catalogue_wacker_neuson.json" },
    { key: "catalogue:magni",         file: "catalogue_magni.json" },
    { key: "catalogue:promove",       file: "catalogue_promove.json" },
  ];
  for (const { key, file } of entries) {
    const data = readJson<{ machines: unknown[] }>(file);
    await kv.set(key, data);
    console.log(`✅  ${key}: ${data.machines.length} machines`);
  }
}

// ─── Team ────────────────────────────────────────────────────────────────────

async function seedTeam() {
  const team = readJson<unknown[]>("team.json");
  await kv.set("team", team);
  console.log(`✅  team: ${team.length} membres`);
}

// ─── Articles ────────────────────────────────────────────────────────────────

type ContentBlock =
  | { type: "intro"; text: string }
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; title: string; body: string }
  | { type: "quote"; text: string; author: string; role: string }
  | { type: "cta"; label: string; href: string };

type StaticArticle = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  date: string;
  readTime: string;
  image?: string;
  gradientFrom: string;
  gradientTo: string;
  icon: string;
  metaTitle: string;
  metaDescription: string;
  content: ContentBlock[];
};

type AdminArticle = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  coverImage: string | null;
  status: "published" | "draft";
  publishedAt: string;
  createdAt: string;
};

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

async function seedArticles() {
  const appDir = path.join(process.cwd(), "app", "actualites");
  const raw = fs.readFileSync(path.join(appDir, "articles-data.ts"), "utf-8");

  // Extract the ARTICLES array by evaluating via dynamic import
  // We can't directly import TS from a script without compilation — use a temp workaround
  // by parsing the exported array with a quick require via tsx's register
  const articlesModule = await import("../app/actualites/articles-data.js").catch(() => null)
    ?? await import("../app/actualites/articles-data").catch(() => null);

  if (!articlesModule) {
    console.warn("⚠️  Could not import articles-data — skipping articles seed");
    return;
  }

  const ARTICLES: StaticArticle[] = articlesModule.ARTICLES ?? [];

  const adminArticles: AdminArticle[] = ARTICLES.map((a) => ({
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

  await kv.set("articles", adminArticles);
  console.log(`✅  articles: ${adminArticles.length} articles`);
}

// ─── Partners ────────────────────────────────────────────────────────────────

async function seedPartners() {
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

  await kv.set("partners", partners);
  console.log(`✅  partners: 3 partenaires`);
}

// ─── Site Content ─────────────────────────────────────────────────────────────

async function seedSiteContent() {
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
  };

  await kv.set("site-content", siteContent);
  console.log(`✅  site-content: contact, home, apropos, footer`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱  Seeding ALL site data to Vercel KV…\n");

  await seedCatalogues();
  await seedTeam();
  await seedArticles();
  await seedPartners();
  await seedSiteContent();

  console.log("\nKeys in KV:");
  const keys = await kv.keys("*");
  keys.forEach((k) => console.log(`  • ${k}`));
  console.log("\n✨  Done!");
}

main().catch((err) => {
  console.error("❌  Seeding failed:", err.message ?? err);
  process.exit(1);
});
