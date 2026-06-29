import { WHY_CHOOSE_ITEMS } from "@/lib/data";
import { SEBadge } from "@/components/ui/SEBadge";
import {
  IconStar,
  IconBadgeCheck,
  IconArchive,
  IconMapPin,
} from "@/components/ui/Icons";

const ICONS: Record<string, React.ReactNode> = {
  star: <IconStar size={24} />,
  "badge-check": <IconBadgeCheck size={24} />,
  archive: <IconArchive size={24} />,
  "map-pin": <IconMapPin size={24} />,
};

const DEFAULT_STATS = [
  { value: "3", label: "Partenaires constructeurs" },
  { value: "15+", label: "Années d'expertise" },
  { value: "500+", label: "Machines vendues" },
  { value: "100%", label: "Matériaux d'origine" },
];

export function WhyChooseSection({ stats }: { stats?: { value: string; label: string }[] }) {
  const displayStats = stats && stats.length > 0 ? stats : DEFAULT_STATS;
  return (
    <section className="section-padding" style={{ backgroundColor: "#F5F4EF" }} aria-labelledby="why-title">
      <div className="container-amc">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: content */}
          <div>
            <h2 id="why-title" className="section-title">
              Pourquoi choisir AMC ?
            </h2>
            <p className="section-subtitle mt-4">
              Depuis notre création, nous accompagnons les professionnels du BTP et des travaux
              publics en Rhône-Alpes avec des équipements de qualité et un service expert.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              {WHY_CHOOSE_ITEMS.map((item, i) => (
                <div key={item.title} className="flex gap-4">
                  <div
                    className="p-2.5 rounded-xl flex-shrink-0 h-fit"
                    style={{ backgroundColor: i % 2 === 0 ? "#ffd50020" : "#5e5e5f15" }}
                  >
                    <span className="text-amc-yellow">
                      {ICONS[item.icon] ?? <IconStar size={24} />}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-amc-text text-base">
                      {item.title}
                    </h3>
                    <p className="text-sm text-amc-text-secondary mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: stats + visual */}
          <div className="relative">
            <div className="bg-amc-gray rounded-2xl p-8 text-white relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, #ffd500 0px, #ffd500 1px, transparent 0px, transparent 50%)`,
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative">
                <SEBadge size="lg" className="mb-6" />

                <h3 className="text-2xl font-bold mb-2">
                  Certification SAV
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-8">
                  Nos techniciens sont certifiés — la référence qualité pour le service
                  après-vente des équipements de chantier compacts.
                </p>

                <div className="grid grid-cols-2 gap-6">
                  {displayStats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-3xl font-black text-amc-yellow">
                        {stat.value}
                      </div>
                      <div className="text-xs text-white/60 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amc-yellow rounded-2xl -z-10 opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
