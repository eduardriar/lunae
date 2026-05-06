import type { CSSProperties, ReactNode } from "react";

type Tone = "crema" | "sage" | "cafe" | "dark" | "deep";

type PlaceholderProps = {
  label?: string;
  tone?: Tone;
  children?: ReactNode;
  style?: CSSProperties;
};

const TONE_CLASS: Record<Tone, string> = {
  crema: "ph",
  sage: "ph ph-sage",
  cafe: "ph ph-cafe",
  dark: "ph ph-dark",
  deep: "ph ph-deep",
};

export function Placeholder({ label, tone = "crema", children, style }: PlaceholderProps) {
  return (
    <div className={TONE_CLASS[tone]} style={style}>
      {label ? <div className="ph-label">{label}</div> : null}
      {children}
    </div>
  );
}
