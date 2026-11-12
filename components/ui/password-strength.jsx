import { Check, X } from "lucide-react";
import { passwordStrength } from "@/lib/utils/validation";

export function PasswordStrength({ password }) {
  const { score, checks, label } = passwordStrength(password);
  return (
    <div className="password-strength" aria-live="polite">
      <div className="strength-head">
        <span>Password strength</span>
        <strong className={`strength-${score}`}>{password ? label : "Not entered"}</strong>
      </div>
      <div className="strength-bars" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((index) => (
          <span key={index} className={index < score ? `is-filled strength-${score}` : ""} />
        ))}
      </div>
      <ul className="strength-checks">
        {checks.map((check) => (
          <li key={check.key} className={check.passed ? "is-passed" : undefined}>
            {check.passed ? <Check size={13} /> : <X size={13} />}
            {check.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
