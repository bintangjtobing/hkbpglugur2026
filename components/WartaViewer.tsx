"use client";

import { useState } from "react";
import { wartaList } from "@/lib/warta";
import { track } from "@/lib/analytics";

export function WartaViewer() {
  const [active, setActive] = useState(wartaList[0]?.file ?? "");

  function open(file: string, label: string) {
    setActive(file);
    track("buka_warta", { warta: label });
  }

  if (wartaList.length === 0) {
    return <p className="text-black/60">Belum ada warta tata ibadah.</p>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      {/* Daftar warta */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <p className="mb-2 px-1 text-xs font-medium text-black/50">
          {wartaList.length} warta tersedia
        </p>
        <ul className="max-h-[62vh] space-y-1 overflow-y-auto rounded-2xl border border-line bg-white p-2 shadow-sm">
          {wartaList.map((w) => {
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
        </ul>
      </div>

      {/* Preview PDF */}
      <div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-black">Pratinjau</p>
          <div className="flex gap-2">
            <a
              href={active}
              target="_blank"
              rel="noopener noreferrer"
              title="Buka warta di tab baru"
              className="rounded-full border border-line px-4 py-1.5 text-xs font-semibold text-black hover:bg-mist"
            >
              Buka di tab baru
            </a>
            <a
              href={active}
              download
              title="Unduh warta"
              className="rounded-full bg-royal px-4 py-1.5 text-xs font-semibold text-white hover:bg-royal-600"
            >
              Unduh
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-soft)]">
          <iframe
            src={`${active}#view=FitH`}
            title="Pratinjau Warta Tata Ibadah"
            className="h-[72vh] w-full"
          />
        </div>
      </div>
    </div>
  );
}
