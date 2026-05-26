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
import { WnCategoryPage } from "@/components/products/WnCategoryPage";

interface Props {
  params: Promise<{ categorie: string }>;
}

export async function generateStaticParams() {
  const wnCategories = getWnCategories().map((c) => ({ categorie: c.slug }));
  const magniCategories = getMagniCategories().map((c) => ({ categorie: c.slug }));
  return [...wnCategories, ...magniCategories];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorie } = await params;
  const isMagni = !!MAGNI_SLUG_TO_CATEGORY[categorie];
  const label = isMagni
    ? (MAGNI_CATEGORY_LABELS[categorie] ?? categorie)
    : (CATEGORY_LABELS[categorie] ?? categorie);
  const brand = isMagni ? "Magni" : "Wacker Neuson";
  return {
    title: `${label} ${brand} — AMC Alpes Matériel Compact`,
    description: `Découvrez notre gamme de ${label.toLowerCase()} ${brand}. Distributeur officiel AMC en Rhône-Alpes — matériels neufs, SAV certifié SE+.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { categorie } = await params;

  const isMagni = !!MAGNI_SLUG_TO_CATEGORY[categorie];
  const isWn = !!SLUG_TO_CATEGORY[categorie];

  if (!isMagni && !isWn) notFound();

  const machines = isMagni
    ? getMagniMachinesByCategory(categorie)
    : getWnMachinesByCategory(categorie);

  return <WnCategoryPage machines={machines} categorySlug={categorie} />;
}
