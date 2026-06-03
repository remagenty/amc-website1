"use client";

import { useState, useMemo } from "react";
import {
  IconSearch,
  IconX,
  IconChevronDown,
  IconChevronRight,
  IconFilter,
} from "@/components/ui/Icons";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface Filters {
  categories: string[];
  brands: string[];
  status: string;
  availability?: string;
  priceMin?: number;
  priceMax?: number;
}

export interface FilterSidebarProps {
  selected: Filters;
  onChange: (key: string, value: unknown) => void;
  onReset: () => void;
  totalCount: number;
  mobileOpen: boolean;
  onMobileClose: () => void;
  availableCategories?: FilterOption[];
  availableBrands?: FilterOption[];
  search: string;
  onSearchChange: (s: string) => void;
}

// ─── Category emoji icons ──────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<string, string> = {
  "mini-pelles": "⛏️",
  "dumpers": "🚛",
  "chargeuses": "🚜",
  "compacteurs": "🪨",
  "plaques-vibrantes": "📳",
  "pilonneuses": "🔨",
  "marteaux-piqueurs": "⚒️",
  "outillage": "🔧",
  "telescopiques": "🏗️",
  "telehandlers-rotatifs": "🔄",
  "telehandlers-fixes": "📐",
  "telehandlers-agricoles": "🌾",
  "brise-roches": "💥",
  "pinces-multiprocesseurs": "🦾",
  "pulverisateurs": "💧",
  "cisailles": "✂️",
  "pinces-de-tri": "🔩",
};

// ─── Quick-access tags ────────────────────────────────────────────────────────

const QUICK_TAGS: Array<{ label: string; emoji: string; categories: string[] }> = [
  {
    label: "Téléhandler",
    emoji: "🏗️",
    categories: ["telehandlers-rotatifs", "telehandlers-fixes", "telehandlers-agricoles"],
  },
  { label: "Mini-pelle", emoji: "⛏️", categories: ["mini-pelles"] },
  {
    label: "Outillage",
    emoji: "🔧",
    categories: ["outillage", "marteaux-piqueurs", "plaques-vibrantes", "pilonneuses"],
  },
];

// ─── Collapsible section ──────────────────────────────────────────────────────

