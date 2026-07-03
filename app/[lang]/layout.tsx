import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Urbanist, Open_Sans } from "next/font/google";
import "./globals.css";
import { church } from "@/lib/content";
import { Analytics } from "@/components/Analytics";
import { ChatWidget } from "@/components/ChatWidget";
import { DictionaryProvider } from "@/components/DictionaryProvider";
import { GA_ID, CLARITY_ID } from "@/lib/analytics";
import { getDictionary } from "@/lib/i18n";
import { isLocale, locales, htmlLang, ogLocale, type Locale } from "@/lib/i18n/config";
import { SITE_URL, buildAlternates } from "@/lib/i18n/metadata";

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

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "id";
  const dict = getDictionary(locale);
  const m = dict.meta.default;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: m.title,
      template: "%s | HKBP Glugur",
    },
    description: m.description,
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
    creator: "Bintang Tobing",
    publisher: "Bintang Tobing",
    alternates: buildAlternates("/", locale),
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      url: SITE_URL,
      siteName: "HKBP Glugur",
      title: m.ogTitle,
      description: m.ogDescription,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: m.ogImageAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.twitterTitle,
      description: m.twitterDescription,
      images: [{ url: "/og-image.png", alt: m.ogImageAlt }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    category: "religion",
  };
}

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
    {
      "@type": "Church",
      name: "HKBP Pulo Brayan",
      address: "Jl. KL. Yos Sudarso, Pulo Brayan Kota, Kec. Medan Barat, Kota Medan, Sumatera Utara 20239",
    },
    {
      "@type": "Church",
      name: "HKBP Marturia",
      address: "Jl. Tol Mulia 5 No.17, Tj. Mulia Hilir, Kec. Medan Deli, Kota Medan, Sumatera Utara 20241",
    },
    {
      "@type": "Church",
      name: "HKBP Pardomuan Nauli",
      address: "Titi Papan, Kec. Medan Deli, Kota Medan, Sumatera Utara 20242",
    },
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = getDictionary(locale);

  return (
    <html
      lang={htmlLang[locale]}
      className={`${urbanist.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics 4 */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
          }}
        />
        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`,
          }}
        />
        <DictionaryProvider dict={dict} locale={locale}>
          <Analytics />
          {children}
          <ChatWidget />
        </DictionaryProvider>
      </body>
    </html>
  );
}
