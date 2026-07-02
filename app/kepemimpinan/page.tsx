import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { pimpinanHKBP, pimpinanDistrik, type Leader } from "@/lib/leadership";

export const metadata: Metadata = {
  title: "Pimpinan HKBP dan Distrik X Medan Aceh",
  description:
    "Daftar pimpinan HKBP dan pimpinan Distrik X Medan Aceh periode 2024 sampai 2028, naungan pelayanan HKBP Glugur.",
  alternates: { canonical: "/kepemimpinan" },
};

function LeaderTable({ title, data }: { title: string; data: Leader[] }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-soft)]">
      <div className="border-b border-line bg-mist px-6 py-4">
        <h2 className="font-display text-xl font-semibold text-black">{title}</h2>
        <p className="mt-0.5 text-xs font-medium uppercase tracking-widest text-royal">
          Periode 2024 sampai 2028
        </p>
      </div>
      <table className="w-full text-sm">
        <tbody className="divide-y divide-line">
          {data.map((row) => (
            <tr key={row.jabatan} className="transition-colors hover:bg-mist/40">
              <th
                scope="row"
                className="w-2/5 px-6 py-4 text-left align-top font-semibold text-black/60"
              >
                {row.jabatan}
              </th>
              <td className="px-6 py-4 font-semibold text-black">{row.nama}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function KepemimpinanPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageBanner
          eyebrow="Tentang Kami"
          title="Pimpinan Gereja"
          desc="HKBP Glugur melayani dalam naungan HKBP dan Distrik X Medan Aceh. Berikut para pemimpin untuk periode 2024 sampai 2028."
        />

        <section className="mx-auto max-w-5xl px-5 py-20 md:py-24">
          <div className="mb-10 max-w-3xl space-y-4 text-[16px] leading-relaxed text-black/75">
            <p>
              HKBP Glugur melayani dalam naungan Huria Kristen Batak Protestan
              dan Distrik X Medan Aceh. Para pemimpin gereja menggembalakan
              jemaat, mengarahkan pelayanan, dan menjaga ajaran tetap setia pada
              firman Tuhan.
            </p>
            <p>
              Berikut susunan pimpinan HKBP di tingkat pusat dan pimpinan Distrik
              X Medan Aceh untuk periode pelayanan 2024 sampai 2028.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <LeaderTable title="Pimpinan HKBP" data={pimpinanHKBP} />
            </Reveal>
            <Reveal delay={100}>
              <LeaderTable
                title="Pimpinan Distrik X Medan Aceh"
                data={pimpinanDistrik}
              />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
