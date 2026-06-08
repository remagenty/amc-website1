import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TeamMemberContactForm } from "@/components/a-propos/TeamMemberContactForm";
import {
  IconArrowRight,
  IconCheck,
  IconPhone,
  IconBadgeCheck,
  IconWrench,
  IconStar,
  IconTruck,
  IconHardHat,
  IconCog,
  IconZap,
  IconShield,
} from "@/components/ui/Icons";

// ─── Données membres ──────────────────────────────────────────────────────────

const MEMBERS = {
  "chef-agence": {
    initials: "CA",
    name: "À compléter",
    role: "Chef d'agence",
    experience: "XX ans d'expérience",
    specialites: ["Direction d'agence", "Wacker Neuson", "Magni", "Promove"],
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
    initials: "RS",
    name: "À compléter",
    role: "Responsable SAV",
    experience: "XX ans d'expérience",
    specialites: ["Certification SE+", "Wacker Neuson", "Magni", "Diagnostic"],
    roleTitle: "Expert technique et réactivité",
    roleText:
      "Je coordonne toutes les interventions de notre service après-vente : diagnostics, réparations, entretiens préventifs et gestion des pièces détachées. Formé directement par Wacker Neuson et Magni, j'assure des interventions rapides et conformes aux standards constructeurs.",
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
        texte: "Technicien certifié SE+ par Wacker Neuson et Magni — garant de la qualité et de la conformité de chaque intervention.",
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
    initials: "C1",
    name: "À compléter",
    role: "Commercial",
    experience: "XX ans d'expérience",
    specialites: ["Téléhandlers Magni", "Mini-pelles WN", "Dumpers", "Conseil"],
    roleTitle: "Spécialiste Wacker Neuson & Magni",
    roleText:
      "Mon domaine de prédilection : les matériels de levage et de terrassement. Je vous accompagne de A à Z dans le choix de vos téléhandlers Magni et de vos machines Wacker Neuson — mini-pelles, dumpers, chargeuses. Je prends le temps de comprendre vos chantiers pour vous proposer le matériel le plus adapté.",
    competences: ["Téléhandlers Magni", "Mini-pelles", "Dumpers", "Conseil technique", "Devis"],
    domaines: [
      {
        icon: IconStar,
        titre: "Téléhandlers Magni",
        texte: "Expert de la gamme complète Magni : rotatifs, fixes, agricoles. Je trouve le bon ratio hauteur/portée pour votre chantier.",
      },
      {
        icon: IconHardHat,
        titre: "Mini-pelles & Dumpers WN",
        texte: "Connaissance approfondie de toute la gamme Wacker Neuson : mini-pelles électriques, dumpers articulés, chargeuses compactes.",
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
    initials: "C2",
    name: "À compléter",
    role: "Commercial",
    experience: "XX ans d'expérience",
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
  "commercial-3": {
    initials: "C3",
    name: "À compléter",
    role: "Commercial",
    experience: "XX ans d'expérience",
    specialites: ["Suivi client", "Projets spéciaux", "Occasion", "Financement"],
    roleTitle: "Suivi client & projets sur mesure",
    roleText:
      "Je m'occupe du suivi de vos commandes, des demandes spécifiques et des projets qui nécessitent une attention particulière. Besoin d'un matériel en urgence ? D'une configuration spéciale ? Je suis votre interlocuteur pour toutes les demandes hors standard.",
    competences: ["Suivi commandes", "Projets spéciaux", "Urgences", "Financement", "Occasion"],
    domaines: [
      {
        icon: IconCheck,
        titre: "Suivi commandes",
        texte: "Point de contact unique pour le suivi de vos commandes, délais de livraison et mise en service de vos matériels.",
      },
      {
        icon: IconZap,
        titre: "Projets urgents",
        texte: "Mobilisation rapide pour les besoins immédiats : stock disponible, recherche occasion, locations longue durée.",
      },
      {
        icon: IconShield,
        titre: "Financement & occasion",
        texte: "Solutions de financement adaptées et sélection rigoureuse de matériels d'occasion certifiés par nos ateliers SE+.",
      },
    ],
    image: "/images/photo-wacker-catalogue.jpg",
  },
} as const;

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
  const displayName = member.name === "À compléter" ? member.role : member.name;
  return {
    title: `${displayName} — ${member.role} | AMC Alpes Matériel Compact`,
    description: `${member.roleText.slice(0, 140)}…`,
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TeamMemberPage({ params }: { params: { slug: string } }) {
  const member = MEMBERS[params.slug as MemberSlug];
  if (!member) notFound();

  const displayName = member.name === "À compléter" ? member.role : member.name;

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
            {/* Avatar */}
            <ScrollReveal from="left" className="flex-shrink-0">
              <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-amc-yellow flex items-center justify-center shadow-xl">
                <span className="text-4xl md:text-5xl font-black text-amc-text">
                  {member.initials}
                </span>
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
                <a href="tel:+33426784390" className="btn-secondary rounded-lg">
                  <IconPhone size={16} /> 04 26 78 43 90
                </a>
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
                  Contacter {displayName === member.role ? "ce conseiller" : displayName}
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
      <section className="bg-white py-14 border-t border-gray-100">
        <div className="container-amc text-center">
          <ScrollReveal from="bottom">
            <p className="text-amc-yellow font-semibold text-sm mb-4">
              Vous souhaitez rencontrer toute l&apos;équipe AMC ?
            </p>
            <Link
              href="/a-propos#equipe"
              className="inline-flex items-center gap-2 text-amc-yellow font-bold text-sm hover:text-amc-yellow-dark transition-colors"
            >
              ← Découvrir toute l&apos;équipe
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
