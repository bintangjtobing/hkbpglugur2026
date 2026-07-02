import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { church } from "@/lib/content";
import {
  persembahan,
  tarifItems,
  tarifKetentuan,
  tarifTahun,
  adminPernikahan,
} from "@/lib/info";

export const metadata: Metadata = {
  title: "Informasi Jemaat: Layanan dan Tarif",
  description:
    "Rekening persembahan HKBP Glugur, tarif pemakaian fasilitas gereja, serta syarat administrasi pertunangan dan pernikahan.",
  alternates: { canonical: "/informasi" },
};

export default function InformasiPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageBanner
          eyebrow="Informasi Jemaat"
          title="Layanan dan ketentuan jemaat"
          desc="Panduan persembahan, tarif pemakaian fasilitas, dan syarat administrasi pernikahan di HKBP Glugur."
        />

        <div className="mx-auto max-w-4xl space-y-20 px-5 py-20 md:py-24">
          {/* ===== PERSEMBAHAN ===== */}
          <section id="persembahan" className="scroll-mt-24">
            <Reveal>
              <span className="eyebrow inline-flex items-center gap-2 text-royal">
                <span className="h-1.5 w-1.5 mark-cross bg-blue" />
                Persembahan
              </span>
              <h2 className="mt-4 text-3xl font-semibold text-black sm:text-4xl">
                Dukung pelayanan gereja
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-black/75">
                {persembahan.note}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-line bg-navy text-white shadow-[var(--shadow-soft)]">
                <div className="ulos-thread h-1 w-full opacity-40" />
                <div className="grid gap-6 p-8 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-mist-200">
                      Bank
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {persembahan.bank}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-mist-200">
                      Nomor Rekening
                    </p>
                    <p className="mt-2 font-display text-2xl font-semibold tracking-wide text-white">
                      {persembahan.accountNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-mist-200">
                      Atas Nama
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {persembahan.accountName}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* ===== TARIF FASILITAS ===== */}
          <section id="tarif" className="scroll-mt-24">
            <Reveal>
              <span className="eyebrow inline-flex items-center gap-2 text-royal">
                <span className="h-1.5 w-1.5 mark-cross bg-blue" />
                Tarif Fasilitas
              </span>
              <h2 className="mt-4 text-3xl font-semibold text-black sm:text-4xl">
                Tarif pemakaian fasilitas gereja
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-black/75">
                Tarif berlaku untuk ruas dan umum. Data ketentuan tahun{" "}
                {tarifTahun}.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-soft)]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-line bg-mist">
                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-black/50">
                        Fasilitas
                      </th>
                      <th className="px-5 py-3.5 text-right text-[11px] font-bold uppercase tracking-widest text-black/50">
                        Ruas
                      </th>
                      <th className="px-5 py-3.5 text-right text-[11px] font-bold uppercase tracking-widest text-black/50">
                        Umum
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {tarifItems.map((t) => (
                      <tr key={t.item} className="transition-colors hover:bg-mist/40">
                        <td className="px-5 py-4 font-semibold text-black">
                          {t.item}
                        </td>
                        <td className="px-5 py-4 text-right font-semibold text-black">
                          {t.ruas}
                        </td>
                        <td className="px-5 py-4 text-right font-semibold text-black">
                          {t.umum}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-6 rounded-[var(--radius-card)] border border-line bg-mist p-7">
                <h3 className="text-base font-semibold text-black">
                  Ketentuan tambahan
                </h3>
                <ul className="mt-4 space-y-3">
                  {tarifKetentuan.map((k) => (
                    <li key={k} className="flex gap-3 text-[15px] leading-relaxed text-black/75">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 mark-cross bg-blue" />
                      {k}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </section>

          {/* ===== ADMINISTRASI PERNIKAHAN ===== */}
          <section id="pernikahan" className="scroll-mt-24">
            <Reveal>
              <span className="eyebrow inline-flex items-center gap-2 text-royal">
                <span className="h-1.5 w-1.5 mark-cross bg-blue" />
                Administrasi Pernikahan
              </span>
              <h2 className="mt-4 text-3xl font-semibold text-black sm:text-4xl">
                Pertunangan dan pernikahan
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-black/75">
                Syarat kelengkapan untuk martumpol dan tarpasupasu di HKBP
                Glugur.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <ol className="mt-8 space-y-4">
                {adminPernikahan.map((a, i) => (
                  <li
                    key={a}
                    className="flex gap-4 rounded-[var(--radius-card)] border border-line bg-white p-5 shadow-[var(--shadow-soft)]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-mist font-display text-sm font-semibold text-royal">
                      {i + 1}
                    </span>
                    <p className="text-[15px] leading-relaxed text-black/80">{a}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-6 flex flex-col gap-3 rounded-[var(--radius-card)] border border-mist-200 bg-mist p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-black">
                    Penjadwalan konseling pernikahan
                  </p>
                  <p className="mt-1 text-sm text-black/70">
                    Hubungi kantor gereja untuk mengatur jadwal dengan pendeta.
                  </p>
                </div>
                <a
                  href={`tel:${church.contact.phoneLink}`}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-royal px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-royal-600"
                >
                  Telepon {church.contact.phone}
                </a>
              </div>
            </Reveal>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
