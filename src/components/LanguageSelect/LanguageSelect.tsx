import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { LanguageCodeType, languageList } from "@common/i18n/constants.ts";
import { useTranslation } from "react-i18next";

export const LanguageSelect = () => {
  const { i18n } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    const newLanguage = event.target.value as LanguageCodeType;
    i18n.changeLanguage(newLanguage);
  };

  return (
    <Select value={i18n.language} onChange={handleChange}>
      {languageList.map(({ id, label }) => (
        <MenuItem key={id} value={id}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};
