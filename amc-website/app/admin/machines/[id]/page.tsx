"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/admin/ImageUpload";

type KV = { key: string; value: string };

type MachineForm = {
  id: string;
  nom_complet: string;
  modele: string;
  marque: string;
  categorie: string;
  sous_categorie: string;
  description_courte: string;
  description_longue: string;
  visible: boolean;
  featured: boolean;
  medias: { image_principale: string };
  caracteristiques_techniques: Record<string, string | number>;
  points_forts: string[];
  _brand: string;
};

const BRANDS = [
  { value: "wacker-neuson", label: "WACKER NEUSON" },
  { value: "magni", label: "Magni" },
  { value: "promove-demolition", label: "Promove Demolition" },
];

const CATEGORIES: Record<string, string[]> = {
  "wacker-neuson": ["Mini-pelle", "Dumper", "Compacteur", "Plaque vibrante", "Pilonneuse", "Marteau piqueur", "Télescopique", "Chargeuse"],
  magni: ["Téléhandler rotatif", "Téléhandler fixe"],
  "promove-demolition": ["Brise-roche hydraulique", "Cisaille", "Concasseur", "Grappin", "Pulvérisateur", "Scarificateur"],
};

function kvFromObj(obj: Record<string, unknown>): KV[] {
  return Object.entries(obj).map(([key, value]) => ({ key, value: String(value) }));
}
function objFromKv(kv: KV[]): Record<string, string | number> {
  const out: Record<string, string | number> = {};
  kv.forEach(({ key, value }) => {
    if (key.trim()) {
      const num = parseFloat(value);
      out[key.trim()] = !isNaN(num) && String(num) === value.trim() ? num : value;
    }
  });
  return out;
}

