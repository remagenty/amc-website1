"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/data";
import { SEBadge } from "./SEBadge";
import { IconArrowRight, IconZap } from "./Icons";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const BRAND_LABELS: Record<string, string> = {
  "wacker-neuson": "Wacker Neuson",
  magni: "Magni",
  "promove-demolition": "Promove",
};

const BRAND_COLORS: Record<string, string> = {
  "wacker-neuson": "bg-red-50 text-red-700 border border-red-200",
  magni: "bg-blue-50 text-blue-700 border border-blue-200",
  "promove-demolition": "bg-orange-50 text-orange-700 border border-orange-200",
};

const BRAND_PLACEHOLDERS: Record<string, string> = {
  "wacker-neuson": "/images/products/placeholder-wn.svg",
  "magni": "/images/products/placeholder-magni.svg",
  "promove-demolition": "/images/products/placeholder-promove.svg",
};

export function ProductCard({ product, className = "" }: ProductCardProps) {
  const router = useRouter();

  return (
    <article
      className={`card overflow-hidden group cursor-pointer ${className}`}
      onClick={() => router.push(
        product.categorySlug
          ? `/materiels/${product.categorySlug}/${product.slug}`
          : `/produit/${product.slug}`
      )}
    >
      <div className="relative overflow-hidden aspect-[4/3] bg-white">
        <Image
          src={product.images[0] || BRAND_PLACEHOLDERS[product.brand] || "/images/products/placeholder-machine.svg"}
          alt={`${product.name} — ${product.shortDescription}`}
          fill
          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.status === "neuf" ? (
            <span className="badge-new">Neuf</span>
          ) : (
            <span className="badge-occasion">Occasion</span>
          )}
          {product.hasSECertification && <SEBadge size="sm" />}
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${BRAND_COLORS[product.brand]}`}>
            {BRAND_LABELS[product.brand]}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-amc-text text-base leading-snug group-hover:text-amc-gray transition-colors">
          {product.name}
        </h3>
        <p className="text-amc-text-secondary text-sm mt-1 line-clamp-2 leading-relaxed">
          {product.shortDescription}
        </p>

        {product.specs.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {product.specs.slice(0, 3).map((spec) => (
              <span
                key={spec.label}
                className="inline-flex items-center gap-1 text-xs text-amc-text-secondary bg-gray-50 rounded px-2 py-1"
              >
                <span className="font-medium">{spec.value}</span>
                {spec.unit && <span>{spec.unit}</span>}
              </span>
            ))}
          </div>
        )}

        {product.status === "occasion" && (product.year || product.hours) && (
          <div className="mt-2 flex gap-3 text-xs text-amc-text-secondary">
            {product.year && <span>Année: <strong>{product.year}</strong></span>}
            {product.hours && <span>Heures: <strong>{product.hours.toLocaleString("fr-FR")} h</strong></span>}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div>
            {product.priceOnRequest ? (
              <span className="text-sm font-semibold text-amc-text-secondary">Sur devis</span>
            ) : product.price ? (
              <span className="text-lg font-bold text-amc-text">{formatPrice(product.price)}</span>
            ) : null}
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amc-yellow-dark group-hover:gap-2 transition-all">
            Voir la fiche <IconArrowRight size={12} />
          </span>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
          <Link
            href={`/devis?type=devis&produit=${product.slug}&modele=${encodeURIComponent(product.name)}`}
            className="w-full btn-primary text-sm py-2.5 rounded-md"
          >
            <IconZap size={14} />
            Demander un devis
          </Link>
        </div>
      </div>
    </article>
  );
}
