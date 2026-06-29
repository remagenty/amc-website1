"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";
import {
  IconChevronDown,
  IconDownload,
  IconShare,
  IconArrowRight,
  IconCheck,
  IconPhone,
  IconShield,
  IconWrench,
  IconCog,
} from "@/components/ui/Icons";
import { PhoneLink } from "@/components/ui/PhoneLink";

const BRAND_NAMES: Record<string, string> = {
  "wacker-neuson": "WACKER NEUSON",
  magni: "Magni",
  "promove-demolition": "Promove Demolition",
};

const BRAND_COLORS: Record<string, string> = {
  "wacker-neuson": "bg-red-50 text-red-700 border border-red-200",
  magni: "bg-blue-50 text-blue-700 border border-blue-200",
  "promove-demolition": "bg-orange-50 text-orange-700 border border-orange-200",
};

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const SECTIONS: Section[] = [
  { id: "specs", title: "Caractéristiques techniques", icon: <IconCog size={16} /> },
  { id: "description", title: "Description & Utilisations", icon: <IconCheck size={16} /> },
  { id: "services", title: "Services associés", icon: <IconWrench size={16} /> },
];

function AccordionSection({
  section,
  children,
}: {
  section: Section;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(section.id === "specs");

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2.5 font-semibold text-amc-text">
          <span className="text-amc-yellow-dark">{section.icon}</span>
          {section.title}
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

export function ProductDetail({
  product,
  similar,
}: {
  product: Product;
  similar: Product[];
}) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="min-h-screen bg-amc-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-amc py-3">
          <nav className="text-sm text-amc-text-secondary" aria-label="Fil d'Ariane">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link href="/" className="hover:text-amc-yellow-dark transition-colors">Accueil</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/catalogue" className="hover:text-amc-yellow-dark transition-colors">Catalogue</Link></li>
              <li aria-hidden>/</li>
              <li className="font-medium text-amc-text truncate max-w-xs">{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-amc py-8">
        {/* Main product grid */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Left: gallery (2/5) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="relative aspect-[4/3] bg-white">
                <Image
                  src={product.images[activeImage] || "/images/products/placeholder-machine.svg"}
                  alt={`${product.name} — vue ${activeImage + 1}`}
                  fill
                  className="object-contain p-3"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {product.status === "neuf" ? (
                    <span className="badge-new">Neuf</span>
                  ) : (
                    <span className="badge-occasion">Occasion certifiée</span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 p-3 border-t border-gray-50">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 ${
                        activeImage === i
                          ? "ring-2 ring-amc-yellow"
                          : "opacity-60 hover:opacity-100"
                      } transition-all`}
                      aria-label={`Image ${i + 1}`}
                    >
                      <Image src={img} alt="" fill className="object-contain p-1" sizes="64px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Brand badge */}
            <div className="mt-4 flex items-center gap-3">
              <span
                className={`text-sm font-bold px-3 py-1.5 rounded-lg ${BRAND_COLORS[product.brand]}`}
              >
                {BRAND_NAMES[product.brand]}
              </span>
              <Link
                href={`/partenaires/${product.brand}`}
                className="text-sm text-amc-text-secondary hover:text-amc-yellow-dark transition-colors"
              >
                Voir toute la gamme →
              </Link>
            </div>
          </div>

          {/* Right: info (3/5) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-card p-6 lg:p-8">
              {/* Reference */}
              <p className="text-xs text-amc-text-secondary uppercase tracking-wider mb-2">
                Réf. {product.model} — {product.category}
              </p>

              <h1 className="text-2xl md:text-3xl font-black text-amc-text">
                {product.name}
              </h1>

              <p className="mt-4 text-base text-amc-text-secondary leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Highlights */}
              {product.highlights.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                  {product.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-amc-text">
                      <IconCheck size={14} className="text-green-500 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6 pt-6 border-t border-gray-100">
                {/* Price */}
                <div className="mb-6">
                  {product.priceOnRequest ? (
                    <div>
                      <p className="text-2xl font-black text-amc-text">Sur devis</p>
                      <p className="text-sm text-amc-text-secondary mt-1">
                        Contactez-nous pour obtenir un prix personnalisé
                      </p>
                    </div>
                  ) : product.price ? (
                    <div>
                      <p className="text-3xl font-black text-amc-text">
                        {formatPrice(product.price)}
                      </p>
                      <p className="text-sm text-amc-text-secondary mt-1">Prix HT</p>
                    </div>
                  ) : null}
                </div>

                {/* CTAs */}
                <div className="space-y-3">
                  <Link
                    href={`/devis?type=devis&produit=${product.slug}`}
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

                {/* Actions */}
                <div className="mt-4 flex gap-3">
                  {product.pdfUrl && (
                    <a
                      href={product.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-lg text-sm text-amc-text hover:border-amc-yellow hover:bg-amc-yellow/5 transition-all"
                    >
                      <IconDownload size={14} />
                      Fiche technique PDF
                    </a>
                  )}
                  <button
                    onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-lg text-sm text-amc-text hover:border-amc-yellow hover:bg-amc-yellow/5 transition-all"
                    aria-label="Partager"
                  >
                    <IconShare size={14} />
                    Partager
                  </button>
                </div>
              </div>
            </div>

            {/* Quick specs */}
            {product.specs.length > 0 && (
              <div className="mt-4 bg-white rounded-xl shadow-card p-5">
                <h2 className="text-sm font-bold text-amc-text mb-4 uppercase tracking-wide">
                  Spécifications clés
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {product.specs.slice(0, 6).map((spec) => (
                    <div key={spec.label} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-amc-text-secondary">{spec.label}</p>
                      <p className="font-bold text-amc-text mt-0.5">
                        {spec.value}
                        {spec.unit && (
                          <span className="text-xs font-normal ml-1 text-amc-text-secondary">
                            {spec.unit}
                          </span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detailed sections */}
        <div className="mt-8 space-y-3">
          {/* Technical specs */}
          <AccordionSection section={SECTIONS[0]}>
            <table className="w-full text-sm">
              <tbody>
                {product.specs.map((spec, i) => (
                  <tr
                    key={spec.label}
                    className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-3 font-medium text-amc-text-secondary rounded-l-lg w-1/2">
                      {spec.label}
                    </td>
                    <td className="px-4 py-3 font-bold text-amc-text rounded-r-lg">
                      {spec.value}
                      {spec.unit && (
                        <span className="text-sm font-normal text-amc-text-secondary ml-1">
                          {spec.unit}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {product.status === "occasion" && (
                  <>
                    {product.year && (
                      <tr className="bg-gray-50">
                        <td className="px-4 py-3 font-medium text-amc-text-secondary rounded-l-lg">Année</td>
                        <td className="px-4 py-3 font-bold text-amc-text rounded-r-lg">{product.year}</td>
                      </tr>
                    )}
                    {product.hours && (
                      <tr>
                        <td className="px-4 py-3 font-medium text-amc-text-secondary rounded-l-lg">Heures d'utilisation</td>
                        <td className="px-4 py-3 font-bold text-amc-text rounded-r-lg">{product.hours.toLocaleString("fr-FR")} h</td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </AccordionSection>

          {/* Description */}
          <AccordionSection section={SECTIONS[1]}>
            <p className="text-amc-text-secondary leading-relaxed mb-5">
              {product.description}
            </p>
            {product.applications.length > 0 && (
              <div className="mb-5">
                <h4 className="font-semibold text-amc-text mb-3 text-sm">Applications recommandées</h4>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app) => (
                    <span key={app} className="text-sm px-3 py-1.5 bg-amc-yellow/10 text-amc-text rounded-full font-medium">
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {product.sectors.length > 0 && (
              <div>
                <h4 className="font-semibold text-amc-text mb-3 text-sm">Secteurs d'activité</h4>
                <div className="flex flex-wrap gap-2">
                  {product.sectors.map((sector) => (
                    <span key={sector} className="text-sm px-3 py-1.5 bg-gray-100 text-amc-text-secondary rounded-full">
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </AccordionSection>

          {/* Services */}
          <AccordionSection section={SECTIONS[2]}>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: <IconShield size={20} className="text-amc-yellow" />,
                  title: "Garantie constructeur",
                  desc: product.status === "neuf"
                    ? "Garantie constructeur complète incluse"
                    : "Garantie 6 mois pièces et main d'œuvre",
                },
                {
                  icon: <IconWrench size={20} className="text-amc-yellow" />,
                  title: "Service après-vente",
                  desc: "SAV certifié — pièces d'origine",
                  badge: null,
                },
                {
                  icon: <IconCog size={20} className="text-amc-yellow" />,
                  title: "Pièces détachées",
                  desc: "Stock de pièces d'origine constructeur disponibles",
                },
                {
                  icon: <IconCheck size={20} className="text-amc-yellow" />,
                  title: "Financement",
                  desc: "Solutions de financement disponibles sur demande",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">{item.icon}</div>
                  <div>
                    <p className="font-semibold text-amc-text text-sm flex items-center">
                      {item.title}
                      {item.badge}
                    </p>
                    <p className="text-xs text-amc-text-secondary mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionSection>
        </div>

        {/* Similar products */}
        {similar.length > 0 && (
          <div className="mt-16">
            <div className="flex items-end justify-between mb-8">
              <h2 className="section-title text-2xl">Produits similaires</h2>
              <Link href="/catalogue" className="text-sm font-semibold text-amc-text hover:text-amc-yellow-dark transition-colors flex items-center gap-1">
                Voir tout <IconArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {similar.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* CTA banner */}
        <div className="mt-12 bg-amc-gray rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Besoin d'un conseil sur ce matériel ?</h2>
          <p className="text-white/70 mb-6">
            Nos experts AMC sont disponibles pour vous accompagner dans votre choix.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href={`/devis?type=devis&produit=${product.slug}`} className="btn-primary rounded-lg">
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
