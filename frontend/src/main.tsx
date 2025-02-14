import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "./components/ui/toaster.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { AppRoutes } from "./routes/router.tsx";
import { queryClient } from "./lib/tanstack-react-query.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  </React.StrictMode>
);
