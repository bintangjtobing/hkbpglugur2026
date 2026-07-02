"use client";

import { useEffect, useState } from "react";
import { galleryPhotos } from "@/lib/gallery";
import { withUtm } from "@/lib/utm";

type Album = { label: string; desc: string; url: string };

export function PhotoGallery({ albums }: { albums: readonly Album[] }) {
  const photos = galleryPhotos;
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % photos.length));
      if (e.key === "ArrowLeft")
        setOpen((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, photos.length]);

  return (
    <div>
      {photos.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setOpen(i)}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-line bg-white"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.alt}
                title={p.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-[var(--radius-card)] border border-dashed border-mist-200 bg-white/60 p-8 text-center text-black/60">
          Foto galeri akan tampil di sini. Album lengkap tersedia di Google Maps
          dan Facebook melalui tautan di bawah.
        </div>
      )}

      {/* Tautan album */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {albums.map((a) => (
          <a
            key={a.url}
            href={withUtm(a.url)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
          >
            <div>
              <h3 className="text-lg font-semibold text-black">{a.label}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-black/70">
                {a.desc}
              </p>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist text-royal transition-colors group-hover:bg-royal group-hover:text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
            </span>
          </a>
        ))}
      </div>

      {/* Lightbox */}
      {open !== null && photos[open] ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[open].src}
            alt={photos[open].alt}
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
            aria-label="Tutup"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}
