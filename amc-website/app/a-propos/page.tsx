import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  IconArrowRight,
  IconCheck,
  IconBadgeCheck,
  IconMapPin,
  IconStar,
  IconHardHat,
  IconPhone,
  IconUser,
} from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "À propos | AMC — Alpes Matériel Compact",
  description:
    "Découvrez l'histoire d'AMC, distributeur officiel Wacker Neuson, Magni et Promove Demolition en Rhône-Alpes. Notre équipe d'experts à votre service.",
};

// ─── Blocs alternés Histoire ──────────────────────────────────────────────────

const HISTOIRE_BLOCKS = [
  {
    tag: "Notre histoire",
    icon: IconHardHat,
    title: "Une expertise locale au service du BTP",
    text: "Implantée en région Rhône-Alpes, AMC a été fondée avec une conviction simple : les professionnels du chantier méritent un interlocuteur unique, réactif et expert.",
    points: [
      "Distributeur officiel Wacker Neuson, Magni et Promove Demolition",
      "Gamme complète de matériels neufs et d'occasion",
      "Service après-vente de proximité certifié SE+",
    ],
    extra:
      "Notre engagement : vous accompagner de la sélection du matériel jusqu'à sa maintenance, avec des conseillers qui connaissent vos métiers.",
    image: "/images/Slide-1.jpg",
    imageAlt: "Chantier BTP en Rhône-Alpes — AMC Alpes Matériel Compact",
  },
  {
    tag: "Nos partenaires",
    icon: IconStar,
    title: "Distributeur officiel des meilleures marques",
    text: "AMC est l'interlocuteur privilégié des professionnels du BTP en Rhône-Alpes pour trois marques leaders de l'industrie de la construction.",
    points: [
      "Wacker Neuson — équipements compacts haute performance",
      "Magni — télescopiques rotatifs et fixes de précision",
      "Promove Demolition — outils hydrauliques de démolition",
    ],
    extra:
      "Nos équipes sont formées directement par les constructeurs, avec accès aux pièces d'origine et aux garanties officielles.",
    image: "/images/photo-wacker-catalogue.jpg",
    imageAlt: "Gamme matériels Wacker Neuson distribuée par AMC",
  },
  {
    tag: "SAV certifié",
    icon: IconBadgeCheck,
    title: "Un atelier certifié SE+ à votre service",
    text: "Notre atelier de Saint-Félix est équipé de bancs de diagnostic homologués et d'outillage constructeur. Nos techniciens certifiés interviennent sur tous les matériels distribués.",
    points: [
      "Certification SE+ pour Wacker Neuson, Magni et Promove",
      "Techniciens formés et habilités par les constructeurs",
      "Intervention rapide sur site ou en atelier",
    ],
    extra:
      "Contrats d'entretien préventif, réparations, pièces d'origine : nous gérons tout le cycle de vie de vos engins.",
    image: "/images/Slide-3.jpg",
    imageAlt: "Atelier SAV certifié SE+ AMC à Saint-Félix",
  },
];

// ─── Équipe ───────────────────────────────────────────────────────────────────

const TEAM = [
  {
    slug: "chef-agence",
    initials: "CA",
    role: "Chef d'agence",
    name: "À compléter",
    description:
      "Pilote l'agence AMC au quotidien et garantit la qualité de service auprès de nos clients professionnels.",
  },
  {
    slug: "responsable-sav",
    initials: "RS",
    role: "Responsable SAV",
    name: "Romain",
    photo: "/images/about/equipe-amc.png",
    description:
      "Coordonne toutes les interventions techniques et assure la réactivité de notre service après-vente.",
  },
  {
    slug: "commercial-1",
    initials: "C1",
    role: "Commercial",
    name: "À compléter",
    description:
      "Spécialiste des matériels Wacker Neuson et Magni, il vous accompagne dans le choix de vos équipements.",
  },
  {
    slug: "commercial-2",
    initials: "C2",
    role: "Commercial",
    name: "À compléter",
    description:
      "Expert en matériels de démolition et d'attachements, il trouve la solution adaptée à chaque chantier.",
  },
  {
    slug: "commercial-3",
    initials: "C3",
    role: "Commercial",
    name: "À compléter",
    description:
      "Dédié au suivi client et aux projets spéciaux, il est votre interlocuteur pour les demandes sur mesure.",
  },
];

// ─── Valeurs ──────────────────────────────────────────────────────────────────

