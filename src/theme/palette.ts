import { PaletteOptions } from "@mui/material/styles";

export const palette = {
  common: { black: "#000000", white: "#ffffff" },
  primary: { main: "#459de9", light: "#42a5f5", dark: "#1565c0", contrastText: "#ffffff" },
  grey: {
    50: "#f2f2f2",
    100: "#c5c5c5",
    200: "#afafaf",
    400: "#8d8d8d",
    500: "#707070",
    600: "#595959",
    700: "#464646",
  },
  warm: { bg: "#fffaf1", graph: "#ffa25b" },
  cool: { bg: "#f1f2ff", graph: "#5b8cff" },
  transparent: {
    black: "#00000029",
  },
} as const satisfies PaletteOptions;

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    warm: { bg: string; graph: string };
    cool: { bg: string; graph: string };
    transparent: { black: string };
  }
  interface PaletteOptions {
    warm?: { bg: string; graph: string };
    cool?: { bg: string; graph: string };
    transparent?: { black: string };
  }
}
