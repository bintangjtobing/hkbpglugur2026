import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Buku Digital: Alkitab dan Nyanyian",
  description:
    "Baca Alkitab (Terjemahan Baru, Terjemahan Lama, Batak Toba), Buku Ende, dan Kidung Jemaat langsung dari situs HKBP Glugur.",
  alternates: { canonical: "/buku" },
};

const books = [
  {
    href: "/buku/alkitab",
    name: "Alkitab",
    desc: "Baca firman Tuhan dalam Terjemahan Baru, Terjemahan Lama, dan Batak Toba.",
    meta: "66 kitab, 3 versi",
  },
  {
    href: "/buku/buku-ende",
    name: "Buku Ende",
    desc: "Kumpulan nyanyian jemaat berbahasa Batak Toba untuk ibadah dan doa.",
    meta: "535 lagu",
  },
  {
    href: "/buku/kidung-jemaat",
    name: "Kidung Jemaat",
    desc: "Himpunan lagu pujian berbahasa Indonesia yang biasa dipakai dalam ibadah.",
    meta: "502 lagu",
  },
];

export default function BukuPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageBanner
          eyebrow="Buku Digital"
          title="Firman dan pujian dalam genggaman"
          desc="Baca Alkitab dan nyanyikan pujian langsung dari situs. Terbuka untuk semua jemaat, kapan saja."
        />

        <section className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <div className="grid gap-5 md:grid-cols-3">
            {books.map((b, i) => (
              <Reveal key={b.href} delay={i * 90}>
                <Link
                  href={b.href}
                  className="card group flex h-full flex-col p-8 transition-transform hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-royal">
                    {b.meta}
                  </span>
                  <h2 className="mt-3 font-display text-2xl font-semibold text-black">
                    {b.name}
                  </h2>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-black/70">
                    {b.desc}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-royal">
                    Buka
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
