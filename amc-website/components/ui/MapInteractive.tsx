"use client";

import { useState } from "react";
import { IconMapPin } from "@/components/ui/Icons";

const LAT = 46.076638;
const LNG = 6.075011;
const ADDRESS = "ZAC D'Orsan, 330 Rue du Mont Blanc, 74540 Saint-Félix, Haute-Savoie";

const GMAPS_EMBED = `https://maps.google.com/maps?q=${LAT},${LNG}&hl=fr&z=16&output=embed`;
const GMAPS_DIR = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;

export function MapInteractive() {
  const [locating, setLocating] = useState(false);

  const handleGetDirections = () => {
    window.open(GMAPS_DIR, "_blank", "noopener,noreferrer");
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
        window.open(
          `https://www.google.com/maps/dir/${latitude},${longitude}/${LAT},${LNG}`,
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
        <p className="text-sm text-amc-text-secondary mt-1">{ADDRESS}</p>
      </div>

      {/* Google Maps embed — exact coordinates, no API key needed */}
      <iframe
        src={GMAPS_EMBED}
        width="100%"
        height="400"
        style={{ border: 0, display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Localisation AMC — ZAC D'Orsan, Saint-Félix"
        aria-label="Carte Google Maps — AMC Alpes Matériel Compact"
      />

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
