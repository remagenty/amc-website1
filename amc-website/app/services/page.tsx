import type { Metadata } from "next";
import Link from "next/link";
import { SEBadge } from "@/components/ui/SEBadge";
import {
  IconWrench,
  IconShield,
  IconCog,
  IconStar,
  IconCheck,
  IconArrowRight,
  IconPhone,
  IconBadgeCheck,
} from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Services — SAV certifié SE+, pièces détachées, maintenance | AMC",
  description:
    "AMC propose un service après-vente certifié SE+ : maintenance préventive, réparations, pièces d'origine Wacker Neuson, Magni, Promove. Intervention rapide à Saint-Félix.",
};

const SERVICES = [
  {
    id: "sav",
    icon: <IconWrench size={32} className="text-amc-yellow" />,
    title: "Service Après-Vente",
    subtitle: "Certifié SE+",
    se: true,
    description:
      "Notre atelier SAV certifié SE+ est équipé pour entretenir et réparer tous les équipements Wacker Neuson, Magni et Promove Demolition. Nos techniciens qualifiés interviennent rapidement pour minimiser l'immobilisation de vos machines.",
    features: [
      "Diagnostic électronique complet",
      "Réparations moteur et hydraulique",
      "Révisions constructeur",
      "Interventions sur site disponibles",
      "Délai d'intervention rapide",
    ],
    href: "#contact-sav",
  },
  {
    id: "pieces",
    icon: <IconCog size={32} className="text-amc-yellow" />,
    title: "Pièces détachées",
    subtitle: "Origine constructeur",
    se: false,
    description:
      "Stock de pièces d'origine pour Wacker Neuson, Magni et Promove Demolition. Commande rapide et livraison express. Toutes les pièces sont certifiées d'origine pour garantir la performance et la durée de vie de vos équipements.",
    features: [
      "Pièces d'origine garanties",
      "Stock important disponible",
      "Commande par référence",
      "Livraison express disponible",
      "Conseil technique inclus",
    ],
    href: "/contact?type=pieces",
  },
  {
    id: "maintenance",
    icon: <IconShield size={32} className="text-amc-yellow" />,
    title: "Maintenance préventive",
    subtitle: "Contrats sur mesure",
    se: false,
    description:
      "Nos contrats de maintenance préventive vous permettent d'anticiper les pannes et d'optimiser la disponibilité de votre parc de machines. Planification des entretiens selon les recommandations constructeurs.",
    features: [
      "Entretiens périodiques planifiés",
      "Contrats maintenance pluriannuels",
      "Rapport d'état détaillé",
      "Suivi du parc machines",
      "Optimisation des coûts d'exploitation",
    ],
    href: "/contact?type=maintenance",
  },
];

const CERTIFICATION_POINTS = [
  "Formation technique certifiée par les constructeurs",
  "Utilisation exclusive de pièces d'origine",
  "Outillage spécifique agréé",
  "Respect des procédures constructeurs",
  "Traçabilité complète des interventions",
  "Audit qualité régulier",
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-amc-cream">
      {/* Hero */}
      <section className="bg-amc-gray text-white py-16 md:py-24">
        <div className="container-amc">
          <div className="max-w-3xl">
            <div className="mb-6">
              <SEBadge size="lg" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
              Service après-vente expert
            </h1>
            <p className="mt-5 text-lg text-white/75 leading-relaxed">
              AMC dispose d'un atelier certifié SE+ pour assurer la maintenance, la réparation et la
              fourniture de pièces d'origine pour tous vos équipements de chantier.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact?type=sav" className="btn-primary rounded-lg">
                Prendre rendez-vous <IconArrowRight size={16} />
              </Link>
              <a href="tel:+33450000000" className="btn-outline rounded-lg">
                <IconPhone size={16} />
                Appeler directement
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Certification SE+ */}
      <section id="certification" className="bg-white py-16">
        <div className="container-amc">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">
                La certification SE+, c'est quoi ?
              </h2>
              <p className="text-amc-text-secondary mt-4 leading-relaxed">
                La certification SE+ est la référence qualité pour le service après-vente des équipements de
                chantier compacts. Elle garantit que les techniciens sont formés, équipés et certifiés par les
                constructeurs pour intervenir sur leurs matériels dans les règles de l'art.
              </p>
              <ul className="mt-6 space-y-3">
                {CERTIFICATION_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <IconBadgeCheck size={18} className="text-amc-yellow flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-amc-text">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amc-yellow rounded-2xl p-10 text-center">
              <SEBadge size="lg" />
              <div className="mt-6 text-4xl font-black text-amc-text">SE+</div>
              <p className="text-amc-text/70 text-sm mt-2 mb-6">
                Service Expert Plus — La certification d'excellence
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "3", label: "Constructeurs agréés" },
                  { value: "100%", label: "Pièces d'origine" },
                  { value: "48h", label: "Délai d'intervention" },
                  { value: "∞", label: "Garantie qualité" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white/50 rounded-xl p-3">
                    <div className="text-2xl font-black text-amc-text">{stat.value}</div>
                    <div className="text-xs text-amc-text/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services détaillés */}
      <section className="section-padding">
        <div className="container-amc">
          <h2 className="section-title text-center mb-12">Nos services</h2>
          <div className="space-y-8">
            {SERVICES.map((service, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className={`bg-white rounded-2xl shadow-card overflow-hidden flex flex-col md:flex-row${
                    !isEven ? " md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Colonne texte */}
                  <div className="flex-1 p-8">
                    <div className="p-3 rounded-xl bg-amc-yellow/10 w-fit mb-5">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-amc-text flex items-center gap-2">
                      {service.title}
                      {service.se && <SEBadge size="sm" />}
                    </h3>
                    <p className="text-amc-yellow-dark font-semibold text-sm mt-1">
                      {service.subtitle}
                    </p>
                    <p className="text-amc-text-secondary mt-4 leading-relaxed text-sm">
                      {service.description}
                    </p>
                    <ul className="mt-5 space-y-3">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm text-amc-text">
                          <div className="w-6 h-6 rounded-full bg-amc-yellow/20 flex items-center justify-center flex-shrink-0">
                            <IconCheck size={12} className="text-amc-yellow-dark" />
                          </div>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link href={service.href} className="btn-primary mt-6 rounded-lg text-sm">
                      Nous contacter <IconArrowRight size={14} />
                    </Link>
                  </div>
                  {/* Colonne image */}
                  <div className="flex-1 min-h-[260px] md:min-h-0 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm font-medium">Photo à venir</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA contact SAV */}
      <section id="contact-sav" className="bg-amc-yellow py-16">
        <div className="container-amc text-center">
          <SEBadge size="md" className="mb-4" />
          <h2 className="text-2xl md:text-3xl font-black text-amc-text mt-4 mb-3">
            Prendre rendez-vous SAV
          </h2>
          <p className="text-amc-text/70 max-w-xl mx-auto mb-8 text-sm">
            Contactez notre équipe technique pour planifier une intervention. Nous vous répondons
            sous 24h ouvrées.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact?type=sav" className="btn-primary bg-amc-text text-white hover:bg-amc-gray rounded-lg">
              Formulaire de contact <IconArrowRight size={16} />
            </Link>
            <a href="tel:+33450000000" className="btn-secondary rounded-lg">
              <IconPhone size={16} />
              +33 (0)4 50 00 00 00
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
