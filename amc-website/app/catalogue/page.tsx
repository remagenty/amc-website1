import type { Metadata } from "next";
import { CataloguePage } from "./CataloguePage";

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

export default function Page({
  searchParams,
}: {
  searchParams: { categorie?: string; marque?: string; etat?: string };
}) {
  return (
    <CataloguePage
      initialCategorie={searchParams.categorie ?? ""}
      initialMarque={searchParams.marque ?? ""}
      initialEtat={searchParams.etat ?? ""}
    />
  );
}
