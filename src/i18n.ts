import i18n, { type InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

export const supportedLanguages = [
  "en",
  "zh",
  "zh-hant",
  "ja",
  "ko",
  "es",
  "fr",
  "de",
  "it",
  "pt",
  "ru",
  "sv",
  "th",
  "uk",
  "vi",
] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

export const languageNames: Record<SupportedLanguage, string> = {
  en: "English",
  zh: "简体中文",
  "zh-hant": "繁體中文",
  ja: "日本語",
  ko: "한국어",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  pt: "Português",
  ru: "Русский",
  sv: "Svenska",
  th: "ไทย",
  uk: "Українська",
  vi: "Tiếng Việt",
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: supportedLanguages,
    ns: [
      "common",
      "home",
      "colors",
      "typography",
      "buttons",
      "cards",
      "inputs",
      "alerts",
      "loading",
      "modals",
      "navigation",
      "dataDisplay",
      "forms",
      "formsAdvanced",
      "notificationsFeedback",
      "layoutSpacing",
      "tablesGrids",
      "badges",
      "iconsIllustrations",
      "overlaysPortals",
      "microInteractions",
      "accessibility",
      "performance",
    ],
    defaultNS: "common",
    load: "currentOnly", // Only load the exact language (keeps zh-hant separate from zh)
    lowerCaseLng: true, // Normalize zh-Hant to zh-hant
    cleanCode: false,
    nonExplicitSupportedLngs: false, // Only use explicitly listed languages
    detection: {
      order: ["path", "localStorage", "navigator"],
      lookupFromPathIndex: 0,
      caches: ["localStorage"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  } as InitOptions);

export default i18n;
