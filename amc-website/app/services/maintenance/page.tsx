import type { Metadata } from "next";
import Link from "next/link";
import { kvGet } from "@/lib/kv";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  IconArrowRight,
  IconCheck,
  IconWrench,
  IconBadgeCheck,
  IconPhone,
  IconShield,
  IconCog,
  IconZap,
} from "@/components/ui/Icons";
import { PhoneLink } from "@/components/ui/PhoneLink";

export const dynamic = "force-dynamic";

type Service = {
  slug: string;
  title: string;
  description: string;
  heroImage: string | null;
  keyPoints: string[];
  ctaText: string;
  ctaHref: string;
};

const DEFAULT_SERVICE_MAINTENANCE: Service = {
  slug: "maintenance",
  title: "SAV & Maintenance",
  description:
    "Notre atelier certifié prend en charge la maintenance préventive, les réparations et la fourniture de pièces d'origine pour tous vos équipements de chantier.",
  heroImage: null,
  keyPoints: [
    "Maintenance préventive selon les préconisations constructeur",
    "Réparations toutes marques",
    "Pièces détachées d'origine WACKER NEUSON, Magni, Promove",
    "Intervention rapide — atelier et déplacement sur site",
    "Techniciens certifiés usine",
    "Contrats d'entretien annuels disponibles",
  ],
  ctaText: "Prendre rendez-vous SAV",
  ctaHref: "/contact?type=sav",
};

export const metadata: Metadata = {
  title: { absolute: "Maintenance préventive matériels chantier | AMC" },
  description: "Contrats de maintenance préventive pour vos engins de chantier. Techniciens certifiés, planning personnalisé, rapport après intervention.",
  openGraph: {
    title: "Maintenance préventive | AMC",
    description: "Contrats de maintenance préventive pour vos engins de chantier. Techniciens certifiés, planning personnalisé, rapport après intervention.",
    images: [{ url: "/images/Slide-3.jpg" }],
    type: "website",
    url: `https://www.amc-savoie.fr/services/maintenance`,
    siteName: "AMC — Alpes Matériel Compact",
  },
};

const INCLUS = [
  { icon: IconCog, titre: "Vidange & filtres", texte: "Remplacement des huiles moteur, hydraulique et transmission. Filtres à air, carburant et hydraulique selon préconisations constructeur." },
  { icon: IconWrench, titre: "Courroies & transmissions", texte: "Contrôle et remplacement des courroies d'alternateur et de distribution, vérification des accouplements et joints." },
  { icon: IconZap, titre: "Contrôle hydraulique", texte: "Vérification des pressions, flexibles, vérins et distributeurs. Détection précoce des fuites et usures." },
  { icon: IconShield, titre: "Graissage & lubrification", texte: "Graissage complet des articulations, pivots et goujons selon les points de graissage définis par le constructeur." },
  { icon: IconBadgeCheck, titre: "Diagnostic électronique", texte: "Lecture des codes défauts via outillage homologué constructeur. Mise à jour des paramètres moteur si nécessaire." },
  { icon: IconCheck, titre: "Contrôle général", texte: "Inspection visuelle des pneus ou chenilles, éclairages, niveaux, structure et dispositifs de sécurité." },
];

const FREQUENCES = [
  {
    machine: "Compacteurs & rouleaux",
    image: "/images/photo-wacker-catalogue.jpg",
    intervalles: [
      { label: "Entretien courant", freq: "Toutes les 125 h" },
      { label: "Entretien périodique", freq: "Toutes les 250 h" },
      { label: "Révision complète", freq: "Toutes les 500 h" },
    ],
  },
  {
    machine: "Mini-pelles & pelles compactes",
    image: "/images/immage-accueil-site-internet.png",
    intervalles: [
      { label: "Entretien courant", freq: "Toutes les 250 h" },
      { label: "Entretien périodique", freq: "Toutes les 500 h" },
      { label: "Révision complète", freq: "Toutes les 1 000 h" },
    ],
  },
  {
    machine: "Dumpers articulés",
    image: "/images/Slide-3.jpg",
    intervalles: [
      { label: "Entretien courant", freq: "Toutes les 250 h" },
      { label: "Entretien périodique", freq: "Toutes les 500 h" },
      { label: "Révision complète", freq: "Toutes les 1 000 h" },
    ],
  },
  {
    machine: "Télescopiques Magni",
    image: "/images/Magni-catalogue.avif",
    intervalles: [
      { label: "Entretien courant", freq: "Toutes les 250 h" },
      { label: "Entretien périodique", freq: "Toutes les 500 h" },
      { label: "Révision complète", freq: "Toutes les 1 000 h" },
    ],
  },
];

