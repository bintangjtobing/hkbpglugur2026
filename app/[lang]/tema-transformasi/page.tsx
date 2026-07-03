import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
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
  return pageMetadata("/tema-transformasi", locale, getDictionary(locale).meta.tema);
}

const pendekatanNo = ["01", "02", "03"];

export default async function TemaTransformasiPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "id";
  const t = getDictionary(locale).tema;
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero bertema ungu */}
        <section className="relative -mt-[72px] overflow-hidden bg-navy pt-[72px] text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(circle at 78% 25%, #7c3aed 0, transparent 45%), radial-gradient(circle at 15% 20%, #4f46e5 0, transparent 42%)",
            }}
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:py-20 lg:grid-cols-[1fr_auto]">
            <div>
              <span className="eyebrow inline-flex items-center gap-2 text-[#c4b5fd]">
                <span className="h-1.5 w-1.5 mark-cross bg-[#a78bfa]" />
                {t.heroEyebrow}
              </span>
              <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                {t.heroTitle}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
                {t.heroIntro}
              </p>
            </div>
            <Reveal className="justify-self-center lg:justify-self-end">
              <div className="rounded-3xl bg-white p-6 shadow-2xl">
                <Image
                  src="/theme-transformasi.webp"
                  alt={t.logoAlt}
                  title="Tema Transformasi HKBP 2024 sampai 2028"
                  width={220}
                  height={220}
                  className="h-40 w-40 object-contain sm:h-48 sm:w-48"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Ayat */}
        <section className="mx-auto max-w-4xl px-5 py-16 md:py-20">
          <Reveal>
            <figure className="rounded-[var(--radius-card)] border border-line bg-mist p-8 text-center sm:p-12">
              <blockquote className="font-display text-2xl font-semibold leading-snug text-black sm:text-3xl">
                “{t.ayat}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold uppercase tracking-widest text-royal">
                {t.ayatRef}
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* Apa itu transformasi */}
        <section className="mx-auto max-w-4xl px-5 pb-16 md:pb-20">
          <Reveal>
            <h2 className="text-3xl font-semibold text-black sm:text-4xl">
              {t.apaHeading}
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-black/75">
              <p>{t.apaP1}</p>
              <p>{t.apaP2}</p>
              <p>{t.apaP3}</p>
            </div>
          </Reveal>
        </section>

        {/* Makna logo */}
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal className="max-w-2xl">
              <span className="eyebrow inline-flex items-center gap-2 text-[#7c3aed]">
                <span className="h-1.5 w-1.5 mark-cross bg-[#7c3aed]" />
                {t.logoEyebrow}
              </span>
              <h2 className="mt-3 text-3xl font-semibold text-black sm:text-4xl">
                {t.logoHeading}
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {t.logoMakna.map((m, i) => (
                <Reveal key={i} delay={(i % 3) * 80}>
                  <article className="card h-full p-7">
                    <div className="h-1.5 w-10 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#4f46e5]" />
                    <h3 className="mt-4 text-lg font-semibold text-black">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-black/70">
                      {m.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Tiga pendekatan */}
        <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <Reveal className="max-w-2xl">
            <span className="eyebrow inline-flex items-center gap-2 text-royal">
              <span className="h-1.5 w-1.5 mark-cross bg-blue" />
              {t.pendekatanEyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-semibold text-black sm:text-4xl">
              {t.pendekatanHeading}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {t.pendekatan.map((p, i) => (
              <Reveal key={i} delay={i * 90}>
                <article className="card h-full p-8">
                  <span className="font-display text-3xl font-semibold text-royal/70">
                    {pendekatanNo[i]}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-black">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-black/70">
                    {p.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Visi misi */}
        <section className="bg-navy py-16 text-white md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-2">
            <Reveal>
              <div className="rounded-[var(--radius-card)] border border-white/12 bg-white/[0.05] p-8">
                <p className="eyebrow text-mist-200">{t.visiLabel}</p>
                <p className="mt-4 font-display text-2xl font-semibold leading-snug">
                  {t.visi}
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-[var(--radius-card)] border border-white/12 bg-white/[0.05] p-8">
                <p className="eyebrow text-mist-200">{t.misiLabel}</p>
                <p className="mt-4 font-display text-2xl font-semibold leading-snug">
                  {t.misi}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-12">
          <p className="text-sm text-black/50">{t.sumber}</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
