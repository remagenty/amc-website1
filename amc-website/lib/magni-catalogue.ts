import catalogueData from "./catalogue_magni.json";
import type { WnMachine } from "./wn-catalogue";
import { wnMachineToProduct } from "./wn-catalogue";
import type { Product } from "@/types";

// Magni-specific categories
export const MAGNI_CATEGORY_TO_SLUG: Record<string, string> = {
  "Téléhandler rotatif": "telehandlers-rotatifs",
  "Téléhandler fixe": "telehandlers-fixes",
  "Téléhandler agricole": "telehandlers-agricoles",
};

export const MAGNI_SLUG_TO_CATEGORY: Record<string, string> = Object.fromEntries(
  Object.entries(MAGNI_CATEGORY_TO_SLUG).map(([k, v]) => [v, k])
);

export const MAGNI_CATEGORY_LABELS: Record<string, string> = {
  "telehandlers-rotatifs": "Chariots télescopiques et nacelles rotatifs",
  "telehandlers-fixes": "Chariots télescopiques et nacelles fixes",
  "telehandlers-agricoles": "Chariots télescopiques et nacelles agricoles",
};

const ALL_MAGNI_MACHINES: WnMachine[] = catalogueData.machines as unknown as WnMachine[];

export function getAllMagniMachines(): WnMachine[] { return ALL_MAGNI_MACHINES; }

export function getMagniMachineBySlug(slug: string): WnMachine | undefined {
  return ALL_MAGNI_MACHINES.find(m => m.slug === slug);
}

export function getMagniMachinesByCategory(categorySlug: string): WnMachine[] {
  const cat = MAGNI_SLUG_TO_CATEGORY[categorySlug];
  if (!cat) return [];
  return ALL_MAGNI_MACHINES.filter(m => m.categorie === cat);
}

export function getMagniSimilarMachines(machine: WnMachine, limit = 4): WnMachine[] {
  return ALL_MAGNI_MACHINES.filter(m => m.id !== machine.id && m.categorie === machine.categorie).slice(0, limit);
}

export function getMagniCategories(): Array<{slug: string; label: string; count: number}> {
  const counts: Record<string, number> = {};
  for (const m of ALL_MAGNI_MACHINES) {
    counts[m.categorie] = (counts[m.categorie] ?? 0) + 1;
  }
  return Object.entries(MAGNI_CATEGORY_TO_SLUG).map(([cat, slug]) => ({
    slug,
    label: MAGNI_CATEGORY_LABELS[slug] ?? cat,
    count: counts[cat] ?? 0,
  })).filter(c => c.count > 0);
}

export function getMagniCategoryUrlSlug(machine: WnMachine): string {
  return MAGNI_CATEGORY_TO_SLUG[machine.categorie] ?? machine.categorie.toLowerCase().replace(/\s+/g, "-");
}

export function magniMachineToProduct(m: WnMachine): Product {
  return {
    ...wnMachineToProduct(m),
    brand: "magni" as const,
    categorySlug: getMagniCategoryUrlSlug(m),
    tags: [m.categorie.toLowerCase(), m.sous_categorie.toLowerCase(), "magni"],
  };
}

export function getMagniProducts(): Product[] {
  return ALL_MAGNI_MACHINES.map(magniMachineToProduct);
}
