const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Charger le catalogue
const catalogue = require('../lib/catalogue_wacker_neuson.json');

// Fonction pour télécharger une image
async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', err => {
      fs.unlink(filepath, () => {}); // Supprimer le fichier en cas d'erreur
      reject(err);
    });
  });
}

// Fonction pour créer les dossiers nécessaires
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Fonction principale
async function scrapeImages() {
  console.log('🚀 Démarrage du scraping des images Wacker Neuson...\n');

  const browser = await puppeteer.launch({
    headless: false, // Mode visible pour voir ce qui se passe
    defaultViewport: { width: 1920, height: 1080 }
  });

  const page = await browser.newPage();

  let successCount = 0;
  let errorCount = 0;

  for (const machine of catalogue.machines) {
    console.log(`\n📦 Traitement: ${machine.modele} (${machine.categorie})`);

    try {
      // Créer le dossier de destination
      const categorySlug = machine.categorie.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[éèê]/g, 'e')
        .replace(/[àâ]/g, 'a');

      const machineSlug = `${machine.marque.toLowerCase().replace(/\s+/g, '-')}-${machine.modele.toLowerCase().replace(/\s+/g, '-')}`;
      const destDir = path.join(__dirname, '..', 'public', 'images', 'machines', categorySlug, machineSlug);

      ensureDirectoryExists(destDir);

      // Aller sur la page de la machine
      if (machine.url_wacker_neuson) {
        console.log(`   🌐 Visite de ${machine.url_wacker_neuson}`);

        await page.goto(machine.url_wacker_neuson, {
          waitUntil: 'networkidle2',
          timeout: 30000
        });

        // Attendre un peu pour que les images se chargent
        await page.waitForTimeout(2000);

        // Récupérer les URLs des images
        const imageUrls = await page.evaluate(() => {
          const images = [];

          // Sélecteurs possibles pour les images sur le site Wacker Neuson
          const selectors = [
            '.product-image img',
            '.gallery-image img',
            '.product-gallery img',
            'img[data-src]',
            '.swiper-slide img',
            'picture img'
          ];

          for (const selector of selectors) {
            const imgs = document.querySelectorAll(selector);
            imgs.forEach(img => {
              const src = img.src || img.dataset.src || img.getAttribute('data-src');
              if (src && src.includes('wackerneuson') && !images.includes(src)) {
                images.push(src);
              }
            });
          }

          return images;
        });

        if (imageUrls.length > 0) {
          console.log(`   ✅ ${imageUrls.length} image(s) trouvée(s)`);

          // Télécharger les images
          for (let i = 0; i < Math.min(imageUrls.length, 5); i++) {
            const imageUrl = imageUrls[i];
            const filename = i === 0 ? 'hero.jpg' : `gallery-${i}.jpg`;
            const filepath = path.join(destDir, filename);

            try {
              await downloadImage(imageUrl, filepath);
              console.log(`   💾 ${filename} téléchargée`);
            } catch (err) {
              console.log(`   ⚠️  Erreur téléchargement ${filename}: ${err.message}`);
            }
          }

          successCount++;
        } else {
          console.log(`   ⚠️  Aucune image trouvée`);
          errorCount++;
        }
      } else {
        console.log(`   ⚠️  Pas d'URL Wacker Neuson disponible`);
        errorCount++;
      }

      // Pause entre chaque machine pour ne pas surcharger le serveur
      await page.waitForTimeout(1000);

    } catch (error) {
      console.log(`   ❌ Erreur: ${error.message}`);
      errorCount++;
    }
  }

  await browser.close();

  console.log('\n\n🎉 SCRAPING TERMINÉ !');
  console.log(`✅ Succès: ${successCount} machines`);
  console.log(`❌ Erreurs: ${errorCount} machines`);
}

// Lancer le script
scrapeImages().catch(console.error);
