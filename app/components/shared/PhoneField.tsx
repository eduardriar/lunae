"use client";

import { useEffect, useState } from "react";

const PHONE_PREFIX = "57";

type PhoneFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
};

export function PhoneField({ label, value, onChange, placeholder, error }: PhoneFieldProps) {
  const stripPrefix = (v: string) =>
    v.startsWith(PHONE_PREFIX) ? v.slice(PHONE_PREFIX.length) : v;
  const [digits, setDigits] = useState(stripPrefix(value));

  useEffect(() => {
    const next = stripPrefix(value);
    if (next !== digits) setDigits(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (raw: string) => {
    const cleaned = raw.replace(/\D/g, "").slice(0, 10);
    setDigits(cleaned);
    onChange(cleaned);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (digits) onChange(PHONE_PREFIX + digits);
    e.currentTarget.style.borderColor = error ? "var(--error)" : "var(--line)";
  };

  return (
    <div>
      <div
        style={{
          fontFamily: "var(--ff-mono)",
          fontSize: 10,
          letterSpacing: "0.2em",
          color: error ? "var(--error)" : "var(--cafe)",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        {label}
        {error ? ` · ${error}` : ""}
      </div>
      <div style={{ position: "relative" }}>
        <span
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "var(--ff-display)",
            fontSize: 18,
            color: "var(--ink-soft)",
            pointerEvents: "none",
          }}
        >
          +57
        </span>
        <input
          value={digits}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          placeholder={placeholder}
          inputMode="numeric"
          maxLength={10}
          style={{
            width: "100%",
            padding: "14px 16px 14px 56px",
            border: `1px solid ${error ? "var(--error)" : "var(--line)"}`,
            borderRadius: 4,
            background: "#fff",
            fontFamily: "var(--ff-display)",
            fontSize: 18,
            color: "var(--negro)",
            outline: "none",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--negro)";
          }}
        />
      </div>
    </div>
  );
}
