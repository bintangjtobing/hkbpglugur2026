/* ============================================================
   Konfigurasi bahasa situs HKBP Glugur.
   id = utama (tanpa prefix di URL), en dan bbc pakai prefix.
   ============================================================ */

export const locales = ["id", "en", "bbc"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "id";

/* Nama bahasa untuk pemilih bahasa (ditulis dalam bahasa itu sendiri) */
export const localeNames: Record<Locale, string> = {
  id: "Indonesia",
  en: "English",
  bbc: "Batak",
};

/* Kode singkat untuk tombol ringkas di header */
export const localeShort: Record<Locale, string> = {
  id: "ID",
  en: "EN",
  bbc: "BA",
};

/* Nilai atribut lang untuk tag html */
export const htmlLang: Record<Locale, string> = {
  id: "id",
  en: "en",
  bbc: "bbc",
};

/* Nilai locale untuk Open Graph */
export const ogLocale: Record<Locale, string> = {
  id: "id_ID",
  en: "en_US",
  bbc: "bbc_ID",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
