import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageBanner } from "@/components/PageBanner";
import { Reveal } from "@/components/Reveal";
import { ReviewForm } from "@/components/ReviewForm";
import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/i18n/metadata";
import { approvedReviews } from "@/lib/reviews/store";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "id";
  return pageMetadata("/ulasan", locale, getDictionary(locale).meta.ulasan);
}

const intlLocale: Record<Locale, string> = {
  id: "id-ID",
  en: "en-US",
  bbc: "id-ID",
};

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          viewBox="0 0 24 24"
          className={`h-4 w-4 ${n <= value ? "text-[#f5b301]" : "text-line"}`}
          fill="currentColor"
        >
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export default async function UlasanPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "id";
  const t = getDictionary(locale).reviews;

  const reviews = approvedReviews();
  const count = reviews.length;
  const avg = count
    ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / count) * 10) / 10
    : 0;
  const df = new Intl.DateTimeFormat(intlLocale[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Header />
      <main className="flex-1">
        <PageBanner
          eyebrow={t.banner.eyebrow}
          title={t.banner.title}
          desc={t.banner.desc}
        />

        <section className="mx-auto max-w-5xl px-5 py-16 md:py-20">
          {/* Ringkasan */}
          {count > 0 ? (
            <Reveal className="mx-auto mb-8 flex max-w-md items-center gap-5 rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-soft)]">
              <div className="text-center">
                <p className="font-display text-5xl font-semibold text-black">
                  {avg.toLocaleString(intlLocale[locale])}
                </p>
                <div className="mt-1">
                  <Stars value={Math.round(avg)} />
                </div>
              </div>
              <div className="border-l border-line pl-5 text-sm text-black/70">
                {count} {t.summaryCount}
              </div>
            </Reveal>
          ) : null}

          {/* Daftar ulasan, tata letak masonry */}
          {count > 0 ? (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {reviews.map((r) => (
                <article
                  key={r.id}
                  className="mb-4 break-inside-avoid rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-soft)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold text-black">
                      {r.anonymous || !r.name ? t.anon : r.name}
                    </p>
                    <span className="shrink-0">
                      <Stars value={r.rating} />
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-black/50">
                    {df.format(new Date(r.createdAt))}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-black/80">
                    {r.text}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <p className="mx-auto max-w-2xl rounded-[var(--radius-card)] border border-dashed border-mist-200 bg-white/60 p-8 text-center text-black/60">
              {t.empty}
            </p>
          )}

          {/* Form kirim ulasan */}
          <div className="mx-auto mt-14 max-w-3xl">
            <h2 className="text-2xl font-semibold text-black">{t.formTitle}</h2>
            <div className="mt-6">
              <ReviewForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
