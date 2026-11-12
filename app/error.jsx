"use client";
import { RefreshCw } from "lucide-react";
export default function ErrorPage({ error, reset }) {
  return <div className="auth-gate-loading" style={{ minHeight: "100vh" }}><p className="eyebrow">Something went wrong</p><h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.3rem", fontWeight: 400 }}>We could not load this view.</h1><p style={{ maxWidth: 440 }}>{error?.digest ? `Reference: ${error.digest}` : "Please retry. If the problem continues, contact support with the time and page."}</p><button type="button" className="btn btn-primary" onClick={() => reset()}><RefreshCw size={16} /> Try again</button></div>;
}
