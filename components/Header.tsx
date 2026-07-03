"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { localizeHref } from "@/lib/i18n/href";
import { useDict } from "./DictionaryProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const { dict, locale } = useDict();
  const navLabels = dict.nav as Record<string, string>;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Header transparan di atas banner gelap saat belum di-scroll, teks putih.
  const onDark = !scrolled;
  const lh = (href: string) => localizeHref(href, locale);

  const confetti = [
    { dx: "-26px", dy: "-22px", rot: "220deg", c: "#7c3aed", d: "0s" },
    { dx: "24px", dy: "-24px", rot: "-200deg", c: "#2138e0", d: "0.03s" },
    { dx: "-30px", dy: "6px", rot: "160deg", c: "#f5c542", d: "0.06s" },
    { dx: "30px", dy: "4px", rot: "-150deg", c: "#a78bfa", d: "0.02s" },
    { dx: "-14px", dy: "-30px", rot: "260deg", c: "#0000ff", d: "0.05s" },
    { dx: "14px", dy: "-30px", rot: "-260deg", c: "#f5c542", d: "0.01s" },
    { dx: "-22px", dy: "22px", rot: "120deg", c: "#4f46e5", d: "0.07s" },
    { dx: "22px", dy: "22px", rot: "-120deg", c: "#7c3aed", d: "0.04s" },
    { dx: "2px", dy: "-34px", rot: "300deg", c: "#a78bfa", d: "0.08s" },
    { dx: "0px", dy: "30px", rot: "-90deg", c: "#2138e0", d: "0.06s" },
  ];

  const ThemeBadge = (
    <Link
      href={lh("/tema-transformasi")}
      className="group relative flex items-center rounded-lg border border-line bg-white p-[3px] shadow-sm transition-transform hover:scale-105"
      title={dict.common.themeBadgeTitle}
      aria-label={dict.common.themeBadgeAria}
    >
      <Image
        src="/theme-transformasi.webp"
        alt={dict.common.themeBadgeLogoAlt}
        width={44}
        height={44}
        className="h-9 w-9 object-contain"
      />
      <span className="confetti" aria-hidden="true">
        {confetti.map((p, i) => (
          <i
            key={i}
            style={
              {
                background: p.c,
                animationDelay: p.d,
                "--dx": p.dx,
                "--dy": p.dy,
                "--rot": p.rot,
              } as React.CSSProperties
            }
          />
        ))}
      </span>
    </Link>
  );

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-line shadow-[0_8px_30px_-18px_rgba(10,21,80,0.35)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link
          href={lh("/")}
          className="flex items-center gap-3"
          aria-label={dict.common.homeAria}
        >
          <Image
            src="/hkbp-logo.webp"
            alt={dict.common.logoAlt}
            title="HKBP Glugur, Ressort Medan Utara"
            width={40}
            height={56}
            className={`h-10 w-auto transition-[filter] duration-300 ${
              onDark ? "brightness-0 invert" : ""
            }`}
            priority
          />
          <span className="leading-tight">
            <span
              className={`block font-display text-lg font-semibold transition-colors ${
                onDark ? "text-white" : "text-black"
              }`}
            >
              {dict.common.siteName}
            </span>
            <span
              className={`block text-[11px] font-medium tracking-wide transition-colors ${
                onDark ? "text-white/70" : "text-black/60"
              }`}
            >
              {dict.common.ressortShort}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3 md:gap-4">
          {/* Nav desktop */}
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) =>
              item.children ? (
                <div key={item.key} className="group relative">
                  <Link
                    href={lh(item.href)}
                    className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                      onDark
                        ? "text-white/85 hover:bg-white/10 hover:text-white"
                        : "text-black/80 hover:bg-mist hover:text-royal"
                    }`}
                  >
                    {navLabels[item.key]}
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 transition-transform group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </Link>
                  <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="min-w-52 overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-[var(--shadow-lift)]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={lh(child.href)}
                          className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-black/80 transition-colors hover:bg-mist hover:text-royal"
                        >
                          {navLabels[child.key]}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.key}
                  href={lh(item.href)}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                    onDark
                      ? "text-white/85 hover:bg-white/10 hover:text-white"
                      : "text-black/80 hover:bg-mist hover:text-royal"
                  }`}
                >
                  {navLabels[item.key]}
                </Link>
              )
            )}
          </nav>

          {/* Pemilih bahasa */}
          <div className="hidden lg:block">
            <LanguageSwitcher onDark={onDark} />
          </div>

          {/* Logo tema HKBP 2024 sampai 2028 */}
          {ThemeBadge}

          {/* Toggle mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${
              onDark ? "text-white hover:bg-white/10" : "text-navy hover:bg-mist"
            }`}
            aria-expanded={open}
            aria-label={dict.common.openMenu}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-all ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-current transition-all ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-all ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        className={`border-t bg-white/95 backdrop-blur-md transition-[max-height] duration-300 lg:hidden ${
          open
            ? "max-h-[calc(100dvh-64px)] overflow-y-auto overscroll-contain border-line"
            : "max-h-0 overflow-hidden border-transparent"
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 py-4 pb-8">
          {nav.map((item) => (
            <div key={item.key}>
              <Link
                href={lh(item.href)}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-black/85 hover:bg-mist hover:text-royal"
              >
                {navLabels[item.key]}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={lh(child.href)}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl py-2 pl-8 pr-4 text-sm text-black/65 hover:bg-mist hover:text-royal"
                >
                  {navLabels[child.key]}
                </Link>
              ))}
            </div>
          ))}
          <div className="mt-3 border-t border-line px-4 pt-4">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
