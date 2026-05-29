import type { Product, BrandInfo, HeroSlide, Service } from "@/types";
import { getAllWnMachines, wnMachineToProduct, getCategoryUrlSlug, CATEGORY_LABELS as WN_CATEGORY_LABELS } from "./wn-catalogue";
import { getMagniProducts, getMagniCategories, MAGNI_CATEGORY_LABELS } from "./magni-catalogue";
import { getPromoveProducts, getPromoveCategories, PROMOVE_CATEGORY_LABELS } from "./promove-catalogue";

export const ALL_CATEGORY_LABELS: Record<string, string> = {
  ...WN_CATEGORY_LABELS,
  ...MAGNI_CATEGORY_LABELS,
  ...PROMOVE_CATEGORY_LABELS,
};

let _cachedMachines: Product[] | null = null;

export function getMachines(): Product[] {
  if (_cachedMachines) return _cachedMachines;
  const wnProducts = getAllWnMachines().map(m => ({
    ...wnMachineToProduct(m),
    categorySlug: getCategoryUrlSlug(m),
  }));
  _cachedMachines = [...wnProducts, ...getMagniProducts(), ...getPromoveProducts()];
  return _cachedMachines;
}

export function getCatalogueCategories(): Array<{id: string; label: string; count: number}> {
  const counts: Record<string, number> = {};
  for (const m of getMachines()) {
    const slug = m.categorySlug ?? "";
    if (slug) counts[slug] = (counts[slug] ?? 0) + 1;
  }
  return Object.entries(counts)
    .map(([id, count]) => ({ id, label: ALL_CATEGORY_LABELS[id] ?? id, count }))
    .sort((a, b) => a.label.localeCompare(b.label, "fr"));
}

export function getCatalogueBrands(): Array<{id: string; label: string; count: number}> {
  const counts: Record<string, number> = {};
  for (const m of getMachines()) counts[m.brand] = (counts[m.brand] ?? 0) + 1;
  const labels: Record<string, string> = {
    "wacker-neuson": "Wacker Neuson",
    "magni": "Magni",
    "promove-demolition": "Promove Demolition",
  };
  return Object.entries(counts).map(([id, count]) => ({ id, label: labels[id] ?? id, count }));
}

