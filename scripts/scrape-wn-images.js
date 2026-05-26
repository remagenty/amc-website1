/**
 * Wacker Neuson Image Scraper — à lancer depuis ta machine locale
 *
 * Prérequis :
 *   cd /Users/remidelmas/Desktop/amc-website1
 *   npm install puppeteer
 *
 * Lancement :
 *   node scripts/scrape-wn-images.js
 *
 * Le script :
 *  1. Lit lib/catalogue_wacker_neuson.json
 *  2. Pour chaque machine, ouvre la page wackerneuson.com dans un vrai navigateur
 *  3. Extrait les URLs d'images haute résolution
 *  4. Télécharge les images dans amc-website/public/images/machines/
 *  5. Met à jour le JSON avec les chemins locaux
 */

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

// ── Configuration ─────────────────────────────────────────────────────────────

const CATALOGUE_PATH = path.join(__dirname, "../lib/catalogue_wacker_neuson.json");
const OUTPUT_DIR = path.join(__dirname, "../amc-website/public/images/machines");
const DELAY_BETWEEN_PAGES = 2000; // ms entre chaque page (respecter le serveur)
const DELAY_BETWEEN_IMAGES = 800; // ms entre chaque téléchargement

// ── Category slug helper (identique à wn-catalogue.ts) ───────────────────────

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

// ── URL builder pour les pages wackerneuson.com ────────────────────────────────

const CATEGORY_URL_MAP = {
  "Mini-pelle":      "products/excavators",
  "Dumper":          "products/dumpers",
  "Chargeuse":       "products/wheel-loaders",
  "Compacteur":      "products/rollers",
  "Plaque vibrante": "products/compaction",
  "Pilonneuse":      "products/compaction",
  "Marteau piqueur": "products/breakers",
  "Outillage":       "products/accessories",
  "Télescopique":    "products/telescopic-handlers",
};

function getProductPageUrl(machine) {
  // Utiliser directement l'URL du JSON si elle est définie
  if (machine.url_wacker_neuson && machine.url_wacker_neuson.startsWith("http")) {
    // Convertir en URL française
    return machine.url_wacker_neuson
      .replace("/us/", "/fr/")
      .replace("/en/", "/fr/")
      .replace("/de/", "/fr/");
  }
  const category = CATEGORY_URL_MAP[machine.categorie] ?? "products";
  const slug = machine.modele.toLowerCase().replace(/\s+/g, "-");
  return `https://www.wackerneuson.com/fr/${category}/${slug}`;
}

// ── Téléchargement d'image ────────────────────────────────────────────────────

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(filepath);

    const request = protocol.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://www.wackerneuson.com/",
        "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlink(filepath, () => {});
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(filepath, () => {});
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on("finish", () => { file.close(); resolve(filepath); });
    });

    request.on("error", (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });

    request.setTimeout(30000, () => {
      request.destroy();
      fs.unlink(filepath, () => {});
      reject(new Error("Timeout"));
    });
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Extraction des URLs d'images depuis la page ───────────────────────────────

async function extractImageUrls(page, machine) {
  // Stratégie 1 : balises picture/source et img avec srcset
  const urls = await page.evaluate(() => {
    const results = new Set();

    // Balises img
    document.querySelectorAll("img").forEach((img) => {
      const src = img.src || img.dataset.src || img.dataset.lazySrc || "";
      const srcset = img.srcset || img.dataset.srcset || "";
      if (src && !src.includes("placeholder") && !src.includes("logo") && !src.includes("icon")) {
        results.add(src);
      }
      if (srcset) {
        // Prendre la plus haute résolution du srcset
        srcset.split(",").forEach((s) => {
          const url = s.trim().split(" ")[0];
          if (url && !url.includes("placeholder") && !url.includes("logo")) {
            results.add(url);
          }
        });
      }
    });

    // Balises source (picture)
    document.querySelectorAll("source").forEach((source) => {
      const srcset = source.srcset || "";
      if (srcset) {
        srcset.split(",").forEach((s) => {
          const url = s.trim().split(" ")[0];
          if (url) results.add(url);
        });
      }
    });

    // JSON-LD structured data
    document.querySelectorAll("script[type='application/ld+json']").forEach((script) => {
      try {
        const data = JSON.parse(script.textContent);
        const findImages = (obj) => {
          if (!obj || typeof obj !== "object") return;
          if (obj.image) {
            if (typeof obj.image === "string") results.add(obj.image);
            if (Array.isArray(obj.image)) obj.image.forEach((i) => typeof i === "string" && results.add(i));
          }
          Object.values(obj).forEach(findImages);
        };
        findImages(data);
      } catch (e) {}
    });

    return [...results].filter((url) => {
      return url.startsWith("http") &&
        (url.includes(".jpg") || url.includes(".jpeg") || url.includes(".png") || url.includes(".webp")) &&
        !url.includes("thumbnail") &&
        !url.includes("favicon");
    });
  });

  // Filtrer : garder uniquement les images liées au produit
  const modelLower = machine.modele.toLowerCase();
  const nomLower = machine.nom_complet.toLowerCase();

  const filtered = urls.filter((url) => {
    const urlLower = url.toLowerCase();
    return (
      urlLower.includes(modelLower) ||
      urlLower.includes(machine.modele.toLowerCase().replace(/\s+/g, "-")) ||
      urlLower.includes(machine.slug.toLowerCase()) ||
      urlLower.includes("product") ||
      urlLower.includes("machine") ||
      urlLower.includes("equipment")
    );
  });

  // Si aucun match précis, retourner toutes les images trouvées
  return filtered.length > 0 ? filtered : urls;
}

