/* ============================================================
   Penyimpanan ulasan situs berbasis file JSON di server.
   Gitignored dan bertahan lintas deploy (git pull tak menyentuh
   untracked, build tak menghapus). Tanpa database.
   ============================================================ */
import "server-only";
import fs from "fs";
import path from "path";

export type ReviewStatus = "pending" | "approved" | "rejected";

export type Review = {
  id: string;
  name: string;
  anonymous: boolean;
  rating: number; // 1..5
  text: string;
  locale: string;
  createdAt: string; // ISO
  status: ReviewStatus;
};

const FILE = path.join(process.cwd(), "data", "reviews.json");

function readAll(): Review[] {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8")) as Review[];
  } catch {
    return [];
  }
}

function writeAll(list: Review[]) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(list, null, 2));
}

export function addReview(r: Review) {
  const list = readAll();
  list.push(r);
  writeAll(list);
}

export function updateStatus(
  id: string,
  status: ReviewStatus
): Review | null {
  const list = readAll();
  const idx = list.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], status };
  writeAll(list);
  return list[idx];
}

/* Ulasan yang sudah disetujui, terbaru dulu. */
export function approvedReviews(): Review[] {
  return readAll()
    .filter((r) => r.status === "approved")
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}
