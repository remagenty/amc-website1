"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { WnMachine } from "@/lib/wn-catalogue";
import { getCategoryUrlSlug } from "@/lib/wn-catalogue";
import {
  IconChevronDown,
  IconShare,
  IconArrowRight,
  IconCheck,
  IconPhone,
  IconShield,
  IconWrench,
  IconCog,
  IconDownload,
} from "@/components/ui/Icons";
import { PhoneLink } from "@/components/ui/PhoneLink";

// ── Spec label map ────────────────────────────────────────────────────────────

const SPEC_LABELS: Record<string, { label: string; unit: string }> = {
  masse_operationnelle_kg: { label: "Masse opérationnelle", unit: "kg" },
  puissance_kw: { label: "Puissance moteur", unit: "kW" },
  profondeur_fouille_max_mm: { label: "Profondeur de fouille max.", unit: "mm" },
  force_arrachement_godet_kn: { label: "Force d'arrachement godet", unit: "kN" },
  largeur_transport_mm: { label: "Largeur hors tout", unit: "mm" },
  hauteur_transport_mm: { label: "Hauteur hors tout", unit: "mm" },
  longueur_transport_mm: { label: "Longueur hors tout", unit: "mm" },
  capacite_godet_m3: { label: "Capacité godet", unit: "m³" },
  charge_utile_kg: { label: "Charge utile", unit: "kg" },
  capacite_benne_m3: { label: "Capacité benne", unit: "m³" },
  vitesse_max_kmh: { label: "Vitesse maximale", unit: "km/h" },
  largeur_mm: { label: "Largeur", unit: "mm" },
  longueur_mm: { label: "Longueur", unit: "mm" },
  hauteur_mm: { label: "Hauteur", unit: "mm" },
  masse_totale_kg: { label: "Masse totale", unit: "kg" },
  charge_max_kg: { label: "Charge maximale", unit: "kg" },
  hauteur_max_m: { label: "Hauteur de levage", unit: "m" },
  largeur_de_travail_mm: { label: "Largeur de travail", unit: "mm" },
  amplitude_mm: { label: "Amplitude", unit: "mm" },
  frequence_hz: { label: "Fréquence de vibration", unit: "Hz" },
  force_centrifuge_kn: { label: "Force centrifuge", unit: "kN" },
  vitesse_avancement_m_min: { label: "Vitesse d'avancement", unit: "m/min" },
  force_impact_kn: { label: "Force d'impact", unit: "kN" },
  frequence_coups_min: { label: "Fréquence de frappe", unit: "coups/min" },
  hauteur_saut_mm: { label: "Hauteur de saut", unit: "mm" },
  semelle_mm: { label: "Dimensions semelle", unit: "" },
  energie_impact_j: { label: "Énergie d'impact", unit: "J" },
  pression_service_bar: { label: "Pression de service", unit: "bar" },
  alimentation: { label: "Alimentation", unit: "" },
  puissance_kva: { label: "Puissance", unit: "kVA" },
  tension_v: { label: "Tension", unit: "V" },
  capacite_reservoir_l: { label: "Capacité réservoir", unit: "L" },
  autonomie_h: { label: "Autonomie", unit: "h" },
};

// ── Accordion ─────────────────────────────────────────────────────────────────