// ── Sélectionner la meilleure URL haute résolution ─────────────────────────────

function pickBestResolution(urls) {
  // Trier par "score" de résolution (plus la valeur numérique est grande, mieux c'est)
  const scored = urls.map((url) => {
    let score = 0;
    const match = url.match(/(\d{3,4})x(\d{3,4})/);
    if (match) score = parseInt(match[1]) * parseInt(match[2]);
    if (url.includes("original") || url.includes("full") || url.includes("hires")) score += 10000000;
    if (url.includes("large") || url.includes("lg")) score += 5000000;
    if (url.includes("medium") || url.includes("md")) score += 1000000;
    if (url.includes("small") || url.includes("sm") || url.includes("thumb")) score -= 1000000;
    return { url, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.url);
}

// ── Fonction principale ───────────────────────────────────────────────────────

async function main() {
  console.log("━".repeat(60));
  console.log("  Wacker Neuson Image Scraper — Haute Qualité");
  console.log("━".repeat(60) + "\n");

  // Charger le catalogue
  const catalogue = JSON.parse(fs.readFileSync(CATALOGUE_PATH, "utf8"));
  const machines = catalogue.machines;
  console.log(`📦 ${machines.length} machines à traiter\n`);

  // Stats
  let downloaded = 0;
  let errors = 0;
  let skipped = 0;
  const errorLog = [];

  // Lancer Puppeteer
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--lang=fr-FR,fr"],
    defaultViewport: { width: 1920, height: 1080 },
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );
  await page.setExtraHTTPHeaders({
    "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
  });

  for (let i = 0; i < machines.length; i++) {
    const machine = machines[i];
    const num = `[${i + 1}/${machines.length}]`;
    const catSlug = getCategorySlug(machine);
    const machineDir = path.join(OUTPUT_DIR, catSlug, machine.slug);

    console.log(`\n${num} 📦 ${machine.nom_complet}`);
    console.log(`       Catégorie : ${machine.categorie} → ${catSlug}`);

    // Créer le dossier
    fs.mkdirSync(machineDir, { recursive: true });

    // Vérifier si déjà téléchargé
    const heroPath = path.join(machineDir, "hero.jpg");
    if (fs.existsSync(heroPath)) {
      console.log(`       ✅ Déjà téléchargé — skip`);
      skipped++;
      // Reconstruire les chemins locaux si nécessaire
      if (!machine.medias.image_principale_local) {
        const files = fs.readdirSync(machineDir).filter((f) => f.endsWith(".jpg"));
        machine.medias.image_principale_local = `/images/machines/${catSlug}/${machine.slug}/hero.jpg`;
        machine.medias.images_local = files
          .filter((f) => f.startsWith("gallery-"))
          .map((f) => `/images/machines/${catSlug}/${machine.slug}/${f}`);
      }
      continue;
    }

    // Naviguer vers la page produit
    const productUrl = getProductPageUrl(machine);
    console.log(`       URL : ${productUrl}`);

    try {
      await page.goto(productUrl, { waitUntil: "networkidle2", timeout: 30000 });
      await sleep(1500); // Laisser le JS finir de charger

      // Extraire les images
      let imageUrls = await extractImageUrls(page, machine);
      console.log(`       🔍 ${imageUrls.length} image(s) trouvée(s)`);

      if (imageUrls.length === 0) {
        // Essayer une URL alternative (version anglaise)
        const altUrl = machine.url_wacker_neuson;
        console.log(`       ⚠️  Aucune image — essai avec : ${altUrl}`);
        await page.goto(altUrl, { waitUntil: "networkidle2", timeout: 30000 });
        await sleep(1500);
        imageUrls = await extractImageUrls(page, machine);
        console.log(`       🔍 ${imageUrls.length} image(s) sur URL alternative`);
      }

      if (imageUrls.length === 0) {
        console.log(`       ⚠️  Aucune image trouvée — machine skippée`);
        skipped++;
        errorLog.push({ machine: machine.nom_complet, error: "Aucune image trouvée", url: productUrl });
        continue;
      }

      // Trier par résolution (meilleure en premier)
      const sortedUrls = pickBestResolution(imageUrls);

      // Limiter à 6 images max par machine
      const toDownload = sortedUrls.slice(0, 6);
      machine.medias.images_local = [];

      for (let imgIdx = 0; imgIdx < toDownload.length; imgIdx++) {
        const imgUrl = toDownload[imgIdx];
        const isHero = imgIdx === 0;
        const ext = imgUrl.match(/\.(jpg|jpeg|png|webp)/i)?.[1]?.toLowerCase() ?? "jpg";
        const filename = isHero ? `hero.${ext}` : `gallery-${imgIdx}.${ext}`;
        const filepath = path.join(machineDir, filename);
        const localPath = `/images/machines/${catSlug}/${machine.slug}/${filename}`;

        process.stdout.write(`       📥 ${filename}... `);

        try {
          await downloadImage(imgUrl, filepath);
          const stats = fs.statSync(filepath);
          const sizekB = Math.round(stats.size / 1024);
          console.log(`✅ (${sizekB} kB)`);

          if (isHero) {
            machine.medias.image_principale_local = localPath;
          }
          machine.medias.images_local.push(localPath);
          downloaded++;
        } catch (err) {
          console.log(`❌ ${err.message}`);
          errors++;
          errorLog.push({ machine: machine.nom_complet, file: filename, error: err.message, url: imgUrl });
        }

        await sleep(DELAY_BETWEEN_IMAGES);
      }
    } catch (err) {
      console.log(`       ❌ Erreur navigation : ${err.message}`);
      errors++;
      errorLog.push({ machine: machine.nom_complet, error: err.message, url: productUrl });
    }

    await sleep(DELAY_BETWEEN_PAGES);
  }

  await browser.close();

  // Sauvegarder le catalogue mis à jour
  console.log("\n\n💾 Mise à jour de lib/catalogue_wacker_neuson.json...");
  fs.writeFileSync(CATALOGUE_PATH, JSON.stringify(catalogue, null, 2), "utf8");

  // Copier le JSON dans amc-website/lib/ aussi
  const destJson = path.join(__dirname, "../amc-website/lib/catalogue_wacker_neuson.json");
  if (fs.existsSync(destJson)) {
    fs.writeFileSync(destJson, JSON.stringify(catalogue, null, 2), "utf8");
    console.log("💾 Copie dans amc-website/lib/catalogue_wacker_neuson.json");
  }

  // Rapport final
  console.log("\n" + "━".repeat(60));
  console.log("  RAPPORT FINAL");
  console.log("━".repeat(60));
  console.log(`  ✅ Images téléchargées : ${downloaded}`);
  console.log(`  ⏭️  Machines déjà traitées : ${skipped}`);
  console.log(`  ❌ Erreurs : ${errors}`);

  if (errorLog.length > 0) {
    const logPath = path.join(__dirname, "scrape-errors.json");
    fs.writeFileSync(logPath, JSON.stringify(errorLog, null, 2));
    console.log(`\n  📋 Log des erreurs : scripts/scrape-errors.json`);
  }

  console.log("\n  Prochaine étape :");
  console.log("  → node scripts/update-catalogue-image-paths.js");
  console.log("━".repeat(60) + "\n");
}

main().catch((err) => {
  console.error("\n❌ Erreur fatale :", err.message);
  process.exit(1);
});
