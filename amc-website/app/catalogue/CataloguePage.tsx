"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";
import { FilterSidebar } from "@/components/catalogue/FilterSidebar";
import { IconFilter, IconSearch } from "@/components/ui/Icons";
import type { Product } from "@/types";

const SORT_OPTIONS = [
  { value: "relevance", label: "Pertinence" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "newest", label: "Les plus récents" },
];

const PER_PAGE = 12;

export function CataloguePage() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    categories: searchParams.get("categorie")
      ? [searchParams.get("categorie") as string]
      : [],
    brands: searchParams.get("marque") ? [searchParams.get("marque") as string] : [],
    status: searchParams.get("etat") ?? "all",
    priceMin: undefined as number | undefined,
    priceMax: undefined as number | undefined,
  });
  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const [mobileFiltres, setMobileFiltres] = useState(false);

  const handleFilterChange = (key: string, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleReset = () => {
    setFilters({ categories: [], brands: [], status: "all", priceMin: undefined, priceMax: undefined });
    setSearch("");
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list: Product[] = [...PRODUCTS];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.model.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (filters.categories.length > 0) {
      list = list.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.brands.length > 0) {
      list = list.filter((p) => filters.brands.includes(p.brand));
    }
    if (filters.status !== "all") {
      list = list.filter((p) => p.status === filters.status);
    }
    if (filters.priceMin !== undefined) {
      list = list.filter((p) => p.price === undefined || p.price >= (filters.priceMin ?? 0));
    }
    if (filters.priceMax !== undefined) {
      list = list.filter((p) => p.price === undefined || p.price <= (filters.priceMax ?? Infinity));
    }

    list.sort((a, b) => {
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
      if (sort === "newest") {
        return (b.year ?? 2024) - (a.year ?? 2024);
      }
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

    return list;
  }, [filters, search, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

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

      <div className="container-amc py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-amc-text">
            Catalogue matériels de chantier
          </h1>
          <p className="text-amc-text-secondary mt-2 text-sm">
            Matériels neufs et d'occasion — Wacker Neuson, Magni, Promove Demolition
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Rechercher un modèle, une référence..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amc-yellow"
            />
          </div>

          {/* Mobile filter button */}
          <button
            onClick={() => setMobileFiltres(true)}
            className="lg:hidden btn-secondary text-sm py-2.5 gap-2"
          >
            <IconFilter size={16} />
            Filtres
            {(filters.categories.length + filters.brands.length + (filters.status !== "all" ? 1 : 0)) > 0 && (
              <span className="bg-amc-yellow text-amc-text text-xs font-bold px-1.5 py-0.5 rounded-full">
                {filters.categories.length + filters.brands.length + (filters.status !== "all" ? 1 : 0)}
              </span>
            )}
          </button>

          {/* Sort */}
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

        {/* Active filters chips */}
        {(filters.categories.length > 0 || filters.brands.length > 0 || filters.status !== "all") && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.status !== "all" && (
              <button
                onClick={() => handleFilterChange("status", "all")}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-amc-yellow/10 text-amc-text text-xs font-medium rounded-full border border-amc-yellow/30 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
              >
                {filters.status === "neuf" ? "Matériel neuf" : "Matériel occasion"}
                <span aria-hidden>×</span>
              </button>
            )}
            {filters.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange("categories", filters.categories.filter((c) => c !== cat))}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-amc-yellow/10 text-amc-text text-xs font-medium rounded-full border border-amc-yellow/30 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors capitalize"
              >
                {cat} <span aria-hidden>×</span>
              </button>
            ))}
            {filters.brands.map((brand) => (
              <button
                key={brand}
                onClick={() => handleFilterChange("brands", filters.brands.filter((b) => b !== brand))}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-amc-yellow/10 text-amc-text text-xs font-medium rounded-full border border-amc-yellow/30 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
              >
                {brand.replace("-", " ")} <span aria-hidden>×</span>
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

                {/* Pagination */}
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
