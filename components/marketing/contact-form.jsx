"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Input, Select, Textarea } from "@/components/ui/form-field";
import { contactReasons } from "@/lib/data/content";
import { isValidEmail } from "@/lib/utils/validation";
import { useToast } from "@/providers/toast-provider";

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", phone: "", reason: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = "Enter your name.";
    if (!isValidEmail(values.email)) next.email = "Enter a valid email address.";
    if (!values.reason) next.reason = "Select an enquiry type.";
    if (values.message.trim().length < 20) next.message = "Please add at least 20 characters so we can help.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setLoading(false);
    setSent(true);
    toast({
      title: "Message recorded for this demonstration",
      message: "No live message was transmitted. In production this would create a support request.",
      tone: "info",
    });
  }

  if (sent) {
    return (
      <div className="contact-form-panel">
        <div className="auth-success" style={{ textAlign: "left", paddingTop: 0 }}>
          <span className="auth-success-icon" style={{ margin: "0 0 16px" }}><Send size={23} /></span>
          <h2>Your message is ready for review</h2>
          <p style={{ marginLeft: 0 }}>
            This demonstration did not transmit a message. In a live environment, the enquiry would be
            routed to the appropriate team with a reference and response target.
          </p>
          <button type="button" className="btn btn-outline" style={{ marginTop: 20 }} onClick={() => setSent(false)}>
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-form-panel">
      <h2>Send an enquiry</h2>
      <p>Our team usually responds within one business day. Do not include passwords or one-time codes.</p>
      <form className="contact-form" onSubmit={submit} noValidate>
        <div className="form-grid two">
          <Input label="Full name" name="name" value={values.name} onChange={(event) => update("name", event.target.value)} error={errors.name} required />
          <Input label="Email address" name="email" type="email" value={values.email} onChange={(event) => update("email", event.target.value)} error={errors.email} required />
          <Input label="Phone (optional)" name="phone" type="tel" value={values.phone} onChange={(event) => update("phone", event.target.value)} />
          <Select label="Enquiry type" name="reason" value={values.reason} onChange={(event) => update("reason", event.target.value)} options={contactReasons} error={errors.reason} required />
        </div>
        <Textarea label="How can we help?" name="message" value={values.message} onChange={(event) => update("message", event.target.value)} error={errors.message} rows={5} required />
        <p className="auth-demo-note" style={{ textAlign: "left" }}>
          Demonstration form. No message is transmitted or stored on a server.
        </p>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <span className="button-spinner" /> : <Send size={16} />}
          {loading ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
}
