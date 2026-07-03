"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";

type Ctx = { dict: Dictionary; locale: Locale };

const DictionaryContext = createContext<Ctx | null>(null);

export function DictionaryProvider({
  dict,
  locale,
  children,
}: {
  dict: Dictionary;
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <DictionaryContext.Provider value={{ dict, locale }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDict(): Ctx {
  const ctx = useContext(DictionaryContext);
  if (!ctx) {
    throw new Error("useDict harus dipakai di dalam DictionaryProvider");
  }
  return ctx;
}
