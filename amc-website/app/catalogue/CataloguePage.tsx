"use client";

import { useState, useMemo } from "react";
import { getMachines, getCatalogueCategories, getCatalogueBrands } from "@/lib/data";
import { getGammeFabricantUrl } from "@/lib/gammes";
import { ProductCard } from "@/components/ui/ProductCard";
import { FilterSidebar } from "@/components/catalogue/FilterSidebar";
import { IconFilter, IconExternalLink } from "@/components/ui/Icons";
import type { Product } from "@/types";

const SORT_OPTIONS = [
  { value: "relevance", label: "Pertinence" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "newest", label: "Les plus récents" },
];

const PER_PAGE = 12;

// Static full lists — computed once from the whole catalogue, never change.
// These define the STABLE set of options shown in the filter sidebar.
const ALL_MACHINES = getMachines();
const ALL_CATEGORIES_STABLE = getCatalogueCategories();
const ALL_BRANDS_STABLE = getCatalogueBrands();

// Shared search predicate
function matchesSearch(p: Product, q: string): boolean {
  return (
    p.name.toLowerCase().includes(q) ||
    p.model.toLowerCase().includes(q) ||
    p.shortDescription.toLowerCase().includes(q) ||
    p.tags.some((t) => t.toLowerCase().includes(q))
  );
}

const BRAND_DISPLAY: Record<string, string> = {
  "wacker-neuson": "Wacker Neuson",
  magni: "Magni",
  "promove-demolition": "Promove Demolition",
};

