"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconSearch,
  IconMapPin,
  IconChevronDown,
  IconMenu,
  IconX,
  IconArrowRight,
} from "@/components/ui/Icons";
import { BRAND_VISIBLE_COUNTS } from "@/lib/data";

const TOP_BAR_ITEMS: { label: string; href?: string }[] = [
  { label: "📞 04 26 78 43 90" },
  { label: "📍 ZAC D'Orsan, Saint-Félix (74)", href: "/contact#nous-localiser" },
  { label: "⏰ Lun-Ven : 8h-12h / 14h-18h" },
];

const PARTNER_HERO_IMAGES = [
  "/images/photo-wacker-catalogue.webp",
  "/images/Magni-catalogue.webp",
  "/images/catalogue-promove-demolition.webp",
];

const FLAT_CATEGORIES = [
  { label: "Mini-pelles", href: "/catalogue?categorie=mini-pelles" },
  { label: "Dumpers articulés", href: "/catalogue?categorie=dumpers" },
  { label: "Chargeuses compactes", href: "/catalogue?categorie=chargeuses" },
  { label: "Compacteurs tandem", href: "/catalogue?categorie=compacteurs" },
  { label: "Plaques vibrantes", href: "/catalogue?categorie=plaques-vibrantes" },
  { label: "Pilonneuses", href: "/catalogue?categorie=pilonneuses" },
  { label: "Marteaux piqueurs", href: "/catalogue?categorie=marteaux-piqueurs" },
  { label: "Télescopiques", href: "/catalogue?categorie=telescopiques" },
  { label: "Chariots télescopiques et nacelles rotatifs", href: "/catalogue?categorie=telehandlers-rotatifs" },
  { label: "Chariots télescopiques et nacelles fixes", href: "/catalogue?categorie=telehandlers-fixes" },
  { label: "Chariots télescopiques et nacelles agricoles", href: "/catalogue?categorie=telehandlers-agricoles" },
  { label: "Brise-roches hydrauliques", href: "/catalogue?categorie=brise-roches" },
  { label: "Cisailles à ferraille", href: "/catalogue?categorie=cisailles" },
  { label: "Pinces de tri et démolition", href: "/catalogue?categorie=pinces-de-tri" },
  { label: "Pinces multiprocesseurs", href: "/catalogue?categorie=pinces-multiprocesseurs" },
  { label: "Pulvérisateurs béton", href: "/catalogue?categorie=pulverisateurs" },
];

