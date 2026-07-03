"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { useDict } from "./DictionaryProvider";

type Captcha = { question: string; token: string };

export function ReviewForm() {
  const { dict, locale } = useDict();
  const t = dict.reviews.form;

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [anonymous, setAnonymous] = useState(false);
  const [captcha, setCaptcha] = useState<Captcha | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  const loadCaptcha = () => {
    fetch("/api/captcha")
      .then((r) => r.json())
      .then(setCaptcha)
      .catch(() => setCaptcha(null));
  };

  useEffect(() => {
    loadCaptcha();
    track("buka_ulasan");
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating < 1) {
      setStatus("error");
      setMessage(t.ratingRequired);
      return;
    }
    setStatus("sending");
    setMessage("");

    const fd = new FormData(e.currentTarget);
    fd.append("rating", String(rating));
    fd.append("locale", locale);
    if (captcha) fd.append("captchaToken", captcha.token);
    fd.set("anonymous", anonymous ? "true" : "false");

    try {
      const res = await fetch("/api/ulasan", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("ok");
        track("kirim_ulasan_sukses", { rating });
      } else {
        setStatus("error");
        setMessage(data.error || t.error);
        track("kirim_ulasan_gagal", { alasan: data.error || "tidak diketahui" });
        loadCaptcha();
      }
    } catch {
      setStatus("error");
      setMessage(t.errorConn);
      loadCaptcha();
    }
  };

  if (status === "ok") {
    return (
      <div className="rounded-[var(--radius-card)] border border-line bg-white p-8 text-center shadow-[var(--shadow-soft)]">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mist text-royal">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-black">{t.successTitle}</h3>
        <p className="mt-2 text-[15px] text-black/70">{t.successBody}</p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setRating(0);
            setAnonymous(false);
            setMessage("");
            loadCaptcha();
          }}
          className="mt-6 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-mist"
        >
          {t.another}
        </button>
      </div>
    );
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-[15px] text-black outline-none transition-colors focus:border-royal";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8"
    >
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* Rating bintang */}
      <div>
        <span className="text-sm font-semibold text-black">{t.rating}</span>
        <div className="mt-2 flex gap-1.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              aria-label={`${n}`}
              className="p-0.5"
            >
              <svg
                viewBox="0 0 24 24"
                className={`h-8 w-8 transition-colors ${
                  n <= (hover || rating) ? "text-[#f5b301]" : "text-line"
                }`}
                fill="currentColor"
              >
                <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <label className="text-sm font-semibold text-black">
          {t.text}
          <textarea
            name="text"
            rows={4}
            required
            placeholder={t.textPlaceholder}
            className={`${inputClass} resize-y`}
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-black">
          {t.name}
          <input
            type="text"
            name="name"
            placeholder={t.namePlaceholder}
            disabled={anonymous}
            className={`${inputClass} disabled:bg-mist disabled:text-black/40`}
          />
        </label>
        <label className="text-sm font-semibold text-black">
          {t.email}
          <input type="email" name="email" placeholder="email@contoh.com" className={inputClass} />
          <span className="mt-1 block text-xs font-normal text-black/50">
            {t.emailHint}
          </span>
        </label>
      </div>

      <label className="mt-4 flex items-center gap-2.5 text-sm text-black/80">
        <input
          type="checkbox"
          checked={anonymous}
          onChange={(e) => setAnonymous(e.target.checked)}
          className="h-4 w-4 rounded border-line text-royal"
        />
        {t.anonymous}
      </label>

      {/* Captcha */}
      <div className="mt-5 flex flex-wrap items-end gap-3">
        <label className="text-sm font-semibold text-black">
          {captcha ? `${t.captchaLabel} ${captcha.question} ?` : `${t.captchaLabel} ...`}
          <input
            type="text"
            name="captchaAnswer"
            inputMode="numeric"
            required
            className={`${inputClass} w-28`}
          />
        </label>
        <button
          type="button"
          onClick={loadCaptcha}
          className="mb-0.5 text-sm font-medium text-royal underline-offset-2 hover:underline"
        >
          {t.captchaChange}
        </button>
      </div>

      {status === "error" && message ? (
        <p className="mt-4 text-sm font-medium text-[#b42318]">{message}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-royal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-royal-600 disabled:opacity-60"
      >
        {status === "sending" ? t.sending : t.submit}
      </button>
    </form>
  );
}
