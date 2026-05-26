import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getWnMachineBySlug,
  getWnSimilarMachines,
  getAllWnMachines,
  getCategoryUrlSlug,
  CATEGORY_LABELS,
  SLUG_TO_CATEGORY,
} from "@/lib/wn-catalogue";
import { WnProductDetail } from "@/components/products/WnProductDetail";

interface Props {
  params: Promise<{ categorie: string; slug: string }>;
}

export async function generateStaticParams() {
  const machines = getAllWnMachines();
  return machines.map((m) => ({
    categorie: getCategoryUrlSlug(m),
    slug: m.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const machine = getWnMachineBySlug(slug);
  if (!machine) return {};

  return {
    title: `${machine.nom_complet} — AMC Alpes Matériel Compact`,
    description: machine.description_courte,
    openGraph: {
      title: machine.nom_complet,
      description: machine.description_courte,
      images: machine.medias.image_principale
        ? [{ url: machine.medias.image_principale }]
        : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug, categorie } = await params;

  if (!SLUG_TO_CATEGORY[categorie]) notFound();

  const machine = getWnMachineBySlug(slug);
  if (!machine) notFound();

  const safeMachine = machine!;
  const similar = getWnSimilarMachines(safeMachine, 4);
  const categoryLabel = CATEGORY_LABELS[categorie] ?? categorie;

  return (
    <WnProductDetail
      machine={safeMachine}
      similar={similar}
      categorySlug={categorie}
      categoryLabel={categoryLabel}
    />
  );
}
