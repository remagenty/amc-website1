import type { Metadata } from "next";
import Link from "next/link";
import teamData from "@/lib/team.json";
import { kvGet, kvSet } from "@/lib/kv";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  IconArrowRight,
  IconCheck,
  IconBadgeCheck,
  IconMapPin,
  IconStar,
  IconHardHat,
  IconPhone,
  IconMail,
  IconUser,
} from "@/components/ui/Icons";
import { PhoneLink } from "@/components/ui/PhoneLink";

export const metadata: Metadata = {
  title: { absolute: "À propos d'AMC — Distributeur matériel BTP Saint-Félix, Haute-Savoie (74)" },
  description: "AMC Alpes Matériel Compact, distributeur officiel WACKER NEUSON, Magni et Promove à Saint-Félix (74540), Haute-Savoie. Équipe expérimentée au service des professionnels BTP en Auvergne-Rhône-Alpes.",
  openGraph: {
    title: "À propos d'AMC — Distributeur matériel BTP Saint-Félix, Haute-Savoie (74)",
    description: "AMC Alpes Matériel Compact, distributeur officiel WACKER NEUSON, Magni et Promove à Saint-Félix (74540), Haute-Savoie. Équipe expérimentée au service des professionnels BTP en Auvergne-Rhône-Alpes.",
    images: [{ url: "/images/about/equipe-amc.png" }],
    type: "website",
    url: `https://www.amc-savoie.fr/a-propos`,
    siteName: "AMC — Alpes Matériel Compact",
  },
};

// ─── Blocs alternés Histoire ──────────────────────────────────────────────────

const HISTOIRE_BLOCKS = [
  {
    tag: "Notre histoire",
    icon: IconHardHat,
    title: "Une expertise locale au service du BTP",
    text: "Implantée en région Rhône-Alpes, AMC a été fondée avec une conviction simple : les professionnels du chantier méritent un interlocuteur unique, réactif et expert.",
    points: [
      "Distributeur officiel WACKER NEUSON, Magni et Promove Demolition",
      "Gamme complète de matériels neufs et d'occasion",
      "Service après-vente de proximité certifié",
    ],
    extra:
      "Notre engagement : vous accompagner de la sélection du matériel jusqu'à sa maintenance, avec des conseillers qui connaissent vos métiers.",
    image: "/images/sav-sur-terrain-2.jpg",
    imageAlt: "Chantier BTP en Rhône-Alpes — AMC Alpes Matériel Compact",
  },
  {
    tag: "Nos partenaires",
    icon: IconStar,
    title: "Distributeur officiel des meilleures marques",
    text: "AMC est l'interlocuteur privilégié des professionnels du BTP en Rhône-Alpes pour trois marques leaders de l'industrie de la construction.",
    points: [
      "WACKER NEUSON — équipements compacts haute performance",
      "Magni — télescopiques rotatifs et fixes de précision",
      "Promove Demolition — outils hydrauliques de démolition",
    ],
    extra:
      "Nos équipes sont formées directement par les constructeurs, avec accès aux pièces d'origine et aux garanties officielles.",
    image: "/images/immage-accueil-site-internet.png",
    imageAlt: "Gamme matériels WACKER NEUSON distribuée par AMC",
  },
  {
    tag: "SAV certifié",
    icon: IconBadgeCheck,
    title: "Un atelier certifié à votre service",
    text: "Notre atelier de Saint-Félix est équipé de bancs de diagnostic homologués et d'outillage constructeur. Nos techniciens certifiés interviennent sur tous les matériels distribués.",
    points: [
      "Certification SAV pour WACKER NEUSON, Magni et Promove",
      "Techniciens formés et habilités par les constructeurs",
      "Intervention rapide sur site ou en atelier",
    ],
    extra:
      "Contrats d'entretien préventif, réparations, pièces d'origine : nous gérons tout le cycle de vie de vos engins.",
    image: "/images/sav-interieur-2.jpg",
    imageAlt: "Atelier SAV certifié AMC à Saint-Félix",
  },
];

// ─── Équipe ───────────────────────────────────────────────────────────────────

