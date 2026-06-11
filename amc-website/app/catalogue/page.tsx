import type { Metadata } from "next";
import { CataloguePage } from "./CataloguePage";

export const metadata: Metadata = {
  title: "Catalogue matériels de chantier | AMC — Alpes Matériel Compact",
  description:
    "Découvrez le catalogue complet AMC : compacteurs, dumpers, pelles, télescopiques et outils de démolition. Matériels neufs et occasion certifiés Wacker Neuson, Magni, Promove Demolition.",
  openGraph: {
    title: "Catalogue matériels de chantier | AMC",
    description:
      "Matériels de chantier neufs et occasion — Wacker Neuson, Magni, Promove Demolition",
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
