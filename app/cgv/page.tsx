import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | AMC — Alpes Matériel Compact",
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

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-amc-cream">
      <div className="bg-white border-b border-gray-100">
        <div className="container-amc py-4">
          <nav className="text-sm text-amc-text-secondary">
            <ol className="flex items-center gap-2">
              <li><a href="/" className="hover:text-amc-yellow-dark transition-colors">Accueil</a></li>
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
              Les présentes Conditions Générales de Vente (CGV) régissent l&apos;ensemble des relations
              commerciales entre la société <strong>AMC — Alpes Matériel Compact</strong>, dont le siège
              social est situé ZAC D&apos;Orsan, 330 Rue du Mont Blanc, 74540 Saint-Félix (ci-après
              &laquo; AMC &raquo;), et toute personne physique ou morale (ci-après &laquo; le Client &raquo;)
              souhaitant procéder à l&apos;achat de matériels de chantier, équipements compacts ou accessoires
              proposés par AMC.
            </p>
            <p>
              Toute commande passée auprès d&apos;AMC implique l&apos;acceptation pleine et entière des présentes
              CGV, à l&apos;exclusion de tout autre document.
            </p>
          </Section>

          <Section title="Article 2 — Acceptation des conditions">
            <p>
              Le Client reconnaît avoir pris connaissance des présentes CGV avant tout acte d&apos;achat.
              L&apos;acceptation des présentes CGV est matérialisée par la signature du bon de commande
              ou du devis établi par AMC, ou par tout autre acte équivalant à une acceptation formelle.
            </p>
            <p>
              AMC se réserve le droit de modifier ses CGV à tout moment. Les modifications prennent
              effet dès leur publication sur le site internet et s&apos;appliquent aux commandes passées
              postérieurement à ladite publication.
            </p>
          </Section>

          <Section title="Article 3 — Prix et devis">
            <p>
              Les prix des matériels sont communiqués sur devis, établi par AMC en fonction des
              caractéristiques techniques du matériel, des options demandées et des conditions de livraison.
              Les devis sont valables <strong>30 jours</strong> à compter de leur date d&apos;émission, sauf
              mention contraire expressément indiquée.
            </p>
            <p>
              Tous les prix sont exprimés en euros <strong>hors taxes (HT)</strong>. La TVA applicable
              est celle en vigueur au jour de la facturation. AMC se réserve le droit de modifier ses
              tarifs à tout moment, sans préavis, sous réserve que les prix applicables soient ceux
              figurant sur le devis accepté par le Client.
            </p>
            <p>
              Des frais de livraison ou de mise en service peuvent s&apos;ajouter au prix du matériel et
              seront expressément mentionnés dans le devis.
            </p>
          </Section>

          <Section title="Article 4 — Commandes et bon de commande">
            <p>
              Toute commande est formalisée par un bon de commande signé par le Client ou par
              l&apos;acceptation écrite du devis établi par AMC. Aucune commande verbale ne sera prise
              en compte. La commande ne devient ferme et définitive qu&apos;après confirmation écrite
              par AMC et encaissement de l&apos;acompte éventuellement demandé.
            </p>
            <p>
              AMC se réserve le droit de refuser toute commande qui lui paraîtrait anormale ou
              pour laquelle elle ne disposerait pas des stocks suffisants. En cas d&apos;annulation de
              commande par le Client après acceptation, les acomptes versés resteront acquis à AMC
              au titre de dédommagement, sauf accord contraire et écrit d&apos;AMC.
            </p>
          </Section>

          <Section title="Article 5 — Modalités de paiement">
            <p>
              Sauf conditions particulières négociées, les modalités de paiement sont les suivantes :
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Acompte de <strong>30 %</strong> à la commande</li>
              <li>Solde à la livraison ou avant enlèvement du matériel</li>
            </ul>
            <p>
              Le paiement peut s&apos;effectuer par virement bancaire, chèque ou en espèces dans les
              limites légales en vigueur. Des solutions de financement peuvent être proposées en
              partenariat avec des organismes financiers agréés — contactez AMC pour plus d&apos;informations.
            </p>
            <p>
              Tout retard de paiement entraîne de plein droit l&apos;application d&apos;intérêts de retard
              au taux légal en vigueur, ainsi qu&apos;une indemnité forfaitaire pour frais de recouvrement
              de 40 € conformément à l&apos;article L. 441-10 du Code de commerce.
            </p>
          </Section>

          <Section title="Article 6 — Livraison">
            <p>
              AMC assure la livraison de matériels dans la zone <strong>Rhône-Alpes</strong> et départements
              limitrophes. Pour toute livraison hors de cette zone, AMC étudiera la faisabilité et les
              conditions tarifaires au cas par cas.
            </p>
            <p>
              Les délais de livraison sont donnés à titre indicatif et ne constituent pas un engagement
              contractuel ferme, sauf accord express contraire. Tout dépassement de délai ne pourra
              donner lieu à aucune indemnité ni annulation de commande, sauf carence manifeste imputable
              à AMC. Le transfert des risques s&apos;opère lors de la remise du matériel au Client ou à
              son transporteur.
            </p>
            <p>
              Il appartient au Client de vérifier l&apos;état du matériel à la livraison et d&apos;émettre
              toutes réserves utiles sur le bon de livraison en cas de dommages apparents.
            </p>
          </Section>

          <Section title="Article 7 — Réserve de propriété">
            <p>
              AMC conserve la propriété des matériels vendus jusqu&apos;au paiement intégral du prix,
              en principal et accessoires. Le Client est responsable de la conservation et de
              l&apos;entretien des biens livrés jusqu&apos;au transfert effectif de propriété.
            </p>
          </Section>

          <Section title="Article 8 — Garanties constructeur">
            <p>
              Les matériels vendus par AMC bénéficient des garanties contractuelles accordées par
              les constructeurs partenaires (Wacker Neuson, Magni, Promove Demolition). La durée
              et l&apos;étendue de ces garanties varient selon les constructeurs et les gammes ; elles
              sont précisées dans la documentation technique remise à la livraison.
            </p>
            <p>
              La garantie ne s&apos;applique pas aux dommages résultant d&apos;une utilisation incorrecte,
              d&apos;une négligence, d&apos;un entretien insuffisant, d&apos;une modification non autorisée ou
              d&apos;un accident.
            </p>
          </Section>

          <Section title="Article 9 — Service après-vente (SAV)">
            <p>
              AMC dispose d&apos;un atelier SAV certifié <strong>SE+</strong> à Saint-Félix (74540).
              Les interventions de maintenance, réparation et fourniture de pièces détachées d&apos;origine
              constructeur sont réalisées par des techniciens certifiés. Les conditions tarifaires
              du SAV sont communiquées sur devis préalable.
            </p>
            <p>
              Pour toute demande SAV :{" "}
              <a href="tel:+33426784390" className="text-amc-yellow-dark hover:underline">04 26 78 43 90</a>
              {" "}— <a href="mailto:contact@amc-savoie.fr" className="text-amc-yellow-dark hover:underline">contact@amc-savoie.fr</a>
            </p>
          </Section>

          <Section title="Article 10 — Responsabilité">
            <p>
              La responsabilité d&apos;AMC ne pourra être engagée qu&apos;en cas de faute prouvée. En tout
              état de cause, la responsabilité d&apos;AMC est limitée au montant de la commande concernée.
              AMC ne saurait être tenue responsable des préjudices indirects, pertes d&apos;exploitation
              ou manque à gagner subis par le Client.
            </p>
          </Section>

          <Section title="Article 11 — Droit applicable et litiges">
            <p>
              Les présentes CGV sont soumises au <strong>droit français</strong>. En cas de litige,
              les parties s&apos;engagent à rechercher une solution amiable avant tout recours judiciaire.
              À défaut, le litige sera soumis à la compétence exclusive du Tribunal de Commerce
              d&apos;Annecy (Haute-Savoie), même en cas de pluralité de défendeurs ou d&apos;appel en garantie.
            </p>
          </Section>

        </div>
      </div>
    </div>
  );
}