export const BRANDS: BrandInfo[] = [
  {
    id: "wacker-neuson",
    name: "Wacker Neuson",
    slug: "wacker-neuson",
    logo: "/images/brands/wacker-neuson.svg",
    tagline: "Partenaire officiel — Gamme complète",
    description:
      "Leader mondial des équipements compacts de construction. AMC est distributeur officiel Wacker Neuson pour la région Rhône-Alpes, proposant l'ensemble de la gamme : compacteurs, dumpers, pelles, plaques vibrantes et bien plus.",
    website: "https://www.wackerneuson.com",
    productCount: 42,
  },
  {
    id: "magni",
    name: "Magni",
    slug: "magni",
    logo: "/images/brands/magni.svg",
    tagline: "Spécialiste télescopiques",
    description:
      "Magni est le spécialiste des chariots télescopiques rotatifs haute performance. Des machines robustes et précises pour la manutention et la construction.",
    website: "https://www.magni.it",
    productCount: 18,
  },
  {
    id: "promove-demolition",
    name: "Promove Demolition",
    slug: "promove-demolition",
    logo: "/images/brands/promove.svg",
    tagline: "Expert démolition",
    description:
      "Promove Demolition propose une gamme complète d'outils de démolition hydrauliques haute qualité : brise-roches, cisailles, pinces, pulvérisateurs et godets criblants.",
    website: "https://www.promove-demolition.com",
    productCount: 24,
  },
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    title: "Votre partenaire machines neuves et occasion",
    subtitle:
      "Spécialiste de la vente de matériel de chantier en Rhône-Alpes. Compacteurs, dumpers, pelles, télescopiques et équipements de démolition.",
    ctaLabel: "Découvrir nos machines",
    ctaHref: "/catalogue",
    ctaSecondaryLabel: "Demander un devis",
    ctaSecondaryHref: "/contact?type=devis",
    image: "/images/Slide-1.jpg",
  },
  {
    id: "slide-2",
    title: "Distributeur officiel Wacker Neuson",
    subtitle:
      "Accédez à toute la gamme Wacker Neuson : équipements compacts haute performance pour tous vos chantiers. Stock disponible, livraison Rhône-Alpes.",
    ctaLabel: "Voir la gamme Wacker Neuson",
    ctaHref: "/partenaires/wacker-neuson",
    ctaSecondaryLabel: "Contactez-nous",
    ctaSecondaryHref: "/contact",
    video: "/videos/Slide-2.mp4",
    badge: "Partenaire officiel",
  },
  {
    id: "slide-3",
    title: "Atelier certifié SE+ et techniciens qualifiés",
    subtitle:
      "Un service après-vente d'excellence avec des techniciens certifiés et un atelier équipé",
    ctaLabel: "Découvrir nos services",
    ctaHref: "/services",
    ctaSecondaryLabel: "Prendre rendez-vous",
    ctaSecondaryHref: "/contact?type=sav",
    image: "/images/Slide-3.jpg",
    badge: "Certification SE+",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "dw60",
    slug: "wacker-neuson-dw60",
    name: "Wacker Neuson DW60",
    model: "DW60",
    brand: "wacker-neuson",
    category: "dumpers",
    status: "neuf",
    priceOnRequest: false,
    price: 28500,
    images: ["/images/products/dumper-dw60-1.jpg", "/images/products/dumper-dw60-2.jpg"],
    shortDescription: "Dumper articulé 6 tonnes — idéal pour les chantiers exigus",
    description:
      "Le DW60 de Wacker Neuson est un dumper articulé de 6 tonnes offrant une excellente maniabilité sur les chantiers confinés. Son moteur diesel Stage V garantit des émissions réduites et une performance optimale.",
    specs: [
      { label: "Capacité de charge", value: "6 000", unit: "kg" },
      { label: "Puissance moteur", value: "55,4", unit: "kW" },
      { label: "Capacité du bac", value: "3 500", unit: "L" },
      { label: "Poids total", value: "8 200", unit: "kg" },
      { label: "Longueur", value: "5 480", unit: "mm" },
      { label: "Largeur", value: "1 800", unit: "mm" },
      { label: "Norme moteur", value: "Stage V", unit: "" },
    ],
    highlights: ["Transmission hydrostatique", "Direction articulée 4 roues motrices", "Vidage hydraulique"],
    hasSECertification: true,
    available: true,
    featured: true,
    tags: ["dumper", "articulé", "chantier", "terrassement"],
    applications: ["Transport de matériaux", "Travaux de terrassement", "Chantiers urbains"],
    sectors: ["Travaux Publics", "Génie Civil", "Démolition"],
  },
  {
    id: "rd27-120",
    slug: "wacker-neuson-rd27-120",
    name: "Wacker Neuson RD27-120",
    model: "RD27-120",
    brand: "wacker-neuson",
    category: "compacteurs",
    status: "neuf",
    priceOnRequest: false,
    price: 42000,
    images: ["/images/products/compacteur-rd27-1.jpg"],
    shortDescription: "Rouleau tandem 2,7 tonnes — compactage haute performance",
    description:
      "Le RD27-120 est un rouleau tandem de 2,7 tonnes pour le compactage de couches de roulement et de fondations. Système de vibration à grande amplitude pour un compactage optimal.",
    specs: [
      { label: "Masse de travail", value: "2 700", unit: "kg" },
      { label: "Largeur de travail", value: "1 200", unit: "mm" },
      { label: "Puissance moteur", value: "24,4", unit: "kW" },
      { label: "Fréquence de vibration", value: "50/60", unit: "Hz" },
      { label: "Vitesse de travail", value: "0–6", unit: "km/h" },
    ],
    highlights: ["Double tambour vibrant", "Cabine ROPS", "Arrosage automatique"],
    hasSECertification: true,
    available: true,
    featured: true,
    tags: ["rouleau", "compacteur", "tandem", "enrobé"],
    applications: ["Compactage d'enrobé", "Compactage de fondations", "Finition de chaussées"],
    sectors: ["Travaux Publics", "Voirie"],
  },
  {
    id: "ez17e",
    slug: "wacker-neuson-ez17e",
    name: "Wacker Neuson EZ17e",
    model: "EZ17e",
    brand: "wacker-neuson",
    category: "pelles",
    status: "neuf",
    priceOnRequest: true,
    images: ["/images/products/pelle-ez17e-1.jpg"],
    shortDescription: "Pelle électrique 1,7 tonne — zéro émission",
    description:
      "L'EZ17e est la première pelle compacte 100% électrique de Wacker Neuson. Idéale pour les chantiers urbains et les espaces confinés, elle offre zéro émission et un niveau sonore réduit.",
    specs: [
      { label: "Masse opérationnelle", value: "1 700", unit: "kg" },
      { label: "Puissance moteur électrique", value: "10", unit: "kW" },
      { label: "Capacité godet", value: "0,05", unit: "m³" },
      { label: "Profondeur de fouille", value: "2 210", unit: "mm" },
      { label: "Autonomie", value: "5–8", unit: "h" },
    ],
    highlights: ["100% électrique — zéro émission", "Niveau sonore très réduit", "Charge rapide AC/DC"],
    hasSECertification: true,
    available: true,
    featured: true,
    tags: ["pelle", "électrique", "compact", "zéro émission"],
    applications: ["Chantiers urbains", "Intérieur bâtiment", "Jardins et espaces verts"],
    sectors: ["Démolition", "Rénovation", "Paysagisme"],
  },
  {
    id: "rth-5-18",
    slug: "magni-rth-5-18",
    name: "Magni RTH 5.18",
    model: "RTH 5.18",
    brand: "magni",
    category: "telescopiques",
    status: "neuf",
    priceOnRequest: true,
    images: ["/images/products/telescopique-rth518-1.jpg"],
    shortDescription: "Télescopique rotatif 5 tonnes — hauteur 18 mètres",
    description:
      "Le Magni RTH 5.18 est un chariot télescopique rotatif de 5 tonnes avec une hauteur de levage de 18 mètres. Sa tourelle rotative 360° lui confère une polyvalence maximale sur chantier.",
    specs: [
      { label: "Charge maximale", value: "5 500", unit: "kg" },
      { label: "Hauteur de levage", value: "18", unit: "m" },
      { label: "Portée maximale", value: "15,9", unit: "m" },
      { label: "Puissance moteur", value: "109", unit: "kW" },
      { label: "Poids total", value: "20 500", unit: "kg" },
      { label: "Rotation tourelle", value: "360°", unit: "" },
    ],
    highlights: ["Rotation 360° continue", "Stabilisateurs hydrauliques", "Cabine ROPS/FOPS"],
    hasSECertification: false,
    available: true,
    featured: true,
    tags: ["télescopique", "rotatif", "manutention", "levage"],
    applications: ["Manutention de matériaux", "Travaux en hauteur", "Chantiers BTP"],
    sectors: ["BTP", "Industrie", "Manutention"],
  },
  {
    id: "hb-2000",
    slug: "promove-hb-2000",
    name: "Promove HB 2000",
    model: "HB 2000",
    brand: "promove-demolition",
    category: "demolition",
    status: "neuf",
    priceOnRequest: false,
    price: 8900,
    images: ["/images/products/brise-roche-hb2000-1.jpg"],
    shortDescription: "Brise-roche hydraulique 2 000 kg — haute énergie d'impact",
    description:
      "Le brise-roche hydraulique HB 2000 de Promove Demolition est conçu pour les applications de démolition intensives. Il offre une énergie d'impact élevée avec une faible consommation hydraulique.",
    specs: [
      { label: "Poids opérationnel", value: "2 000", unit: "kg" },
      { label: "Débit hydraulique", value: "120–180", unit: "L/min" },
      { label: "Pression de service", value: "180–220", unit: "bar" },
      { label: "Énergie d'impact", value: "4 000", unit: "J" },
      { label: "Fréquence de frappe", value: "400–800", unit: "coups/min" },
    ],
    highlights: ["Amortisseur anti-vibrations", "Graissage automatique", "Compatible toutes marques pelles"],
    hasSECertification: false,
    available: true,
    featured: true,
    tags: ["brise-roche", "marteau", "démolition", "hydraulique"],
    applications: ["Démolition béton", "Brisage de roche", "Tranchées"],
    sectors: ["Démolition", "Carrières", "Travaux Publics"],
  },
  {
    id: "dw30-occ",
    slug: "wacker-neuson-dw30-occasion",
    name: "Wacker Neuson DW30",
    model: "DW30",
    brand: "wacker-neuson",
    category: "dumpers",
    status: "occasion",
    priceOnRequest: false,
    price: 14500,
    images: ["/images/products/dumper-dw30-occ-1.jpg"],
    shortDescription: "Dumper articulé 3 tonnes — occasion certifiée",
    description:
      "Dumper articulé Wacker Neuson DW30 d'occasion, révisé et certifié par nos techniciens. Idéal pour les petits chantiers et zones d'accès difficile.",
    specs: [
      { label: "Capacité de charge", value: "3 000", unit: "kg" },
      { label: "Puissance moteur", value: "28", unit: "kW" },
      { label: "Année", value: "2019", unit: "" },
      { label: "Heures d'utilisation", value: "2 850", unit: "h" },
      { label: "Poids total", value: "4 400", unit: "kg" },
    ],
    highlights: ["Révisé par nos techniciens", "Garantie 6 mois", "Peinture refaite"],
    hasSECertification: true,
    year: 2019,
    hours: 2850,
    available: true,
    featured: true,
    tags: ["dumper", "occasion", "articulé"],
    applications: ["Transport de matériaux", "Terrassement"],
    sectors: ["Travaux Publics", "Paysagisme"],
  },
  {
    id: "rd12-occ",
    slug: "wacker-neuson-rd12-occasion",
    name: "Wacker Neuson RD12",
    model: "RD12",
    brand: "wacker-neuson",
    category: "compacteurs",
    status: "occasion",
    priceOnRequest: false,
    price: 11200,
    images: ["/images/products/compacteur-rd12-occ-1.jpg"],
    shortDescription: "Rouleau tandem 1,2 tonne — occasion révisée",
    description:
      "Rouleau tandem Wacker Neuson RD12 d'occasion en excellent état. Inspecté et révisé dans nos ateliers certifiés SE+.",
    specs: [
      { label: "Masse de travail", value: "1 200", unit: "kg" },
      { label: "Largeur de travail", value: "780", unit: "mm" },
      { label: "Puissance moteur", value: "11,3", unit: "kW" },
      { label: "Année", value: "2020", unit: "" },
      { label: "Heures d'utilisation", value: "1 650", unit: "h" },
    ],
    highlights: ["Inspection complète", "Courroies et filtres neufs", "Prêt à l'emploi"],
    hasSECertification: true,
    year: 2020,
    hours: 1650,
    available: true,
    featured: false,
    tags: ["rouleau", "compacteur", "occasion"],
    applications: ["Compactage", "Voirie"],
    sectors: ["Travaux Publics"],
  },
  {
    id: "rth-6-25",
    slug: "magni-rth-6-25",
    name: "Magni RTH 6.25",
    model: "RTH 6.25",
    brand: "magni",
    category: "telescopiques",
    status: "neuf",
    priceOnRequest: true,
    images: ["/images/products/telescopique-rth625-1.jpg"],
    shortDescription: "Télescopique rotatif 6 tonnes — hauteur 25 mètres",
    description:
      "Le Magni RTH 6.25, version haute portée de la gamme RTH. Capacité 6 tonnes et hauteur de levage 25 mètres pour les chantiers les plus exigeants.",
    specs: [
      { label: "Charge maximale", value: "6 000", unit: "kg" },
      { label: "Hauteur de levage", value: "25", unit: "m" },
      { label: "Portée maximale", value: "22", unit: "m" },
      { label: "Puissance moteur", value: "129", unit: "kW" },
      { label: "Rotation tourelle", value: "360°", unit: "" },
    ],
    highlights: ["Grande portée", "Stabilisateurs télescopiques", "Flèche composite légère"],
    hasSECertification: false,
    available: true,
    featured: false,
    tags: ["télescopique", "rotatif", "haute portée"],
    applications: ["Levage en hauteur", "Construction", "Montage charpentes"],
    sectors: ["BTP", "Industrie"],
  },
];