const VALEURS = [
  {
    icon: IconBadgeCheck,
    titre: "Expertise technique",
    texte:
      "Des conseillers formés par les constructeurs, capables de répondre à toutes vos questions terrain.",
  },
  {
    icon: IconMapPin,
    titre: "Proximité Rhône-Alpes",
    texte:
      "Une agence locale, des interventions rapides, un interlocuteur unique qui connaît votre région.",
  },
  {
    icon: IconStar,
    titre: "Partenaires officiels",
    texte:
      "Distributeur agréé Wacker Neuson, Magni et Promove Demolition — garanties constructeur et pièces d'origine assurées.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AProposPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "420px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/Slide-1.jpg"
          alt="AMC Alpes Matériel Compact — Rhône-Alpes"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.58)" }} />
        <div className="relative z-10 container-amc py-24 flex flex-col items-start justify-end h-full min-h-[420px]">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amc-yellow text-amc-text text-xs font-bold mb-5 uppercase tracking-wider">
            <IconHardHat size={14} /> AMC — Alpes Matériel Compact
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Notre histoire
          </h1>
          <p className="text-white/75 text-lg max-w-xl mb-8">
            Depuis notre création, AMC s&apos;est imposé comme le partenaire de confiance
            des professionnels du BTP en région Rhône-Alpes. Distributeur officiel
            Wacker Neuson, Magni et Promove Demolition, nous mettons notre expertise
            au service de vos chantiers.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/catalogue" className="btn-primary">
              Découvrir nos matériels <IconArrowRight size={16} />
            </Link>
            <a href="tel:+33426784390" className="btn-outline">
              <IconPhone size={16} /> Nous appeler
            </a>
          </div>
        </div>
      </section>

      {/* ── BLOCS ALTERNÉS ── */}
      <section className="bg-white py-24">
        <div className="container-amc">
          <div className="space-y-28">
            {HISTOIRE_BLOCKS.map((block, i) => {
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
                    <p className="text-gray-600 leading-relaxed mb-6">{block.text}</p>
                    <ul className="space-y-3 mb-6">
                      {block.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-sm text-gray-700">
                          <span className="mt-0.5 w-5 h-5 rounded-full bg-amc-yellow flex-shrink-0 flex items-center justify-center">
                            <IconCheck size={11} className="text-amc-text" />
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                    <p className="text-gray-500 text-sm leading-relaxed italic border-l-2 border-amc-yellow pl-4">
                      {block.extra}
                    </p>
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

      {/* ── ÉQUIPE ── */}
      <section id="equipe" className="bg-amc-cream py-24">
        <div className="container-amc">
          <ScrollReveal from="bottom">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amc-yellow mb-3">
                <IconUser size={14} /> Notre équipe
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-amc-text mb-3">
                Des experts à votre écoute
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
                Une équipe passionnée par les machines et dédiée à votre satisfaction,
                de la vente à la maintenance.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {TEAM.map((member, i) => (
              <ScrollReveal key={member.slug} from="bottom" delay={i * 80}>
                <Link
                  href={`/a-propos/${member.slug}`}
                  className="group bg-white rounded-2xl shadow-card p-6 text-center flex flex-col items-center hover:shadow-lg hover:-translate-y-1 hover:border-amc-yellow border-2 border-transparent transition-all duration-300 cursor-pointer block"
                >
                  {/* Avatar — photo si disponible, sinon initiales */}
                  <div className="w-16 h-16 rounded-full bg-amc-yellow flex items-center justify-center mb-4 flex-shrink-0 group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                    {"photo" in member && member.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={member.photo as string}
                        alt={`Photo ${member.name}`}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <span className="text-lg font-black text-amc-text">{member.initials}</span>
                    )}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#FFD700] mb-1">
                    {member.role}
                  </p>
                  <h3 className="font-bold text-amc-text text-sm mb-3">{member.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">{member.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amc-yellow-dark group-hover:gap-2 transition-all mt-auto">
                    Voir le profil <IconArrowRight size={11} />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALEURS ── */}
      <section className="bg-white py-24">
        <div className="container-amc">
          <ScrollReveal from="bottom">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amc-yellow mb-3">
                <IconBadgeCheck size={14} /> Ce qui nous définit
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-amc-text">
                Nos engagements
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALEURS.map((val, i) => {
              const Icon = val.icon;
              return (
                <ScrollReveal key={val.titre} from="bottom" delay={i * 120}>
                  <div className="group bg-amc-cream rounded-2xl p-8 hover:bg-amc-yellow transition-colors duration-300 cursor-default">
                    <div className="w-12 h-12 rounded-xl bg-amc-yellow group-hover:bg-white flex items-center justify-center mb-6 transition-colors duration-300">
                      <Icon size={22} className="text-amc-text" />
                    </div>
                    <h3 className="text-lg font-black text-amc-text mb-3">{val.titre}</h3>
                    <p className="text-gray-600 group-hover:text-amc-text text-sm leading-relaxed transition-colors duration-300">
                      {val.texte}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-amc-gray py-20">
        <div className="container-amc text-center">
          <ScrollReveal from="bottom">
            <h2 className="text-3xl font-black text-white mb-4">
              Travaillons ensemble
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">
              Vous avez un projet, un besoin en matériel ou une question technique ?
              Notre équipe est disponible pour vous conseiller.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                Contacter l&apos;équipe <IconArrowRight size={16} />
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
