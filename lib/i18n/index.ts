/* ============================================================
   Loader kamus. Bahasa selain Indonesia digabung di atas basis
   Indonesia, jadi kunci yang belum diterjemahkan otomatis jatuh
   kembali ke teks Indonesia. Hanya berjalan di sisi server.
   ============================================================ */
import "server-only";

import id from "./dictionaries/id.json";
import en from "./dictionaries/en.json";
import bbc from "./dictionaries/bbc.json";
import { defaultLocale, type Locale } from "./config";

export type Dictionary = typeof id;

const overlays: Record<Exclude<Locale, "id">, Record<string, unknown>> = {
  en,
  bbc,
};

type Json = Record<string, unknown>;

/* Gabung dalam kelas objek biasa. Nilai daun (string) di overlay menang.
   Kamus hanya berisi objek bertingkat berisi string, tanpa array. */
function deepMerge(base: Json, over: Json): Json {
  const out: Json = { ...base };
  for (const key of Object.keys(over)) {
    const b = base[key];
    const o = over[key];
    if (
      b &&
      o &&
      typeof b === "object" &&
      typeof o === "object" &&
      !Array.isArray(b) &&
      !Array.isArray(o)
    ) {
      out[key] = deepMerge(b as Json, o as Json);
    } else if (o !== undefined && o !== "") {
      out[key] = o;
    }
  }
  return out;
}

export function getDictionary(locale: Locale): Dictionary {
  if (locale === defaultLocale) return id;
  const overlay = overlays[locale as Exclude<Locale, "id">];
  return deepMerge(id as Json, (overlay ?? {}) as Json) as unknown as Dictionary;
}
