import { ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import i18n from "@common/i18n";
import { I18nextProvider } from "react-i18next";

import App from "./App.tsx";
import { theme } from "./theme";

import { store, persistor } from "@/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            {/*<CssBaseline />*/}
            <App />
          </ThemeProvider>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
