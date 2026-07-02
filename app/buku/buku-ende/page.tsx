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
