export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(String(value).trim());
}

export function isValidPhone(value) {
  const digits = String(value).replace(/[^\d]/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

export function passwordStrength(password = "") {
  const checks = [
    { key: "length", label: "At least 10 characters", passed: password.length >= 10 },
    { key: "upper", label: "One uppercase letter", passed: /[A-Z]/.test(password) },
    { key: "lower", label: "One lowercase letter", passed: /[a-z]/.test(password) },
    { key: "number", label: "One number", passed: /\d/.test(password) },
    { key: "symbol", label: "One symbol", passed: /[^A-Za-z0-9]/.test(password) },
  ];
  const score = checks.filter((check) => check.passed).length;
  const labels = ["Very weak", "Weak", "Fair", "Good", "Strong", "Strong"];
  return { score, checks, label: labels[score] };
}

export function isRequired(value) {
  return value !== null && value !== undefined && String(value).trim().length > 0;
}

export function validateFields(values, rules) {
  const errors = {};
  Object.entries(rules).forEach(([field, rule]) => {
    const value = values[field];
    if (rule.required && !isRequired(value)) {
      errors[field] = rule.requiredMessage || "This field is required.";
      return;
    }
    if (value && rule.email && !isValidEmail(value)) {
      errors[field] = "Enter a valid email address.";
    }
    if (value && rule.phone && !isValidPhone(value)) {
      errors[field] = "Enter a valid phone number.";
    }
    if (value && rule.minLength && String(value).length < rule.minLength) {
      errors[field] = `Use at least ${rule.minLength} characters.`;
    }
  });
  return errors;
}
