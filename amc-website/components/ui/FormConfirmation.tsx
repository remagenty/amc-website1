"use client";

import Link from "next/link";

type Props = {
  status: "success" | "error";
  name: string;
  onReset: () => void;
};

export function FormConfirmation({ status, name, onReset }: Props) {
  const isSuccess = status === "success";
  const borderColor = isSuccess ? "#FDC202" : "#C0392B";
  const iconBg = isSuccess ? "#FDC202" : "#C0392B";

  return (
    <div
      className="bg-white rounded-lg animate-fade-in"
      style={{
        borderLeft: `4px solid ${borderColor}`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        padding: "32px",
      }}
    >
      {/* Icône */}
      <div
        className="flex items-center justify-center w-10 h-10 rounded-full mb-5 flex-shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4 10l4.5 4.5L16 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {isSuccess ? (
        <>
          <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a1a", marginBottom: "12px" }}>
            Demande envoyée
          </h3>
          <p style={{ fontSize: "16px", color: "#444444", lineHeight: 1.75 }}>
            Merci {name},
          </p>
          <p style={{ fontSize: "16px", color: "#444444", lineHeight: 1.75, marginTop: "8px" }}>
            Votre demande a bien été reçue. Notre équipe vous contactera dans les meilleurs
            délais, généralement sous 24h ouvrées.
          </p>
          <p style={{ fontSize: "16px", color: "#444444", lineHeight: 1.75, marginTop: "16px" }}>
            À bientôt,<br />
            L&apos;équipe AMC — Alpes Matériel Compact
          </p>
          <Link
            href="/"
            className="inline-block mt-6 text-sm text-gray-500 hover:text-gray-800 transition-colors underline underline-offset-2"
          >
            Retour à l&apos;accueil
          </Link>
        </>
      ) : (
        <>
          <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a1a", marginBottom: "12px" }}>
            Une erreur est survenue
          </h3>
          <p style={{ fontSize: "16px", color: "#444444", lineHeight: 1.75 }}>
            Nous n&apos;avons pas pu traiter votre demande.<br />
            Veuillez nous contacter directement au{" "}
            <a href="tel:+33426784390" className="font-semibold hover:underline">
              04 26 78 43 90
            </a>{" "}
            ou par email à{" "}
            <a href="mailto:contact@amc-savoie.fr" className="font-semibold hover:underline">
              contact@amc-savoie.fr
            </a>
          </p>
          <button
            onClick={onReset}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold border-2 border-gray-300 rounded-lg text-gray-700 hover:border-gray-500 transition-colors"
          >
            Réessayer
          </button>
        </>
      )}
    </div>
  );
}
