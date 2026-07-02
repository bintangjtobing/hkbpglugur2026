import type { Metadata } from "next";
import { Urbanist, Open_Sans } from "next/font/google";
import "./globals.css";
import { church } from "@/lib/content";
import { Analytics } from "@/components/Analytics";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://hkbpglugur.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "HKBP Glugur, Gereja HKBP Ressort Medan Utara di Glugur Darat, Medan",
    template: "%s | HKBP Glugur",
  },
  description:
    "HKBP Glugur (Huria Kristen Batak Protestan) di Jl. Pembangunan III No.57A, Glugur Darat, Medan. Lihat jadwal ibadah Minggu, sejarah HKBP, pelayanan jemaat, dan lokasi gereja pusat Ressort Medan Utara, Distrik X Medan Aceh.",
  keywords: [
    "HKBP Glugur",
    "gereja HKBP Medan",
    "HKBP Glugur Darat",
    "jadwal ibadah HKBP Glugur",
    "gereja Batak Medan",
    "HKBP Ressort Medan Utara",
    "Huria Kristen Batak Protestan",
    "gereja Kristen Medan Timur",
  ],
  authors: [{ name: "HKBP Glugur" }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "HKBP Glugur",
    title: "HKBP Glugur, Gereja HKBP Ressort Medan Utara, Medan",
    description:
      "Rumah untuk bertumbuh dalam iman, kasih, dan pelayanan di Glugur Darat, Medan. Lihat jadwal ibadah, sejarah, dan pelayanan HKBP Glugur.",
    images: [
      {
        url: "/hkbp-logo.webp",
        width: 1200,
        height: 630,
        alt: "Logo HKBP Glugur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HKBP Glugur, Gereja HKBP Medan",
    description:
      "Jadwal ibadah, sejarah, dan pelayanan HKBP Glugur di Glugur Darat, Medan.",
    images: ["/hkbp-logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "religion",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: "HKBP Glugur",
  alternateName: "Huria Kristen Batak Protestan Glugur",
  url: SITE_URL,
  logo: `${SITE_URL}/hkbp-logo.webp`,
  image: `${SITE_URL}/hkbp-logo.webp`,
  description:
    "Gereja HKBP Glugur, pusat Ressort Medan Utara, Distrik X Medan Aceh. Melayani jemaat di Glugur Darat, Kota Medan.",
  telephone: church.contact.phone,
  email: church.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: church.address.street,
    addressLocality: "Medan",
    addressRegion: "Sumatera Utara",
    postalCode: "20238",
    addressCountry: "ID",
  },
  areaServed: "Medan, Sumatera Utara",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.6",
    reviewCount: 59,
    bestRating: "5",
    worstRating: "1",
  },
  subOrganization: [
    { "@type": "Church", name: "HKBP Pulo Brayan" },
    { "@type": "Church", name: "HKBP Pardomuan Nauli" },
  ],
  sameAs: [church.contact.facebook],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "07:00",
      closes: "12:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${urbanist.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
