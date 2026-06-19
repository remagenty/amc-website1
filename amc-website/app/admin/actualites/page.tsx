"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageUpload } from "@/components/admin/ImageUpload";

type Article = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  coverImage: string | null;
  status: "published" | "draft";
  publishedAt: string;
  createdAt: string;
};

const CATEGORIES = ["Actualités", "Nouveautés", "Guide technique", "Conseil chantier"];

const EMPTY: Article = {
  slug: "", title: "", category: "Actualités", summary: "", content: "",
  coverImage: null, status: "draft",
  publishedAt: new Date().toISOString().split("T")[0],
  createdAt: new Date().toISOString(),
};

function toSlug(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const inp = "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400";

export default function ActualitesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Article | null>(null);
  const [form, setForm] = useState<Article>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<Article | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  useEffect(() => {
    fetch("/api/admin/articles")
      .then((r) => r.json())
      .then((d) => { setArticles(Array.isArray(d) ? d : []); setLoading(false); });
  }, []);

  function openNew() {
    setEditing({ slug: "" } as Article);
    setForm({ ...EMPTY, createdAt: new Date().toISOString(), publishedAt: new Date().toISOString().split("T")[0] });
  }

  function openEdit(a: Article) { setEditing(a); setForm({ ...a }); }

  function setTitle(title: string) {
    setForm((f) => ({ ...f, title, slug: f.slug || toSlug(title) }));
  }

  async function save() {
    if (!form.title || !form.slug) return;
    setSaving(true);
    const isNew = !editing?.slug;
    try {
      const res = isNew
        ? await fetch("/api/admin/articles", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
        : await fetch(`/api/admin/articles/${editing!.slug}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) {
        setArticles(isNew ? [form, ...articles] : articles.map((a) => a.slug === editing!.slug ? form : a));
        setEditing(null);
        showToast(isNew ? "Article créé" : "Article mis à jour");
      } else {
        showToast(((await res.json()) as { error?: string }).error ?? "Erreur");
      }
    } finally { setSaving(false); }
  }

  async function toggleStatus(a: Article) {
    const next: Article = { ...a, status: a.status === "published" ? "draft" : "published" };
    const res = await fetch(`/api/admin/articles/${a.slug}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(next) });
    if (res.ok) {
      setArticles((prev) => prev.map((x) => x.slug === a.slug ? next : x));
      showToast(next.status === "published" ? "Article publié" : "Article dépublié");
    }
  }

  async function deleteArticle(a: Article) {
    await fetch(`/api/admin/articles/${a.slug}`, { method: "DELETE" });
    setArticles((prev) => prev.filter((x) => x.slug !== a.slug));
    setConfirmDelete(null);
    showToast("Article supprimé");
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Actualités & Expertise</h1>
          <p className="text-sm text-gray-500 mt-0.5">{articles.length} article{articles.length > 1 ? "s" : ""}</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-[#ffd500] hover:bg-[#e6c000] text-gray-900 font-semibold px-4 py-2 rounded-lg text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Nouvel article
        </button>
      </div>

      {loading ? (
        <div className="text-gray-400 text-sm">Chargement…</div>
      ) : articles.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400 text-sm">
          Aucun article — cliquez sur &ldquo;Nouvel article&rdquo; pour commencer.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase w-16">Image</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Titre</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles.map((a) => (
                <tr key={a.slug} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                      {a.coverImage
                        ? <Image src={a.coverImage} alt={a.title} width={40} height={40} className="w-full h-full object-cover" unoptimized />
                        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 line-clamp-1">{a.title}</p>
                    <p className="text-xs text-gray-400">{a.category}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{a.publishedAt}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStatus(a)} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${a.status === "published" ? "bg-green-50 text-green-700 hover:bg-gray-100 hover:text-gray-600" : "bg-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-700"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${a.status === "published" ? "bg-green-500" : "bg-gray-400"}`} />
                      {a.status === "published" ? "Publié" : "Brouillon"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(a)} className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg">Modifier</button>
                      <button onClick={() => setConfirmDelete(a)} className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg">Supprimer</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-gray-900 mb-5">{editing.slug ? "Modifier" : "Nouvel"} article</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Titre <span className="text-red-500">*</span></label>
                <input type="text" value={form.title} onChange={(e) => setTitle(e.target.value)} className={inp} placeholder="Titre de l'article" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Catégorie</label>
                  <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className={inp}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Date de publication</label>
                  <input type="date" value={form.publishedAt} onChange={(e) => setForm((f) => ({ ...f, publishedAt: e.target.value }))} className={inp} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Slug URL <span className="text-red-500">*</span></label>
                <input type="text" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className={inp} placeholder="mon-article" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Résumé</label>
                <textarea rows={2} value={form.summary} onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))} className={`${inp} resize-none`} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Contenu (Markdown)</label>
                <textarea rows={8} value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} className={`${inp} resize-none font-mono text-xs`} placeholder={"# Titre\n\nVotre contenu en **Markdown**…"} />
              </div>
              <ImageUpload label="Image de couverture" value={form.coverImage} onChange={(url) => setForm((f) => ({ ...f, coverImage: url }))} />
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Statut</label>
                <div className="flex gap-4">
                  {(["draft", "published"] as const).map((s) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="status" value={s} checked={form.status === s} onChange={() => setForm((f) => ({ ...f, status: s }))} className="accent-yellow-400" />
                      <span className="text-sm text-gray-700">{s === "published" ? "Publié" : "Brouillon"}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setEditing(null)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Annuler</button>
              <button onClick={save} disabled={saving || !form.title || !form.slug} className="flex-1 px-4 py-2 bg-[#ffd500] text-gray-900 rounded-lg text-sm font-semibold disabled:opacity-60">
                {saving ? "Enregistrement…" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-bold mb-2">Supprimer cet article ?</h3>
            <p className="text-sm text-gray-500 mb-4">&ldquo;{confirmDelete.title}&rdquo; sera définitivement supprimé.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm">Annuler</button>
              <button onClick={() => deleteArticle(confirmDelete)} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium">Supprimer</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-lg z-50">{toast}</div>}
    </div>
  );
}
