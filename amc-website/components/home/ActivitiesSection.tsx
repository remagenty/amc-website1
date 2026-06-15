import Link from "next/link";
import { IconArrowRight, IconStar, IconShield, IconWrench } from "@/components/ui/Icons";
import { SEBadge } from "@/components/ui/SEBadge";

const ACTIVITIES = [
  {
    id: "neuf",
    icon: <IconStar size={18} className="text-amc-yellow" />,
    title: "Vente Matériel Neuf",
    description:
      "Distributeur officiel Wacker Neuson, Magni et Promove Demolition. Accédez à la gamme complète de matériels de chantier neufs avec garantie constructeur et livraison en Rhône-Alpes.",
    badges: ["Wacker Neuson", "Magni", "Promove"],
    cta: "Voir le catalogue",
    href: "/catalogue?etat=neuf",
    highlight: true,
    image: "/images/photo-wacker-catalogue.jpg",
    imageAlt: "Matériel neuf Wacker Neuson — AMC",
  },
  {
    id: "occasion",
    icon: <IconShield size={18} className="text-amc-yellow" />,
    title: "Vente Occasion Certifiée",
    description:
      "Des machines d'occasion soigneusement inspectées, révisées et garanties par nos techniciens certifiés SE+. Le rapport qualité-prix optimal pour vos chantiers.",
    badges: ["Inspecté", "Garanti", "Certifié SE+"],
    cta: "Voir les occasions",
    href: "/catalogue?etat=occasion",
    image: "/images/Slide-1.jpg",
    imageAlt: "Matériel occasion certifié — AMC",
  },
  {
    id: "sav",
    icon: <IconWrench size={18} className="text-amc-yellow" />,
    title: "Service Après-Vente",
    description:
      "Notre atelier certifié SE+ prend en charge la maintenance préventive, les réparations et la fourniture de pièces d'origine pour tous vos équipements de chantier.",
    se: true,
    badges: ["Pièces d'origine", "Intervention rapide", "Contrats entretien"],
    cta: "Nos services",
    href: "/sav",
    image: "/images/Slide-3.jpg",
    imageAlt: "Atelier SAV certifié SE+ — AMC",
  },
];

export function ActivitiesSection() {
  return (
    <section className="section-padding bg-amc-cream" aria-labelledby="activities-title">
      <div className="container-amc">
        <div className="text-center mb-12">
          <h2 id="activities-title" className="section-title">
            Nos activités principales
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            AMC est votre partenaire de confiance pour la vente de matériels de chantier neufs et
            d&apos;occasion en Rhône-Alpes.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {ACTIVITIES.map((activity) => (
            <div
              key={activity.id}
              className={`flex flex-col sm:flex-row min-h-[180px] bg-white rounded-2xl overflow-hidden shadow-card ${
                activity.highlight ? "ring-2 ring-amc-yellow/40" : ""
              }`}
            >
              {/* Image — 40 % de la largeur sur desktop, pleine largeur sur mobile */}
              <div className="w-full sm:w-2/5 min-h-[180px] sm:min-h-0 flex-shrink-0 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activity.image}
                  alt={activity.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {activity.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-amc-yellow" />
                )}
              </div>

              {/* Contenu */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="p-1.5 rounded-lg bg-amc-yellow/10">
                      {activity.icon}
                    </span>
                    <h3 className="text-lg font-bold text-amc-text leading-snug">
                      {activity.title}
                      {activity.se && <SEBadge size="sm" className="ml-2 align-middle" />}
                    </h3>
                  </div>

                  <p className="text-amc-text-secondary text-sm leading-relaxed mb-4">
                    {activity.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {activity.badges.map((badge) => (
                      <span
                        key={badge}
                        className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-amc-text-secondary"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={activity.href}
                  className={`inline-flex items-center gap-2 font-semibold text-sm group w-fit ${
                    activity.highlight
                      ? "btn-primary"
                      : "text-amc-text hover:text-amc-yellow-dark transition-colors"
                  }`}
                >
                  {activity.cta}
                  <IconArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
