import { BRANDS, getCategoriesForBrand } from "./data";

// URL externe vers la page de gamme du fabricant, par slug de catégorie.
// Laissé vide pour le moment — à compléter catégorie par catégorie.
export const GAMME_FABRICANT_URLS: Record<string, string> = {
  // Wacker Neuson
  "mini-pelles": "",
  dumpers: "",
  chargeuses: "",
  compacteurs: "",
  "plaques-vibrantes": "",
  pilonneuses: "",
  "marteaux-piqueurs": "",
  outillage: "",
  telescopiques: "",
  // Magni
  "telehandlers-rotatifs": "",
  "telehandlers-fixes": "",
  "telehandlers-agricoles": "",
  // Promove Demolition
  "brise-roches": "",
  "pinces-multiprocesseurs": "",
  pulverisateurs: "",
  cisailles: "",
  "pinces-de-tri": "",
};

export function getGammeFabricantUrl(categorySlug: string): string {
  return GAMME_FABRICANT_URLS[categorySlug] ?? "";
}

// Emoji/icône d'illustration par catégorie pour les cartes de la page /gammes.
const GAMME_CATEGORY_EMOJI: Record<string, string> = {
  "mini-pelles": "⛏️",
  dumpers: "🚛",
  chargeuses: "🚜",
  compacteurs: "🛞",
  "plaques-vibrantes": "🔲",
  pilonneuses: "🔨",
  "marteaux-piqueurs": "⚒️",
  outillage: "🔧",
  telescopiques: "🏗️",
  "telehandlers-rotatifs": "🏗️",
  "telehandlers-fixes": "🏗️",
  "telehandlers-agricoles": "🏗️",
  "brise-roches": "💥",
  "pinces-multiprocesseurs": "🦾",
  pulverisateurs: "🧱",
  cisailles: "✂️",
  "pinces-de-tri": "♻️",
};

export function getGammeCategoryEmoji(categorySlug: string): string {
  return GAMME_CATEGORY_EMOJI[categorySlug] ?? "🏗️";
}

export interface GammeCategory {
  slug: string;
  label: string;
  count: number;
  urlGammeFabricant: string;
  emoji: string;
}

export interface GammeBrand {
  brandId: string;
  brandName: string;
  categories: GammeCategory[];
}

export function getGammesData(): GammeBrand[] {
  return BRANDS.map((brand) => ({
    brandId: brand.id,
    brandName: brand.name,
    categories: getCategoriesForBrand(brand.id).map((cat) => ({
      slug: cat.id,
      label: cat.label,
      count: cat.count,
      urlGammeFabricant: getGammeFabricantUrl(cat.id),
      emoji: getGammeCategoryEmoji(cat.id),
    })),
  }));
}
