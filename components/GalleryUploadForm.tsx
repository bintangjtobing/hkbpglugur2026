"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { fill } from "@/lib/i18n/fill";
import { useDict } from "./DictionaryProvider";

const MAX_FILES = 15;
const MAX_PER_FILE = 15 * 1024 * 1024;
const ALLOWED = ["jpg", "jpeg", "png"];

export function GalleryUploadForm() {
  const { dict, locale } = useDict();
  const c = dict.ui.common;
  const g = dict.ui.galleryForm;
  const [data, setData] = useState({ nama: "", email: "", keterangan: "", website: "" });
  const [files, setFiles] = useState<File[]>([]);
  const [fileErr, setFileErr] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  const field =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-black outline-none focus:border-royal";

  function pick(list: FileList | null) {
    if (!list) return;
    setFileErr("");
    const arr = Array.from(list);
    const valid: File[] = [];
    for (const f of arr) {
      const e = f.name.split(".").pop()?.toLowerCase() || "";
      if (!ALLOWED.includes(e)) {
        setFileErr(fill(g.onlyJpgPng, { name: f.name }));
        continue;
      }
      if (f.size > MAX_PER_FILE) {
        setFileErr(fill(g.sizeExceed, { name: f.name }));
        continue;
      }
      valid.push(f);
    }
    const merged = [...files, ...valid].slice(0, MAX_FILES);
    if (files.length + valid.length > MAX_FILES) {
      setFileErr(fill(g.maxFotos, { n: MAX_FILES }));
    }
    setFiles(merged);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    if (!data.nama.trim() || !data.email.trim() || files.length === 0) {
      setState("error");
      setMsg(g.required);
      return;
    }
    setState("sending");
    setMsg("");
    const fd = new FormData();
    fd.append("nama", data.nama);
    fd.append("email", data.email);
    fd.append("keterangan", data.keterangan);
    fd.append("website", data.website);
    fd.append("locale", locale);
    files.forEach((f) => fd.append("files", f));
    try {
      const res = await fetch("/api/galeri", { method: "POST", body: fd });
      const j = await res.json();
      if (res.ok) {
        setState("ok");
        track("kirim_foto", { jumlah: files.length });
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
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mist text-royal">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold text-black">{c.terimaKasih}</h3>
        <p className="mt-3 text-black/70">{g.successBody}</p>
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
          <label className="mb-1.5 block text-sm font-semibold text-black">{c.email}</label>
          <input className={field} type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder={c.emailPlaceholder} />
        </div>
      </div>
      <div className="mt-5">
        <label className="mb-1.5 block text-sm font-semibold text-black">{c.keterangan}</label>
        <input className={field} value={data.keterangan} onChange={(e) => setData({ ...data, keterangan: e.target.value })} placeholder={g.keteranganPlaceholder} />
      </div>
      <div className="mt-5">
        <label className="mb-1.5 block text-sm font-semibold text-black">{g.foto}</label>
        <p className="mb-2 text-xs text-black/55">{g.fotoHint}</p>
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.png"
          onChange={(e) => pick(e.target.files)}
          className="block w-full text-sm text-black/70 file:mr-4 file:rounded-full file:border-0 file:bg-mist file:px-4 file:py-2 file:text-sm file:font-semibold file:text-royal hover:file:bg-mist-200"
        />
        {fileErr ? <p className="mt-2 text-sm text-red-600">{fileErr}</p> : null}
        {files.length > 0 ? (
          <p className="mt-2 text-xs text-black/60">{fill(g.fotoSelected, { n: files.length })}</p>
        ) : null}
      </div>

      {/* Honeypot */}
      <input tabIndex={-1} autoComplete="off" className="hidden" value={data.website} onChange={(e) => setData({ ...data, website: e.target.value })} />

      {state === "error" ? <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{msg}</p> : null}

      <button type="submit" disabled={state === "sending"} className="mt-6 w-full rounded-full bg-royal px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-royal-600 disabled:opacity-60 sm:w-auto">
        {state === "sending" ? c.mengirim : g.submit}
      </button>
    </form>
  );
}
