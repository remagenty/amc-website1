/**
 * Génère Downloads/URLs_Promove.txt avec toutes les URLs du catalogue Promove Demolition.
 *
 * Usage :
 *   node scripts/generate-promove-urls.js
 */

const fs = require("fs");
const path = require("path");

const CATALOGUE_PATH = path.join(__dirname, "../lib/catalogue_promove.json");
const OUTPUT_PATH = path.join(__dirname, "../Downloads/URLs_Promove.txt");
const BASE_URL = "https://amc-website1.vercel.app";

const CATEGORY_TO_SLUG = {
  "Brise-roche hydraulique":   "brise-roches",
  "Pince multiprocesseur":     "pinces-multiprocesseurs",
  "Pulvérisateur béton":       "pulverisateurs",
  "Cisaille à ferraille":      "cisailles",
  "Pince de tri et démolition":"pinces-de-tri",
};

function getCategorySlug(machine) {
  return CATEGORY_TO_SLUG[machine.categorie] ?? machine.categorie.toLowerCase().replace(/\s+/g, "-");
}

const catalogue = JSON.parse(fs.readFileSync(CATALOGUE_PATH, "utf8"));
const machines = catalogue.machines;

const byCategory = {};
for (const m of machines) {
  const slug = getCategorySlug(m);
  if (!byCategory[slug]) byCategory[slug] = [];
  byCategory[slug].push(m);
}

const lines = [];
lines.push("═".repeat(70));
lines.push("  CATALOGUE PROMOVE DEMOLITION — URLs du site AMC Alpes Matériel Compact");
lines.push(`  Généré le ${new Date().toLocaleDateString("fr-FR")} — ${machines.length} outils`);
lines.push("═".repeat(70));
lines.push("");

const categoryLabels = {
  "brise-roches":           "Brise-roches hydrauliques",
  "pinces-multiprocesseurs":"Pinces multiprocesseurs",
  "pulverisateurs":         "Pulvérisateurs béton",
  "cisailles":              "Cisailles à ferraille",
  "pinces-de-tri":          "Pinces de tri et démolition",
};

lines.push("── PAGES CATÉGORIES ─────────────────────────────────────────────────");
lines.push("");
for (const [slug, label] of Object.entries(categoryLabels)) {
  const count = byCategory[slug]?.length ?? 0;
  if (count > 0) {
    lines.push(`  ${label} (${count} outils)`);
    lines.push(`  ${BASE_URL}/materiels/${slug}`);
    lines.push("");
  }
}

for (const [catSlug, catMachines] of Object.entries(byCategory)) {
  const catLabel = categoryLabels[catSlug] ?? catSlug;
  lines.push("─".repeat(70));
  lines.push(`  ${catLabel.toUpperCase()} (${catMachines.length} outils)`);
  lines.push("─".repeat(70));
  lines.push("");

  for (const m of catMachines) {
    lines.push(`  ${m.nom_complet}`);
    lines.push(`  → AMC     : ${BASE_URL}/materiels/${catSlug}/${m.slug}`);
    if (m.url_wacker_neuson) {
      lines.push(`  → Promove : ${m.url_wacker_neuson}`);
    }
    lines.push("");
  }
}

lines.push("═".repeat(70));
lines.push("  URLs OFFICIELLES PROMOVEDEMOLITION.COM");
lines.push("═".repeat(70));
lines.push("");

const officialUrls = machines
  .filter(m => m.url_wacker_neuson)
  .map(m => `  ${m.modele.padEnd(20)} ${m.url_wacker_neuson}`);

lines.push(...officialUrls);
lines.push("");
lines.push("═".repeat(70));

const content = lines.join("\n");
fs.writeFileSync(OUTPUT_PATH, content, "utf8");
console.log(`✅ ${OUTPUT_PATH} généré (${machines.length} outils, ${lines.length} lignes)`);
