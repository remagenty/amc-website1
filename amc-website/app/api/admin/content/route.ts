import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";
import { kvGet, kvSet } from "@/lib/kv";

export type SiteStat = { value: string; label: string };
export type FooterLink = { label: string; href: string; section: string };

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
};

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return token ? await verifyToken(token) : null;
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const stored = await kvGet<SiteContent>("site-content");
  return NextResponse.json(stored ?? DEFAULT_CONTENT);
}

export async function PUT(req: NextRequest) {
  if (!(await requireAuth(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json() as SiteContent;
  await kvSet("site-content", body);
  return NextResponse.json({ ok: true });
}
