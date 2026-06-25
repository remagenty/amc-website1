import Link from "next/link";
import { IconArrowRight, IconStar, IconShield, IconWrench } from "@/components/ui/Icons";
import { SEBadge } from "@/components/ui/SEBadge";

const ACTIVITIES = [
  {
    id: "neuf",
    icon: <IconStar size={28} className="text-amc-yellow" />,
    title: "Vente Matériel Neuf",
    description:
      "Distributeur officiel WACKER NEUSON, Magni et Promove Demolition. Accédez à la gamme complète de matériels de chantier neufs avec garantie constructeur et livraison en Rhône-Alpes.",
    badges: ["WACKER NEUSON", "Magni", "Promove"],
    cta: "Voir le catalogue",
    href: "/gammes?etat=neuf",
    highlight: true,
    image: "/images/photo-machines-wacker.jpg",
    imageAlt: "Matériel neuf WACKER NEUSON — AMC",
  },
  {
    id: "occasion",
    icon: <IconShield size={28} className="text-amc-yellow" />,
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
    icon: <IconWrench size={28} className="text-amc-yellow" />,
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
    <section className="section-padding bg-white" aria-labelledby="activities-title">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACTIVITIES.map((activity) => (
            <div
              key={activity.id}
              className={`card flex flex-col overflow-hidden ${
                activity.highlight ? "ring-2 ring-amc-yellow/40" : ""
              }`}
            >
              {/* Photo */}
              <div className="relative h-[130px] flex-shrink-0">
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
              <div className="p-6 lg:p-8 flex flex-col flex-1">
                <div className="p-3 rounded-xl bg-amc-yellow/10 w-fit mb-5">
                  {activity.icon}
                </div>

                <h3 className="text-xl font-bold text-amc-text mb-3">
                  {activity.title}
                  {activity.se && <SEBadge size="sm" className="ml-2 align-middle" />}
                </h3>

                <p className="text-amc-text-secondary text-sm leading-relaxed flex-1 mb-5">
                  {activity.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {activity.badges.map((badge) => (
                    <span
                      key={badge}
                      className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-amc-text-secondary"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <Link
                  href={activity.href}
                  className={`inline-flex items-center gap-2 font-semibold text-sm group ${
                    activity.highlight
                      ? "btn-primary justify-center"
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
