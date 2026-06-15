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
import {
  getMagniMachineBySlug,
  getMagniSimilarMachines,
  getAllMagniMachines,
  getMagniCategoryUrlSlug,
  MAGNI_CATEGORY_LABELS,
  MAGNI_SLUG_TO_CATEGORY,
} from "@/lib/magni-catalogue";
import {
  getPromoveMachineBySlug,
  getPromoveSimilarMachines,
  getAllPromoveMachines,
  getPromoveCategoryUrlSlug,
  PROMOVE_CATEGORY_LABELS,
  PROMOVE_SLUG_TO_CATEGORY,
} from "@/lib/promove-catalogue";
import { WnProductDetail } from "@/components/products/WnProductDetail";

interface Props {
  params: Promise<{ categorie: string; slug: string }>;
}

export async function generateStaticParams() {
  const wnParams = getAllWnMachines().map((m) => ({
    categorie: getCategoryUrlSlug(m),
    slug: m.slug,
  }));
  const magniParams = getAllMagniMachines().map((m) => ({
    categorie: getMagniCategoryUrlSlug(m),
    slug: m.slug,
  }));
  const promoveParams = getAllPromoveMachines().map((m) => ({
    categorie: getPromoveCategoryUrlSlug(m),
    slug: m.slug,
  }));
  return [...wnParams, ...magniParams, ...promoveParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const machine =
    getWnMachineBySlug(slug) ??
    getMagniMachineBySlug(slug) ??
    getPromoveMachineBySlug(slug);
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
    ? getMagniMachineBySlug(slug)
    : isPromove
    ? getPromoveMachineBySlug(slug)
    : getWnMachineBySlug(slug);
  if (!machine) notFound();

  const similar = isMagni
    ? getMagniSimilarMachines(machine, 4)
    : isPromove
    ? getPromoveSimilarMachines(machine, 4)
    : getWnSimilarMachines(machine, 4);

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
