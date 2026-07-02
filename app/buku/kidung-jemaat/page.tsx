import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { HymnReader } from "@/components/HymnReader";

export const metadata: Metadata = {
  title: "Kidung Jemaat Online",
  description:
    "Baca lirik Kidung Jemaat berbahasa Indonesia. Cari lagu berdasarkan nomor atau judul di situs HKBP Glugur.",
  alternates: { canonical: "/buku/kidung-jemaat" },
};

export default function KidungJemaatPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageBanner
          eyebrow="Buku Digital"
          title="Kidung Jemaat"
          desc="Lagu pujian berbahasa Indonesia. Cari berdasarkan nomor atau judul."
        />
        <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <div className="mb-10 max-w-3xl space-y-4 text-[16px] leading-relaxed text-black/75">
            <p>
              Kidung Jemaat adalah himpunan lagu pujian berbahasa Indonesia yang
              umum dipakai dalam ibadah gereja. Di halaman ini tersedia 502 lagu
              yang bisa Anda cari berdasarkan nomor atau judul.
            </p>
            <p>
              Pilih sebuah lagu untuk membaca liriknya bait demi bait. Cocok
              untuk ibadah Minggu, sekolah minggu, ibadah keluarga, dan latihan
              paduan suara.
            </p>
          </div>
          <HymnReader dataUrl="/data/kidung-jemaat.json" prefix="KJ" />
          <p className="mt-6 text-sm text-black/50">
            Sumber lirik: dataset publik Kidung Jemaat.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
