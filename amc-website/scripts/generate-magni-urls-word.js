'use strict';

const fs = require('fs');
const path = require('path');
const {
  Document, Paragraph, TextRun, HeadingLevel, ExternalHyperlink, Packer,
} = require('docx');

const catalogue = require('../lib/catalogue_magni.json');

async function generateMagniUrlsDocument() {
  console.log('📄 Génération du document Word Magni...\n');

  // Group by category
  const parCategorie = {};
  for (const machine of catalogue.machines) {
    const cat = machine.categorie || 'Sans catégorie';
    if (!parCategorie[cat]) parCategorie[cat] = [];
    parCategorie[cat].push(machine);
  }

  const children = [
    new Paragraph({
      text: 'URLS DES MACHINES MAGNI',
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 200 },
    }),
    new Paragraph({
      text: 'Cliquez sur chaque lien pour accéder à la page et télécharger les images.',
      spacing: { after: 400 },
    }),
  ];

  for (const [categorie, machines] of Object.entries(parCategorie)) {
    children.push(
      new Paragraph({
        text: categorie.toUpperCase(),
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 },
      })
    );

    for (const machine of machines) {
      // Machine name in bold
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${machine.marque} ${machine.modele}`,
              bold: true,
            }),
          ],
          spacing: { before: 100, after: 50 },
        })
      );

      // Clickable URL
      const url = machine.url_wacker_neuson;
      if (url) {
        children.push(
          new Paragraph({
            children: [
              new ExternalHyperlink({
                children: [
                  new TextRun({
                    text: url,
                    color: '0563C1',
                    underline: {},
                    style: 'Hyperlink',
                  }),
                ],
                link: url,
              }),
            ],
            spacing: { after: 200 },
          })
        );
      } else {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: "Pas d'URL disponible", italics: true, color: 'FF0000' })],
            spacing: { after: 200 },
          })
        );
      }
    }
  }

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(__dirname, '..', 'Downloads', 'URLs_Magni.docx');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, buffer);

  console.log('✅ Document Magni généré avec succès !');
  console.log(`📁 ${outputPath}`);
  console.log(`📊 ${catalogue.machines.length} machines dans ${Object.keys(parCategorie).length} catégories`);
  for (const [cat, list] of Object.entries(parCategorie)) {
    console.log(`   • ${cat}: ${list.length} machine${list.length > 1 ? 's' : ''}`);
  }
}

generateMagniUrlsDocument().catch(console.error);