export const SERVICES: Service[] = [
  {
    id: "vente-neuf",
    title: "Vente Matériel Neuf",
    description:
      "Distributeur officiel Wacker Neuson, Magni et Promove Demolition. Accédez à la gamme complète de matériels neufs avec garantie constructeur.",
    icon: "star",
    features: [
      "Gamme complète constructeurs",
      "Garantie constructeur incluse",
      "Livraison Rhône-Alpes",
      "Financement disponible",
    ],
  },
  {
    id: "vente-occasion",
    title: "Vente Occasion Certifiée",
    description:
      "Des machines d'occasion soigneusement sélectionnées, inspectées et révisées dans nos ateliers certifiés SE+. Qualité garantie.",
    icon: "shield",
    features: [
      "Inspection technique complète",
      "Révision certifiée SE+",
      "Garantie 6 mois",
      "Dossier technique fourni",
    ],
  },
  {
    id: "sav",
    title: "Service Après-Vente",
    description:
      "Atelier certifié SE+ pour la maintenance, réparation et fourniture de pièces d'origine. Intervention rapide sur site ou en atelier.",
    icon: "wrench",
    features: [
      "Certification SE+",
      "Pièces d'origine constructeur",
      "Techniciens certifiés",
      "Intervention sur site",
    ],
  },
  {
    id: "pieces",
    title: "Pièces Détachées",
    description:
      "Stock de pièces d'origine pour Wacker Neuson, Magni et Promove. Commande rapide et livraison express pour minimiser l'immobilisation.",
    icon: "cog",
    features: [
      "Pièces d'origine garanties",
      "Stock important disponible",
      "Commande en ligne",
      "Livraison express",
    ],
  },
];

