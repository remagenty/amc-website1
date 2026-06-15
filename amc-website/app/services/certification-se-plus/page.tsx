import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  IconArrowRight,
  IconCheck,
  IconPhone,
  IconShield,
  IconBadgeCheck,
  IconWrench,
  IconZap,
  IconCog,
} from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Certification SE+ | AMC — Alpes Matériel Compact",
  description:
    "Atelier AMC certifié SE+ par Wacker Neuson. Techniciens formés en usine, pièces d'origine, outillage homologué. La référence qualité du SAV compact en Rhône-Alpes.",
};

const GARANTIES = [
  {
    icon: IconBadgeCheck,
    titre: "Interventions aux normes constructeur",
    texte: "Chaque intervention respecte scrupuleusement les procédures définies par Wacker Neuson, Magni et Promove Demolition. Aucun écart par rapport au standard.",
  },
  {
    icon: IconCog,
    titre: "Pièces d'origine uniquement",
    texte: "Nous n'utilisons que des pièces détachées 100 % d'origine constructeur, avec traçabilité complète. Aucune pièce générique ou non homologuée.",
  },
  {
    icon: IconWrench,
    titre: "Outillage homologué",
    texte: "Nos bancs de diagnostic, outils de mesure et équipements sont homologués par les constructeurs et régulièrement calibrés et mis à jour.",
  },
  {
    icon: IconShield,
    titre: "Garantie constructeur préservée",
    texte: "Un entretien ou une réparation réalisée par un atelier certifié SE+ préserve intégralement la garantie constructeur sur le matériel.",
  },
  {
    icon: IconZap,
    titre: "Diagnostic électronique avancé",
    texte: "Lecture et effacement des codes défauts via interfaces constructeurs officielles. Accès aux paramètres internes et mises à jour firmware.",
  },
  {
    icon: IconCheck,
    titre: "Rapport d'intervention certifié",
    texte: "Chaque intervention donne lieu à un rapport détaillé et signé, archivé dans l'historique de la machine. Traçabilité totale de la vie de l'engin.",
  },
];

const MARQUES = [
  {
    logo: "/images/logo-wacker.png",
    name: "Wacker Neuson",
    alt: "Logo Wacker Neuson",
    desc: "Certification SE+ pour l'ensemble de la gamme : mini-pelles, dumpers, compacteurs, chargeuses compactes et vibrateurs.",
    color: "border-red-200 bg-red-50/30",
  },
  {
    logo: "/images/logo-magni.png",
    name: "Magni",
    alt: "Logo Magni",
    desc: "Habilitation constructeur pour les téléhandlers rotatifs et fixes Magni : maintenance, réparation et diagnostic.",
    color: "border-blue-200 bg-blue-50/30",
  },
  {
    logo: "/images/logo-promove.jpg",
    name: "Promove Demolition",
    alt: "Logo Promove Demolition",
    desc: "Agréé pour l'entretien et la réparation des brise-roches, pinces et cisailles de la gamme Promove.",
    color: "border-orange-200 bg-orange-50/30",
  },
];

