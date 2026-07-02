import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { UlosDivider } from "@/components/UlosDivider";
import { Mark } from "@/components/Mark";
import { withUtm } from "@/lib/utm";
import {
  church,
  weeklyServices,
  specialServices,
  stats,
  ressort,
  logoMeaning,
  ministries,
  timeline,
  reviews,
} from "@/lib/content";

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

export default function Home() {
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
              <Eyebrow>{church.distrik} · Kota Medan</Eyebrow>
              <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Selamat datang
                <br />
                di <span className="italic text-white/95">HKBP</span>
                <span className="text-mist-200"> Glugur</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
                {church.tagline} Kami bagian dari Huria Kristen Batak Protestan,
                gereja Protestan terbesar di Asia Tenggara sejak 1861.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#ibadah"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  Lihat Jadwal Ibadah
                </a>
                <a
                  href="#lokasi"
                  className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Petunjuk Lokasi
                </a>
              </div>
            </div>

            <div className="animate-rise [animation-delay:150ms]">
              <div className="relative rounded-[22px] border border-white/12 bg-white/[0.06] p-8 backdrop-blur-sm">
                <div className="ulos-thread mb-6 h-1 w-16 rounded-full opacity-80" />
                <p className="font-sans text-2xl italic leading-snug text-white sm:text-[1.7rem]">
                  “{church.verse.text}”
                </p>
                <p className="mt-4 text-sm text-white/60">{church.verse.ref}</p>

                <div className="mt-8 flex items-center gap-4 rounded-2xl bg-white/[0.06] p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue/20">
                    <Mark className="h-7 w-7 text-white" />
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-white">Ibadah Minggu</p>
                    <p className="text-white/60">07.45, 10.00, dan 17.00 WIB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ STATISTIK ============ */}
        <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-5">
          <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line shadow-[var(--shadow-lift)] md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white px-6 py-7 text-center">
                <p className="font-display text-4xl font-semibold text-royal">
                  {s.value}
                </p>
                <p className="mt-1 text-sm font-semibold text-black">{s.label}</p>
                <p className="mt-0.5 text-xs text-black/60">{s.sub}</p>
              </div>
            ))}
          </Reveal>
        </section>

        {/* ============ SHORTCUT ============ */}
        <section className="mx-auto max-w-6xl px-5 pt-16 md:pt-20">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              {
                href: "/buku/alkitab",
                title: "Alkitab",
                desc: "TB, TL, Batak Toba",
                icon: (
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
                ),
              },
              {
                href: "/buku/buku-ende",
                title: "Buku Ende",
                desc: "Nyanyian Batak Toba",
                icon: <path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />,
              },
              {
                href: "/buku/kidung-jemaat",
                title: "Kidung Jemaat",
                desc: "Lagu pujian Indonesia",
                icon: <path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />,
              },
              {
                href: "/warta",
                title: "Tata Ibadah",
                desc: "Warta ibadah mingguan",
                icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h4" /></>,
              },
              {
                href: "/informasi",
                title: "Informasi",
                desc: "Persembahan & layanan",
                icon: <><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></>,
              },
            ].map((s, i) => (
              <Reveal key={s.href} delay={i * 70}>
                <Link
                  href={s.href}
                  className="card group flex h-full flex-col gap-3 p-6 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-royal transition-colors group-hover:bg-blue group-hover:text-white">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {s.icon}
                    </svg>
                  </span>
                  <span>
                    <span className="block font-semibold text-black">{s.title}</span>
                    <span className="mt-0.5 block text-xs text-black/60">{s.desc}</span>
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
                    alt="Logo resmi HKBP dengan salib, lingkaran Trinitas, dan tulisan HKBP"
                    title="Logo HKBP"
                    width={200}
                    height={280}
                    className="h-64 w-auto drop-shadow-[0_20px_40px_rgba(0,0,255,0.15)]"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <Eyebrow>Tentang Kami</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold text-black sm:text-5xl">
                Gereja Batak yang berakar pada Injil
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-black/75">
                <strong className="text-black">
                  Huria Kristen Batak Protestan
                </strong>{" "}
                (HKBP) berdiri pada 7 Oktober 1861 di Pearaja, Tarutung. Dari
                Tanah Batak, gereja ini tumbuh menjadi gereja Kristen Protestan
                terbesar di Asia Tenggara.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-black/75">
                <strong className="text-black">HKBP Glugur</strong> melayani
                jemaat di Glugur Darat, Medan. Gereja ini menjadi pusat{" "}
                {church.ressort}, {church.distrik}.
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
              <Eyebrow>Makna Lambang</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold text-black sm:text-5xl">
                Setiap garis menuturkan iman
              </h2>
              <p className="mt-5 text-lg text-black/75">
                Lambang HKBP merangkum inti keyakinan gereja. Kristus adalah
                Kepala Gereja yang berkuasa atas dunia.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {logoMeaning.map((item, i) => (
                <Reveal key={item.title} delay={i * 90}>
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
              <Eyebrow>Jadwal Kebaktian</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold text-black sm:text-5xl">
                Mari beribadah bersama
              </h2>
              <p className="mt-5 text-lg text-black/75">
                Pintu gereja terbuka untuk setiap jemaat dan tamu. Berikut
                jadwal ibadah rutin sepanjang pekan.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {weeklyServices.map((s, i) => (
                <Reveal key={s.title + s.time} delay={i * 80}>
                  <div className="card group flex h-full flex-col p-6 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-semibold uppercase tracking-wider text-royal">
                        {s.day}
                      </span>
                      <span className="h-2 w-2 mark-cross bg-blue" aria-hidden />
                    </div>
                    <p className="mt-4 font-display text-3xl font-semibold text-black">
                      {s.time}
                    </p>
                    <p className="mt-1 text-base font-semibold text-black">
                      {s.title}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-black/65">
                      {s.note}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Ibadah raya dan hari besar */}
            <Reveal className="mt-6">
              <div className="rounded-[var(--radius-card)] border border-line bg-white p-8">
                <h3 className="text-lg font-semibold text-black">
                  Ibadah Raya dan Hari Besar Gerejawi
                </h3>
                <p className="mt-2 text-[15px] text-black/70">
                  Kami juga menyelenggarakan ibadah pada perayaan besar Kristen
                  Protestan sepanjang tahun.
                </p>
                <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {specialServices.map((s) => (
                    <div
                      key={s.name}
                      className="flex items-center gap-3 rounded-xl bg-mist px-4 py-2.5"
                    >
                      <span className="h-2 w-2 shrink-0 mark-cross bg-blue" />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-black">
                          {s.name}
                        </span>
                        <span className="block text-xs text-black/60">
                          {s.tanggal}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-black/50">
                  Tanggal hari besar yang berpindah mengikuti kalender gerejawi
                  tahunan.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ PELAYANAN ============ */}
        <section id="pelayanan" className="mx-auto max-w-6xl px-5 py-24 md:py-28">
          <Reveal className="max-w-2xl">
            <Eyebrow>Pelayanan dan Kategorial</Eyebrow>
            <h2 className="mt-4 text-4xl font-semibold text-black sm:text-5xl">
              Bertumbuh dalam persekutuan
            </h2>
            <p className="mt-5 text-lg text-black/75">
              Setiap wadah pelayanan menemani jemaat di tiap tahap kehidupan,
              dari anak sampai orang tua.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ministries.map((m, i) => (
              <Reveal key={m.name} delay={(i % 3) * 90}>
                <article className="card flex h-full items-start gap-4 p-6 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <span
                    className="mt-1 h-3 w-3 shrink-0 mark-cross bg-blue"
                    aria-hidden
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-black">
                      {m.name}
                    </h3>
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
              <Eyebrow>Ressort Medan Utara</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
                Satu ressort, satu keluarga
              </h2>
              <p className="mt-5 text-lg text-white/75">{ressort.note}</p>
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {/* Kartu pusat */}
              <Reveal>
                <div className="flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-white/15 bg-white/[0.06] p-7">
                  <div>
                    <span className="inline-block rounded-full bg-blue/25 px-3 py-1 text-xs font-semibold text-white">
                      Gereja Pusat
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-semibold text-white">
                      {ressort.center}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      Pusat pelayanan Ressort Medan Utara di bawah{" "}
                      {ressort.distrik}.
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
                      {p.role}
                    </span>
                    <h3 className="mt-4 text-xl font-semibold text-white">
                      {p.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/65">
                      {p.desc}
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
              <Eyebrow>Warisan Iman</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold text-black sm:text-5xl">
                Jejak perjalanan HKBP
              </h2>
              <p className="mt-5 text-lg text-black/75">
                Perjalanan iman ini dimulai dari pekabaran Injil di Tanah Batak
                sampai HKBP hadir di Kota Medan.
              </p>
            </Reveal>

            <ol className="mt-14 space-y-2">
              {timeline.map((t, i) => (
                <Reveal key={t.title} delay={Math.min(i, 6) * 60} as="li">
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
                        {t.title}
                      </h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-black/70">
                        {t.body}
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
              <Eyebrow>Ulasan Jemaat</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold text-black sm:text-5xl">
                Dipercaya jemaat dan tamu
              </h2>
              <p className="mt-5 text-lg text-black/75">
                Terima kasih atas dukungan Anda. Bagikan pengalaman Anda beribadah
                di HKBP Glugur.
              </p>
            </Reveal>

            <div className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-2">
              {[
                { name: "Google", data: reviews.google, cta: "Ulas di Google" },
                { name: "Facebook", data: reviews.facebook, cta: "Ulas di Facebook" },
              ].map((r) => (
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
                      {r.data.count} ulasan
                    </p>
                    <a
                      href={withUtm(r.data.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${r.cta} untuk HKBP Glugur`}
                      aria-label={`${r.cta} untuk HKBP Glugur`}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-mist"
                    >
                      {r.cta}
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ LOKASI DAN KONTAK ============ */}
        <section id="lokasi" className="mx-auto max-w-6xl px-5 py-24 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <Reveal>
              <Eyebrow>Lokasi dan Kontak</Eyebrow>
              <h2 className="mt-4 text-4xl font-semibold text-black sm:text-5xl">
                Kunjungi rumah kami
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-black/75">
                Kami menyambut kedatangan Anda untuk beribadah dan bersekutu
                bersama.
              </p>

              <dl className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mist text-royal">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </span>
                  <div>
                    <dt className="text-sm font-semibold text-black">Alamat</dt>
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
                    <dt className="text-sm font-semibold text-black">Telepon</dt>
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
                      Email dan Media Sosial
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
                title="Lokasi HKBP Glugur di Google Maps"
                aria-label="Buka lokasi HKBP Glugur di Google Maps"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-royal px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_-12px_rgba(33,56,224,0.8)] transition-transform hover:-translate-y-0.5"
              >
                Buka di Google Maps
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>
              </a>
            </Reveal>

            <Reveal delay={100}>
              <div className="overflow-hidden rounded-[var(--radius-card)] border border-line shadow-[var(--shadow-soft)]">
                <iframe
                  src={church.address.embed}
                  title="Peta lokasi HKBP Glugur"
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
