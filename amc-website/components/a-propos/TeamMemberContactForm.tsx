"use client";

import { useState } from "react";
import { IconArrowRight } from "@/components/ui/Icons";
import { FormConfirmation } from "@/components/ui/FormConfirmation";
import { PhotoUpload, type UploadedPhoto } from "@/components/ui/PhotoUpload";

const OBJECT_TYPES = [
  { value: "devis", label: "Demande de devis" },
  { value: "technique", label: "Question technique" },
  { value: "sav", label: "Intervention SAV" },
  { value: "autre", label: "Autre" },
];

interface Props {
  memberName: string;
  memberRole: string;
}

export function TeamMemberContactForm({ memberName, memberRole }: Props) {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    telephone: "",
    societe: "",
    objet: "devis",
    message: "",
    consent: false,
  });
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nom.trim()) e.nom = "Votre nom est requis";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Email invalide";
    if (!form.message.trim()) e.message = "Le message est requis";
    if (!form.consent) e.consent = "Vous devez accepter la politique de confidentialité";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setStatus("success");
  };

  const set = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  if (status !== null) {
    return (
      <FormConfirmation
        status={status}
        name={form.nom}
        onReset={() => { setStatus(null); setForm({ nom: "", email: "", telephone: "", societe: "", objet: "devis", message: "", consent: false }); setPhotos([]); }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Champ caché — identification du membre contacté */}
      <input type="hidden" name="contacted_member" value={`${memberRole} — ${memberName}`} />

      {/* Nom */}
      <div>
        <label className="block text-sm font-semibold text-amc-text mb-1.5">
          Votre nom <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.nom}
          onChange={(e) => set("nom", e.target.value)}
          placeholder="Jean Dupont"
          className={`input-base ${errors.nom ? "border-red-400 ring-1 ring-red-400" : ""}`}
          autoComplete="name"
        />
        {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
      </div>

      {/* Email + Téléphone */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-amc-text mb-1.5">
            Votre email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="jean@entreprise.fr"
            className={`input-base ${errors.email ? "border-red-400 ring-1 ring-red-400" : ""}`}
            autoComplete="email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-amc-text mb-1.5">
            Votre téléphone
          </label>
          <input
            type="tel"
            value={form.telephone}
            onChange={(e) => set("telephone", e.target.value)}
            placeholder="+33 6 00 00 00 00"
            className="input-base"
            autoComplete="tel"
          />
        </div>
      </div>

      {/* Société */}
      <div>
        <label className="block text-sm font-semibold text-amc-text mb-1.5">
          Votre société
        </label>
        <input
          type="text"
          value={form.societe}
          onChange={(e) => set("societe", e.target.value)}
          placeholder="BTP Savoie SAS"
          className="input-base"
          autoComplete="organization"
        />
      </div>

      {/* Objet */}
      <div>
        <label className="block text-sm font-semibold text-amc-text mb-1.5">
          Objet <span className="text-red-500">*</span>
        </label>
        <select
          value={form.objet}
          onChange={(e) => set("objet", e.target.value)}
          className="select-base"
        >
          {OBJECT_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-amc-text mb-1.5">
          Votre message <span className="text-red-500">*</span>
        </label>
        <textarea
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Décrivez votre besoin..."
          rows={5}
          className={`input-base resize-none ${errors.message ? "border-red-400 ring-1 ring-red-400" : ""}`}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>

      <PhotoUpload photos={photos} onChange={setPhotos} />

      {/* Consentement */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-amc-yellow cursor-pointer"
          />
          <span className="text-xs text-amc-text-secondary leading-relaxed">
            J'accepte que AMC utilise mes informations pour traiter ma demande conformément à sa{" "}
            <a href="/politique-confidentialite" className="text-amc-yellow-dark hover:underline">
              politique de confidentialité
            </a>.
            <span className="text-red-500 ml-1">*</span>
          </span>
        </label>
        {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center text-base py-4 rounded-xl disabled:opacity-60"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Envoi en cours...
          </span>
        ) : (
          <>Envoyer le message <IconArrowRight size={16} /></>
        )}
      </button>

      <p className="text-xs text-center text-amc-text-secondary">
        * Champs obligatoires — Réponse garantie sous 24h ouvrées
      </p>
    </form>
  );
}
