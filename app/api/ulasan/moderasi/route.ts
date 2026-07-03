import fs from "fs";
import path from "path";
import { verifyAction } from "@/lib/reviews/token";
import { updateStatus } from "@/lib/reviews/store";

export const dynamic = "force-dynamic";

function page(title: string, message: string, ok: boolean): Response {
  let logo = "";
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), "public", "email-logo.png"));
    logo = `<img src="data:image/png;base64,${buf.toString("base64")}" width="56" height="56" alt="HKBP Glugur" style="display:block;margin:0 auto 14px;">`;
  } catch {
    logo = "";
  }
  const accent = ok ? "#2138E0" : "#b42318";
  const html = `<!DOCTYPE html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title></head>
<body style="margin:0;background:#f2f4fb;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:460px;margin:64px auto;padding:0 16px;">
    <div style="background:#fff;border:1px solid #e5e8f5;border-radius:16px;padding:36px 28px;text-align:center;">
      ${logo}
      <div style="font-size:13px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:${accent};">${escapeHtml(title)}</div>
      <p style="font-size:16px;line-height:1.6;color:#12183A;margin:14px 0 0;">${escapeHtml(message)}</p>
      <a href="https://hkbpglugur.com/ulasan" style="display:inline-block;margin-top:22px;color:#2138E0;text-decoration:none;font-weight:600;">Buka halaman ulasan</a>
    </div>
  </div>
</body></html>`;
  return new Response(html, {
    status: ok ? 200 : 400,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") || "";
  const parsed = verifyAction(token);
  if (!parsed) {
    return page("Tautan tidak valid", "Tautan moderasi tidak valid atau sudah kedaluwarsa.", false);
  }

  const status = parsed.action === "approve" ? "approved" : "rejected";
  const updated = updateStatus(parsed.id, status);
  if (!updated) {
    return page("Tidak ditemukan", "Ulasan tidak ditemukan. Mungkin sudah dihapus.", false);
  }

  if (parsed.action === "approve") {
    return page("Disetujui", "Ulasan disetujui dan sekarang tayang di situs.", true);
  }
  return page("Ditolak", "Ulasan ditolak dan tidak akan tayang.", true);
}
