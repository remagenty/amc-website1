"use client";

import {
  IconBadgeCheck,
  IconTruck,
  IconShield,
  IconCreditCard,
  IconStar,
  IconWrench,
  IconClock,
  IconCheck,
} from "@/components/ui/Icons";

const ITEMS = [
  { icon: <IconBadgeCheck size={18} />, text: "Certification SE+" },
  { icon: <IconTruck size={18} />,      text: "Livraison Rhône-Alpes" },
  { icon: <IconShield size={18} />,     text: "Garantie constructeur" },
  { icon: <IconCreditCard size={18} />, text: "Financement disponible" },
  { icon: <IconCheck size={18} />,      text: "Stock disponible — Livraison immédiate" },
  { icon: <IconShield size={18} />,     text: "Pièces d'origine constructeur" },
  { icon: <IconWrench size={18} />,     text: "Techniciens certifiés usine" },
  { icon: <IconClock size={18} />,      text: "Devis gratuit sous 24h" },
  { icon: <IconStar size={18} />,       text: "+15 ans d'expérience" },
  { icon: <IconBadgeCheck size={18} />, text: "Service après-vente sur site" },
];

function Item({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 px-8 whitespace-nowrap flex-shrink-0">
      <span className="opacity-70">{icon}</span>
      <span className="font-semibold text-sm text-amc-text">{text}</span>
      <span className="ml-6 text-amc-text/30 font-bold text-lg select-none">·</span>
    </span>
  );
}

export function ReassuranceBar({ items }: { items?: string[] }) {
  const displayItems =
    items && items.length > 0
      ? items.map((text) => ({ icon: <IconCheck size={18} />, text }))
      : ITEMS;
  return (
    <section
      className="bg-amc-yellow overflow-hidden py-4"
      aria-label="Nos engagements"
    >
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* hover target covers the full width */}
      <div
        className="relative"
        onMouseEnter={(e) => {
          const track = e.currentTarget.querySelector<HTMLElement>(".marquee-track");
          if (track) track.style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          const track = e.currentTarget.querySelector<HTMLElement>(".marquee-track");
          if (track) track.style.animationPlayState = "running";
        }}
      >
        {/* Duplicate items for seamless loop */}
        <div className="marquee-track">
          {[...displayItems, ...displayItems].map((item, i) => (
            <Item key={i} icon={item.icon} text={item.text} />
          ))}
        </div>
      </div>
    </section>
  );
}
