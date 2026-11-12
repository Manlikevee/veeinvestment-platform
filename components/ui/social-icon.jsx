import { Instagram, Linkedin } from "lucide-react";

export function SocialIcon({ name, size = 16 }) {
  if (name === "linkedin") return <Linkedin size={size} aria-hidden="true" />;
  if (name === "instagram") return <Instagram size={size} aria-hidden="true" />;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4h4.2l4 5.5L16.8 4H20l-6 8.1L20.5 20h-4.2l-4.4-6-4.9 6H4l6.5-8.4L4 4Z" fill="currentColor" />
    </svg>
  );
}
