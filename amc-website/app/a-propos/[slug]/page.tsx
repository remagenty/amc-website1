import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TeamMemberContactForm } from "@/components/a-propos/TeamMemberContactForm";
import {
  IconArrowRight,
  IconCheck,
  IconPhone,
  IconMail,
  IconBadgeCheck,
  IconWrench,
  IconStar,
  IconTruck,
  IconHardHat,
  IconCog,
  IconZap,
  IconShield,
} from "@/components/ui/Icons";
import { PhoneLink } from "@/components/ui/PhoneLink";

// ─── Données membres ──────────────────────────────────────────────────────────

const MEMBERS = {
  "chef-agence": {
    initials: "TW",
    name: "Thomas Wciorka",
    role: "Directeur",
    phone: "06 72 56 31 27",
    email: "admin@amc2savoie.com",
    experience: "Directeur d'AMC — Alpes Matériel Compact",
    specialites: ["Direction d'agence", "WACKER NEUSON", "Magni", "Promove"],
    roleTitle: "Pilote de l'agence AMC",
    roleText:
      "En tant que chef d'agence, je supervise l'ensemble des activités d'AMC : de la relation client à la gestion des stocks, en passant par la coordination des équipes commerciales et techniques. Mon objectif : que chaque client trouve la solution adaptée à son chantier, dans les meilleurs délais.",
    competences: ["Gestion d'équipe", "Relation client", "Logistique", "Partenariats constructeurs"],
    domaines: [
      {
        icon: IconCog,
        titre: "Coordination d'équipe",
        texte: "Supervision quotidienne des équipes commerciales et techniques pour une réactivité maximale sur chaque demande client.",
      },
      {
        icon: IconStar,
        titre: "Relation client premium",
        texte: "Interlocuteur privilégié des grands comptes et des projets complexes qui nécessitent une attention particulière.",
      },
      {
        icon: IconTruck,
        titre: "Gestion stock & logistique",
        texte: "Pilotage des approvisionnements, des niveaux de stock et des délais de livraison sur toute la région Rhône-Alpes.",
      },
    ],
    image: "/images/photo-wacker-catalogue.jpg",
  },
  "responsable-sav": {
    initials: "RO",
    name: "Romain Bazingette",
    photo: "/images/about/equipe-amc.png",
    role: "Responsable SAV",
    phone: "06 32 64 71 63",
    email: "sav2@amc2savoie.com",
    experience: "18 ans d'expérience SAV",
    specialites: ["Certification SE+", "WACKER NEUSON", "Magni", "Diagnostic"],
    roleTitle: "Expert technique et réactivité",
    roleText:
      "Je coordonne toutes les interventions de notre service après-vente : diagnostics, réparations, entretiens préventifs et gestion des pièces détachées. Formé directement par WACKER NEUSON et Magni, j'assure des interventions rapides et conformes aux standards constructeurs.",
    competences: ["Diagnostic technique", "Réparation", "Pièces d'origine", "Maintenance préventive", "Formation constructeur"],
    domaines: [
      {
        icon: IconWrench,
        titre: "Diagnostic technique",
        texte: "Bancs de diagnostic homologués constructeurs et outillage spécifique pour des interventions précises et fiables.",
      },
      {
        icon: IconBadgeCheck,
        titre: "Certification SE+",
        texte: "Technicien certifié SE+ par WACKER NEUSON et Magni — garant de la qualité et de la conformité de chaque intervention.",
      },
      {
        icon: IconZap,
        titre: "Réactivité & urgences",
        texte: "Prise en charge rapide des pannes et immobilisations sur chantier, en atelier ou en déplacement sur site.",
      },
    ],
    image: "/images/Slide-3.jpg",
  },
  "commercial-1": {
    initials: "JS",
    name: "Jean-Pierre Sudre",
    role: "Commercial",
    phone: "06 75 73 62 33",
    experience: "Commercial spécialiste WACKER NEUSON & Magni",
    specialites: ["Chariots télescopiques et nacelles Magni", "Mini-pelles WN", "Dumpers", "Conseil"],
    roleTitle: "Spécialiste WACKER NEUSON & Magni",
    roleText:
      "Mon domaine de prédilection : les matériels de levage et de terrassement. Je vous accompagne de A à Z dans le choix de vos chariots télescopiques et nacelles Magni et de vos machines WACKER NEUSON — mini-pelles, dumpers, chargeuses. Je prends le temps de comprendre vos chantiers pour vous proposer le matériel le plus adapté.",
    competences: ["Chariots télescopiques et nacelles Magni", "Mini-pelles", "Dumpers", "Conseil technique", "Devis"],
    domaines: [
      {
        icon: IconStar,
        titre: "Chariots télescopiques et nacelles Magni",
        texte: "Expert de la gamme complète Magni : rotatifs, fixes, agricoles. Je trouve le bon ratio hauteur/portée pour votre chantier.",
      },
      {
        icon: IconHardHat,
        titre: "Mini-pelles & Dumpers WN",
        texte: "Connaissance approfondie de toute la gamme WACKER NEUSON : mini-pelles électriques, dumpers articulés, chargeuses compactes.",
      },
      {
        icon: IconCheck,
        titre: "Conseil & devis rapide",
        texte: "De la première demande jusqu'à la livraison : je gère votre dossier de A à Z avec des devis sous 24h.",
      },
    ],
    image: "/images/Magni-catalogue.avif",
  },
  "commercial-2": {
    initials: "VK",
    name: "Valentin Kint",
    role: "Commercial",
    phone: "06 73 60 11 33",
    experience: "Commercial spécialiste Promove Demolition",
    specialites: ["Promove Demolition", "Brise-roches", "Pinces", "Cisailles"],
    roleTitle: "Expert démolition & attachements",
    roleText:
      "Spécialisé dans les outils de démolition Promove, je vous aide à choisir le bon brise-roche, la bonne pince ou la bonne cisaille selon la puissance de votre pelle et la nature de vos travaux. Une bonne sélection d'attachement, c'est des chantiers plus rapides et plus rentables.",
    competences: ["Promove Demolition", "Brise-roches", "Pinces", "Cisailles", "Compatibilité pelles"],
    domaines: [
      {
        icon: IconHardHat,
        titre: "Brise-roches & cisailles",
        texte: "Sélection précise des outils Promove selon la classe de votre pelle, les débits hydrauliques disponibles et la nature des matériaux.",
      },
      {
        icon: IconWrench,
        titre: "Compatibilité pelle / outil",
        texte: "Audit de compatibilité hydraulique pour garantir que l'attachement choisi fonctionne parfaitement sur votre machine.",
      },
      {
        icon: IconZap,
        titre: "Optimisation chantier",
        texte: "Conseils pour maximiser la productivité : bon outil, bonne pression, bonne fréquence — moins de temps, plus de rendement.",
      },
    ],
    image: "/images/Slide-1.jpg",
  },
};

