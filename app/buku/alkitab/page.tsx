import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { BibleReader } from "@/components/BibleReader";

export const metadata: Metadata = {
  title: "Baca Alkitab Online: TB, TL, dan Batak Toba",
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
