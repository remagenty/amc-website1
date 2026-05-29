const fs = require('fs');
const path = require('path');

// Charger le catalogue
const cataloguePath = path.join(__dirname, '..', 'lib', 'catalogue_wacker_neuson.json');
const catalogue = require(cataloguePath);

console.log('🔄 Mise à jour des chemins d\'images dans le catalogue...\n');

let updateCount = 0;

for (const machine of catalogue.machines) {
  const categorySlug = machine.categorie.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[éèê]/g, 'e')
    .replace(/[àâ]/g, 'a');

  const machineSlug = `${machine.marque.toLowerCase().replace(/\s+/g, '-')}-${machine.modele.toLowerCase().replace(/\s+/g, '-')}`;
  const imagesDir = path.join(__dirname, '..', 'public', 'images', 'machines', categorySlug, machineSlug);

  // Vérifier si le dossier existe
  if (fs.existsSync(imagesDir)) {
    const files = fs.readdirSync(imagesDir);

    if (files.length > 0) {
      // Mettre à jour les chemins d'images
      const basePath = `/images/machines/${categorySlug}/${machineSlug}`;

      machine.image_principale = `${basePath}/hero.jpg`;
      machine.images_galerie = files
        .filter(f => f.startsWith('gallery-'))
        .map(f => `${basePath}/${f}`);

      console.log(`✅ ${machine.modele}: ${files.length} image(s) trouvée(s)`);
      updateCount++;
    }
  }
}

// Sauvegarder le catalogue mis à jour
fs.writeFileSync(cataloguePath, JSON.stringify(catalogue, null, 2));

console.log(`\n🎉 MISE À JOUR TERMINÉE !`);
console.log(`✅ ${updateCount} machines mises à jour`);
