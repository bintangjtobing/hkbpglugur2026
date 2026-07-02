"use client";

import { useEffect, useMemo, useState } from "react";
import { track } from "@/lib/analytics";

type Verse = { bait: string | null; lines: string[] };
type Song = { no: string; judul: string; nada?: string; verses: Verse[] };

export function HymnReader({
  dataUrl,
  prefix,
}: {
  dataUrl: string;
  prefix: string;
}) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    let active = true;
    fetch(dataUrl)
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data: Song[]) => {
        if (!active) return;
        setSongs(data);
        setSelectedIdx(0);
        setStatus("ready");
      })
      .catch(() => active && setStatus("error"));
    return () => {
      active = false;
    };
  }, [dataUrl]);

  const results = useMemo(() => {
    const indexed = songs.map((s, idx) => ({ s, idx }));
    const q = query.trim().toLowerCase();
    if (!q) return indexed;
    return indexed.filter(
      ({ s }) =>
        String(s.no) === q ||
        String(s.no).startsWith(q) ||
        s.judul.toLowerCase().includes(q)
    );
  }, [songs, query]);

  const selected = songs[selectedIdx] ?? null;

  if (status === "loading") {
    return <p className="text-black/60">Memuat data lagu...</p>;
  }
  if (status === "error") {
    return (
      <p className="text-black/70">
        Gagal memuat data lagu. Muat ulang halaman untuk mencoba lagi.
      </p>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      {/* Daftar lagu */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <label className="relative block">
          <span className="sr-only">Cari nomor atau judul lagu</span>
          <input
            type="search"
            inputMode="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Cari ${prefix} nomor atau judul`}
            className="w-full rounded-full border border-line bg-white px-5 py-3 text-sm text-black shadow-sm outline-none transition-colors focus:border-royal"
          />
        </label>

        <p className="mt-3 px-1 text-xs font-medium text-black/50">
          {results.length} lagu
        </p>

        <ul className="mt-2 max-h-[60vh] space-y-1 overflow-y-auto rounded-2xl border border-line bg-white p-2 shadow-sm">
          {results.slice(0, 300).map(({ s, idx }) => {
            const active = idx === selectedIdx;
            return (
              <li key={idx}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedIdx(idx);
                    track("buka_lagu", { buku: prefix, nomor: s.no, judul: s.judul });
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    active ? "bg-navy text-white" : "hover:bg-mist"
                  }`}
                >
                  <span
                    className={`flex h-8 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                      active ? "bg-white/15 text-white" : "bg-mist text-royal"
                    }`}
                  >
                    {s.no}
                  </span>
                  <span
                    className={`truncate text-sm font-medium ${
                      active ? "text-white" : "text-black/80"
                    }`}
                  >
                    {s.judul}
                  </span>
                </button>
              </li>
            );
          })}
          {results.length > 300 ? (
            <li className="px-3 py-2 text-xs text-black/50">
              Ketik lebih spesifik untuk mempersempit hasil.
            </li>
          ) : null}
          {results.length === 0 ? (
            <li className="px-3 py-2 text-sm text-black/50">
              Tidak ada lagu yang cocok.
            </li>
          ) : null}
        </ul>
      </div>

      {/* Lirik */}
      <article className="min-h-[50vh] rounded-[var(--radius-card)] border border-line bg-white p-7 shadow-[var(--shadow-soft)] sm:p-10">
        {selected ? (
          <>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-2xl font-semibold text-royal">
                {prefix} {selected.no}
              </span>
              {selected.nada ? (
                <span className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-black/60">
                  {selected.nada}
                </span>
              ) : null}
            </div>
            <h2 className="mt-2 font-display text-3xl font-semibold text-black">
              {selected.judul}
            </h2>

            <div className="mt-8 space-y-6">
              {selected.verses.map((v, i) => (
                <div key={i} className="flex gap-4">
                  <span className="mt-0.5 w-6 shrink-0 font-display text-lg font-semibold text-royal/70">
                    {v.bait ?? "*"}
                  </span>
                  <p className="whitespace-pre-line text-[17px] leading-relaxed text-black/85">
                    {v.lines.join("\n")}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-black/60">Pilih lagu dari daftar.</p>
        )}
      </article>
    </div>
  );
}
