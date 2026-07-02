"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Syalom. Saya Pelayan Digital HKBP Glugur. Dengan senang hati saya bantu Anda seputar jadwal ibadah, sejarah, pelayanan, dan informasi gereja kita. Ada yang ingin Anda tanyakan?",
};

function PastorAvatar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {/* jubah */}
      <path d="M24 26c-8 0-14 5-15 12a1 1 0 0 0 1 1h28a1 1 0 0 0 1-1c-1-7-7-12-15-12Z" fill="#2138e0" />
      {/* kerah putih */}
      <path d="M24 26l-5 3 5 10 5-10-5-3Z" fill="#ffffff" />
      {/* kepala */}
      <circle cx="24" cy="16" r="8" fill="#f2d9c2" />
      {/* rambut */}
      <path d="M16 15a8 8 0 0 1 16 0c0-1-2-3-8-3s-8 2-8 3Z" fill="#3a2a20" />
      {/* salib kecil di dada */}
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

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
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
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

  return (
    <>
      {/* Panel chat */}
      <div
        className={`fixed bottom-24 right-4 z-[70] w-[calc(100vw-2rem)] max-w-sm origin-bottom-right transition-all duration-300 sm:right-6 ${
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-[32rem] max-h-[70vh] flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-lift)]">
          {/* Header */}
          <div className="flex items-center gap-3 bg-navy px-4 py-3.5 text-white">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/10">
              <PastorAvatar className="h-9 w-9" />
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate font-display text-sm font-semibold">
                Pelayan Digital HKBP Glugur
              </p>
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

          {/* Pesan */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-paper px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-royal text-white"
                      : "rounded-bl-sm border border-line bg-white text-black"
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
            <p className="mt-2 text-center text-[11px] text-black/40">
              Jawaban dibantu AI. Untuk kepastian, hubungi gereja.
            </p>
          </div>
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
        {!open ? (
          <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-navy bg-[#22c55e]" />
        ) : null}
      </button>
    </>
  );
}
