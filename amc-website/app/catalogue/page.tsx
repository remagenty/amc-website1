import type { Metadata } from "next";
import { CataloguePage } from "./CataloguePage";
import { getMachinesAsync } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: "Matériel de chantier neuf et occasion Haute-Savoie | Wacker Neuson, Magni, Promove — AMC" },
  description: "Compacteurs, dumpers, mini-pelles, télescopiques neufs et occasion en Haute-Savoie. Distributeur officiel WACKER NEUSON, Magni, Promove à Saint-Félix (74). Livraison Annecy, Chambéry, Aix-les-Bains, Albertville.",
  openGraph: {
    title: "Matériel de chantier neuf et occasion Haute-Savoie | Wacker Neuson, Magni, Promove — AMC",
    description: "Compacteurs, dumpers, mini-pelles, télescopiques neufs et occasion en Haute-Savoie. Distributeur officiel WACKER NEUSON, Magni, Promove à Saint-Félix (74). Livraison Annecy, Chambéry, Aix-les-Bains, Albertville.",
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
