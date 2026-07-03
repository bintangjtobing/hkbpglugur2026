import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { renderEmail, infoRow, EMAIL_LOGO_CID } from "@/lib/email-template";
import { serverMsg, fill } from "@/lib/i18n/server-messages";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const MAX_FILES = 15;
const MAX_PER_FILE = 15 * 1024 * 1024; // 15 MB per foto
const ALLOWED_EXT = ["jpg", "jpeg", "png"];
const SITE = "https://hkbpglugur.com";

const MAIL_TO = process.env.MAIL_TO || "hkbpglugurmdn@gmail.com";
const MAIL_CC = "bintangjtobing@gmail.com";

const ext = (n: string) => n.split(".").pop()?.toLowerCase() || "";
const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "jemaat";

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: serverMsg("id").invalidFormat }, { status: 400 });
  }

  if (String(form.get("website") || "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const m = serverMsg(String(form.get("locale") || "id"));

  if (!rateLimit(`galeri:${clientIp(request)}`, 6, 600000)) {
    return NextResponse.json({ error: m.tooMany }, { status: 429 });
  }

  const nama = String(form.get("nama") || "").trim();
  const email = String(form.get("email") || "").trim();
  const keterangan = String(form.get("keterangan") || "").trim();

  if (!nama || !email) {
    return NextResponse.json({ error: m.reqNamaEmail }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: m.emailInvalid }, { status: 400 });
  }

  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length === 0) {
    return NextResponse.json({ error: m.pickPhoto }, { status: 400 });
  }
  if (files.length > MAX_FILES) {
    return NextResponse.json({ error: fill(m.maxFotos, { n: MAX_FILES }) }, { status: 400 });
  }
  for (const f of files) {
    if (!ALLOWED_EXT.includes(ext(f.name))) {
      return NextResponse.json({ error: fill(m.onlyJpgPng, { name: f.name }) }, { status: 400 });
    }
    if (f.size > MAX_PER_FILE) {
      return NextResponse.json({ error: fill(m.sizeExceed15, { name: f.name }) }, { status: 400 });
    }
  }

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    return NextResponse.json({ error: m.smtpUnset }, { status: 503 });
  }

  // Simpan foto ke folder pending di server untuk ditinjau developer.
  const id = `${Date.now()}-${slug(nama)}`;
  const relDir = path.join("gallery-pending", id);
  const absDir = path.join(process.cwd(), "public", relDir);
  const links: string[] = [];
  try {
    fs.mkdirSync(absDir, { recursive: true });
    let i = 0;
    for (const f of files) {
      i += 1;
      const safe = `${String(i).padStart(2, "0")}-${slug(f.name.replace(/\.[^.]+$/, ""))}.${ext(f.name)}`;
      fs.writeFileSync(path.join(absDir, safe), Buffer.from(await f.arrayBuffer()));
      links.push(`${SITE}/${relDir}/${safe}`);
    }
  } catch {
    return NextResponse.json({ error: m.saveFailPhoto }, { status: 500 });
  }

  let logo: { filename: string; content: Buffer; cid: string }[] = [];
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), "public", "email-logo.png"));
    logo = [{ filename: "logo.png", content: buf, cid: EMAIL_LOGO_CID }];
  } catch {
    logo = [];
  }

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user, pass },
  });

  const linkList = links
    .map((u) => `<div style="margin:2px 0;"><a href="${u}" style="color:#2138e0;">${escapeHtml(u)}</a></div>`)
    .join("");
  const adminBody =
    infoRow("Nama Pengirim", escapeHtml(nama)) +
    infoRow("Email", escapeHtml(email)) +
    infoRow("Keterangan", escapeHtml(keterangan || "-")) +
    infoRow("Jumlah Foto", `${links.length} foto`) +
    infoRow("Lokasi di Server", `public/${relDir}`) +
    infoRow("Pratinjau Foto", linkList) +
    infoRow("Tindakan", "Tinjau foto, lalu pindahkan yang disetujui ke public/gallery dan daftarkan di lib/gallery.ts. Hapus folder pending setelah selesai.");

  try {
    await transport.sendMail({
      from: `"Kiriman Foto HKBP Glugur" <${user}>`,
      to: MAIL_TO,
      cc: MAIL_CC,
      replyTo: email,
      subject: `Kiriman Foto Galeri dari ${nama} (${links.length} foto)`,
      text: `Nama: ${nama}\nEmail: ${email}\nKeterangan: ${keterangan || "-"}\nJumlah: ${links.length} foto\nLokasi server: public/${relDir}\n\nPratinjau:\n${links.join("\n")}`,
      html: renderEmail({ title: "Kiriman Foto Galeri", bodyHtml: adminBody }),
      attachments: logo,
    });
  } catch {
    return NextResponse.json({ error: m.sendFail }, { status: 502 });
  }

  // Ucapan terima kasih ke pengirim (ikut bahasa pengirim).
  const galeriIntro = fill(m.galeriAckIntro, { n: links.length });
  const ackBody = `
    <p style="margin:0 0 14px 0;">${m.greeting}, <strong>${escapeHtml(nama)}</strong>.</p>
    <p style="margin:0 0 14px 0;">${galeriIntro}</p>
    <p style="margin:0;color:#5b6486;font-size:13px;">${m.autoNote} ${m.blessing}</p>
  `;
  try {
    await transport.sendMail({
      from: `"HKBP Glugur" <${user}>`,
      to: email,
      subject: `${m.galeriAckTitle} - HKBP Glugur`,
      text: `${m.greeting}, ${nama}.\n\n${galeriIntro}\n\n${m.autoNote} ${m.blessing}`,
      html: renderEmail({ title: m.galeriAckTitle, bodyHtml: ackBody }),
      attachments: logo,
    });
  } catch {
    // Abaikan. Notifikasi utama sudah terkirim.
  }

  return NextResponse.json({ ok: true, jumlah: links.length });
}
