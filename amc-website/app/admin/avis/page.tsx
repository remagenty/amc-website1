"use client";

import { useEffect, useState } from "react";

type Review = {
  id: string;
  name: string;
  initials: string;
  text: string;
  date: string;
  rating: number;
  visible: boolean;
};

type ReviewSettings = {
  globalRating: number;
};

const DEFAULT_REVIEWS: Omit<Review, "id">[] = [
  { name: "David Carrozza", initials: "DC", text: "AMC a fait preuve d'un grand professionnalisme et d'une excellente disponibilité malgré la distance géographique. Leur accompagnement a été clair, sérieux et utile. Rare de trouver un tel niveau de service et d'écoute aujourd'hui. Une entreprise fiable que je recommande.", date: "Février 2025", rating: 5, visible: true },
  { name: "Florent Blanc", initials: "FB", text: "Un grand merci à l'équipe SAV pour la qualité de leurs prestations, leur écoute et leur rapidité d'intervention. À très vite pour de nouvelles aventures !", date: "Mars 2025", rating: 5, visible: true },
  { name: "Anthony", initials: "AN", text: "Équipe SAV au top ! Ils ont su me dépanner par téléphone avec beaucoup de professionnalisme. La personne que j'ai eue était claire, précise, et allait droit au but — aucun blabla inutile. Franchement, je recommande les yeux fermés !", date: "Mai 2025", rating: 5, visible: true },
  { name: "Vincent Figueiredo", initials: "VF", text: "Équipe professionnel, respect des délais, qualité des échanges. Je recommande fortement.", date: "Juin 2025", rating: 5, visible: true },
  { name: "Florian", initials: "FR", text: "Équipe au top, à l'écoute et très réactif sur les commandes de pièces détachées, je recommande !", date: "Juillet 2023", rating: 5, visible: true },
  { name: "Enrico Avola", initials: "EA", text: "Grand choix, très pro, excellent services.", date: "Octobre 2022", rating: 5, visible: true },
  { name: "francketflo", initials: "FF", text: "SAV très réactif et compétent. Je recommande.", date: "Mai 2025", rating: 5, visible: true },
  { name: "Florent Bottollier", initials: "FB", text: "Une belle équipe au service SAV, à l'écoute, professionnelle et arrangeante...", date: "Mars 2025", rating: 5, visible: true },
  { name: "Kevin Veyrier", initials: "KV", text: "Un grand merci à Camille et Romain du service client qui ont géré mon dossier pour une recherche de pièce dans un délai remarquable. Cette équipe est très compétente dans ce domaine. Vous pouvez y aller les yeux fermés.", date: "Mars 2025", rating: 5, visible: true },
  { name: "Lucas", initials: "LU", text: "Un grand bravo à Romain et à toute son équipe SAV. De nos jours, c'est rare de trouver un service aussi à l'écoute, réactif et professionnel. Merci pour votre efficacité. Je recommande sans hésiter.", date: "Mars 2025", rating: 5, visible: true },
  { name: "Eric Floquet", initials: "EF", text: "WACKER NEUSON, c'est tout ce qu'il faut !", date: "Mai 2022", rating: 5, visible: true },
];

const EMPTY_FORM: Omit<Review, "id"> = {
  name: "",
  initials: "",
  text: "",
  date: "",
  rating: 5,
  visible: true,
};

const inp = "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400";

