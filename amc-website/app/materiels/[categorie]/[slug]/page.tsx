import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CATEGORY_LABELS,
  SLUG_TO_CATEGORY,
} from "@/lib/wn-catalogue";
import {
  MAGNI_CATEGORY_LABELS,
  MAGNI_SLUG_TO_CATEGORY,
} from "@/lib/magni-catalogue";
import {
  PROMOVE_CATEGORY_LABELS,
  PROMOVE_SLUG_TO_CATEGORY,
} from "@/lib/promove-catalogue";
import {
  getWnMachineBySlugAsync,
  getMagniMachineBySlugAsync,
  getPromoveMachineBySlugAsync,
  getWnSimilarMachinesAsync,
  getMagniSimilarMachinesAsync,
  getPromoveSimilarMachinesAsync,
} from "@/lib/data";
import { WnProductDetail } from "@/components/products/WnProductDetail";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ categorie: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, categorie } = await params;
  const isMagni = !!MAGNI_SLUG_TO_CATEGORY[categorie];
  const isPromove = !!PROMOVE_SLUG_TO_CATEGORY[categorie];
  const machine = isMagni
    ? await getMagniMachineBySlugAsync(slug)
    : isPromove
    ? await getPromoveMachineBySlugAsync(slug)
    : await getWnMachineBySlugAsync(slug);
  if (!machine) return {};

  return {
    title: `${machine.nom_complet}`,
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

  const isMagni = !!MAGNI_SLUG_TO_CATEGORY[categorie];
  const isPromove = !!PROMOVE_SLUG_TO_CATEGORY[categorie];
  const isWn = !!SLUG_TO_CATEGORY[categorie];
  if (!isMagni && !isPromove && !isWn) notFound();

  const machine = isMagni
    ? await getMagniMachineBySlugAsync(slug)
    : isPromove
    ? await getPromoveMachineBySlugAsync(slug)
    : await getWnMachineBySlugAsync(slug);
  if (!machine) notFound();

  const similar = isMagni
    ? await getMagniSimilarMachinesAsync(machine, 4)
    : isPromove
    ? await getPromoveSimilarMachinesAsync(machine, 4)
    : await getWnSimilarMachinesAsync(machine, 4);

  const categoryLabel = isMagni
    ? (MAGNI_CATEGORY_LABELS[categorie] ?? categorie)
    : isPromove
    ? (PROMOVE_CATEGORY_LABELS[categorie] ?? categorie)
    : (CATEGORY_LABELS[categorie] ?? categorie);

  return (
    <WnProductDetail
      machine={machine}
      similar={similar}
      categorySlug={categorie}
      categoryLabel={categoryLabel}
    />
  );
}