const MEGA_MENUS = {
  materiels: {
    brands: [
      { label: "WACKER NEUSON", href: "/catalogue?marque=wacker-neuson", badge: `${BRAND_VISIBLE_COUNTS["wacker-neuson"] ?? 0} machines` },
      { label: "Magni", href: "/catalogue?marque=magni", badge: `${BRAND_VISIBLE_COUNTS["magni"] ?? 0} machines` },
      { label: "Promove Demolition", href: "/catalogue?marque=promove-demolition", badge: `${BRAND_VISIBLE_COUNTS["promove-demolition"] ?? 0} outils` },
    ],
  },
  partenaires: [
    { label: "WACKER NEUSON", href: "/partenaires/wacker-neuson", desc: "Gamme complète équipements compacts" },
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

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const partnersImagesPreloaded = useRef(false);
  const preloadPartnerImages = () => {
    if (partnersImagesPreloaded.current) return;
    partnersImagesPreloaded.current = true;
    PARTNER_HERO_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  };

  const closeMenu = () => {
    setActiveMenu(null);
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

        @keyframes badge-jump {
          0%   { top: 20px; left: 40px; }
          15%  { top: 11px; left: 40px; }
          30%  { top: 20px; left: 40px; }
          100% { top: 20px; left: 40px; }
        }
        .badge-animate {
          position: absolute;
          top: 20px;
          left: 40px;
          animation: badge-jump 4s ease-in-out infinite;
        }
      `}</style>

      {/* Overlay — click outside to close any open menu */}
      {activeMenu && (
        <div className="fixed inset-0 z-[45]" onClick={closeMenu} />
      )}

      {/* Top bar — rotating info */}
      <div
        className="hidden lg:flex items-center justify-center text-xs"
        style={{ backgroundColor: "#FFFFFF", color: "#000000", height: "36px" }}
      >
        <div key={carouselIndex} className="carousel-item font-medium">
          {TOP_BAR_ITEMS[carouselIndex].href ? (
            <Link
              href={TOP_BAR_ITEMS[carouselIndex].href!}
              className="hover:underline hover:opacity-75 transition-opacity cursor-pointer"
            >
              {TOP_BAR_ITEMS[carouselIndex].label}
            </Link>
          ) : (
            TOP_BAR_ITEMS[carouselIndex].label
          )}
        </div>
      </div>

      {/* ── BARRE 1 : HEADER (Logo + Recherche + Actions) ── */}
      <div style={{ backgroundColor: "#9B9B9B" }} className="hidden lg:block">
        <div className="container-amc">
          <div className="flex items-center gap-4 h-20 lg:h-24">

            <Link href="/" className="flex-shrink-0 flex items-center self-stretch py-2" aria-label="AMC - Alpes Matériel Compact">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-amc.png"
                alt="AMC - Alpes Matériel Compact"
                className="h-full w-auto object-contain max-h-20 lg:max-h-24"
              />
            </Link>

            <form onSubmit={handleSearch} className="flex-1">
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

            <div className="flex items-center gap-1 ml-auto">
              <Link
                href="/contact#agences"
                className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-white hover:bg-white/15 transition-colors text-xs font-medium"
              >
                <IconMapPin size={20} />
                <span>Notre agence</span>
              </Link>
              <Link
                href="/connexion"
                className="hidden flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-white hover:bg-white/15 transition-colors"
              >
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/me-connecter.png" alt="" aria-hidden="true" className="h-9 w-auto" />
                  <span className="badge-animate w-4 h-4 bg-red-500 rounded-full text-white text-[9px] font-black flex items-center justify-center leading-none">
                    1
                  </span>
                </div>
                <span className="text-[11px] font-medium leading-tight">Me connecter</span>
                <span className="bg-amc-yellow text-amc-text text-[10px] font-black px-2.5 py-0.5 rounded-full leading-tight">
                  PRO
                </span>
              </Link>
              <Link
                href="/devis"
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
      >
        {/* Mobile row */}
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

        {/* Desktop nav */}
        <nav className="hidden lg:block">
          <div className="container-amc">
            <div className="flex items-center gap-1 h-14">

              {/* Nos matériels */}
              <div className="relative flex items-center h-full">
                <div
                  className="flex items-center gap-1.5 pl-5 pr-2 py-2 rounded-full text-sm font-semibold transition-all"
                  style={{ backgroundColor: "#FFD500", color: "#000000" }}
                >
                  <Link href="/gammes" onClick={closeMenu}>
                    Nos matériels
                  </Link>
                  <button
                    aria-label="Afficher les catégories de matériels"
                    className="flex items-center"
                    onClick={() => toggleMenu("materiels")}
                  >
                    <IconChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === "materiels" ? "rotate-180" : ""}`} />
                  </button>
                </div>
              </div>

              {/* Nos services */}
              <div className="relative flex items-center h-full">
                <button
                  className="flex items-center gap-1.5 px-4 text-sm font-semibold text-white hover:text-amc-yellow transition-colors"
                  onClick={() => toggleMenu("services")}
                >
                  Nos services
                  <IconChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === "services" ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* Nos partenaires */}
              <div className="relative flex items-center h-full">
                <button
                  className="flex items-center gap-1.5 px-4 text-sm font-semibold text-white hover:text-amc-yellow transition-colors"
                  onClick={() => toggleMenu("partenaires")}
                  onMouseEnter={preloadPartnerImages}
                  onFocus={preloadPartnerImages}
                >
                  Nos partenaires
                  <IconChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === "partenaires" ? "rotate-180" : ""}`} />
                </button>
              </div>

              {/* À propos */}
              <Link
                href="/a-propos"
                className="flex items-center px-4 text-sm font-semibold text-white hover:text-amc-yellow transition-colors"
              >
                À propos
              </Link>

              {/* Actualités & Expertise */}
              <Link
                href="/actualites"
                className="flex items-center px-4 text-sm font-semibold text-white hover:text-amc-yellow transition-colors"
              >
                Actualités & Expertise
              </Link>

              <div className="ml-auto" />

              {/* Contact — extrême droite */}
              <Link
                href="/contact"
                className={`flex items-center px-4 text-sm font-semibold transition-colors ${
                  pathname === "/contact"
                    ? "text-amc-yellow"
                    : "text-white hover:text-amc-yellow"
                }`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Mega menu: Nos matériels */}
          {activeMenu === "materiels" && (
            <div className="mega-menu" style={{ position: "relative", zIndex: 50 }}>
              <div className="container-amc py-6">
                <div className="grid grid-cols-12 gap-8">
                  <div className="col-span-8">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amc-text-secondary mb-3">
                      Nos catégories
                    </h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                      {FLAT_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-amc-text-secondary hover:text-amc-text hover:bg-amc-yellow/5 rounded-lg transition-colors"
                          onClick={closeMenu}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amc-yellow flex-shrink-0" />
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-4 space-y-5">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-amc-text-secondary mb-3">
                        Par marque
                      </h3>
                      <div className="space-y-1">
                        {MEGA_MENUS.materiels.brands.map((brand) => (
                          <Link key={brand.href} href={brand.href} className="dropdown-item" onClick={closeMenu}>
                            <div className="font-semibold">{brand.label}</div>
                            <span className="ml-auto text-xs bg-amc-yellow text-amc-text px-1.5 py-0.5 rounded font-bold">{brand.badge}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="bg-amc-yellow/10 rounded-xl p-4 border border-amc-yellow/20">
                      <div className="font-bold text-amc-text mb-1 text-sm">Besoin d&apos;un conseil ?</div>
                      <p className="text-xs text-amc-text-secondary mb-3">
                        Nos experts AMC vous accompagnent dans le choix de vos équipements de chantier.
                      </p>
                      <Link href="/contact" className="btn-primary text-sm w-full justify-center" onClick={closeMenu}>
                        Parler à un expert <IconArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mega menu: Nos services — 3 blocs égaux */}
          {activeMenu === "services" && (
            <div className="mega-menu" style={{ position: "relative", zIndex: 50 }}>
              <div className="container-amc py-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amc-text-secondary mb-5">
                  Nos prestations
                </h3>
                <div className="grid grid-cols-3 gap-5">

                  {/* Bloc 1 — Vente & Location */}
                  <div className="flex flex-col p-5 rounded-xl border border-gray-100 hover:border-amc-yellow/50 hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-lg bg-amc-yellow/10 flex items-center justify-center mb-4 text-xl">
                      🏗️
                    </div>
                    <h4 className="font-bold text-amc-text text-base mb-3">Vente</h4>
                    <ul className="space-y-2 text-sm text-amc-text-secondary flex-1">
                      {["Machines neuves", "Machines d'occasion"].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amc-yellow flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link href="/gammes" className="mt-5 btn-primary text-sm w-full justify-center" onClick={closeMenu}>
                      Voir tous nos matériels <IconArrowRight size={13} />
                    </Link>
                  </div>

                  {/* Bloc 2 — SAV certifié */}
                  <div className="flex flex-col p-5 rounded-xl border border-amc-yellow/30 bg-amc-yellow/5 hover:border-amc-yellow hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">🔧</span>
                      <span className="text-xs font-bold bg-amc-yellow text-amc-text px-2 py-0.5 rounded">SAV</span>
                    </div>
                    <h4 className="font-bold text-amc-text text-base mb-3">SAV certifié</h4>
                    <p className="text-sm text-amc-text-secondary flex-1">
                      Atelier agréé par les constructeurs, techniciens certifiés, pièces d&apos;origine garanties.
                    </p>
                    <Link href="/sav" className="mt-5 btn-primary text-sm w-full justify-center" onClick={closeMenu}>
                      En savoir plus <IconArrowRight size={13} />
                    </Link>
                  </div>

                  {/* Bloc 3 — Maintenance & Pièces */}
                  <div className="flex flex-col p-5 rounded-xl border border-gray-100 hover:border-amc-yellow/50 hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-lg bg-amc-yellow/10 flex items-center justify-center mb-4 text-xl">
                      ⚙️
                    </div>
                    <h4 className="font-bold text-amc-text text-base mb-3">Maintenance &amp; Pièces</h4>
                    <ul className="space-y-2 text-sm text-amc-text-secondary flex-1">
                      {["Pièces détachées d'origine constructeur", "Maintenance préventive (contrats sur mesure)"].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amc-yellow flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link href="/devis?type=pieces" className="mt-5 btn-primary text-sm w-full justify-center" onClick={closeMenu}>
                      Commander des pièces <IconArrowRight size={13} />
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* Mega menu: Nos partenaires */}
          {activeMenu === "partenaires" && (
            <div className="mega-menu" style={{ position: "relative", zIndex: 50 }}>
              <div className="container-amc py-8">
                <div className="grid grid-cols-3 gap-4">
                  {MEGA_MENUS.partenaires.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block p-4 rounded-xl border border-gray-100 hover:border-amc-yellow/50 hover:bg-amc-yellow/5 transition-all"
                      onClick={closeMenu}
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
                  { label: "Nos matériels", href: "/gammes" },
                  { label: "Matériel neuf", href: "/catalogue" },
                  { label: "Matériel occasion", href: "/occasion" },
                  { label: "WACKER NEUSON", href: "/partenaires/wacker-neuson" },
                  { label: "Magni", href: "/partenaires/magni" },
                  { label: "Promove Demolition", href: "/partenaires/promove-demolition" },
                  { label: "Nos services", href: "/services" },
                  { label: "SAV & Atelier", href: "/sav" },
                  { label: "Actualités & Expertise", href: "/actualites" },
                  { label: "Contact & Devis", href: "/contact" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 text-sm font-medium text-amc-text"
                  >
                    {link.label}
                    <IconArrowRight size={14} className="text-gray-400" />
                  </Link>
                ))}
              </nav>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link href="/devis" className="btn-primary w-full justify-center text-sm">
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
