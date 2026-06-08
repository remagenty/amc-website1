"use client";

const TESTIMONIALS = [
  {
    text: "Équipe très réactive, le SAV est intervenu le lendemain de mon appel. Matériel impeccable, je recommande sans hésiter AMC pour tout achat de téléhandler.",
    name: "Jean-Pierre M.",
    role: "Chef de chantier, BTP Rhône-Alpes",
    initials: "JP",
  },
  {
    text: "J'ai acheté une mini-pelle Wacker Neuson via AMC, le conseil était parfait. Ils ont vraiment pris le temps de comprendre mes besoins avant de me proposer le bon modèle.",
    name: "Thomas B.",
    role: "Artisan terrassier, Savoie",
    initials: "TB",
  },
  {
    text: "Partenaire de confiance depuis 3 ans. Les pièces détachées arrivent vite et le personnel est compétent. C'est rare de trouver un distributeur aussi sérieux.",
    name: "Marc D.",
    role: "Responsable matériel, Entreprise de démolition",
    initials: "MD",
  },
  {
    text: "Le financement proposé par AMC nous a permis d'acquérir deux machines sans impact sur notre trésorerie. Montage rapide et transparent.",
    name: "Sophie L.",
    role: "Gérante, PME travaux publics",
    initials: "SL",
  },
  {
    text: "Très bon suivi après-vente. La certification SE+ de leur atelier fait vraiment la différence — on sait que les interventions sont faites dans les règles de l'art.",
    name: "Christophe R.",
    role: "Mécanicien TP, Haute-Savoie",
    initials: "CR",
  },
  {
    text: "AMC nous a livré le matériel Promove en temps et en heure pour un chantier urgent. Sérieux et professionnel, je n'irai plus ailleurs.",
    name: "David F.",
    role: "Conducteur de travaux, Isère",
    initials: "DF",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ item }: { item: typeof TESTIMONIALS[number] }) {
  return (
    <div
      className="flex-shrink-0 bg-white rounded-xl p-5 flex flex-col justify-between"
      style={{
        width: "320px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <div>
        <StarRating />
        <p className="text-[#374151] text-sm italic leading-relaxed">
          &ldquo;{item.text}&rdquo;
        </p>
      </div>
      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
        <div
          className="w-9 h-9 rounded-full bg-[#FFD700] flex items-center justify-center flex-shrink-0"
        >
          <span className="text-xs font-black text-[#2d2d2d]">{item.initials}</span>
        </div>
        <div>
          <p className="text-sm font-bold text-[#2d2d2d] leading-tight">{item.name}</p>
          <p className="text-xs text-[#9B9B9B] leading-tight mt-0.5">{item.role}</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsStrip() {
  // Duplicate for seamless infinite loop
  const allItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      className="overflow-hidden py-10"
      style={{ backgroundColor: "#FFD700" }}
      aria-label="Témoignages clients"
    >
      <style>{`
        @keyframes testimonials-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .testimonials-track {
          animation: testimonials-scroll 24s linear infinite;
          will-change: transform;
        }
        .testimonials-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className="testimonials-track flex gap-5"
        style={{ width: "max-content" }}
      >
        {allItems.map((item, i) => (
          <TestimonialCard key={i} item={item} />
        ))}
      </div>
    </section>
  );
}
