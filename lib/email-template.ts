/* Template HTML email HKBP Glugur.
   Layout berbasis tabel + gaya inline agar rapi di banyak klien email.
   Font web dinyatakan dengan fallback karena Gmail memblokir font kustom. */
import { withUtm } from "@/lib/utm";

const HEAD_FONT =
  "'Urbanist','Trebuchet MS',-apple-system,'Segoe UI',Arial,sans-serif";
const BODY_FONT =
  "'Open Sans',-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const NAVY = "#0A1550";
const ROYAL = "#2138E0";
const INK = "#12183A";
const MUTED = "#5b6486";

export const EMAIL_LOGO_CID = "logo-hkbp";

export function renderEmail(opts: { title: string; bodyHtml: string }): string {
  const { title, bodyHtml } = opts;
  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@600;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f2f4fb;font-family:${BODY_FONT};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f4fb;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;border:1px solid #e5e8f5;border-radius:14px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding:28px 24px 18px 24px;background:#ffffff;">
              <img src="cid:${EMAIL_LOGO_CID}" width="60" height="60" alt="Logo HKBP Glugur" style="display:block;border:0;">
              <div style="font-family:${HEAD_FONT};font-size:20px;font-weight:700;color:${NAVY};margin-top:10px;letter-spacing:-0.02em;">HKBP Glugur</div>
              <div style="font-family:${BODY_FONT};font-size:12px;color:${MUTED};margin-top:2px;">Ressort Medan Utara, Distrik X Medan Aceh</div>
            </td>
          </tr>
          <tr><td style="height:4px;background:${ROYAL};line-height:4px;font-size:0;">&nbsp;</td></tr>

          <!-- Konten -->
          <tr>
            <td style="padding:30px 32px;font-family:${BODY_FONT};font-size:15px;line-height:1.65;color:${INK};">
              <h1 style="font-family:${HEAD_FONT};font-size:22px;font-weight:700;color:${NAVY};margin:0 0 18px 0;letter-spacing:-0.02em;">${title}</h1>
              ${bodyHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:${NAVY};padding:24px 32px;font-family:${BODY_FONT};font-size:12px;line-height:1.7;color:rgba(255,255,255,0.72);">
              <div style="font-family:${HEAD_FONT};font-size:15px;font-weight:700;color:#ffffff;">HKBP Glugur</div>
              <div style="margin-top:6px;">Jl. Pembangunan III No.57A, Glugur Darat II,<br>Kec. Medan Timur, Kota Medan, Sumatera Utara 20238</div>
              <div style="margin-top:6px;">Telepon (061) 6611846 &nbsp;·&nbsp; hkbpglugurmdn@gmail.com</div>
              <div style="margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.55);">
                Dibangun sebagai inisiatif relawan oleh Bintang Tobing.
                Dukung lewat <a href="${withUtm("https://saweria.co/bintangtobing", "email")}" style="color:#a9b6ff;text-decoration:none;">saweria.co/bintangtobing</a>.
              </div>
            </td>
          </tr>
        </table>
        <div style="font-family:${BODY_FONT};font-size:11px;color:#9aa2c0;margin-top:14px;">© ${new Date().getFullYear()} HKBP Glugur</div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* Baris label dan nilai untuk email notifikasi. */
export function infoRow(label: string, value: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 12px 0;"><tr>
    <td style="font-size:12px;font-weight:600;color:${MUTED};text-transform:uppercase;letter-spacing:0.04em;padding-bottom:2px;">${label}</td>
  </tr><tr>
    <td style="font-size:15px;color:${INK};">${value}</td>
  </tr></table>`;
}
