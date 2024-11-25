import { Components, Theme } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { palette } from "../palette.ts";

export const setTypographyComponent = (theme: Theme) => {
  const { palette: p } = theme;
  const MuiTypography: Components<Theme>["MuiTypography"] = {
    styleOverrides: {
      root: {
        fontFamily: "Jost, Arial, sans-serif",
        color: p.common.black,
      },
    },
  };

  return createTheme(theme, { components: { MuiTypography } });
};

type PaletteOptions = typeof palette;
type PaletteOptionsKeys = keyof PaletteOptions;
type NestedPaletteOptionsKeys = {
  [K in PaletteOptionsKeys]: PaletteOptions[K] extends Record<string | number, string>
    ? `${K}.${Extract<keyof PaletteOptions[K], string | number>}`
    : K;
}[PaletteOptionsKeys];

type AllPaletteKeys = PaletteOptionsKeys | NestedPaletteOptionsKeys;
type TypographyPropsColorOverridesType = {
  [K in AllPaletteKeys]: true;
};

declare module "@mui/material/Typography" {
  interface TypographyPropsColorOverrides extends TypographyPropsColorOverridesType {}
}
