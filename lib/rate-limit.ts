/* ============================================================
   Rate limiter sederhana per-kunci berbasis jendela geser, in-memory.
   Cocok untuk 1 instance PM2. Mencegah penyalahgunaan endpoint
   (spam form, dan terutama cost-DoS pada chatbot berbayar).
   ============================================================ */

const buckets = new Map<string, number[]>();
let lastSweep = Date.now();
const SWEEP_MAX_AGE = 15 * 60 * 1000; // buang jejak lebih tua dari 15 menit

/* Ambil IP klien dari header yang di-set nginx. */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for") || "";
  const first = xff.split(",")[0].trim();
  return first || req.headers.get("x-real-ip") || "unknown";
}

/* true = boleh lanjut, false = melebihi batas. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  // Sweep berkala agar memori tidak tumbuh tak terbatas.
  if (now - lastSweep > 5 * 60 * 1000) {
    for (const [k, arr] of buckets) {
      const kept = arr.filter((t) => now - t < SWEEP_MAX_AGE);
      if (kept.length) buckets.set(k, kept);
      else buckets.delete(k);
    }
    lastSweep = now;
  }

  const arr = (buckets.get(key) || []).filter((t) => now - t < windowMs);
  if (arr.length >= limit) {
    buckets.set(key, arr);
    return false;
  }
  arr.push(now);
  buckets.set(key, arr);
  return true;
}
