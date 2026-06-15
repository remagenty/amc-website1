import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getWnMachinesByCategory,
  getWnCategories,
  CATEGORY_LABELS,
  SLUG_TO_CATEGORY,
} from "@/lib/wn-catalogue";
import {
  getMagniMachinesByCategory,
  getMagniCategories,
  MAGNI_CATEGORY_LABELS,
  MAGNI_SLUG_TO_CATEGORY,
} from "@/lib/magni-catalogue";
import {
  getPromoveMachinesByCategory,
  getPromoveCategories,
  PROMOVE_CATEGORY_LABELS,
  PROMOVE_SLUG_TO_CATEGORY,
} from "@/lib/promove-catalogue";
import { WnCategoryPage } from "@/components/products/WnCategoryPage";

interface Props {
  params: Promise<{ categorie: string }>;
}

export async function generateStaticParams() {
  const wnCategories = getWnCategories().map((c) => ({ categorie: c.slug }));
  const magniCategories = getMagniCategories().map((c) => ({ categorie: c.slug }));
  const promoveCategories = getPromoveCategories().map((c) => ({ categorie: c.slug }));
  return [...wnCategories, ...magniCategories, ...promoveCategories];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorie } = await params;
  const isMagni = !!MAGNI_SLUG_TO_CATEGORY[categorie];
  const isPromove = !!PROMOVE_SLUG_TO_CATEGORY[categorie];
  const label = isMagni
    ? (MAGNI_CATEGORY_LABELS[categorie] ?? categorie)
    : isPromove
    ? (PROMOVE_CATEGORY_LABELS[categorie] ?? categorie)
    : (CATEGORY_LABELS[categorie] ?? categorie);
  const brand = isMagni ? "Magni" : isPromove ? "Promove Demolition" : "Wacker Neuson";
  return {
    title: `${label} ${brand}`,
    description: `Découvrez notre gamme de ${label.toLowerCase()} ${brand}. Distributeur officiel AMC en Rhône-Alpes — matériels neufs, SAV certifié SE+.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { categorie } = await params;

  const isMagni = !!MAGNI_SLUG_TO_CATEGORY[categorie];
  const isPromove = !!PROMOVE_SLUG_TO_CATEGORY[categorie];
  const isWn = !!SLUG_TO_CATEGORY[categorie];

  if (!isMagni && !isPromove && !isWn) notFound();

  const machines = isMagni
    ? getMagniMachinesByCategory(categorie)
    : isPromove
    ? getPromoveMachinesByCategory(categorie)
    : getWnMachinesByCategory(categorie);

  return <WnCategoryPage machines={machines} categorySlug={categorie} />;
}
