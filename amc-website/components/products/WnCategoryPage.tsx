"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { WnMachine } from "@/lib/wn-catalogue";
import {
  CATEGORY_LABELS,
  getCategoryUrlSlug,
  getAllWnMachines,
  getWnCategories,
} from "@/lib/wn-catalogue";
import { getCatalogueBrands } from "@/lib/data";
import {
  IconSearch,
  IconFilter,
  IconArrowRight,
  IconCheck,
  IconChevronDown,
  IconX,
} from "@/components/ui/Icons";
import { SEBadge } from "@/components/ui/SEBadge";

// Computed once at module level — 55 machines, no re-import cost
const ALL_MACHINES = getAllWnMachines();
const ALL_CATEGORIES = getWnCategories(); // [{slug, label, count}]
const ALL_BRANDS = getCatalogueBrands(); // [{id, label, count}]

function brandIdFromMarque(marque: string): string {
  const m = marque.toLowerCase();
  if (m.includes("magni")) return "magni";
  if (m.includes("promove")) return "promove-demolition";
  return "wacker-neuson";
}

function placeholderForBrand(brandId: string): string {
  if (brandId === "magni") return "/images/products/placeholder-magni.svg";
  if (brandId === "promove-demolition") return "/images/products/placeholder-promove.svg";
  return "/images/products/placeholder-wn.svg";
}

const SORT_OPTIONS = [
  { value: "featured", label: "Pertinence" },
  { value: "name-asc", label: "Alphabétique A→Z" },
  { value: "name-desc", label: "Alphabétique Z→A" },
  { value: "disponible", label: "Disponibles en premier" },
];

// ── Machine card ──────────────────────────────────────────────────────────────

