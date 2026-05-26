/**
 * Génère Downloads/URLs_Magni.txt avec toutes les URLs du catalogue Magni.
 *
 * Usage :
 *   node scripts/generate-magni-urls.js
 */

const fs = require("fs");
const path = require("path");

const CATALOGUE_PATH = path.join(__dirname, "../lib/catalogue_magni.json");
const OUTPUT_PATH = path.join(__dirname, "../Downloads/URLs_Magni.txt");
const BASE_URL = "https://amc-website1.vercel.app";

const CATEGORY_TO_SLUG = {
  "Téléhandler rotatif":   "telehandlers-rotatifs",
  "Téléhandler fixe":      "telehandlers-fixes",
  "Téléhandler agricole":  "telehandlers-agricoles",
};

function getCategorySlug(machine) {
  return CATEGORY_TO_SLUG[machine.categorie] ?? machine.categorie.toLowerCase().replace(/\s+/g, "-");
}

const catalogue = JSON.parse(fs.readFileSync(CATALOGUE_PATH, "utf8"));
const machines = catalogue.machines;

// Grouper par catégorie
const byCategory = {};
for (const m of machines) {
  const slug = getCategorySlug(m);
  if (!byCategory[slug]) byCategory[slug] = [];
  byCategory[slug].push(m);
}

const lines = [];
lines.push("═".repeat(70));
lines.push("  CATALOGUE MAGNI — URLs du site AMC Alpes Matériel Compact");
lines.push(`  Généré le ${new Date().toLocaleDateString("fr-FR")} — ${machines.length} machines`);
lines.push("═".repeat(70));
lines.push("");

// Pages catégories
lines.push("── PAGES CATÉGORIES ─────────────────────────────────────────────────");
lines.push("");
const categoryLabels = {
  "telehandlers-rotatifs":   "Téléhandlers rotatifs",
  "telehandlers-fixes":      "Téléhandlers fixes",
  "telehandlers-agricoles":  "Téléhandlers agricoles",
};
for (const [slug, label] of Object.entries(categoryLabels)) {
  const count = byCategory[slug]?.length ?? 0;
  if (count > 0) {
    lines.push(`  ${label} (${count} machines)`);
    lines.push(`  ${BASE_URL}/materiels/${slug}`);
    lines.push("");
  }
}

// Pages produits par catégorie
for (const [catSlug, catMachines] of Object.entries(byCategory)) {
  const catLabel = categoryLabels[catSlug] ?? catSlug;
  lines.push("─".repeat(70));
  lines.push(`  ${catLabel.toUpperCase()} (${catMachines.length} machines)`);
  lines.push("─".repeat(70));
  lines.push("");

  for (const m of catMachines) {
    lines.push(`  ${m.nom_complet}`);
    lines.push(`  → AMC  : ${BASE_URL}/materiels/${catSlug}/${m.slug}`);
    if (m.url_wacker_neuson) {
      lines.push(`  → Magni: ${m.url_wacker_neuson}`);
    }
    lines.push("");
  }
}

// Section URLs Magni officielles
lines.push("═".repeat(70));
lines.push("  URLs OFFICIELLES MAGNITH.COM");
lines.push("═".repeat(70));
lines.push("");

const wnUrls = machines
  .filter(m => m.url_wacker_neuson && m.url_wacker_neuson.includes("magnith"))
  .map(m => `  ${m.modele.padEnd(15)} ${m.url_wacker_neuson}`);

if (wnUrls.length > 0) {
  lines.push(...wnUrls);
} else {
  lines.push("  (à compléter après scraping)");
}

lines.push("");
lines.push("═".repeat(70));

const content = lines.join("\n");
fs.writeFileSync(OUTPUT_PATH, content, "utf8");
console.log(`✅ ${OUTPUT_PATH} généré (${machines.length} machines, ${lines.length} lignes)`);
