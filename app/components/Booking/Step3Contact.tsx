"use client";

import { fieldLabelStyle, headlineStyle, subStyle } from "./styles";
import { PhoneField } from "@/app/components/shared/PhoneField";

const PREFS = ["Aromaterapia suave", "Música instrumental", "Sin conversación", "Té después"];

export type Step3Errors = { name?: string; phone?: string; email?: string };

type Step3ContactProps = {
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  prefs: Set<string>;
  togglePref: (p: string) => void;
  errors: Step3Errors;
};

export function Step3Contact({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  prefs,
  togglePref,
  errors,
}: Step3ContactProps) {
  return (
    <div>
      <h2 style={headlineStyle}>
        ¿Cómo te <em style={{ color: "var(--cafe)" }}>llamamos?</em>
      </h2>
      <p style={subStyle}>Confirmamos por WhatsApp en menos de una hora.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <Field
          label="Nombre"
          value={name}
          onChange={setName}
          placeholder="Como prefieras que te llamemos"
          error={errors.name}
        />
        <PhoneField
          label="WhatsApp"
          value={phone}
          onChange={setPhone}
          placeholder="300 000 0000"
          error={errors.phone}
        />
        <Field
          label="Email · opcional"
          value={email}
          onChange={setEmail}
          placeholder="Para enviar tu confirmación"
          error={errors.email}
        />

        <div style={{ marginTop: 8 }}>
          <div style={{ ...fieldLabelStyle, marginBottom: 10 }}>Preferencias · opcional</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {PREFS.map((p) => {
              const sel = prefs.has(p);
              return (
                <button
                  type="button"
                  key={p}
                  onClick={() => togglePref(p)}
                  style={{
                    background: sel ? "var(--negro)" : "transparent",
                    color: sel ? "var(--blanco)" : "var(--ink-soft)",
                    border: `1px solid ${sel ? "var(--negro)" : "var(--line)"}`,
                    borderRadius: 999,
                    padding: "10px 18px",
                    fontFamily: "var(--ff-body)",
                    fontSize: 12,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {sel ? "✓ " : "+ "}
                  {p}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  maxLength?: number;
};

function Field({ label, value, onChange, placeholder, error, maxLength }: FieldProps) {
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
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        style={{
          width: "100%",
          padding: "14px 16px",
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
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? "var(--error)" : "var(--line)";
        }}
      />
    </div>
  );
}
