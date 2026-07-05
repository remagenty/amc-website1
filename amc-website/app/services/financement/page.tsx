import type { Metadata } from "next";
import Link from "next/link";
import { kvGet } from "@/lib/kv";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  IconArrowRight,
  IconCheck,
  IconPhone,
  IconShield,
  IconStar,
  IconBadgeCheck,
  IconTruck,
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

const DEFAULT_SERVICE_FINANCEMENT: Service = {
  slug: "financement",
  title: "Solutions de financement",
  description:
    "AMC vous propose des solutions de financement adaptées à votre activité et à vos besoins pour l'acquisition de matériels de chantier neufs ou d'occasion.",
  heroImage: null,
  keyPoints: [
    "Crédit-bail : gardez votre trésorerie pour votre activité",
    "LOA (Location avec Option d'Achat) : flexibilité maximale",
    "Financement classique avec nos partenaires bancaires",
    "Réponse sous 48h après dépôt du dossier",
    "Accompagnement personnalisé par nos conseillers",
  ],
  ctaText: "Demander un devis financement",
  ctaHref: "/devis?type=financement",
};

export const metadata: Metadata = {
  title: { absolute: "Financement matériels de chantier | AMC" },
  description: "Financez vos équipements de chantier avec nos solutions sur mesure. Leasing, crédit-bail, LOA. Durée 24-60 mois, sans apport obligatoire.",
  openGraph: {
    title: "Solutions de financement | AMC",
    description: "Financez vos équipements de chantier avec nos solutions sur mesure. Leasing, crédit-bail, LOA. Durée 24-60 mois, sans apport obligatoire.",
    images: [{ url: "/images/immage-accueil-site-internet.png" }],
    type: "website",
    url: `https://www.amc-savoie.fr/services/financement`,
    siteName: "AMC — Alpes Matériel Compact",
  },
};

const TYPES_FINANCEMENT = [
  {
    icon: IconShield,
    titre: "Crédit-bail / Leasing",
    texte: "Vous utilisez le matériel sans en être propriétaire. Loyers déductibles fiscalement, trésorerie préservée. À l'issue du contrat, option d'achat, restitution ou renouvellement.",
    avantages: ["Loyers déductibles du résultat fiscal", "Matériel renouvelable à l'échéance", "Bilan non alourdi"],
  },
  {
    icon: IconStar,
    titre: "Location avec option d'achat (LOA)",
    texte: "Vous louez le matériel avec la possibilité de l'acheter à la valeur résiduelle en fin de contrat. Solution flexible qui combine les avantages de la location et de l'achat.",
    avantages: ["Option d'achat à la fin", "Mensualités fixes et prévisibles", "Pas d'immobilisation de capital"],
  },
  {
    icon: IconBadgeCheck,
    titre: "Financement classique",
    texte: "Vous devenez propriétaire du matériel dès la livraison. Remboursement sur une durée adaptée à votre activité, avec apport ou sans apport selon votre situation.",
    avantages: ["Propriété immédiate du bien", "Durée adaptable 24–60 mois", "Financement total ou partiel"],
  },
];

const ETAPES = [
  {
    num: "01",
    titre: "Choisissez votre matériel",
    texte: "Sélectionnez le matériel avec notre équipe commerciale. Nous établissons un devis complet incluant la mise en service.",
  },
  {
    num: "02",
    titre: "Étude de financement",
    texte: "Nous transmettons votre dossier à nos partenaires financiers. Étude réalisée rapidement, retour sous quelques jours ouvrés.",
  },
  {
    num: "03",
    titre: "Livraison & mise en service",
    texte: "Dès l'accord de financement obtenu, nous organisons la livraison et la mise en service du matériel sur votre site.",
  },
];

