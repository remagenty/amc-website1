import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/admin/auth";
import { kvGet, kvSet } from "@/lib/kv";

export const dynamic = "force-dynamic";

type Service = {
  slug: string;
  title: string;
  description: string;
  heroImage: string | null;
  keyPoints: string[];
  ctaText: string;
  ctaHref: string;
};

const DEFAULT_SERVICES: Record<string, Service> = {
  financement: {
    slug: "financement",
    title: "Solutions de financement",
    description:
      "AMC vous propose des solutions de financement adaptées à votre activité et à vos besoins pour l'acquisition de matériels de chantier neufs ou d'occasion.",
    heroImage: null,
    keyPoints: [
      "Crédit-bail : gardez votre trésorerie pour votre activité",
      "LOA (Location avec Option d'Achat) : flexibilité maximale",
      "Financement classique avec nos partenaires bancaires",
      "Réponse sous 48h après dépôt du dossier",
      "Accompagnement personnalisé par nos conseillers",
    ],
    ctaText: "Demander un devis financement",
    ctaHref: "/devis?type=financement",
  },
  maintenance: {
    slug: "maintenance",
    title: "SAV & Maintenance",
    description:
      "Notre atelier certifié SE+ prend en charge la maintenance préventive, les réparations et la fourniture de pièces d'origine pour tous vos équipements de chantier.",
    heroImage: null,
    keyPoints: [
      "Maintenance préventive selon les préconisations constructeur",
      "Réparations toutes marques",
      "Pièces détachées d'origine WACKER NEUSON, Magni, Promove",
      "Intervention rapide — atelier et déplacement sur site",
      "Techniciens certifiés usine SE+",
      "Contrats d'entretien annuels disponibles",
    ],
    ctaText: "Prendre rendez-vous SAV",
    ctaHref: "/contact?type=sav",
  },
  "certification-se-plus": {
    slug: "certification-se-plus",
    title: "Certification SE+",
    description:
      "L'atelier AMC est certifié SE+ par WACKER NEUSON — la certification d'excellence du service après-vente pour les équipements compacts de construction.",
    heroImage: null,
    keyPoints: [
      "Seul atelier certifié SE+ de la région Rhône-Alpes",
      "Techniciens formés directement par les constructeurs",
      "Accès aux outils de diagnostic officiels",
      "Garanties constructeur maintenues",
      "Stock de pièces d'origine certifiées",
      "Formation opérateurs disponible",
    ],
    ctaText: "En savoir plus",
    ctaHref: "/contact",
  },
};

async function requireAuth(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return token ? await verifyToken(token) : null;
}

export async function GET(req: NextRequest) {
  if (!(await requireAuth(req)))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const services = await kvGet<Record<string, Service>>("services");
  return NextResponse.json(services ?? DEFAULT_SERVICES);
}