function StarSelector({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          className="p-0.5 focus:outline-none"
          aria-label={`${i} étoile${i > 1 ? "s" : ""}`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={i <= (hovered || value) ? "#FDC202" : "none"}
            stroke="#FDC202"
            strokeWidth="1.5"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function StarDisplay({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i <= value ? "#FDC202" : "#E5E7EB"} aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function AvisPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [editing, setEditing] = useState<Review | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState<Omit<Review, "id">>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Review | null>(null);
  const [toast, setToast] = useState("");
  const [globalRating, setGlobalRating] = useState("4.6");
  const [savingSettings, setSavingSettings] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/reviews").then((r) => r.json()),
      fetch("/api/admin/review-settings").then((r) => r.ok ? r.json() : null),
    ]).then(([data, settings]) => {
      setReviews(data as Review[]);
      if (settings && typeof settings.globalRating === "number") {
        setGlobalRating(String(settings.globalRating));
      }
      setLoading(false);
    });
  }, []);

  async function seedDefaults() {
    setSeeding(true);
    try {
      const results = await Promise.all(
        DEFAULT_REVIEWS.map((r) =>
          fetch("/api/admin/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(r),
          }).then((res) => res.json())
        )
      );
      const newReviews = results.map((r: { review: Review }) => r.review);
      setReviews(newReviews);
      showToast("Avis par défaut importés");
    } finally {
      setSeeding(false);
    }
  }

  function openNew() {
    setIsNew(true);
    setEditing({ id: "" } as Review);
    setForm(EMPTY_FORM);
  }

  function openEdit(r: Review) {
    setIsNew(false);
    setEditing(r);
    setForm({ name: r.name, initials: r.initials, text: r.text, date: r.date, rating: r.rating, visible: r.visible });
  }

  function handleNameChange(name: string) {
    const parts = name.trim().split(/\s+/);
    const initials = parts.map((p) => p[0]?.toUpperCase() ?? "").join("").slice(0, 2);
    setForm((f) => ({ ...f, name, initials: f.initials || initials }));
  }

  async function save() {
    if (!form.name || !form.text) return;
    setSaving(true);
    try {
      if (isNew) {
        const res = await fetch("/api/admin/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          const data = await res.json() as { ok: boolean; review: Review };
          setReviews((prev) => [...prev, data.review]);
          setEditing(null);
          showToast("Avis ajouté");
        }
      } else {
        const res = await fetch(`/api/admin/reviews/${editing!.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, id: editing!.id }),
        });
        if (res.ok) {
          setReviews((prev) => prev.map((r) => r.id === editing!.id ? { ...form, id: editing!.id } : r));
          setEditing(null);
          showToast("Avis mis à jour");
        }
      }
    } finally {
      setSaving(false);
    }
  }

  async function toggleVisible(r: Review) {
    const updated = { ...r, visible: !r.visible };
    await fetch(`/api/admin/reviews/${r.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: updated.visible }),
    });
    setReviews((prev) => prev.map((x) => x.id === r.id ? updated : x));
  }

  async function deleteReview(r: Review) {
    await fetch(`/api/admin/reviews/${r.id}`, { method: "DELETE" });
    setReviews((prev) => prev.filter((x) => x.id !== r.id));
    setConfirmDelete(null);
    showToast("Avis supprimé");
  }

  async function saveSettings() {
    const rating = parseFloat(globalRating);
    if (isNaN(rating)) return;
    setSavingSettings(true);
    try {
      await fetch("/api/admin/review-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ globalRating: rating } satisfies ReviewSettings),
      });
      showToast("Note globale enregistrée");
    } finally {
      setSavingSettings(false);
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Avis Clients</h1>
          <p className="text-sm text-gray-500 mt-0.5">{reviews.length} avis au total</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-[#ffd500] hover:bg-[#e6c000] text-gray-900 font-semibold px-4 py-2 rounded-lg text-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Ajouter un avis
        </button>
      </div>

      {/* Note globale */}
      <section className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h2 className="font-semibold text-gray-900 mb-3">Note globale affichée</h2>
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-700">Note globale :</label>
          <input
            type="number"
            min="1"
            max="5"
            step="0.1"
            value={globalRating}
            onChange={(e) => setGlobalRating(e.target.value)}
            className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <span className="text-sm text-gray-500">/ 5</span>
          <button
            onClick={saveSettings}
            disabled={savingSettings}
            className="px-4 py-2 bg-[#ffd500] hover:bg-[#e6c000] text-gray-900 font-semibold rounded-lg text-sm disabled:opacity-60"
          >
            {savingSettings ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
      </section>

      {loading ? (
        <div className="text-gray-400 text-sm">Chargement…</div>
      ) : reviews.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-10 text-center">
          <p className="text-gray-500 text-sm mb-4">Aucun avis enregistré.</p>
          <button
            onClick={seedDefaults}
            disabled={seeding}
            className="px-5 py-2.5 bg-[#ffd500] hover:bg-[#e6c000] text-gray-900 font-semibold rounded-lg text-sm disabled:opacity-60"
          >
            {seeding ? "Importation…" : "Importer les avis par défaut"}
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Nom</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Extrait</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Note</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Date</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Visible</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reviews.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{r.name}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell max-w-xs truncate">
                    {r.text.length > 60 ? r.text.slice(0, 60) + "…" : r.text}
                  </td>
                  <td className="px-4 py-3">
                    <StarDisplay value={r.rating} />
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell whitespace-nowrap">{r.date}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleVisible(r)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 ${r.visible ? "bg-[#ffd500]" : "bg-gray-200"}`}
                      aria-label={r.visible ? "Masquer" : "Afficher"}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${r.visible ? "translate-x-4" : "translate-x-0.5"}`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(r)}
                        className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => setConfirmDelete(r)}
                        className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit / Add modal */}
      {editing !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-gray-900 mb-4">{isNew ? "Ajouter un avis" : "Modifier l'avis"}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Nom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className={inp}
                  placeholder="Jean Dupont"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Initiales</label>
                <input
                  type="text"
                  value={form.initials}
                  maxLength={2}
                  onChange={(e) => setForm((f) => ({ ...f, initials: e.target.value.toUpperCase() }))}
                  className="w-24 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="JD"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Note</label>
                <StarSelector value={form.rating} onChange={(n) => setForm((f) => ({ ...f, rating: n }))} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Texte de l&apos;avis <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={form.text}
                  onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                  className={`${inp} resize-none`}
                  placeholder="Saisir l'avis du client…"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="text"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className={inp}
                  placeholder="Mars 2025"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="visible"
                  checked={form.visible}
                  onChange={(e) => setForm((f) => ({ ...f, visible: e.target.checked }))}
                  className="w-4 h-4 rounded border-gray-300 accent-yellow-400"
                />
                <label htmlFor="visible" className="text-sm text-gray-700">Visible sur le site</label>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setEditing(null)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={save}
                disabled={saving || !form.name || !form.text}
                className="flex-1 px-4 py-2 bg-[#ffd500] text-gray-900 rounded-lg text-sm font-semibold disabled:opacity-60"
              >
                {saving ? "Enregistrement…" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm delete modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-bold text-gray-900 mb-2">Supprimer cet avis ?</h3>
            <p className="text-sm text-gray-500 mb-1">
              <span className="font-medium text-gray-700">{confirmDelete.name}</span> — {confirmDelete.date}
            </p>
            <p className="text-sm text-gray-500 mb-4">Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={() => deleteReview(confirmDelete)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
