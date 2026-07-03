import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { renderEmail, infoRow, EMAIL_LOGO_CID } from "@/lib/email-template";
import { serverMsg, fill } from "@/lib/i18n/server-messages";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_FILES = 10;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;
const ALLOWED_EXT = [
  "pdf", "doc", "docx", "xls", "xlsx", "csv",
  "jpg", "jpeg", "png", "webp", "gif",
];

// Laporan koreksi dari chatbot diteruskan ke pengembang.
const MAIL_TO = "bintangjtobing@gmail.com";
const MAIL_CC = process.env.MAIL_TO || "hkbpglugurmdn@gmail.com";

const ext = (n: string) => n.split(".").pop()?.toLowerCase() || "";
const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: serverMsg("id").invalidFormat }, { status: 400 });
  }

  // Honeypot: bot biasanya mengisi field tersembunyi ini.
  if (String(form.get("website") || "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const m = serverMsg(String(form.get("locale") || "id"));

  const nama = String(form.get("nama") || "").trim();
  const email = String(form.get("email") || "").trim();
  const telepon = String(form.get("telepon") || "").trim();
  const pesan = String(form.get("pesan") || "").trim();

  if (!nama || !email || !pesan) {
    return NextResponse.json({ error: m.reqNamaEmailPesan }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: m.emailInvalid }, { status: 400 });
  }

  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_FILES) {
    return NextResponse.json({ error: fill(m.maxFiles, { n: MAX_FILES }) }, { status: 400 });
  }
  let total = 0;
  const fileAttachments: { filename: string; content: Buffer }[] = [];
  for (const f of files) {
    if (!ALLOWED_EXT.includes(ext(f.name))) {
      return NextResponse.json({ error: fill(m.fileType, { name: f.name }) }, { status: 400 });
    }
    total += f.size;
    if (total > MAX_TOTAL_BYTES) {
      return NextResponse.json({ error: m.fileTotal20 }, { status: 400 });
    }
    fileAttachments.push({ filename: f.name, content: Buffer.from(await f.arrayBuffer()) });
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    return NextResponse.json({ error: m.smtpUnset }, { status: 503 });
  }

  let logo: { filename: string; content: Buffer; cid: string }[] = [];
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), "public", "email-logo.png"));
    logo = [{ filename: "logo.png", content: buf, cid: EMAIL_LOGO_CID }];
  } catch {
    logo = [];
  }

  const bodyHtml =
    infoRow("Nama", escapeHtml(nama)) +
    infoRow("Email", escapeHtml(email)) +
    infoRow("Telepon", escapeHtml(telepon || "-")) +
    infoRow("Laporan Koreksi", escapeHtml(pesan).replace(/\n/g, "<br>")) +
    infoRow("Lampiran", `${fileAttachments.length} file`) +
    infoRow("Sumber", "Chatbot situs HKBP Glugur");

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user, pass },
  });

  try {
    await transport.sendMail({
      from: `"Chatbot HKBP Glugur" <${user}>`,
      to: MAIL_TO,
      cc: MAIL_CC,
      replyTo: email,
      subject: `Laporan Koreksi Informasi dari ${nama}`,
      text: `Nama: ${nama}\nEmail: ${email}\nTelepon: ${telepon || "-"}\n\nLaporan:\n${pesan}\n\nLampiran: ${fileAttachments.length} file\nSumber: Chatbot situs HKBP Glugur`,
      html: renderEmail({ title: "Laporan Koreksi Informasi", bodyHtml }),
      attachments: [...logo, ...fileAttachments],
    });
  } catch {
    return NextResponse.json({ error: m.sendFailLaporan }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
