import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "./ContactForm";
import { IconMapPin, IconPhone, IconMail, IconClock } from "@/components/ui/Icons";
import { MapInteractive } from "@/components/ui/MapInteractive";
import { PhoneLink } from "@/components/ui/PhoneLink";
import { kvGet } from "@/lib/kv";
import type { SiteContent } from "@/app/api/admin/content/route";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Demande de devis | AMC — Alpes Matériel Compact" },
  description: "Demandez un devis gratuit en ligne. Vente, SAV, pièces détachées, financement. Réponse sous 24h ouvrées.",
  openGraph: {
    title: "Demande de devis | AMC — Alpes Matériel Compact",
    description: "Demandez un devis gratuit en ligne. Vente, SAV, pièces détachées, financement. Réponse sous 24h ouvrées.",
    images: [{ url: "/images/chantier-realiste-fusion-des-engins.jpg" }],
    type: "website",
    url: `https://www.amc-savoie.fr/devis`,
    siteName: "AMC — Alpes Matériel Compact",
  },
};

export default async function DevisPage() {
  const content = await kvGet<SiteContent>("site-content");
  const contact = content?.contact;

  const address = contact?.address ?? "ZAC D'Orsan, 330 Rue du Mont Blanc\n74540 Saint-Félix";
  const phone = contact?.phone ?? "04 26 78 43 90";
  const email = contact?.email ?? "contact@amc-savoie.fr";
  const hours = contact?.hours ?? "Lun–Ven : 8h–12h / 14h–18h\nSam : Fermé";

  const addressLines = address.split("\n");

  return (
    <div className="min-h-screen bg-amc-cream">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-12">
        <div className="container-amc">
          <h1 className="text-3xl md:text-4xl font-black text-amc-text">
            Demande de Devis
          </h1>
          <p className="text-amc-text-secondary mt-3 max-w-xl">
            Besoin d&apos;un devis, d&apos;un conseil ou d&apos;un rendez-vous SAV ? Notre équipe vous répond
            sous 24h ouvrées.
          </p>
        </div>
      </section>

      <div className="container-amc py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Infos */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h2 className="font-bold text-amc-text mb-5">AMC — Alpes Matériel Compact</h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <IconMapPin size={18} className="text-amc-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-amc-text">Adresse</p>
                    <p className="text-amc-text-secondary mt-0.5">
                      {addressLines.map((line, i) => (
                        <span key={i}>{line}{i < addressLines.length - 1 && <br />}</span>
                      ))}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconPhone size={18} className="text-amc-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-amc-text">Téléphone</p>
                    <PhoneLink className="text-amc-text-secondary hover:text-amc-yellow-dark transition-colors mt-0.5 block">
                      {phone}
                    </PhoneLink>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconMail size={18} className="text-amc-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-amc-text">Email</p>
                    <a href={`mailto:${email}`} className="text-amc-text-secondary hover:text-amc-yellow-dark transition-colors mt-0.5 block">
                      {email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconClock size={18} className="text-amc-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-amc-text">Horaires</p>
                    <div className="text-amc-text-secondary mt-0.5 space-y-0.5">
                      {hours.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-gray-100">
                <p className="text-xs text-amc-text-secondary mt-2">
                  Service après-vente certifié
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-card p-6 lg:p-8">
              <h2 className="text-xl font-bold text-amc-text mb-6">
                Envoyez-nous un message
              </h2>
              <Suspense fallback={<div className="py-12 text-center text-amc-text-secondary">Chargement du formulaire...</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Carte interactive — pleine largeur */}
        <div id="nous-localiser" className="mt-8 scroll-mt-8">
          <MapInteractive />
        </div>
      </div>
    </div>
  );
}
