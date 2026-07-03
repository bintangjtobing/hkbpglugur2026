import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/lib/i18n/config";
import { localizeHref } from "@/lib/i18n/href";
import { SITE_URL, HREFLANG_LOCALES } from "@/lib/i18n/metadata";

const routes = [
  "",
  "/kepemimpinan",
  "/sintua",
  "/informasi",
  "/buku",
  "/buku/alkitab",
  "/buku/buku-ende",
  "/buku/kidung-jemaat",
  "/media",
  "/tema-transformasi",
  "/pengembang",
  "/warta",
  "/sejarah-hkbp-glugur",
  "/ulasan",
  "/faq",
  "/ketentuan",
  "/kebijakan-privasi",
];

function abs(path: string, locale: (typeof locales)[number]) {
  const rel = localizeHref(path === "" ? "/" : path, locale);
  return SITE_URL + (rel === "/" ? "" : rel);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of routes) {
    // hreflang hanya untuk locale dengan kode ISO 639-1 valid (id, en).
    // bbc tidak punya kode hreflang valid, jadi entri bbc tanpa alternates.
    const languages: Record<string, string> = {};
    for (const l of HREFLANG_LOCALES) languages[l] = abs(path, l);
    languages["x-default"] = abs(path, defaultLocale);

    for (const l of locales) {
      entries.push({
        url: abs(path, l),
        lastModified: now,
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.8,
        ...(HREFLANG_LOCALES.includes(l) ? { alternates: { languages } } : {}),
      });
    }
  }
  return entries;
}
