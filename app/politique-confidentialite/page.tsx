import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité | AMC — Alpes Matériel Compact",
  robots: { index: false },
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
      <div className="bg-white border-b border-gray-100">
        <div className="container-amc py-4">
          <nav className="text-sm text-amc-text-secondary">
            <ol className="flex items-center gap-2">
              <li><a href="/" className="hover:text-amc-yellow-dark transition-colors">Accueil</a></li>
              <li aria-hidden>/</li>
              <li className="font-medium text-amc-text">Politique de confidentialité</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-amc py-12 max-w-4xl">
        <h1 className="text-3xl font-black text-amc-text mb-2">Politique de confidentialité</h1>
        <p className="text-sm text-amc-text-secondary mb-8">Dernière mise à jour : juin 2025</p>

        <div className="space-y-6">

          <Section title="1. Responsable du traitement">
            <p>
              Le responsable du traitement des données personnelles collectées sur ce site est :
            </p>
            <div className="bg-gray-50 rounded-xl p-4 space-y-1">
              <p><strong>AMC — Alpes Matériel Compact</strong></p>
              <p>ZAC D&apos;Orsan, 330 Rue du Mont Blanc, 74540 Saint-Félix</p>
              <p>Téléphone : <a href="tel:+33426784390" className="text-amc-yellow-dark hover:underline">04 26 78 43 90</a></p>
              <p>Email : <a href="mailto:contact@amc-savoie.fr" className="text-amc-yellow-dark hover:underline">contact@amc-savoie.fr</a></p>
            </div>
          </Section>

          <Section title="2. Données collectées">
            <p>
              Dans le cadre de l&apos;utilisation de ce site, AMC est susceptible de collecter les données
              personnelles suivantes :
            </p>
            <h3 className="font-semibold text-amc-text mt-4 mb-2">Formulaire de contact</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Nom et prénom</li>
              <li>Adresse e-mail</li>
              <li>Numéro de téléphone (optionnel)</li>
              <li>Société / raison sociale (optionnel)</li>
              <li>Objet et contenu du message</li>
            </ul>
            <h3 className="font-semibold text-amc-text mt-4 mb-2">Données de navigation</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Adresse IP</li>
              <li>Type de navigateur et version</li>
              <li>Pages consultées et durée de visite</li>
              <li>Date et heure d&apos;accès</li>
            </ul>
            <p>
              Aucune donnée sensible (au sens de l&apos;article 9 du RGPD) n&apos;est collectée sur ce site.
            </p>
          </Section>

          <Section title="3. Finalités du traitement">
            <p>Les données collectées sont traitées aux fins suivantes :</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse mt-2">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border border-gray-200 font-semibold">Finalité</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold">Base légale</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-gray-200">Répondre aux demandes de contact et de devis</td>
                    <td className="p-3 border border-gray-200">Intérêt légitime / exécution d&apos;un contrat</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 border border-gray-200">Gestion de la relation commerciale</td>
                    <td className="p-3 border border-gray-200">Exécution d&apos;un contrat</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-gray-200">Amélioration du site et de l&apos;expérience utilisateur</td>
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

          <Section title="4. Durée de conservation">
            <p>AMC conserve vos données personnelles pour les durées suivantes :</p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
              <li>
                <strong>Données de contact et messages :</strong> 3 ans à compter du dernier contact,
                sauf poursuite de la relation commerciale
              </li>
              <li>
                <strong>Données liées à un contrat :</strong> 10 ans à compter de la fin du contrat,
                conformément aux obligations comptables
              </li>
              <li>
                <strong>Données de navigation / logs :</strong> 12 mois maximum
              </li>
            </ul>
            <p>
              À l&apos;expiration de ces délais, les données sont supprimées ou anonymisées de manière
              irréversible.
            </p>
          </Section>

          <Section title="5. Destinataires des données">
            <p>
              Les données collectées sont destinées exclusivement aux équipes internes d&apos;AMC
              (commerciaux, SAV, direction). Elles ne sont jamais vendues à des tiers.
            </p>
            <p>
              AMC peut être amenée à partager certaines données avec des prestataires techniques
              (hébergeur Vercel, outils de messagerie) dans le cadre strict de leur mission et sous
              contrat de traitement de données conforme au RGPD. Ces sous-traitants n&apos;ont pas
              le droit d&apos;utiliser vos données à d&apos;autres fins.
            </p>
            <p>
              En cas d&apos;obligation légale, AMC peut être tenue de communiquer des données aux
              autorités compétentes.
            </p>
          </Section>

          <Section title="6. Vos droits">
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679)
              et à la loi Informatique et Libertés modifiée, vous disposez des droits suivants :
            </p>
            <ul className="space-y-2 mt-2">
              <li className="flex gap-3">
                <span className="font-semibold text-amc-text min-w-[120px]">Droit d&apos;accès</span>
                <span>Obtenir une copie des données vous concernant détenues par AMC</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-amc-text min-w-[120px]">Rectification</span>
                <span>Faire corriger toute donnée inexacte ou incomplète</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-amc-text min-w-[120px]">Suppression</span>
                <span>Demander l&apos;effacement de vos données (droit à l&apos;oubli), sous réserve des obligations légales</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-amc-text min-w-[120px]">Opposition</span>
                <span>Vous opposer au traitement de vos données pour des raisons tenant à votre situation particulière</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-amc-text min-w-[120px]">Limitation</span>
                <span>Demander la suspension temporaire du traitement de vos données</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-amc-text min-w-[120px]">Portabilité</span>
                <span>Recevoir vos données dans un format structuré et lisible par machine</span>
              </li>
            </ul>
            <p className="mt-4">
              Pour exercer l&apos;un de ces droits, adressez votre demande par e-mail à{" "}
              <a href="mailto:contact@amc-savoie.fr" className="text-amc-yellow-dark hover:underline">
                contact@amc-savoie.fr
              </a>{" "}
              en précisant votre identité. AMC s&apos;engage à y répondre dans un délai d&apos;un mois à
              compter de la réception de votre demande.
            </p>
            <p>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une
              réclamation auprès de la <strong>CNIL</strong> (Commission Nationale de l&apos;Informatique
              et des Libertés) — <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-amc-yellow-dark hover:underline">www.cnil.fr</a>.
            </p>
          </Section>

          <Section title="7. Cookies">
            <p>
              Un cookie est un petit fichier texte déposé sur votre terminal lors de la visite d&apos;un
              site internet.
            </p>
            <h3 className="font-semibold text-amc-text mt-4 mb-2">Cookies utilisés sur ce site</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse mt-2">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border border-gray-200 font-semibold">Type</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold">Finalité</th>
                    <th className="text-left p-3 border border-gray-200 font-semibold">Durée</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-gray-200">Cookies techniques</td>
                    <td className="p-3 border border-gray-200">Fonctionnement du site (session, sécurité)</td>
                    <td className="p-3 border border-gray-200">Session</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3 border border-gray-200">Cookies analytiques</td>
                    <td className="p-3 border border-gray-200">Mesure d&apos;audience anonyme (si activés)</td>
                    <td className="p-3 border border-gray-200">13 mois max.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Les cookies techniques sont strictement nécessaires au fonctionnement du site et ne
              requièrent pas votre consentement. Les cookies analytiques, s&apos;ils sont utilisés,
              font l&apos;objet d&apos;une demande de consentement préalable.
            </p>
            <p>
              Vous pouvez à tout moment configurer votre navigateur pour refuser ou supprimer les
              cookies. Cette configuration peut cependant affecter certaines fonctionnalités du site.
            </p>
          </Section>

          <Section title="8. Sécurité des données">
            <p>
              AMC met en œuvre les mesures techniques et organisationnelles appropriées pour protéger
              vos données personnelles contre tout accès non autorisé, divulgation, modification ou
              destruction. Le site est hébergé sur l&apos;infrastructure sécurisée de Vercel Inc.
              avec transmission chiffrée via HTTPS.
            </p>
          </Section>

          <Section title="9. Transfert hors Union Européenne">
            <p>
              L&apos;hébergement du site est assuré par Vercel Inc. (États-Unis). Ce transfert est
              encadré par des clauses contractuelles types approuvées par la Commission européenne,
              garantissant un niveau de protection adéquat de vos données conformément au RGPD.
            </p>
          </Section>

          <Section title="10. Modifications de la politique">
            <p>
              AMC se réserve le droit de modifier la présente politique de confidentialité à tout
              moment, notamment pour se conformer à toute évolution légale, réglementaire ou
              technique. La version en vigueur est celle affichée sur cette page avec sa date de
              mise à jour.
            </p>
          </Section>

          <Section title="11. Contact">
            <p>
              Pour toute question relative à la présente politique ou à la protection de vos données
              personnelles, contactez-nous :
            </p>
            <div className="bg-gray-50 rounded-xl p-4 space-y-1 mt-2">
              <p><strong>AMC — Alpes Matériel Compact</strong></p>
              <p>ZAC D&apos;Orsan, 330 Rue du Mont Blanc, 74540 Saint-Félix</p>
              <p>
                Email :{" "}
                <a href="mailto:contact@amc-savoie.fr" className="text-amc-yellow-dark hover:underline">
                  contact@amc-savoie.fr
                </a>
              </p>
              <p>
                Téléphone :{" "}
                <a href="tel:+33426784390" className="text-amc-yellow-dark hover:underline">
                  04 26 78 43 90
                </a>
              </p>
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
}
