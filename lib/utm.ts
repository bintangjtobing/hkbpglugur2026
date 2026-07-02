/* Tambahkan UTM parameter ke semua tautan keluar (eksternal).
   Tautan internal (diawali / atau #) dan mailto/tel dibiarkan apa adanya. */

export function withUtm(url: string, medium = "website"): string {
  try {
    const u = new URL(url);
    if (u.protocol !== "http:" && u.protocol !== "https:") return url;
    if (!u.searchParams.has("utm_source")) {
      u.searchParams.set("utm_source", "hkbpglugur.com");
    }
    u.searchParams.set("utm_medium", medium);
    u.searchParams.set("utm_campaign", "situs-hkbp-glugur");
    return u.toString();
  } catch {
    return url;
  }
}