type MemberSlug = keyof typeof MEMBERS;

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(MEMBERS).map((slug) => ({ slug }));
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const member = MEMBERS[params.slug as MemberSlug];
  if (!member) return {};
  return {
    title: `${member.name} — ${member.role}`,
    description: `${member.roleText.slice(0, 140)}…`,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TeamMemberPage({ params }: { params: { slug: string } }) {
  const member = MEMBERS[params.slug as MemberSlug];
  if (!member) notFound();

  const displayName = member.name;

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="container-amc">
          {/* Breadcrumb */}
          <nav className="text-sm text-amc-text-secondary mb-10 flex items-center gap-2">
            <Link href="/" className="hover:text-amc-yellow-dark transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/a-propos" className="hover:text-amc-yellow-dark transition-colors">À propos</Link>
            <span>/</span>
            <span className="text-amc-text font-medium">{displayName}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            {/* Avatar — photo si disponible, sinon initiales */}
            <ScrollReveal from="left" className="flex-shrink-0">
              <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-amc-yellow flex items-center justify-center shadow-xl overflow-hidden">
                {"photo" in member && member.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.photo as string}
                    alt={`Photo ${member.name}`}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <span className="text-4xl md:text-5xl font-black text-amc-text">
                    {member.initials}
                  </span>
                )}
              </div>
            </ScrollReveal>

            {/* Infos */}
            <ScrollReveal from="right" className="flex-1 min-w-0">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-amc-yellow mb-3">
                {member.role}
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-amc-text mb-2">
                {displayName}
              </h1>
              <p className="text-amc-text-secondary text-sm mb-5">{member.experience}</p>

              {/* Badges spécialités */}
              <div className="flex flex-wrap gap-2 mb-8">
                {member.specialites.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 bg-amc-yellow/15 text-amc-text text-xs font-semibold rounded-full border border-amc-yellow/30"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="btn-primary rounded-lg"
                >
                  Envoyer un message <IconArrowRight size={16} />
                </a>
                {"phone" in member && member.phone ? (
                  <a href={`tel:${(member.phone as string).replace(/\s/g, "")}`} className="btn-secondary rounded-lg inline-flex items-center gap-2">
                    <IconPhone size={16} /> {member.phone as string}
                  </a>
                ) : (
                  <PhoneLink className="btn-secondary rounded-lg">
                    <IconPhone size={16} /> 04 26 78 43 90
                  </PhoneLink>
                )}
                {"email" in member && member.email && (
                  <a href={`mailto:${member.email as string}`} className="btn-secondary rounded-lg inline-flex items-center gap-2">
                    <IconMail size={16} /> {member.email as string}
                  </a>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── MON RÔLE ── */}
      <section className="bg-amc-cream py-24">
        <div className="container-amc">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            {/* Texte — 2/3 */}
            <ScrollReveal from="left" className="flex-[2] min-w-0">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amc-yellow mb-4">
                <IconBadgeCheck size={14} /> Mon rôle
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-amc-text leading-snug mb-5">
                {member.roleTitle}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-7">{member.roleText}</p>
              <div className="flex flex-wrap gap-2">
                {member.competences.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-amc-text bg-white border border-gray-200 rounded-full px-3 py-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amc-yellow flex-shrink-0" />
                    {c}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            {/* Image — 1/3 */}
            <ScrollReveal from="right" delay={160} className="flex-1 min-w-0 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.image}
                  alt={`${member.role} AMC`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-1 h-1/2 bg-amc-yellow" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── DOMAINES D'EXPERTISE ── */}
      <section className="bg-white py-24">
        <div className="container-amc">
          <ScrollReveal from="bottom">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amc-yellow mb-3">
                <IconStar size={14} /> Expertises
              </span>
              <h2 className="text-3xl font-black text-amc-text">
                Mes domaines d&apos;expertise
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {member.domaines.map((d, i) => {
              const Icon = d.icon;
              return (
                <ScrollReveal key={d.titre} from="bottom" delay={i * 120}>
                  <div className="group bg-amc-cream rounded-2xl p-8 hover:bg-amc-yellow transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-amc-yellow group-hover:bg-white flex items-center justify-center mb-6 transition-colors duration-300">
                      <Icon size={22} className="text-amc-text" />
                    </div>
                    <h3 className="text-lg font-black text-amc-text mb-3">{d.titre}</h3>
                    <p className="text-gray-600 group-hover:text-amc-text text-sm leading-relaxed transition-colors duration-300">
                      {d.texte}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FORMULAIRE ── */}
      <section id="contact" className="bg-amc-cream py-24">
        <div className="container-amc">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal from="bottom">
              <div className="text-center mb-10">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amc-yellow mb-3">
                  <IconPhone size={14} /> Contact direct
                </span>
                <h2 className="text-3xl font-black text-amc-text mb-3">
                  Contacter {displayName}
                </h2>
                <p className="text-gray-500 text-sm">
                  Votre message lui sera transmis directement. Réponse sous 24h ouvrées.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal from="bottom" delay={100}>
              <div className="bg-white rounded-2xl shadow-card p-8">
                <TeamMemberContactForm
                  memberName={member.name}
                  memberRole={member.role}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── CTA BAS ── */}
      <section className="bg-amc-cream py-14">
        <div className="container-amc">
          <ScrollReveal from="bottom">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-card border border-gray-100 px-8 py-10 text-center">
              <p className="text-amc-yellow font-semibold text-sm mb-5">
                Vous souhaitez rencontrer toute l&apos;équipe AMC ?
              </p>
              <Link
                href="/a-propos#equipe"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F3F4F6] text-[#1F2937] font-semibold text-sm rounded-lg hover:bg-[#E5E7EB] transition-colors"
              >
                <IconArrowRight size={14} className="rotate-180" />
                Découvrir toute l&apos;équipe
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
