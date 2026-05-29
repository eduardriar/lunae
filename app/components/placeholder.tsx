import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

type Tone = "crema" | "sage" | "cafe" | "dark" | "deep";

type PlaceholderProps = {
  label?: string;
  tone?: Tone;
  imageUrl?: string | null;
  children?: ReactNode;
  style?: CSSProperties;
  alt?: string;
};

const TONE_CLASS: Record<Tone, string> = {
  crema: "ph",
  sage: "ph ph-sage",
  cafe: "ph ph-cafe",
  dark: "ph ph-dark",
  deep: "ph ph-deep",
};

export function Placeholder({ label, tone = "crema", imageUrl, children, style, alt }: PlaceholderProps) {

  return (
    <div className={imageUrl ? undefined : TONE_CLASS[tone]} style={style}>
      {!imageUrl && label ? <div className="ph-label">{label}</div> : null}
      {imageUrl && alt && <Image src={imageUrl} alt={alt} height={0}
        width={1500}
        style={{ height: "100%", width: "auto", ...style }} />}
      {children}
    </div>
  );
}
