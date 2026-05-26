import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "./ContactForm";
import { IconMapPin, IconPhone, IconMail, IconClock } from "@/components/ui/Icons";
import { SEBadge } from "@/components/ui/SEBadge";
import { MapInteractive } from "@/components/ui/MapInteractive";

export const metadata: Metadata = {
  title: "Demande de Devis | AMC — Alpes Matériel Compact",
  description:
    "Demandez un devis, une information ou un rendez-vous SAV. Distributeur Wacker Neuson, Magni, Promove à Saint-Félix. Réponse sous 24h.",
};

export default function DevisPage() {
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
                      ZAC D&apos;Orsan<br />
                      330 Rue du Mont Blanc<br />
                      74540 Saint-Félix<br />
                      Haute-Savoie
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconPhone size={18} className="text-amc-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-amc-text">Téléphone</p>
                    <a href="tel:+33426784390" className="text-amc-text-secondary hover:text-amc-yellow-dark transition-colors mt-0.5 block">
                      04 26 78 43 90
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconMail size={18} className="text-amc-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-amc-text">Email</p>
                    <a href="mailto:contact@amc-savoie.fr" className="text-amc-text-secondary hover:text-amc-yellow-dark transition-colors mt-0.5 block">
                      contact@amc-savoie.fr
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconClock size={18} className="text-amc-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-amc-text">Horaires</p>
                    <div className="text-amc-text-secondary mt-0.5 space-y-0.5">
                      <p>Lun–Ven : 8h–12h / 14h–18h</p>
                      <p>Samedi : 8h–12h</p>
                      <p>Dimanche : Fermé</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-gray-100">
                <SEBadge size="sm" />
                <p className="text-xs text-amc-text-secondary mt-2">
                  Service après-vente certifié SE+
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
