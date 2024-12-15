export const LANGUAGES = ["en", "ua", "he"] as const;
export type LanguageCodeType = (typeof LANGUAGES)[number];
export const languageMap: Record<LanguageCodeType, string> = {
  en: "EN",
  ua: "UA",
  he: "HE",
};
export const languageList = LANGUAGES.map((language) => ({ id: language, label: languageMap[language] }));
