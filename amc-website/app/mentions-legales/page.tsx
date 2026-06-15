import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Mentions légales | AMC — Alpes Matériel Compact" },
  description: "Mentions légales du site AMC — Alpes Matériel Compact, ZAC D'Orsan, Saint-Félix 74.",
  robots: { index: false },
  openGraph: {
    title: "Mentions légales | AMC",
    description: "Mentions légales du site AMC — Alpes Matériel Compact, ZAC D'Orsan, Saint-Félix 74.",
    type: "website",
    url: `https://www.amc-savoie.fr/mentions-legales`,
    siteName: "AMC — Alpes Matériel Compact",
  },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl shadow-card p-8">
      <h2 className="text-xl font-bold text-amc-text mb-4 pb-3 border-b border-gray-100">{title}</h2>
      <div className="text-sm text-amc-text leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-amc-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-amc py-4">
          <nav className="text-sm text-amc-text-secondary">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-amc-yellow-dark transition-colors">Accueil</Link></li>
              <li aria-hidden>/</li>
              <li className="font-medium text-amc-text">Mentions légales</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-amc py-12 max-w-4xl">
        <h1 className="text-3xl font-black text-amc-text mb-2">Mentions légales</h1>
        <p className="text-sm text-amc-text-secondary mb-8">Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique (LCEN)</p>

        <div className="space-y-6">

          <Section title="1. Éditeur du site">
            <p>Le présent site internet est édité par :</p>
            <div className="bg-gray-50 rounded-xl p-4 space-y-1">
              <p><strong>AMC — Alpes Matériel Compact</strong></p>
              <p>ZAC D&apos;Orsan, 330 Rue du Mont Blanc<br />74540 Saint-Félix — Haute-Savoie, France</p>
              <p>
                Téléphone :{" "}
                <a href="tel:+33426784390" className="text-amc-yellow-dark hover:underline">04 26 78 43 90</a>
              </p>
              <p>
                Email :{" "}
                <a href="mailto:contact@amc-savoie.fr" className="text-amc-yellow-dark hover:underline">contact@amc-savoie.fr</a>
              </p>
              <p className="pt-1">
                <strong>SIRET :</strong>{" "}
                <span className="inline-block bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs font-mono px-2 py-0.5 rounded">
                  [SIRET_À_COMPLÉTER]
                </span>
              </p>
            </div>
          </Section>

          <Section title="2. Directeur de la publication">
            <p>
              Le directeur de la publication du site <strong>amc-savoie.fr</strong> est le représentant légal
              de la société AMC — Alpes Matériel Compact.
            </p>
            <p>
              Pour toute question relative au contenu du site, vous pouvez contacter la direction à l&apos;adresse
              suivante :{" "}
              <a href="mailto:contact@amc-savoie.fr" className="text-amc-yellow-dark hover:underline">
                contact@amc-savoie.fr
              </a>
            </p>
          </Section>

          <Section title="3. Hébergement">
            <p>Ce site est hébergé par :</p>
            <div className="bg-gray-50 rounded-xl p-4 space-y-1">
              <p><strong>Vercel Inc.</strong></p>
              <p>440 N Barranca Ave #4133<br />Covina, CA 91723 — États-Unis</p>
              <p>
                Site web :{" "}
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-amc-yellow-dark hover:underline">
                  vercel.com
                </a>
              </p>
            </div>
            <p>
              Les données sont transmises de manière sécurisée via le protocole HTTPS. Le transfert
              de données vers les serveurs de Vercel (États-Unis) est encadré par des garanties
              contractuelles conformes au RGPD (clauses contractuelles types approuvées par la
              Commission européenne).
            </p>
          </Section>

          <Section title="4. Propriété intellectuelle">
            <p>
              L&apos;ensemble du contenu publié sur ce site — textes, photographies, illustrations, logos,
              vidéos, graphismes, icônes — est la propriété exclusive d&apos;<strong>AMC — Alpes Matériel Compact</strong> ou
              fait l&apos;objet d&apos;une autorisation d&apos;utilisation de la part de leurs propriétaires respectifs
              (constructeurs partenaires : Wacker Neuson, Magni, Promove Demolition).
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation ou exploitation
              de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé,
              est strictement interdite sans autorisation écrite préalable d&apos;AMC — Alpes Matériel Compact.
            </p>
            <p>
              Toute exploitation non autorisée du site ou de l&apos;un quelconque des éléments qu&apos;il contient
              sera considérée comme constitutive d&apos;une contrefaçon et poursuivie conformément aux
              dispositions des articles L.335-2 et suivants du Code de la Propriété Intellectuelle.
            </p>
          </Section>

          <Section title="5. Liens hypertextes">
            <h3 className="font-semibold text-amc-text mt-2 mb-1">Liens sortants</h3>
            <p>
              Le site peut contenir des liens vers des sites tiers (constructeurs partenaires, organismes
              officiels). AMC — Alpes Matériel Compact n&apos;exerce aucun contrôle sur ces sites et décline
              toute responsabilité quant à leur contenu ou à leurs pratiques.
            </p>
            <h3 className="font-semibold text-amc-text mt-4 mb-1">Liens entrants</h3>
            <p>
              Tout site souhaitant créer un lien hypertexte vers le présent site doit en demander
              l&apos;autorisation préalable par email à{" "}
              <a href="mailto:contact@amc-savoie.fr" className="text-amc-yellow-dark hover:underline">
                contact@amc-savoie.fr
              </a>.
            </p>
          </Section>

          <Section title="6. Limitation de responsabilité">
            <p>
              AMC — Alpes Matériel Compact s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des
              informations diffusées sur ce site. Toutefois, AMC ne peut garantir l&apos;exactitude, la
              complétude ou l&apos;actualité des informations et décline toute responsabilité pour :
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>les inexactitudes ou omissions portant sur les informations disponibles sur le site ;</li>
              <li>les dommages résultant d&apos;une intrusion frauduleuse d&apos;un tiers ;</li>
              <li>les interruptions temporaires ou indisponibilités du site pour cause de maintenance ;</li>
              <li>l&apos;utilisation d&apos;informations provenant de sites tiers liés à ce site.</li>
            </ul>
            <p>
              Les prix et caractéristiques des matériels présentés sur ce site sont donnés à titre
              indicatif et peuvent être modifiés sans préavis. Seuls les devis établis par AMC ont
              valeur contractuelle.
            </p>
          </Section>

          <Section title="7. Droit applicable et juridiction compétente">
            <p>
              Le présent site et les présentes mentions légales sont soumis au <strong>droit français</strong>.
              En cas de litige relatif à l&apos;utilisation de ce site, les tribunaux français seront seuls compétents.
            </p>
            <p>
              Pour toute réclamation relative au contenu du site, vous pouvez contacter AMC à l&apos;adresse :{" "}
              <a href="mailto:contact@amc-savoie.fr" className="text-amc-yellow-dark hover:underline">
                contact@amc-savoie.fr
              </a>
            </p>
          </Section>

          <Section title="8. Données personnelles et cookies">
            <p>
              Le traitement des données personnelles collectées sur ce site est décrit dans notre{" "}
              <Link href="/politique-confidentialite" className="text-amc-yellow-dark hover:underline font-medium">
                Politique de confidentialité
              </Link>.
            </p>
            <p>
              Pour toute demande relative à vos données personnelles (accès, rectification, suppression),
              contactez-nous à{" "}
              <a href="mailto:contact@amc-savoie.fr" className="text-amc-yellow-dark hover:underline">
                contact@amc-savoie.fr
              </a>.
            </p>
          </Section>

        </div>

        <p className="text-xs text-amc-text-secondary mt-10 text-right">
          Dernière mise à jour : juin 2025
        </p>
      </div>
    </div>
  );
}
