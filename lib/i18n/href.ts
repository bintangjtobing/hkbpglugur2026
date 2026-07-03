/* ============================================================
   Helper URL sadar-locale.
   id tetap di root (/informasi). en dan bbc pakai prefix (/en/informasi).
   Aman dipakai di komponen server maupun klien (tanpa server-only).
   ============================================================ */

import { defaultLocale, locales, type Locale } from "./config";

/* Tambah prefix locale ke path internal.
   Path eksternal, mailto, tel, dan anchor murni dibiarkan apa adanya. */
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/")) return href; // eksternal, mailto:, tel:, #anchor
  if (locale === defaultLocale) return href;
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}

/* Ambil locale dari sebuah pathname. Kembalikan default kalau tanpa prefix. */
export function localeFromPathname(pathname: string): Locale {
  const seg = pathname.split("/")[1];
  return (locales as readonly string[]).includes(seg)
    ? (seg as Locale)
    : defaultLocale;
}

/* Buang prefix locale dari pathname, hasilkan path dasar (selalu diawali "/"). */
export function stripLocale(pathname: string): string {
  const seg = pathname.split("/")[1];
  if ((locales as readonly string[]).includes(seg) && seg !== defaultLocale) {
    const rest = pathname.slice(seg.length + 1);
    return rest === "" ? "/" : rest;
  }
  return pathname === "" ? "/" : pathname;
}
