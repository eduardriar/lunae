export const headlineStyle = {
  fontFamily: "var(--ff-display)",
  fontWeight: 400,
  fontSize: 52,
  lineHeight: 1,
  margin: "0 0 10px",
  color: "var(--negro)",
} as const;

export const subStyle = {
  fontFamily: "var(--ff-body)",
  fontSize: 15,
  color: "var(--ink-soft)",
  margin: "0 0 32px",
} as const;

export const fieldLabelStyle = {
  fontFamily: "var(--ff-mono)",
  fontSize: 10,
  letterSpacing: "0.20em",
  color: "var(--cafe)",
  textTransform: "uppercase" as const,
  marginBottom: 12,
};
