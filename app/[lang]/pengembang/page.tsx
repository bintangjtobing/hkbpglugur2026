import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { withUtm } from "@/lib/utm";
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
  return pageMetadata("/pengembang", locale, getDictionary(locale).meta.pengembang);
}

export default async function PengembangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "id";
  const t = getDictionary(locale).pengembang;
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
          <Reveal>
            <div className="rounded-[var(--radius-card)] border border-line bg-white p-8 shadow-[var(--shadow-soft)] sm:p-10">
              <span className="eyebrow inline-flex items-center gap-2 text-royal">
                <span className="h-1.5 w-1.5 mark-cross bg-blue" />
                {t.relawan}
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold text-black">
                Bintang Tobing
              </h2>
              <p className="mt-2 text-sm font-semibold text-royal">{t.role}</p>
              <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-black/75">
                <p>{t.p1}</p>
                <p>{t.p2}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={withUtm("https://bintangtobing.com")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-mist"
                >
                  {t.profilLink}
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
                </a>
                <a
                  href={withUtm("https://saweria.co/bintangtobing")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-royal px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-royal-600"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 21s-7-4.35-9.5-8.5C.5 8.5 2.5 5 6 5c2 0 3.2 1 4 2.3C10.8 6 12 5 14 5c3.5 0 5.5 3.5 3.5 7.5C19 16.65 12 21 12 21Z" /></svg>
                  {t.dukungSaweria}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-8 text-center text-sm text-black/60">
              {t.donasiPre}{" "}
              <a
                href={withUtm("https://saweria.co/bintangtobing")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-royal underline-offset-2 hover:underline"
              >
                saweria.co/bintangtobing
              </a>
              {t.donasiPost}
            </p>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
