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

export const metadata: Metadata = {
  title: "Service Après-Vente | AMC — Alpes Matériel Compact",
  description:
    "Atelier certifié SE+, techniciens spécialisés constructeurs, pièces d'origine et maintenance préventive. SAV AMC à Saint-Félix, Haute-Savoie.",
};

const BLOCKS = [
  {
    icon: IconBadgeCheck,
    tag: "Certification SE+",
    title: "Techniciens certifiés par les constructeurs",
    text: "Nos techniciens sont formés et certifiés directement par Wacker Neuson, Magni et Promove Demolition. La certification SE+ atteste de leur maîtrise technique et de leur capacité à intervenir sur l'ensemble des gammes, dans le strict respect des préconisations constructeur.",
    points: [
      "Formation continue directement chez les constructeurs",
      "Habilitations et certifications à jour",
      "Interventions en atelier et déplacements sur site",
    ],
    image: "/images/Slide-3.jpg",
    imageAlt: "Technicien AMC certifié SE+ en atelier",
  },
  {
    icon: IconWrench,
    tag: "Atelier",
    title: "Atelier équipé aux normes constructeurs",
    text: "Notre atelier de Saint-Félix dispose de bancs de diagnostic homologués, d'outillage spécifique et d'équipements dédiés aux engins compacts. Chaque intervention est réalisée dans des conditions optimales pour garantir la fiabilité et la longévité de vos machines.",
    points: [
      "Bancs de diagnostic constructeurs homologués",
      "Outillage spécifique et instruments calibrés",
      "Espace dédié lavage et préparation des engins",
    ],
    image: "/images/photo-wacker-catalogue.jpg",
    imageAlt: "Atelier SAV AMC équipé à Saint-Félix",
  },
  {
    icon: IconShield,
    tag: "Pièces détachées",
    title: "Pièces d'origine, délais maîtrisés",
    text: "Nous approvisionnons exclusivement des pièces détachées d'origine constructeur pour toutes les marques distribuées. Notre stock local et nos accès directs aux filières logistiques réduisent au maximum les temps d'immobilisation de vos engins sur chantier.",
    points: [
      "Stock de pièces courantes disponible à Saint-Félix",
      "Commande directe auprès des constructeurs",
      "Garantie constructeur sur toutes les pièces",
    ],
    image: "/images/Slide-1.jpg",
    imageAlt: "Pièces détachées d'origine constructeur AMC",
  },
  {
    icon: IconCheck,
    tag: "Contrats d'entretien",
    title: "Maintenance préventive sur mesure",
    text: "Nos contrats de maintenance préventive vous permettent de planifier les entretiens de vos engins conformément aux préconisations constructeur. En intervenant avant la panne, nous réduisons les coûts de réparation et assurons la disponibilité de vos machines aux moments clés du chantier.",
    points: [
      "Planning d'entretien personnalisé par machine",
      "Rapports d'intervention détaillés après chaque passage",
      "Priorité d'accès à l'atelier pour les contrats",
    ],
    image: "/images/Magni-catalogue.avif",
    imageAlt: "Maintenance préventive engins de chantier AMC",
  },
];

export default function SavPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "420px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/Slide-3.jpg"
          alt="Atelier SAV AMC"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.58)" }} />
        <div className="relative z-10 container-amc py-24 flex flex-col items-start justify-end h-full min-h-[420px]">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amc-yellow text-amc-text text-xs font-bold mb-5 uppercase tracking-wider">
            <IconShield size={14} /> Certification SE+
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
            <a href="tel:+33426784390" className="btn-outline">
              <IconPhone size={16} /> Appeler l&apos;atelier
            </a>
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
                    <ul className="space-y-3">
                      {block.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-sm text-gray-700">
                          <span className="mt-0.5 w-5 h-5 rounded-full bg-amc-yellow flex-shrink-0 flex items-center justify-center">
                            <IconCheck size={11} className="text-amc-text" />
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
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
      <section className="bg-amc-gray py-20">
        <div className="container-amc text-center">
          <ScrollReveal from="bottom">
            <h2 className="text-3xl font-black text-white mb-4">
              Besoin d&apos;une intervention ?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Contactez notre atelier pour un devis, une prise en charge ou tout renseignement sur nos contrats d&apos;entretien.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/devis?type=sav" className="btn-primary">
                Demander un devis SAV <IconArrowRight size={16} />
              </Link>
              <a href="tel:+33426784390" className="btn-outline">
                <IconPhone size={16} /> 04 26 78 43 90
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
