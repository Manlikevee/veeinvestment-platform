"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { demoAccounts } from "@/lib/data/customer";

const SESSION_KEY = "vee-session";
const REMEMBERED_EMAIL_KEY = "vee-remembered-email";

const roleConfig = {
  customer: {
    role: "Customer",
    route: "/dashboard",
    permissions: ["dashboard.view", "investments.view", "documents.upload", "support.create", "profile.edit"],
  },
  admin: {
    role: "Super Administrator",
    route: "/admin",
    permissions: [
      "dashboard.view", "customers.view", "customers.edit", "customers.suspend", "kyc.view",
      "kyc.review", "kyc.approve", "products.manage", "applications.view", "applications.approve",
      "portfolio.view", "portfolio.export", "loans.view", "loans.manage", "loans.approve",
      "transactions.view", "payments.reconcile", "reports.export", "staff.manage", "roles.manage",
      "cms.manage", "support.manage", "notifications.send", "settings.manage", "audit.view",
    ],
  },
  compliance: {
    role: "Compliance Officer",
    route: "/admin",
    permissions: [
      "dashboard.view", "customers.view", "customers.suspend", "kyc.view", "kyc.review",
      "kyc.approve", "applications.view", "loans.view", "transactions.view", "reports.export",
      "support.manage", "audit.view",
    ],
  },
};

const AuthContext = createContext(null);

function buildSession(account, remember) {
  const duration = remember ? 7 * 24 * 60 * 60 * 1000 : 8 * 60 * 60 * 1000;
  return {
    user: {
      id: account.role === "customer" ? "CUS-1042" : account.role === "admin" ? "STF-001" : "STF-002",
      name: account.name,
      email: account.email,
      role: roleConfig[account.role].role,
      roleKey: account.role,
      initials: account.name.split(" ").map((part) => part[0]).join(""),
    },
    permissions: roleConfig[account.role].permissions,
    route: roleConfig[account.role].route,
    issuedAt: Date.now(),
    expiresAt: Date.now() + duration,
  };
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(false);
  const expiryTimer = useRef(null);

  const clearSession = useCallback(() => {
    setSession(null);
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
      window.localStorage.removeItem(SESSION_KEY);
    } catch {
      // No-op: an unavailable session store should not block sign-out.
    }
    if (expiryTimer.current) window.clearTimeout(expiryTimer.current);
  }, []);

  useEffect(() => {
    let parsed = null;
    try {
      const raw =
        window.sessionStorage.getItem(SESSION_KEY) ||
        window.localStorage.getItem(SESSION_KEY);
      parsed = raw ? JSON.parse(raw) : null;
    } catch {
      parsed = null;
    }
    if (parsed?.expiresAt > Date.now()) {
      setSession(parsed);
    } else if (parsed) {
      window.sessionStorage.removeItem(SESSION_KEY);
      window.localStorage.removeItem(SESSION_KEY);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!session) return undefined;
    if (expiryTimer.current) window.clearTimeout(expiryTimer.current);
    const remaining = session.expiresAt - Date.now();
    if (remaining <= 0) {
      clearSession();
      return undefined;
    }
    expiryTimer.current = window.setTimeout(() => {
      clearSession();
    }, Math.min(remaining, 2147483647));
    return () => {
      if (expiryTimer.current) window.clearTimeout(expiryTimer.current);
    };
  }, [session, clearSession]);

  const login = useCallback(async ({ email, password, remember = false }) => {
    await new Promise((resolve) => setTimeout(resolve, 650));
    const normalised = String(email).trim().toLowerCase();
    const account = demoAccounts.find(
      (item) => item.email.toLowerCase() === normalised && item.password === password,
    );
    if (!account) {
      throw new Error(
        "Those credentials did not match a demonstration account. Use one of the account shortcuts below.",
      );
    }
    const nextSession = buildSession(account, remember);
    setSession(nextSession);
    try {
      const targetStore = remember ? window.localStorage : window.sessionStorage;
      const otherStore = remember ? window.sessionStorage : window.localStorage;
      otherStore.removeItem(SESSION_KEY);
      targetStore.setItem(SESSION_KEY, JSON.stringify(nextSession));
      if (remember) {
        window.localStorage.setItem(REMEMBERED_EMAIL_KEY, account.email);
      } else {
        window.localStorage.removeItem(REMEMBERED_EMAIL_KEY);
      }
    } catch {
      // Session remains valid in memory for the current tab.
    }
    return nextSession;
  }, []);

  const logout = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 180));
    clearSession();
  }, [clearSession]);

  const can = useCallback(
    (permission) => Boolean(session?.permissions?.includes(permission)),
    [session],
  );

  const [rememberedEmail, setRememberedEmail] = useState("");
  useEffect(() => {
    try {
      setRememberedEmail(window.localStorage.getItem(REMEMBERED_EMAIL_KEY) || "");
    } catch {
      setRememberedEmail("");
    }
  }, []);

  const value = useMemo(
    () => ({ session, user: session?.user || null, ready, login, logout, can, rememberedEmail }),
    [session, ready, login, logout, can, rememberedEmail],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
