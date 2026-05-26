import type { Product, Spec } from "@/types";
import catalogueData from "./catalogue_wacker_neuson.json";

// ── Raw JSON types ────────────────────────────────────────────────────────────

export interface WnMachine {
  id: string;
  marque: string;
  modele: string;
  reference: string;
  nom_complet: string;
  slug: string;
  categorie: string;
  sous_categorie: string;
  description_courte: string;
  description_longue: string;
  prix_ht: number | null;
  devise: string;
  etat: "neuf" | "occasion";
  disponibilite: "disponible" | "sur_commande";
  featured: boolean;
  caracteristiques_techniques: Record<string, string | number>;
  points_forts: string[];
  applications: string[];
  secteurs: string[];
  services: {
    garantie_constructeur: boolean;
    sav_certifie_se_plus: boolean;
    pieces_detachees_origine: boolean;
    financement_disponible: boolean;
  };
  medias: {
    image_principale: string;
    images: string[];
    video: string | null;
    // Populated by scripts/update-catalogue-image-paths.js after local download
    image_principale_local?: string;
    images_local?: string[];
  };
  url_wacker_neuson: string;
  date_scraping: string;
}

// ── Category mapping ──────────────────────────────────────────────────────────

export const CATEGORY_TO_SLUG: Record<string, string> = {
  "Mini-pelle": "mini-pelles",
  "Dumper": "dumpers",
  "Chargeuse": "chargeuses",
  "Compacteur": "compacteurs",
  "Plaque vibrante": "plaques-vibrantes",
  "Pilonneuse": "pilonneuses",
  "Marteau piqueur": "marteaux-piqueurs",
  "Outillage": "outillage",
  "Télescopique": "telescopiques",
};

export const SLUG_TO_CATEGORY: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_TO_SLUG).map(([k, v]) => [v, k])
);

export const CATEGORY_LABELS: Record<string, string> = {
  "mini-pelles": "Mini-pelles",
  "dumpers": "Dumpers articulés",
  "chargeuses": "Chargeuses compactes",
  "compacteurs": "Compacteurs tandem",
  "plaques-vibrantes": "Plaques vibrantes",
  "pilonneuses": "Pilonneuses",
  "marteaux-piqueurs": "Marteaux piqueurs",
  "outillage": "Outillage",
  "telescopiques": "Télescopiques",
};

// ── Spec label mapping ────────────────────────────────────────────────────────

const SPEC_MAP: Record<string, { label: string; unit: string }> = {
  masse_operationnelle_kg: { label: "Masse opérationnelle", unit: "kg" },
  puissance_kw: { label: "Puissance moteur", unit: "kW" },
  profondeur_fouille_max_mm: { label: "Profondeur de fouille max.", unit: "mm" },
  force_arrachement_godet_kn: { label: "Force d'arrachement godet", unit: "kN" },
  largeur_transport_mm: { label: "Largeur hors tout", unit: "mm" },
  hauteur_transport_mm: { label: "Hauteur hors tout", unit: "mm" },
  longueur_transport_mm: { label: "Longueur hors tout", unit: "mm" },
  capacite_godet_m3: { label: "Capacité godet", unit: "m³" },
  charge_utile_kg: { label: "Charge utile", unit: "kg" },
  capacite_benne_m3: { label: "Capacité benne", unit: "m³" },
  vitesse_max_kmh: { label: "Vitesse maximale", unit: "km/h" },
  largeur_mm: { label: "Largeur", unit: "mm" },
  longueur_mm: { label: "Longueur", unit: "mm" },
  hauteur_mm: { label: "Hauteur", unit: "mm" },
  masse_totale_kg: { label: "Masse totale", unit: "kg" },
  charge_max_kg: { label: "Charge maximale", unit: "kg" },
  hauteur_max_m: { label: "Hauteur de levage", unit: "m" },
  largeur_de_travail_mm: { label: "Largeur de travail", unit: "mm" },
  amplitude_mm: { label: "Amplitude", unit: "mm" },
  frequence_hz: { label: "Fréquence de vibration", unit: "Hz" },
  force_centrifuge_kn: { label: "Force centrifuge", unit: "kN" },
  vitesse_avancement_m_min: { label: "Vitesse d'avancement", unit: "m/min" },
  force_impact_kn: { label: "Force d'impact", unit: "kN" },
  frequence_coups_min: { label: "Fréquence de frappe", unit: "coups/min" },
  hauteur_saut_mm: { label: "Hauteur de saut", unit: "mm" },
  semelle_mm: { label: "Dimensions semelle", unit: "" },
  energie_impact_j: { label: "Énergie d'impact", unit: "J" },
  pression_service_bar: { label: "Pression de service", unit: "bar" },
  alimentation: { label: "Alimentation", unit: "" },
  puissance_kva: { label: "Puissance", unit: "kVA" },
  tension_v: { label: "Tension", unit: "V" },
  capacite_reservoir_l: { label: "Capacité réservoir", unit: "L" },
  autonomie_h: { label: "Autonomie", unit: "h" },
};