function MachineCard({ machine }: { machine: WnMachine }) {
  const [imgError, setImgError] = useState(false);
  const categorySlug = getCategoryUrlSlug(machine);
  const href = `/materiels/${categorySlug}/${machine.slug}`;
  const isAvailable = machine.disponibilite === "disponible";
  const brandId = brandIdFromMarque(machine.marque ?? "");
  const imgSrc = machine.medias?.image_principale
    ? encodeURI(machine.medias.image_principale)
    : null;

  return (
    <Link
      href={href}
      className="group bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden flex flex-col"
    >
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {imgSrc && !imgError ? (
          <Image
            src={imgSrc}
            alt={machine.nom_complet}
            fill
            loading="lazy"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
            <Image
              src={placeholderForBrand(brandId)}
              alt=""
              fill
              className="object-contain p-4 opacity-60"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            machine.etat === "neuf"
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}>
            {machine.etat === "neuf" ? "Neuf" : "Occasion"}
          </span>
          {machine.services.sav_certifie_se_plus && <SEBadge size="sm" />}
        </div>
        {!isAvailable && (
          <div className="absolute top-3 right-3">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/90 text-amc-text-secondary">
              Sur commande
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 p-4 flex flex-col">
        <p className="text-xs text-amc-text-secondary mb-1">{machine.sous_categorie}</p>
        <h3 className="font-bold text-amc-text text-sm leading-snug mb-2 group-hover:text-amc-yellow-dark transition-colors">
          {machine.nom_complet}
        </h3>
        <p className="text-xs text-amc-text-secondary line-clamp-2 flex-1 mb-3">
          {machine.description_courte}
        </p>

        {Object.keys(machine.caracteristiques_techniques).length > 0 && (
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {Object.entries(machine.caracteristiques_techniques).slice(0, 2).map(([key, val]) => (
              <div key={key} className="bg-gray-50 rounded-lg px-2 py-1.5">
                <p className="text-[10px] text-amc-text-secondary truncate capitalize">
                  {key.replace(/_/g, " ").replace("kg", "").replace("kw", "").trim()}
                </p>
                <p className="text-xs font-bold text-amc-text">{String(val)}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div>
            {machine.prix_ht ? (
              <p className="font-black text-amc-text">
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                  maximumFractionDigits: 0,
                }).format(machine.prix_ht)}
                <span className="text-xs font-normal text-amc-text-secondary ml-1">HT</span>
              </p>
            ) : (
              <p className="text-sm font-semibold text-amc-text-secondary">Sur devis</p>
            )}
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-amc-yellow-dark group-hover:gap-2 transition-all">
            Voir la fiche <IconArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Collapsible filter section ────────────────────────────────────────────────

function FilterSection({
  title,
  children,
  defaultOpen = true,
  count,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  count?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-semibold text-amc-text mb-0 py-1 hover:text-amc-yellow-dark transition-colors"
      >
        <span className="flex items-center gap-2">
          {title}
          {count !== undefined && count > 0 && (
            <span className="text-xs font-bold bg-amc-yellow text-amc-text px-1.5 py-0.5 rounded-full leading-none">
              {count}
            </span>
          )}
        </span>
        <IconChevronDown
          size={14}
          className={`text-amc-text-secondary flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        style={{
          maxHeight: open ? "600px" : "0",
          overflow: "hidden",
          transition: "max-height 0.25s ease-in-out",
        }}
      >
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}

// ── Custom radio/checkbox ─────────────────────────────────────────────────────

function FilterOption({
  checked,
  onChange,
  label,
  count,
  disabled = false,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count?: number;
  disabled?: boolean;
}) {
  return (
    <label
      className={`flex items-center justify-between gap-2 cursor-pointer group ${
        disabled ? "opacity-40 cursor-not-allowed" : ""
      }`}
    >
      <div className="flex items-center gap-2.5" onClick={disabled ? undefined : onChange}>
        <div
          className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
            checked
              ? "bg-amc-yellow border-amc-yellow"
              : disabled
              ? "border-gray-200"
              : "border-gray-300 group-hover:border-amc-yellow"
          } ${disabled ? "" : "cursor-pointer"}`}
        >
          {checked && <IconCheck size={10} className="text-black" />}
        </div>
        <span className={`text-sm transition-colors ${
          checked ? "font-semibold text-amc-text" : "text-amc-text group-hover:text-amc-text"
        }`}>
          {label}
        </span>
      </div>
      {count !== undefined && (
        <span className={`text-xs flex-shrink-0 ${
          count === 0 ? "text-gray-300" : "text-amc-text-secondary"
        }`}>
          ({count})
        </span>
      )}
    </label>
  );
}

// ── Main page component ───────────────────────────────────────────────────────

export function WnCategoryPage({
  machines,
  categorySlug,
}: {
  machines: WnMachine[];
  categorySlug: string;
}) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "neuf" | "occasion">("all");
  const [filterAvailability, setFilterAvailability] = useState<"all" | "disponible" | "sur_commande">("all");
  const [sort, setSort] = useState("featured");
  const [mobileFiltres, setMobileFiltres] = useState(false);

  const categoryLabel = CATEGORY_LABELS[categorySlug] ?? categorySlug;
  const currentBrandId = brandIdFromMarque(machines[0]?.marque ?? "");

  // ── Dynamic category counts (all machines, filtered by status + availability) ──
  const categoryCounts = useMemo(() => {
    let list = ALL_MACHINES;
    if (filterStatus !== "all") list = list.filter((m) => m.etat === filterStatus);
    if (filterAvailability !== "all") list = list.filter((m) => m.disponibilite === filterAvailability);

    const counts: Record<string, number> = {};
    for (const m of list) {
      counts[getCategoryUrlSlug(m)] = (counts[getCategoryUrlSlug(m)] ?? 0) + 1;
    }
    return counts;
  }, [filterStatus, filterAvailability]);

  // ── Filtered machines for the current category ──
  const filtered = useMemo(() => {
    let list = [...machines];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (m) =>
          m.nom_complet.toLowerCase().includes(q) ||
          m.modele.toLowerCase().includes(q) ||
          m.description_courte.toLowerCase().includes(q)
      );
    }
    if (filterStatus !== "all") list = list.filter((m) => m.etat === filterStatus);
    if (filterAvailability !== "all") list = list.filter((m) => m.disponibilite === filterAvailability);

    list.sort((a, b) => {
      if (sort === "name-asc") return a.nom_complet.localeCompare(b.nom_complet, "fr");
      if (sort === "name-desc") return b.nom_complet.localeCompare(a.nom_complet, "fr");
      if (sort === "disponible") {
        if (a.disponibilite === b.disponibilite) return 0;
        return a.disponibilite === "disponible" ? -1 : 1;
      }
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

    return list;
  }, [machines, search, filterStatus, filterAvailability, sort]);

  const activeFilterCount =
    (filterStatus !== "all" ? 1 : 0) +
    (filterAvailability !== "all" ? 1 : 0);

  const resetFilters = () => {
    setFilterStatus("all");
    setFilterAvailability("all");
  };

  // ── Sidebar filter panel ──
  const FilterPanel = () => (
    <aside className="w-64 flex-shrink-0">
      <div className="bg-white rounded-xl shadow-card p-5 sticky top-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <IconFilter size={15} className="text-amc-text-secondary" />
            <h2 className="font-bold text-amc-text text-sm">Filtres</h2>
            {activeFilterCount > 0 && (
              <span className="text-xs font-bold bg-amc-yellow text-amc-text px-1.5 py-0.5 rounded-full leading-none">
                {activeFilterCount}
              </span>
            )}
          </div>
        </div>

        {/* ── 1. Marque ── */}
        <FilterSection title="Marque">
          <div className="space-y-0.5">
            {ALL_BRANDS.map((brand) => {
              const isCurrentBrand = brand.id === currentBrandId;
              return (
                <Link
                  key={brand.id}
                  href={isCurrentBrand ? "#" : `/catalogue?marque=${brand.id}`}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                    isCurrentBrand
                      ? "bg-amc-yellow/15 text-amc-text font-semibold border border-amc-yellow/40"
                      : "text-amc-text-secondary hover:text-amc-text hover:bg-gray-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isCurrentBrand && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amc-yellow flex-shrink-0" />
                    )}
                    {brand.label}
                  </span>
                  <span className={`text-xs flex-shrink-0 ml-2 ${
                    isCurrentBrand ? "font-bold text-amc-text" : "text-amc-text-secondary"
                  }`}>
                    ({brand.count})
                  </span>
                </Link>
              );
            })}
          </div>
        </FilterSection>

        {/* ── 2. Catégories de machines ── */}
        <FilterSection title="Catégories de machines">
          <div className="space-y-0.5">
            {ALL_CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.slug] ?? 0;
              const isCurrent = cat.slug === categorySlug;
              return (
                <Link
                  key={cat.slug}
                  href={`/materiels/${cat.slug}`}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                    isCurrent
                      ? "bg-amc-yellow/15 text-amc-text font-semibold border border-amc-yellow/40"
                      : count === 0
                      ? "text-gray-300 cursor-default pointer-events-none"
                      : "text-amc-text-secondary hover:text-amc-text hover:bg-gray-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amc-yellow flex-shrink-0" />
                    )}
                    {cat.label}
                  </span>
                  <span className={`text-xs flex-shrink-0 ml-2 ${
                    isCurrent ? "font-bold text-amc-text" : "text-amc-text-secondary"
                  }`}>
                    ({count})
                  </span>
                </Link>
              );
            })}
          </div>
        </FilterSection>

        {/* ── 3. Disponibilité ── */}
        <FilterSection title="Disponibilité" count={filterAvailability !== "all" ? 1 : undefined}>
          <div className="space-y-2.5">
            <FilterOption
              checked={filterAvailability === "all"}
              onChange={() => setFilterAvailability("all")}
              label="Tous"
            />
            {(["disponible", "sur_commande"] as const).map((v) => {
              const count = machines.filter(
                (m) =>
                  m.disponibilite === v &&
                  (filterStatus === "all" || m.etat === filterStatus)
              ).length;
              return (
                <FilterOption
                  key={v}
                  checked={filterAvailability === v}
                  onChange={() => setFilterAvailability(v)}
                  label={v === "disponible" ? "En stock" : "Sur commande"}
                  count={count}
                  disabled={count === 0 && filterAvailability !== v}
                />
              );
            })}
          </div>
        </FilterSection>

        {/* ── 4. État du matériel ── */}
        <FilterSection title="État du matériel" count={filterStatus !== "all" ? 1 : undefined}>
          <div className="space-y-2.5">
            <FilterOption
              checked={filterStatus === "all"}
              onChange={() => setFilterStatus("all")}
              label="Neuf et occasion"
            />
            {(["neuf", "occasion"] as const).map((v) => {
              const count = machines.filter(
                (m) =>
                  m.etat === v &&
                  (filterAvailability === "all" || m.disponibilite === filterAvailability)
              ).length;
              return (
                <FilterOption
                  key={v}
                  checked={filterStatus === v}
                  onChange={() => setFilterStatus(v)}
                  label={v === "neuf" ? "Matériel neuf" : "Matériel occasion"}
                  count={count}
                  disabled={false}
                />
              );
            })}
          </div>
        </FilterSection>

        {/* ── Reset button ── */}
        <button
          onClick={resetFilters}
          disabled={activeFilterCount === 0}
          className={`w-full mt-2 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
            activeFilterCount > 0
              ? "border-red-200 text-red-600 hover:bg-red-50 cursor-pointer"
              : "border-gray-100 text-gray-300 cursor-default"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <IconX size={14} />
            Réinitialiser les filtres
          </span>
        </button>

        {/* ── CTA ── */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="bg-amc-yellow/10 rounded-xl p-4 border border-amc-yellow/20">
            <p className="font-bold text-amc-text text-xs mb-1">Besoin d&apos;un conseil ?</p>
            <p className="text-[11px] text-amc-text-secondary mb-3">
              Nos experts vous aident à choisir la machine adaptée.
            </p>
            <Link
              href="/contact"
              className="btn-primary text-xs w-full justify-center py-2 rounded-lg"
            >
              Contacter un expert
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-amc-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-amc py-3">
          <nav className="text-sm text-amc-text-secondary" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:text-amc-yellow-dark">Accueil</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/catalogue" className="hover:text-amc-yellow-dark">Nos matériels</Link></li>
              <li aria-hidden>/</li>
              <li className="font-medium text-amc-text">{categoryLabel}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-amc py-8">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amc-text-secondary bg-white px-3 py-1 rounded-full border border-gray-200">
              {machines[0]?.marque ?? "Wacker Neuson"}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-amc-text">{categoryLabel}</h1>
          <p className="text-amc-text-secondary mt-2 text-sm max-w-2xl">
            Découvrez toute la gamme {machines[0]?.marque ?? "Wacker Neuson"} — distributeur officiel AMC Alpes Matériel Compact, région Rhône-Alpes.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder={`Rechercher parmi les ${categoryLabel.toLowerCase()}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amc-yellow"
            />
          </div>

          <button
            onClick={() => setMobileFiltres(true)}
            className="lg:hidden btn-secondary text-sm py-2.5 gap-2"
          >
            <IconFilter size={16} />
            Filtres
            {activeFilterCount > 0 && (
              <span className="bg-amc-yellow text-amc-text text-xs font-bold px-1.5 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="ml-auto bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-amc-text focus:outline-none focus:ring-2 focus:ring-amc-yellow cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filterStatus !== "all" && (
              <button
                onClick={() => setFilterStatus("all")}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-amc-yellow/10 text-amc-text text-xs font-medium rounded-full border border-amc-yellow/30 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
              >
                {filterStatus === "neuf" ? "Neuf" : "Occasion"} <IconX size={10} />
              </button>
            )}
            {filterAvailability !== "all" && (
              <button
                onClick={() => setFilterAvailability("all")}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-amc-yellow/10 text-amc-text text-xs font-medium rounded-full border border-amc-yellow/30 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
              >
                {filterAvailability === "disponible" ? "En stock" : "Sur commande"} <IconX size={10} />
              </button>
            )}
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <div className="hidden lg:block">
            <FilterPanel />
          </div>

          {/* Mobile drawer */}
          {mobileFiltres && (
            <>
              <div
                className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                onClick={() => setMobileFiltres(false)}
              />
              <div className="fixed inset-y-0 left-0 w-80 max-w-[90vw] bg-white z-50 overflow-y-auto shadow-2xl lg:hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <h2 className="font-bold text-amc-text">Filtres</h2>
                  <button
                    onClick={() => setMobileFiltres(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <IconX size={18} />
                  </button>
                </div>
                <div className="p-5">
                  <FilterPanel />
                </div>
              </div>
            </>
          )}

          {/* Products grid */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-amc-text-secondary mb-5">
              <strong className="text-amc-text">{filtered.length}</strong>{" "}
              machine{filtered.length > 1 ? "s" : ""} trouvée{filtered.length > 1 ? "s" : ""}
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl shadow-card">
                <div className="text-5xl mb-4">🔍</div>
                <h2 className="text-xl font-bold text-amc-text mb-2">Aucun résultat</h2>
                <p className="text-amc-text-secondary text-sm mb-6">
                  Modifiez vos critères ou réinitialisez les filtres.
                </p>
                <button onClick={resetFilters} className="btn-primary rounded-lg">
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((machine) => (
                  <MachineCard key={machine.id} machine={machine} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
