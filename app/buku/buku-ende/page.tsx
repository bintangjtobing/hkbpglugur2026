import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { HymnReader } from "@/components/HymnReader";

export const metadata: Metadata = {
  title: "Buku Ende HKBP Online",
  description:
    "Baca lirik Buku Ende HKBP berbahasa Batak Toba. Cari lagu berdasarkan nomor atau judul di situs HKBP Glugur.",
  alternates: { canonical: "/buku/buku-ende" },
};

export default function BukuEndePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageBanner
          eyebrow="Buku Digital"
          title="Buku Ende"
          desc="Nyanyian jemaat berbahasa Batak Toba. Cari berdasarkan nomor atau judul."
        />
        <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="mb-10 max-w-3xl space-y-4 text-[16px] leading-relaxed text-black/75">
            <p>
              Buku Ende adalah kumpulan nyanyian jemaat HKBP berbahasa Batak
              Toba yang dipakai dalam ibadah dan persekutuan. Di halaman ini
              tersedia 535 lagu yang bisa Anda cari berdasarkan nomor atau judul.
            </p>
            <p>
              Pilih sebuah lagu untuk membaca liriknya bait demi bait. Berguna
              untuk mengiringi kebaktian Minggu, partangiangan sektor, latihan
              paduan suara, dan ibadah keluarga di rumah.
            </p>
          </div>
          <HymnReader dataUrl="/data/buku-ende.json" prefix="BE" />
          <p className="mt-6 text-sm text-black/50">
            Sumber lirik: dataset publik Buku Ende HKBP.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
