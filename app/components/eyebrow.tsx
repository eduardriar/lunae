import type { CSSProperties, ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  color?: string;
  style?: CSSProperties;
  className?: string
};

export function Eyebrow({ children, color, style, className }: EyebrowProps) {
  return (
    <div
      className={className}
      style={{
        fontFamily: "var(--ff-mono)",
        fontSize: 14,
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
