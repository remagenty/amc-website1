"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { IconCheck, IconArrowRight } from "@/components/ui/Icons";

const REQUEST_TYPES = [
  { value: "devis", label: "Demande de devis" },
  { value: "sav", label: "Service après-vente (SAV)" },
  { value: "information", label: "Demande d'information" },
  { value: "pieces", label: "Commande pièces détachées" },
  { value: "maintenance", label: "Contrat maintenance" },
  { value: "recherche", label: "Recherche matériel occasion" },
  { value: "autre", label: "Autre demande" },
];

export function ContactForm() {
  const searchParams = useSearchParams();
  const defaultType = searchParams.get("type") ?? "devis";
  const defaultProduit = searchParams.get("produit") ?? "";

  const [form, setForm] = useState({
    type: defaultType,
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    materiel: defaultProduit,
    message: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
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
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const handleChange = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  if (submitted) {
    return (
      <div className="py-12 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <IconCheck size={28} className="text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-amc-text mb-2">
          Message envoyé avec succès !
        </h3>
        <p className="text-amc-text-secondary text-sm max-w-md mx-auto">
          Merci pour votre demande. Notre équipe vous contactera dans les plus brefs délais,
          généralement sous 24h ouvrées.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ type: "devis", firstName: "", lastName: "", company: "", email: "", phone: "", materiel: "", message: "", consent: false }); }}
          className="mt-6 btn-secondary rounded-lg text-sm"
        >
          Envoyer une nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Type de demande */}
      <div>
        <label className="block text-sm font-semibold text-amc-text mb-1.5">
          Type de demande <span className="text-red-500">*</span>
        </label>
        <select
          value={form.type}
          onChange={(e) => handleChange("type", e.target.value)}
          className="select-base"
        >
          {REQUEST_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      {/* Name */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-amc-text mb-1.5">
            Prénom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            placeholder="Jean"
            className={`input-base ${errors.firstName ? "border-red-400 ring-1 ring-red-400" : ""}`}
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
            onChange={(e) => handleChange("lastName", e.target.value)}
            placeholder="Dupont"
            className={`input-base ${errors.lastName ? "border-red-400 ring-1 ring-red-400" : ""}`}
            autoComplete="family-name"
          />
          {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>

      {/* Company + email + phone */}
      <div>
        <label className="block text-sm font-semibold text-amc-text mb-1.5">
          Société
        </label>
        <input
          type="text"
          value={form.company}
          onChange={(e) => handleChange("company", e.target.value)}
          placeholder="BTP Savoie SAS"
          className="input-base"
          autoComplete="organization"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-amc-text mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="jean.dupont@entreprise.fr"
            className={`input-base ${errors.email ? "border-red-400 ring-1 ring-red-400" : ""}`}
            autoComplete="email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-amc-text mb-1.5">
            Téléphone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+33 6 00 00 00 00"
            className="input-base"
            autoComplete="tel"
          />
        </div>
      </div>

      {/* Matériel concerné */}
      {["devis", "sav", "pieces"].includes(form.type) && (
        <div>
          <label className="block text-sm font-semibold text-amc-text mb-1.5">
            Matériel concerné
          </label>
          <input
            type="text"
            value={form.materiel}
            onChange={(e) => handleChange("materiel", e.target.value)}
            placeholder="Ex: Wacker Neuson DW60, Magni RTH 5.18..."
            className="input-base"
          />
        </div>
      )}

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-amc-text mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder="Décrivez votre besoin en détail..."
          rows={5}
          className={`input-base resize-none ${errors.message ? "border-red-400 ring-1 ring-red-400" : ""}`}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>

      {/* Consent */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => handleChange("consent", e.target.checked)}
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
          <>
            Envoyer la demande
            <IconArrowRight size={16} />
          </>
        )}
      </button>

      <p className="text-xs text-center text-amc-text-secondary">
        * Champs obligatoires — Réponse garantie sous 24h ouvrées
      </p>
    </form>
  );
}