function CollapsibleSection({
  title,
  open,
  onToggle,
  badge,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  badge?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-gray-100">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-2.5 group"
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-amc-text uppercase tracking-widest group-hover:text-amc-yellow-dark transition-colors">
            {title}
          </span>
          {badge != null && badge > 0 && (
            <span className="w-4 h-4 rounded-full bg-amc-yellow text-amc-text text-[9px] font-black flex items-center justify-center leading-none">
              {badge}
            </span>
          )}
        </div>
        <IconChevronDown
          size={12}
          className={`text-gray-400 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="pb-3">{children}</div>}
    </div>
  );
}

// ─── Filter content — stable top-level component ──────────────────────────────
// Defined at module level (not inside FilterSidebar) so React never remounts it
// on parent re-renders, preserving input focus and accordion state.

function FilterContent({
  selected,
  onChange,
  onReset,
  totalCount,
  availableCategories,
  availableBrands,
  search,
  onSearchChange,
}: Omit<FilterSidebarProps, "mobileOpen" | "onMobileClose"> & {
  availableCategories: FilterOption[];
  availableBrands: FilterOption[];
}) {
  const [openSections, setOpenSections] = useState({
    brands: true,
    availability: false,
    status: false,
    budget: false,
  });

  const toggle = (key: keyof typeof openSections) =>
    setOpenSections((p) => ({ ...p, [key]: !p[key] }));

  const toggleMulti = (key: string, value: string, current: string[]) =>
    onChange(
      key,
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    );

  const activeCount =
    selected.categories.length +
    selected.brands.length +
    (selected.status !== "all" ? 1 : 0) +
    (selected.availability && selected.availability !== "all" ? 1 : 0) +
    (selected.priceMin ? 1 : 0) +
    (selected.priceMax ? 1 : 0);

  // Filter category list by search query (for the sidebar list)
  const visibleCategories = useMemo(() => {
    if (!search.trim()) return availableCategories;
    const q = search.toLowerCase();
    return availableCategories.filter((c) => c.label.toLowerCase().includes(q));
  }, [availableCategories, search]);

  // Group visible categories by first letter
  const grouped = useMemo(() => {
    const map: Record<string, FilterOption[]> = {};
    for (const cat of visibleCategories) {
      const letter = cat.label[0].toUpperCase();
      if (!map[letter]) map[letter] = [];
      map[letter].push(cat);
    }
    return map;
  }, [visibleCategories]);

  const sortedLetters = Object.keys(grouped).sort();

  // Quick tag helpers
  const isQuickTagActive = (cats: string[]) =>
    cats.length > 0 && cats.every((c) => selected.categories.includes(c));

  const handleQuickTag = (cats: string[]) => {
    if (isQuickTagActive(cats)) {
      onChange("categories", selected.categories.filter((c) => !cats.includes(c)));
    } else {
      onChange("categories", [...new Set([...selected.categories, ...cats])]);
    }
  };

  return (
    <div className="flex flex-col h-full">

      {/* ── Header: title + search ── */}
      <div className="px-4 pt-4 pb-3 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <IconFilter size={13} className="text-amc-text-secondary" />
            <span className="font-bold text-amc-text text-sm">Filtres</span>
            {activeCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-black bg-amc-yellow text-amc-text rounded-full leading-none">
                {activeCount}
              </span>
            )}
          </div>
          {activeCount > 0 && (
            <button
              onClick={onReset}
              className="text-[11px] text-amc-text-secondary hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <IconX size={10} />
              Tout effacer
            </button>
          )}
        </div>

        <div className="relative">
          <input
            type="search"
            placeholder="Rechercher un matériel..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-3 pr-9 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amc-yellow focus:bg-white transition-colors placeholder:text-gray-400"
          />
          <IconSearch
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="overflow-y-auto flex-1 px-4 py-3">

        {/* Results count */}
        <p className="text-xs text-amc-text-secondary mb-3">
          <strong className="text-amc-text">{totalCount}</strong>{" "}
          résultat{totalCount > 1 ? "s" : ""}
        </p>

        {/* Les + recherchés */}
        <div className="mb-4">
          <p className="text-[10px] font-black text-amc-text-secondary uppercase tracking-widest mb-2">
            Les + recherchés
          </p>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_TAGS.map((tag) => {
              const active = isQuickTagActive(tag.categories);
              return (
                <button
                  key={tag.label}
                  onClick={() => handleQuickTag(tag.categories)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all ${
                    active
                      ? "bg-amc-yellow text-amc-text border-amc-yellow shadow-sm"
                      : "bg-white text-amc-text-secondary border-gray-200 hover:border-amc-yellow hover:text-amc-text"
                  }`}
                >
                  <span aria-hidden>{tag.emoji}</span>
                  {tag.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Categories with alphabetical index ── */}
        <div className="border-t border-gray-100 pt-3 mb-1">
          <p className="text-[10px] font-black text-amc-text-secondary uppercase tracking-widest mb-3">
            Catégorie de matériel
          </p>

          {visibleCategories.length === 0 ? (
            <p className="text-xs text-amc-text-secondary py-2 italic">
              Aucune catégorie trouvée
            </p>
          ) : (
            sortedLetters.map((letter) => (
              <div key={letter} className="mb-3">
                {/* Letter badge + rule */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-5 h-5 rounded text-[11px] font-black flex items-center justify-center bg-amc-yellow text-amc-text flex-shrink-0 leading-none">
                    {letter}
                  </span>
                  <div className="h-px bg-gray-100 flex-1" />
                </div>

                {/* Category rows */}
                {grouped[letter].map((cat) => {
                  const active = selected.categories.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => toggleMulti("categories", cat.id, selected.categories)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all group mb-0.5 border-l-[3px] ${
                        active
                          ? "bg-[#FFD700]/10 border-[#FFD700]"
                          : "border-transparent hover:bg-gray-50 hover:border-gray-200"
                      }`}
                    >
                      <span className="text-sm leading-none flex-shrink-0 w-5 text-center" aria-hidden>
                        {CATEGORY_ICONS[cat.id] ?? "📦"}
                      </span>
                      <span
                        className={`flex-1 text-xs leading-tight ${
                          active
                            ? "font-semibold text-amc-text"
                            : "font-medium text-amc-text-secondary group-hover:text-amc-text"
                        } transition-colors`}
                      >
                        {cat.label}
                      </span>
                      <span
                        className={`text-[10px] font-bold flex-shrink-0 ${
                          active ? "text-amc-text" : "text-gray-400"
                        }`}
                      >
                        {cat.count}
                      </span>
                      <IconChevronRight
                        size={10}
                        className={`flex-shrink-0 ${
                          active
                            ? "text-amc-text"
                            : "text-gray-300 group-hover:text-gray-500"
                        } transition-colors`}
                      />
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* ── Marque ── */}
        <CollapsibleSection
          title="Marque"
          open={openSections.brands}
          onToggle={() => toggle("brands")}
          badge={selected.brands.length || undefined}
        >
          <div className="space-y-0.5">
            {availableBrands.map((brand) => {
              const active = selected.brands.includes(brand.id);
              return (
                <label
                  key={brand.id}
                  className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer group transition-all border-l-[3px] ${
                    active
                      ? "bg-[#FFD700]/10 border-[#FFD700]"
                      : "border-transparent hover:bg-gray-50 hover:border-gray-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggleMulti("brands", brand.id, selected.brands)}
                    className="w-3.5 h-3.5 accent-amc-yellow cursor-pointer rounded flex-shrink-0"
                  />
                  <span
                    className={`flex-1 text-xs ${
                      active
                        ? "font-semibold text-amc-text"
                        : "font-medium text-amc-text-secondary group-hover:text-amc-text"
                    } transition-colors`}
                  >
                    {brand.label}
                  </span>
                  <span className={`text-[10px] font-bold ${active ? "text-amc-text" : "text-gray-400"}`}>
                    {brand.count}
                  </span>
                </label>
              );
            })}
          </div>
        </CollapsibleSection>

        {/* ── Disponibilité ── */}
        <CollapsibleSection
          title="Disponibilité"
          open={openSections.availability}
          onToggle={() => toggle("availability")}
          badge={
            selected.availability && selected.availability !== "all" ? 1 : undefined
          }
        >
          <div className="space-y-0.5">
            {[
              { value: "all", label: "Tous" },
              { value: "disponible", label: "En stock" },
              { value: "sur_commande", label: "Sur commande" },
            ].map((opt) => {
              const active = (selected.availability ?? "all") === opt.value;
              const highlight = active && opt.value !== "all";
              return (
                <label
                  key={opt.value}
                  className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer group transition-all border-l-[3px] ${
                    highlight
                      ? "bg-[#FFD700]/10 border-[#FFD700]"
                      : "border-transparent hover:bg-gray-50 hover:border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="availability"
                    value={opt.value}
                    checked={active}
                    onChange={() => onChange("availability", opt.value)}
                    className="w-3.5 h-3.5 accent-amc-yellow cursor-pointer flex-shrink-0"
                  />
                  <span
                    className={`flex-1 text-xs ${
                      highlight
                        ? "font-semibold text-amc-text"
                        : "font-medium text-amc-text-secondary group-hover:text-amc-text"
                    } transition-colors`}
                  >
                    {opt.label}
                  </span>
                </label>
              );
            })}
          </div>
        </CollapsibleSection>

        {/* ── État ── */}
        <CollapsibleSection
          title="État"
          open={openSections.status}
          onToggle={() => toggle("status")}
          badge={selected.status !== "all" ? 1 : undefined}
        >
          <div className="space-y-0.5">
            {[
              { value: "all", label: "Neuf et occasion" },
              { value: "neuf", label: "Matériel neuf" },
              { value: "occasion", label: "Matériel occasion" },
            ].map((opt) => {
              const active = selected.status === opt.value;
              const highlight = active && opt.value !== "all";
              return (
                <label
                  key={opt.value}
                  className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer group transition-all border-l-[3px] ${
                    highlight
                      ? "bg-[#FFD700]/10 border-[#FFD700]"
                      : "border-transparent hover:bg-gray-50 hover:border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={opt.value}
                    checked={active}
                    onChange={() => onChange("status", opt.value)}
                    className="w-3.5 h-3.5 accent-amc-yellow cursor-pointer flex-shrink-0"
                  />
                  <span
                    className={`flex-1 text-xs ${
                      highlight
                        ? "font-semibold text-amc-text"
                        : "font-medium text-amc-text-secondary group-hover:text-amc-text"
                    } transition-colors`}
                  >
                    {opt.label}
                  </span>
                </label>
              );
            })}
          </div>
        </CollapsibleSection>

        {/* ── Budget ── */}
        <CollapsibleSection
          title="Budget"
          open={openSections.budget}
          onToggle={() => toggle("budget")}
          badge={selected.priceMin || selected.priceMax ? 1 : undefined}
        >
          <div className="space-y-3">
            <div>
              <label className="text-xs text-amc-text-secondary mb-1 block">Prix minimum (€)</label>
              <input
                type="number"
                placeholder="0"
                value={selected.priceMin ?? ""}
                onChange={(e) =>
                  onChange("priceMin", e.target.value ? Number(e.target.value) : undefined)
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amc-yellow"
                min={0}
              />
            </div>
            <div>
              <label className="text-xs text-amc-text-secondary mb-1 block">Prix maximum (€)</label>
              <input
                type="number"
                placeholder="Illimité"
                value={selected.priceMax ?? ""}
                onChange={(e) =>
                  onChange("priceMax", e.target.value ? Number(e.target.value) : undefined)
                }
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amc-yellow"
                min={0}
              />
            </div>
          </div>
        </CollapsibleSection>

      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function FilterSidebar({
  mobileOpen,
  onMobileClose,
  availableCategories,
  availableBrands,
  ...contentProps
}: FilterSidebarProps) {
  const cats = availableCategories ?? [];
  const brands = availableBrands ?? [];

  return (
    <>
      {/* ── Desktop sticky sidebar ── */}
      <aside className="hidden lg:flex flex-col w-72 flex-shrink-0 bg-white rounded-xl shadow-card sticky top-24 overflow-hidden max-h-[calc(100vh-7rem)]">
        <FilterContent
          {...contentProps}
          availableCategories={cats}
          availableBrands={brands}
        />
      </aside>

      {/* ── Mobile: bottom sheet drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={onMobileClose} />

          {/* Sheet */}
          <div
            className="relative bg-white rounded-t-2xl shadow-2xl flex flex-col"
            style={{ maxHeight: "88vh" }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-gray-200" />
            </div>

            {/* Sheet header */}
            <div className="flex items-center justify-between px-5 py-2 flex-shrink-0">
              <span className="font-bold text-amc-text text-sm">Filtrer les résultats</span>
              <button
                onClick={onMobileClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Fermer les filtres"
              >
                <IconX size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              <FilterContent
                {...contentProps}
                availableCategories={cats}
                availableBrands={brands}
              />
            </div>

            {/* CTA */}
            <div className="px-4 py-3 border-t border-gray-100 flex-shrink-0 bg-white">
              <button
                onClick={onMobileClose}
                className="w-full btn-primary rounded-xl text-sm py-3 font-bold"
              >
                Voir les {contentProps.totalCount} résultats
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
