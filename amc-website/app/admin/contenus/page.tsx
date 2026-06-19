"use client";

import { useEffect, useState } from "react";

type Stat = { value: string; label: string };
type FooterLink = { label: string; href: string; section: string };

type SiteContent = {
  contact: { address: string; phone: string; email: string; hours: string };
  home: { heroTitle: string; heroSubtitle: string; activitiesText: string };
  apropos: { intro: string; stats: Stat[] };
  footer: { links: FooterLink[] };
};

const DEFAULT: SiteContent = {
  contact: { address: "ZAC D'Orsan, 330 Rue du Mont Blanc\n74540 Saint-Félix", phone: "04 26 78 43 90", email: "contact@amc-savoie.fr", hours: "Lun–Ven : 8h–18h\nSam : 8h–12h" },
  home: { heroTitle: "Votre partenaire matériel de chantier en Rhône-Alpes", heroSubtitle: "Distributeur officiel WACKER NEUSON, Magni et Promove Demolition", activitiesText: "Vente, location et service après-vente de matériels compacts pour le BTP." },
  apropos: { intro: "AMC — Alpes Matériel Compact est votre distributeur officiel de matériels de chantier en Rhône-Alpes.", stats: [{ value: "2009", label: "Année de création" }, { value: "5", label: "Techniciens certifiés" }, { value: "800 m²", label: "Surface atelier" }, { value: "Rhône-Alpes", label: "Zone d'intervention" }] },
  footer: { links: [
    { label: "WACKER NEUSON", href: "/partenaires/wacker-neuson", section: "Nos matériels" },
    { label: "Magni", href: "/partenaires/magni", section: "Nos matériels" },
    { label: "Promove Demolition", href: "/partenaires/promove-demolition", section: "Nos matériels" },
    { label: "Catalogue", href: "/catalogue", section: "Nos matériels" },
    { label: "SAV & Maintenance", href: "/services", section: "Nos services" },
    { label: "Financement", href: "/financement", section: "Nos services" },
    { label: "Devis", href: "/devis", section: "Nos services" },
    { label: "Notre équipe", href: "/a-propos", section: "L'entreprise" },
    { label: "Actualités", href: "/actualites", section: "L'entreprise" },
    { label: "Contact", href: "/contact", section: "L'entreprise" },
  ] },
};

const TABS = [
  { id: "contact", label: "Contact & Coordonnées" },
  { id: "home", label: "Page d'accueil" },
  { id: "apropos", label: "Page À propos" },
  { id: "footer", label: "Footer" },
] as const;

type TabId = typeof TABS[number]["id"];

const inp = "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400";

