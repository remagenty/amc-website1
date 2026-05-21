import type { Metadata } from "next";
import Link from "next/link";
import { IconMapPin, IconPhone, IconMail, IconClock, IconArrowRight } from "@/components/ui/Icons";
import { MapInteractive } from "@/components/ui/MapInteractive";

export const metadata: Metadata = {
  title: "Contact | AMC — Alpes Matériel Compact",
  description:
    "Contactez AMC — Alpes Matériel Compact à Saint-Félix (74). Téléphone, email, horaires et localisation.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-amc-cream">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 py-12">
        <div className="container-amc text-center">
          <h1 className="text-3xl md:text-4xl font-black text-amc-text">
            Contactez-nous
          </h1>
          <p className="text-amc-text-secondary mt-3 max-w-xl mx-auto">
            Notre équipe est à votre écoute du lundi au samedi.
          </p>
        </div>
      </section>

      <div className="container-amc py-12">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* Infos de contact */}
          <div className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="font-bold text-amc-text text-lg mb-6">AMC — Alpes Matériel Compact</h2>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amc-yellow/10 flex items-center justify-center flex-shrink-0">
                  <IconMapPin size={18} className="text-amc-yellow" />
                </div>
                <div>
                  <p className="font-semibold text-amc-text">Adresse</p>
                  <p className="text-amc-text-secondary mt-1 leading-relaxed">
                    ZAC D&apos;Orsan, 330 Rue du Mont Blanc<br />
                    74540 Saint-Félix, Haute-Savoie
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amc-yellow/10 flex items-center justify-center flex-shrink-0">
                  <IconPhone size={18} className="text-amc-yellow" />
                </div>
                <div>
                  <p className="font-semibold text-amc-text">Téléphone</p>
                  <a
                    href="tel:+33426784390"
                    className="text-amc-text-secondary hover:text-amc-yellow-dark transition-colors mt-1 block"
                  >
                    04 26 78 43 90
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amc-yellow/10 flex items-center justify-center flex-shrink-0">
                  <IconMail size={18} className="text-amc-yellow" />
                </div>
                <div>
                  <p className="font-semibold text-amc-text">Email</p>
                  <a
                    href="mailto:contact@amc-savoie.fr"
                    className="text-amc-text-secondary hover:text-amc-yellow-dark transition-colors mt-1 block"
                  >
                    contact@amc-savoie.fr
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amc-yellow/10 flex items-center justify-center flex-shrink-0">
                  <IconClock size={18} className="text-amc-yellow" />
                </div>
                <div>
                  <p className="font-semibold text-amc-text">Horaires</p>
                  <div className="text-amc-text-secondary mt-1 space-y-0.5">
                    <p>Lun–Ven : 8h–12h / 14h–18h</p>
                    <p>Samedi : 8h–12h</p>
                    <p>Dimanche : Fermé</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/devis"
              className="btn-primary justify-center text-base py-4 rounded-xl"
            >
              Demander un devis
              <IconArrowRight size={16} />
            </Link>
            <Link
              href="/sav"
              className="btn-secondary justify-center text-base py-4 rounded-xl"
            >
              Prendre rendez-vous SAV
              <IconArrowRight size={16} />
            </Link>
          </div>

          {/* Carte */}
          <div id="nous-localiser" className="scroll-mt-8">
            <MapInteractive />
          </div>
        </div>
      </div>
    </div>
  );
}
