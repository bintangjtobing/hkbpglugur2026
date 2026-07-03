import type { MetadataRoute } from "next";

const SITE_URL = "https://hkbpglugur.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/permintaan", "/en/permintaan", "/bbc/permintaan", "/gallery-pending/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
