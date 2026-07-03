"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { locales, localeNames, localeShort, type Locale } from "@/lib/i18n/config";
import { localizeHref, stripLocale } from "@/lib/i18n/href";
import { useDict } from "./DictionaryProvider";

export function LanguageSwitcher({ onDark = false }: { onDark?: boolean }) {
  const { dict, locale } = useDict();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const base = stripLocale(pathname || "/");

  const remember = (l: Locale) => {
    document.cookie = `locale=${l}; path=/; max-age=31536000; samesite=lax`;
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={dict.common.chooseLanguage}
        aria-expanded={open}
        className={`flex items-center gap-1.5 rounded-full px-2.5 py-2 text-sm font-semibold transition-colors ${
          onDark
            ? "text-white/85 hover:bg-white/10 hover:text-white"
            : "text-black/80 hover:bg-mist hover:text-royal"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
        </svg>
        <span>{localeShort[locale]}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-40 overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-[var(--shadow-lift)]">
          {locales.map((l) => (
            <Link
              key={l}
              href={localizeHref(base, l)}
              onClick={() => remember(l)}
              className={`block rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors hover:bg-mist hover:text-royal ${
                l === locale ? "bg-mist text-royal" : "text-black/80"
              }`}
            >
              {localeNames[l]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
