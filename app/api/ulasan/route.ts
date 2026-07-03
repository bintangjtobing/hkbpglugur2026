import { NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { renderEmail, infoRow, EMAIL_LOGO_CID } from "@/lib/email-template";
import { verifyCaptcha } from "@/lib/captcha";
import { addReview } from "@/lib/reviews/store";
import { signAction } from "@/lib/reviews/token";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/config";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAIL_TO = process.env.MAIL_TO || "hkbpglugurmdn@gmail.com";
const MAIL_CC = process.env.MAIL_CC || "bintangjtobing@gmail.com";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Format permintaan tidak valid." }, { status: 400 });
  }

  // Honeypot untuk bot.
  if (String(form.get("website") || "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const localeRaw = String(form.get("locale") || "id");
  const locale = isLocale(localeRaw) ? localeRaw : "id";
  const f = getDictionary(locale).reviews.form;

  const anonymous = ["true", "on", "1"].includes(
    String(form.get("anonymous") || "").toLowerCase()
  );
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const text = String(form.get("text") || "").trim();
  const rating = parseInt(String(form.get("rating") || "0"), 10);
  const captchaToken = String(form.get("captchaToken") || "");
  const captchaAnswer = String(form.get("captchaAnswer") || "");

  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: f.ratingRequired }, { status: 400 });
  }
  if (!text) {
    return NextResponse.json({ error: f.textRequired }, { status: 400 });
  }
  if (!anonymous && !name) {
    return NextResponse.json({ error: f.nameRequired }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: f.emailInvalid }, { status: 400 });
  }
  if (!verifyCaptcha(captchaToken, captchaAnswer)) {
    return NextResponse.json({ error: f.captchaWrong }, { status: 400 });
  }

  const review = {
    id: `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`,
    name: anonymous ? "" : name,
    anonymous,
    rating,
    text,
    locale,
    createdAt: new Date().toISOString(),
    status: "pending" as const,
  };
  addReview(review);

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    // Ulasan tersimpan sebagai pending; email moderasi belum bisa dikirim.
    return NextResponse.json({ ok: true });
  }

  let logo: { filename: string; content: Buffer; cid: string }[] = [];
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), "public", "email-logo.png"));
    logo = [{ filename: "logo.png", content: buf, cid: EMAIL_LOGO_CID }];
  } catch {
    logo = [];
  }

  const origin = new URL(request.url).origin;
  const approveUrl = `${origin}/api/ulasan/moderasi?token=${encodeURIComponent(signAction(review.id, "approve"))}`;
  const rejectUrl = `${origin}/api/ulasan/moderasi?token=${encodeURIComponent(signAction(review.id, "reject"))}`;
  const displayName = anonymous ? "Anonim" : name;
  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

  const actionHtml = `
    <a href="${approveUrl}" style="display:inline-block;background:#2138E0;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:999px;font-weight:600;margin-right:8px;">Setujui dan Tayangkan</a>
    <a href="${rejectUrl}" style="display:inline-block;background:#e5e8f5;color:#12183A;text-decoration:none;padding:10px 18px;border-radius:999px;font-weight:600;">Tolak</a>`;

  const bodyHtml =
    infoRow("Nama", escapeHtml(displayName)) +
    infoRow("Rating", `${stars} (${rating}/5)`) +
    infoRow("Anonim", anonymous ? "Ya" : "Tidak") +
    infoRow("Email", escapeHtml(email || "-")) +
    infoRow("Bahasa", escapeHtml(locale)) +
    infoRow("Ulasan", escapeHtml(text).replace(/\n/g, "<br>")) +
    infoRow("Tindakan", actionHtml);

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user, pass },
  });

  try {
    await transport.sendMail({
      from: `"Ulasan HKBP Glugur" <${user}>`,
      to: MAIL_TO,
      cc: MAIL_CC,
      replyTo: email || undefined,
      subject: `Ulasan Baru (${rating}/5) dari ${displayName}`,
      text: `Nama: ${displayName}\nRating: ${rating}/5\nAnonim: ${anonymous ? "Ya" : "Tidak"}\nEmail: ${email || "-"}\nBahasa: ${locale}\n\nUlasan:\n${text}\n\nSetujui: ${approveUrl}\nTolak: ${rejectUrl}`,
      html: renderEmail({ title: "Ulasan Baru Situs", bodyHtml }),
      attachments: logo,
    });
  } catch {
    return NextResponse.json({ error: f.error }, { status: 502 });
  }

  // Email terima kasih ke pengirim bila ada email. Abaikan bila gagal.
  if (email) {
    try {
      const e = getDictionary(locale).reviews.email;
      await transport.sendMail({
        from: `"HKBP Glugur" <${user}>`,
        to: email,
        subject: e.ackTitle,
        text: e.ackBody,
        html: renderEmail({ title: e.ackTitle, bodyHtml: infoRow("", escapeHtml(e.ackBody)) }),
        attachments: logo,
      });
    } catch {
      // Notifikasi utama sudah terkirim.
    }
  }

  return NextResponse.json({ ok: true });
}
