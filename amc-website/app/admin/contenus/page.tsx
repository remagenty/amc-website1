"use client";

import { useEffect, useState } from "react";

type Stat = { value: string; label: string };
type FooterLink = { label: string; href: string; section: string };
type TickerItem = { text: string };
type HeroSlideKV = {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  image?: string;
  badge?: string;
};
type HomepageStat = { value: string; label: string };
type SocialSettings = { facebookUrl: string; instagramUrl: string; facebookEnabled: boolean; instagramEnabled: boolean };
type SeoSettings = { homeTitle: string; homeDescription: string; keywords: string };

type SiteContent = {
  contact: { address: string; phone: string; email: string; hours: string };
  home: { heroTitle: string; heroSubtitle: string; activitiesText: string };
  apropos: { intro: string; stats: Stat[] };
  footer: { links: FooterLink[] };
  ticker: { items: TickerItem[] };
  heroSlides: HeroSlideKV[];
  homepageStats: HomepageStat[];
  social: SocialSettings;
  seo: SeoSettings;
  copyright: string;
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
  ticker: {
    items: [
      { text: "Certification SE+" },
      { text: "Livraison Rhône-Alpes" },
      { text: "Garantie constructeur" },
      { text: "Financement disponible" },
      { text: "Stock disponible — Livraison immédiate" },
      { text: "Pièces d'origine constructeur" },
      { text: "Techniciens certifiés usine" },
      { text: "Devis gratuit sous 24h" },
      { text: "+15 ans d'expérience" },
      { text: "Service après-vente sur site" },
    ],
  },
  heroSlides: [
    {
      id: "slide-1",
      title: "Votre partenaire machines neuves et occasion",
      subtitle: "Spécialiste de la vente de matériel de chantier en Rhône-Alpes.",
      ctaLabel: "Découvrir nos machines",
      ctaHref: "/gammes",
      ctaSecondaryLabel: "Demander un devis",
      ctaSecondaryHref: "/contact?type=devis",
      image: "/images/Slide-1.jpg",
    },
    {
      id: "slide-2",
      title: "Distributeur officiel WACKER NEUSON",
      subtitle: "Accédez à toute la gamme WACKER NEUSON.",
      ctaLabel: "Voir la gamme WACKER NEUSON",
      ctaHref: "/partenaires/wacker-neuson",
      ctaSecondaryLabel: "Contactez-nous",
      ctaSecondaryHref: "/contact",
      badge: "Partenaire officiel",
    },
    {
      id: "slide-3",
      title: "Atelier certifié SE+ et techniciens qualifiés",
      subtitle: "Un service après-vente d'excellence avec des techniciens certifiés.",
      ctaLabel: "Découvrir nos services",
      ctaHref: "/services",
      ctaSecondaryLabel: "Prendre rendez-vous",
      ctaSecondaryHref: "/contact?type=sav",
      image: "/images/Slide-3.jpg",
      badge: "Certification SE+",
    },
  ],
  homepageStats: [
    { value: "3", label: "Marques partenaires" },
    { value: "15+", label: "Années d'expérience" },
    { value: "500+", label: "Machines disponibles" },
    { value: "100%", label: "Pièces d'origine" },
  ],
  social: {
    facebookUrl: "https://www.facebook.com/amcalpesmc",
    instagramUrl: "https://www.instagram.com/amc_savoie",
    facebookEnabled: true,
    instagramEnabled: true,
  },
  seo: {
    homeTitle: "AMC — Vente matériels de chantier Rhône-Alpes | WACKER NEUSON, Magni, Promove",
    homeDescription: "AMC, votre spécialiste de la vente de matériels de chantier neufs et d'occasion en Rhône-Alpes.",
    keywords: "matériel chantier, WACKER NEUSON, Magni, Promove, Rhône-Alpes, SAV certifié, mini-pelle, dumper, compacteur",
  },
  copyright: `© ${new Date().getFullYear()} AMC — Alpes Matériel Compact. Tous droits réservés.`,
};

const TABS = [
  { id: "contact", label: "Contact & Coordonnées" },
  { id: "home", label: "Page d'accueil" },
  { id: "apropos", label: "Page À propos" },
  { id: "footer", label: "Footer" },
  { id: "ticker", label: "Bandeau ticker" },
  { id: "hero", label: "Slides hero" },
  { id: "stats", label: "Stats accueil" },
  { id: "seo", label: "SEO & Réseaux" },
] as const;

type TabId = typeof TABS[number]["id"];

const inp = "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400";

