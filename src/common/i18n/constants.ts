export const LANGUAGES = ["en", "ua", "he"] as const;
export type LanguageCodeType = (typeof LANGUAGES)[number];
type LanguageItemType = {
  id: LanguageCodeType;
  label: string;
  dayjsLocale: string;
};
export const languageMap = {
  en: { label: "EN", dayjsLocale: "en" },
  ua: { label: "UA", dayjsLocale: "uk" },
  he: { label: "HE", dayjsLocale: "he" },
} as const satisfies Record<LanguageCodeType, Omit<LanguageItemType, "id">>;
export const languageList = LANGUAGES.map(
  (language): LanguageItemType => ({
    id: language,
    label: languageMap[language].label,
    dayjsLocale: languageMap[language].dayjsLocale,
  })
);
