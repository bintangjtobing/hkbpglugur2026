"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { locales, localeNames, localeShort, type Locale } from "@/lib/i18n/config";
import { localizeHref, stripLocale } from "@/lib/i18n/href";
import { useDict } from "./DictionaryProvider";

const Globe = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
  </svg>
);

export function LanguageSwitcher({
  onDark = false,
  inline = false,
}: {
  onDark?: boolean;
  inline?: boolean;
}) {
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

  // Varian inline penuh-lebar untuk menu mobile.
  if (inline) {
    return (
      <div className="w-full">
        <span className="mb-2 flex items-center gap-1.5 px-1 text-xs font-semibold uppercase tracking-wide text-black/50">
          <Globe className="h-3.5 w-3.5" />
          {dict.common.language}
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {locales.map((l) => (
            <Link
              key={l}
              href={localizeHref(base, l)}
              onClick={() => remember(l)}
              className={`rounded-xl px-2 py-2.5 text-center text-sm font-semibold transition-colors ${
                l === locale
                  ? "bg-royal text-white"
                  : "bg-mist text-black/70 hover:bg-mist-200"
              }`}
            >
              {localeNames[l]}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Varian dropdown untuk header desktop.
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
        <Globe className="h-4 w-4" />
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
