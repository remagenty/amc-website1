'use strict';

const fs = require('fs');
const path = require('path');
const {
  Document, Paragraph, TextRun, HeadingLevel, ExternalHyperlink, Packer,
} = require('docx');

const catalogue = require('../lib/catalogue_promove.json');

async function generatePromoveUrlsDocument() {
  console.log('📄 Génération du document Word Promove Demolition...\n');

  // Group by category
  const parCategorie = {};
  for (const tool of catalogue.machines) {
    const cat = tool.categorie || 'Sans catégorie';
    if (!parCategorie[cat]) parCategorie[cat] = [];
    parCategorie[cat].push(tool);
  }

  const children = [
    new Paragraph({
      text: 'URLS DES OUTILS PROMOVE DEMOLITION',
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 200 },
    }),
    new Paragraph({
      text: 'Cliquez sur chaque lien pour accéder à la page et télécharger les images.',
      spacing: { after: 400 },
    }),
  ];

  for (const [categorie, tools] of Object.entries(parCategorie)) {
    children.push(
      new Paragraph({
        text: categorie.toUpperCase(),
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 200 },
      })
    );

    for (const tool of tools) {
      // Tool name in bold
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${tool.marque} ${tool.modele}`,
              bold: true,
            }),
          ],
          spacing: { before: 100, after: 50 },
        })
      );

      // Clickable URL (field is url_wacker_neuson in this JSON)
      const url = tool.url_wacker_neuson || tool.url_promove_demolition || tool.url_promove;
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
  const outputPath = path.join(__dirname, '..', 'Downloads', 'URLs_Promove.docx');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, buffer);

  console.log('✅ Document Promove généré avec succès !');
  console.log(`📁 ${outputPath}`);
  console.log(`📊 ${catalogue.machines.length} outils dans ${Object.keys(parCategorie).length} catégories`);
  for (const [cat, list] of Object.entries(parCategorie)) {
    console.log(`   • ${cat}: ${list.length} outil${list.length > 1 ? 's' : ''}`);
  }
}

generatePromoveUrlsDocument().catch(console.error);