export const CATEGORIES = [
  { id: "compacteurs", label: "Compacteurs", icon: "roller", count: 12 },
  { id: "dumpers", label: "Dumpers", icon: "truck", count: 8 },
  { id: "pelles", label: "Pelles compactes", icon: "excavator", count: 15 },
  { id: "telescopiques", label: "Télescopiques", icon: "crane", count: 10 },
  { id: "demolition", label: "Démolition", icon: "hammer", count: 14 },
  { id: "manutention", label: "Manutention", icon: "forklift", count: 6 },
] as const;

export const REASSURANCE_ITEMS = [
  {
    icon: "badge-check",
    title: "Certification SE+",
    subtitle: "SAV certifié",
    description: "Nos techniciens sont certifiés SE+ pour vous garantir une maintenance d'excellence",
  },
  {
    icon: "truck",
    title: "Livraison Rhône-Alpes",
    subtitle: "Toute la région",
    description: "Nous livrons votre matériel partout en Rhône-Alpes",
  },
  {
    icon: "shield",
    title: "Garantie constructeur",
    subtitle: "Matériel neuf",
    description: "Tous nos matériels neufs bénéficient de la garantie constructeur complète",
  },
  {
    icon: "credit-card",
    title: "Financement disponible",
    subtitle: "Solutions adaptées",
    description: "Des solutions de financement flexibles pour faciliter vos investissements",
  },
];

