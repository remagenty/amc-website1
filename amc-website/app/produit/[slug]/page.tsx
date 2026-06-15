import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getSimilarProducts, PRODUCTS, formatPrice } from "@/lib/data";
import { ProductDetail } from "./ProductDetail";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};

  const BRAND_NAMES: Record<string, string> = {
    "wacker-neuson": "Wacker Neuson",
    magni: "Magni",
    "promove-demolition": "Promove Demolition",
  };

  return {
    title: `${product.name} — ${product.shortDescription}`,
    description: `${product.name} ${product.status === "neuf" ? "neuf" : "d'occasion certifié"} chez AMC. ${product.description.slice(0, 120)}...`,
    openGraph: {
      title: `${product.name}`,
      description: product.shortDescription,
      type: "website",
    },
    other: {
      "product:brand": BRAND_NAMES[product.brand],
      "product:condition": product.status === "neuf" ? "new" : "refurbished",
      ...(product.price
        ? { "product:price:amount": String(product.price), "product:price:currency": "EUR" }
        : {}),
    },
  };
}

export default function Page({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const similar = getSimilarProducts(product, 4);

  return <ProductDetail product={product} similar={similar} />;
}
