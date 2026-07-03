/* ============================================================
   Helper metadata sadar-locale: canonical + hreflang alternates.
   Nilai relatif, di-resolve terhadap metadataBase di layout.
   ============================================================ */
import type { Metadata } from "next";
import { defaultLocale, type Locale } from "./config";
import { localizeHref } from "./href";

export const SITE_URL = "https://hkbpglugur.com";

/* Hreflang hanya untuk locale dengan kode bahasa ISO 639-1 yang dikenal
   Google/Semrush. Batak Toba (bbc) hanya punya kode ISO 639-3, tidak valid
   sebagai nilai hreflang, jadi tidak diiklankan lewat hreflang. Halaman /bbc
   tetap terindeks (self-canonical) dan tetap ada di sitemap. */
export const HREFLANG_LOCALES: Locale[] = ["id", "en"];

/* Bangun canonical (locale aktif) + languages (id, en, x-default).
   basePath ditulis sebagai path Indonesia, mis. "/informasi" atau "/". */
export function buildAlternates(
  basePath: string,
  locale: Locale
): Metadata["alternates"] {
  const canonical = localizeHref(basePath, locale);

  // Locale tanpa kode hreflang valid (bbc): canonical saja, tanpa hreflang.
  if (!HREFLANG_LOCALES.includes(locale)) {
    return { canonical };
  }

  const languages: Record<string, string> = {};
  for (const l of HREFLANG_LOCALES) {
    languages[l] = localizeHref(basePath, l);
  }
  languages["x-default"] = localizeHref(basePath, defaultLocale);
  return { canonical, languages };
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
