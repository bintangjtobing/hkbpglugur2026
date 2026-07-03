"use client";

import { useMemo, useState } from "react";
import { wartaList } from "@/lib/warta";
import { track } from "@/lib/analytics";
import { useDict } from "./DictionaryProvider";

export function WartaViewer() {
  const t = useDict().dict.ui.wartaViewer;
  const [active, setActive] = useState(wartaList[0]?.file ?? "");
  const [query, setQuery] = useState("");
  const [terbaru, setTerbaru] = useState(true);

  function open(file: string, label: string) {
    setActive(file);
    track("buka_warta", { warta: label });
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? wartaList.filter((w) => w.label.toLowerCase().includes(q) || w.date.includes(q))
      : [...wartaList];
    filtered.sort((a, b) => (terbaru ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));
    return filtered;
  }, [query, terbaru]);

  if (wartaList.length === 0) {
    return <p className="text-black/60">{t.empty}</p>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      {/* Daftar warta */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <label className="relative block">
          <span className="sr-only">{t.srSearch}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-full border border-line bg-white px-5 py-2.5 text-sm text-black shadow-sm outline-none focus:border-royal"
          />
        </label>

        <div className="mt-3 flex items-center justify-between px-1">
          <span className="text-xs font-medium text-black/50">
            {results.length} {t.unit}
          </span>
          <button
            type="button"
            onClick={() => setTerbaru((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs font-semibold text-black/70 hover:bg-mist"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M6 12h12M10 18h4" /></svg>
            {terbaru ? t.terbaru : t.terlama}
          </button>
        </div>

        <ul className="mt-2 max-h-[58vh] space-y-1 overflow-y-auto rounded-2xl border border-line bg-white p-2 shadow-sm">
          {results.map((w) => {
            const isActive = w.file === active;
            return (
              <li key={w.file}>
                <button
                  type="button"
                  onClick={() => open(w.file, w.label)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                    isActive ? "bg-navy text-white" : "text-black/80 hover:bg-mist"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      isActive ? "bg-white/15 text-white" : "bg-mist text-royal"
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
                  </span>
                  <span className="font-medium">{w.label}</span>
                </button>
              </li>
            );
          })}
          {results.length === 0 ? (
            <li className="px-3 py-2 text-sm text-black/50">{t.noMatch}</li>
          ) : null}
        </ul>
      </div>

      {/* Preview PDF */}
      <div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-black">{t.pratinjau}</p>
          <div className="flex gap-2">
            <a
              href={active}
              target="_blank"
              rel="noopener noreferrer"
              title={t.bukaTabTitle}
              className="rounded-full border border-line px-4 py-1.5 text-xs font-semibold text-black hover:bg-mist"
            >
              {t.bukaTab}
            </a>
            <a
              href={active}
              download
              title={t.unduhTitle}
              className="rounded-full bg-royal px-4 py-1.5 text-xs font-semibold text-white hover:bg-royal-600"
            >
              {t.unduh}
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-soft)]">
          <iframe
            src={`${active}#view=FitH`}
            title={t.iframeTitle}
            className="h-[72vh] w-full"
          />
        </div>
      </div>
    </div>
  );
}