export default function MachineEditPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const isNew = id === "new" || id === "__new__";
  const router = useRouter();

  const [form, setForm] = useState<MachineForm>({
    id: "", nom_complet: "", modele: "", marque: "Wacker Neuson", categorie: "",
    sous_categorie: "", description_courte: "", description_longue: "",
    visible: true, featured: false,
    medias: { image_principale: "" },
    caracteristiques_techniques: {},
    points_forts: [],
    _brand: "wacker-neuson",
  });
  const [kv, setKv] = useState<KV[]>([{ key: "", value: "" }]);
  const [pointsForts, setPointsForts] = useState<string[]>([""]);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/machines/${id}`)
        .then((r) => r.json())
        .then((data) => {
          setForm(data);
          setKv(data.caracteristiques_techniques ? kvFromObj(data.caracteristiques_techniques) : [{ key: "", value: "" }]);
          setPointsForts(data.points_forts?.length ? data.points_forts : [""]);
          setLoading(false);
        })
        .catch(() => { setError("Machine introuvable"); setLoading(false); });
    }
  }, [id, isNew]);

  function set<K extends keyof MachineForm>(k: K, v: MachineForm[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function save() {
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      caracteristiques_techniques: objFromKv(kv),
      points_forts: pointsForts.filter(Boolean),
    };
    try {
      const url = isNew ? "/api/admin/machines" : `/api/admin/machines/${id}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        router.push("/admin/machines");
      } else {
        const d = await res.json();
        setError(d.error ?? "Erreur enregistrement");
      }
    } catch {
      setError("Erreur réseau");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-8 text-gray-400">Chargement…</div>;

  const label = "block text-sm font-medium text-gray-700 mb-1";
  const input = "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400";

  return (
    <div className="p-6 md:p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {isNew ? "Nouvelle machine" : form.nom_complet || "Modifier la machine"}
          </h1>
          {!isNew && <p className="text-xs text-gray-400 mt-0.5">{id}</p>}
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}

      <div className="space-y-5">
        {/* Identité */}
        <section className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <h2 className="font-semibold text-gray-900 text-sm">Identité</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={label}>Marque</label>
              <select value={form._brand} onChange={(e) => set("_brand", e.target.value)} className={input}>
                {BRANDS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>Catégorie</label>
              <select value={form.categorie} onChange={(e) => set("categorie", e.target.value)} className={input}>
                <option value="">— Choisir —</option>
                {(CATEGORIES[form._brand] ?? []).map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className={label}>Nom complet <span className="text-red-500">*</span></label>
            <input type="text" value={form.nom_complet} onChange={(e) => set("nom_complet", e.target.value)} className={input} placeholder="Ex: Mini-pelle Wacker Neuson EZ17e" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={label}>Modèle / Référence</label>
              <input type="text" value={form.modele} onChange={(e) => set("modele", e.target.value)} className={input} />
            </div>
            <div>
              <label className={label}>Sous-catégorie</label>
              <input type="text" value={form.sous_categorie} onChange={(e) => set("sous_categorie", e.target.value)} className={input} />
            </div>
          </div>
        </section>

        {/* Descriptions */}
        <section className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <h2 className="font-semibold text-gray-900 text-sm">Descriptions</h2>
          <div>
            <label className={label}>Description courte</label>
            <textarea rows={2} value={form.description_courte} onChange={(e) => set("description_courte", e.target.value)} className={`${input} resize-none`} />
          </div>
          <div>
            <label className={label}>Description longue</label>
            <textarea rows={5} value={form.description_longue} onChange={(e) => set("description_longue", e.target.value)} className={`${input} resize-none`} />
          </div>
        </section>

        {/* Caractéristiques techniques */}
        <section className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 text-sm">Caractéristiques techniques</h2>
            <button onClick={() => setKv((k) => [...k, { key: "", value: "" }])} className="text-xs text-blue-600 hover:text-blue-800 font-medium">+ Ajouter</button>
          </div>
          {kv.map((item, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                type="text" placeholder="Clé (ex: masse_kg)"
                value={item.key}
                onChange={(e) => setKv((k) => k.map((x, j) => j === i ? { ...x, key: e.target.value } : x))}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
              />
              <input
                type="text" placeholder="Valeur (ex: 1800)"
                value={item.value}
                onChange={(e) => setKv((k) => k.map((x, j) => j === i ? { ...x, value: e.target.value } : x))}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
              />
              <button onClick={() => setKv((k) => k.filter((_, j) => j !== i))} className="p-1.5 text-gray-400 hover:text-red-500 rounded">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          ))}
        </section>

        {/* Points forts */}
        <section className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 text-sm">Points forts</h2>
            <button onClick={() => setPointsForts((p) => [...p, ""])} className="text-xs text-blue-600 hover:text-blue-800 font-medium">+ Ajouter</button>
          </div>
          {pointsForts.map((pf, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                type="text" value={pf} placeholder="Point fort…"
                onChange={(e) => setPointsForts((p) => p.map((x, j) => j === i ? e.target.value : x))}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
              />
              <button onClick={() => setPointsForts((p) => p.filter((_, j) => j !== i))} className="p-1.5 text-gray-400 hover:text-red-500 rounded">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          ))}
        </section>

        {/* Média & Statut */}
        <section className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
          <h2 className="font-semibold text-gray-900 text-sm">Média & Statut</h2>
          <div>
            <ImageUpload
              label="Image principale"
              value={form.medias?.image_principale || null}
              onChange={(url) => set("medias", { ...form.medias, image_principale: url ?? "" })}
            />
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.visible !== false} onChange={(e) => set("visible", e.target.checked)} className="w-4 h-4 accent-yellow-400" />
              <span className="text-sm text-gray-700">Visible sur le site</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured ?? false} onChange={(e) => set("featured", e.target.checked)} className="w-4 h-4 accent-yellow-400" />
              <span className="text-sm text-gray-700">Mis en avant</span>
            </label>
          </div>
        </section>

        {/* Actions */}
        <div className="flex gap-3 pb-8">
          <button onClick={() => router.back()} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Annuler
          </button>
          <button onClick={save} disabled={saving} className="flex-1 px-4 py-2.5 bg-[#ffd500] hover:bg-[#e6c000] text-gray-900 rounded-lg text-sm font-semibold disabled:opacity-60">
            {saving ? "Enregistrement…" : isNew ? "Créer la machine" : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}
