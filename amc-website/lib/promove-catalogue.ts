import catalogueData from "./catalogue_promove.json";
import type { WnMachine } from "./wn-catalogue";

export const PROMOVE_CATEGORY_TO_SLUG: Record<string, string> = {
  "Brise-roche hydraulique": "brise-roches",
  "Pince multiprocesseur": "pinces-multiprocesseurs",
  "Pulvérisateur béton": "pulverisateurs",
  "Cisaille à ferraille": "cisailles",
  "Pince de tri et démolition": "pinces-de-tri",
};

export const PROMOVE_SLUG_TO_CATEGORY: Record<string, string> = Object.fromEntries(
  Object.entries(PROMOVE_CATEGORY_TO_SLUG).map(([k, v]) => [v, k])
);

export const PROMOVE_CATEGORY_LABELS: Record<string, string> = {
  "brise-roches": "Brise-roches hydrauliques",
  "pinces-multiprocesseurs": "Pinces multiprocesseurs",
  "pulverisateurs": "Pulvérisateurs béton",
  "cisailles": "Cisailles à ferraille",
  "pinces-de-tri": "Pinces de tri et démolition",
};

const ALL_PROMOVE_MACHINES: WnMachine[] = catalogueData.machines as unknown as WnMachine[];

export function getAllPromoveMachines(): WnMachine[] { return ALL_PROMOVE_MACHINES; }

export function getPromoveMachineBySlug(slug: string): WnMachine | undefined {
  return ALL_PROMOVE_MACHINES.find(m => m.slug === slug);
}

export function getPromoveMachinesByCategory(categorySlug: string): WnMachine[] {
  const cat = PROMOVE_SLUG_TO_CATEGORY[categorySlug];
  if (!cat) return [];
  return ALL_PROMOVE_MACHINES.filter(m => m.categorie === cat);
}

export function getPromoveSimilarMachines(machine: WnMachine, limit = 4): WnMachine[] {
  return ALL_PROMOVE_MACHINES.filter(m => m.id !== machine.id && m.categorie === machine.categorie).slice(0, limit);
}

export function getPromoveCategories(): Array<{slug: string; label: string; count: number}> {
  const counts: Record<string, number> = {};
  for (const m of ALL_PROMOVE_MACHINES) {
    counts[m.categorie] = (counts[m.categorie] ?? 0) + 1;
  }
  return Object.entries(PROMOVE_CATEGORY_TO_SLUG).map(([cat, slug]) => ({
    slug,
    label: PROMOVE_CATEGORY_LABELS[slug] ?? cat,
    count: counts[cat] ?? 0,
  })).filter(c => c.count > 0);
}

export function getPromoveCategoryUrlSlug(machine: WnMachine): string {
  return PROMOVE_CATEGORY_TO_SLUG[machine.categorie] ?? machine.categorie.toLowerCase().replace(/\s+/g, "-");
}
