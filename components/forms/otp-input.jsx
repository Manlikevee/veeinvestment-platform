"use client";

import { useRef } from "react";

export function OtpInput({ value = "", onChange, length = 6, label = "Verification code", disabled = false }) {
  const refs = useRef([]);
  const digits = Array.from({ length }, (_, index) => value[index] || "");

  function setDigit(index, digit) {
    const next = digits.slice();
    next[index] = digit.replace(/\D/g, "").slice(-1);
    onChange(next.join(""));
    if (digit && index < length - 1) refs.current[index + 1]?.focus();
  }

  function onKeyDown(event, index) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
    if (event.key === "ArrowLeft" && index > 0) refs.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < length - 1) refs.current[index + 1]?.focus();
  }

  function onPaste(event) {
    event.preventDefault();
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted);
    refs.current[Math.min(pasted.length, length - 1)]?.focus();
  }

  return (
    <div className="otp-field">
      <span className="otp-label">{label}</span>
      <div className="otp-inputs" onPaste={onPaste}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { refs.current[index] = el; }}
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={1}
            value={digit}
            disabled={disabled}
            onChange={(event) => setDigit(index, event.target.value)}
            onKeyDown={(event) => onKeyDown(event, index)}
            aria-label={`Digit ${index + 1} of ${length}`}
          />
        ))}
      </div>
    </div>
  );
}
