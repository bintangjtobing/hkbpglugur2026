import type { MetadataRoute } from "next";

const SITE_URL = "https://hkbpglugur.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
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
  ];
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
