import crypto from "crypto";

const SECRET = process.env.CAPTCHA_SECRET || "hkbp-glugur-captcha-secret-2026";
const TTL_MS = 10 * 60 * 1000; // 10 menit

function sign(payload: string) {
  return crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
}

export function makeCaptcha() {
  const ops = ["+", "-", "×"] as const;
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a = Math.floor(Math.random() * 10) + 1;
  let b = Math.floor(Math.random() * 10) + 1;
  let answer: number;
  if (op === "+") answer = a + b;
  else if (op === "-") {
    if (b > a) [a, b] = [b, a]; // hindari hasil negatif
    answer = a - b;
  } else {
    a = Math.floor(Math.random() * 8) + 2;
    b = Math.floor(Math.random() * 8) + 2;
    answer = a * b;
  }
  const exp = Date.now() + TTL_MS;
  const payload = `${answer}.${exp}`;
  const token = `${Buffer.from(payload).toString("base64url")}.${sign(payload)}`;
  return { question: `${a} ${op} ${b}`, token };
}

export function verifyCaptcha(token: string, userAnswer: string): boolean {
  if (!token || !userAnswer) return false;
  const [b64, sig] = token.split(".");
  if (!b64 || !sig) return false;
  let payload: string;
  try {
    payload = Buffer.from(b64, "base64url").toString("utf8");
  } catch {
    return false;
  }
  if (sign(payload) !== sig) return false;
  const [answerStr, expStr] = payload.split(".");
  if (Date.now() > Number(expStr)) return false;
  return Number(userAnswer.trim()) === Number(answerStr);
}
