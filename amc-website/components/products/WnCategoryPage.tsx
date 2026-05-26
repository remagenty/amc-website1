"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { WnMachine } from "@/lib/wn-catalogue";
import { CATEGORY_LABELS, getCategoryUrlSlug } from "@/lib/wn-catalogue";
import { IconSearch, IconFilter, IconArrowRight, IconCheck, IconChevronDown } from "@/components/ui/Icons";
import { SEBadge } from "@/components/ui/SEBadge";

const SORT_OPTIONS = [
  { value: "featured", label: "Pertinence" },
  { value: "name-asc", label: "Alphabétique A→Z" },
  { value: "name-desc", label: "Alphabétique Z→A" },
  { value: "disponible", label: "Disponibles en premier" },
];

function MachineCard({ machine }: { machine: WnMachine }) {
  const categorySlug = getCategoryUrlSlug(machine);
  const href = `/materiels/${categorySlug}/${machine.slug}`;
  const isAvailable = machine.disponibilite === "disponible";

  return (
    <Link
      href={href}
      className="group bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden flex flex-col"
    >
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <Image
          src={machine.medias.image_principale || "/images/products/placeholder-wn.jpg"}
          alt={machine.nom_complet}
          fill
          loading="lazy"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/images/products/placeholder-wn.jpg";
          }}
        />
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

        {/* First 3 specs */}
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
                {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(machine.prix_ht)}
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

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-semibold text-amc-text mb-3"
      >
        {title}
        <IconChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && children}
    </div>
  );
}

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
  const [filterFeatured, setFilterFeatured] = useState(false);
  const [sort, setSort] = useState("featured");
  const [mobileFiltres, setMobileFiltres] = useState(false);

  const categoryLabel = CATEGORY_LABELS[categorySlug] ?? categorySlug;

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

    if (filterStatus !== "all") {
      list = list.filter((m) => m.etat === filterStatus);
    }

    if (filterAvailability !== "all") {
      list = list.filter((m) => m.disponibilite === filterAvailability);
    }

    if (filterFeatured) {
      list = list.filter((m) => m.featured);
    }

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
  }, [machines, search, filterStatus, filterAvailability, filterFeatured, sort]);

  const activeFilterCount =
    (filterStatus !== "all" ? 1 : 0) +
    (filterAvailability !== "all" ? 1 : 0) +
    (filterFeatured ? 1 : 0);

  const FilterPanel = () => (
    <aside className="w-64 flex-shrink-0">
      <div className="bg-white rounded-xl shadow-card p-5 sticky top-24">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-amc-text text-sm">Filtres</h2>
          {activeFilterCount > 0 && (
            <button
              onClick={() => {
                setFilterStatus("all");
                setFilterAvailability("all");
                setFilterFeatured(false);
              }}
              className="text-xs text-red-500 hover:text-red-700 font-medium"
            >
              Réinitialiser
            </button>
          )}
        </div>

        <FilterSection title="État du matériel">
          <div className="space-y-2">
            {(["all", "neuf", "occasion"] as const).map((v) => (
              <label key={v} className="flex items-center gap-2.5 cursor-pointer group">
                <div
                  onClick={() => setFilterStatus(v)}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0 ${
                    filterStatus === v
                      ? "bg-amc-yellow border-amc-yellow"
                      : "border-gray-300 group-hover:border-amc-yellow"
                  }`}
                >
                  {filterStatus === v && <IconCheck size={10} className="text-black" />}
                </div>
                <span className="text-sm text-amc-text capitalize">
                  {v === "all" ? "Tous" : v === "neuf" ? "Neuf" : "Occasion"}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Disponibilité">
          <div className="space-y-2">
            {(["all", "disponible", "sur_commande"] as const).map((v) => (
              <label key={v} className="flex items-center gap-2.5 cursor-pointer group">
                <div
                  onClick={() => setFilterAvailability(v)}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0 ${
                    filterAvailability === v
                      ? "bg-amc-yellow border-amc-yellow"
                      : "border-gray-300 group-hover:border-amc-yellow"
                  }`}
                >
                  {filterAvailability === v && <IconCheck size={10} className="text-black" />}
                </div>
                <span className="text-sm text-amc-text">
                  {v === "all" ? "Tous" : v === "disponible" ? "En stock" : "Sur commande"}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Mise en avant" defaultOpen={false}>
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <div
              onClick={() => setFilterFeatured(!filterFeatured)}
              className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0 ${
                filterFeatured
                  ? "bg-amc-yellow border-amc-yellow"
                  : "border-gray-300 group-hover:border-amc-yellow"
              }`}
            >
              {filterFeatured && <IconCheck size={10} className="text-black" />}
            </div>
            <span className="text-sm text-amc-text">Machines vedettes</span>
          </label>
        </FilterSection>

        {/* CTA */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="bg-amc-yellow/10 rounded-xl p-4 border border-amc-yellow/20">
            <p className="font-bold text-amc-text text-xs mb-1">Besoin d'un conseil ?</p>
            <p className="text-[11px] text-amc-text-secondary mb-3">
              Nos experts vous aident à choisir la machine adaptée.
            </p>
            <Link href="/contact" className="btn-primary text-xs w-full justify-center py-2 rounded-lg">
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
              <li><Link href="/materiels" className="hover:text-amc-yellow-dark">Nos matériels</Link></li>
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
              Wacker Neuson
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-amc-text">
            {categoryLabel}
          </h1>
          <p className="text-amc-text-secondary mt-2 text-sm max-w-2xl">
            Découvrez toute la gamme Wacker Neuson — distributeur officiel AMC Alpes Matériel Compact, région Rhône-Alpes.
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
                {filterStatus === "neuf" ? "Neuf" : "Occasion"} <span>×</span>
              </button>
            )}
            {filterAvailability !== "all" && (
              <button
                onClick={() => setFilterAvailability("all")}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-amc-yellow/10 text-amc-text text-xs font-medium rounded-full border border-amc-yellow/30 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
              >
                {filterAvailability === "disponible" ? "En stock" : "Sur commande"} <span>×</span>
              </button>
            )}
            {filterFeatured && (
              <button
                onClick={() => setFilterFeatured(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-amc-yellow/10 text-amc-text text-xs font-medium rounded-full border border-amc-yellow/30 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
              >
                Vedettes <span>×</span>
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
              <div className="fixed inset-y-0 left-0 w-80 max-w-[90vw] bg-white z-50 overflow-y-auto p-5 shadow-2xl lg:hidden">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-amc-text">Filtres</h2>
                  <button
                    onClick={() => setMobileFiltres(false)}
                    className="text-amc-text-secondary hover:text-amc-text"
                  >
                    ✕
                  </button>
                </div>
                <FilterPanel />
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
                <button
                  onClick={() => {
                    setSearch("");
                    setFilterStatus("all");
                    setFilterAvailability("all");
                    setFilterFeatured(false);
                  }}
                  className="btn-primary rounded-lg"
                >
                  Réinitialiser
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
