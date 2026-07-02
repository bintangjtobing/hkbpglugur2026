import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Mark } from "@/components/Mark";
import { withUtm } from "@/lib/utm";

export const metadata: Metadata = {
  title: "Sejarah HKBP Glugur",
  description:
    "Kisah perjalanan HKBP Glugur di Glugur Darat, Medan, dari akar HKBP di Tanah Batak sampai menjadi pusat Ressort Medan Utara, Distrik X Medan Aceh.",
  alternates: { canonical: "/sejarah-hkbp-glugur" },
};

const sources = [
  { label: "Portal resmi HKBP, halaman Huria Glugur", url: "https://hkbp.or.id/huria/cmmnek7v601t40otd9dqakszr" },
  { label: "Utamanews, Jemaat HKBP Glugur Medan Undang Nikson Nababan (9 Juni 2024)", url: "https://utamanews.com/sosial-budaya/Jemaat-HKBP-Glugur-Medan-Undang-Nikson-Nababan" },
  { label: "Portal resmi HKBP, Tentang HKBP", url: "https://hkbp.or.id/tentang" },
  { label: "Detik, Mengenang 164 Tahun Berdirinya HKBP", url: "https://www.detik.com/sumut/budaya/d-8149631/mengenang-164-tahun-berdirinya-huria-kristen-batak-protestan-hkbp" },
  { label: "Tribun Medan, Sejarah HKBP mulai 7 Oktober 1861", url: "https://medan.tribunnews.com/2019/10/07/sejarah-hkbp-mulai-7-oktober-1861-dan-menjadi-organisasi-kristen-protestan-terbesar-di-indonesia" },
  { label: "BatakPedia, Sejarah HKBP", url: "https://batakpedia.org/hkbp/sejarah-hkbp/" },
];