export default async function MaintenancePage() {
  const services = await kvGet<Record<string, Service>>("services");
  const data = services?.maintenance ?? DEFAULT_SERVICE_MAINTENANCE;
  const heroSrc = data.heroImage ?? "/images/Slide-3.jpg";

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "420px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroSrc}
          alt="Maintenance préventive AMC"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.60)" }} />
        <div className="relative z-10 container-amc py-24 flex flex-col items-start justify-end h-full min-h-[420px]">
          <nav className="text-xs text-white/50 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-white/80">Maintenance préventive</span>
          </nav>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amc-yellow text-amc-text text-xs font-bold mb-5 uppercase tracking-wider">
            <IconWrench size={14} /> Service AMC
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            {data.title}
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mb-8">
            {data.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={data.ctaHref} className="btn-primary">
              {data.ctaText} <IconArrowRight size={16} />
            </Link>
            <PhoneLink className="btn-outline">
              <IconPhone size={16} /> Appeler l&apos;atelier
            </PhoneLink>
          </div>
        </div>
      </section>

      {/* ── KEY POINTS ── */}
      {data.keyPoints.length > 0 && (
        <section className="bg-amc-yellow py-8">
          <div className="container-amc">
            <ul className="flex flex-wrap gap-x-8 gap-y-2 justify-center">
              {data.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <span className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── POURQUOI ── */}
      <section className="bg-white py-20">
        <div className="container-amc">
          <ScrollReveal from="bottom">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amc-yellow mb-3">
                <IconBadgeCheck size={14} /> Pourquoi entretenir préventivement
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-amc-text mb-5">
                Anticiper plutôt que subir
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Un engin mal entretenu coûte bien plus cher en réparations imprévues qu&apos;un contrat
                de maintenance régulier. La maintenance préventive réduit les pannes, allonge la durée
                de vie des machines et garantit la disponibilité de vos engins sur les chantiers.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: IconShield,
                titre: "Moins de pannes",
                texte: "En remplaçant les pièces d'usure avant leur défaillance, on évite les immobilisations imprévues sur chantier.",
              },
              {
                icon: IconCog,
                titre: "Réduction des coûts",
                texte: "Le coût d'un entretien préventif est nettement inférieur à celui d'une réparation majeure causée par un manque d'entretien.",
              },
              {
                icon: IconBadgeCheck,
                titre: "Garantie préservée",
                texte: "Un entretien réalisé selon les préconisations constructeur par un atelier agréé préserve intégralement la garantie constructeur.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.titre} from="bottom">
                  <div className="bg-amc-cream rounded-2xl p-8 group hover:bg-amc-yellow transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-amc-yellow group-hover:bg-white flex items-center justify-center mb-5 transition-colors duration-300">
                      <Icon size={22} className="text-amc-text" />
                    </div>
                    <h3 className="font-bold text-amc-text mb-3">{item.titre}</h3>
                    <p className="text-gray-600 group-hover:text-amc-text text-sm leading-relaxed transition-colors duration-300">{item.texte}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CE QUI EST INCLUS ── */}
      <section className="bg-amc-cream py-20">
        <div className="container-amc">
          <ScrollReveal from="bottom">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amc-yellow mb-3">
                <IconWrench size={14} /> Nos interventions
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-amc-text mb-3">
                Ce qui est inclus
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
                Chaque intervention de maintenance préventive comprend les opérations suivantes,
                réalisées par nos techniciens certifiés.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INCLUS.map((item, i) => {
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

      {/* ── FRÉQUENCES ── */}
      <section className="bg-white py-20">
        <div className="container-amc">
          <ScrollReveal from="bottom">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amc-yellow mb-3">
                <IconCog size={14} /> Intervalles recommandés
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-amc-text mb-3">
                Fréquences par type de machine
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
                Les intervalles ci-dessous sont indicatifs et basés sur les préconisations constructeur.
                Ils peuvent varier selon les conditions d&apos;utilisation.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FREQUENCES.map((machine, i) => (
              <ScrollReveal key={machine.machine} from="bottom" delay={i * 80}>
                <div className="bg-amc-cream rounded-2xl overflow-hidden shadow-card">
                  <div className="aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={machine.image} alt={machine.machine} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-amc-text text-sm mb-4">{machine.machine}</h3>
                    <div className="space-y-2">
                      {machine.intervalles.map((item) => (
                        <div key={item.label} className="flex justify-between items-center text-xs">
                          <span className="text-gray-500">{item.label}</span>
                          <span className="font-semibold text-amc-text bg-amc-yellow/20 px-2 py-0.5 rounded-full">{item.freq}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTRATS ── */}
      <section className="bg-amc-cream py-20">
        <div className="container-amc">
          <ScrollReveal from="bottom">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amc-yellow mb-3">
                <IconShield size={14} /> Sur mesure
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-amc-text mb-3">
                Nos contrats d&apos;entretien
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
                Un contrat adapté à votre flotte, votre activité et vos horaires de chantier.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {[
              {
                titre: "Planning personnalisé",
                texte: "Chaque engin dispose de son propre calendrier d'entretien basé sur son kilométrage ou son compteur horaire.",
              },
              {
                titre: "Rapport après intervention",
                texte: "Un rapport détaillé vous est remis après chaque passage : opérations réalisées, pièces remplacées, observations.",
              },
              {
                titre: "Priorité atelier",
                texte: "Les clients sous contrat bénéficient d'un accès prioritaire à l'atelier et de délais de prise en charge réduits.",
              },
            ].map((item) => (
              <ScrollReveal key={item.titre} from="bottom">
                <div className="bg-white rounded-2xl shadow-card p-6">
                  <div className="w-8 h-8 rounded-lg bg-amc-yellow flex items-center justify-center mb-4">
                    <IconCheck size={14} className="text-amc-text" />
                  </div>
                  <h3 className="font-bold text-amc-text mb-2 text-sm">{item.titre}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.texte}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal from="bottom">
            <div className="text-center">
              <Link href="/devis?type=maintenance" className="btn-primary">
                Demander un contrat d&apos;entretien <IconArrowRight size={16} />
              </Link>
              <p className="text-gray-400 text-xs mt-4">
                Devis gratuit — Réponse sous 24h ouvrées
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