export const WHY_CHOOSE_ITEMS = [
  {
    icon: "star",
    title: "Partenaire officiel",
    description:
      "Distributeur agréé Wacker Neuson, Magni et Promove Demolition. Accès aux gammes complètes avec le support constructeur.",
  },
  {
    icon: "badge-check",
    title: "SAV certifié SE+",
    description:
      "Notre atelier certifié SE+ assure la maintenance et réparation de vos équipements avec des pièces d'origine.",
  },
  {
    icon: "archive",
    title: "Stock neuf & occasion",
    description:
      "Large stock de matériels neufs et d'occasion certifiés disponibles immédiatement en Rhône-Alpes.",
  },
  {
    icon: "map-pin",
    title: "Expertise locale",
    description:
      "Basés à Saint-Félix, nous connaissons les besoins des chantiers Rhône-Alpes et vous apportons un conseil de proximité.",
  },
];

export function getProductsByBrand(brand: string): Product[] {
  return PRODUCTS.filter((p) => p.brand === brand);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getOccasionProducts(): Product[] {
  return PRODUCTS.filter((p) => p.status === "occasion");
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getSimilarProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand)
  ).slice(0, limit);
}

export function getBrandInfo(brandId: string): BrandInfo | undefined {
  return BRANDS.find((b) => b.id === brandId);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}
