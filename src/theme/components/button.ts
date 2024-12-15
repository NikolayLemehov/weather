import { Components, Theme } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export const setButtonComponent = (theme: Theme) => {
  const { palette } = theme;
  const MuiButton: Components<Theme>["MuiButton"] = {
    defaultProps: {
      disableRipple: true,
      variant: "contained",
    },
    styleOverrides: {
      root: {
        minWidth: "112px",
        padding: "10px 20px",
        fontFamily: "Jost, Arial, sans-serif",
        fontSize: "14px",
        lineHeight: "20px",
        fontWeight: 400,
        color: palette.primary.contrastText,
        textTransform: "initial",
      },
    },
  };

  return createTheme(theme, { components: { MuiButton } });
};
