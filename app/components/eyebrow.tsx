import type { CSSProperties, ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  color?: string;
  style?: CSSProperties;
};

export function Eyebrow({ children, color, style }: EyebrowProps) {
  return (
    <div
      style={{
        fontFamily: "var(--ff-mono)",
        fontSize: 10,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: color ?? "var(--cafe)",
        fontWeight: 400,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
