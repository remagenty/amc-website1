"use client";

import { useEffect } from "react";

// Images to prefetch in the background after the current page is interactive.
// Covers the most visited pages so navigation feels instant.
const IMAGES_TO_PREFETCH = [
  "/images/immage-accueil-site-internet.png",
  "/images/sav-page-arrivee.jpg",
  "/images/sav-sur-terrain.jpg",
  "/images/sav-interieur-de-machine.jpg",
  "/images/photos-machines-wacker-interieur.jpg",
  "/images/photo-wacker-catalogue.webp",
  "/images/Magni-catalogue.webp",
  "/images/catalogue-promove-demolition.webp",
  "/images/photos-de-facades-amc.jpg",
  "/images/sav-interieur-2.jpg",
  "/images/sav-sur-terrain-2.jpg",
];

export function PrefetchImages() {
  useEffect(() => {
    const run = () => {
      for (const src of IMAGES_TO_PREFETCH) {
        const img = new window.Image();
        img.src = src;
      }
    };
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(run, { timeout: 3000 });
    } else {
      setTimeout(run, 500);
    }
  }, []);
  return null;
}