type TeamMember = { slug: string; initials: string; role: string; name: string; description: string; photo: string | null; phone?: string; email?: string };

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
      "Distributeur agréé WACKER NEUSON, Magni et Promove Demolition — garanties constructeur et pièces d'origine assurées.",
  },
];

// ─── Placeholder TODO ─────────────────────────────────────────────────────────

function Todo({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-dashed border-amber-400 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-lg">
      <span className="bg-amber-400 text-white text-[9px] font-black px-1 py-0.5 rounded uppercase tracking-wide">
        TODO
      </span>
      {label}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export const dynamic = "force-dynamic";

export default async function AProposPage() {
  let kvTeam = await kvGet<TeamMember[]>("team");

  // Auto-migrate: backfill photo and email from team.json when missing in KV
  if (kvTeam) {
    const bySlug: Record<string, TeamMember> = Object.fromEntries(
      (teamData as TeamMember[]).map((m) => [m.slug, m])
    );
    const needsUpdate = kvTeam.some(
      (m) => (!m.photo && bySlug[m.slug]?.photo) || (!m.email && bySlug[m.slug]?.email)
    );
    if (needsUpdate) {
      kvTeam = kvTeam.map((m) => ({
        ...m,
        photo: m.photo ?? bySlug[m.slug]?.photo ?? null,
        email: m.email ?? bySlug[m.slug]?.email ?? undefined,
      }));
      kvSet("team", kvTeam); // fire-and-forget: update KV for future requests
    }
  }

  const TEAM = (kvTeam ?? (teamData as TeamMember[])).filter((m) => m.slug !== undefined);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "420px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/immage-accueil-site-internet.png"
          alt="AMC Alpes Matériel Compact — Rhône-Alpes"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
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
            Fondée en 2013, AMC s&apos;est imposé comme le partenaire de confiance
            des professionnels du BTP en Haute-Savoie et en Savoie. Installés à Saint-Félix
            (74540), nous couvrons toute la région Auvergne-Rhône-Alpes&nbsp;: Annecy, Chambéry,
            Aix-les-Bains, Albertville et au-delà. Distributeur officiel WACKER NEUSON, Magni
            et Promove Demolition.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/gammes" className="btn-primary">
              Découvrir nos matériels <IconArrowRight size={16} />
            </Link>
            <PhoneLink className="btn-outline">
              <IconPhone size={16} /> Nous appeler
            </PhoneLink>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-lg font-black text-amc-text">{member.initials}</span>
                    )}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#FFD700] mb-1">
                    {member.role}
                  </p>
                  <h3 className="font-bold text-amc-text text-sm mb-3">{member.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3">{member.description}</p>
                  {(member.phone || member.email) && (
                    <div className="w-full space-y-1 mb-3">
                      {member.phone && (
                        <a href={`tel:${member.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-amc-yellow-dark transition-colors">
                          <IconPhone size={11} className="flex-shrink-0 text-amc-yellow" />
                          {member.phone}
                        </a>
                      )}
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-amc-yellow-dark transition-colors truncate">
                          <IconMail size={11} className="flex-shrink-0 text-amc-yellow" />
                          {member.email}
                        </a>
                      )}
                    </div>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amc-yellow-dark group-hover:gap-2 transition-all mt-auto">
                    Voir le profil <IconArrowRight size={11} />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EN CHIFFRES ── */}
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
                        loading="lazy"
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
      <section className="bg-white py-20">
        <div className="container-amc text-center">
          <ScrollReveal from="bottom">
            <h2 className="text-3xl font-black mb-4" style={{ color: "#1a1a1a" }}>
              Travaillons ensemble
            </h2>
            <p className="mb-8 max-w-lg mx-auto" style={{ color: "#444444" }}>
              Vous avez un projet, un besoin en matériel ou une question technique ?
              Notre équipe est disponible pour vous conseiller.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                Contacter l&apos;équipe <IconArrowRight size={16} />
              </Link>
              <PhoneLink className="btn-outline !text-amc-text !border-amc-text hover:!bg-amc-text hover:!text-white">
                <IconPhone size={16} /> 04 26 78 43 90
              </PhoneLink>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
