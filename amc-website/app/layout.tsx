import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.amc-savoie.fr"),
  title: {
    template: "%s | AMC — Alpes Matériel Compact",
    default: "AMC — Alpes Matériel Compact | Vente matériels de chantier Rhône-Alpes",
  },
  description:
    "AMC, distributeur officiel Wacker Neuson, Magni et Promove Demolition. Vente de matériels de chantier neufs et d'occasion certifiés. Service après-vente certifié SE+ à Saint-Félix, Haute-Savoie.",
  keywords: [
    "vente matériel chantier Rhône-Alpes",
    "machine Wacker Neuson Saint-Félix",
    "télescopique Magni neuf",
    "matériel démolition occasion",
    "service après-vente machine chantier",
    "certification SE+",
    "compacteur neuf occasion",
    "dumper articulé",
    "pelle compacte",
    "distributeur Wacker Neuson Haute-Savoie",
  ],
  authors: [{ name: "AMC — Alpes Matériel Compact" }],
  creator: "AMC — Alpes Matériel Compact",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.amc-savoie.fr",
    siteName: "AMC — Alpes Matériel Compact",
    title: "AMC — Alpes Matériel Compact | Vente matériels de chantier Rhône-Alpes",
    description:
      "Distributeur officiel Wacker Neuson, Magni et Promove Demolition. Matériels neufs et occasion certifiés, SAV certifié SE+.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AMC — Alpes Matériel Compact",
    description: "Distributeur officiel Wacker Neuson, Magni et Promove Demolition.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-placeholder",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <link rel="canonical" href="https://www.amc-savoie.fr" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "LocalBusiness"],
              name: "AMC — Alpes Matériel Compact",
              url: "https://www.amc-savoie.fr",
              logo: "https://www.amc-savoie.fr/images/logo.png",
              description:
                "Distributeur officiel Wacker Neuson, Magni et Promove Demolition. Vente matériels de chantier neufs et occasion. SAV certifié SE+.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "ZA les Bruyères",
                addressLocality: "Saint-Félix",
                addressRegion: "Haute-Savoie",
                postalCode: "74540",
                addressCountry: "FR",
              },
              telephone: "+33450000000",
              email: "contact@amc-savoie.fr",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "08:00",
                  closes: "18:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "08:00",
                  closes: "12:00",
                },
              ],
              geo: {
                "@type": "GeoCoordinates",
                latitude: "45.8500",
                longitude: "6.0500",
              },
              areaServed: "Rhône-Alpes",
              priceRange: "€€",
            }),
          }}
        />
      </head>
      <body className="antialiased font-sans bg-amc-cream text-amc-text">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-amc-yellow focus:text-amc-text focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
        >
          Aller au contenu principal
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
