"use client";

import { ThemeProvider } from "./theme-provider";
import { AuthProvider } from "./auth-provider";
import { ToastProvider } from "./toast-provider";

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
