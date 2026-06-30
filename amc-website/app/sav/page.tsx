import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  IconArrowRight,
  IconCheck,
  IconShield,
  IconWrench,
  IconBadgeCheck,
  IconPhone,
} from "@/components/ui/Icons";
import { PhoneLink } from "@/components/ui/PhoneLink";

export const metadata: Metadata = {
  title: { absolute: "Service Après-Vente certifié | AMC" },
  description: "Atelier certifié, techniciens formés constructeurs, pièces d'origine. SAV matériel chantier à Saint-Félix, Haute-Savoie.",
  openGraph: {
    title: "Service Après-Vente certifié | AMC",
    description: "Atelier certifié, techniciens formés constructeurs, pièces d'origine. SAV matériel chantier à Saint-Félix, Haute-Savoie.",
    images: [{ url: "/images/Slide-3.jpg" }],
    type: "website",
    url: `https://www.amc-savoie.fr/sav`,
    siteName: "AMC — Alpes Matériel Compact",
  },
};

const BLOCKS = [
  {
    icon: IconBadgeCheck,
    tag: "Certification SAV",
    title: "Techniciens confirmés",
    text: "Nos techniciens cumulent des années d'expérience terrain sur toutes les gammes que nous distribuons. Formés directement par WACKER NEUSON, Magni et Promove Demolition, ils maîtrisent chaque machine de fond en comble et interviennent avec les bons outils, au bon moment.",
    points: [
      "Formation continue directement chez les constructeurs",
      "Habilitations et certifications à jour",
      "Interventions en atelier et déplacements sur site",
    ],
    image: "/images/Slide-3.jpg",
    imageAlt: "Technicien AMC certifié en atelier",
  },
  {
    icon: IconWrench,
    tag: "Atelier",
    title: "Atelier équipé en technologies",
    text: "Notre atelier de Saint-Félix est équipé de mallettes de diagnostic électronique, d'outillages spécifiques et de tous les équipements nécessaires pour intervenir efficacement sur vos engins. Chaque réparation est réalisée dans des conditions optimales pour garantir fiabilité et longévité.",
    points: [
      "Mallettes de diagnostic électronique constructeurs",
      "Outillage spécifique et instruments calibrés",
      "Espace dédié lavage et préparation des engins",
    ],
    image: "/images/photo-wacker-catalogue.jpg",
    imageAlt: "Atelier SAV AMC équipé à Saint-Félix",
  },
  {
    icon: IconShield,
    tag: "Pièces détachées",
    title: "Pièces d'origine & adaptables, délais maîtrisés",
    text: "Nous approvisionnons exclusivement des pièces détachées d'origine constructeur pour toutes les marques distribuées. Notre stock local et nos accès directs aux filières logistiques réduisent au maximum les temps d'immobilisation de vos engins sur chantier.",
    points: [
      "Stock de pièces courantes disponible à Saint-Félix",
      "Commande directe auprès des constructeurs",
      "Garantie constructeur sur toutes les pièces",
    ],
    cta: { label: "Commander des pièces", href: "/devis?type=pieces-detachees" },
    image: "/images/chantier-realiste-fusion-des-engins.jpg",
    imageAlt: "Pièces détachées d'origine constructeur AMC",
  },
];

export default function SavPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "420px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/sav-page-arrivee.jpg"
          alt="Atelier SAV AMC"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.58)" }} />
        <div className="relative z-10 container-amc py-24 flex flex-col items-start justify-end h-full min-h-[420px]">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amc-yellow text-amc-text text-xs font-bold mb-5 uppercase tracking-wider">
            <IconShield size={14} /> Certification SAV
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Service Après-Vente
          </h1>
          <p className="text-white/75 text-lg max-w-xl mb-8">
            Un atelier certifié, des techniciens spécialisés et des pièces d&apos;origine pour maintenir vos engins au meilleur niveau.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/devis?type=sav" className="btn-primary">
              Prendre rendez-vous <IconArrowRight size={16} />
            </Link>
            <PhoneLink className="btn-outline">
              <IconPhone size={16} /> Appeler l&apos;atelier
            </PhoneLink>
          </div>
        </div>
      </section>

      {/* ── BLOCS ALTERNÉS ── */}
      <section className="bg-white py-24">
        <div className="container-amc">
          <div className="space-y-28">
            {BLOCKS.map((block, i) => {
              const Icon = block.icon;
              const isEven = i % 2 === 0;
              return (
                <div
                  key={block.title}
                  className={`flex flex-col lg:flex-row ${
                    !isEven ? "lg:flex-row-reverse" : ""
                  } gap-12 lg:gap-20 items-center`}
                >
                  {/* Texte */}
                  <ScrollReveal
                    from={isEven ? "left" : "right"}
                    className="flex-1 min-w-0"
                  >
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amc-yellow mb-4">
                      <Icon size={14} />
                      {block.tag}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black text-amc-text leading-snug mb-5">
                      {block.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-7">{block.text}</p>
                    <ul className="space-y-3 mb-7">
                      {block.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-sm text-gray-700">
                          <span className="mt-0.5 w-5 h-5 rounded-full bg-amc-yellow flex-shrink-0 flex items-center justify-center">
                            <IconCheck size={11} className="text-amc-text" />
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                    {"cta" in block && block.cta && (
                      <Link href={block.cta.href} className="btn-primary self-start">
                        {block.cta.label} <IconArrowRight size={15} />
                      </Link>
                    )}
                  </ScrollReveal>

                  {/* Image */}
                  <ScrollReveal
                    from={isEven ? "right" : "left"}
                    delay={160}
                    className="flex-1 min-w-0 w-full"
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={block.image}
                        alt={block.imageAlt}
                        className="w-full h-full object-cover"
                      />
                      {/* Liseré jaune décoratif */}
                      <div
                        className={`absolute bottom-0 ${isEven ? "right-0" : "left-0"} w-1 h-1/2 bg-amc-yellow`}
                      />
                    </div>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ backgroundColor: "#F5F4EF" }}>
        <div className="container-amc text-center">
          <ScrollReveal from="bottom">
            <h2 className="text-3xl font-black mb-4" style={{ color: "#1a1a1a" }}>
              Besoin d&apos;une intervention ?
            </h2>
            <p className="mb-8 max-w-lg mx-auto" style={{ color: "#444444" }}>
              Contactez notre atelier pour un devis, une prise en charge ou tout renseignement sur nos contrats d&apos;entretien.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/devis?type=sav" className="btn-primary">
                Demander un devis SAV <IconArrowRight size={16} />
              </Link>
              <PhoneLink
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 font-semibold hover:bg-black/5 transition-colors"
                style={{ borderColor: "#1a1a1a", color: "#1a1a1a" }}
              >
                <IconPhone size={16} /> 04 26 78 43 90
              </PhoneLink>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
