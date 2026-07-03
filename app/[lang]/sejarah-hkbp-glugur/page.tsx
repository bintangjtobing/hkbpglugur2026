import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Mark } from "@/components/Mark";
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
  return pageMetadata("/sejarah-hkbp-glugur", locale, getDictionary(locale).meta.sejarah);
}

const sources = [
  { label: "Portal resmi HKBP, halaman Huria Glugur", url: "https://hkbp.or.id/huria/cmmnek7v601t40otd9dqakszr" },
  { label: "Utamanews, Jemaat HKBP Glugur Medan Undang Nikson Nababan (9 Juni 2024)", url: "https://utamanews.com/sosial-budaya/Jemaat-HKBP-Glugur-Medan-Undang-Nikson-Nababan" },
  { label: "Portal resmi HKBP, Tentang HKBP", url: "https://hkbp.or.id/tentang" },
  { label: "Detik, Mengenang 164 Tahun Berdirinya HKBP", url: "https://www.detik.com/sumut/budaya/d-8149631/mengenang-164-tahun-berdirinya-huria-kristen-batak-protestan-hkbp" },
  { label: "Tribun Medan, Sejarah HKBP mulai 7 Oktober 1861", url: "https://medan.tribunnews.com/2019/10/07/sejarah-hkbp-mulai-7-oktober-1861-dan-menjadi-organisasi-kristen-protestan-terbesar-di-indonesia" },
  { label: "BatakPedia, Sejarah HKBP", url: "https://batakpedia.org/hkbp/sejarah-hkbp/" },
];

export default async function SejarahGlugurPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "id";
  const t = getDictionary(locale).sejarah;
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero artikel */}
        <section className="relative -mt-[72px] overflow-hidden bg-navy pt-[72px] text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 18% 20%, #2138e0 0, transparent 45%), radial-gradient(circle at 88% 15%, #0000ff 0, transparent 40%)",
            }}
          />
          <Mark className="pointer-events-none absolute -right-10 -bottom-16 h-72 w-72 text-white/[0.05]" />
          <div className="relative mx-auto max-w-3xl px-5 py-16 md:py-20">
            <span className="eyebrow inline-flex items-center gap-2 text-mist-200">
              <span className="h-1.5 w-1.5 mark-cross bg-blue" />
              {t.eyebrow}
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              {t.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/75">
              {t.heroIntro}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-white/55">
              <span>{t.byline}</span>
              <span>{t.readTime}</span>
            </div>
          </div>
        </section>

        {/* Isi artikel */}
        <article className="mx-auto max-w-2xl px-5 py-16 md:py-20">
          <Reveal>
            <p className="text-[17px] leading-relaxed text-black/80 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-royal">
              {t.lead}
            </p>
          </Reveal>

          <div className="mt-10 space-y-10">
            <Reveal>
              <section>
                <h2 className="font-display text-2xl font-semibold text-black">
                  {t.s1Heading}
                </h2>
                <p className="mt-4 text-[17px] leading-relaxed text-black/80">
                  {t.s1p1}
                </p>
                <p className="mt-4 text-[17px] leading-relaxed text-black/80">
                  {t.s1p2}
                </p>
              </section>
            </Reveal>

            <Reveal>
              <figure className="rounded-[var(--radius-card)] border border-line bg-mist p-8 text-center">
                <blockquote className="font-display text-xl font-semibold leading-snug text-black sm:text-2xl">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-3 text-sm font-semibold uppercase tracking-widest text-royal">
                  {t.quoteRef}
                </figcaption>
              </figure>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="font-display text-2xl font-semibold text-black">
                  {t.s2Heading}
                </h2>
                <p className="mt-4 text-[17px] leading-relaxed text-black/80">
                  {t.s2p1}
                </p>
                <p className="mt-4 text-[17px] leading-relaxed text-black/80">
                  {t.s2p2}
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="font-display text-2xl font-semibold text-black">
                  {t.s3Heading}
                </h2>
                <p className="mt-4 text-[17px] leading-relaxed text-black/80">
                  {t.s3p1}
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="font-display text-2xl font-semibold text-black">
                  {t.s4Heading}
                </h2>
                <p className="mt-4 text-[17px] leading-relaxed text-black/80">
                  {t.s4p1}
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="font-display text-2xl font-semibold text-black">
                  {t.s5Heading}
                </h2>
                <p className="mt-4 text-[17px] leading-relaxed text-black/80">
                  {t.s5p1}
                </p>
                <p className="mt-4 text-[17px] leading-relaxed text-black/80">
                  {t.s5p2}
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="font-display text-2xl font-semibold text-black">
                  {t.s6Heading}
                </h2>
                <p className="mt-4 text-[17px] leading-relaxed text-black/80">
                  {t.s6p1}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-black/60">
                  {t.s6note}
                </p>
              </section>
            </Reveal>

            {/* Referensi */}
            <Reveal>
              <section className="border-t border-line pt-8">
                <h2 className="font-display text-xl font-semibold text-black">
                  {t.refHeading}
                </h2>
                <ol className="mt-4 space-y-2.5 text-sm text-black/70">
                  {sources.map((s, i) => (
                    <li key={s.url} className="flex gap-3">
                      <span className="font-semibold text-royal">{i + 1}.</span>
                      <a
                        href={withUtm(s.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={s.label}
                        className="text-royal underline-offset-2 hover:underline"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </section>
            </Reveal>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