export default function ContenusPage() {
  const [content, setContent] = useState<SiteContent>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<TabId>("contact");
  const [toast, setToast] = useState("");
  const [expandedSlide, setExpandedSlide] = useState<number | null>(0);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  useEffect(() => {
    fetch("/api/admin/content").then((r) => r.json()).then((d: SiteContent) => {
      setContent({
        ...DEFAULT,
        ...d,
        contact: { ...DEFAULT.contact, ...d.contact },
        home: { ...DEFAULT.home, ...d.home },
        apropos: { ...DEFAULT.apropos, ...d.apropos, stats: d.apropos?.stats ?? DEFAULT.apropos.stats },
        footer: { links: d.footer?.links ?? DEFAULT.footer.links },
        ticker: d.ticker ?? DEFAULT.ticker,
        heroSlides: d.heroSlides ?? DEFAULT.heroSlides,
        homepageStats: d.homepageStats ?? DEFAULT.homepageStats,
        social: { ...DEFAULT.social, ...d.social },
        seo: { ...DEFAULT.seo, ...d.seo },
        copyright: d.copyright ?? DEFAULT.copyright,
      });
      setLoading(false);
    });
  }, []);

  function setC<K extends keyof SiteContent>(section: K, key: keyof SiteContent[K], value: string) {
    setContent((prev) => ({ ...prev, [section]: { ...(prev[section] as Record<string, unknown>), [key]: value } }));
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

  function setTickerItem(i: number, value: string) {
    setContent((prev) => {
      const items = [...prev.ticker.items];
      items[i] = { text: value };
      return { ...prev, ticker: { items } };
    });
  }

  function addTickerItem() {
    setContent((prev) => ({ ...prev, ticker: { items: [...prev.ticker.items, { text: "" }] } }));
  }

  function removeTickerItem(i: number) {
    setContent((prev) => ({ ...prev, ticker: { items: prev.ticker.items.filter((_, j) => j !== i) } }));
  }

  function setSlideField(i: number, field: keyof HeroSlideKV, value: string) {
    setContent((prev) => {
      const heroSlides = [...prev.heroSlides];
      heroSlides[i] = { ...heroSlides[i], [field]: value };
      return { ...prev, heroSlides };
    });
  }

  function addSlide() {
    const newSlide: HeroSlideKV = {
      id: `slide-${Date.now()}`,
      title: "",
      subtitle: "",
      ctaLabel: "",
      ctaHref: "/",
    };
    setContent((prev) => ({ ...prev, heroSlides: [...prev.heroSlides, newSlide] }));
    setExpandedSlide(content.heroSlides.length);
  }

  function removeSlide(i: number) {
    setContent((prev) => ({ ...prev, heroSlides: prev.heroSlides.filter((_, j) => j !== i) }));
    setExpandedSlide(null);
  }

  function setHomepageStat(i: number, field: keyof HomepageStat, value: string) {
    setContent((prev) => {
      const homepageStats = [...prev.homepageStats];
      homepageStats[i] = { ...homepageStats[i], [field]: value };
      return { ...prev, homepageStats };
    });
  }

  function setSocialField(field: keyof SocialSettings, value: string | boolean) {
    setContent((prev) => ({ ...prev, social: { ...prev.social, [field]: value } }));
  }

  function setSeoField(field: keyof SeoSettings, value: string) {
    setContent((prev) => ({ ...prev, seo: { ...prev.seo, [field]: value } }));
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

        {tab === "ticker" && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-medium text-gray-700">Éléments du bandeau défilant</label>
              <button onClick={addTickerItem} className="text-xs text-blue-600 hover:text-blue-800 font-medium">+ Ajouter</button>
            </div>
            <div className="space-y-2">
              {content.ticker.items.map((item, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => setTickerItem(i, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Texte de l'élément"
                  />
                  <button onClick={() => removeTickerItem(i)} className="p-1.5 text-gray-400 hover:text-red-500 rounded flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "hero" && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-medium text-gray-700">Slides du hero</label>
              <button onClick={addSlide} className="text-xs text-blue-600 hover:text-blue-800 font-medium">+ Ajouter un slide</button>
            </div>
            <div className="space-y-3">
              {content.heroSlides.map((slide, i) => (
                <div key={slide.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  {/* Card header */}
                  <button
                    type="button"
                    onClick={() => setExpandedSlide(expandedSlide === i ? null : i)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                  >
                    <span className="text-sm font-semibold text-gray-700">
                      Slide {i + 1}{slide.title ? ` — ${slide.title.slice(0, 40)}${slide.title.length > 40 ? "…" : ""}` : ""}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeSlide(i); }}
                        className="p-1 text-gray-400 hover:text-red-500 rounded"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      </button>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${expandedSlide === i ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                  </button>

                  {expandedSlide === i && (
                    <div className="p-4 space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Titre</label>
                        <input type="text" value={slide.title} onChange={(e) => setSlideField(i, "title", e.target.value)} className={inp} placeholder="Titre du slide" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Sous-titre</label>
                        <textarea rows={2} value={slide.subtitle} onChange={(e) => setSlideField(i, "subtitle", e.target.value)} className={`${inp} resize-none`} placeholder="Sous-titre" />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">CTA principal — Texte</label>
                          <input type="text" value={slide.ctaLabel} onChange={(e) => setSlideField(i, "ctaLabel", e.target.value)} className={inp} placeholder="Découvrir nos machines" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">CTA principal — Lien</label>
                          <input type="text" value={slide.ctaHref} onChange={(e) => setSlideField(i, "ctaHref", e.target.value)} className={inp} placeholder="/gammes" />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">CTA secondaire — Texte (optionnel)</label>
                          <input type="text" value={slide.ctaSecondaryLabel ?? ""} onChange={(e) => setSlideField(i, "ctaSecondaryLabel", e.target.value)} className={inp} placeholder="Demander un devis" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">CTA secondaire — Lien (optionnel)</label>
                          <input type="text" value={slide.ctaSecondaryHref ?? ""} onChange={(e) => setSlideField(i, "ctaSecondaryHref", e.target.value)} className={inp} placeholder="/contact" />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Image URL (optionnel)</label>
                          <input type="text" value={slide.image ?? ""} onChange={(e) => setSlideField(i, "image", e.target.value)} className={inp} placeholder="/images/Slide-1.jpg" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Badge (optionnel)</label>
                          <input type="text" value={slide.badge ?? ""} onChange={(e) => setSlideField(i, "badge", e.target.value)} className={inp} placeholder="Partenaire officiel" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "stats" && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-3">Statistiques affichées sur la page d&apos;accueil</label>
            <div className="space-y-2">
              {content.homepageStats.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={s.value}
                    onChange={(e) => setHomepageStat(i, "value", e.target.value)}
                    className="w-32 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 font-bold"
                    placeholder="15+"
                  />
                  <input
                    type="text"
                    value={s.label}
                    onChange={(e) => setHomepageStat(i, "label", e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Années d'expérience"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "seo" && (
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-3">SEO — Page d&apos;accueil</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Titre (balise title)</label>
                  <input type="text" value={content.seo.homeTitle} onChange={(e) => setSeoField("homeTitle", e.target.value)} className={inp} placeholder="AMC — Vente matériels de chantier…" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Description (meta description)</label>
                  <textarea rows={3} value={content.seo.homeDescription} onChange={(e) => setSeoField("homeDescription", e.target.value)} className={`${inp} resize-none`} placeholder="AMC, votre spécialiste…" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Mots-clés (séparés par des virgules)</label>
                  <input type="text" value={content.seo.keywords} onChange={(e) => setSeoField("keywords", e.target.value)} className={inp} placeholder="matériel chantier, WACKER NEUSON…" />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Réseaux sociaux</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="fbEnabled"
                    checked={content.social.facebookEnabled}
                    onChange={(e) => setSocialField("facebookEnabled", e.target.checked)}
                    className="w-4 h-4 accent-yellow-400"
                  />
                  <label htmlFor="fbEnabled" className="text-xs font-medium text-gray-700">Facebook activé</label>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">URL Facebook</label>
                  <input type="text" value={content.social.facebookUrl} onChange={(e) => setSocialField("facebookUrl", e.target.value)} className={inp} placeholder="https://www.facebook.com/…" />
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="igEnabled"
                    checked={content.social.instagramEnabled}
                    onChange={(e) => setSocialField("instagramEnabled", e.target.checked)}
                    className="w-4 h-4 accent-yellow-400"
                  />
                  <label htmlFor="igEnabled" className="text-xs font-medium text-gray-700">Instagram activé</label>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">URL Instagram</label>
                  <input type="text" value={content.social.instagramUrl} onChange={(e) => setSocialField("instagramUrl", e.target.value)} className={inp} placeholder="https://www.instagram.com/…" />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-5">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Copyright</p>
              <input type="text" value={content.copyright} onChange={(e) => setContent((prev) => ({ ...prev, copyright: e.target.value }))} className={inp} placeholder="© 2025 AMC…" />
            </div>
          </div>
        )}
      </div>

      {toast && <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-lg z-50">{toast}</div>}
    </div>
  );
}