function AccordionSection({
  title,
  icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2.5 font-semibold text-amc-text">
          <span className="text-amc-yellow-dark">{icon}</span>
          {title}
        </span>
        <IconChevronDown
          size={16}
          className={`text-amc-text-secondary transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-6 pt-2 bg-white border-t border-gray-50">
          {children}
        </div>
      )}
    </div>
  );
}

// ── Similar machine card ──────────────────────────────────────────────────────

function SimilarCard({ machine }: { machine: WnMachine }) {
  const [imgError, setImgError] = useState(false);
  const href = `/materiels/${getCategoryUrlSlug(machine)}/${machine.slug}`;
  const rawSrc = machine.medias.image_principale_local ?? machine.medias.image_principale;
  const imgSrc = rawSrc ? encodeURI(rawSrc) : null;

  return (
    <Link
      href={href}
      className="group bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all overflow-hidden"
    >
      <div className="relative aspect-[4/3] bg-gray-100">
        {imgSrc && !imgError ? (
          <Image
            src={imgSrc}
            alt={machine.nom_complet}
            fill
            loading="lazy"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, 25vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <Image
            src="/images/products/placeholder-wn.svg"
            alt=""
            aria-hidden="true"
            fill
            className="object-contain p-4 opacity-40"
            sizes="25vw"
          />
        )}
        <div className="absolute top-2 left-2">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            machine.etat === "neuf" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
          }`}>
            {machine.etat === "neuf" ? "Neuf" : "Occasion"}
          </span>
        </div>
      </div>
      <div className="p-3">
        <p className="font-bold text-amc-text text-xs leading-snug line-clamp-2 group-hover:text-amc-yellow-dark transition-colors">
          {machine.nom_complet}
        </p>
        <p className="text-xs text-amc-text-secondary mt-1">
          {machine.prix_ht
            ? new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(machine.prix_ht)
            : "Sur devis"}
        </p>
      </div>
    </Link>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  machine: WnMachine;
  similar: WnMachine[];
  categorySlug: string;
  categoryLabel: string;
}

export function WnProductDetail({ machine, similar, categorySlug, categoryLabel }: Props) {
  const [activeImage, setActiveImage] = useState(0);

  const hero = machine.medias.image_principale_local ?? machine.medias.image_principale;
  const gallery = machine.medias.images_local ?? machine.medias.images;
  const allImages = [hero, ...gallery].filter(Boolean).map((p) => encodeURI(p as string));
  const displayImages = allImages.length > 0 ? allImages : ["/images/products/placeholder-wn.svg"];

  const specEntries = Object.entries(machine.caracteristiques_techniques).filter(
    ([, v]) => v !== null && v !== undefined
  );

  // Key specs: first 4 for the grid
  const keySpecs = specEntries.slice(0, 4);

  return (
    <div className="min-h-screen bg-amc-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-amc py-3">
          <nav className="text-sm text-amc-text-secondary" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:text-amc-yellow-dark transition-colors">Accueil</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/catalogue" className="hover:text-amc-yellow-dark transition-colors">Nos matériels</Link></li>
              <li aria-hidden>/</li>
              <li>
                <Link href={`/catalogue?categorie=${categorySlug}`} className="hover:text-amc-yellow-dark transition-colors">
                  {categoryLabel}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-amc-text truncate max-w-[200px]">{machine.modele}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-amc py-8">
        {/* ── HERO GRID ── */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">

          {/* Left — gallery (2/5) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image
                  src={displayImages[activeImage]}
                  alt={`${machine.nom_complet} — vue ${activeImage + 1}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/products/placeholder-wn.svg";
                  }}
                />
                {/* Status badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    machine.etat === "neuf"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {machine.etat === "neuf" ? "Neuf" : "Occasion"}
                  </span>
                </div>
                {/* Disponibilité */}
                <div className="absolute bottom-4 right-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    machine.disponibilite === "disponible"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-white/90 text-amc-text-secondary"
                  }`}>
                    {machine.disponibilite === "disponible" ? "✓ En stock" : "Sur commande"}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              {displayImages.length > 1 && (
                <div className="flex gap-2 p-3 border-t border-gray-50">
                  {displayImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 ${
                        activeImage === i ? "ring-2 ring-amc-yellow" : "opacity-60 hover:opacity-100"
                      } transition-all`}
                      aria-label={`Image ${i + 1}`}
                    >
                      <Image
                        src={img}
                        alt=""
                        aria-hidden="true"
                        fill
                        className="object-cover"
                        sizes="64px"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/products/placeholder-wn.svg";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Brand badge */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-sm font-bold px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200">
                {machine.marque}
              </span>
              <Link
                href={`/partenaires/${machine.marque.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm text-amc-text-secondary hover:text-amc-yellow-dark transition-colors"
              >
                Voir toute la gamme →
              </Link>
            </div>
          </div>

          {/* Right — info (3/5) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-card p-6 lg:p-8">
              {/* Reference + sous-catégorie */}
              <p className="text-xs text-amc-text-secondary uppercase tracking-wider mb-2">
                Réf. {machine.reference} — {machine.sous_categorie}
              </p>

              <h1 className="text-2xl md:text-3xl font-black text-amc-text">
                {machine.nom_complet}
              </h1>

              <p className="mt-4 text-base text-amc-text-secondary leading-relaxed">
                {machine.description_courte}
              </p>

              {/* Points forts */}
              {machine.points_forts.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                  {machine.points_forts.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-amc-text">
                      <IconCheck size={14} className="text-green-500 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6 pt-6 border-t border-gray-100">
                {/* Prix */}
                <div className="mb-6">
                  {machine.prix_ht ? (
                    <div>
                      <p className="text-3xl font-black text-amc-text">
                        {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(machine.prix_ht!)}
                      </p>
                      <p className="text-sm text-amc-text-secondary mt-1">Prix HT</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-2xl font-black text-amc-text">Sur devis</p>
                      <p className="text-sm text-amc-text-secondary mt-1">
                        Contactez-nous pour obtenir un prix personnalisé
                      </p>
                    </div>
                  )}
                </div>

                {/* CTAs */}
                <div className="space-y-3">
                  <Link
                    href={`/devis?type=devis&produit=${machine.slug}`}
                    className="btn-primary w-full justify-center text-base py-4 rounded-xl"
                  >
                    Demander un devis
                    <IconArrowRight size={16} />
                  </Link>
                  <Link
                    href="/contact"
                    className="btn-secondary w-full justify-center text-base py-3.5 rounded-xl"
                  >
                    <IconPhone size={16} />
                    Contacter un conseiller
                  </Link>
                </div>

                {/* Actions secondaires */}
                <div className="mt-4 flex gap-3">
                  {machine.url_wacker_neuson && (
                    <a
                      href={machine.url_wacker_neuson}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-lg text-sm text-amc-text hover:border-amc-yellow hover:bg-amc-yellow/5 transition-all"
                    >
                      <IconDownload size={14} />
                      Fiche constructeur
                    </a>
                  )}
                  <button
                    onClick={() =>
                      navigator.share?.({ title: machine.nom_complet, url: window.location.href })
                    }
                    className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-lg text-sm text-amc-text hover:border-amc-yellow hover:bg-amc-yellow/5 transition-all"
                    aria-label="Partager"
                  >
                    <IconShare size={14} />
                    Partager
                  </button>
                </div>
              </div>
            </div>

            {/* Key specs grid */}
            {keySpecs.length > 0 && (
              <div className="mt-4 bg-white rounded-xl shadow-card p-5">
                <h2 className="text-sm font-bold text-amc-text mb-4 uppercase tracking-wide">
                  Spécifications clés
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {keySpecs.map(([key, value]) => {
                    const def = SPEC_LABELS[key];
                    return (
                      <div key={key} className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-amc-text-secondary">
                          {def?.label ?? key.replace(/_/g, " ")}
                        </p>
                        <p className="font-bold text-amc-text mt-0.5">
                          {String(value)}
                          {def?.unit && (
                            <span className="text-xs font-normal ml-1 text-amc-text-secondary">
                              {def.unit}
                            </span>
                          )}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── ACCORDÉONS ── */}
        <div className="mt-8 space-y-3">

          {/* Caractéristiques techniques */}
          {specEntries.length > 0 && (
            <AccordionSection
              title="Caractéristiques techniques"
              icon={<IconCog size={16} />}
              defaultOpen
            >
              <table className="w-full text-sm">
                <tbody>
                  {specEntries.map(([key, value], i) => {
                    const def = SPEC_LABELS[key];
                    return (
                      <tr key={key} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="px-4 py-3 font-medium text-amc-text-secondary rounded-l-lg w-1/2">
                          {def?.label ?? key.replace(/_/g, " ")}
                        </td>
                        <td className="px-4 py-3 font-bold text-amc-text rounded-r-lg">
                          {String(value)}
                          {def?.unit && (
                            <span className="text-sm font-normal text-amc-text-secondary ml-1">
                              {def.unit}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </AccordionSection>
          )}

          {/* Description & Utilisations */}
          <AccordionSection
            title="Description & Utilisations"
            icon={<IconCheck size={16} />}
            defaultOpen={false}
          >
            <p className="text-amc-text-secondary leading-relaxed mb-5">
              {machine.description_longue}
            </p>
            {machine.applications.length > 0 && (
              <div className="mb-5">
                <h4 className="font-semibold text-amc-text mb-3 text-sm">Applications recommandées</h4>
                <div className="flex flex-wrap gap-2">
                  {machine.applications.map((app) => (
                    <span
                      key={app}
                      className="text-sm px-3 py-1.5 bg-amc-yellow/10 text-amc-text rounded-full font-medium"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {machine.secteurs.length > 0 && (
              <div>
                <h4 className="font-semibold text-amc-text mb-3 text-sm">Secteurs d'activité</h4>
                <div className="flex flex-wrap gap-2">
                  {machine.secteurs.map((sector) => (
                    <span
                      key={sector}
                      className="text-sm px-3 py-1.5 bg-gray-100 text-amc-text-secondary rounded-full"
                    >
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </AccordionSection>

          {/* Services associés */}
          <AccordionSection
            title="Services associés"
            icon={<IconWrench size={16} />}
            defaultOpen={false}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {machine.services.garantie_constructeur && (
                <div className="flex gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <IconShield size={20} className="text-amc-yellow" />
                  </div>
                  <div>
                    <p className="font-semibold text-amc-text text-sm">Garantie constructeur</p>
                    <p className="text-xs text-amc-text-secondary mt-0.5">
                      {machine.etat === "neuf"
                        ? "Garantie constructeur complète incluse"
                        : "Garantie 6 mois pièces et main d'œuvre"}
                    </p>
                  </div>
                </div>
              )}
              {machine.services.sav_certifie_se_plus && (
                <div className="flex gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <IconWrench size={20} className="text-amc-yellow" />
                  </div>
                  <div>
                    <p className="font-semibold text-amc-text text-sm">
                      Service après-vente
                    </p>
                    <p className="text-xs text-amc-text-secondary mt-0.5">
                      SAV certifié — pièces d'origine constructeur
                    </p>
                  </div>
                </div>
              )}
              {machine.services.pieces_detachees_origine && (
                <div className="flex gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <IconCog size={20} className="text-amc-yellow" />
                  </div>
                  <div>
                    <p className="font-semibold text-amc-text text-sm">Pièces détachées</p>
                    <p className="text-xs text-amc-text-secondary mt-0.5">
                      Stock de pièces d'origine constructeur disponibles
                    </p>
                  </div>
                </div>
              )}
              {machine.services.financement_disponible && (
                <div className="flex gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <IconCheck size={20} className="text-amc-yellow" />
                  </div>
                  <div>
                    <p className="font-semibold text-amc-text text-sm">Financement</p>
                    <p className="text-xs text-amc-text-secondary mt-0.5">
                      Solutions de financement disponibles sur demande
                    </p>
                  </div>
                </div>
              )}
            </div>
          </AccordionSection>
        </div>

        {/* ── MACHINES SIMILAIRES ── */}
        {similar.length > 0 && (
          <div className="mt-16">
            <div className="flex items-end justify-between mb-8">
              <h2 className="section-title text-2xl">Machines similaires</h2>
              <Link
                href={`/catalogue?categorie=${categorySlug}`}
                className="text-sm font-semibold text-amc-text hover:text-amc-yellow-dark transition-colors flex items-center gap-1"
              >
                Voir toute la gamme <IconArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {similar.map((m) => (
                <SimilarCard key={m.id} machine={m} />
              ))}
            </div>
          </div>
        )}

        {/* ── CTA BANNER ── */}
        <div className="mt-12 bg-amc-gray rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Besoin d'un conseil sur ce matériel ?</h2>
          <p className="text-white/70 mb-6">
            Nos experts AMC sont disponibles pour vous accompagner dans votre choix.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href={`/devis?type=devis&produit=${machine.slug}`}
              className="btn-primary rounded-lg"
            >
              Demander un devis <IconArrowRight size={16} />
            </Link>
            <PhoneLink className="btn-outline rounded-lg">
              <IconPhone size={16} />
              Appeler maintenant
            </PhoneLink>
          </div>
        </div>
      </div>
    </div>
  );
}
