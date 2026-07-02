import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { WartaViewer } from "@/components/WartaViewer";
import { WartaUploadForm } from "@/components/WartaUploadForm";

export const metadata: Metadata = {
  title: "Warta Tata Ibadah",
  description:
    "Baca dan unduh Warta Tata Ibadah HKBP Glugur dalam bentuk PDF. Pengurus gereja dapat mengirim warta untuk diverifikasi dan dipublikasikan.",
  alternates: { canonical: "/warta" },
};

export default function WartaPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageBanner
          eyebrow="Ibadah"
          title="Warta Tata Ibadah"
          desc="Baca dan unduh warta serta tata ibadah HKBP Glugur setiap minggu dalam bentuk PDF."
        />

        <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <WartaViewer />
        </section>

        {/* Kirim warta */}
        <section className="bg-mist py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-5">
            <Reveal>
              <span className="eyebrow inline-flex items-center gap-2 text-royal">
                <span className="h-1.5 w-1.5 mark-cross bg-blue" />
                Kirim Warta
              </span>
              <h2 className="mt-4 text-3xl font-semibold text-black sm:text-4xl">
                Kirim warta untuk dipublikasikan
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-black/75">
                Pengurus gereja atau jemaat dapat mengirim warta tata ibadah di
                sini. Tim kami akan memverifikasi, lalu mengunggah versi rapinya
                ke halaman ini.
              </p>
            </Reveal>
            <div className="mt-8">
              <WartaUploadForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
