import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EventPopup } from "@/components/ui/EventPopup";

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
    "AMC, distributeur officiel WACKER NEUSON, Magni et Promove Demolition. Vente de matériels de chantier neufs et d'occasion certifiés. Service après-vente certifié à Saint-Félix, Haute-Savoie.",
  keywords: [
    "achat matériel BTP Haute-Savoie",
    "vente matériel chantier Annecy",
    "mini-pelle Wacker Neuson Saint-Félix 74",
    "dumper articulé Chambéry Savoie",
    "télescopique Magni Haute-Savoie",
    "équipement démolition Promove Aix-les-Bains",
    "distributeur WACKER NEUSON Haute-Savoie",
    "matériel chantier neuf occasion Albertville",
    "SAV certifié matériel BTP Savoie Mont-Blanc",
    "compacteur tandem Rhône-Alpes",
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
      "Distributeur officiel WACKER NEUSON, Magni et Promove Demolition. Matériels neufs et occasion certifiés, SAV certifié.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AMC — Alpes Matériel Compact",
    description: "Distributeur officiel WACKER NEUSON, Magni et Promove Demolition.",
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
  verification: process.env.GOOGLE_VERIFICATION
    ? { google: process.env.GOOGLE_VERIFICATION }
    : undefined,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");

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
              logo: "https://www.amc-savoie.fr/images/LOGO-AMC-ORANGE-site-web-V3.png",
              image: "https://www.amc-savoie.fr/images/LOGO-AMC-ORANGE-site-web-V3.png",
              description:
                "Distributeur officiel WACKER NEUSON, Magni et Promove Demolition en Haute-Savoie. Vente matériels de chantier neufs et occasion à Saint-Félix (74). SAV certifié. Zone Annecy, Chambéry, Aix-les-Bains, Albertville.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "ZAC D'Orsan, 330 Rue du Mont Blanc",
                addressLocality: "Saint-Félix",
                addressRegion: "Haute-Savoie",
                postalCode: "74540",
                addressCountry: "FR",
              },
              telephone: "+33426784390",
              email: "contact@amc-savoie.fr",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "08:00",
                  closes: "12:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "14:00",
                  closes: "18:00",
                },
              ],
              geo: {
                "@type": "GeoCoordinates",
                latitude: "45.79640",
                longitude: "5.97107",
              },
              areaServed: [
                { "@type": "AdministrativeArea", "name": "Haute-Savoie" },
                { "@type": "AdministrativeArea", "name": "Savoie" },
                { "@type": "AdministrativeArea", "name": "Ain" },
                { "@type": "AdministrativeArea", "name": "Isère" },
              ],
              priceRange: "€€",
            }),
          }}
        />
      </head>
      <body className="antialiased font-sans bg-amc-cream text-amc-text">
        {!isAdmin && (
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-amc-yellow focus:text-amc-text focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
          >
            Aller au contenu principal
          </a>
        )}
        {!isAdmin && <Header />}
        {isAdmin ? children : <main id="main-content">{children}</main>}
        {!isAdmin && <Footer />}
        {!isAdmin && <EventPopup />}
      </body>
    </html>
  );
}
