/* ============================================================
   Token moderasi bertanda tangan HMAC untuk tautan Setujui/Tolak
   di email admin. Pola sama dengan lib/captcha.ts. Tanpa kedaluwarsa
   supaya admin bisa menekan tautan kapan saja.
   ============================================================ */
import crypto from "crypto";

const SECRET = process.env.CAPTCHA_SECRET || "hkbp-glugur-captcha-secret-2026";

export type ReviewAction = "approve" | "reject";

function sign(payload: string) {
  return crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
}

export function signAction(id: string, action: ReviewAction): string {
  const payload = `${id}.${action}`;
  return `${Buffer.from(payload).toString("base64url")}.${sign(payload)}`;
}

export function verifyAction(
  token: string
): { id: string; action: ReviewAction } | null {
  const [b64, sig] = (token || "").split(".");
  if (!b64 || !sig) return null;
  let payload: string;
  try {
    payload = Buffer.from(b64, "base64url").toString("utf8");
  } catch {
    return null;
  }
  if (sign(payload) !== sig) return null;
  const [id, action] = payload.split(".");
  if (action !== "approve" && action !== "reject") return null;
  return { id, action };
}
