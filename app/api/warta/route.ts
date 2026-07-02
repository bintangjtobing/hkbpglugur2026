import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { renderEmail, infoRow, EMAIL_LOGO_CID } from "@/lib/email-template";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_FILES = 10;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;
const ALLOWED_EXT = ["pdf", "doc", "docx", "jpg", "jpeg", "png", "webp"];

const MAIL_TO = process.env.MAIL_TO || "hkbpglugurmdn@gmail.com";
const MAIL_CC = "bintangjtobing@gmail.com";

const ext = (n: string) => n.split(".").pop()?.toLowerCase() || "";
const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Format permintaan tidak valid." }, { status: 400 });
  }

  if (String(form.get("website") || "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const nama = String(form.get("nama") || "").trim();
  const email = String(form.get("email") || "").trim();
  const telepon = String(form.get("telepon") || "").trim();
  const keterangan = String(form.get("keterangan") || "").trim();

  if (!nama || !email) {
    return NextResponse.json({ error: "Nama dan email wajib diisi." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Alamat email tidak valid." }, { status: 400 });
  }

  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length === 0) {
    return NextResponse.json({ error: "Lampirkan berkas warta." }, { status: 400 });
  }
  if (files.length > MAX_FILES) {
    return NextResponse.json({ error: `Maksimal ${MAX_FILES} file.` }, { status: 400 });
  }
  let total = 0;
  const fileAttachments: { filename: string; content: Buffer }[] = [];
  for (const f of files) {
    if (!ALLOWED_EXT.includes(ext(f.name))) {
      return NextResponse.json({ error: `Tipe file ${f.name} tidak didukung. Gunakan PDF, Word, atau gambar.` }, { status: 400 });
    }
    total += f.size;
    if (total > MAX_TOTAL_BYTES) {
      return NextResponse.json({ error: "Total ukuran file melebihi 20 MB." }, { status: 400 });
    }
    fileAttachments.push({ filename: f.name, content: Buffer.from(await f.arrayBuffer()) });
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    return NextResponse.json({ error: "Layanan email belum dikonfigurasi." }, { status: 503 });
  }

  let logo: { filename: string; content: Buffer; cid: string }[] = [];
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), "public", "email-logo.png"));
    logo = [{ filename: "logo.png", content: buf, cid: EMAIL_LOGO_CID }];
  } catch {
    logo = [];
  }

  const bodyHtml =
    infoRow("Nama Pengirim", escapeHtml(nama)) +
    infoRow("Email", escapeHtml(email)) +
    infoRow("Telepon", escapeHtml(telepon || "-")) +
    infoRow("Keterangan", escapeHtml(keterangan || "-").replace(/\n/g, "<br>")) +
    infoRow("Berkas Warta", `${fileAttachments.length} file`) +
    infoRow("Tindakan", "Mohon diverifikasi lalu diunggah ke halaman Warta Tata Ibadah.");

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user, pass },
  });

  try {
    await transport.sendMail({
      from: `"Kiriman Warta HKBP Glugur" <${user}>`,
      to: MAIL_TO,
      cc: MAIL_CC,
      replyTo: email,
      subject: `Kiriman Warta Tata Ibadah dari ${nama}`,
      text: `Nama: ${nama}\nEmail: ${email}\nTelepon: ${telepon || "-"}\nKeterangan: ${keterangan || "-"}\n\nBerkas: ${fileAttachments.length} file. Mohon diverifikasi lalu diunggah ke halaman Warta Tata Ibadah.`,
      html: renderEmail({ title: "Kiriman Warta Tata Ibadah", bodyHtml }),
      attachments: [...logo, ...fileAttachments],
    });
  } catch {
    return NextResponse.json({ error: "Gagal mengirim. Coba lagi nanti." }, { status: 502 });
  }

  // Email konfirmasi ke pengirim. Kegagalannya tidak membatalkan proses.
  const ackBody = `
    <p style="margin:0 0 14px 0;">Salam sejahtera, <strong>${escapeHtml(nama)}</strong>.</p>
    <p style="margin:0 0 14px 0;">Terima kasih telah mengirimkan Warta Tata Ibadah. Berkas Anda sudah kami terima. Tim kami akan memverifikasi lalu mengunggah versi rapinya ke halaman Warta Tata Ibadah.</p>
    <div style="background:#eef1ff;border-radius:12px;padding:16px 18px;margin:0 0 14px 0;">
      <div style="font-size:12px;font-weight:600;color:#5b6486;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px;">Ringkasan kiriman</div>
      <div style="color:#12183A;">Berkas terkirim: ${fileAttachments.length} file.${keterangan ? "<br>Keterangan: " + escapeHtml(keterangan) : ""}</div>
    </div>
    <p style="margin:0;color:#5b6486;font-size:13px;">Email ini dikirim otomatis. Anda tidak perlu membalasnya. Tuhan Yesus memberkati.</p>
  `;
  try {
    await transport.sendMail({
      from: `"HKBP Glugur" <${user}>`,
      to: email,
      subject: "Warta Anda telah kami terima - HKBP Glugur",
      text: `Salam sejahtera, ${nama}.\n\nTerima kasih telah mengirimkan Warta Tata Ibadah. Berkas Anda sudah kami terima dan akan diverifikasi lalu diunggah ke halaman Warta Tata Ibadah.\n\nBerkas terkirim: ${fileAttachments.length} file.\n\nEmail ini dikirim otomatis. Anda tidak perlu membalasnya. Tuhan Yesus memberkati.`,
      html: renderEmail({ title: "Warta Anda telah kami terima", bodyHtml: ackBody }),
      attachments: logo,
    });
  } catch {
    // Abaikan. Email utama sudah terkirim.
  }

  return NextResponse.json({ ok: true });
}
