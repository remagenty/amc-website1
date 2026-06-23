"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageUpload } from "@/components/admin/ImageUpload";

type Member = {
  slug: string;
  name: string;
  role: string;
  initials: string;
  description: string;
  photo: string | null;
  phone?: string;
  email?: string;
  order?: number;
  visible?: boolean;
};

const EMPTY: Member = { slug: "", name: "", role: "", initials: "", description: "", photo: null, phone: "", email: "", order: 0, visible: true };

export default function EquipePage() {
  const [team, setTeam] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Member | null>(null);
  const [form, setForm] = useState<Member>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<Member | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  useEffect(() => {
    fetch("/api/admin/team")
      .then((r) => r.json())
      .then((d: Member[]) => {
        setTeam(d.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
        setLoading(false);
      });
  }, []);

  function openEdit(m: Member) {
    setEditing(m);
    setForm({ ...m });
  }

  function openNew() {
    setEditing({ slug: "" } as Member);
    setForm(EMPTY);
  }

  // Auto-generate initials from name
  function setName(name: string) {
    const parts = name.trim().split(" ");
    const initials = parts.map((p) => p[0]?.toUpperCase() ?? "").join("").slice(0, 2);
    setForm((f) => ({ ...f, name, initials: f.initials || initials }));
  }

  // Generate slug from name
  function generateSlug(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function save() {
    if (!form.name || !form.role) return;
    setSaving(true);
    const isNew = !editing?.slug;
    const payload = { ...form, slug: form.slug || generateSlug(form.name) };
    try {
      const res = isNew
        ? await fetch("/api/admin/team", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        : await fetch(`/api/admin/team/${editing!.slug}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) {
        const updated = isNew
          ? [...team, payload]
          : team.map((m) => m.slug === editing!.slug ? payload : m);
        setTeam(updated.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
        setEditing(null);
        showToast(isNew ? `${payload.name} ajouté(e)` : `${payload.name} mis à jour`);
      }
    } finally {
      setSaving(false);
    }
  }

  async function toggleVisible(m: Member) {
    const updated = { ...m, visible: !(m.visible ?? true) };
    await fetch(`/api/admin/team/${m.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setTeam((t) =>
      t.map((x) => (x.slug === m.slug ? updated : x)).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    );
  }

  async function deleteMember(m: Member) {
    await fetch(`/api/admin/team/${m.slug}`, { method: "DELETE" });
    setTeam((t) => t.filter((x) => x.slug !== m.slug));
    setConfirmDelete(null);
    showToast(`${m.name} supprimé(e)`);
  }

  const inp = "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400";

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Équipe</h1>
          <p className="text-sm text-gray-500 mt-0.5">{team.length} membre{team.length > 1 ? "s" : ""}</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-[#ffd500] hover:bg-[#e6c000] text-gray-900 font-semibold px-4 py-2 rounded-lg text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Ajouter un membre
        </button>
      </div>

      {loading ? (
        <div className="text-gray-400 text-sm">Chargement…</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Photo</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Nom</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Rôle</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Ordre</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Visible</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {team.map((m) => (
                <tr key={m.slug} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 rounded-full bg-[#ffd500] flex items-center justify-center overflow-hidden flex-shrink-0">
                      {m.photo ? (
                        <Image src={m.photo} alt={m.name} width={40} height={40} className="w-full h-full object-cover object-top" />
                      ) : (
                        <span className="text-sm font-bold text-gray-900">{m.initials}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{m.name}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{m.role}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                      {m.order ?? 0}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <button
                      onClick={() => toggleVisible(m)}
                      className={`w-9 h-5 rounded-full transition-colors relative flex-shrink-0 ${
                        (m.visible ?? true) ? "bg-[#ffd500]" : "bg-gray-200"
                      }`}
                      title={(m.visible ?? true) ? "Masquer" : "Afficher"}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                          (m.visible ?? true) ? "translate-x-4" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(m)} className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg">Modifier</button>
                      <button onClick={() => setConfirmDelete(m)} className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg">Supprimer</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit modal */}
      {editing !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-gray-900 mb-4">{editing.slug ? "Modifier" : "Ajouter"} un membre</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Prénom / Nom <span className="text-red-500">*</span></label>
                <input type="text" value={form.name} onChange={(e) => setName(e.target.value)} className={inp} placeholder="Jean-Pierre Martin" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Rôle / Poste <span className="text-red-500">*</span></label>
                <input type="text" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} className={inp} placeholder="Commercial, Responsable SAV…" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Initiales</label>
                  <input type="text" value={form.initials} maxLength={2} onChange={(e) => setForm((f) => ({ ...f, initials: e.target.value.toUpperCase() }))} className={inp} placeholder="JP" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Slug URL</label>
                  <input type="text" value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className={inp} placeholder="jean-pierre" />
                </div>
              </div>
              <div>
                <ImageUpload
                  label="Photo"
                  value={form.photo ?? null}
                  onChange={(url) => setForm((f) => ({ ...f, photo: url }))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className={`${inp} resize-none`} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Téléphone</label>
                  <input type="tel" value={form.phone ?? ""} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className={inp} placeholder="06 XX XX XX XX" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={form.email ?? ""} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={inp} placeholder="prenom@amc2savoie.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Ordre d&apos;affichage</label>
                  <input
                    type="number"
                    min={0}
                    value={form.order ?? 0}
                    onChange={(e) => setForm((f) => ({ ...f, order: parseInt(e.target.value, 10) || 0 }))}
                    className={inp}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <label className="block text-xs font-medium text-gray-700 mb-2">Visible sur le site</label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.visible ?? true}
                      onChange={(e) => setForm((f) => ({ ...f, visible: e.target.checked }))}
                      className="w-4 h-4 rounded border-gray-300 accent-yellow-400"
                    />
                    <span className="text-sm text-gray-700">{form.visible ?? true ? "Visible" : "Masqué"}</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setEditing(null)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">Annuler</button>
              <button onClick={save} disabled={saving || !form.name || !form.role} className="flex-1 px-4 py-2 bg-[#ffd500] text-gray-900 rounded-lg text-sm font-semibold disabled:opacity-60">
                {saving ? "Enregistrement…" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm delete */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-bold mb-2">Supprimer {confirmDelete.name} ?</h3>
            <p className="text-sm text-gray-500 mb-4">Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm">Annuler</button>
              <button onClick={() => deleteMember(confirmDelete)} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium">Supprimer</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-lg">{toast}</div>}
    </div>
  );
}
