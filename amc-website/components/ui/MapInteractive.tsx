"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { IconMapPin } from "@/components/ui/Icons";

const LAT = 46.076638;
const LNG = 6.075011;
const ADDRESS = "ZAC D'Orsan, 330 Rue du Mont Blanc, 74540 Saint-Félix";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div
      className="flex items-center justify-center bg-gray-100 text-sm text-gray-500"
      style={{ height: "400px" }}
    >
      Chargement de la carte…
    </div>
  ),
});

export function MapInteractive() {
  const [locating, setLocating] = useState(false);

  const handleGetDirections = () => {
    const dest = encodeURIComponent(ADDRESS);
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${dest}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleLocate = () => {
    if (!navigator.geolocation) {
      handleGetDirections();
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        const { latitude, longitude } = pos.coords;
        const dest = encodeURIComponent(ADDRESS);
        window.open(
          `https://www.google.com/maps/dir/${latitude},${longitude}/${dest}`,
          "_blank",
          "noopener,noreferrer"
        );
      },
      () => {
        setLocating(false);
        handleGetDirections();
      }
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <IconMapPin size={18} className="text-amc-yellow flex-shrink-0" />
          <h3 className="font-bold text-amc-text">Nous localiser</h3>
        </div>
        <p className="text-sm text-amc-text-secondary mt-1">
          {ADDRESS}, Haute-Savoie
        </p>
      </div>

      <MapView />

      <div className="p-4 flex flex-wrap gap-3">
        <button
          onClick={handleGetDirections}
          className="flex-1 min-w-[160px] py-2.5 rounded-full text-sm font-bold transition-all hover:brightness-95"
          style={{ backgroundColor: "#FFD500", color: "#000000" }}
        >
          Obtenir l&apos;itinéraire
        </button>
        <button
          onClick={handleLocate}
          disabled={locating}
          className="flex-1 min-w-[160px] py-2.5 rounded-full text-sm font-bold border-2 border-gray-300 transition-all hover:border-gray-400 disabled:opacity-60"
          style={{ backgroundColor: "transparent", color: "#000000" }}
          aria-label="Utiliser ma position pour obtenir l'itinéraire"
        >
          {locating ? "Localisation…" : "Me localiser"}
        </button>
      </div>
    </div>
  );
}
