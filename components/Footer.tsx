"use client";

import Image from "next/image";
import Link from "next/link";
import { church, nav } from "@/lib/content";
import { withUtm } from "@/lib/utm";
import { localizeHref } from "@/lib/i18n/href";
import { useDict } from "./DictionaryProvider";
import { Mark } from "./Mark";

export function Footer() {
  const { dict, locale } = useDict();
  const navLabels = dict.nav as Record<string, string>;
  const lh = (href: string) => localizeHref(href, locale);

  return (
    <footer className="relative overflow-hidden bg-navy text-white/70">
      <Mark className="pointer-events-none absolute -right-10 -top-16 h-72 w-72 text-white/[0.04]" />
      <div className="ulos-thread h-1 w-full opacity-30" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/hkbp-logo.webp"
              alt={dict.common.logoAlt}
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
            {dict.common.tagline}
          </p>
        </div>

        <div>
          <p className="eyebrow text-white/45">{dict.footer.navigasi}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={lh(item.href)}
                  className="transition-colors hover:text-white"
                >
                  {navLabels[item.key]}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={lh("/ulasan")}
                className="transition-colors hover:text-white"
              >
                {navLabels.ulasan}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-white/45">{dict.footer.kontak}</p>
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
              title={dict.footer.facebook}
              aria-label={dict.footer.facebook}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5H17V4.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.5V14h2.8v8h3.2Z" /></svg>
            </a>
            <a
              href={withUtm("https://www.youtube.com/@HKBPGLUGURRESSORTMEDANUTARA")}
              target="_blank"
              rel="noopener noreferrer"
              title={dict.footer.youtube}
              aria-label={dict.footer.youtube}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" /></svg>
            </a>
            <a
              href={`mailto:${church.contact.email}`}
              title={dict.footer.email}
              aria-label={dict.footer.email}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
            </a>
          </div>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <Link href={lh("/tema-transformasi")} className="transition-colors hover:text-white">
              {dict.footer.temaLink}
            </Link>
            <Link href={lh("/permintaan")} className="transition-colors hover:text-white">
              {dict.footer.permintaanLink}
            </Link>
            <Link href={lh("/pengembang")} className="transition-colors hover:text-white">
              {dict.footer.pengembangLink}
            </Link>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-white/45">
            {dict.footer.temaBlurb}
          </p>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-xs text-white/45">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <p>
              © {new Date().getFullYear()} HKBP Glugur · {church.ressort}
            </p>
            <p>{dict.footer.berkat}</p>
          </div>
          <p className="text-center sm:text-left">
            {dict.footer.relawanPre}{" "}
            <Link href={lh("/pengembang")} className="font-medium text-white/70 hover:text-white">
              Bintang Tobing
            </Link>
            {dict.footer.relawanMid}{" "}
            <a
              href={withUtm("https://saweria.co/bintangtobing")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white/70 hover:text-white"
            >
              Saweria
            </a>
            {dict.footer.relawanPost}
          </p>
        </div>
      </div>
    </footer>
  );
}
