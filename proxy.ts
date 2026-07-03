import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Locale utama tanpa prefix di URL. Selebihnya pakai prefix.
const DEFAULT = "id";
const PREFIXED = ["en", "bbc"];

function hasPrefix(pathname: string, loc: string) {
  return pathname === `/${loc}` || pathname.startsWith(`/${loc}/`);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Buang prefix default: /id dan /id/... dialihkan permanen (301) ke URL bersih.
  if (hasPrefix(pathname, DEFAULT)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT.length + 1) || "/";
    return NextResponse.redirect(url, 301);
  }

  // Locale berprefix (en, bbc) ditangani apa adanya oleh segmen [lang].
  if (PREFIXED.some((loc) => hasPrefix(pathname, loc))) {
    return NextResponse.next();
  }

  // Tanpa prefix = bahasa Indonesia. Rewrite internal ke /id, URL tetap bersih.
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Jangan jalan untuk api, aset _next, dan file berekstensi (favicon, sitemap.xml, robots.txt, llms.txt, gambar).
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