export default function SejarahGlugurPage() {
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
              Sejarah
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              Sejarah HKBP Glugur
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/75">
              Perjalanan sebuah huria di Glugur Darat, dari akar iman di Tanah
              Batak sampai menjadi pusat pelayanan Ressort Medan Utara.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-white/55">
              <span>Redaksi HKBP Glugur</span>
              <span>Bacaan sekitar 5 menit</span>
            </div>
          </div>
        </section>

        {/* Isi artikel */}
        <article className="mx-auto max-w-2xl px-5 py-16 md:py-20">
          <Reveal>
            <p className="text-[17px] leading-relaxed text-black/80 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.8] first-letter:text-royal">
              HKBP Glugur berdiri di Glugur Darat, salah satu kawasan tua Kota
              Medan. Gereja ini bukan sekadar tempat ibadah. Ia adalah rumah
              bagi ribuan jemaat Batak yang tumbuh bersama di tengah kota, dan
              menjadi pusat pelayanan Ressort Medan Utara, Distrik X Medan Aceh.
            </p>
          </Reveal>

          <div className="mt-10 space-y-10">
            <Reveal>
              <section>
                <h2 className="font-display text-2xl font-semibold text-black">
                  Akar dari Tanah Batak
                </h2>
                <p className="mt-4 text-[17px] leading-relaxed text-black/80">
                  Kisah HKBP Glugur tidak bisa dilepaskan dari akar besar Huria
                  Kristen Batak Protestan. HKBP lahir pada 7 Oktober 1861 di
                  Pearaja, Tarutung. Dari sana, lewat pelayanan Ingwer Ludwig
                  Nommensen yang dikenang sebagai Apostel Batak, Injil menyebar
                  ke seluruh Tanah Batak. HKBP kemudian tumbuh menjadi gereja
                  Kristen Protestan terbesar di Asia Tenggara.
                </p>
                <p className="mt-4 text-[17px] leading-relaxed text-black/80">
                  Seiring perpindahan masyarakat Batak ke kota, iman itu ikut
                  bergerak. Medan menjadi salah satu pusat pertumbuhan jemaat
                  HKBP di perantauan, dan Glugur Darat menjadi salah satu titik
                  penting persekutuan itu.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <figure className="rounded-[var(--radius-card)] border border-line bg-mist p-8 text-center">
                <blockquote className="font-display text-xl font-semibold leading-snug text-black sm:text-2xl">
                  Marsiurupan ma hamu di na porsuk. Bertolong-tolonganlah kamu
                  menanggung bebanmu.
                </blockquote>
                <figcaption className="mt-3 text-sm font-semibold uppercase tracking-widest text-royal">
                  Galatia 6:2
                </figcaption>
              </figure>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="font-display text-2xl font-semibold text-black">
                  Bertumbuh di Glugur Darat
                </h2>
                <p className="mt-4 text-[17px] leading-relaxed text-black/80">
                  HKBP Glugur berdiri di Jl. Pembangunan III No.57A, Glugur
                  Darat II, Kecamatan Medan Timur. Dari tahun ke tahun jemaatnya
                  bertambah seiring berkembangnya kawasan ini. Gereja tumbuh
                  menjadi huria yang matang dan mapan, dengan pelayanan yang
                  menjangkau banyak keluarga.
                </p>
                <p className="mt-4 text-[17px] leading-relaxed text-black/80">
                  Hari ini HKBP Glugur menaungi 16 lingkungan dengan 47 Sintua
                  yang melayani. Angka ini menunjukkan sebuah persekutuan yang
                  besar dan tertata, tempat ibadah, pembinaan, dan diakonia
                  berjalan berdampingan.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="font-display text-2xl font-semibold text-black">
                  Menjadi Pusat Ressort Medan Utara
                </h2>
                <p className="mt-4 text-[17px] leading-relaxed text-black/80">
                  HKBP Glugur dipercaya menjadi pusat Ressort Medan Utara. Di
                  bawah naungan yang sama, tiga huria pagaran ikut melayani,
                  yaitu HKBP Pulo Brayan di kawasan Pulo Brayan, HKBP Marturia di
                  Tanjung Mulia, dan HKBP Pardomuan Nauli di Titi Papan. Bersama
                  gereja induk, mereka membentuk satu keluarga pelayanan di
                  Distrik X Medan Aceh.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="font-display text-2xl font-semibold text-black">
                  Pelayanan dan Kepemimpinan Hari Ini
                </h2>
                <p className="mt-4 text-[17px] leading-relaxed text-black/80">
                  Pelayanan jemaat dipimpin oleh Pimpinan Jemaat Ronni E.
                  Silitonga bersama Pendeta Fungsional Rosnila Nellawaty
                  Sihombing. Kehidupan gereja ditopang oleh para Sintua dan
                  beragam wadah pelayanan, dari Sekolah Minggu, Naposobulung,
                  Punguan Ina dan Ama, paduan suara, sampai diakonia sosial.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="font-display text-2xl font-semibold text-black">
                  Jemaat yang Hidup
                </h2>
                <p className="mt-4 text-[17px] leading-relaxed text-black/80">
                  Semangat kebersamaan jemaat terlihat jelas pada Minggu, 9 Juni
                  2024. HKBP Glugur menggelar pesta penggalangan dana untuk
                  renovasi aula dan gereja, sekaligus turut merayakan ulang tahun
                  ke-68 HKBP di Medan. Ribuan jemaat hadir. Acara ditutup dengan
                  pemberian ulos, makan bersama, dan lelang donasi untuk
                  pembangunan fasilitas gereja.
                </p>
                <p className="mt-4 text-[17px] leading-relaxed text-black/80">
                  Momen seperti ini menunjukkan bahwa HKBP Glugur bukan sekadar
                  bangunan, melainkan persekutuan yang bergerak, bergotong
                  royong, dan menjaga warisan iman.
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section>
                <h2 className="font-display text-2xl font-semibold text-black">
                  Melangkah ke Masa Depan
                </h2>
                <p className="mt-4 text-[17px] leading-relaxed text-black/80">
                  Selaras dengan tema HKBP 2024 sampai 2028, yaitu Transformasi
                  berdasarkan Roma 12:2, HKBP Glugur terus memperbarui diri.
                  Kehadiran situs ini menjadi salah satu langkah kecil itu,
                  supaya informasi, jadwal ibadah, warta, dan pelayanan mudah
                  dijangkau siapa saja.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-black/60">
                  Catatan: sebagian catatan sejarah awal jemaat masih tersimpan
                  dalam ingatan dan dokumen gereja. Untuk data pendirian yang
                  rinci, kami sarankan menghubungi kantor gereja di (061)
                  6611846.
                </p>
              </section>
            </Reveal>

            {/* Referensi */}
            <Reveal>
              <section className="border-t border-line pt-8">
                <h2 className="font-display text-xl font-semibold text-black">
                  Sumber dan Referensi
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
