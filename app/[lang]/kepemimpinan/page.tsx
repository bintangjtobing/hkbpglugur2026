import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { pimpinanHKBP, pimpinanDistrik, type Leader } from "@/lib/leadership";
import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "id";
  return pageMetadata("/kepemimpinan", locale, getDictionary(locale).meta.kepemimpinan);
}

function LeaderTable({
  title,
  periode,
  data,
}: {
  title: string;
  periode: string;
  data: Leader[];
}) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-soft)]">
      <div className="border-b border-line bg-mist px-6 py-4">
        <h2 className="font-display text-xl font-semibold text-black">{title}</h2>
        <p className="mt-0.5 text-xs font-medium uppercase tracking-widest text-royal">
          {periode}
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

export default async function KepemimpinanPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "id";
  const t = getDictionary(locale).kepemimpinan;
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageBanner
          eyebrow={t.banner.eyebrow}
          title={t.banner.title}
          desc={t.banner.desc}
        />

        <section className="mx-auto max-w-5xl px-5 py-20 md:py-24">
          <div className="mb-10 max-w-3xl space-y-4 text-[16px] leading-relaxed text-black/75">
            <p>{t.intro1}</p>
            <p>{t.intro2}</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <LeaderTable title={t.tableHKBP} periode={t.periode} data={pimpinanHKBP} />
            </Reveal>
            <Reveal delay={100}>
              <LeaderTable
                title={t.tableDistrik}
                periode={t.periode}
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
