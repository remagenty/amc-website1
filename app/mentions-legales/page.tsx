import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales | AMC — Alpes Matériel Compact",
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-amc-cream">
      <div className="bg-white border-b border-gray-100">
        <div className="container-amc py-4">
          <nav className="text-sm text-amc-text-secondary">
            <ol className="flex items-center gap-2">
              <li><a href="/" className="hover:text-amc-yellow-dark transition-colors">Accueil</a></li>
              <li aria-hidden>/</li>
              <li className="font-medium text-amc-text">Mentions légales</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-amc py-12 max-w-4xl">
        <h1 className="text-3xl font-black text-amc-text mb-2">Mentions légales</h1>
        <p className="text-sm text-amc-text-secondary mb-8">Dernière mise à jour : juin 2025</p>

        <div className="space-y-6">

          <section className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="text-xl font-bold text-amc-text mb-4 pb-3 border-b border-gray-100">Éditeur du site</h2>
            <div className="space-y-2 text-sm text-amc-text leading-relaxed">
              <p><strong>Raison sociale :</strong> AMC — Alpes Matériel Compact</p>
              <p><strong>Forme juridique :</strong> Société</p>
              <p><strong>Siège social :</strong> ZAC D&apos;Orsan, 330 Rue du Mont Blanc, 74540 Saint-Félix — Haute-Savoie</p>
              <p><strong>Téléphone :</strong> <a href="tel:+33426784390" className="text-amc-yellow-dark hover:underline">04 26 78 43 90</a></p>
              <p><strong>Email :</strong> <a href="mailto:contact@amc-savoie.fr" className="text-amc-yellow-dark hover:underline">contact@amc-savoie.fr</a></p>
              <p><strong>SIRET :</strong> [À compléter]</p>
              <p><strong>N° TVA intracommunautaire :</strong> [À compléter]</p>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="text-xl font-bold text-amc-text mb-4 pb-3 border-b border-gray-100">Directeur de la publication</h2>
            <p className="text-sm text-amc-text leading-relaxed">
              Le directeur de la publication est le représentant légal d&apos;AMC — Alpes Matériel Compact.
              Pour tout contact : <a href="mailto:contact@amc-savoie.fr" className="text-amc-yellow-dark hover:underline">contact@amc-savoie.fr</a>
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="text-xl font-bold text-amc-text mb-4 pb-3 border-b border-gray-100">Hébergement</h2>
            <div className="text-sm text-amc-text leading-relaxed space-y-1">
              <p><strong>Hébergeur :</strong> Vercel Inc.</p>
              <p><strong>Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</p>
              <p><strong>Site :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-amc-yellow-dark hover:underline">vercel.com</a></p>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="text-xl font-bold text-amc-text mb-4 pb-3 border-b border-gray-100">Propriété intellectuelle</h2>
            <p className="text-sm text-amc-text leading-relaxed">
              L&apos;ensemble des contenus présents sur ce site (textes, images, logos, graphismes, icônes, sons, vidéos)
              est la propriété exclusive d&apos;AMC — Alpes Matériel Compact ou de ses partenaires, et est protégé par
              les lois françaises et internationales relatives à la propriété intellectuelle. Toute reproduction,
              représentation, modification, publication ou adaptation, totale ou partielle, est strictement interdite
              sans l&apos;accord écrit préalable d&apos;AMC — Alpes Matériel Compact.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="text-xl font-bold text-amc-text mb-4 pb-3 border-b border-gray-100">Limitation de responsabilité</h2>
            <p className="text-sm text-amc-text leading-relaxed">
              AMC — Alpes Matériel Compact s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations
              diffusées sur ce site. Toutefois, AMC ne peut garantir l&apos;exactitude, la précision ou l&apos;exhaustivité
              des informations mises à disposition. AMC décline toute responsabilité pour toute imprécision,
              inexactitude ou omission portant sur des informations disponibles sur ce site.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="text-xl font-bold text-amc-text mb-4 pb-3 border-b border-gray-100">Droit applicable</h2>
            <p className="text-sm text-amc-text leading-relaxed">
              Les présentes mentions légales sont soumises au droit français. En cas de litige,
              les tribunaux français seront seuls compétents.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
