"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

const MAX_FILES = 10;
const MAX_TOTAL = 20 * 1024 * 1024;
const ACCEPT = ".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png,.webp,.gif";
const ALLOWED = ["pdf", "doc", "docx", "xls", "xlsx", "csv", "jpg", "jpeg", "png", "webp", "gif"];

function fmtSize(n: number) {
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

export function RequestForm() {
  const [captcha, setCaptcha] = useState<{ question: string; token: string } | null>(null);
  const [answer, setAnswer] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const loadCaptcha = () => {
    fetch("/api/captcha")
      .then((r) => r.json())
      .then((d) => setCaptcha(d))
      .catch(() => setCaptcha(null));
  };

  useEffect(loadCaptcha, []);

  const totalSize = files.reduce((s, f) => s + f.size, 0);

  function addFiles(list: FileList | null) {
    if (!list) return;
    setFileError("");
    const incoming = Array.from(list);
    const merged = [...files];
    for (const f of incoming) {
      const ext = f.name.split(".").pop()?.toLowerCase() || "";
      if (!ALLOWED.includes(ext)) {
        setFileError(`Tipe file ${f.name} tidak didukung.`);
        continue;
      }
      if (merged.some((m) => m.name === f.name && m.size === f.size)) continue;
      merged.push(f);
    }
    if (merged.length > MAX_FILES) {
      setFileError(`Maksimal ${MAX_FILES} file.`);
      return;
    }
    if (merged.reduce((s, f) => s + f.size, 0) > MAX_TOTAL) {
      setFileError("Total ukuran file melebihi 20 MB.");
      return;
    }
    setFiles(merged);
    if (fileRef.current) fileRef.current.value = "";
  }

  function removeFile(i: number) {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
    setFileError("");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!captcha) return;
    setStatus("sending");
    setMessage("");
    const fd = new FormData(e.currentTarget);
    fd.delete("files");
    files.forEach((f) => fd.append("files", f));
    fd.append("captchaToken", captcha.token);

    try {
      const res = await fetch("/api/permintaan", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        setStatus("ok");
        setMessage("Pesan Anda terkirim. Terima kasih, tim kami akan meninjau.");
        track("kirim_permintaan_sukses", { jumlah_lampiran: files.length });
        setFiles([]);
        setAnswer("");
        (e.target as HTMLFormElement).reset();
        loadCaptcha();
      } else {
        setStatus("error");
        setMessage(data.error || "Gagal mengirim pesan.");
        track("kirim_permintaan_gagal", { alasan: data.error || "tidak diketahui" });
        loadCaptcha();
        setAnswer("");
      }
    } catch {
      setStatus("error");
      setMessage("Gagal terhubung ke server. Coba lagi.");
    }
  }

  const field =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-black outline-none transition-colors focus:border-royal";
  const label = "mb-1.5 block text-sm font-semibold text-black";

  if (status === "ok") {
    return (
      <div className="rounded-[var(--radius-card)] border border-line bg-white p-10 text-center shadow-[var(--shadow-soft)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mist text-royal">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h2 className="mt-5 font-display text-2xl font-semibold text-black">
          Pesan terkirim
        </h2>
        <p className="mt-3 text-black/70">{message}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full bg-royal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-royal-600"
        >
          Kirim permintaan lain
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nama" className={label}>Nama</label>
          <input id="nama" name="nama" required className={field} placeholder="Nama lengkap" />
        </div>
        <div>
          <label htmlFor="telepon" className={label}>Nomor telepon</label>
          <input id="telepon" name="telepon" inputMode="tel" className={field} placeholder="Opsional" />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="email" className={label}>Email</label>
        <input id="email" name="email" type="email" required className={field} placeholder="nama@email.com" />
      </div>

      <div className="mt-5">
        <label htmlFor="pesan" className={label}>Pesan</label>
        <textarea
          id="pesan"
          name="pesan"
          required
          rows={5}
          className={`${field} resize-y`}
          placeholder="Jelaskan konten, artikel, atau informasi yang perlu diperbaiki atau ditambahkan."
        />
      </div>

      {/* File */}
      <div className="mt-5">
        <label className={label}>Lampiran</label>
        <p className="mb-2 text-xs text-black/55">
          Excel, Word, PDF, atau gambar. Maksimal 10 file, total 20 MB.
        </p>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept={ACCEPT}
          onChange={(e) => addFiles(e.target.files)}
          className="block w-full text-sm text-black/70 file:mr-4 file:rounded-full file:border-0 file:bg-mist file:px-4 file:py-2 file:text-sm file:font-semibold file:text-royal hover:file:bg-mist-200"
        />
        {fileError ? <p className="mt-2 text-sm text-red-600">{fileError}</p> : null}

        {files.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {files.map((f, i) => (
              <li
                key={f.name + f.size}
                className="flex items-center justify-between gap-3 rounded-xl border border-line bg-paper px-4 py-2.5 text-sm"
              >
                <span className="truncate text-black/80">{f.name}</span>
                <span className="flex items-center gap-3">
                  <span className="shrink-0 text-xs text-black/50">{fmtSize(f.size)}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="text-black/40 hover:text-red-600"
                    aria-label={`Hapus ${f.name}`}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
                  </button>
                </span>
              </li>
            ))}
            <li className="px-1 text-xs text-black/50">
              {files.length} file, {fmtSize(totalSize)} dari 20 MB
            </li>
          </ul>
        ) : null}
      </div>

      {/* Captcha */}
      <div className="mt-6 flex flex-wrap items-end gap-4 rounded-xl border border-line bg-mist p-4">
        <div>
          <label htmlFor="captchaAnswer" className={label}>
            Verifikasi: berapa hasil {captcha ? captcha.question : "..."} ?
          </label>
          <input
            id="captchaAnswer"
            name="captchaAnswer"
            inputMode="numeric"
            required
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className={`${field} max-w-40`}
            placeholder="Jawaban"
          />
        </div>
        <button
          type="button"
          onClick={loadCaptcha}
          className="mb-0.5 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-medium text-black/70 hover:bg-white"
        >
          Ganti soal
        </button>
      </div>

      {status === "error" ? (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{message}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending" || !captcha}
        className="mt-6 w-full rounded-full bg-royal px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_-12px_rgba(33,56,224,0.8)] transition-colors hover:bg-royal-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Mengirim..." : "Kirim Permintaan"}
      </button>
    </form>
  );
}
