"use client";

import { IconMapPin } from "@/components/ui/Icons";

const LAT = 45.79640;
const LNG = 5.97107;
const ADDRESS = "ZAC D'Orsan, 330 Rue du Mont Blanc, 74540 Saint-Félix, Haute-Savoie";

// ll= forces the map center; q= pins the marker at exact coordinates
const GMAPS_EMBED =
  "https://www.google.com/maps?ll=45.79640,5.97107" +
  "&q=45.79640,5.97107" +
  "&hl=fr&z=16&output=embed";
const GMAPS_DIR = "https://www.google.com/maps/dir/?api=1&destination=45.79640,5.97107";

export function MapInteractive() {
  const handleGetDirections = () => {
    window.open(GMAPS_DIR, "_blank", "noopener,noreferrer");
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

      <div className="p-5 flex justify-center">
        <button
          onClick={handleGetDirections}
          className="rounded-full font-semibold transition-all hover:brightness-95"
          style={{
            backgroundColor: "#FFD500",
            color: "#000000",
            padding: "16px 48px",
            fontSize: "18px",
            fontWeight: 600,
            width: "60%",
            maxWidth: "500px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Obtenir l&apos;itinéraire
        </button>
      </div>
    </div>
  );
}