export default function CertificationSePlusPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "420px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/Slide-3.jpg"
          alt="Atelier certifié SE+ AMC"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.60)" }} />
        <div className="relative z-10 container-amc py-24 flex flex-col items-start justify-end h-full min-h-[420px]">
          <nav className="text-xs text-white/50 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/sav" className="hover:text-white transition-colors">SAV</Link>
            <span>/</span>
            <span className="text-white/80">Certification SE+</span>
          </nav>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amc-yellow text-amc-text text-xs font-bold mb-5 uppercase tracking-wider">
            <IconBadgeCheck size={14} /> Programme qualité
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Certification SE+
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mb-8">
            La référence qualité du SAV compact. Le programme SE+ de Wacker Neuson
            garantit des techniciens formés en usine et des interventions conformes
            aux standards constructeur.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/devis?type=sav" className="btn-primary">
              Prendre rendez-vous SAV <IconArrowRight size={16} />
            </Link>
            <a href="tel:+33426784390" className="btn-outline">
              <IconPhone size={16} /> Appeler l&apos;atelier
            </a>
          </div>
        </div>
      </section>

      {/* ── QU'EST-CE QUE SE+ ── */}
      <section className="bg-white py-20">
        <div className="container-amc">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <ScrollReveal from="left" className="flex-1 min-w-0">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amc-yellow mb-4">
                <IconBadgeCheck size={14} /> Définition
              </span>
              <h2 className="text-3xl font-black text-amc-text mb-5">
                Qu&apos;est-ce que la certification SE+ ?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                SE+ est le programme qualité de <strong>Wacker Neuson</strong> dédié aux distributeurs SAV.
                Il certifie qu&apos;un atelier et ses techniciens ont suivi la formation officielle du constructeur,
                maîtrisent les gammes de produits et disposent de l&apos;outillage homologué nécessaire.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Cette certification est accordée après audit du constructeur et renouvelée régulièrement.
                Elle s&apos;applique chez AMC à l&apos;ensemble des marques distribuées :
                Wacker Neuson, Magni et Promove Demolition.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Formation en usine", "Audit constructeur", "Renouvellement régulier", "Outillage homologué"].map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amc-yellow/15 text-amc-text text-xs font-semibold rounded-full">
                    <IconCheck size={11} />
                    {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal from="right" delay={160} className="flex-1 min-w-0 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/photo-wacker-catalogue.jpg"
                  alt="Technicien AMC certifié SE+"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 right-0 w-1 h-1/2 bg-amc-yellow" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── GARANTIES POUR LE CLIENT ── */}
      <section className="bg-amc-cream py-20">
        <div className="container-amc">
          <ScrollReveal from="bottom">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amc-yellow mb-3">
                <IconShield size={14} /> Pour vous
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-amc-text mb-3">
                Ce que ça garantit pour le client
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
                Confier votre engin à un atelier certifié SE+ offre des garanties concrètes
                sur la qualité et la fiabilité de chaque intervention.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GARANTIES.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.titre} from="bottom" delay={i * 60}>
                  <div className="bg-white rounded-2xl shadow-card p-6">
                    <div className="w-10 h-10 rounded-xl bg-amc-yellow flex items-center justify-center mb-4">
                      <Icon size={18} className="text-amc-text" />
                    </div>
                    <h3 className="font-bold text-amc-text mb-2 text-sm">{item.titre}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.texte}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── NOTRE ENGAGEMENT SE+ ── */}
      <section className="bg-amc-gray py-20">
        <div className="container-amc">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            <ScrollReveal from="right" className="flex-1 min-w-0 w-full order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/Slide-1.jpg"
                  alt="Atelier AMC Saint-Félix"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-1 h-1/2 bg-amc-yellow" />
              </div>
            </ScrollReveal>

            <ScrollReveal from="left" className="flex-1 min-w-0 order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amc-yellow mb-4">
                <IconBadgeCheck size={14} /> AMC Saint-Félix
              </span>
              <h2 className="text-3xl font-black text-white mb-5">
                Notre engagement SE+ chez AMC
              </h2>
              <p className="text-white/75 leading-relaxed mb-6">
                Depuis l&apos;obtention de notre certification SE+, nous maintenons des standards
                stricts dans notre atelier de Saint-Félix. Chaque technicien est formé directement
                en usine par les équipes constructeurs.
              </p>
              <ul className="space-y-3">
                {[
                  "Techniciens formés en usine Wacker Neuson, Magni et Promove",
                  "Certifications individuelles à jour pour chaque technicien",
                  "Atelier équipé aux normes SE+ : bancs de diagnostic, outillage calibré",
                  "Stock de pièces d'origine en accès direct",
                  "Accès aux bulletins techniques et mises à jour constructeurs",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-amc-yellow flex-shrink-0 flex items-center justify-center">
                      <IconCheck size={11} className="text-amc-text" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── MARQUES COUVERTES ── */}
      <section className="bg-white py-20">
        <div className="container-amc">
          <ScrollReveal from="bottom">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amc-yellow mb-3">
                <IconBadgeCheck size={14} /> Agréments
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-amc-text mb-3">
                Les marques couvertes
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
                Notre certification couvre l&apos;ensemble des marques distribuées par AMC.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {MARQUES.map((brand) => (
              <ScrollReveal key={brand.name} from="bottom">
                <div className={`rounded-2xl border-2 p-6 flex flex-col items-center text-center ${brand.color}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.logo}
                    alt={brand.alt}
                    className="h-10 w-auto object-contain mb-4"
                  />
                  <h3 className="font-bold text-amc-text text-sm mb-2">{brand.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">{brand.desc}</p>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amc-yellow/20 text-amc-text text-xs font-semibold">
                    <IconCheck size={11} />
                    Certifié SE+
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-amc-cream py-16">
        <div className="container-amc text-center">
          <ScrollReveal from="bottom">
            <h2 className="text-3xl font-black text-amc-text mb-4">
              Confier votre engin à notre atelier certifié
            </h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto text-sm">
              Prenez rendez-vous pour un diagnostic, une réparation ou un entretien préventif.
              Réponse sous 24h ouvrées.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/devis?type=sav" className="btn-primary">
                Prendre rendez-vous SAV <IconArrowRight size={16} />
              </Link>
              <a href="tel:+33426784390" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-amc-text text-amc-text font-semibold hover:bg-amc-text hover:text-white transition-colors">
                <IconPhone size={16} /> 04 26 78 43 90
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
