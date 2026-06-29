import type { Metadata } from "next";
import Link from "next/link";
import { PhoneLink } from "@/components/ui/PhoneLink";

export const metadata: Metadata = {
  title: { absolute: "Conditions Générales de Vente | AMC" },
  description: "Conditions générales de vente AMC pour la vente de matériels de chantier neufs et occasion en Rhône-Alpes.",
  robots: { index: false },
  openGraph: {
    title: "CGV | AMC — Alpes Matériel Compact",
    description: "Conditions générales de vente AMC pour la vente de matériels de chantier neufs et occasion en Rhône-Alpes.",
    type: "website",
    url: `https://www.amc-savoie.fr/cgv`,
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

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-amc-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-amc py-4">
          <nav className="text-sm text-amc-text-secondary">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-amc-yellow-dark transition-colors">Accueil</Link></li>
              <li aria-hidden>/</li>
              <li className="font-medium text-amc-text">Conditions Générales de Vente</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-amc py-12 max-w-4xl">
        <h1 className="text-3xl font-black text-amc-text mb-2">Conditions Générales de Vente</h1>
        <p className="text-sm text-amc-text-secondary mb-8">Dernière mise à jour : juin 2025</p>

        <div className="space-y-6">

          <Section title="Article 1 — Objet et champ d'application">
            <p>
              Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent l&apos;ensemble
              des relations commerciales entre la société <strong>AMC — Alpes Matériel Compact</strong>,
              dont le siège social est situé ZAC D&apos;Orsan, 330 Rue du Mont Blanc, 74540 Saint-Félix
              (ci-après « AMC »), et tout client professionnel ou particulier (ci-après « le Client »)
              souhaitant acquérir des matériels de chantier, équipements compacts ou accessoires
              distribués par AMC.
            </p>
            <p>
              AMC est distributeur officiel des marques <strong>WACKER NEUSON</strong>,{" "}
              <strong>Magni</strong> et <strong>Promove Demolition</strong>. Les présentes CGV
              s&apos;appliquent à toutes les ventes conclues entre AMC et ses clients, à l&apos;exclusion
              de tout autre document, sauf accord écrit contraire signé par les deux parties.
            </p>
            <p>
              Toute commande passée auprès d&apos;AMC implique l&apos;acceptation pleine et entière des
              présentes CGV. AMC se réserve le droit de les modifier à tout moment ; les CGV
              applicables sont celles en vigueur à la date de la commande.
            </p>
          </Section>

          <Section title="Article 2 — Acceptation des conditions générales de vente">
            <p>
              Le Client reconnaît avoir pris connaissance des présentes CGV préalablement à tout
              acte d&apos;achat. L&apos;acceptation est matérialisée par la signature du bon de commande
              ou du devis émis par AMC, ou par tout acte équivalant à une acceptation formelle et
              non équivoque.
            </p>
            <p>
              Pour les commandes passées par voie électronique ou téléphonique, la confirmation
              écrite de la commande par le Client vaut acceptation des présentes CGV.
            </p>
          </Section>

          <Section title="Article 3 — Prix et devis">
            <p>
              Les prix des matériels commercialisés par AMC sont établis <strong>sur devis</strong>,
              en fonction des caractéristiques techniques du matériel, des options demandées, des
              conditions de livraison et des éventuels frais annexes. Les devis sont valables{" "}
              <strong>30 jours</strong> à compter de leur date d&apos;émission, sauf mention contraire.
            </p>
            <p>
              Tous les prix sont exprimés en euros, <strong>hors taxes (HT)</strong>. La TVA
              applicable est celle en vigueur au jour de la facturation. AMC se réserve le droit
              de modifier ses tarifs à tout moment sans préavis, sous réserve que les prix
              applicables à une commande confirmée soient ceux figurant sur le devis accepté.
            </p>
            <p>
              Des frais de livraison, de mise en service ou de transport peuvent s&apos;ajouter au
              prix du matériel ; ils sont expressément indiqués dans le devis. Pour les livraisons
              hors de la zone <strong>Rhône-Alpes</strong>, un devis spécifique sera établi au cas
              par cas.
            </p>
          </Section>

          <Section title="Article 4 — Commandes et confirmation">
            <p>
              Toute commande est formalisée par un <strong>bon de commande signé</strong> par le
              Client ou par l&apos;acceptation écrite du devis établi par AMC. Aucune commande verbale
              ne sera prise en compte. La commande ne devient ferme et définitive qu&apos;après
              confirmation écrite d&apos;AMC et encaissement de l&apos;acompte éventuellement stipulé.
            </p>
            <p>
              AMC se réserve le droit de refuser toute commande qui lui paraîtrait anormale,
              incomplète ou pour laquelle elle ne disposerait pas des stocks suffisants.
            </p>
            <p>
              En cas d&apos;annulation de commande par le Client après confirmation, les acomptes
              versés demeurent acquis à AMC à titre d&apos;indemnité forfaitaire, sauf accord contraire
              et écrit. AMC peut, à sa discrétion, accepter une annulation contre remboursement
              partiel ou total selon l&apos;avancement de la commande.
            </p>
            <h3 className="font-semibold text-amc-text mt-4 mb-1">Modalités de paiement</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Acompte de <strong>30 %</strong> à la confirmation de commande</li>
              <li>Solde exigible à la livraison ou à l&apos;enlèvement du matériel</li>
            </ul>
            <p>
              Le paiement peut s&apos;effectuer par virement bancaire, chèque de banque ou en espèces
              dans les limites légales en vigueur. Des solutions de financement peuvent être
              proposées en partenariat avec des organismes financiers agréés — contactez AMC pour
              plus d&apos;informations. Tout retard de paiement entraîne l&apos;application d&apos;intérêts de
              retard au taux légal en vigueur, ainsi qu&apos;une indemnité forfaitaire de recouvrement
              de 40 € conformément à l&apos;article L. 441-10 du Code de commerce.
            </p>
          </Section>

          <Section title="Article 5 — Livraison">
            <p>
              AMC assure la livraison et la mise en service des matériels principalement dans la
              zone <strong>Rhône-Alpes</strong> et les départements limitrophes. Pour toute
              livraison en dehors de cette zone, AMC étudiera la faisabilité et les conditions
              tarifaires au cas par cas.
            </p>
            <p>
              Les délais de livraison communiqués lors de la commande sont donnés à titre
              indicatif. Ils peuvent varier selon la disponibilité des matériels, les délais
              d&apos;approvisionnement auprès des constructeurs et les contraintes logistiques.
              Aucun dépassement de délai ne pourra donner lieu à des pénalités, indemnités ou
              annulation de commande, sauf carence manifeste et exclusive d&apos;AMC.
            </p>
            <p>
              Le transfert des risques s&apos;opère lors de la remise du matériel au Client ou à son
              transporteur mandaté. Il appartient au Client de vérifier l&apos;état et la conformité
              du matériel à la livraison et d&apos;émettre immédiatement toutes réserves utiles par
              écrit sur le bon de livraison en cas de dommages apparents ou de manquant.
            </p>
            <p>
              AMC conserve la <strong>réserve de propriété</strong> sur les matériels vendus
              jusqu&apos;au paiement intégral du prix en principal et accessoires. Le Client est
              responsable de la conservation et de l&apos;entretien des biens livrés jusqu&apos;au
              transfert effectif de la propriété.
            </p>
          </Section>

          <Section title="Article 6 — Garanties constructeur">
            <p>
              Les matériels vendus par AMC bénéficient des garanties contractuelles accordées
              par les constructeurs partenaires :
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>WACKER NEUSON</strong> — garantie constructeur selon conditions en vigueur</li>
              <li><strong>Magni</strong> — garantie constructeur selon conditions en vigueur</li>
              <li><strong>Promove Demolition</strong> — garantie constructeur selon conditions en vigueur</li>
            </ul>
            <p>
              La durée et l&apos;étendue exactes de ces garanties varient selon les constructeurs et
              les gammes de produits ; elles sont précisées dans la documentation technique et
              le carnet de garantie remis à la livraison. AMC remet au Client l&apos;ensemble des
              documents constructeurs lors de la livraison du matériel.
            </p>
            <p>
              La garantie ne couvre pas les dommages résultant d&apos;une utilisation incorrecte ou
              non conforme aux préconisations constructeur, d&apos;une négligence, d&apos;un entretien
              insuffisant, d&apos;une modification non autorisée, d&apos;une usure normale ou d&apos;un accident.
            </p>
          </Section>

          <Section title="Article 7 — Service Après-Vente (SAV)">
            <p>
              AMC dispose d&apos;un atelier SAV <strong>certifié</strong> situé à{" "}
              <strong>Saint-Félix (74540)</strong>, habilité à réaliser l&apos;ensemble des
              interventions de maintenance, de réparation et de révision sur les matériels
              des marques distribuées.
            </p>
            <p>
              Les interventions SAV sont réalisées par des techniciens formés et certifiés
              directement par les constructeurs, avec des <strong>pièces détachées d&apos;origine</strong>.
              La certification SAV garantit des interventions conformes aux préconisations
              constructeur, preservant ainsi les garanties applicables.
            </p>
            <p>
              Les conditions tarifaires des prestations SAV (main d&apos;œuvre, déplacement,
              pièces) sont communiquées sur devis préalable. Les devis SAV sont gratuits
              pour les matériels achetés chez AMC.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mt-2">
              <p className="font-medium text-amc-text mb-1">Contact SAV</p>
              <p>
                Téléphone :{" "}
                <PhoneLink className="text-amc-yellow-dark hover:underline">04 26 78 43 90</PhoneLink>
              </p>
              <p>
                Email :{" "}
                <a href="mailto:contact@amc-savoie.fr" className="text-amc-yellow-dark hover:underline">contact@amc-savoie.fr</a>
              </p>
              <p>ZAC D&apos;Orsan, 330 Rue du Mont Blanc, 74540 Saint-Félix</p>
            </div>
          </Section>

          <Section title="Article 8 — Droit applicable et juridiction compétente">
            <p>
              Les présentes CGV et l&apos;ensemble des relations contractuelles entre AMC et ses
              clients sont soumis au <strong>droit français</strong>.
            </p>
            <p>
              En cas de litige relatif à l&apos;interprétation, à l&apos;exécution ou à la résiliation
              d&apos;un contrat de vente, les parties s&apos;engagent à rechercher une solution amiable
              avant tout recours judiciaire. À défaut d&apos;accord amiable dans un délai de
              30 jours, le litige sera soumis à la compétence exclusive du{" "}
              <strong>Tribunal de Commerce d&apos;Annecy (Haute-Savoie)</strong>, même en cas de
              pluralité de défendeurs, d&apos;appel en garantie ou de référé.
            </p>
            <p>
              Pour les litiges avec des consommateurs non professionnels, les règles de
              compétence territoriale du Code de la consommation s&apos;appliquent.
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
