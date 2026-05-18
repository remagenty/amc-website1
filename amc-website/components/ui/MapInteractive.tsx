"use client";

import { useEffect, useRef, useState } from "react";
import { IconMapPin } from "@/components/ui/Icons";

const LAT = 46.0764;
const LNG = 6.0752;
const ADDRESS = "ZA Les Bruyères, 74540 Saint-Félix, Haute-Savoie";
const GOOGLE_MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;

export function MapInteractive() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [locating, setLocating] = useState(false);
  const [located, setLocated] = useState(false);

  useEffect(() => {
    if (mapInstance.current || !mapRef.current) return;

    // Load Leaflet CSS
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(css);

    // Load Leaflet JS then init map
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => {
      if (!mapRef.current || mapInstance.current) return;
      const L = (window as any).L;

      const map = L.map(mapRef.current, { zoomControl: true }).setView([LAT, LNG], 15);
      mapInstance.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Yellow pin marker
      const icon = L.divIcon({
        html: `
          <div style="
            position:relative;
            width:32px;height:40px;
          ">
            <div style="
              width:32px;height:32px;
              background:#FFD500;
              border:3px solid #1a1a1a;
              border-radius:50% 50% 50% 0;
              transform:rotate(-45deg);
              box-shadow:0 2px 6px rgba(0,0,0,0.35);
            "></div>
          </div>`,
        iconSize: [32, 40],
        iconAnchor: [16, 40],
        popupAnchor: [0, -42],
        className: "",
      });

      L.marker([LAT, LNG], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:sans-serif;font-size:13px;line-height:1.4">
            <strong style="font-size:14px">AMC — Alpes Matériel Compact</strong><br>
            ${ADDRESS}<br>
            <a href="${GOOGLE_MAPS_URL}" target="_blank" rel="noopener noreferrer"
               style="color:#9B6A00;font-weight:600;margin-top:4px;display:inline-block">
              Voir l'itinéraire →
            </a>
          </div>`,
          { maxWidth: 220 }
        )
        .openPopup();
    };
    document.head.appendChild(script);

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const handleLocate = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        setLocated(true);
        const L = (window as any).L;
        if (!mapInstance.current || !L) return;
        const { latitude, longitude } = pos.coords;
        // Add user position marker
        const userIcon = L.circleMarker([latitude, longitude], {
          radius: 8,
          fillColor: "#2563eb",
          color: "#fff",
          weight: 2,
          fillOpacity: 1,
        }).addTo(mapInstance.current).bindPopup("Votre position");
        // Fit bounds between user and AMC
        const bounds = L.latLngBounds(
          [latitude, longitude],
          [LAT, LNG]
        );
        mapInstance.current.fitBounds(bounds, { padding: [40, 40] });
        userIcon.openPopup();
      },
      () => {
        setLocating(false);
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

      {/* Map */}
      <div
        ref={mapRef}
        className="w-full"
        style={{ height: "400px", cursor: "pointer" }}
        aria-label="Carte interactive — AMC Alpes Matériel Compact"
        role="application"
      />

      {/* Buttons */}
      <div className="p-4 flex flex-wrap gap-3">
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-[160px] text-center py-2.5 rounded-full text-sm font-bold transition-all hover:brightness-95"
          style={{ backgroundColor: "#FFD500", color: "#000000" }}
        >
          Obtenir l'itinéraire
        </a>
        <button
          onClick={handleLocate}
          disabled={locating || located}
          className="flex-1 min-w-[160px] py-2.5 rounded-full text-sm font-bold border-2 border-gray-300 transition-all hover:border-gray-400 disabled:opacity-60"
          style={{ backgroundColor: "transparent", color: "#000000" }}
          aria-label="Activer la géolocalisation"
        >
          {locating ? "Localisation…" : located ? "✓ Localisé" : "Me localiser"}
        </button>
      </div>
    </div>
  );
}
