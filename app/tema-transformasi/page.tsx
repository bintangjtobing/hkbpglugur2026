import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Tahun Transformasi HKBP 2024 sampai 2028",
  description:
    "Penjelasan tema Transformasi HKBP 2024 sampai 2028 berdasarkan Roma 12:2, makna logo, tiga pendekatan utama, serta visi dan misi HKBP.",
  alternates: { canonical: "/tema-transformasi" },
};

const logoMakna = [
  {
    title: "Infinity Loop",
    body: "Putaran tak berhingga menandai semangat Ekklesia Reformata Semper Reformanda. Gereja terus diperbarui tanpa henti.",
  },
  {
    title: "Kupu-Kupu",
    body: "Metamorfosis kupu-kupu menggambarkan perjalanan transformasi. Perubahan yang mendasar dan bertumbuh.",
  },
  {
    title: "Empat Lingkaran",
    body: "Empat elemen dasar pembentuk logo mewakili empat elemen perubahan: karakter, janji, kultur, dan kemampuan.",
  },
  {
    title: "Salib di Pusat",
    body: "Salib menjadi pengunci. Transformasi tidak menyimpang dari ajaran Kristus dalam setiap pelayanan HKBP.",
  },
  {
    title: "Tiga Garis Penopang",
    body: "Tiga tugas panggilan gereja: bersekutu (koinonia), bersaksi (marturia), dan melayani (diakonia).",
  },
  {
    title: "Warna Ungu dan Biru",
    body: "Ungu melambangkan pertobatan, transformasi, kehormatan, dan kemuliaan. Biru menegaskan identitas HKBP.",
  },
];

const pendekatan = [
  {
    no: "01",
    title: "Disiplin Rohani",
    body: "Landasan bagi setiap orang untuk memahami dengan jernih kehendak Tuhan.",
  },
  {
    no: "02",
    title: "Kesatuan Pelayan",
    body: "Semangat kesatuan di antara para pelayan HKBP menjadi kunci transformasi.",
  },
  {
    no: "03",
    title: "Jemaat Visioner",
    body: "Jemaat bukan hanya objek pelayanan, tetapi subjek yang aktif melayani.",
  },
];

export default function TemaTransformasiPage() {
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
                Tema HKBP 2024 sampai 2028
              </span>
              <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                Tahun Transformasi HKBP
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
                Berubahlah oleh pembaruan budimu. Sebuah panggilan untuk
                bertumbuh, diperbarui, dan menjadi berkat bagi dunia.
              </p>
            </div>
            <Reveal className="justify-self-center lg:justify-self-end">
              <div className="rounded-3xl bg-white p-6 shadow-2xl">
                <Image
                  src="/theme-transformasi.webp"
                  alt="Logo Tahun Transformasi HKBP 2024 sampai 2028, Roma 12:2"
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
                “Janganlah kamu menjadi serupa dengan dunia ini, tetapi
                berubahlah oleh pembaruan budimu.”
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold uppercase tracking-widest text-royal">
                Roma 12:2
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* Apa itu transformasi */}
        <section className="mx-auto max-w-4xl px-5 pb-16 md:pb-20">
          <Reveal>
            <h2 className="text-3xl font-semibold text-black sm:text-4xl">
              Apa itu Tahun Transformasi
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-black/75">
              <p>
                Tahun Transformasi adalah keputusan Sinode Godang 2024 dalam
                Rencana Strategis HKBP 2024 sampai 2028. Temanya diambil dari
                Roma 12:2, yaitu ajakan untuk berubah oleh pembaruan budi.
              </p>
              <p>
                Kata transformasi berasal dari bahasa Yunani metamorphoo, yang
                berarti metamorfosis. Transformasi rohani bukan sekadar
                perubahan perilaku. Ini pembaruan cara berpikir agar kita
                mengerti kehendak Allah yang baik dan sempurna.
              </p>
              <p>
                Melalui transformasi, HKBP mau menjadi gereja yang lebih
                berenergi, bergerak lebih lincah, lebih baik, lebih indah, dan
                menjadi berkat bagi dunia.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Makna logo */}
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-5">
            <Reveal className="max-w-2xl">
              <span className="eyebrow inline-flex items-center gap-2 text-[#7c3aed]">
                <span className="h-1.5 w-1.5 mark-cross bg-[#7c3aed]" />
                Makna Logo
              </span>
              <h2 className="mt-3 text-3xl font-semibold text-black sm:text-4xl">
                Filosofi di balik lambang
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {logoMakna.map((m, i) => (
                <Reveal key={m.title} delay={(i % 3) * 80}>
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
              Tiga Pendekatan
            </span>
            <h2 className="mt-3 text-3xl font-semibold text-black sm:text-4xl">
              Jalan menuju transformasi
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {pendekatan.map((p, i) => (
              <Reveal key={p.no} delay={i * 90}>
                <article className="card h-full p-8">
                  <span className="font-display text-3xl font-semibold text-royal/70">
                    {p.no}
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
                <p className="eyebrow text-mist-200">Visi HKBP</p>
                <p className="mt-4 font-display text-2xl font-semibold leading-snug">
                  Menjadi berkat bagi dunia.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-[var(--radius-card)] border border-white/12 bg-white/[0.05] p-8">
                <p className="eyebrow text-mist-200">Misi HKBP</p>
                <p className="mt-4 font-display text-2xl font-semibold leading-snug">
                  Menjadikan murid Kristus pelaku Firman.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-12">
          <p className="text-sm text-black/50">
            Sumber: portal resmi HKBP (hkbp.or.id) dan Buku Panduan Tahun
            Transformasi HKBP 2025.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
