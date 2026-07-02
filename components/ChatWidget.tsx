"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Syalom. Saya Pelayan Digital HKBP Glugur. Dengan senang hati saya bantu Anda seputar jadwal ibadah, sejarah, pelayanan, dan informasi gereja kita. Ada yang ingin Anda tanyakan?",
};

const ACCEPT = ".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png,.webp,.gif";

// Bersihkan sisa penanda markdown agar tidak tampil mentah (mis. ** untuk tebal).
function clean(s: string) {
  return s
    .replace(/`+/g, "")
    .replace(/\*+/g, "")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s{0,3}[-•]\s+/gm, "");
}

function PastorAvatar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path d="M24 26c-8 0-14 5-15 12a1 1 0 0 0 1 1h28a1 1 0 0 0 1-1c-1-7-7-12-15-12Z" fill="#2138e0" />
      <path d="M24 26l-5 3 5 10 5-10-5-3Z" fill="#ffffff" />
      <circle cx="24" cy="16" r="8" fill="#f2d9c2" />
      <path d="M16 15a8 8 0 0 1 16 0c0-1-2-3-8-3s-8 2-8 3Z" fill="#3a2a20" />
      <g fill="#f5b301">
        <rect x="23.2" y="30" width="1.6" height="7" rx="0.3" />
        <rect x="21.5" y="32" width="5" height="1.6" rx="0.3" />
      </g>
    </svg>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Mode laporan koreksi
  const [reportOpen, setReportOpen] = useState(false);
  const [report, setReport] = useState({ nama: "", email: "", telepon: "", pesan: "", website: "" });
  const [reportFiles, setReportFiles] = useState<File[]>([]);
  const [reportState, setReportState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [reportMsg, setReportMsg] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open && !reportOpen) inputRef.current?.focus();
  }, [open, reportOpen]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);
    track("tanya_chatbot", { panjang: text.length });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok || !res.body) throw new Error();
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        const shown = clean(acc);
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: shown };
          return copy;
        });
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content:
            "Mohon maaf, layanan sedang terganggu. Silakan coba lagi, atau hubungi gereja di (061) 6611846.",
        };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  }

  async function submitReport() {
    if (reportState === "sending") return;
    if (!report.nama.trim() || !report.email.trim() || !report.pesan.trim()) {
      setReportState("error");
      setReportMsg("Nama, email, dan pesan wajib diisi.");
      return;
    }
    setReportState("sending");
    setReportMsg("");
    const fd = new FormData();
    fd.append("nama", report.nama);
    fd.append("email", report.email);
    fd.append("telepon", report.telepon);
    fd.append("pesan", report.pesan);
    fd.append("website", report.website); // honeypot
    reportFiles.forEach((f) => fd.append("files", f));
    try {
      const res = await fetch("/api/laporan", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        setReportState("ok");
        track("laporan_koreksi_terkirim", {});
      } else {
        setReportState("error");
        setReportMsg(data.error || "Gagal mengirim laporan.");
      }
    } catch {
      setReportState("error");
      setReportMsg("Gagal terhubung. Coba lagi.");
    }
  }

  function resetReport() {
    setReportOpen(false);
    setReportState("idle");
    setReportMsg("");
    setReport({ nama: "", email: "", telepon: "", pesan: "", website: "" });
    setReportFiles([]);
  }

  const field =
    "w-full rounded-xl border border-line bg-paper px-3.5 py-2.5 text-sm text-black outline-none focus:border-royal";

  return (
    <>
      <div
        className={`fixed bottom-24 right-4 z-[70] w-[calc(100vw-2rem)] max-w-sm origin-bottom-right transition-all duration-300 sm:right-6 ${
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-[32rem] max-h-[75vh] flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-lift)]">
          {/* Header */}
          <div className="flex items-center gap-3 bg-navy px-4 py-3.5 text-white">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/10">
              <PastorAvatar className="h-9 w-9" />
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate font-display text-sm font-semibold">Pelayan Digital HKBP Glugur</p>
              <p className="text-xs text-white/60">Siap membantu Anda</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:bg-white/10"
              aria-label="Tutup obrolan"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
          </div>

          {reportOpen ? (
            /* Form laporan koreksi */
            <div className="flex-1 overflow-y-auto bg-paper px-4 py-4">
              {reportState === "ok" ? (
                <div className="rounded-2xl border border-line bg-white p-6 text-center">
                  <p className="font-display text-lg font-semibold text-black">Terima kasih</p>
                  <p className="mt-2 text-sm text-black/70">
                    Laporan Anda sudah kami terima dan diteruskan ke tim untuk ditinjau. Tuhan Yesus memberkati.
                  </p>
                  <button type="button" onClick={resetReport} className="mt-4 rounded-full bg-royal px-5 py-2 text-sm font-semibold text-white">
                    Kembali
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-black/70">
                    Ada informasi yang keliru? Sampaikan di sini. Laporan diteruskan ke tim kami.
                  </p>
                  <input className={field} placeholder="Nama" value={report.nama} onChange={(e) => setReport({ ...report, nama: e.target.value })} />
                  <input className={field} type="email" placeholder="Email" value={report.email} onChange={(e) => setReport({ ...report, email: e.target.value })} />
                  <input className={field} inputMode="tel" placeholder="Nomor telepon (opsional)" value={report.telepon} onChange={(e) => setReport({ ...report, telepon: e.target.value })} />
                  <textarea className={`${field} resize-y`} rows={3} placeholder="Jelaskan informasi yang perlu diperbaiki" value={report.pesan} onChange={(e) => setReport({ ...report, pesan: e.target.value })} />
                  {/* Honeypot tersembunyi */}
                  <input tabIndex={-1} autoComplete="off" className="hidden" value={report.website} onChange={(e) => setReport({ ...report, website: e.target.value })} />
                  <div>
                    <input
                      type="file"
                      multiple
                      accept={ACCEPT}
                      onChange={(e) => setReportFiles(Array.from(e.target.files || []).slice(0, 10))}
                      className="block w-full text-xs text-black/70 file:mr-3 file:rounded-full file:border-0 file:bg-mist file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-royal"
                    />
                    <p className="mt-1 text-[11px] text-black/45">Lampiran gambar, Excel, Word, atau PDF. Maks 10 file, 20 MB.</p>
                    {reportFiles.length > 0 ? (
                      <p className="mt-1 text-[11px] text-black/60">{reportFiles.length} file dipilih</p>
                    ) : null}
                  </div>
                  {reportState === "error" ? <p className="text-sm text-red-600">{reportMsg}</p> : null}
                  <div className="flex gap-2 pt-1">
                    <button type="button" onClick={submitReport} disabled={reportState === "sending"} className="flex-1 rounded-full bg-royal px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
                      {reportState === "sending" ? "Mengirim..." : "Kirim Laporan"}
                    </button>
                    <button type="button" onClick={resetReport} className="rounded-full border border-line px-4 py-2.5 text-sm font-medium text-black/70">
                      Batal
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Pesan */}
              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-paper px-4 py-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        m.role === "user" ? "rounded-br-sm bg-royal text-white" : "rounded-bl-sm border border-line bg-white text-black"
                      }`}
                    >
                      {m.content || (loading && i === messages.length - 1 ? "..." : "")}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="border-t border-line bg-white p-3">
                <div className="flex items-end gap-2">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    placeholder="Tulis pertanyaan Anda..."
                    className="min-w-0 flex-1 rounded-full border border-line bg-paper px-4 py-2.5 text-sm text-black outline-none focus:border-royal"
                  />
                  <button
                    type="button"
                    onClick={send}
                    disabled={loading || !input.trim()}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-royal text-white transition-colors hover:bg-royal-600 disabled:opacity-50"
                    aria-label="Kirim pesan"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" /></svg>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setReportOpen(true)}
                  className="mt-2 w-full text-center text-[11px] text-royal hover:underline"
                >
                  Ada informasi yang keliru? Laporkan di sini
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tombol mengambang */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-4 z-[70] flex h-16 w-16 items-center justify-center rounded-full bg-navy shadow-[0_12px_30px_-8px_rgba(10,21,80,0.6)] transition-transform hover:scale-105 sm:right-6"
        aria-label={open ? "Tutup obrolan" : "Buka obrolan dengan Pelayan Digital"}
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        ) : (
          <PastorAvatar className="h-11 w-11" />
        )}
        {!open ? <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-navy bg-[#22c55e]" /> : null}
      </button>
    </>
  );
}
