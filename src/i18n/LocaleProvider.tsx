// src/i18n/LocaleProvider.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STR, GROUP_GR, LEVEL_TITLE_GR, LEVEL_SUMMARY_GR, LEVEL_HINT_GR, KID_NOTE_GR, Lang, EXAMPLES_GR } from "./strings";

const KEY = "medkids_lang";

type LocaleCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (k: keyof typeof STR["en"]["ui"], ...args: any[]) => string;
  trGroupName: (name: string) => string;
  trLevelTitle: (id: number, fallback: string) => string;
  trLevelSummary: (id: number, fallback: string) => string;
  trLevelHint: (id: number, fallback?: string) => string | undefined;
  trKidNote: (groupName: string, fallback: string) => string;
  trExamples: (groupName: string, fallback: string[]) => string[];
};

const Ctx = createContext<LocaleCtx>(null as any);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(KEY);
      if (saved === "el" || saved === "en") setLang(saved);
    })();
  }, []);

  const toggle = async () => {
    const next = lang === "en" ? "el" : "en";
    setLang(next);
    await AsyncStorage.setItem(KEY, next);
  };

  const value = useMemo<LocaleCtx>(() => ({
    lang,
    setLang,
    toggle,
    t: (k, ...args) => {
      const pack = STR[lang].ui as any;
      const v = pack[k];
      return typeof v === "function" ? v(...args) : v ?? k;
    },
    trGroupName: (name) => (lang === "el" ? GROUP_GR[name] ?? name : name),
    trLevelTitle: (id, fallback) => (lang === "el" ? (LEVEL_TITLE_GR[id] ?? fallback) : fallback),
    trLevelSummary: (id, fallback) => (lang === "el" ? (LEVEL_SUMMARY_GR[id] ?? fallback) : fallback),
    trLevelHint: (id, fallback) => (lang === "el" ? (LEVEL_HINT_GR[id] ?? fallback) : fallback),
    trKidNote: (groupName, fallback) => (lang === "el" ? (KID_NOTE_GR[groupName] ?? fallback) : fallback),
    trExamples: (groupName, fallback) => (lang === "el" ? (EXAMPLES_GR[groupName] ?? fallback) : fallback),
  }), [lang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useLocale = () => useContext(Ctx);
