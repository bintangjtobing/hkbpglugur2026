import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { BibleReader } from "@/components/BibleReader";

export const metadata: Metadata = {
  title: "Baca Alkitab: TB, TL, Batak Toba",
  description:
    "Baca Alkitab online dalam Terjemahan Baru, Terjemahan Lama, dan Batak Toba. Pilih kitab dan pasal langsung di situs HKBP Glugur.",
  alternates: { canonical: "/buku/alkitab" },
};

export default function AlkitabPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageBanner
          eyebrow="Buku Digital"
          title="Alkitab"
          desc="Pilih versi, kitab, dan pasal untuk membaca firman Tuhan."
        />
        <section className="mx-auto max-w-4xl px-5 py-16 md:py-20">
          <div className="mb-10 space-y-4 text-[16px] leading-relaxed text-black/75">
            <p>
              Baca Alkitab lengkap langsung di situs HKBP Glugur. Tersedia tiga
              versi, yaitu Terjemahan Baru (TB), Terjemahan Lama (TL), dan
              Alkitab Batak Toba. Pilih versi sesuai kebutuhan Anda.
            </p>
            <p>
              Anda bisa memilih kitab dan pasal dari daftar, atau mengetik
              referensi seperti Yohanes 3:16 pada kotak pencarian untuk langsung
              menuju ayat. Seluruh 66 kitab Perjanjian Lama dan Perjanjian Baru
              dapat dibaca gratis. Cocok untuk persiapan ibadah, saat teduh
              pribadi, ibadah keluarga, dan pendalaman Alkitab bersama.
            </p>
          </div>
          <BibleReader />
          <p className="mt-6 text-sm text-black/50">
            Sumber teks: API Alkitab SABDA (alkitab.sabda.org).
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
