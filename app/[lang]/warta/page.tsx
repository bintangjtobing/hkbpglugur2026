import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { WartaViewer } from "@/components/WartaViewer";
import { WartaUploadForm } from "@/components/WartaUploadForm";
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
  return pageMetadata("/warta", locale, getDictionary(locale).meta.warta);
}

export default async function WartaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "id";
  const t = getDictionary(locale).warta;
  return (
    <>
      <Header />
      <main className="flex-1">
        <PageBanner
          eyebrow={t.banner.eyebrow}
          title={t.banner.title}
          desc={t.banner.desc}
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
                {t.kirimEyebrow}
              </span>
              <h2 className="mt-4 text-3xl font-semibold text-black sm:text-4xl">
                {t.kirimHeading}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-black/75">
                {t.kirimIntro}
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
