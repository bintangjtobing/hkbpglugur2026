import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { sintuaList } from "@/lib/sintua";

export const metadata: Metadata = {
  title: "Majelis Sintua HKBP Glugur",
  description:
    "Daftar Sintua atau penatua yang melayani jemaat HKBP Glugur, Ressort Medan Utara, Distrik X Medan Aceh.",
  alternates: { canonical: "/sintua" },
};

export default function SintuaPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageBanner
          eyebrow="Pelayanan"
          title="Majelis Sintua"
          desc="Para Sintua menggembalakan dan melayani jemaat di setiap lingkungan HKBP Glugur."
        />

        <section id="sintua" className="mx-auto max-w-4xl px-5 py-20 md:py-24">
          <Reveal className="mb-6 flex items-center gap-3">
            <h2 className="font-display text-2xl font-semibold text-black">
              Daftar Sintua
            </h2>
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-blue px-2 text-xs font-bold text-white">
              {sintuaList.length}
            </span>
          </Reveal>

          <Reveal>
            <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-soft)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line bg-mist">
                    <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-black/50">
                      Nama
                    </th>
                    <th className="hidden px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-black/50 sm:table-cell">
                      Jabatan
                    </th>
                    <th className="hidden px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-black/50 sm:table-cell">
                      Tanggal Tahbis
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {sintuaList.map((s, i) => (
                    <tr key={s.name + i} className="transition-colors hover:bg-mist/40">
                      <td className="px-5 py-3.5 align-top">
                        <span className="font-semibold text-black">{s.name}</span>
                        {/* Info ringkas untuk layar kecil */}
                        <span className="mt-1 block space-y-0.5 sm:hidden">
                          {s.tahbis ? (
                            <span className="block text-[12px] text-black/55">
                              Tahbis {s.tahbis}
                            </span>
                          ) : null}
                          {s.jabatan ? (
                            <span className="block text-[12px] font-medium text-royal">
                              {s.jabatan}
                            </span>
                          ) : null}
                        </span>
                      </td>
                      <td className="hidden px-5 py-3.5 align-top sm:table-cell">
                        {s.jabatan ? (
                          <span className="inline-flex items-center rounded-full border border-mist-200 bg-mist px-2.5 py-0.5 text-[12px] font-medium text-royal">
                            {s.jabatan}
                          </span>
                        ) : (
                          <span className="text-black/25">&middot;</span>
                        )}
                      </td>
                      <td className="hidden px-5 py-3.5 align-top text-xs text-black/55 sm:table-cell">
                        {s.tahbis ?? <span className="text-black/25">&middot;</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <p className="mt-5 text-sm text-black/55">
            Sumber data hkbp.or.id. Titik netral menandai data yang belum
            tersedia.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
