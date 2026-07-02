/* Helper pelacakan event untuk GA4 dan Microsoft Clarity.
   Nama event memakai bahasa Indonesia agar mudah dibaca di laporan. */

export const GA_ID = "G-65S81N5P09";
export const CLARITY_ID = "xg11h9jss3";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const clean: Params = {};
  for (const [k, v] of Object.entries(params)) if (v !== undefined) clean[k] = v;

  window.gtag?.("event", event, clean);

  if (typeof window.clarity === "function") {
    window.clarity("event", event);
    for (const [k, v] of Object.entries(clean)) {
      window.clarity("set", k, String(v));
    }
  }
}

export function trackPageview(path: string, title: string) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: title,
  });
}