export default async function FinancementPage() {
  const services = await kvGet<Record<string, Service>>("services");
  const data = services?.financement ?? DEFAULT_SERVICE_FINANCEMENT;
  const heroSrc = data.heroImage ?? "/images/Magni-catalogue.avif";

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "420px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroSrc}
          alt="Financement matériels de chantier AMC"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.62)" }} />
        <div className="relative z-10 container-amc py-24 flex flex-col items-start justify-end h-full min-h-[420px]">
          <nav className="text-xs text-white/50 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-white/80">Financement</span>
          </nav>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amc-yellow text-amc-text text-xs font-bold mb-5 uppercase tracking-wider">
            <IconStar size={14} /> Solutions financières
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
              <IconPhone size={16} /> Nous appeler
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

      {/* ── POURQUOI FINANCER ── */}
      <section className="bg-white py-20">
        <div className="container-amc">
          <ScrollReveal from="bottom">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amc-yellow mb-3">
                <IconBadgeCheck size={14} /> Avantages
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-amc-text mb-5">
                Pourquoi financer votre matériel ?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                L&apos;acquisition de matériels de chantier représente un investissement important.
                Le financement vous permet d&apos;équiper votre entreprise immédiatement tout en
                préservant votre trésorerie pour vos besoins opérationnels.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: IconShield, titre: "Trésorerie préservée", texte: "Pas d'immobilisation de capital. Vos liquidités restent disponibles pour l'activité courante." },
              { icon: IconStar, titre: "Équipement immédiat", texte: "Le matériel est disponible dès l'accord de financement, sans attendre d'accumuler les fonds." },
              { icon: IconBadgeCheck, titre: "Mensualités adaptées", texte: "La durée et le montant des loyers ou remboursements sont calés sur votre activité et vos flux." },
              { icon: IconTruck, titre: "Plus de matériel", texte: "Financer un équipement libère le budget pour en acquérir d'autres ou investir dans d'autres postes." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.titre} from="bottom">
                  <div className="bg-amc-cream rounded-2xl p-6 text-center group hover:bg-amc-yellow transition-colors duration-300">
                    <div className="w-12 h-12 rounded-xl bg-amc-yellow group-hover:bg-white flex items-center justify-center mb-4 mx-auto transition-colors duration-300">
                      <Icon size={20} className="text-amc-text" />
                    </div>
                    <h3 className="font-bold text-amc-text mb-2 text-sm">{item.titre}</h3>
                    <p className="text-gray-600 group-hover:text-amc-text text-xs leading-relaxed transition-colors duration-300">{item.texte}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TYPES DE FINANCEMENT ── */}
      <section className="bg-amc-cream py-20">
        <div className="container-amc">
          <ScrollReveal from="bottom">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amc-yellow mb-3">
                <IconStar size={14} /> Nos solutions
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-amc-text mb-3">
                Types de financement disponibles
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TYPES_FINANCEMENT.map((type, i) => {
              const Icon = type.icon;
              return (
                <ScrollReveal key={type.titre} from="bottom" delay={i * 80}>
                  <div className="bg-white rounded-2xl shadow-card p-8 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-xl bg-amc-yellow flex items-center justify-center mb-5">
                      <Icon size={22} className="text-amc-text" />
                    </div>
                    <h3 className="font-bold text-amc-text mb-3">{type.titre}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5">{type.texte}</p>
                    <ul className="space-y-2 mt-auto">
                      {type.avantages.map((av) => (
                        <li key={av} className="flex items-start gap-2 text-xs text-gray-700">
                          <span className="mt-0.5 w-4 h-4 rounded-full bg-amc-yellow flex-shrink-0 flex items-center justify-center">
                            <IconCheck size={9} className="text-amc-text" />
                          </span>
                          {av}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section className="bg-amc-gray py-20">
        <div className="container-amc">
          <ScrollReveal from="bottom">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amc-yellow mb-3">
                <IconArrowRight size={14} /> En 3 étapes
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                Comment ça marche ?
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {ETAPES.map((etape, i) => (
              <ScrollReveal key={etape.num} from="bottom" delay={i * 100}>
                <div className="relative">
                  {i < ETAPES.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-px bg-white/10 z-0" />
                  )}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="text-3xl font-black text-amc-yellow mb-4">{etape.num}</div>
                    <h3 className="font-bold text-white mb-2 text-sm">{etape.titre}</h3>
                    <p className="text-white/60 text-xs leading-relaxed">{etape.texte}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal from="bottom">
            <div className="text-center">
              <Link href="/devis?type=financement" className="btn-primary">
                Demander une étude de financement <IconArrowRight size={16} />
              </Link>
              <p className="text-white/50 text-xs mt-4">Sans engagement — Étude gratuite</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── NOTE LÉGALE ── */}
      <div className="bg-white py-6 border-t border-gray-100">
        <div className="container-amc max-w-3xl">
          <p className="text-xs text-gray-400 leading-relaxed text-center">
            Les solutions de financement sont proposées en partenariat avec des organismes financiers agréés.
            Sous réserve d&apos;acceptation du dossier. AMC intervient en qualité d&apos;intermédiaire et ne prend
            aucune décision de crédit.
          </p>
        </div>
      </div>
    </>
  );
}
