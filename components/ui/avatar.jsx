import { cn } from "@/lib/utils/cn";

const tones = ["emerald", "forest", "sand", "sage", "clay"];

export function Avatar({ name = "", initials, size = "md", tone, className = "" }) {
  const label =
    initials ||
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  const resolvedTone =
    tone || tones[Math.abs([...name].reduce((sum, char) => sum + char.charCodeAt(0), 0)) % tones.length];
  return (
    <span
      className={cn("avatar", `avatar-${size}`, `avatar-${resolvedTone}`, className)}
      aria-hidden="true"
    >
      {label || "?"}
    </span>
  );
}
