import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { RequestForm } from "@/components/RequestForm";
import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "id";
  return pageMetadata("/permintaan", locale, getDictionary(locale).meta.permintaan, {
    robots: { index: false, follow: true },
  });
}

export default async function PermintaanPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "id";
  const t = getDictionary(locale).permintaan;
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageBanner
          eyebrow={t.banner.eyebrow}
          title={t.banner.title}
          desc={t.banner.desc}
        />
        <section className="mx-auto max-w-3xl px-5 py-16 md:py-20">
          <RequestForm />
          <p className="mt-6 text-sm text-black/55">{t.footnote}</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
