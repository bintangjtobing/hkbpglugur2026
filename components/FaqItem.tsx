"use client";

import { track } from "@/lib/analytics";

export function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details
      className="group"
      onToggle={(e) => {
        if ((e.currentTarget as HTMLDetailsElement).open) {
          track("buka_faq", { pertanyaan: q });
        }
      }}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[15px] font-semibold text-black transition-colors hover:bg-mist/50">
        <span>{q}</span>
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 text-royal transition-transform group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <p className="px-5 pb-4 text-[15px] leading-relaxed text-black/75">{a}</p>
    </details>
  );
}
