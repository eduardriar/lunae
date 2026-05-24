import type { CSSProperties, ReactNode } from "react";

type Tone = "crema" | "sage" | "cafe" | "dark" | "deep";

type PlaceholderProps = {
  label?: string;
  tone?: Tone;
  imageUrl?: string | null;
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

export function Placeholder({ label, tone = "crema", imageUrl, children, style }: PlaceholderProps) {
  const composedStyle: CSSProperties = {
    aspectRatio: "1 / 1",
    ...(imageUrl
      ? {
          backgroundImage: `url("${imageUrl}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      : null),
    ...style,
  };

  return (
    <div className={imageUrl ? undefined : TONE_CLASS[tone] } style={composedStyle}>
      {!imageUrl && label ? <div className="ph-label">{label}</div> : null}
      {children}
    </div>
  );
}
