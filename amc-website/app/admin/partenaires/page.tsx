"use client";

import { useEffect, useState } from "react";
import { ImageUpload } from "@/components/admin/ImageUpload";

type Stat = { value: string; label: string };

type PartnerForm = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  logo: string | null;
  heroImage: string | null;
  website: string;
  stats: Stat[];
};

const DEFAULTS: Record<string, PartnerForm> = {
  "wacker-neuson": {
    slug: "wacker-neuson", name: "WACKER NEUSON",
    tagline: "Partenaire officiel — Gamme complète",
    description: "Leader mondial des équipements compacts de construction. AMC est distributeur officiel WACKER NEUSON pour la région Rhône-Alpes, proposant l'ensemble de la gamme : compacteurs, dumpers, pelles, plaques vibrantes et bien plus.",
    logo: "/images/logo-wacker.png", heroImage: "/images/photo-wacker-catalogue.webp",
    website: "https://www.wackerneuson.com",
    stats: [{ value: "42+", label: "Références disponibles" }, { value: "15+", label: "Années de partenariat" }, { value: "SAV", label: "Certification SAV" }],
  },
  magni: {
    slug: "magni", name: "Magni",
    tagline: "Spécialiste télescopiques",
    description: "Magni est le spécialiste des chariots télescopiques rotatifs haute performance. Des machines robustes et précises pour la manutention et la construction.",
    logo: "/images/logo-magni.png", heroImage: "/images/Magni-catalogue.webp",
    website: "https://www.magni.it",
    stats: [{ value: "23+", label: "Références disponibles" }, { value: "10+", label: "Années de partenariat" }, { value: "SAV", label: "Certification SAV" }],
  },
  "promove-demolition": {
    slug: "promove-demolition", name: "Promove Demolition",
    tagline: "Expert en équipements de démolition",
    description: "Promove Demolition est le spécialiste des équipements de démolition et attachements pour chantiers BTP.",
    logo: "/images/logo-promove.jpg", heroImage: "/images/catalogue-promove-demolition.webp",
    website: "https://www.promove-demolition.fr",
    stats: [{ value: "22+", label: "Références disponibles" }, { value: "8+", label: "Années de partenariat" }, { value: "SAV", label: "Certification SAV" }],
  },
};

const SLUGS = ["wacker-neuson", "magni", "promove-demolition"];
const inp = "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400";

export default function PartenairesPage() {
  const [partners, setPartners] = useState<Record<string, PartnerForm>>(
    Object.fromEntries(SLUGS.map((s) => [s, { ...DEFAULTS[s] }]))
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  useEffect(() => {
    Promise.all(SLUGS.map((s) => fetch(`/api/admin/partners/${s}`).then((r) => r.json()))).then((results) => {
      const merged: Record<string, PartnerForm> = {};
      SLUGS.forEach((s, i) => {
        merged[s] = { ...DEFAULTS[s], ...results[i] };
      });
      setPartners(merged);
      setLoading(false);
    });
  }, []);

  function set(slug: string, key: keyof PartnerForm, value: unknown) {
    setPartners((prev) => ({ ...prev, [slug]: { ...prev[slug], [key]: value } }));
  }

  function setStat(slug: string, i: number, field: keyof Stat, value: string) {
    setPartners((prev) => {
      const stats = [...prev[slug].stats];
      stats[i] = { ...stats[i], [field]: value };
      return { ...prev, [slug]: { ...prev[slug], stats } };
    });
  }

  async function save(slug: string) {
    setSaving(slug);
    try {
      const res = await fetch(`/api/admin/partners/${slug}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(partners[slug]),
      });
      if (res.ok) showToast(`${partners[slug].name} enregistré`);
      else showToast("Erreur enregistrement");
    } finally { setSaving(null); }
  }

  if (loading) return <div className="p-8 text-gray-400 text-sm">Chargement…</div>;

  return (
    <div className="p-6 md:p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Partenaires</h1>
        <p className="text-sm text-gray-500 mt-0.5">Modifier les informations des 3 partenaires officiels</p>
      </div>

      {SLUGS.map((slug) => {
        const p = partners[slug];
        return (
          <section key={slug} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">{p.name}</h2>
              <button
                onClick={() => save(slug)}
                disabled={saving === slug}
                className="px-4 py-2 bg-[#ffd500] hover:bg-[#e6c000] text-gray-900 font-semibold rounded-lg text-sm disabled:opacity-60"
              >
                {saving === slug ? "Enregistrement…" : "Enregistrer"}
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Nom affiché</label>
                <input type="text" value={p.name} onChange={(e) => set(slug, "name", e.target.value)} className={inp} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">URL site partenaire</label>
                <input type="url" value={p.website} onChange={(e) => set(slug, "website", e.target.value)} className={inp} placeholder="https://…" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Tagline</label>
              <input type="text" value={p.tagline} onChange={(e) => set(slug, "tagline", e.target.value)} className={inp} />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea rows={3} value={p.description} onChange={(e) => set(slug, "description", e.target.value)} className={`${inp} resize-none`} />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <ImageUpload label="Logo" value={p.logo} onChange={(url) => set(slug, "logo", url)} />
              <ImageUpload label="Image bandeau hero" value={p.heroImage} onChange={(url) => set(slug, "heroImage", url)} />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Stats (3 chiffres clés)</label>
              <div className="space-y-2">
                {p.stats.map((stat, i) => (
                  <div key={i} className="flex gap-2">
                    <input type="text" value={stat.value} onChange={(e) => setStat(slug, i, "value", e.target.value)} className="w-28 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 font-bold" placeholder="42+" />
                    <input type="text" value={stat.label} onChange={(e) => setStat(slug, i, "label", e.target.value)} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Références disponibles" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {toast && <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-lg z-50">{toast}</div>}
    </div>
  );
}
