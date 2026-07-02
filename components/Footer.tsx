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
            <p>
              <a
                href={withUtm(church.contact.facebook)}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                {church.contact.facebookLabel}
              </a>
            </p>
          </address>
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
