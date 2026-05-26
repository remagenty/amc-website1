/**
 * Met à jour le catalogue JSON pour pointer vers les images locales téléchargées.
 * À lancer APRÈS scrape-wn-images.js.
 *
 * Usage :
 *   node scripts/update-catalogue-image-paths.js
 */

const fs = require("fs");
const path = require("path");

const CATALOGUE_PATH = path.join(__dirname, "../lib/catalogue_wacker_neuson.json");
const DEST_CATALOGUE = path.join(__dirname, "../amc-website/lib/catalogue_wacker_neuson.json");
const MACHINES_DIR = path.join(__dirname, "../amc-website/public/images/machines");

const CATEGORY_TO_SLUG = {
  "Mini-pelle":      "mini-pelles",
  "Dumper":          "dumpers",
  "Chargeuse":       "chargeuses",
  "Compacteur":      "compacteurs",
  "Plaque vibrante": "plaques-vibrantes",
  "Pilonneuse":      "pilonneuses",
  "Marteau piqueur": "marteaux-piqueurs",
  "Outillage":       "outillage",
  "Télescopique":    "telescopiques",
};

function getCategorySlug(machine) {
  return CATEGORY_TO_SLUG[machine.categorie] ?? machine.categorie.toLowerCase().replace(/\s+/g, "-");
}

const catalogue = JSON.parse(fs.readFileSync(CATALOGUE_PATH, "utf8"));
let updated = 0;
let missing = 0;

for (const machine of catalogue.machines) {
  const catSlug = getCategorySlug(machine);
  const machineDir = path.join(MACHINES_DIR, catSlug, machine.slug);

  if (!fs.existsSync(machineDir)) {
    console.log(`⚠️  Dossier manquant : ${catSlug}/${machine.slug}`);
    missing++;
    continue;
  }

  const files = fs.readdirSync(machineDir)
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort();

  if (files.length === 0) {
    console.log(`⚠️  Aucun fichier image : ${catSlug}/${machine.slug}`);
    missing++;
    continue;
  }

  const basePath = `/images/machines/${catSlug}/${machine.slug}`;

  // Image principale = hero.jpg ou premier fichier
  const hero = files.find((f) => f.startsWith("hero")) ?? files[0];
  machine.medias.image_principale = `${basePath}/${hero}`;
  machine.medias.image_principale_local = `${basePath}/${hero}`;

  // Galerie = tous les fichiers gallery-*
  const gallery = files.filter((f) => f.startsWith("gallery-"));
  machine.medias.images = gallery.map((f) => `${basePath}/${f}`);
  machine.medias.images_local = gallery.map((f) => `${basePath}/${f}`);

  console.log(`✅ ${machine.nom_complet} — ${files.length} image(s)`);
  updated++;
}

fs.writeFileSync(CATALOGUE_PATH, JSON.stringify(catalogue, null, 2), "utf8");
fs.writeFileSync(DEST_CATALOGUE, JSON.stringify(catalogue, null, 2), "utf8");

console.log(`\n✅ ${updated} machines mises à jour`);
if (missing > 0) console.log(`⚠️  ${missing} machines sans images locales`);
console.log("💾 catalogue_wacker_neuson.json mis à jour (lib/ et amc-website/lib/)");
