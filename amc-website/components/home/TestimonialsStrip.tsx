"use client";

const TESTIMONIALS = [
  {
    text: "AMC a fait preuve d'un grand professionnalisme et d'une excellente disponibilité malgré la distance géographique. Leur accompagnement a été clair, sérieux et utile. Rare de trouver un tel niveau de service et d'écoute aujourd'hui. Une entreprise fiable que je recommande.",
    name: "David Carrozza",
    date: "Février 2025",
    initials: "DC",
  },
  {
    text: "Un grand merci à l'équipe SAV pour la qualité de leurs prestations, leur écoute et leur rapidité d'intervention. À très vite pour de nouvelles aventures !",
    name: "Florent Blanc",
    date: "Mars 2025",
    initials: "FB",
  },
  {
    text: "Équipe SAV au top ! Ils ont su me dépanner par téléphone avec beaucoup de professionnalisme. La personne que j'ai eue était claire, précise, et allait droit au but — aucun blabla inutile. Franchement, je recommande les yeux fermés !",
    name: "Anthony",
    date: "Mai 2025",
    initials: "AN",
  },
  {
    text: "Équipe professionnel, respect des délais, qualité des échanges. Je recommande fortement.",
    name: "Vincent Figueiredo",
    date: "Juin 2025",
    initials: "VF",
  },
  {
    text: "Équipe au top, à l'écoute et très réactif sur les commandes de pièces détachées, je recommande !",
    name: "Florian",
    date: "Juillet 2023",
    initials: "FR",
  },
  {
    text: "Grand choix, très pro, excellent services.",
    name: "Enrico Avola",
    date: "Octobre 2022",
    initials: "EA",
  },
  {
    text: "SAV très réactif et compétent. Je recommande.",
    name: "francketflo",
    date: "Mai 2025",
    initials: "FF",
  },
  {
    text: "Une belle équipe au service SAV, à l'écoute, professionnelle et arrangeante...",
    name: "Florent Bottollier",
    date: "Mars 2025",
    initials: "FB",
  },
  {
    text: "Un grand merci à Camille et Romain du service client qui ont géré mon dossier pour une recherche de pièce dans un délai remarquable. Cette équipe est très compétente dans ce domaine. Vous pouvez y aller les yeux fermés.",
    name: "Kevin Veyrier",
    date: "Mars 2025",
    initials: "KV",
  },
  {
    text: "Un grand bravo à Romain et à toute son équipe SAV. De nos jours, c'est rare de trouver un service aussi à l'écoute, réactif et professionnel. Merci pour votre efficacité. Je recommande sans hésiter.",
    name: "Lucas",
    date: "Mars 2025",
    initials: "LU",
  },
  {
    text: "Wacker Neuson, c'est tout ce qu'il faut !",
    name: "Eric Floquet",
    date: "Mai 2022",
    initials: "EF",
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
          <p className="text-xs text-[#9B9B9B] leading-tight mt-0.5">{item.date}</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsStrip() {
  const allItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      className="overflow-hidden py-10"
      style={{ backgroundColor: "#FFD700" }}
      aria-label="Avis clients Google"
    >
      <style>{`
        @keyframes testimonials-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .testimonials-track {
          animation: testimonials-scroll 40s linear infinite;
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
