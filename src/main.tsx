import { ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.tsx";
import { theme } from "./theme";

import store from "@/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/*<CssBaseline />*/}
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
