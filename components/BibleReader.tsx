"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { bibleBooks, bibleVersions } from "@/lib/bible-books";
import { track } from "@/lib/analytics";
import { useDict } from "./DictionaryProvider";

type Passage = {
  book: string;
  chapter: number;
  version: string;
  verses: { no: number; text: string }[];
};

type Suggestion = { book: string; chapter: number; verse: number | null; label: string };

function parseQuery(q: string): Suggestion[] {
  const m = q.trim().match(/^(.+?)(?:\s+(\d+)(?::(\d+))?)?$/);
  if (!m) return [];
  const namePart = m[1].toLowerCase();
  const chap = m[2] ? parseInt(m[2], 10) : null;
  const verse = m[3] ? parseInt(m[3], 10) : null;

  const scored = bibleBooks
    .map((b) => {
      const name = b.name.toLowerCase();
      const abbr = b.abbr.toLowerCase();
      let score = -1;
      if (name === namePart || abbr === namePart) score = 3;
      else if (name.startsWith(namePart) || abbr.startsWith(namePart)) score = 2;
      else if (name.includes(namePart)) score = 1;
      return { b, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.b.id - b.b.id)
    .slice(0, 8);

  return scored.map(({ b }) => {
    const c = chap && chap <= b.chapters ? chap : 1;
    return {
      book: b.name,
      chapter: c,
      verse,
      label: `${b.name} ${c}${verse ? ":" + verse : ""}`,
    };
  });
}

export function BibleReader() {
  const t = useDict().dict.ui.bibleReader;
  const [version, setVersion] = useState("tb");
  const [bookName, setBookName] = useState("Kejadian");
  const [chapter, setChapter] = useState(1);
  const [data, setData] = useState<Passage | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  const [query, setQuery] = useState("");
  const [showSug, setShowSug] = useState(false);
  const [targetVerse, setTargetVerse] = useState<number | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const book = bibleBooks.find((b) => b.name === bookName)!;
  const suggestions = useMemo(() => (query.trim() ? parseQuery(query) : []), [query]);

  useEffect(() => {
    let active = true;
    setStatus("loading");
    const params = new URLSearchParams({
      version,
      book: bookName,
      chapter: String(chapter),
    });
    fetch(`/api/alkitab?${params}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: Passage) => {
        if (!active) return;
        setData(d);
        setStatus("ready");
        track("baca_alkitab", { kitab: bookName, pasal: chapter, versi: version });
      })
      .catch(() => active && setStatus("error"));
    return () => {
      active = false;
    };
  }, [version, bookName, chapter]);

  // Sorot dan gulir ke ayat tujuan setelah teks dimuat.
  useEffect(() => {
    if (status !== "ready" || !targetVerse) return;
    const el = document.getElementById(`ayat-${targetVerse}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [status, targetVerse, data]);

  // Tutup saran saat klik di luar.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setShowSug(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function goTo(s: Suggestion) {
    setBookName(s.book);
    setChapter(s.chapter);
    setTargetVerse(s.verse);
    setQuery("");
    setShowSug(false);
  }

  return (
    <div>
      {/* Pencarian referensi */}
      <div ref={boxRef} className="relative mb-4">
        <label className="relative block">
          <span className="sr-only">{t.srSearch}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSug(true);
            }}
            onFocus={() => setShowSug(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && suggestions[0]) {
                e.preventDefault();
                goTo(suggestions[0]);
              }
            }}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-full border border-line bg-white px-5 py-3 text-sm text-black shadow-sm outline-none transition-colors focus:border-royal"
          />
        </label>
        {showSug && suggestions.length > 0 ? (
          <ul className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-[var(--shadow-lift)]">
            {suggestions.map((s) => (
              <li key={s.label}>
                <button
                  type="button"
                  onClick={() => goTo(s)}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm transition-colors hover:bg-mist"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-mist text-royal">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>
                  </span>
                  <span className="font-medium text-black">{s.label}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* Kontrol */}
      <div className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-white p-5 shadow-sm sm:flex-row sm:items-end">
        <label className="flex-1">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-black/50">
            {t.versi}
          </span>
          <select
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            className="w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm font-medium text-black outline-none focus:border-royal"
          >
            {bibleVersions.map((v) => (
              <option key={v.code} value={v.code}>
                {v.label} ({v.short})
              </option>
            ))}
          </select>
        </label>
        <label className="flex-1">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-black/50">
            {t.kitab}
          </span>
          <select
            value={bookName}
            onChange={(e) => {
              setBookName(e.target.value);
              setChapter(1);
              setTargetVerse(null);
            }}
            className="w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm font-medium text-black outline-none focus:border-royal"
          >
            <optgroup label={t.plLabel}>
              {bibleBooks.filter((b) => b.testament === "PL").map((b) => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
            </optgroup>
            <optgroup label={t.pbLabel}>
              {bibleBooks.filter((b) => b.testament === "PB").map((b) => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
            </optgroup>
          </select>
        </label>
        <label className="sm:w-32">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-black/50">
            {t.pasal}
          </span>
          <select
            value={chapter}
            onChange={(e) => {
              setChapter(parseInt(e.target.value, 10));
              setTargetVerse(null);
            }}
            className="w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm font-medium text-black outline-none focus:border-royal"
          >
            {Array.from({ length: book.chapters }, (_, i) => i + 1).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Teks */}
      <article className="mt-6 min-h-[40vh] rounded-[var(--radius-card)] border border-line bg-white p-7 shadow-[var(--shadow-soft)] sm:p-10">
        <h2 className="font-display text-3xl font-semibold text-black">
          {bookName} {chapter}
        </h2>
        <p className="mt-1 text-sm font-medium uppercase tracking-widest text-royal">
          {bibleVersions.find((v) => v.code === version)?.label}
        </p>

        {status === "loading" ? (
          <p className="mt-8 text-black/60">{t.loading}</p>
        ) : status === "error" ? (
          <p className="mt-8 text-black/70">{t.error}</p>
        ) : (
          <div className="mt-8 space-y-3">
            {data?.verses.map((v) => {
              const hit = v.no === targetVerse;
              return (
                <p
                  key={v.no}
                  id={`ayat-${v.no}`}
                  className={`scroll-mt-28 rounded-lg text-[17px] leading-relaxed transition-colors ${
                    hit ? "bg-mist px-3 py-1 text-black" : "text-black/85"
                  }`}
                >
                  <sup className="mr-1.5 font-sans text-xs font-bold text-royal">
                    {v.no}
                  </sup>
                  {v.text}
                </p>
              );
            })}
          </div>
        )}

        {/* Navigasi pasal */}
        <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
          <button
            type="button"
            disabled={chapter <= 1}
            onClick={() => {
              setChapter((c) => Math.max(1, c - 1));
              setTargetVerse(null);
            }}
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-mist disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t.prev}
          </button>
          <span className="text-sm font-medium text-black/50">
            {chapter} / {book.chapters}
          </span>
          <button
            type="button"
            disabled={chapter >= book.chapters}
            onClick={() => {
              setChapter((c) => Math.min(book.chapters, c + 1));
              setTargetVerse(null);
            }}
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-mist disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t.next}
          </button>
        </div>
      </article>
    </div>
  );
}