export function CataloguePage({
  initialCategorie = "",
  initialMarque = "",
  initialEtat = "",
}: {
  initialCategorie?: string;
  initialMarque?: string;
  initialEtat?: string;
}) {
  const [filters, setFilters] = useState({
    categories: initialCategorie ? [initialCategorie] : [],
    brands: initialMarque ? [initialMarque] : [],
    status: initialEtat || "all",
    availability: "all" as string,
    priceMin: undefined as number | undefined,
    priceMax: undefined as number | undefined,
  });
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const [mobileFiltres, setMobileFiltres] = useState(false);

  const handleFilterChange = (key: string, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleReset = () => {
    setFilters({ categories: [], brands: [], status: "all", availability: "all", priceMin: undefined, priceMax: undefined });
    setSearch("");
    setPage(1);
  };

  // Helper: apply a subset of filters to a machine list
  const applyFilters = useMemo(() => {
    return (
      list: Product[],
      opts: { excludeCategory?: boolean; excludeBrand?: boolean } = {}
    ): Product[] => {
      let result = list;
      const q = search.trim().toLowerCase();
      if (q) result = result.filter((p) => matchesSearch(p, q));
      if (!opts.excludeCategory && filters.categories.length > 0)
        result = result.filter((p) => p.categorySlug && filters.categories.includes(p.categorySlug));
      if (!opts.excludeBrand && filters.brands.length > 0)
        result = result.filter((p) => filters.brands.includes(p.brand));
      if (filters.status !== "all")
        result = result.filter((p) => p.status === filters.status);
      if (filters.availability !== "all") {
        const want = filters.availability === "disponible";
        result = result.filter((p) => p.available === want);
      }
      if (filters.priceMin !== undefined)
        result = result.filter((p) => p.price === undefined || p.price >= (filters.priceMin ?? 0));
      if (filters.priceMax !== undefined)
        result = result.filter((p) => p.price === undefined || p.price <= (filters.priceMax ?? Infinity));
      return result;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, search]);

  const filtered = useMemo(() => {
    const list = applyFilters(ALL_MACHINES);
    return [...list].sort((a, b) => {
      if (sort === "price-asc") {
        const pa = a.priceOnRequest ? Infinity : (a.price ?? Infinity);
        const pb = b.priceOnRequest ? Infinity : (b.price ?? Infinity);
        return pa - pb;
      }
      if (sort === "price-desc") {
        const pa = a.priceOnRequest ? -Infinity : (a.price ?? -Infinity);
        const pb = b.priceOnRequest ? -Infinity : (b.price ?? -Infinity);
        return pb - pa;
      }
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [applyFilters, sort]);

  // --- Faceted counts ---
  // Categories: count from set filtered by everything EXCEPT the category filter.
  // This way ALL categories always appear and counts reflect the active brand/status/etc.
  const categoriesWithCounts = useMemo(() => {
    const base = applyFilters(ALL_MACHINES, { excludeCategory: true });
    const counts: Record<string, number> = {};
    for (const m of base) {
      if (m.categorySlug) counts[m.categorySlug] = (counts[m.categorySlug] ?? 0) + 1;
    }
    return ALL_CATEGORIES_STABLE.map((cat) => ({ ...cat, count: counts[cat.id] ?? 0 }));
  }, [applyFilters]);

  // Brands: count from set filtered by everything EXCEPT the brand filter.
  const brandsWithCounts = useMemo(() => {
    const base = applyFilters(ALL_MACHINES, { excludeBrand: true });
    const counts: Record<string, number> = {};
    for (const m of base) counts[m.brand] = (counts[m.brand] ?? 0) + 1;
    return ALL_BRANDS_STABLE.map((brand) => ({ ...brand, count: counts[brand.id] ?? 0 }));
  }, [applyFilters]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const activeCount =
    filters.categories.length +
    filters.brands.length +
    (filters.status !== "all" ? 1 : 0) +
    (filters.availability !== "all" ? 1 : 0) +
    (filters.priceMin ? 1 : 0) +
    (filters.priceMax ? 1 : 0);

  // Quand une seule catégorie est sélectionnée, on affiche son nom en titre
  // et un bouton "Voir toute la gamme [Marque]" par marque présente dans les résultats.
  const singleCategorySlug = filters.categories.length === 1 ? filters.categories[0] : null;
  const singleCategoryLabel = singleCategorySlug
    ? ALL_CATEGORIES_STABLE.find((c) => c.id === singleCategorySlug)?.label ?? null
    : null;

  const categoryFabricantButtons = useMemo(() => {
    if (!singleCategorySlug || !singleCategoryLabel) return [];
    const url = getGammeFabricantUrl(singleCategorySlug);
    if (!url) return [];
    const seen = new Set<string>();
    const brandsInResults: string[] = [];
    for (const p of filtered) {
      if (!seen.has(p.brand)) { seen.add(p.brand); brandsInResults.push(p.brand); }
    }
    return brandsInResults.map((brandId) => ({
      brandId,
      brandName: BRAND_DISPLAY[brandId] ?? brandId,
      url,
    }));
  }, [singleCategorySlug, singleCategoryLabel, filtered]);

  return (
    <div className="min-h-screen bg-amc-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-amc py-3">
          <nav className="text-sm text-amc-text-secondary" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2">
              <li><a href="/" className="hover:text-amc-yellow-dark transition-colors">Accueil</a></li>
              <li aria-hidden>/</li>
              <li className="font-medium text-amc-text">Catalogue</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-amc pt-4 pb-8">
        {/* Header */}
        <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-amc-text">
              {singleCategoryLabel
                ? singleCategoryLabel
                : filters.status === "occasion"
                ? "Matériels d'occasion certifiés SE+"
                : filters.status === "neuf"
                ? "Matériels neufs de chantier"
                : "Catalogue matériels de chantier"}
            </h1>
            <p className="text-amc-text-secondary mt-2 text-sm">
              {filters.status === "occasion"
                ? "Toutes nos machines d'occasion sont inspectées et certifiées par nos techniciens SE+"
                : filters.status === "neuf"
                ? `Gamme neuve disponible — Wacker Neuson, Magni, Promove Demolition`
                : `${ALL_MACHINES.length} machines — Wacker Neuson, Magni, Promove Demolition`}
            </p>
          </div>
        </div>

        {/* Toolbar — search moved into filter sidebar */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setMobileFiltres(true)}
            className="lg:hidden btn-secondary text-sm py-2.5 gap-2"
          >
            <IconFilter size={16} />
            Filtres
            {activeCount > 0 && (
              <span className="bg-amc-yellow text-amc-text text-xs font-bold px-1.5 py-0.5 rounded-full">
                {activeCount}
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
        {activeCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.status !== "all" && (
              <button
                onClick={() => handleFilterChange("status", "all")}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-amc-yellow/10 text-amc-text text-xs font-medium rounded-full border border-amc-yellow/30 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
              >
                {filters.status === "neuf" ? "Matériel neuf" : "Matériel occasion"}
                <span aria-hidden>×</span>
              </button>
            )}
            {filters.categories.map((cat) => {
              const label = ALL_CATEGORIES_STABLE.find(c => c.id === cat)?.label ?? cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleFilterChange("categories", filters.categories.filter((c) => c !== cat))}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-amc-yellow/10 text-amc-text text-xs font-medium rounded-full border border-amc-yellow/30 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                >
                  {label} <span aria-hidden>×</span>
                </button>
              );
            })}
            {filters.brands.map((brand) => (
              <button
                key={brand}
                onClick={() => handleFilterChange("brands", filters.brands.filter((b) => b !== brand))}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-amc-yellow/10 text-amc-text text-xs font-medium rounded-full border border-amc-yellow/30 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
              >
                {BRAND_DISPLAY[brand] ?? brand} <span aria-hidden>×</span>
              </button>
            ))}
          </div>
        )}

        {/* Main content */}
        <div className="flex gap-8">
          <FilterSidebar
            selected={filters}
            onChange={handleFilterChange}
            onReset={handleReset}
            totalCount={filtered.length}
            mobileOpen={mobileFiltres}
            onMobileClose={() => setMobileFiltres(false)}
            availableCategories={categoriesWithCounts}
            availableBrands={brandsWithCounts}
            search={search}
            onSearchChange={(s) => { setSearch(s); setPage(1); }}
          />

          <div className="flex-1 min-w-0">
            {paginated.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl shadow-card">
                <div className="text-5xl mb-4">🔍</div>
                <h2 className="text-xl font-bold text-amc-text mb-2">Aucun résultat trouvé</h2>
                <p className="text-amc-text-secondary text-sm mb-6">
                  Essayez de modifier vos critères de recherche ou de réinitialiser les filtres.
                </p>
                <button onClick={handleReset} className="btn-primary rounded-lg">
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <>
                <p className="text-sm text-amc-text-secondary mb-5">
                  <strong className="text-amc-text">{filtered.length}</strong> matériel{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {paginated.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-10 flex justify-center gap-2" aria-label="Pagination">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-amc-text hover:border-amc-yellow disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Précédent
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        aria-current={page === p ? "page" : undefined}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                          page === p
                            ? "bg-amc-yellow text-amc-text font-bold"
                            : "bg-white border border-gray-200 text-amc-text hover:border-amc-yellow"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-amc-text hover:border-amc-yellow disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Suivant
                    </button>
                  </div>
                )}

                {categoryFabricantButtons.length > 0 && (
                  <div className="mt-8 flex justify-end flex-wrap gap-3">
                    {categoryFabricantButtons.map(({ brandId, brandName, url }) => (
                      <div key={brandId} className="flex flex-col items-end gap-1">
                        {categoryFabricantButtons.length > 1 && (
                          <span className="text-xs text-amc-text-secondary">{brandName}</span>
                        )}
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border-2 border-amc-yellow text-amc-text bg-white hover:bg-amc-yellow rounded-lg px-6 py-3 text-base font-semibold inline-flex items-center gap-2 transition-all duration-150 whitespace-nowrap"
                        >
                          Voir toute la gamme <IconExternalLink size={14} />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
