"use client";

import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function Field({
  label,
  htmlFor,
  hint,
  error,
  required,
  className = "",
  children,
}) {
  return (
    <div className={cn("field", error && "has-error", className)}>
      {label ? (
        <label htmlFor={htmlFor}>
          {label}
          {required ? <span className="field-required" aria-hidden="true">*</span> : null}
        </label>
      ) : null}
      {children}
      {error ? <p className="field-error" role="alert">{error}</p> : hint ? <p className="field-hint">{hint}</p> : null}
    </div>
  );
}

export function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  hint,
  required,
  disabled,
  autoComplete,
  className = "",
  inputClassName = "",
  prefix,
  ...props
}) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id} hint={hint} error={error} required={required} className={className}>
      <div className={cn("input-shell", prefix && "has-prefix")}>
        {prefix ? <span className="input-prefix">{prefix}</span> : null}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn("input", inputClassName)}
          {...props}
        />
      </div>
    </Field>
  );
}

export function PasswordInput({
  label,
  name,
  value,
  onChange,
  error,
  hint,
  required,
  autoComplete = "current-password",
  placeholder = "Enter your password",
}) {
  const id = useId();
  const [visible, setVisible] = useState(false);
  return (
    <Field label={label} htmlFor={id} hint={hint} error={error} required={required}>
      <div className="password-shell">
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          className="input"
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
    </Field>
  );
}

export function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  error,
  hint,
  required,
  placeholder = "Select an option",
  className = "",
}) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id} hint={hint} error={error} required={required} className={className}>
      <div className="select-shell">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          className="select"
        >
          <option value="">{placeholder}</option>
          {options.map((option) => {
            const valueKey = typeof option === "string" ? option : option.value;
            const labelKey = typeof option === "string" ? option : option.label;
            return <option key={valueKey} value={valueKey}>{labelKey}</option>;
          })}
        </select>
      </div>
    </Field>
  );
}

export function Textarea({
  label,
  name,
  value,
  onChange,
  error,
  hint,
  required,
  rows = 4,
  placeholder,
  className = "",
}) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id} hint={hint} error={error} required={required} className={className}>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className="textarea"
      />
    </Field>
  );
}
