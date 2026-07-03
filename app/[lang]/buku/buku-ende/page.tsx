import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { HymnReader } from "@/components/HymnReader";
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
  return pageMetadata("/buku/buku-ende", locale, getDictionary(locale).meta.bukuEnde);
}

export default async function BukuEndePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "id";
  const t = getDictionary(locale).buku.bukuEnde;
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageBanner
          eyebrow={t.banner.eyebrow}
          title={t.banner.title}
          desc={t.banner.desc}
        />
        <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="mb-10 max-w-3xl space-y-4 text-[16px] leading-relaxed text-black/75">
            <p>{t.p1}</p>
            <p>{t.p2}</p>
          </div>
          <HymnReader dataUrl="/data/buku-ende.json" prefix="BE" />
          <p className="mt-6 text-sm text-black/50">{t.sumber}</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
