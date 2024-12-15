import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LANGUAGES } from "@common/i18n/constants.ts";
import LanguageDetector from "i18next-browser-languagedetector";
import "dayjs/locale/uk";

import { en } from "./locales/en";
import { ua } from "./locales/ua";
import { he } from "./locales/he";

type LanguageCodeType = (typeof LANGUAGES)[number];

const DEFAULT_LANGUAGE_CODE: LanguageCodeType = "en";
const resources = {
  en,
  ua,
  he,
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    resources,
    fallbackLng: DEFAULT_LANGUAGE_CODE,
    detection: {
      order: ["localStorage", "cookie", "htmlTag", "path", "subdomain", "navigator"],
      caches: ["localStorage", "cookie"],
    },
  });

declare module "i18next" {
  interface i18n {
    language: LanguageCodeType;
  }
  interface CustomTypeOptions {
    resources: typeof en;
    language: LanguageCodeType;
  }
}

export default i18n;
