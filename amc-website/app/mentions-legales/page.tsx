import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales | AMC — Alpes Matériel Compact",
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-amc-cream">
      <div className="container-amc py-12 max-w-4xl">
        <h1 className="text-3xl font-black text-amc-text mb-8">Mentions légales</h1>

        <div className="bg-white rounded-2xl shadow-card p-8 prose prose-sm max-w-none text-amc-text">
          <h2>Éditeur du site</h2>
          <p>
            <strong>AMC — Alpes Matériel Compact</strong><br />
            ZAC D&apos;Orsan, 330 Rue du Mont Blanc<br />
            74540 Saint-Félix — Haute-Savoie<br />
            Téléphone : +33 (0)4 50 00 00 00<br />
            Email : contact@amc-savoie.fr
          </p>

          <h2>Hébergement</h2>
          <p>
            Le présent site est hébergé par Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, USA.
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble du contenu de ce site (textes, images, logos, vidéos) est la propriété exclusive
            d'AMC — Alpes Matériel Compact ou de ses partenaires. Toute reproduction est interdite sans
            autorisation préalable.
          </p>

          <h2>Données personnelles</h2>
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression
            de vos données. Pour exercer ce droit, contactez : contact@amc-savoie.fr.
          </p>

          <h2>Cookies</h2>
          <p>
            Ce site utilise des cookies pour améliorer votre expérience. Vous pouvez configurer votre
            navigateur pour refuser les cookies.
          </p>
        </div>
      </div>
    </div>
  );
}
