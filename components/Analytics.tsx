"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track, trackPageview } from "@/lib/analytics";

/* Skrip GA4 dan Clarity dipasang langsung di layout (server-rendered).
   Komponen ini hanya menangani pelacakan: page_view antar rute dan klik keluar. */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    trackPageview(pathname, document.title);
  }, [pathname]);

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

  return null;
}
