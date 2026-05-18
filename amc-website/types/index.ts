export type ProductStatus = "neuf" | "occasion";
export type Brand = "wacker-neuson" | "magni" | "promove-demolition";
export type Category =
  | "compacteurs"
  | "dumpers"
  | "pelles"
  | "telescopiques"
  | "demolition"
  | "manutention"
  | "compactage"
  | "terrassement";

export interface Spec {
  label: string;
  value: string;
  unit?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  model: string;
  brand: Brand;
  category: Category;
  status: ProductStatus;
  price?: number;
  priceOnRequest: boolean;
  images: string[];
  shortDescription: string;
  description: string;
  specs: Spec[];
  highlights: string[];
  hasSECertification: boolean;
  year?: number;
  hours?: number;
  available: boolean;
  featured: boolean;
  pdfUrl?: string;
  tags: string[];
  applications: string[];
  sectors: string[];
}

export interface BrandInfo {
  id: Brand;
  name: string;
  slug: string;
  logo: string;
  tagline: string;
  description: string;
  website: string;
  productCount: number;
}

export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
  description?: string;
  icon?: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  image?: string;
  video?: string;
  badge?: string;
}

export interface FilterState {
  categories: Category[];
  brands: Brand[];
  status: ProductStatus | "all";
  priceMin?: number;
  priceMax?: number;
  search: string;
  page: number;
  sort: "relevance" | "price-asc" | "price-desc" | "newest";
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  text: string;
  rating: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}
