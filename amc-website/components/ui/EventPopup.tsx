"use client";

import { useEffect, useState } from "react";
import { IconX, IconMapPin, IconExternalLink } from "@/components/ui/Icons";

const STORAGE_KEY = "amc-popup-btp-montagne-2026";

// Oct 18 at midnight local time — popup disappears on the 18th
const EXPIRY = new Date(2026, 9, 18);

const GOOGLE_CAL_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=BTP+%26+Travaux+de+Montagne" +
  "&dates=20261015%2F20261018" +
  "&details=AMC+sera+pr%C3%A9sent+au+salon+BTP+%26+Travaux+de+Montagne.+Venez+nous+retrouver+!" +
  "&location=La+Roche-sur-Foron%2C+Haute-Savoie";

export function EventPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (new Date() >= EXPIRY) return;
    if (localStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => setVisible(true), 7_000);
    return () => clearTimeout(timer);
  }, []);

  function close() {
    setVisible(false);
    localStorage.setItem(STORAGE_KEY, "1");
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-popup-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-slide-up">
        {/* Yellow top accent */}
        <div className="h-1.5 bg-amc-yellow" />

        <div className="p-6 sm:p-8">
          {/* Close */}
          <button
            onClick={close}
            aria-label="Fermer"
            className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-amc-text hover:bg-gray-100 transition-colors"
          >
            <IconX size={18} />
          </button>

          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 bg-amc-yellow text-amc-text text-xs font-bold px-3 py-1 rounded-full mb-4">
            <IconMapPin size={12} />
            Salon
          </span>

          {/* Title */}
          <h2
            id="event-popup-title"
            className="text-2xl font-black text-amc-text leading-tight mb-1"
          >
            BTP &amp; Travaux de Montagne
          </h2>

          {/* Date + lieu */}
          <p className="text-sm font-semibold text-amc-yellow mb-4">
            15 | 16 | 17 Octobre 2026 — La Roche-sur-Foron
          </p>

          {/* Body */}
          <p className="text-sm text-amc-text-secondary leading-relaxed mb-6">
            AMC sera présent au salon BTP &amp; Travaux de Montagne. Venez nous retrouver&nbsp;!
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://www.rochexpo.com/btp-travaux-de-montagne/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-amc-yellow text-amc-text font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-amc-yellow-dark transition-colors"
            >
              En savoir plus
              <IconExternalLink size={14} />
            </a>
            <a
              href={GOOGLE_CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-amc-text text-amc-text font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Ajouter à mon agenda
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
