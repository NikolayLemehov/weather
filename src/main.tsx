import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import i18n from "@common/i18n";
import { I18nextProvider } from "react-i18next";

import App from "./App.tsx";
import { theme } from "./theme";

import { store, persistor } from "@/store";
import { NotFound } from "@/components";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth={false} sx={{ my: "25px" }}>
              <Router basename={import.meta.env.BASE_URL}>
                <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Router>
            </Container>
          </ThemeProvider>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
