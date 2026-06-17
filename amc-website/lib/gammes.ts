import { BRANDS, getCategoriesForBrand, getMachines } from "./data";

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

// Image représentative par catégorie : premier produit disponible dans le catalogue.
// Calculé une seule fois au démarrage depuis les données produit existantes.
function buildCategoryImages(): Record<string, string> {
  const images: Record<string, string> = {};
  for (const m of getMachines()) {
    const slug = m.categorySlug ?? "";
    if (slug && !images[slug] && m.images[0]) {
      images[slug] = m.images[0];
    }
  }
  return images;
}

const GAMME_CATEGORY_IMAGES: Record<string, string> = buildCategoryImages();

export function getGammeCategoryImage(categorySlug: string): string {
  return GAMME_CATEGORY_IMAGES[categorySlug] ?? "";
}

export interface GammeCategory {
  slug: string;
  label: string;
  count: number;
  urlGammeFabricant: string;
  image: string;
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
      image: getGammeCategoryImage(cat.id),
    })),
  }));
}
