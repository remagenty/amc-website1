import type { Metadata } from "next";
import { CataloguePage } from "./CataloguePage";
import { getMachinesAsync } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Catalogue matériels de chantier | AMC" },
  description: "Compacteurs, dumpers, pelles compactes, télescopiques neufs et occasion. Distributeur officiel WACKER NEUSON, Magni, Promove en Rhône-Alpes.",
  openGraph: {
    title: "Catalogue matériels de chantier | AMC",
    description: "Compacteurs, dumpers, pelles compactes, télescopiques neufs et occasion. Distributeur officiel WACKER NEUSON, Magni, Promove en Rhône-Alpes.",
    images: [{ url: "/images/photo-wacker-catalogue.jpg" }],
    type: "website",
    url: `https://www.amc-savoie.fr/catalogue`,
    siteName: "AMC — Alpes Matériel Compact",
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: { categorie?: string; marque?: string; etat?: string };
}) {
  const ssrMachines = await getMachinesAsync();
  const categorie = searchParams.categorie ?? "";
  const marque = searchParams.marque ?? "";
  const etat = searchParams.etat ?? "";

  return (
    // key forces remount when URL params change so useState re-initialises correctly
    <CataloguePage
      key={`${categorie}|${marque}|${etat}`}
      initialCategorie={categorie}
      initialMarque={marque}
      initialEtat={etat}
      ssrMachines={ssrMachines}
    />
  );
}
