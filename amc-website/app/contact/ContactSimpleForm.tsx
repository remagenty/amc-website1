"use client";

import { useState } from "react";
import { IconArrowRight } from "@/components/ui/Icons";
import { FormConfirmation } from "@/components/ui/FormConfirmation";
import { PhotoUpload, type UploadedPhoto } from "@/components/ui/PhotoUpload";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
};

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
  consent: false,
};

export function ContactSimpleForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);

  const set = (key: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim()) e.firstName = "Prénom requis";
    if (!form.lastName.trim()) e.lastName = "Nom requis";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Email invalide";
    if (!form.message.trim()) e.message = "Message requis";
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

  const inp = (key: keyof FormState) =>
    `input-base ${errors[key] ? "border-red-400 ring-1 ring-red-400" : ""}`;

  if (status !== null) {
    return (
      <FormConfirmation
        status={status}
        name={`${form.firstName} ${form.lastName}`.trim()}
        onReset={() => { setStatus(null); setForm(INITIAL); setPhotos([]); }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Prénom + Nom */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-amc-text mb-1.5">
            Prénom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            placeholder="Jean"
            className={inp("firstName")}
            autoComplete="given-name"
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-amc-text mb-1.5">
            Nom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            placeholder="Dupont"
            className={inp("lastName")}
            autoComplete="family-name"
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>

      {/* Email + Téléphone */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-amc-text mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="jean.dupont@entreprise.fr"
            className={inp("email")}
            autoComplete="email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-amc-text mb-1.5">
            Téléphone <span className="text-amc-text-secondary text-xs font-normal">(optionnel)</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="04 26 78 43 90"
            className="input-base"
            autoComplete="tel"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-amc-text mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Décrivez votre besoin..."
          rows={5}
          className={`${inp("message")} resize-none`}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>

      {/* RGPD */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-amc-yellow cursor-pointer"
          />
          <span className="text-xs text-amc-text-secondary leading-relaxed">
            J&apos;accepte que AMC utilise mes informations pour traiter ma demande conformément à sa{" "}
            <a href="/politique-confidentialite" className="text-amc-yellow-dark hover:underline">
              politique de confidentialité
            </a>. <span className="text-red-500">*</span>
          </span>
        </label>
        {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent}</p>}
      </div>

      <PhotoUpload photos={photos} onChange={setPhotos} />

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center text-base py-3.5 rounded-xl disabled:opacity-60"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Envoi en cours…
          </span>
        ) : (
          <>Envoyer le message <IconArrowRight size={15} /></>
        )}
      </button>

      <p className="text-xs text-center text-amc-text-secondary">* Champs obligatoires</p>
    </form>
  );
}
