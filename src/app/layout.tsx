import type { Metadata } from "next";
import { Playfair_Display, Quicksand } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const quicksand = Quicksand({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cobaby.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CoBaby | Comunidad para formar familia en Latinoamérica",
    template: "%s | CoBaby",
  },
  description:
    "La comunidad digital para personas que sueñan con formar una familia en Latinoamérica. Encuentra donantes, pareja para formar familia o co-padres. Acompañamiento y apoyo para tu camino.",
  keywords: [
    "CoBaby",
    "formar familia",
    "donante semen",
    "co-padre",
    "co-madre",
    "maternidad",
    "Latinoamérica",
    "comunidad",
    "coparentalidad",
    "ser madre",
  ],
  authors: [{ name: "CoBaby" }],
  creator: "CoBaby",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: "CoBaby",
    title: "CoBaby | Todas las familias nacen con un encuentro",
    description:
      "La comunidad digital para personas que sueñan con formar una familia en Latinoamérica. Encuentra donantes, pareja o co-padres.",
    images: [
      {
        url: "/ogimage/ogimage.png",
        width: 1200,
        height: 630,
        alt: "CoBaby",
      },
      {
        url: "/square_seo/square_seo.png",
        width: 1200,
        height: 1200,
        alt: "CoBaby",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoBaby | Todas las familias nacen con un encuentro",
    description:
      "La comunidad digital para personas que sueñan con formar una familia en Latinoamérica.",
    images: ["/ogimage/ogimage.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon/favicon.png",
    apple: "/square_seo/square_seo.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CoBaby",
  url: siteUrl,
  description:
    "La comunidad digital para personas que sueñan con formar una familia en Latinoamérica.",
  areaServed: "Latin America",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${playfair.variable} ${quicksand.variable} font-body antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
