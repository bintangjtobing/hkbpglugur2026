import fs from "fs";
import path from "path";
import { verifyAction } from "@/lib/reviews/token";
import { updateStatus } from "@/lib/reviews/store";

export const dynamic = "force-dynamic";

function logoImg(): string {
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), "public", "email-logo.png"));
    return `<img src="data:image/png;base64,${buf.toString("base64")}" width="56" height="56" alt="HKBP Glugur" style="display:block;margin:0 auto 14px;">`;
  } catch {
    return "";
  }
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function shell(title: string, inner: string, accent: string, status = 200): Response {
  const html = `<!DOCTYPE html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;background:#f2f4fb;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:460px;margin:64px auto;padding:0 16px;">
    <div style="background:#fff;border:1px solid #e5e8f5;border-radius:16px;padding:36px 28px;text-align:center;">
      ${logoImg()}
      <div style="font-size:13px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:${accent};">${escapeHtml(title)}</div>
      ${inner}
    </div>
  </div>
</body></html>`;
  return new Response(html, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

// GET: tampilkan halaman konfirmasi. TIDAK mengubah status (mencegah
// pemindai/prefetch email memicu aksi otomatis).
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") || "";
  const parsed = verifyAction(token);
  if (!parsed) {
    return shell(
      "Tautan tidak valid",
      `<p style="font-size:16px;line-height:1.6;color:#12183A;margin:14px 0 0;">Tautan moderasi tidak valid atau sudah kedaluwarsa.</p>`,
      "#b42318",
      400
    );
  }

  const isApprove = parsed.action === "approve";
  const label = isApprove ? "Setujui dan tayangkan ulasan ini?" : "Tolak ulasan ini?";
  const btnText = isApprove ? "Ya, setujui" : "Ya, tolak";
  const btnColor = isApprove ? "#2138E0" : "#b42318";
  const inner = `
    <p style="font-size:16px;line-height:1.6;color:#12183A;margin:14px 0 22px;">${label}</p>
    <form method="POST" action="/api/ulasan/moderasi">
      <input type="hidden" name="token" value="${escapeHtml(token)}">
      <button type="submit" style="display:inline-block;background:${btnColor};color:#fff;border:0;padding:12px 22px;border-radius:999px;font-weight:600;font-size:15px;cursor:pointer;">${btnText}</button>
    </form>`;
  return shell(isApprove ? "Konfirmasi Persetujuan" : "Konfirmasi Penolakan", inner, "#2138E0");
}

// POST: benar-benar terapkan perubahan status.
export async function POST(request: Request) {
  let token = "";
  try {
    const form = await request.formData();
    token = String(form.get("token") || "");
  } catch {
    token = new URL(request.url).searchParams.get("token") || "";
  }

  const parsed = verifyAction(token);
  if (!parsed) {
    return shell(
      "Tautan tidak valid",
      `<p style="font-size:16px;line-height:1.6;color:#12183A;margin:14px 0 0;">Tautan moderasi tidak valid atau sudah kedaluwarsa.</p>`,
      "#b42318",
      400
    );
  }

  const status = parsed.action === "approve" ? "approved" : "rejected";
  const updated = updateStatus(parsed.id, status);
  const link = `<a href="https://hkbpglugur.com/ulasan" style="display:inline-block;margin-top:22px;color:#2138E0;text-decoration:none;font-weight:600;">Buka halaman ulasan</a>`;

  if (!updated) {
    return shell(
      "Tidak ditemukan",
      `<p style="font-size:16px;line-height:1.6;color:#12183A;margin:14px 0 0;">Ulasan tidak ditemukan. Mungkin sudah dihapus.</p>${link}`,
      "#b42318",
      404
    );
  }

  const msg =
    parsed.action === "approve"
      ? "Ulasan disetujui dan sekarang tayang di situs."
      : "Ulasan ditolak dan tidak akan tayang.";
  return shell(
    parsed.action === "approve" ? "Disetujui" : "Ditolak",
    `<p style="font-size:16px;line-height:1.6;color:#12183A;margin:14px 0 0;">${msg}</p>${link}`,
    "#2138E0"
  );
}
