"use client";

import { useState, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { IconCheck, IconArrowRight } from "@/components/ui/Icons";

const REQUEST_TYPES = [
  { value: "devis",       label: "Demande de devis" },
  { value: "sav",         label: "Service après-vente (SAV)" },
  { value: "information", label: "Demande d'information" },
  { value: "pieces",      label: "Commande pièces détachées" },
  { value: "occasion",    label: "Recherche matériel occasion" },
  { value: "autre",       label: "Autre demande" },
];

const MATERIEL_TYPES = [
  "Compacteur / Plaque vibrante",
  "Mini-pelle / Excavatrice",
  "Chargeur / Télescopique",
  "Nacelle / Élévateur",
  "Dumper / Tombereau",
  "Pompe / Assèchement",
  "Groupe électrogène",
  "Autre",
];

const MARQUES = ["Wacker Neuson", "Magni", "Promove", "Autre"];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_PHOTOS    = 3;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

type PhotoFile = { file: File; preview: string };

function PhotoUpload({
  label,
  files,
  onChange,
}: {
  label: string;
  files: PhotoFile[];
  onChange: (files: PhotoFile[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming) return;
      const accepted: PhotoFile[] = [];
      const errors: string[] = [];

      Array.from(incoming).forEach((file) => {
        if (files.length + accepted.length >= MAX_PHOTOS) {
          errors.push(`Maximum ${MAX_PHOTOS} photos autorisées.`);
          return;
        }
        if (!ACCEPTED_TYPES.includes(file.type)) {
          errors.push(`${file.name} : format non accepté (JPG, PNG uniquement).`);
          return;
        }
        if (file.size > MAX_FILE_SIZE) {
          errors.push(`${file.name} : fichier trop lourd (max 5 Mo).`);
          return;
        }
        accepted.push({ file, preview: URL.createObjectURL(file) });
      });

      if (errors.length) alert(errors.join("\n"));
      if (accepted.length) onChange([...files, ...accepted]);

      if (inputRef.current) inputRef.current.value = "";
    },
    [files, onChange]
  );

  const remove = (index: number) => {
    URL.revokeObjectURL(files[index].preview);
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-baseline gap-2 mb-1.5">
        <label className="block text-sm font-semibold text-amc-text">{label}</label>
        <span className="text-xs text-amc-text-secondary">(optionnel — max {MAX_PHOTOS} photos)</span>
      </div>

      {files.length < MAX_PHOTOS && (
        <>
          <label
            className="flex flex-col items-center justify-center w-full px-4 py-5 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer bg-gray-50 hover:border-amc-yellow hover:bg-amc-yellow/5 transition-colors"
            htmlFor={`photo-input-${label}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amc-text-secondary mb-2">
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="text-sm text-amc-text-secondary">
              Cliquer pour ajouter {files.length > 0 ? "une autre photo" : "des photos"}
            </span>
            <span className="text-xs text-amc-text-secondary mt-0.5">JPG, PNG — 5 Mo max par photo</span>
          </label>
          <input
            ref={inputRef}
            id={`photo-input-${label}`}
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            multiple
            className="sr-only"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </>
      )}

      {files.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-3">
          {files.map((pf, i) => (
            <div key={i} className="relative w-24 h-24 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pf.preview}
                alt={`photo ${i + 1}`}
                className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
              />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold transition-colors shadow"
                aria-label="Supprimer"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

type FormState = {
  type: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  materiel: string;
  message: string;
  materielType: string;
  marque: string;
  modele: string;
  numSerie: string;
  dateAchat: string;
  descriptionPanne: string;
  intervention: string;
  urgence: string;
  sujet: string;
  refPiece: string;
  quantite: string;
  descriptionPiece: string;
  materielRecherche: string;
  budget: string;
  dateDisponibilite: string;
  criteresSpecifiques: string;
  consent: boolean;
};

const INITIAL_FORM: FormState = {
  type: "devis",
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  materiel: "",
  message: "",
  materielType: "",
  marque: "",
  modele: "",
  numSerie: "",
  dateAchat: "",
  descriptionPanne: "",
  intervention: "atelier",
  urgence: "normale",
  sujet: "",
  refPiece: "",
  quantite: "",
  descriptionPiece: "",
  materielRecherche: "",
  budget: "",
  dateDisponibilite: "",
  criteresSpecifiques: "",
  consent: false,
};

const REQUIRED: Record<string, string[]> = {
  devis:       ["firstName", "lastName", "email", "message"],
  sav:         ["firstName", "lastName", "company", "email", "phone", "materielType", "marque", "descriptionPanne"],
  information: ["firstName", "lastName", "email", "sujet", "message"],
  pieces:      ["firstName", "lastName", "company", "email", "phone", "materielType", "marque", "modele", "descriptionPiece"],
  occasion:    ["firstName", "lastName", "email", "materielRecherche"],
  autre:       ["firstName", "lastName", "email", "sujet", "message"],
};

const ERROR_LABELS: Record<string, string> = {
  firstName:         "Prénom requis",
  lastName:          "Nom requis",
  company:           "Société requise",
  email:             "Email invalide",
  phone:             "Téléphone requis",
  materielType:      "Type de matériel requis",
  marque:            "Marque requise",
  modele:            "Modèle / référence requis",
  descriptionPanne:  "Description de la panne requise",
  sujet:             "Sujet requis",
  message:           "Message requis",
  descriptionPiece:  "Description requise",
  materielRecherche: "Type de matériel recherché requis",
};

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-amc-text mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export function ContactForm() {
  const searchParams  = useSearchParams();
  const defaultType   = searchParams.get("type")    ?? "devis";
  const defaultProduit = searchParams.get("produit") ?? "";

  const [form, setForm] = useState<FormState>({
    ...INITIAL_FORM,
    type:    REQUEST_TYPES.find((t) => t.value === defaultType) ? defaultType : "devis",
    materiel: defaultProduit,
  });
  const [photosSav,    setPhotosSav]    = useState<PhotoFile[]>([]);
  const [photosPieces, setPhotosPieces] = useState<PhotoFile[]>([]);
  const [submitted,    setSubmitted]    = useState(false);
  const [loading,      setLoading]      = useState(false);
  const [errors,       setErrors]       = useState<Record<string, string>>({});
  const [fieldsVisible, setFieldsVisible] = useState(true);

  const set = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleTypeChange = (newType: string) => {
    setFieldsVisible(false);
    setTimeout(() => {
      setForm((prev) => ({ ...prev, type: newType }));
      setErrors({});
      setFieldsVisible(true);
    }, 180);
  };

  const validate = () => {
    const required = REQUIRED[form.type] ?? [];
    const e: Record<string, string> = {};
    for (const field of required) {
      if (field === "email") {
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Email invalide";
      } else {
        const val = (form as Record<string, unknown>)[field];
        if (!val || (typeof val === "string" && !val.trim())) {
          e[field] = ERROR_LABELS[field] ?? `${field} requis`;
        }
      }
    }
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
    setSubmitted(true);
  };

  const resetAll = () => {
    photosSav.forEach((p)    => URL.revokeObjectURL(p.preview));
    photosPieces.forEach((p) => URL.revokeObjectURL(p.preview));
    setPhotosSav([]);
    setPhotosPieces([]);
    setSubmitted(false);
    setForm(INITIAL_FORM);
  };

  if (submitted) {
    return (
      <div className="py-12 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <IconCheck size={28} className="text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-amc-text mb-2">Message envoyé avec succès !</h3>
        <p className="text-amc-text-secondary text-sm max-w-md mx-auto">
          Merci pour votre demande. Notre équipe vous contactera dans les plus brefs délais, généralement sous 24h ouvrées.
        </p>
        <button onClick={resetAll} className="mt-6 btn-secondary rounded-lg text-sm">
          Envoyer une nouvelle demande
        </button>
      </div>
    );
  }

  const isRequired = (field: string) => (REQUIRED[form.type] ?? []).includes(field);
  const inp = (key: string, extra?: string) =>
    `input-base ${errors[key] ? "border-red-400 ring-1 ring-red-400" : ""} ${extra ?? ""}`;
  const sel = (key: string) =>
    `select-base ${errors[key] ? "border-red-400 ring-1 ring-red-400" : ""}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">

      {/* Type de demande */}
      <div>
        <label className="block text-sm font-semibold text-amc-text mb-1.5">
          Type de demande <span className="text-red-500">*</span>
        </label>
        <select
          value={form.type}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="select-base"
        >
          {REQUEST_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      {/* Dynamic fields */}
      <div style={{ transition: "opacity 0.18s ease", opacity: fieldsVisible ? 1 : 0 }}>
        <div className="space-y-5">

          {/* Common: Prénom + Nom */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Prénom" required error={errors.firstName}>
              <input type="text" value={form.firstName} onChange={(e) => set("firstName", e.target.value)}
                placeholder="Jean" className={inp("firstName")} autoComplete="given-name" />
            </Field>
            <Field label="Nom" required error={errors.lastName}>
              <input type="text" value={form.lastName} onChange={(e) => set("lastName", e.target.value)}
                placeholder="Dupont" className={inp("lastName")} autoComplete="family-name" />
            </Field>
          </div>

          {/* Société */}
          {["devis", "sav", "pieces"].includes(form.type) && (
            <Field label="Société" required={isRequired("company")} error={errors.company}>
              <input type="text" value={form.company} onChange={(e) => set("company", e.target.value)}
                placeholder="BTP Savoie SAS" className={inp("company")} autoComplete="organization" />
            </Field>
          )}

          {/* Email + Téléphone */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Email" required error={errors.email}>
              <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
                placeholder="jean.dupont@entreprise.fr" className={inp("email")} autoComplete="email" />
            </Field>
            <Field label="Téléphone" required={isRequired("phone")} error={errors.phone}>
              <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)}
                placeholder="+33 6 00 00 00 00" className={inp("phone")} autoComplete="tel" />
            </Field>
          </div>

          {/* ── DEVIS ── */}
          {form.type === "devis" && (
            <Field label="Matériel concerné">
              <input type="text" value={form.materiel} onChange={(e) => set("materiel", e.target.value)}
                placeholder="Ex: Wacker Neuson DW60, Magni RTH 5.18…" className="input-base" />
            </Field>
          )}

          {/* ── SAV ── */}
          {form.type === "sav" && (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Type de matériel" required error={errors.materielType}>
                  <select value={form.materielType} onChange={(e) => set("materielType", e.target.value)} className={sel("materielType")}>
                    <option value="">— Sélectionner —</option>
                    {MATERIEL_TYPES.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </Field>
                <Field label="Marque" required error={errors.marque}>
                  <select value={form.marque} onChange={(e) => set("marque", e.target.value)} className={sel("marque")}>
                    <option value="">— Sélectionner —</option>
                    {MARQUES.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Modèle / Référence">
                  <input type="text" value={form.modele} onChange={(e) => set("modele", e.target.value)}
                    placeholder="Ex: EW65" className="input-base" />
                </Field>
                <Field label="N° de série">
                  <input type="text" value={form.numSerie} onChange={(e) => set("numSerie", e.target.value)}
                    placeholder="Ex: 1234567" className="input-base" />
                </Field>
              </div>
              <Field label="Date d'achat">
                <input type="date" value={form.dateAchat} onChange={(e) => set("dateAchat", e.target.value)}
                  className="input-base" />
              </Field>
              <Field label="Description de la panne" required error={errors.descriptionPanne}>
                <textarea value={form.descriptionPanne} onChange={(e) => set("descriptionPanne", e.target.value)}
                  placeholder="Décrivez le dysfonctionnement observé, les conditions d'apparition…"
                  rows={4} className={inp("descriptionPanne", "resize-none")} />
              </Field>

              {/* Photo upload — SAV */}
              <PhotoUpload
                label="Photos du matériel ou de la panne"
                files={photosSav}
                onChange={setPhotosSav}
              />

              <Field label="Intervention souhaitée" required>
                <div className="flex gap-6 pt-1">
                  {[{ v: "atelier", l: "À l'atelier" }, { v: "site", l: "Sur site" }].map(({ v, l }) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer text-sm text-amc-text">
                      <input type="radio" name="intervention" value={v} checked={form.intervention === v}
                        onChange={() => set("intervention", v)}
                        className="w-4 h-4 accent-amc-yellow cursor-pointer" />
                      {l}
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="Urgence">
                <div className="flex gap-6 pt-1">
                  {[{ v: "normale", l: "Normale" }, { v: "urgent", l: "Urgent" }].map(({ v, l }) => (
                    <label key={v} className="flex items-center gap-2 cursor-pointer text-sm text-amc-text">
                      <input type="radio" name="urgence" value={v} checked={form.urgence === v}
                        onChange={() => set("urgence", v)}
                        className="w-4 h-4 accent-amc-yellow cursor-pointer" />
                      {l}
                    </label>
                  ))}
                </div>
              </Field>
            </>
          )}

          {/* ── PIÈCES ── */}
          {form.type === "pieces" && (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Type de matériel" required error={errors.materielType}>
                  <select value={form.materielType} onChange={(e) => set("materielType", e.target.value)} className={sel("materielType")}>
                    <option value="">— Sélectionner —</option>
                    {MATERIEL_TYPES.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </Field>
                <Field label="Marque" required error={errors.marque}>
                  <select value={form.marque} onChange={(e) => set("marque", e.target.value)} className={sel("marque")}>
                    <option value="">— Sélectionner —</option>
                    {MARQUES.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Modèle / Référence" required error={errors.modele}>
                <input type="text" value={form.modele} onChange={(e) => set("modele", e.target.value)}
                  placeholder="Ex: EW65" className={inp("modele")} />
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="N° de série">
                  <input type="text" value={form.numSerie} onChange={(e) => set("numSerie", e.target.value)}
                    placeholder="Ex: 1234567" className="input-base" />
                </Field>
                <Field label="Référence pièce">
                  <input type="text" value={form.refPiece} onChange={(e) => set("refPiece", e.target.value)}
                    placeholder="Ex: 0185440" className="input-base" />
                </Field>
              </div>
              <Field label="Quantité">
                <input type="number" min="1" value={form.quantite} onChange={(e) => set("quantite", e.target.value)}
                  placeholder="1" className="input-base w-32" />
              </Field>
              <Field label="Description de la pièce recherchée" required error={errors.descriptionPiece}>
                <textarea value={form.descriptionPiece} onChange={(e) => set("descriptionPiece", e.target.value)}
                  placeholder="Décrivez la pièce, son emplacement, la raison du remplacement…"
                  rows={3} className={inp("descriptionPiece", "resize-none")} />
              </Field>

              {/* Photo upload — Pièces */}
              <PhotoUpload
                label="Photos de la pièce"
                files={photosPieces}
                onChange={setPhotosPieces}
              />
            </>
          )}

          {/* ── OCCASION ── */}
          {form.type === "occasion" && (
            <>
              <Field label="Type de matériel recherché" required error={errors.materielRecherche}>
                <input type="text" value={form.materielRecherche} onChange={(e) => set("materielRecherche", e.target.value)}
                  placeholder="Ex: Mini-pelle < 2T, Nacelle à ciseaux…" className={inp("materielRecherche")} />
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Budget indicatif (€ HT)">
                  <input type="text" value={form.budget} onChange={(e) => set("budget", e.target.value)}
                    placeholder="Ex: 15 000 – 25 000 €" className="input-base" />
                </Field>
                <Field label="Date de disponibilité souhaitée">
                  <input type="date" value={form.dateDisponibilite} onChange={(e) => set("dateDisponibilite", e.target.value)}
                    className="input-base" />
                </Field>
              </div>
              <Field label="Critères spécifiques">
                <textarea value={form.criteresSpecifiques} onChange={(e) => set("criteresSpecifiques", e.target.value)}
                  placeholder="Heures max, options souhaitées, marque préférée…"
                  rows={3} className="input-base resize-none" />
              </Field>
            </>
          )}

          {/* ── INFORMATION / AUTRE ── */}
          {["information", "autre"].includes(form.type) && (
            <Field label="Sujet" required error={errors.sujet}>
              <input type="text" value={form.sujet} onChange={(e) => set("sujet", e.target.value)}
                placeholder="Ex: Disponibilité produit, tarifs location…" className={inp("sujet")} />
            </Field>
          )}

          {/* Message */}
          {["devis", "information", "autre"].includes(form.type) && (
            <Field label="Message" required error={errors.message}>
              <textarea value={form.message} onChange={(e) => set("message", e.target.value)}
                placeholder="Décrivez votre besoin en détail…"
                rows={5} className={inp("message", "resize-none")} />
            </Field>
          )}

        </div>
      </div>

      {/* Consent */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-amc-yellow cursor-pointer" />
          <span className="text-xs text-amc-text-secondary leading-relaxed">
            J&apos;accepte que AMC utilise mes informations pour traiter ma demande conformément à sa{" "}
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
            Envoi en cours…
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
