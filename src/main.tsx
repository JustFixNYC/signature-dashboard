import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary, Provider as RollbarProvider } from "@rollbar/react";
import { AuthProvider } from "./auth";
import App from "./App.tsx";

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: import.meta.env.MODE,
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </RollbarProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
