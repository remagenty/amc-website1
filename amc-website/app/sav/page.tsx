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
  IconMapPin,
} from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: { absolute: "Service Après-Vente certifié SE+ | AMC" },
  description: "Atelier certifié SE+, techniciens formés constructeurs, pièces d'origine. SAV matériel chantier à Saint-Félix, Haute-Savoie.",
  openGraph: {
    title: "Service Après-Vente certifié SE+ | AMC",
    description: "Atelier certifié SE+, techniciens formés constructeurs, pièces d'origine. SAV matériel chantier à Saint-Félix, Haute-Savoie.",
    images: [{ url: "/images/Slide-3.jpg" }],
    type: "website",
    url: `https://www.amc-savoie.fr/sav`,
    siteName: "AMC — Alpes Matériel Compact",
  },
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

      {/* ── ZONE D'INTERVENTION ── */}
      <section className="bg-white py-20">
        <div className="container-amc">
          <ScrollReveal from="bottom">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amc-yellow mb-3">
                <IconMapPin size={14} /> Couverture géographique
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-amc-text mb-3">
                Zone d&apos;intervention SAV
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
                Basés à Saint-Félix (74540), nous intervenons en atelier et sur site dans toute la région Rhône-Alpes.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto">
            <div className="bg-amc-cream rounded-2xl p-8">
              <div className="flex items-center gap-3 p-4 bg-amc-yellow/10 rounded-xl border border-amc-yellow/30 mb-6">
                <IconMapPin size={20} className="text-amc-yellow-dark flex-shrink-0" />
                <div>
                  <p className="font-bold text-amc-text">Auvergne-Rhône-Alpes</p>
                  <p className="text-xs text-amc-text-secondary">Zone principale — atelier + interventions terrain</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Ain (01)",
                  "Ardèche (07)",
                  "Drôme (26)",
                  "Isère (38)",
                  "Loire (42)",
                  "Rhône (69)",
                  "Savoie (73)",
                  "Haute-Savoie (74)",
                ].map((dept) => (
                  <span
                    key={dept}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-amc-text shadow-sm"
                  >
                    <IconMapPin size={11} className="text-amc-yellow-dark" />
                    {dept}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-5 leading-relaxed">
                Les interventions en dehors de la région Rhône-Alpes sont étudiées au cas par cas.{" "}
                <Link href="/contact" className="text-amc-yellow-dark hover:underline font-medium">
                  Contactez-nous
                </Link>{" "}
                pour un devis de déplacement.
              </p>
            </div>
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
              <a
                href="tel:+33426784390"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 font-semibold hover:bg-black/5 transition-colors"
                style={{ borderColor: "#1a1a1a", color: "#1a1a1a" }}
              >
                <IconPhone size={16} /> 04 26 78 43 90
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
