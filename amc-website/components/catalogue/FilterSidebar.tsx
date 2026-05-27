"use client";

import { useState } from "react";
import { IconChevronDown, IconX, IconFilter } from "@/components/ui/Icons";

interface FilterSidebarProps {
  selected: {
    categories: string[];
    brands: string[];
    status: string;
    priceMin?: number;
    priceMax?: number;
  };
  onChange: (key: string, value: unknown) => void;
  onReset: () => void;
  totalCount: number;
  mobileOpen: boolean;
  onMobileClose: () => void;
  availableCategories?: Array<{ id: string; label: string; count: number }>;
  availableBrands?: Array<{ id: string; label: string; count: number }>;
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 pb-5 mb-5 last:border-0 last:mb-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-1 text-sm font-bold text-amc-text hover:text-amc-yellow-dark transition-colors"
      >
        {title}
        <IconChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

export function FilterSidebar({
  selected,
  onChange,
  onReset,
  totalCount,
  mobileOpen,
  onMobileClose,
  availableCategories,
  availableBrands,
}: FilterSidebarProps) {
  const toggleMulti = (key: string, value: string, current: string[]) => {
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange(key, next);
  };

  const activeCount =
    selected.categories.length +
    selected.brands.length +
    (selected.status !== "all" ? 1 : 0) +
    (selected.priceMin ? 1 : 0) +
    (selected.priceMax ? 1 : 0);

  const SidebarContent = () => (
    <div className="p-5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <IconFilter size={16} className="text-amc-text-secondary" />
          <h2 className="font-bold text-amc-text">Filtres</h2>
          {activeCount > 0 && (
            <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-amc-yellow text-amc-text rounded-full">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="text-xs text-amc-text-secondary hover:text-red-500 transition-colors flex items-center gap-1"
          >
            <IconX size={12} />
            Tout effacer
          </button>
        )}
      </div>

      <p className="text-xs text-amc-text-secondary mb-5 pb-5 border-b border-gray-100">
        <strong className="text-amc-text">{totalCount}</strong> résultat{totalCount > 1 ? "s" : ""}
      </p>

      {/* État */}
      <FilterGroup title="État">
        <div className="space-y-2">
          {[
            { value: "all", label: "Neuf et occasion" },
            { value: "neuf", label: "Matériel neuf" },
            { value: "occasion", label: "Matériel occasion" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <input
                type="radio"
                name="status"
                value={opt.value}
                checked={selected.status === opt.value}
                onChange={() => onChange("status", opt.value)}
                className="w-4 h-4 accent-amc-yellow cursor-pointer"
              />
              <span className="text-sm text-amc-text group-hover:text-amc-yellow-dark transition-colors">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </FilterGroup>

      {/* Catégories */}
      {availableCategories && availableCategories.length > 0 && (
        <FilterGroup title="Catégorie de matériel">
          <div className="space-y-2">
            {availableCategories.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={selected.categories.includes(cat.id)}
                    onChange={() =>
                      toggleMulti("categories", cat.id, selected.categories)
                    }
                    className="w-4 h-4 accent-amc-yellow cursor-pointer rounded"
                  />
                  <span className="text-sm text-amc-text group-hover:text-amc-yellow-dark transition-colors">
                    {cat.label}
                  </span>
                </div>
                <span className="text-xs text-amc-text-secondary">({cat.count})</span>
              </label>
            ))}
          </div>
        </FilterGroup>
      )}

      {/* Marques */}
      {availableBrands && availableBrands.length > 0 && (
        <FilterGroup title="Marque">
          <div className="space-y-2">
            {availableBrands.map((brand) => (
              <label
                key={brand.id}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={selected.brands.includes(brand.id)}
                    onChange={() =>
                      toggleMulti("brands", brand.id, selected.brands)
                    }
                    className="w-4 h-4 accent-amc-yellow cursor-pointer rounded"
                  />
                  <span className="text-sm text-amc-text group-hover:text-amc-yellow-dark transition-colors">
                    {brand.label}
                  </span>
                </div>
                <span className="text-xs text-amc-text-secondary">({brand.count})</span>
              </label>
            ))}
          </div>
        </FilterGroup>
      )}

      {/* Budget */}
      <FilterGroup title="Budget">
        <div className="space-y-3">
          <div>
            <label className="text-xs text-amc-text-secondary mb-1 block">
              Prix minimum (€)
            </label>
            <input
              type="number"
              placeholder="0"
              value={selected.priceMin ?? ""}
              onChange={(e) =>
                onChange("priceMin", e.target.value ? Number(e.target.value) : undefined)
              }
              className="input-base text-sm py-2"
              min={0}
            />
          </div>
          <div>
            <label className="text-xs text-amc-text-secondary mb-1 block">
              Prix maximum (€)
            </label>
            <input
              type="number"
              placeholder="Illimité"
              value={selected.priceMax ?? ""}
              onChange={(e) =>
                onChange("priceMax", e.target.value ? Number(e.target.value) : undefined)
              }
              className="input-base text-sm py-2"
              min={0}
            />
          </div>
        </div>
      </FilterGroup>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0 bg-white rounded-xl shadow-card h-fit sticky top-24">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={onMobileClose}
          />
          <aside className="absolute inset-y-0 left-0 w-80 max-w-full bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <span className="font-bold text-amc-text">Filtrer les résultats</span>
              <button
                onClick={onMobileClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Fermer les filtres"
              >
                <IconX size={20} />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
