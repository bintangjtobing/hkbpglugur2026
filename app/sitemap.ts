import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/lib/i18n/config";
import { localizeHref } from "@/lib/i18n/href";
import { SITE_URL } from "@/lib/i18n/metadata";

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
];

function abs(path: string, locale: (typeof locales)[number]) {
  const rel = localizeHref(path === "" ? "/" : path, locale);
  return SITE_URL + (rel === "/" ? "" : rel);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of routes) {
    const languages: Record<string, string> = {};
    for (const l of locales) languages[l] = abs(path, l);
    languages["x-default"] = abs(path, defaultLocale);

    for (const l of locales) {
      entries.push({
        url: abs(path, l),
        lastModified: now,
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.8,
        alternates: { languages },
      });
    }
  }
  return entries;
}
