"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { GA_ID, CLARITY_ID, track, trackPageview } from "@/lib/analytics";

export function Analytics() {
  const pathname = usePathname();

  // Kirim page_view saat pindah halaman (navigasi antar rute klien).
  useEffect(() => {
    if (!pathname) return;
    trackPageview(pathname, document.title);
  }, [pathname]);

  // Lacak semua klik ke tautan keluar secara otomatis.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement)?.closest?.("a");
      if (!el) return;
      const href = el.getAttribute("href") || "";
      if (!/^https?:\/\//i.test(href)) return;
      try {
        const url = new URL(href);
        if (url.host === window.location.host) return;
        track("klik_keluar", {
          tautan: url.origin + url.pathname,
          domain: url.host,
          teks: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 80),
        });
      } catch {
        /* abaikan */
      }
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
      <Script id="clarity-init" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${CLARITY_ID}");`}
      </Script>
    </>
  );
}
