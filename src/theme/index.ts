import { createTheme } from "@mui/material/styles";

import { setButtonComponent, setTypographyComponent } from "./components";
import { palette } from "./palette.ts";

let theme = createTheme({
  palette,
});
theme = setButtonComponent(theme);
theme = setTypographyComponent(theme);

export { theme };
