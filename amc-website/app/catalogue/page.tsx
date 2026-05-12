import type { Metadata } from "next";
import { Suspense } from "react";
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

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-amc-cream flex items-center justify-center text-amc-text-secondary">Chargement du catalogue...</div>}>
      <CataloguePage />
    </Suspense>
  );
}
