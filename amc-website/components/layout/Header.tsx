"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconSearch,
  IconMapPin,
  IconUser,
  IconHardHat,
  IconChevronDown,
  IconMenu,
  IconX,
  IconArrowRight,
} from "@/components/ui/Icons";
import { SEBadge } from "@/components/ui/SEBadge";

const TOP_BAR_ITEMS = [
  "📞 +33 (0)4 50 00 00 00",
  "📍 Saint-Félix, Haute-Savoie (74)",
  "⏰ Lun-Ven : 8h-18h | Sam : 9h-12h",
];

const MEGA_MENUS = {
  materiels: {
    categories: [
      { label: "Compacteurs & Rouleaux", href: "/catalogue?categorie=compacteurs", desc: "Compactage sol & enrobé" },
      { label: "Dumpers articulés", href: "/catalogue?categorie=dumpers", desc: "Transport de matériaux" },
      { label: "Pelles compactes", href: "/catalogue?categorie=pelles", desc: "Excavation & terrassement" },
      { label: "Télescopiques rotatifs", href: "/catalogue?categorie=telescopiques", desc: "Levage & manutention" },
      { label: "Outils de démolition", href: "/catalogue?categorie=demolition", desc: "Brise-roches, cisailles" },
      { label: "Manutention", href: "/catalogue?categorie=manutention", desc: "Chargeuses, mini-chargeurs" },
    ],
    brands: [
      { label: "Wacker Neuson", href: "/partenaires/wacker-neuson", badge: "Officiel" },
      { label: "Magni", href: "/partenaires/magni", badge: "Officiel" },
      { label: "Promove Demolition", href: "/partenaires/promove-demolition", badge: "Officiel" },
    ],
    states: [
      { label: "Matériel neuf", href: "/catalogue?etat=neuf", icon: "⭐" },
      { label: "Matériel occasion", href: "/occasion", icon: "🔄" },
    ],
  },
  besoins: [
    { label: "Travaux Publics & TP", href: "/catalogue?secteur=tp", desc: "Terrassement, voirie, réseaux" },
    { label: "Démolition & Déconstruction", href: "/catalogue?secteur=demolition", desc: "Démolition sélective" },
    { label: "Manutention & Levage", href: "/catalogue?secteur=manutention", desc: "Chariots télescopiques" },
    { label: "Compactage", href: "/catalogue?secteur=compactage", desc: "Routes, fondations" },
    { label: "Chantiers urbains", href: "/catalogue?secteur=urbain", desc: "Accès réduit, bruit faible" },
    { label: "BTP & Construction", href: "/catalogue?secteur=btp", desc: "Gros œuvre, second œuvre" },
  ],
  services: [
    { label: "Vente matériel neuf", href: "/services#neuf", desc: "Gamme complète constructeurs" },
    { label: "Matériel occasion certifié", href: "/occasion", desc: "Inspecté & garanti" },
    { label: "Service après-vente", href: "/services#sav", desc: "Certification SE+" },
    { label: "Pièces détachées", href: "/services#pieces", desc: "Origine constructeur" },
    { label: "Maintenance préventive", href: "/services#maintenance", desc: "Contrats entretien" },
  ],
  partenaires: [
    { label: "Wacker Neuson", href: "/partenaires/wacker-neuson", desc: "Gamme complète équipements compacts" },
    { label: "Magni", href: "/partenaires/magni", desc: "Télescopiques rotatifs haute performance" },
    { label: "Promove Demolition", href: "/partenaires/promove-demolition", desc: "Outils démolition hydrauliques" },
  ],
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const menuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % TOP_BAR_ITEMS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleMenuEnter = (menu: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/catalogue?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(-40px); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        .carousel-item { animation: slideInRight 0.35s ease-out forwards; }
      `}</style>

      {/* Top bar — white, compact, rotating info */}
      <div
        className="hidden lg:flex items-center justify-center text-xs"
        style={{ backgroundColor: "#FFFFFF", color: "#000000", height: "36px" }}
      >
        <div key={carouselIndex} className="carousel-item font-medium">
          {TOP_BAR_ITEMS[carouselIndex]}
        </div>
      </div>

      {/* ── BARRE 1 : HEADER (Logo + Recherche + Actions) ── */}
      <div style={{ backgroundColor: "#9B9B9B" }} className="hidden lg:block">
        <div className="container-amc">
          <div className="flex items-center gap-4 h-20 lg:h-24">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center self-stretch py-2" aria-label="AMC - Alpes Matériel Compact">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-amc.png"
                alt="AMC - Alpes Matériel Compact"
                className="h-full w-auto object-contain max-h-20 lg:max-h-24"
              />
            </Link>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-[480px]">
              <div
                className={`relative flex items-center rounded-lg transition-all duration-200 ${
                  searchFocused ? "ring-2 ring-amc-yellow" : ""
                }`}
                style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
              >
                <IconSearch className="absolute left-3.5 text-gray-400" size={18} />
                <input
                  type="search"
                  placeholder="Rechercher un matériel, une référence..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full pl-10 pr-4 py-2.5 bg-transparent text-sm text-amc-text placeholder:text-gray-400 focus:outline-none rounded-lg"
                />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center gap-1 ml-auto">
              <button className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-white hover:bg-white/15 transition-colors text-xs font-medium">
                <IconHardHat size={20} />
                <span>Mon chantier</span>
              </button>
              <Link
                href="/contact#agences"
                className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-white hover:bg-white/15 transition-colors text-xs font-medium"
              >
                <IconMapPin size={20} />
                <span>Nos agences</span>
              </Link>
              <Link
                href="/contact"
                className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-white hover:bg-white/15 transition-colors text-xs font-medium"
              >
                <IconUser size={20} />
                <span>Me contacter</span>
              </Link>
              <Link
                href="/contact?type=devis"
                className="btn-primary text-sm py-2.5 px-4 ml-2 rounded-lg whitespace-nowrap"
              >
                Demande de devis
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── BARRE 2 : NAVIGATION ── */}
      <header
        className={`sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? "shadow-header" : ""}`}
        style={{ backgroundColor: "#9B9B9B" }}
        onMouseLeave={handleMenuLeave}
      >
        {/* Mobile row (logo + hamburger) */}
        <div className="lg:hidden flex items-center justify-between px-4 h-16" style={{ backgroundColor: "#9B9B9B" }}>
          <Link href="/" aria-label="AMC - Alpes Matériel Compact">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-amc.png" alt="AMC" className="h-12 w-auto object-contain" />
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <IconX size={24} /> : <IconMenu size={24} />}
          </button>
        </div>

        {/* Desktop nav bar */}
        <nav className="hidden lg:block">
          <div className="container-amc">
            <div className="flex items-center gap-2 h-14">

              <div className="relative flex items-center h-full" onMouseEnter={() => handleMenuEnter("materiels")}>
                <button
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold transition-all"
                  style={{ backgroundColor: "#FFD500", color: "#000000" }}
                >
                  Nos matériels <IconChevronDown size={14} className={`transition-transform ${activeMenu === "materiels" ? "rotate-180" : ""}`} />
                </button>
              </div>

              <div className="relative flex items-center h-full" onMouseEnter={() => handleMenuEnter("besoins")}>
                <button className="flex items-center gap-1.5 px-4 text-sm font-semibold text-white hover:text-amc-yellow transition-colors">
                  Vos besoins <IconChevronDown size={14} className={`transition-transform ${activeMenu === "besoins" ? "rotate-180" : ""}`} />
                </button>
              </div>

              <div className="relative flex items-center h-full" onMouseEnter={() => handleMenuEnter("services")}>
                <button className="flex items-center gap-1.5 px-4 text-sm font-semibold text-white hover:text-amc-yellow transition-colors">
                  Nos services <IconChevronDown size={14} className={`transition-transform ${activeMenu === "services" ? "rotate-180" : ""}`} />
                </button>
              </div>

              <div className="relative flex items-center h-full" onMouseEnter={() => handleMenuEnter("partenaires")}>
                <button className="flex items-center gap-1.5 px-4 text-sm font-semibold text-white hover:text-amc-yellow transition-colors">
                  Nos partenaires <IconChevronDown size={14} className={`transition-transform ${activeMenu === "partenaires" ? "rotate-180" : ""}`} />
                </button>
              </div>

              <Link
                href="/contact"
                className="flex items-center px-4 text-sm font-semibold text-white hover:text-amc-yellow transition-colors"
              >
                Contact & Devis
              </Link>

              <div className="ml-auto flex items-center gap-3">
                <SEBadge size="sm" />
              </div>
            </div>
          </div>

          {/* Mega menu: Nos matériels */}
          {activeMenu === "materiels" && (
            <div className="mega-menu" onMouseEnter={() => handleMenuEnter("materiels")}>
              <div className="container-amc py-8">
                <div className="grid grid-cols-12 gap-8">
                  <div className="col-span-5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amc-text-secondary mb-4">Par catégorie</h3>
                    <div className="grid grid-cols-2 gap-1">
                      {MEGA_MENUS.materiels.categories.map((cat) => (
                        <Link key={cat.href} href={cat.href} className="dropdown-item rounded-lg">
                          <div>
                            <div className="font-medium text-amc-text">{cat.label}</div>
                            <div className="text-xs text-amc-text-secondary">{cat.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amc-text-secondary mb-4">Par marque</h3>
                    <div className="space-y-1">
                      {MEGA_MENUS.materiels.brands.map((brand) => (
                        <Link key={brand.href} href={brand.href} className="dropdown-item">
                          <div className="font-semibold">{brand.label}</div>
                          <span className="ml-auto text-xs bg-amc-yellow text-amc-text px-1.5 py-0.5 rounded font-bold">{brand.badge}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-6 space-y-1">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-amc-text-secondary mb-4">État</h3>
                      {MEGA_MENUS.materiels.states.map((state) => (
                        <Link key={state.href} href={state.href} className="dropdown-item">
                          <span>{state.icon}</span>
                          <span className="font-medium">{state.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-4">
                    <div className="bg-amc-yellow/10 rounded-xl p-5 border border-amc-yellow/20">
                      <div className="font-bold text-amc-text mb-2">Besoin d'un conseil ?</div>
                      <p className="text-sm text-amc-text-secondary mb-4">
                        Nos experts AMC vous accompagnent dans le choix de vos équipements de chantier.
                      </p>
                      <Link href="/contact" className="btn-primary text-sm w-full justify-center">
                        Parler à un expert <IconArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mega menu: Vos besoins */}
          {activeMenu === "besoins" && (
            <div className="mega-menu" onMouseEnter={() => handleMenuEnter("besoins")}>
              <div className="container-amc py-8">
                <div className="grid grid-cols-3 gap-1">
                  {MEGA_MENUS.besoins.map((item) => (
                    <Link key={item.href} href={item.href} className="dropdown-item rounded-lg">
                      <div>
                        <div className="font-semibold">{item.label}</div>
                        <div className="text-xs text-amc-text-secondary">{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mega menu: Nos services */}
          {activeMenu === "services" && (
            <div className="mega-menu" onMouseEnter={() => handleMenuEnter("services")}>
              <div className="container-amc py-8">
                <div className="grid grid-cols-3 gap-1">
                  {MEGA_MENUS.services.map((item) => (
                    <Link key={item.href} href={item.href} className="dropdown-item rounded-lg">
                      <div>
                        <div className="font-semibold">{item.label}</div>
                        <div className="text-xs text-amc-text-secondary">{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mega menu: Nos partenaires */}
          {activeMenu === "partenaires" && (
            <div className="mega-menu" onMouseEnter={() => handleMenuEnter("partenaires")}>
              <div className="container-amc py-8">
                <div className="grid grid-cols-3 gap-4">
                  {MEGA_MENUS.partenaires.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block p-4 rounded-xl border border-gray-100 hover:border-amc-yellow/50 hover:bg-amc-yellow/5 transition-all"
                    >
                      <div className="font-bold text-amc-text mb-1">{item.label}</div>
                      <div className="text-sm text-amc-text-secondary">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/20 bg-white max-h-[80vh] overflow-y-auto">
            <div className="p-4">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="search"
                    placeholder="Rechercher un matériel..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amc-yellow"
                  />
                </div>
              </form>
              <nav className="space-y-1">
                {[
                  { label: "Nos matériels", href: "/catalogue" },
                  { label: "Matériel neuf", href: "/catalogue?etat=neuf" },
                  { label: "Matériel occasion", href: "/occasion" },
                  { label: "Wacker Neuson", href: "/partenaires/wacker-neuson" },
                  { label: "Magni", href: "/partenaires/magni" },
                  { label: "Promove Demolition", href: "/partenaires/promove-demolition" },
                  { label: "Nos services", href: "/services" },
                  { label: "Contact & Devis", href: "/contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 text-sm font-medium text-amc-text"
                  >
                    {link.label}
                    <IconArrowRight size={14} className="text-gray-400" />
                  </Link>
                ))}
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link href="/contact?type=devis" className="btn-primary w-full justify-center text-sm">
                  Demande de devis
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
