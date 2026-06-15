import type { Metadata } from "next";
import Link from "next/link";
import { IconMapPin, IconPhone, IconMail, IconClock, IconArrowRight } from "@/components/ui/Icons";
import { ContactSimpleForm } from "./ContactSimpleForm";

const GMAPS_EMBED =
  "https://www.google.com/maps?ll=45.79640,5.97107" +
  "&q=45.79640,5.97107" +
  "&hl=fr&z=16&output=embed";
const GMAPS_DIR = "https://www.google.com/maps/dir/?api=1&destination=45.79640,5.97107";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez AMC — Alpes Matériel Compact à Saint-Félix (74). Téléphone, email, horaires et localisation.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-amc-cream">

      {/* ── Hero ── */}
      <section className="relative h-[400px] md:h-[460px] flex items-center overflow-hidden">
        {/* Image de fond */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/Slide-1.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Overlay sombre */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.55)" }} />
        {/* Texte */}
        <div className="relative z-10 container-amc">
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Contactez-nous
          </h1>
          <p className="text-white/80 mt-4 text-lg max-w-xl">
            Notre équipe est à votre écoute du lundi au samedi.
          </p>
        </div>
      </section>

      {/* ── 2 colonnes : infos + formulaire ── */}
      <section className="container-amc py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Colonne gauche : infos AMC + CTAs */}
          <div className="space-y-6">
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
              <Link href="/devis" className="btn-primary justify-center text-base py-4 rounded-xl">
                Demander un devis
                <IconArrowRight size={16} />
              </Link>
              <Link href="/sav" className="btn-secondary justify-center text-base py-4 rounded-xl">
                Rendez-vous SAV
                <IconArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Colonne droite : formulaire simple */}
          <div className="bg-white rounded-2xl shadow-card p-6 lg:p-8">
            <h2 className="text-xl font-bold text-amc-text mb-6">Envoyez-nous un message</h2>
            <ContactSimpleForm />
          </div>
        </div>
      </section>

      {/* ── Map pleine largeur ── */}
      <section id="nous-localiser" className="scroll-mt-8">
        {/* Titre + adresse dans le container */}
        <div className="container-amc pb-4">
          <div className="flex items-center gap-2">
            <IconMapPin size={20} className="text-amc-yellow flex-shrink-0" />
            <h2 className="font-bold text-amc-text text-lg">Nous localiser</h2>
          </div>
          <p className="text-sm text-amc-text-secondary mt-1 ml-7">
            ZAC D&apos;Orsan, 330 Rue du Mont Blanc, 74540 Saint-Félix, Haute-Savoie
          </p>
        </div>

        {/* Map pleine largeur */}
        <iframe
          src={GMAPS_EMBED}
          width="100%"
          height="460"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localisation AMC — ZAC D'Orsan, Saint-Félix"
          aria-label="Carte Google Maps — AMC Alpes Matériel Compact"
        />

        {/* Bouton itinéraire */}
        <div className="bg-white py-5 flex justify-center border-t border-gray-100">
          <a
            href={GMAPS_DIR}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full font-semibold transition-all hover:brightness-95"
            style={{
              backgroundColor: "#FFD500",
              color: "#000000",
              padding: "14px 48px",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            Obtenir l&apos;itinéraire
          </a>
        </div>
      </section>

    </div>
  );
}