function technicalSpecsToArray(specs: Record<string, string | number>): Spec[] {
  return Object.entries(specs)
    .filter(([, v]) => v !== null && v !== undefined)
    .map(([key, value]) => {
      const def = SPEC_MAP[key];
      return {
        label: def?.label ?? key.replace(/_/g, " "),
        value: String(value),
        unit: def?.unit ?? "",
      };
    });
}

// ── Category → existing Product.category mapping ──────────────────────────────

function toCategoryField(categorie: string): Product["category"] {
  const map: Record<string, Product["category"]> = {
    "Mini-pelle": "pelles",
    "Dumper": "dumpers",
    "Chargeuse": "manutention",
    "Compacteur": "compacteurs",
    "Plaque vibrante": "compactage",
    "Pilonneuse": "compactage",
    "Marteau piqueur": "demolition",
    "Outillage": "terrassement",
    "Télescopique": "telescopiques",
  };
  return map[categorie] ?? "terrassement";
}

// ── Adapter ───────────────────────────────────────────────────────────────────

export function wnMachineToProduct(m: WnMachine): Product {
  // Prefer locally downloaded images, fall back to original URLs
  const heroLocal = m.medias.image_principale_local ?? m.medias.image_principale;
  const galleryLocal = m.medias.images_local ?? m.medias.images;
  const allImages = [heroLocal, ...galleryLocal].filter(Boolean);

  return {
    id: m.id,
    slug: m.slug,
    name: m.nom_complet,
    model: m.modele,
    brand: "wacker-neuson",
    category: toCategoryField(m.categorie),
    status: m.etat,
    price: m.prix_ht ?? undefined,
    priceOnRequest: m.prix_ht === null,
    images: allImages.length > 0 ? allImages : ["/images/products/placeholder-wn.jpg"],
    shortDescription: m.description_courte,
    description: m.description_longue,
    specs: technicalSpecsToArray(m.caracteristiques_techniques),
    highlights: m.points_forts,
    hasSECertification: m.services.sav_certifie_se_plus,
    available: m.disponibilite === "disponible",
    featured: m.featured,
    tags: [m.categorie.toLowerCase(), m.sous_categorie.toLowerCase(), "wacker neuson"],
    applications: m.applications,
    sectors: m.secteurs,
  };
}

// ── Raw machine access (preserves JSON-specific fields like categorie slug) ───

const ALL_MACHINES: WnMachine[] = catalogueData.machines as unknown as WnMachine[];

export function getAllWnMachines(): WnMachine[] {
  return ALL_MACHINES;
}

export function getWnMachineBySlug(slug: string): WnMachine | undefined {
  return ALL_MACHINES.find((m) => m.slug === slug);
}

export function getWnMachinesByCategory(categorySlug: string): WnMachine[] {
  const categorie = SLUG_TO_CATEGORY[categorySlug];
  if (!categorie) return [];
  return ALL_MACHINES.filter((m) => m.categorie === categorie);
}

export function getWnSimilarMachines(machine: WnMachine, limit = 4): WnMachine[] {
  return ALL_MACHINES.filter(
    (m) => m.id !== machine.id && m.categorie === machine.categorie
  ).slice(0, limit);
}

export function getWnCategories(): Array<{ slug: string; label: string; count: number }> {
  const counts: Record<string, number> = {};
  for (const m of ALL_MACHINES) {
    counts[m.categorie] = (counts[m.categorie] ?? 0) + 1;
  }
  return Object.entries(CATEGORY_TO_SLUG).map(([cat, slug]) => ({
    slug,
    label: CATEGORY_LABELS[slug] ?? cat,
    count: counts[cat] ?? 0,
  })).filter((c) => c.count > 0);
}

// ── Product-type helpers (for reusing existing components) ────────────────────

export function getWnProductBySlug(slug: string): Product | undefined {
  const m = getWnMachineBySlug(slug);
  return m ? wnMachineToProduct(m) : undefined;
}

export function getWnProductsByCategory(categorySlug: string): Product[] {
  return getWnMachinesByCategory(categorySlug).map(wnMachineToProduct);
}

export function getWnSimilarProducts(product: Product, limit = 4): Product[] {
  const machine = getWnMachineBySlug(product.slug);
  if (!machine) return [];
  return getWnSimilarMachines(machine, limit).map(wnMachineToProduct);
}

export function getCategoryUrlSlug(machine: WnMachine): string {
  return CATEGORY_TO_SLUG[machine.categorie] ?? machine.categorie.toLowerCase();
}
