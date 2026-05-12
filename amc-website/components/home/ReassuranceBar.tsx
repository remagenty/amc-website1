import { REASSURANCE_ITEMS } from "@/lib/data";
import {
  IconBadgeCheck,
  IconTruck,
  IconShield,
  IconCreditCard,
} from "@/components/ui/Icons";

const ICONS: Record<string, React.ReactNode> = {
  "badge-check": <IconBadgeCheck size={28} />,
  truck: <IconTruck size={28} />,
  shield: <IconShield size={28} />,
  "credit-card": <IconCreditCard size={28} />,
};

export function ReassuranceBar() {
  return (
    <section
      className="bg-amc-yellow"
      aria-label="Nos engagements"
    >
      <div className="container-amc py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {REASSURANCE_ITEMS.map((item) => (
            <div key={item.title} className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left">
              <div className="flex-shrink-0 text-amc-text opacity-80">
                {ICONS[item.icon] ?? <IconBadgeCheck size={28} />}
              </div>
              <div>
                <p className="font-bold text-amc-text text-sm leading-tight">{item.title}</p>
                <p className="text-amc-text/60 text-xs mt-0.5">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
