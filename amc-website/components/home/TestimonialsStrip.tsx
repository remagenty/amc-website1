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
    text: "WACKER NEUSON, c'est tout ce qu'il faut !",
    name: "Eric Floquet",
    date: "Mai 2022",
    initials: "EF",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5" style={{ marginBottom: "12px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FDC202" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

type ReviewDisplay = {
  name: string;
  initials: string;
  text: string;
  date: string;
  rating?: number;
};

function TestimonialCard({ item }: { item: ReviewDisplay }) {
  return (
    <div
      className="flex-shrink-0 self-start flex flex-col"
      style={{
        width: "320px",
        background: "#FFFFFF",
        border: "1px solid #E8E8E8",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        borderRadius: "12px",
        padding: "24px",
      }}
    >
      <StarRating />

      {/* Guillemet */}
      <div style={{ fontSize: "48px", fontWeight: 700, color: "#FDC202", lineHeight: 1, marginBottom: "-8px" }}>&ldquo;</div>

      {/* Texte */}
      <p style={{ color: "#444444", fontSize: "15px", lineHeight: 1.7, fontStyle: "italic" }}>
        {item.text}
      </p>

      {/* Séparateur jaune */}
      <div style={{ width: "32px", height: "2px", background: "#FDC202", margin: "16px 0" }} />

      {/* Auteur */}
      <div className="flex items-center gap-3">
        <div
          className="flex-shrink-0 flex items-center justify-center rounded-full"
          style={{ width: "40px", height: "40px", background: "#FDC202" }}
        >
          <span style={{ fontSize: "12px", fontWeight: 900, color: "#2d2d2d" }}>{item.initials}</span>
        </div>
        <div>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a", lineHeight: 1.3 }}>{item.name}</p>
          <p style={{ fontSize: "13px", color: "#999999", lineHeight: 1.3, marginTop: "2px" }}>{item.date}</p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsStrip({ reviews }: { reviews?: ReviewDisplay[] }) {
  const items = (reviews && reviews.length > 0) ? reviews : TESTIMONIALS;
  const allItems = [...items, ...items];

  return (
    <section
      className="py-12"
      style={{ backgroundColor: "#FFFFFF", position: "relative", overflow: "hidden" }}
      aria-label="Avis clients Google"
    >
      {/* Titre */}
      <div className="text-center mb-5">
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a1a", marginBottom: "10px" }}>
          Ils nous font confiance
        </h2>
        {/* Badge Google */}
        <div className="inline-flex items-center gap-2">
          {/* Logo Google */}
          <svg width="18" height="18" viewBox="0 0 48 48" aria-label="Google" role="img">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          {/* Étoiles */}
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map((i) => (
              <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#FDC202" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          {/* Note */}
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a" }}>4,6</span>
        </div>
      </div>

      {/* Fade left */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "80px", height: "100%", background: "linear-gradient(to right, #FFFFFF, transparent)", zIndex: 2, pointerEvents: "none" }} />
      {/* Fade right */}
      <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "100%", background: "linear-gradient(to left, #FFFFFF, transparent)", zIndex: 2, pointerEvents: "none" }} />

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
        className="testimonials-track flex"
        style={{ width: "max-content", gap: "20px", paddingLeft: "80px" }}
      >
        {allItems.map((item, i) => (
          <TestimonialCard key={i} item={item} />
        ))}
      </div>
    </section>
  );
}
