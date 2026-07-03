"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { fill } from "@/lib/i18n/fill";
import { useDict } from "./DictionaryProvider";

const ACCEPT = ".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp";

export function WartaUploadForm() {
  const { dict, locale } = useDict();
  const c = dict.ui.common;
  const w = dict.ui.wartaForm;
  const [data, setData] = useState({ nama: "", email: "", telepon: "", keterangan: "", website: "" });
  const [files, setFiles] = useState<File[]>([]);
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  const field =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-black outline-none focus:border-royal";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    if (!data.nama.trim() || !data.email.trim() || files.length === 0) {
      setState("error");
      setMsg(w.required);
      return;
    }
    setState("sending");
    setMsg("");
    const fd = new FormData();
    fd.append("nama", data.nama);
    fd.append("email", data.email);
    fd.append("telepon", data.telepon);
    fd.append("keterangan", data.keterangan);
    fd.append("website", data.website);
    fd.append("locale", locale);
    files.forEach((f) => fd.append("files", f));
    try {
      const res = await fetch("/api/warta", { method: "POST", body: fd });
      const j = await res.json();
      if (res.ok) {
        setState("ok");
        track("kirim_warta", { jumlah_berkas: files.length });
      } else {
        setState("error");
        setMsg(j.error || c.gagalKirim);
      }
    } catch {
      setState("error");
      setMsg(c.gagalTerhubung);
    }
  }

  if (state === "ok") {
    return (
      <div className="rounded-[var(--radius-card)] border border-line bg-white p-8 text-center shadow-[var(--shadow-soft)]">
        <h3 className="font-display text-2xl font-semibold text-black">{c.terimaKasih}</h3>
        <p className="mt-3 text-black/70">{w.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-black">{c.nama}</label>
          <input className={field} value={data.nama} onChange={(e) => setData({ ...data, nama: e.target.value })} placeholder={c.namaAnda} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-black">{c.telepon}</label>
          <input className={field} inputMode="tel" value={data.telepon} onChange={(e) => setData({ ...data, telepon: e.target.value })} placeholder={c.opsional} />
        </div>
      </div>
      <div className="mt-5">
        <label className="mb-1.5 block text-sm font-semibold text-black">{c.email}</label>
        <input className={field} type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder={c.emailPlaceholder} />
      </div>
      <div className="mt-5">
        <label className="mb-1.5 block text-sm font-semibold text-black">{c.keterangan}</label>
        <textarea className={`${field} resize-y`} rows={3} value={data.keterangan} onChange={(e) => setData({ ...data, keterangan: e.target.value })} placeholder={w.keteranganPlaceholder} />
      </div>
      <div className="mt-5">
        <label className="mb-1.5 block text-sm font-semibold text-black">{w.berkas}</label>
        <input
          type="file"
          multiple
          accept={ACCEPT}
          onChange={(e) => setFiles(Array.from(e.target.files || []).slice(0, 10))}
          className="block w-full text-sm text-black/70 file:mr-4 file:rounded-full file:border-0 file:bg-mist file:px-4 file:py-2 file:text-sm file:font-semibold file:text-royal hover:file:bg-mist-200"
        />
        {files.length > 0 ? <p className="mt-2 text-xs text-black/60">{fill(w.fileSelected, { n: files.length })}</p> : null}
      </div>

      <div className="mt-4 rounded-xl bg-mist p-4 text-[13px] leading-relaxed text-black/70">
        {w.advice}
      </div>

      {/* Honeypot */}
      <input tabIndex={-1} autoComplete="off" className="hidden" value={data.website} onChange={(e) => setData({ ...data, website: e.target.value })} />

      {state === "error" ? <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{msg}</p> : null}

      <button type="submit" disabled={state === "sending"} className="mt-6 w-full rounded-full bg-royal px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-royal-600 disabled:opacity-60 sm:w-auto">
        {state === "sending" ? c.mengirim : w.submit}
      </button>
    </form>
  );
}
