import Image from "next/image";
import { church, nav } from "@/lib/content";
import { withUtm } from "@/lib/utm";
import { Mark } from "./Mark";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white/70">
      <Mark className="pointer-events-none absolute -right-10 -top-16 h-72 w-72 text-white/[0.04]" />
      <div className="ulos-thread h-1 w-full opacity-30" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/hkbp-logo.webp"
              alt="Logo HKBP Glugur"
              title="HKBP Glugur"
              width={36}
              height={50}
              className="h-9 w-auto brightness-0 invert"
            />
            <div className="leading-tight">
              <p className="font-display text-lg font-semibold text-white">
                HKBP Glugur
              </p>
              <p className="text-xs text-white/55">{church.distrik}</p>
            </div>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            {church.tagline}
          </p>
        </div>

        <div>
          <p className="eyebrow text-white/45">Navigasi</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-white/45">Kontak</p>
          <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed">
            <p>
              {church.address.street}
              <br />
              {church.address.area}
              <br />
              {church.address.city}
            </p>
          </address>
          <div className="mt-4 flex items-center gap-3">
            <a
              href={withUtm(church.contact.facebook)}
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook HKBP Glugur"
              aria-label="Facebook HKBP Glugur"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5H17V4.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.5V14h2.8v8h3.2Z" /></svg>
            </a>
            <a
              href={withUtm("https://www.youtube.com/@HKBPGLUGURRESSORTMEDANUTARA")}
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube HKBP Glugur"
              aria-label="YouTube HKBP Glugur"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" /></svg>
            </a>
            <a
              href={`mailto:${church.contact.email}`}
              title="Email HKBP Glugur"
              aria-label="Email HKBP Glugur"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
            </a>
          </div>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <a href="/tema-transformasi" className="transition-colors hover:text-white">
              Makna Tema Transformasi HKBP 2024 sampai 2028
            </a>
            <a href="/permintaan" className="transition-colors hover:text-white">
              Permintaan Perbaikan Konten
            </a>
            <a href="/pengembang" className="transition-colors hover:text-white">
              Tentang Pengembang
            </a>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-white/45">
            HKBP mengusung tema Transformasi, berubah oleh pembaruan budi
            (Roma 12:2), untuk menjadi berkat bagi dunia.
          </p>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-xs text-white/45">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <p>
              © {new Date().getFullYear()} HKBP Glugur · {church.ressort}
            </p>
            <p>Sai Tuhan i ma mangaramoti hita. Tuhan memberkati.</p>
          </div>
          <p className="text-center sm:text-left">
            Dibangun sebagai inisiatif relawan oleh{" "}
            <a href="/pengembang" className="font-medium text-white/70 hover:text-white">
              Bintang Tobing
            </a>
            . Dukung lewat{" "}
            <a
              href={withUtm("https://saweria.co/bintangtobing")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white/70 hover:text-white"
            >
              Saweria
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
