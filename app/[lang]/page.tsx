import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { UlosDivider } from "@/components/UlosDivider";
import { Mark } from "@/components/Mark";
import { ReviewCta } from "@/components/ReviewCta";
import { withUtm } from "@/lib/utm";
import {
  church,
  weeklyServices,
  specialServices,
  stats,
  ressort,
  timeline,
  reviews,
} from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { localizeHref } from "@/lib/i18n/href";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="eyebrow inline-flex items-center gap-2 text-royal">
      <span className="h-1.5 w-1.5 mark-cross bg-blue" />
      {children}
    </span>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-5 w-5 ${i < Math.round(value) ? "text-[#f5b301]" : "text-line"}`}
          fill="currentColor"
        >
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
        </svg>
      ))}
    </span>
  );
}

const shortcutMeta = [
  {
    href: "/buku/alkitab",
    icon: (
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    ),
  },
  {
    href: "/buku/buku-ende",
    icon: <path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />,
  },
  {
    href: "/buku/kidung-jemaat",
    icon: <path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />,
  },
  {
    href: "/warta",
    icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h4" /></>,
  },
  {
    href: "/informasi",
    icon: <><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></>,
  },
];

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "id";
  const dict = getDictionary(locale);
  const h = dict.home;
  const lh = (href: string) => localizeHref(href, locale);

  const reviewCards = [
    { name: "Google", data: reviews.google, cta: h.ulasan.ctaGoogle },
    { name: "Facebook", data: reviews.facebook, cta: h.ulasan.ctaFacebook },
  ];

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* ============ HERO ============ */}
        <section
          id="beranda"
          className="relative -mt-[72px] overflow-hidden bg-navy pt-[72px] text-white"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #2138e0 0, transparent 45%), radial-gradient(circle at 85% 15%, #0000ff 0, transparent 40%)",
            }}
          />
          <Mark className="pointer-events-none absolute -bottom-24 right-[-4%] h-[36rem] w-[36rem] text-white/[0.045] md:right-[6%]" />
          <div className="ulos-thread absolute inset-x-0 top-[72px] h-1 opacity-40" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:py-28 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="animate-rise">
              <Eyebrow>{h.hero.eyebrow}</Eyebrow>
              <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
                {h.hero.line1}
                <br />
                {h.hero.line2Prefix}{" "}
                <span className="italic text-white/95">HKBP</span>
                <span className="text-mist-200"> Glugur</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
                {h.hero.tagline}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#ibadah"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  {h.hero.ctaJadwal}
                </a>
                <a
                  href="#lokasi"
                  className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {h.hero.ctaLokasi}
                </a>
              </div>
            </div>

            <div className="animate-rise [animation-delay:150ms]">
              <div className="relative rounded-[22px] border border-white/12 bg-white/[0.06] p-8 backdrop-blur-sm">
                <div className="ulos-thread mb-6 h-1 w-16 rounded-full opacity-80" />
                <p className="font-sans text-2xl italic leading-snug text-white sm:text-[1.7rem]">
                  “{church.verse.text}”
                </p>
                <p className="mt-4 text-sm text-white/60">{h.hero.verseRef}</p>

                <div className="mt-8 flex items-center gap-4 rounded-2xl bg-white/[0.06] p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue/20">
                    <Mark className="h-7 w-7 text-white" />
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-white">{h.hero.ibadahMinggu}</p>
                    <p className="text-white/60">{h.hero.ibadahMingguTimes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ STATISTIK ============ */}
        <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-5">
          <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line shadow-[var(--shadow-lift)] md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={i} className="bg-white px-6 py-7 text-center">
                <p className="font-display text-4xl font-semibold text-royal">
                  {s.value}
                </p>
                <p className="mt-1 text-sm font-semibold text-black">
                  {h.stats[i]?.label}
                </p>
                <p className="mt-0.5 text-xs text-black/60">{h.stats[i]?.sub}</p>
              </div>
            ))}
          </Reveal>
        </section>

        {/* ============ SHORTCUT ============ */}
        <section className="mx-auto max-w-6xl px-5 pt-16 md:pt-20">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {shortcutMeta.map((s, i) => (
              <Reveal key={s.href} delay={i * 70}>
                <Link
                  href={lh(s.href)}
                  className="card group flex h-full flex-col gap-3 p-6 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-royal transition-colors group-hover:bg-blue group-hover:text-white">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {s.icon}
                    </svg>
                  </span>
                  <span>
                    <span className="block font-semibold text-black">
                      {h.shortcuts[i]?.title}
                    </span>
                    <span className="mt-0.5 block text-xs text-black/60">
                      {h.shortcuts[i]?.desc}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ TENTANG HKBP ============ */}
        <section id="tentang" className="mx-auto max-w-6xl px-5 py-24 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-mist p-10">
                <Mark className="pointer-events-none absolute -right-6 -bottom-8 h-56 w-56 text-royal/10" />
                <div className="relative flex items-center justify-center py-6">
                  <Image
                    src="/hkbp-logo.webp"
                    alt={h.tentang.logoAlt}
                    title="Logo HKBP"
                    width={200}
                    height={280}
                    className="h-64 w-auto drop-shadow-[0_20px_40px_rgba(0,0,255,0.15)]"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <Eyebrow>{h.tentang.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold text-black sm:text-5xl">
                {h.tentang.heading}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-black/75">
                {h.tentang.p1}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-black/75">
                {h.tentang.p2}
              </p>
              <div className="mt-8">
                <UlosDivider />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ MAKNA LOGO ============ */}
        <section className="bg-white py-24 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal className="mx-auto max-w-2xl text-center">
              <Eyebrow>{h.logo.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold text-black sm:text-5xl">
                {h.logo.heading}
              </h2>
              <p className="mt-5 text-lg text-black/75">{h.logo.intro}</p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {h.logo.items.map((item, i) => (
                <Reveal key={i} delay={i * 90}>
                  <article className="card group h-full p-8 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mist text-royal transition-colors group-hover:bg-blue group-hover:text-white">
                      <Mark className="h-7 w-7" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-black">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-black/70">
                      {item.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ JADWAL IBADAH ============ */}
        <section id="ibadah" className="bg-paper py-24 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal className="max-w-2xl">
              <Eyebrow>{h.ibadah.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold text-black sm:text-5xl">
                {h.ibadah.heading}
              </h2>
              <p className="mt-5 text-lg text-black/75">{h.ibadah.intro}</p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {weeklyServices.map((s, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="card group flex h-full flex-col p-6 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-semibold uppercase tracking-wider text-royal">
                        {h.ibadah.services[i]?.day}
                      </span>
                      <span className="h-2 w-2 mark-cross bg-blue" aria-hidden />
                    </div>
                    <p className="mt-4 font-display text-3xl font-semibold text-black">
                      {s.time}
                    </p>
                    <p className="mt-1 text-base font-semibold text-black">
                      {h.ibadah.services[i]?.title}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-black/65">
                      {h.ibadah.services[i]?.note}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Ibadah raya dan hari besar */}
            <Reveal className="mt-6">
              <div className="rounded-[var(--radius-card)] border border-line bg-white p-8">
                <h3 className="text-lg font-semibold text-black">
                  {h.ibadah.specialHeading}
                </h3>
                <p className="mt-2 text-[15px] text-black/70">
                  {h.ibadah.specialIntro}
                </p>
                <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {specialServices.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl bg-mist px-4 py-2.5"
                    >
                      <span className="h-2 w-2 shrink-0 mark-cross bg-blue" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-black">
                          {h.ibadah.special[i]}
                        </span>
                        <span className="block text-xs text-black/60">
                          {s.tanggal ?? h.ibadah.sesuaiKebutuhan}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-black/50">{h.ibadah.specialNote}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ PELAYANAN ============ */}
        <section id="pelayanan" className="mx-auto max-w-6xl px-5 py-24 md:py-28">
          <Reveal className="max-w-2xl">
            <Eyebrow>{h.pelayanan.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-4xl font-semibold text-black sm:text-5xl">
              {h.pelayanan.heading}
            </h2>
            <p className="mt-5 text-lg text-black/75">{h.pelayanan.intro}</p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {h.pelayanan.items.map((m, i) => (
              <Reveal key={i} delay={(i % 3) * 90}>
                <article className="card flex h-full items-start gap-4 p-6 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <span
                    className="mt-1 h-3 w-3 shrink-0 mark-cross bg-blue"
                    aria-hidden
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-black">{m.name}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-black/70">
                      {m.desc}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ HURIA PAGARAN ============ */}
        <section id="pagaran" className="bg-navy py-24 text-white md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal className="max-w-2xl">
              <Eyebrow>{h.pagaran.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
                {h.pagaran.heading}
              </h2>
              <p className="mt-5 text-lg text-white/75">{h.pagaran.note}</p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {/* Kartu pusat */}
              <Reveal>
                <div className="flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-white/15 bg-white/[0.06] p-7">
                  <div>
                    <span className="inline-block rounded-full bg-blue/25 px-3 py-1 text-xs font-semibold text-white">
                      {h.pagaran.pusatBadge}
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-semibold text-white">
                      {ressort.center}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      {h.pagaran.pusatDesc}
                    </p>
                    <p className="mt-3 flex gap-2 text-sm leading-relaxed text-white/55">
                      <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                      {ressort.centerAlamat}
                    </p>
                  </div>
                  <Mark className="mt-6 h-10 w-10 text-white/40" />
                </div>
              </Reveal>

              {/* Kartu pagaran */}
              {ressort.pagaran.map((p, i) => (
                <Reveal key={p.name} delay={(i + 1) * 90}>
                  <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-white/12 bg-white/[0.04] p-7">
                    <span className="inline-block w-fit rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/80">
                      {h.pagaran.role}
                    </span>
                    <h3 className="mt-4 text-xl font-semibold text-white">
                      {p.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/65">
                      {h.pagaran.desc[i]}
                    </p>
                    <p className="mt-3 flex gap-2 text-sm leading-relaxed text-white/50">
                      <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                      {p.alamat}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SEJARAH ============ */}
        <section id="sejarah" className="bg-mist py-24 md:py-28">
          <div className="mx-auto max-w-4xl px-5">
            <Reveal className="max-w-2xl">
              <Eyebrow>{h.sejarah.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold text-black sm:text-5xl">
                {h.sejarah.heading}
              </h2>
              <p className="mt-5 text-lg text-black/75">{h.sejarah.intro}</p>
            </Reveal>

            <ol className="mt-14 space-y-2">
              {timeline.map((t, i) => (
                <Reveal key={t.year} delay={Math.min(i, 6) * 60} as="li">
                  <div className="group grid grid-cols-[5.5rem_auto] gap-5 sm:grid-cols-[7rem_auto]">
                    {/* Tahun */}
                    <div className="pt-0.5 text-right">
                      <span className="font-display text-xl font-semibold text-royal sm:text-2xl">
                        {t.year}
                      </span>
                    </div>
                    {/* Garis dan konten */}
                    <div className="relative border-l-2 border-mist-200 pb-8 pl-6 last:pb-0">
                      <span className="absolute -left-[7px] top-1 h-3 w-3 mark-cross bg-blue" />
                      <h3 className="text-lg font-semibold text-black">
                        {h.sejarah.items[i]?.title}
                      </h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-black/70">
                        {h.sejarah.items[i]?.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ ULASAN ============ */}
        <section className="bg-white py-24 md:py-28">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal className="mx-auto max-w-2xl text-center">
              <Eyebrow>{h.ulasan.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold text-black sm:text-5xl">
                {h.ulasan.heading}
              </h2>
              <p className="mt-5 text-lg text-black/75">{h.ulasan.intro}</p>
            </Reveal>

            <div className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-2">
              {reviewCards.map((r) => (
                <Reveal key={r.name}>
                  <div className="card flex h-full flex-col items-center p-8 text-center">
                    <span className="text-sm font-semibold uppercase tracking-widest text-royal">
                      {r.name}
                    </span>
                    <p className="mt-3 font-display text-5xl font-semibold text-black">
                      {r.data.rating}
                    </p>
                    <div className="mt-3">
                      <Stars value={r.data.stars} />
                    </div>
                    <p className="mt-2 text-sm text-black/60">
                      {r.data.count} {h.ulasan.count}
                    </p>
                    <a
                      href={withUtm(r.data.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${r.cta} ${h.ulasan.ctaSuffix}`}
                      aria-label={`${r.cta} ${h.ulasan.ctaSuffix}`}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-mist"
                    >
                      {r.cta}
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* CTA ulasan situs, menyatu dengan bagian ulasan */}
            <Reveal className="mx-auto mt-6 max-w-3xl">
              <ReviewCta />
            </Reveal>
          </div>
        </section>

        {/* ============ LOKASI DAN KONTAK ============ */}
        <section id="lokasi" className="mx-auto max-w-6xl px-5 py-24 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <Reveal>
              <Eyebrow>{h.lokasi.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold text-black sm:text-5xl">
                {h.lokasi.heading}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-black/75">
                {h.lokasi.intro}
              </p>

              <dl className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mist text-royal">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </span>
                  <div>
                    <dt className="text-sm font-semibold text-black">
                      {h.lokasi.alamat}
                    </dt>
                    <dd className="mt-1 text-[15px] leading-relaxed text-black/75">
                      {church.address.street}, {church.address.area},{" "}
                      {church.address.city}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mist text-royal">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
                  </span>
                  <div>
                    <dt className="text-sm font-semibold text-black">
                      {h.lokasi.telepon}
                    </dt>
                    <dd className="mt-1 text-[15px] leading-relaxed">
                      <a
                        href={`tel:${church.contact.phoneLink}`}
                        className="text-royal underline-offset-2 hover:underline"
                      >
                        {church.contact.phone}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mist text-royal">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                  </span>
                  <div>
                    <dt className="text-sm font-semibold text-black">
                      {h.lokasi.emailSosial}
                    </dt>
                    <dd className="mt-1 space-y-1 text-[15px] leading-relaxed">
                      <a
                        href={`mailto:${church.contact.email}`}
                        className="block text-royal underline-offset-2 hover:underline"
                      >
                        {church.contact.email}
                      </a>
                      <a
                        href={withUtm(church.contact.facebook)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-royal underline-offset-2 hover:underline"
                      >
                        {church.contact.facebookLabel}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>

              <a
                href={withUtm(church.address.maps)}
                target="_blank"
                rel="noopener noreferrer"
                title={h.lokasi.mapsTitle}
                aria-label={h.lokasi.mapsAria}
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-royal px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_-12px_rgba(33,56,224,0.8)] transition-transform hover:-translate-y-0.5"
              >
                {h.lokasi.bukaMaps}
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>
              </a>
            </Reveal>

            <Reveal delay={100}>
              <div className="overflow-hidden rounded-[var(--radius-card)] border border-line shadow-[var(--shadow-soft)]">
                <iframe
                  src={church.address.embed}
                  title={h.lokasi.mapTitle}
                  className="h-[380px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
