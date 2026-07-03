import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { localizeHref } from "@/lib/i18n/href";
import { pageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "id";
  return pageMetadata("/buku", locale, getDictionary(locale).meta.buku);
}

const bookHrefs = ["/buku/alkitab", "/buku/buku-ende", "/buku/kidung-jemaat"];

export default async function BukuPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "id";
  const t = getDictionary(locale).buku;
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageBanner
          eyebrow={t.banner.eyebrow}
          title={t.banner.title}
          desc={t.banner.desc}
        />

        <section className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <div className="grid gap-5 md:grid-cols-3">
            {bookHrefs.map((href, i) => (
              <Reveal key={href} delay={i * 90}>
                <Link
                  href={localizeHref(href, locale)}
                  className="card group flex h-full flex-col p-8 transition-transform hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-royal">
                    {t.items[i]?.meta}
                  </span>
                  <h2 className="mt-3 font-display text-2xl font-semibold text-black">
                    {t.items[i]?.name}
                  </h2>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-black/70">
                    {t.items[i]?.desc}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-royal">
                    {t.buka}
                    <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
