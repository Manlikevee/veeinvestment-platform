"use client";

import { useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { useToast } from "@/providers/toast-provider";
import { isValidEmail } from "@/lib/utils/validation";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function submit(event) {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 650));
    setLoading(false);
    setDone(true);
    toast({
      title: "Interest recorded",
      message: "This demonstration does not add you to a live mailing list.",
      tone: "info",
    });
  }

  if (done) {
    return (
      <div className="newsletter-success" role="status">
        <CheckCircle2 size={20} />
        <div>
          <strong>You are on the demonstration list</strong>
          <p>No live email has been sent and no mailing-list record was created.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="newsletter-form" onSubmit={submit} noValidate>
      <div className="newsletter-form-row">
        <label className="sr-only" htmlFor="newsletter-email">Email address</label>
        <input
          id="newsletter-email"
          className="input"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          aria-invalid={Boolean(error)}
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <span className="button-spinner" /> : <Mail size={16} />}
          {loading ? "Joining…" : "Subscribe"}
        </button>
      </div>
      {error ? <p className="field-error" role="alert">{error}</p> : null}
      <small>Occasional research and platform notes. No spam. Read our <a href="/privacy-policy">privacy policy</a>. Demonstration only.</small>
    </form>
  );
}