export default function ContenusPage() {
  const [content, setContent] = useState<SiteContent>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<TabId>("contact");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  useEffect(() => {
    fetch("/api/admin/content").then((r) => r.json()).then((d: SiteContent) => {
      setContent({ ...DEFAULT, ...d, contact: { ...DEFAULT.contact, ...d.contact }, home: { ...DEFAULT.home, ...d.home }, apropos: { ...DEFAULT.apropos, ...d.apropos, stats: d.apropos?.stats ?? DEFAULT.apropos.stats }, footer: { links: d.footer?.links ?? DEFAULT.footer.links } });
      setLoading(false);
    });
  }, []);

  function setC<K extends keyof SiteContent>(section: K, key: keyof SiteContent[K], value: string) {
    setContent((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
  }

  function setStat(i: number, field: keyof Stat, value: string) {
    setContent((prev) => {
      const stats = [...prev.apropos.stats];
      stats[i] = { ...stats[i], [field]: value };
      return { ...prev, apropos: { ...prev.apropos, stats } };
    });
  }

  function setLink(i: number, field: keyof FooterLink, value: string) {
    setContent((prev) => {
      const links = [...prev.footer.links];
      links[i] = { ...links[i], [field]: value };
      return { ...prev, footer: { links } };
    });
  }

  function addLink() {
    setContent((prev) => ({ ...prev, footer: { links: [...prev.footer.links, { label: "", href: "", section: "Nos matériels" }] } }));
  }

  function removeLink(i: number) {
    setContent((prev) => ({ ...prev, footer: { links: prev.footer.links.filter((_, j) => j !== i) } }));
  }

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
      if (res.ok) showToast("Contenus enregistrés");
      else showToast("Erreur enregistrement");
    } finally { setSaving(false); }
  }

  if (loading) return <div className="p-8 text-gray-400 text-sm">Chargement…</div>;

  const FOOTER_SECTIONS = Array.from(new Set(content.footer.links.map((l) => l.section)));

  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Textes & Contenus</h1>
          <p className="text-sm text-gray-500 mt-0.5">Modifiez les textes du site, enregistrés dans Vercel KV</p>
        </div>
        <button onClick={save} disabled={saving} className="px-4 py-2 bg-[#ffd500] hover:bg-[#e6c000] text-gray-900 font-semibold rounded-lg text-sm disabled:opacity-60">
          {saving ? "Enregistrement…" : "Enregistrer tout"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 overflow-x-auto">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 whitespace-nowrap px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${tab === t.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        {tab === "contact" && (
          <>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Adresse</label>
              <textarea rows={2} value={content.contact.address} onChange={(e) => setC("contact", "address", e.target.value)} className={`${inp} resize-none`} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Téléphone</label>
                <input type="text" value={content.contact.phone} onChange={(e) => setC("contact", "phone", e.target.value)} className={inp} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={content.contact.email} onChange={(e) => setC("contact", "email", e.target.value)} className={inp} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Horaires</label>
              <textarea rows={2} value={content.contact.hours} onChange={(e) => setC("contact", "hours", e.target.value)} className={`${inp} resize-none`} />
            </div>
          </>
        )}

        {tab === "home" && (
          <>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Titre hero</label>
              <input type="text" value={content.home.heroTitle} onChange={(e) => setC("home", "heroTitle", e.target.value)} className={inp} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Sous-titre hero</label>
              <input type="text" value={content.home.heroSubtitle} onChange={(e) => setC("home", "heroSubtitle", e.target.value)} className={inp} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Texte section activités</label>
              <textarea rows={3} value={content.home.activitiesText} onChange={(e) => setC("home", "activitiesText", e.target.value)} className={`${inp} resize-none`} />
            </div>
          </>
        )}

        {tab === "apropos" && (
          <>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Texte de présentation principal</label>
              <textarea rows={4} value={content.apropos.intro} onChange={(e) => setC("apropos", "intro", e.target.value)} className={`${inp} resize-none`} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Chiffres clés (4 stats)</label>
              <div className="space-y-2">
                {content.apropos.stats.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <input type="text" value={s.value} onChange={(e) => setStat(i, "value", e.target.value)} className="w-32 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 font-bold" placeholder="2009" />
                    <input type="text" value={s.label} onChange={(e) => setStat(i, "label", e.target.value)} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Année de création" />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === "footer" && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-medium text-gray-700">Liens de navigation</label>
              <button onClick={addLink} className="text-xs text-blue-600 hover:text-blue-800 font-medium">+ Ajouter</button>
            </div>
            {FOOTER_SECTIONS.map((section) => (
              <div key={section} className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">{section}</p>
                <div className="space-y-2">
                  {content.footer.links.map((link, i) => link.section !== section ? null : (
                    <div key={i} className="flex gap-2 items-center">
                      <input type="text" value={link.label} onChange={(e) => setLink(i, "label", e.target.value)} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400" placeholder="Label" />
                      <input type="text" value={link.href} onChange={(e) => setLink(i, "href", e.target.value)} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400" placeholder="/chemin" />
                      <select value={link.section} onChange={(e) => setLink(i, "section", e.target.value)} className="px-2 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-yellow-400">
                        {["Nos matériels", "Nos services", "L'entreprise"].map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <button onClick={() => removeLink(i)} className="p-1.5 text-gray-400 hover:text-red-500 rounded">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {/* New links not yet in a section */}
            {content.footer.links.filter((l) => !FOOTER_SECTIONS.includes(l.section)).map((link, i) => (
              <div key={i} className="flex gap-2 items-center mb-2">
                <input type="text" value={link.label} onChange={(e) => setLink(content.footer.links.indexOf(link), "label", e.target.value)} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none" placeholder="Label" />
                <input type="text" value={link.href} onChange={(e) => setLink(content.footer.links.indexOf(link), "href", e.target.value)} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none" placeholder="/chemin" />
              </div>
            ))}
          </div>
        )}
      </div>

      {toast && <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-lg z-50">{toast}</div>}
    </div>
  );
}
