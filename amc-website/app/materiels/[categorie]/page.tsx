import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getWnMachinesByCategory,
  getWnCategories,
  CATEGORY_LABELS,
  SLUG_TO_CATEGORY,
} from "@/lib/wn-catalogue";
import { WnCategoryPage } from "@/components/products/WnCategoryPage";

interface Props {
  params: Promise<{ categorie: string }>;
}

export async function generateStaticParams() {
  const categories = getWnCategories();
  return categories.map((c) => ({ categorie: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorie } = await params;
  const label = CATEGORY_LABELS[categorie] ?? categorie;
  return {
    title: `${label} Wacker Neuson — AMC Alpes Matériel Compact`,
    description: `Découvrez notre gamme de ${label.toLowerCase()} Wacker Neuson. Distributeur officiel AMC en Rhône-Alpes — matériels neufs, SAV certifié SE+.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { categorie } = await params;

  if (!SLUG_TO_CATEGORY[categorie]) {
    notFound();
  }

  const machines = getWnMachinesByCategory(categorie);

  return <WnCategoryPage machines={machines} categorySlug={categorie} />;
}
