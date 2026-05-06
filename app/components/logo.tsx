type LogoProps = {
  size?: number;
  color?: string;
};

export function Logo({ size = 20, color }: LogoProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        color: color ?? "inherit",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1" />
        <path d="M22 8 a10 10 0 1 0 0 16 a8 8 0 1 1 0 -16 z" fill="currentColor" />
      </svg>
      <span
        style={{
          fontFamily: "var(--ff-display)",
          fontSize: size * 0.95,
          letterSpacing: "0.34em",
          fontWeight: 500,
        }}
      >
        LUNAE
      </span>
    </span>
  );
}
