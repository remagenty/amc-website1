"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

type Machine = {
  id: string;
  nom_complet: string;
  categorie: string;
  marque: string;
  visible?: boolean;
  _brand: string;
  medias?: { image_principale?: string };
};

const BRAND_LABELS: Record<string, string> = {
  "wacker-neuson": "WACKER NEUSON",
  magni: "Magni",
  "promove-demolition": "Promove Demolition",
};

export default function MachinesPage() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterBrand, setFilterBrand] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Machine | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadMachines = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/machines");
      const data = await res.json();
      setMachines(data);
    } catch {
      showToast("Erreur de chargement", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadMachines(); }, [loadMachines]);

  async function toggleVisible(m: Machine) {
    const next = m.visible === false ? true : false;
    const res = await fetch(`/api/admin/machines/${m.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: next }),
    });
    if (res.ok) {
      setMachines((prev) => prev.map((x) => (x.id === m.id ? { ...x, visible: next } : x)));
      showToast(next ? `${m.nom_complet} — visible` : `${m.nom_complet} — masquée`);
    } else {
      showToast("Erreur", "error");
    }
  }

  async function deleteMachine(m: Machine) {
    const res = await fetch(`/api/admin/machines/${m.id}`, { method: "DELETE" });
    if (res.ok) {
      setMachines((prev) => prev.filter((x) => x.id !== m.id));
      showToast(`${m.nom_complet} supprimée`);
    } else {
      showToast("Erreur suppression", "error");
    }
    setConfirmDelete(null);
  }

  const categories = Array.from(new Set(machines.map((m) => m.categorie))).sort();
  const brands = Array.from(new Set(machines.map((m) => m._brand)));

  const filtered = machines.filter((m) => {
    if (filterBrand && m._brand !== filterBrand) return false;
    if (filterCat && m.categorie !== filterCat) return false;
    if (search && !m.nom_complet.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Machines</h1>
          <p className="text-sm text-gray-500 mt-0.5">{machines.length} machine{machines.length > 1 ? "s" : ""} au catalogue</p>
        </div>
        <Link
          href="/admin/machines/new"
          className="flex items-center gap-2 bg-[#ffd500] hover:bg-[#e6c000] text-gray-900 font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Ajouter une machine
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          placeholder="Rechercher…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-52 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <select
          value={filterBrand}
          onChange={(e) => setFilterBrand(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">Toutes les marques</option>
          {brands.map((b) => (
            <option key={b} value={b}>{BRAND_LABELS[b] ?? b}</option>
          ))}
        </select>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {(filterBrand || filterCat || search) && (
          <button onClick={() => { setFilterBrand(""); setFilterCat(""); setSearch(""); }} className="text-sm text-gray-500 hover:text-gray-800 underline">
            Réinitialiser
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">Chargement…</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400 text-sm">Aucune machine trouvée</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-14">Photo</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Nom</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Catégorie</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Marque</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                      {m.medias?.image_principale ? (
                        <Image
                          src={m.medias.image_principale}
                          alt={m.nom_complet}
                          width={40}
                          height={40}
                          className="object-contain w-full h-full"
                        />
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-gray-900 line-clamp-1">{m.nom_complet}</span>
                    <span className="text-xs text-gray-400">{m.id}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{m.categorie}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                      {BRAND_LABELS[m._brand] ?? m._brand}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleVisible(m)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                        m.visible === false
                          ? "bg-gray-100 text-gray-500 hover:bg-orange-50 hover:text-orange-600"
                          : "bg-green-50 text-green-700 hover:bg-gray-100 hover:text-gray-500"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${m.visible === false ? "bg-gray-400" : "bg-green-500"}`} />
                      {m.visible === false ? "Masquée" : "Visible"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/machines/${m.id}`}
                        className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => setConfirmDelete(m)}
                        className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl text-sm font-medium shadow-lg z-50 ${
          toast.type === "success" ? "bg-gray-900 text-white" : "bg-red-600 text-white"
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Confirm delete */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-bold text-gray-900 mb-2">Supprimer cette machine ?</h3>
            <p className="text-sm text-gray-600 mb-6">
              <strong>{confirmDelete.nom_complet}</strong> sera définitivement retirée du catalogue.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                Annuler
              </button>
              <button onClick={() => deleteMachine(confirmDelete)} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
