"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LAT = 46.076638;
const LNG = 6.075011;

// Custom yellow pin matching AMC brand
const AMC_ICON = L.divIcon({
  html: `<svg viewBox="0 0 24 36" width="24" height="36" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24S24 21 24 12C24 5.373 18.627 0 12 0z"
      fill="#FFD500" stroke="#1a1a1a" stroke-width="1.5"/>
    <circle cx="12" cy="12" r="4" fill="#1a1a1a"/>
  </svg>`,
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -36],
  className: "",
});

export default function MapView() {
  return (
    <MapContainer
      center={[LAT, LNG]}
      zoom={16}
      style={{ height: "400px", width: "100%" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[LAT, LNG]} icon={AMC_ICON}>
        <Popup>
          <strong>AMC — Alpes Matériel Compact</strong><br />
          ZAC D&apos;Orsan, 330 Rue du Mont Blanc<br />
          74540 Saint-Félix, Haute-Savoie
        </Popup>
      </Marker>
    </MapContainer>
  );
}
