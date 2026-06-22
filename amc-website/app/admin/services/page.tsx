"use client";

import { useEffect, useState } from "react";
import { ImageUpload } from "@/components/admin/ImageUpload";

type Service = {
  slug: string;
  title: string;
  description: string;
  heroImage: string | null;
  keyPoints: string[];
  ctaText: string;
  ctaHref: string;
};

const SLUG_LABELS: Record<string, string> = {
  financement: "Financement",
  maintenance: "SAV & Maintenance",
  "certification-se-plus": "Certification SE+",
};

const SLUG_ORDER = ["financement", "maintenance", "certification-se-plus"];

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Record<string, Service>>({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  useEffect(() => {
    fetch("/api/admin/services")
      .then((r) => r.json())
      .then((d) => {
        setServices(d);
        setLoading(false);
      });
  }, []);

  function openEdit(service: Service) {
    setEditing(service);
    setForm({ ...service, keyPoints: [...service.keyPoints] });
  }

  function closeModal() {
    setEditing(null);
    setForm(null);
  }

  async function save() {
    if (!form) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/services/${form.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setServices((prev) => ({ ...prev, [form.slug]: form }));
        closeModal();
        showToast(`Service "${form.title}" enregistré`);
      }
    } finally {
      setSaving(false);
    }
  }

  function updateKeyPoint(index: number, value: string) {
    if (!form) return;
    const updated = [...form.keyPoints];
    updated[index] = value;
    setForm({ ...form, keyPoints: updated });
  }

  function addKeyPoint() {
    if (!form) return;
    setForm({ ...form, keyPoints: [...form.keyPoints, ""] });
  }

  function removeKeyPoint(index: number) {
    if (!form) return;
    const updated = form.keyPoints.filter((_, i) => i !== index);
    setForm({ ...form, keyPoints: updated });
  }

  const inp =
    "w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400";

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Services</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Modifier les textes et contenus des pages services
        </p>
      </div>

      {loading ? (
        <div className="text-gray-400 text-sm">Chargement…</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SLUG_ORDER.map((slug) => {
            const service = services[slug];
            if (!service) return null;
            return (
              <div
                key={slug}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col"
              >
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {SLUG_LABELS[slug] ?? slug}
                    </span>
                    <h2 className="font-semibold text-gray-900 text-sm mt-0.5">{service.title}</h2>
                  </div>
                  <button
                    onClick={() => openEdit(service)}
                    className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg flex-shrink-0 ml-3"
                  >
                    Modifier
                  </button>
                </div>
                <div className="px-5 py-4 flex-1">
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                  <div className="mt-3 space-y-1">
                    {service.keyPoints.slice(0, 3).map((pt, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <span className="mt-0.5 w-3.5 h-3.5 rounded-full bg-[#ffd500] flex-shrink-0 flex items-center justify-center">
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className="text-xs text-gray-600 line-clamp-1">{pt}</span>
                      </div>
                    ))}
                    {service.keyPoints.length > 3 && (
                      <p className="text-xs text-gray-400">
                        +{service.keyPoints.length - 3} point(s)
                      </p>
                    )}
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                      CTA :{" "}
                      <span className="font-medium text-gray-600">{service.ctaText}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit modal */}
      {editing !== null && form !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl max-h-[92vh] overflow-y-auto">
            <h3 className="font-bold text-gray-900 mb-4">
              Modifier — {SLUG_LABELS[form.slug] ?? form.slug}
            </h3>
            <div className="space-y-4">
              {/* Titre */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Titre</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inp}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className={`${inp} resize-none`}
                />
              </div>

              {/* Image hero */}
              <div>
                <ImageUpload
                  label="Image hero"
                  value={form.heroImage}
                  onChange={(url) => setForm({ ...form, heroImage: url })}
                />
              </div>

              {/* Points clés */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Points clés</label>
                <div className="space-y-2">
                  {form.keyPoints.map((pt, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={pt}
                        onChange={(e) => updateKeyPoint(i, e.target.value)}
                        className={`${inp} flex-1`}
                        placeholder={`Point ${i + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeKeyPoint(i)}
                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        aria-label="Supprimer"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addKeyPoint}
                  className="mt-2 flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Ajouter un point
                </button>
              </div>

              {/* CTA */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Texte du bouton CTA
                  </label>
                  <input
                    type="text"
                    value={form.ctaText}
                    onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
                    className={inp}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    URL du bouton CTA
                  </label>
                  <input
                    type="text"
                    value={form.ctaHref}
                    onChange={(e) => setForm({ ...form, ctaHref: e.target.value })}
                    className={inp}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="flex-1 px-4 py-2 bg-[#ffd500] text-gray-900 rounded-lg text-sm font-semibold disabled:opacity-60"
              >
                {saving ? "Enregistrement…" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
