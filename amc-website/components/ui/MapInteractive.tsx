"use client";

import { useState } from "react";
import { IconMapPin } from "@/components/ui/Icons";

const LAT = 46.0764;
const LNG = 6.0752;
const ADDRESS = "ZA Les Bruyères, 74540 Saint-Félix, Haute-Savoie";

const OSM_EMBED =
  `https://www.openstreetmap.org/export/embed.html` +
  `?bbox=${LNG - 0.012}%2C${LAT - 0.008}%2C${LNG + 0.012}%2C${LAT + 0.008}` +
  `&layer=mapnik&marker=${LAT}%2C${LNG}`;

const GMAPS_DEST = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;

export function MapInteractive() {
  const [locating, setLocating] = useState(false);

  const handleLocate = () => {
    if (!navigator.geolocation) {
      window.open(GMAPS_DEST, "_blank", "noopener,noreferrer");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        const { latitude, longitude } = pos.coords;
        const url = `https://www.google.com/maps/dir/${latitude},${longitude}/${LAT},${LNG}`;
        window.open(url, "_blank", "noopener,noreferrer");
      },
      () => {
        setLocating(false);
        window.open(GMAPS_DEST, "_blank", "noopener,noreferrer");
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

      {/* Interactive OpenStreetMap iframe — pan, zoom, layers built-in */}
      <div style={{ height: "400px" }}>
        <iframe
          src={OSM_EMBED}
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          title="Carte AMC — Saint-Félix, Haute-Savoie"
          aria-label="Carte interactive de localisation AMC Alpes Matériel Compact"
          loading="lazy"
        />
      </div>

      {/* Buttons */}
      <div className="p-4 flex flex-wrap gap-3">
        <a
          href={GMAPS_DEST}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-[160px] text-center py-2.5 rounded-full text-sm font-bold transition-all hover:brightness-95"
          style={{ backgroundColor: "#FFD500", color: "#000000" }}
        >
          Obtenir l&apos;itinéraire
        </a>
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
