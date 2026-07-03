import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { verifyCaptcha } from "@/lib/captcha";
import { renderEmail, infoRow, EMAIL_LOGO_CID } from "@/lib/email-template";
import { serverMsg, fill } from "@/lib/i18n/server-messages";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_FILES = 10;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024; // 20 MB
const ALLOWED_EXT = [
  "pdf", "doc", "docx", "xls", "xlsx", "csv",
  "jpg", "jpeg", "png", "webp", "gif",
];

const MAIL_TO = process.env.MAIL_TO || "hkbpglugurmdn@gmail.com";
const MAIL_CC = process.env.MAIL_CC || "bintangjtobing@gmail.com";

function ext(name: string) {
  return name.split(".").pop()?.toLowerCase() || "";
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: serverMsg("id").invalidFormat }, { status: 400 });
  }

  const locale = String(form.get("locale") || "id");
  const m = serverMsg(locale);

  if (!rateLimit(`permintaan:${clientIp(request)}`, 6, 600000)) {
    return NextResponse.json({ error: m.tooMany }, { status: 429 });
  }

  const nama = String(form.get("nama") || "").trim();
  const email = String(form.get("email") || "").trim();
  const telepon = String(form.get("telepon") || "").trim();
  const pesan = String(form.get("pesan") || "").trim();
  const captchaToken = String(form.get("captchaToken") || "");
  const captchaAnswer = String(form.get("captchaAnswer") || "");

  // Validasi field
  if (!nama || !email || !pesan) {
    return NextResponse.json({ error: m.reqNamaEmailPesan }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: m.emailInvalid }, { status: 400 });
  }
  if (!verifyCaptcha(captchaToken, captchaAnswer)) {
    return NextResponse.json({ error: m.captchaWrong }, { status: 400 });
  }

  // Validasi file
  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_FILES) {
    return NextResponse.json({ error: fill(m.maxFiles, { n: MAX_FILES }) }, { status: 400 });
  }
  let total = 0;
  const attachments: { filename: string; content: Buffer }[] = [];
  for (const f of files) {
    if (!ALLOWED_EXT.includes(ext(f.name))) {
      return NextResponse.json(
        { error: fill(m.fileType, { name: f.name }) },
        { status: 400 }
      );
    }
    total += f.size;
    if (total > MAX_TOTAL_BYTES) {
      return NextResponse.json(
        { error: m.fileTotal20 },
        { status: 400 }
      );
    }
    attachments.push({
      filename: f.name,
      content: Buffer.from(await f.arrayBuffer()),
    });
  }

  // Konfigurasi SMTP
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    return NextResponse.json({ error: m.smtpUnset }, { status: 503 });
  }

  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  // Logo inline untuk email (CID). Bila gagal dibaca, email tetap terkirim.
  let logo: { filename: string; content: Buffer; cid: string }[] = [];
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), "public", "email-logo.png"));
    logo = [{ filename: "logo.png", content: buf, cid: EMAIL_LOGO_CID }];
  } catch {
    logo = [];
  }

  const notifBody =
    infoRow("Nama", escapeHtml(nama)) +
    infoRow("Email", escapeHtml(email)) +
    infoRow("Telepon", escapeHtml(telepon || "-")) +
    infoRow("Pesan", escapeHtml(pesan).replace(/\n/g, "<br>")) +
    infoRow("Lampiran", `${attachments.length} file`);
  const html = renderEmail({ title: "Permintaan Perbaikan Konten", bodyHtml: notifBody });

  try {
    await transport.sendMail({
      from: `"Situs HKBP Glugur" <${user}>`,
      to: MAIL_TO,
      cc: MAIL_CC,
      replyTo: email,
      subject: `Permintaan Perbaikan Konten dari ${nama}`,
      text: `Nama: ${nama}\nEmail: ${email}\nTelepon: ${telepon || "-"}\n\nPesan:\n${pesan}\n\nLampiran: ${attachments.length} file`,
      html,
      attachments: [...logo, ...attachments],
    });
  } catch {
    return NextResponse.json({ error: m.sendFailPesan }, { status: 502 });
  }

  // Email konfirmasi ke pemohon (ikut bahasa pengirim). Kegagalannya tidak membatalkan proses.
  const ackAttachment = fill(m.permintaanAckAttachment, { n: attachments.length });
  const ackBody = `
    <p style="margin:0 0 14px 0;">${m.greeting}, <strong>${escapeHtml(nama)}</strong>.</p>
    <p style="margin:0 0 14px 0;">${m.permintaanAckIntro}</p>
    <div style="background:#eef1ff;border-radius:12px;padding:16px 18px;margin:0 0 14px 0;">
      <div style="font-size:12px;font-weight:600;color:#5b6486;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px;">${m.permintaanAckSummary}</div>
      <div style="color:#12183A;">${escapeHtml(pesan).replace(/\n/g, "<br>")}</div>
      <div style="color:#5b6486;font-size:13px;margin-top:10px;">${ackAttachment}</div>
    </div>
    <p style="margin:0;color:#5b6486;font-size:13px;">${m.autoNote}</p>
  `;
  const ackHtml = renderEmail({
    title: m.permintaanAckTitle,
    bodyHtml: ackBody,
  });
  try {
    await transport.sendMail({
      from: `"HKBP Glugur" <${user}>`,
      to: email,
      subject: `${m.permintaanAckTitle} - HKBP Glugur`,
      text: `${m.greeting}, ${nama}.\n\n${m.permintaanAckIntro}\n\n${m.permintaanAckSummary}:\n${pesan}\n\n${ackAttachment}\n\n${m.autoNote}`,
      html: ackHtml,
      attachments: logo,
    });
  } catch {
    // Abaikan. Notifikasi utama sudah terkirim.
  }

  return NextResponse.json({ ok: true });
}
