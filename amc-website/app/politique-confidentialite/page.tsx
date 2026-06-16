import type { Metadata } from "next";
import Link from "next/link";
import { PhoneLink } from "@/components/ui/PhoneLink";

export const metadata: Metadata = {
  title: { absolute: "Politique de confidentialité | AMC" },
  description: "Politique de confidentialité et protection des données personnelles du site AMC — Alpes Matériel Compact.",
  robots: { index: false },
  openGraph: {
    title: "Politique de confidentialité | AMC",
    description: "Politique de confidentialité et protection des données personnelles du site AMC — Alpes Matériel Compact.",
    type: "website",
    url: `https://www.amc-savoie.fr/politique-confidentialite`,
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

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-amc-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-amc py-4">
          <nav className="text-sm text-amc-text-secondary">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-amc-yellow-dark transition-colors">Accueil</Link></li>
              <li aria-hidden>/</li>
              <li className="font-medium text-amc-text">Politique de confidentialité</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-amc py-12 max-w-4xl">
        <h1 className="text-3xl font-black text-amc-text mb-2">Politique de confidentialité</h1>
        <p className="text-sm text-amc-text-secondary mb-8">Dernière mise à jour : juin 2025 — Conforme au Règlement (UE) 2016/679 (RGPD)</p>

        <div className="space-y-6">

          <Section title="1. Responsable du traitement">
            <p>Le responsable du traitement des données personnelles collectées sur ce site est :</p>
            <div className="bg-gray-50 rounded-xl p-4 space-y-1">
              <p><strong>AMC — Alpes Matériel Compact</strong></p>
              <p>ZAC D&apos;Orsan, 330 Rue du Mont Blanc<br />74540 Saint-Félix — Haute-Savoie, France</p>
              <p>
                Téléphone :{" "}
                <PhoneLink className="text-amc-yellow-dark hover:underline">04 26 78 43 90</PhoneLink>
              </p>
              <p>
                Email :{" "}
                <a href="mailto:contact@amc-savoie.fr" className="text-amc-yellow-dark hover:underline">contact@amc-savoie.fr</a>
              </p>
            </div>
          </Section>

          <Section title="2. Données collectées">
            <p>
              Dans le cadre de l&apos;utilisation de ce site, AMC est susceptible de collecter les
              données personnelles suivantes :
            </p>
            <h3 className="font-semibold text-amc-text mt-3 mb-2">Via le formulaire de contact</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Nom et prénom</li>
              <li>Adresse e-mail</li>
              <li>Numéro de téléphone (optionnel)</li>
              <li>Société / raison sociale (optionnel)</li>
              <li>Objet et contenu du message</li>
            </ul>
            <h3 className="font-semibold text-amc-text mt-4 mb-2">Données de navigation (logs serveur)</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Adresse IP (anonymisée)</li>
              <li>Type et version du navigateur</li>
              <li>Pages consultées et durée de visite</li>
              <li>Date et heure d&apos;accès</li>
            </ul>
            <p className="mt-2">
              AMC ne collecte aucune donnée sensible au sens de l&apos;article 9 du RGPD
              (origine raciale, données de santé, convictions religieuses, etc.).
            </p>
          </Section>

          <Section title="3. Finalités du traitement">
            <p>Les données collectées sont utilisées exclusivement aux fins suivantes :</p>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border border-gray-200 font-semibold">Finalité</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold">Base légale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-gray-200">Répondre aux demandes de contact, de devis et d&apos;information</td>
                    <td className="p-3 border border-gray-200">Intérêt légitime / exécution d&apos;un contrat</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 border border-gray-200">Gestion de la relation commerciale et suivi client</td>
                    <td className="p-3 border border-gray-200">Exécution d&apos;un contrat</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200">Amélioration du site et analyse de la navigation</td>
                    <td className="p-3 border border-gray-200">Intérêt légitime</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 border border-gray-200">Respect des obligations légales et comptables</td>
                    <td className="p-3 border border-gray-200">Obligation légale</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="4. Base légale du traitement">
            <p>
              Le traitement de vos données personnelles repose sur les bases légales suivantes,
              conformément à l&apos;article 6 du RGPD :
            </p>
            <ul className="space-y-2 mt-2">
              <li className="flex gap-3">
                <span className="font-semibold min-w-[160px] text-amc-text">Intérêt légitime</span>
                <span>Traitement des demandes de contact et d&apos;information entrantes, amélioration du site.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold min-w-[160px] text-amc-text">Exécution d&apos;un contrat</span>
                <span>Gestion des commandes, suivi SAV, facturation.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold min-w-[160px] text-amc-text">Obligation légale</span>
                <span>Conservation des données comptables et fiscales.</span>
              </li>
            </ul>
          </Section>

          <Section title="5. Durée de conservation">
            <p>AMC conserve vos données personnelles pour les durées suivantes :</p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
              <li>
                <strong>Prospects et contacts non suivis d&apos;une commande :</strong>{" "}
                3 ans à compter du dernier contact
              </li>
              <li>
                <strong>Données liées à une relation commerciale (clients) :</strong>{" "}
                10 ans à compter de la fin de la relation, conformément aux obligations comptables
              </li>
              <li>
                <strong>Données de navigation / logs serveur :</strong>{" "}
                12 mois maximum
              </li>
            </ul>
            <p>
              À l&apos;expiration de ces délais, les données sont supprimées ou anonymisées de
              manière irréversible.
            </p>
          </Section>

          <Section title="6. Vos droits">
            <p>
              Conformément au RGPD et à la loi Informatique et Libertés modifiée, vous disposez
              des droits suivants sur vos données personnelles :
            </p>
            <ul className="space-y-2 mt-2">
              <li className="flex gap-3">
                <span className="font-semibold min-w-[140px] text-amc-text">Droit d&apos;accès</span>
                <span>Obtenir une copie de vos données personnelles détenues par AMC.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold min-w-[140px] text-amc-text">Rectification</span>
                <span>Faire corriger toute donnée inexacte ou incomplète vous concernant.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold min-w-[140px] text-amc-text">Suppression</span>
                <span>Demander l&apos;effacement de vos données (« droit à l&apos;oubli »), sous réserve des obligations légales de conservation.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold min-w-[140px] text-amc-text">Opposition</span>
                <span>Vous opposer au traitement de vos données pour motif légitime.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold min-w-[140px] text-amc-text">Limitation</span>
                <span>Demander la suspension temporaire du traitement dans les cas prévus par le RGPD.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold min-w-[140px] text-amc-text">Portabilité</span>
                <span>Recevoir vos données dans un format structuré, couramment utilisé et lisible par machine.</span>
              </li>
            </ul>
            <p className="mt-4">
              Pour exercer l&apos;un de ces droits, adressez votre demande par email à{" "}
              <a href="mailto:contact@amc-savoie.fr" className="text-amc-yellow-dark hover:underline font-medium">
                contact@amc-savoie.fr
              </a>{" "}
              en joignant une pièce d&apos;identité. AMC s&apos;engage à répondre dans un délai
              maximum d&apos;<strong>un mois</strong> à compter de la réception de votre demande.
            </p>
            <p>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire
              une réclamation auprès de la{" "}
              <strong>CNIL</strong> (Commission Nationale de l&apos;Informatique et des Libertés) :{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amc-yellow-dark hover:underline"
              >
                www.cnil.fr
              </a>
            </p>
          </Section>

          <Section title="7. Cookies">
            <p>
              Un cookie est un petit fichier texte déposé sur votre terminal lors de la visite
              d&apos;un site internet. Le site AMC utilise uniquement des <strong>cookies techniques
              strictement nécessaires</strong> au bon fonctionnement du site.
            </p>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border border-gray-200 font-semibold">Type de cookie</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold">Finalité</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold">Durée</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-gray-200">Cookies techniques</td>
                    <td className="p-3 border border-gray-200">Fonctionnement du site (session, navigation, sécurité)</td>
                    <td className="p-3 border border-gray-200">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3">
              <strong>Aucun cookie publicitaire, de suivi comportemental ou de réseaux sociaux
              n&apos;est déposé</strong> sur votre terminal. Aucun outil d&apos;analyse d&apos;audience tiers
              (Google Analytics, etc.) n&apos;est utilisé sur ce site.
            </p>
            <p>
              Les cookies techniques étant indispensables au fonctionnement du site, ils
              ne requièrent pas votre consentement. Vous pouvez néanmoins configurer votre
              navigateur pour les refuser ou les supprimer, ce qui peut affecter certaines
              fonctionnalités du site.
            </p>
          </Section>

          <Section title="8. Destinataires des données">
            <p>
              Les données collectées sont destinées exclusivement aux équipes internes d&apos;AMC
              (commercial, SAV, direction). <strong>Elles ne sont jamais vendues, louées
              ni cédées à des tiers</strong> à des fins commerciales.
            </p>
            <p>
              AMC peut être amenée à partager certaines données avec ses sous-traitants techniques
              (hébergeur Vercel Inc.) dans le strict cadre de leur mission et sous contrat de
              traitement conforme au RGPD. Ces prestataires n&apos;ont pas le droit d&apos;utiliser vos
              données à d&apos;autres fins que celles définies contractuellement.
            </p>
            <p>
              En cas d&apos;obligation légale, AMC peut être tenue de communiquer des données
              personnelles aux autorités compétentes (administration fiscale, autorités judiciaires).
            </p>
          </Section>

          <Section title="9. Sécurité des données">
            <p>
              AMC met en œuvre les mesures techniques et organisationnelles appropriées pour
              protéger vos données contre tout accès non autorisé, divulgation, altération ou
              destruction. Le site est hébergé sur l&apos;infrastructure sécurisée de{" "}
              <strong>Vercel Inc.</strong> avec transmission chiffrée via <strong>HTTPS</strong>.
            </p>
          </Section>

          <Section title="10. Modifications de la présente politique">
            <p>
              AMC se réserve le droit de modifier la présente politique de confidentialité à
              tout moment, notamment pour se conformer à des évolutions légales, réglementaires
              ou techniques. La version en vigueur est celle affichée sur cette page avec sa
              date de mise à jour.
            </p>
          </Section>

          <div className="bg-amc-yellow/10 border border-amc-yellow/30 rounded-2xl p-6">
            <h2 className="text-base font-bold text-amc-text mb-3">Contact pour vos données personnelles</h2>
            <p className="text-sm text-amc-text">
              Pour toute question relative à vos données personnelles ou pour exercer vos droits,
              contactez-nous :
            </p>
            <div className="mt-3 space-y-1 text-sm">
              <p>
                <strong>Email :</strong>{" "}
                <a href="mailto:contact@amc-savoie.fr" className="text-amc-yellow-dark hover:underline font-medium">
                  contact@amc-savoie.fr
                </a>
              </p>
              <p>
                <strong>Courrier :</strong> AMC — Alpes Matériel Compact, ZAC D&apos;Orsan,
                330 Rue du Mont Blanc, 74540 Saint-Félix
              </p>
            </div>
          </div>

        </div>

        <p className="text-xs text-amc-text-secondary mt-10 text-right">
          Dernière mise à jour : juin 2025
        </p>
      </div>
    </div>
  );
}
