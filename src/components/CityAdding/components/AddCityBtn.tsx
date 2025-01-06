import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { useAppDispatch } from "@common/hooks";
import { addSelectedCity } from "@store/slices/cities/cities.slice.ts";
import { styles } from "@common/constants.ts";

export const AddCityBtn = () => {
  const { t } = useTranslation("home");
  const dispatch = useAppDispatch();
  const handleAddCity = () => {
    dispatch(addSelectedCity());
  };

  return (
    <Button onClick={handleAddCity} sx={{ boxShadow: styles.shadow.main }}>
      {t("button")}
    </Button>
  );
};
