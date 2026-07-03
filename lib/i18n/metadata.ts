/* ============================================================
   Helper metadata sadar-locale: canonical + hreflang alternates.
   Nilai relatif, di-resolve terhadap metadataBase di layout.
   ============================================================ */
import type { Metadata } from "next";
import { locales, defaultLocale, type Locale } from "./config";
import { localizeHref } from "./href";

export const SITE_URL = "https://hkbpglugur.com";

/* Bangun canonical (locale aktif) + languages (semua locale + x-default).
   basePath ditulis sebagai path Indonesia, mis. "/informasi" atau "/". */
export function buildAlternates(
  basePath: string,
  locale: Locale
): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = localizeHref(basePath, l);
  }
  languages["x-default"] = localizeHref(basePath, defaultLocale);
  return {
    canonical: localizeHref(basePath, locale),
    languages,
  };
}

/* Metadata halaman: title + description dari kamus + alternates locale.
   `extra` untuk override tambahan (mis. robots noindex). */
export function pageMetadata(
  basePath: string,
  locale: Locale,
  meta: { title: string; description: string },
  extra?: Metadata
): Metadata {
  return {
    title: meta.title,
    description: meta.description,
    alternates: buildAlternates(basePath, locale),
    ...extra,
  };
}
