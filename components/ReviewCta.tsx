"use client";

import Link from "next/link";
import { localizeHref } from "@/lib/i18n/href";
import { useDict } from "./DictionaryProvider";

export function ReviewCta() {
  const { dict, locale } = useDict();
  const t = dict.reviews.cta;

  return (
    <div className="flex flex-col items-center gap-5 rounded-[var(--radius-card)] border border-line bg-mist p-8 text-center sm:flex-row sm:justify-between sm:text-left">
      <div>
        <h3 className="text-xl font-semibold text-black">{t.title}</h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-black/70">
          {t.desc}
        </p>
      </div>
      <Link
        href={localizeHref("/ulasan", locale)}
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-royal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-royal-600"
      >
        {t.button}
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </Link>
    </div>
  );
}
