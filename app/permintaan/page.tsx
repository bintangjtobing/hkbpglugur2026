import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { RequestForm } from "@/components/RequestForm";

export const metadata: Metadata = {
  title: "Permintaan Perbaikan Konten",
  description:
    "Kirim permintaan perbaikan atau penambahan konten, artikel, dan informasi di situs HKBP Glugur. Sertakan lampiran bila perlu.",
  alternates: { canonical: "/permintaan" },
  robots: { index: false, follow: true },
};

export default function PermintaanPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageBanner
          eyebrow="Permintaan Perbaikan"
          title="Bantu kami menjaga informasi tetap akurat"
          desc="Ada konten, artikel, atau data yang perlu diperbaiki atau ditambah? Kirim lewat formulir ini. Tim kami akan meninjaunya."
        />
        <section className="mx-auto max-w-3xl px-5 py-16 md:py-20">
          <RequestForm />
          <p className="mt-6 text-sm text-black/55">
            Pesan Anda dikirim ke pengelola situs untuk ditinjau. Kami dapat
            menghubungi Anda kembali melalui email atau telepon yang diisi.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
