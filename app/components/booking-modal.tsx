"use client";

import { useEffect, useMemo, useState } from "react";
import { Placeholder } from "./placeholder";
import { RITUALS, RITUAL_BY_NAME, type RitualName } from "./rituals";

type BookingModalProps = {
  open: boolean;
  initialRitual?: RitualName | null;
  onClose: () => void;
  onConfirm?: (data: { ritual: RitualName; day: string; time: string; name: string }) => void;
};

const DAYS = ["Hoy", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const DAY_NUMS = [1, 2, 3, 4, 5, 6, 7];
const SLOTS = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00", "20:30"];
const PREFS = ["Aromaterapia suave", "Música instrumental", "Sin conversación", "Té después"];

export function BookingModal({ open, initialRitual, onClose, onConfirm }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [ritual, setRitual] = useState<RitualName>(initialRitual ?? "Alquimia Lunae");
  const [day, setDay] = useState("Mié");
  const [time, setTime] = useState("16:00");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [prefs, setPrefs] = useState<Set<string>>(new Set(["Aromaterapia suave"]));
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  const reservationId = useMemo(() => `LN-${Math.floor(4000 + Math.random() * 1000)}`, [step === 4]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (open && initialRitual) setRitual(initialRitual);
  }, [open, initialRitual]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const blocked = (i: number) => i === 2 || (day === "Mar" && i === 5);

  const togglePref = (p: string) => {
    setPrefs((current) => {
      const next = new Set(current);
      if (next.has(p)) next.delete(p);
      else next.add(p);
      return next;
    });
  };

  const validateStep3 = () => {
    const e: typeof errors = {};
    if (!name.trim() || name.trim().length < 2) e.name = "Necesitamos tu nombre";
    if (!phone.trim() || phone.replace(/\D/g, "").length < 7) e.phone = "WhatsApp con código de país";
    if (email && !/.+@.+\..+/.test(email)) e.email = "Revisa el correo";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 3 && !validateStep3()) return;
    setStep((s) => Math.min(4, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));
  const reset = () => {
    setStep(1);
    setName("");
    setPhone("");
    setEmail("");
    setErrors({});
    onClose();
  };

  const r = RITUAL_BY_NAME[ritual];

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(26,24,20,0.55)",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "flex-end",
        zIndex: 1500,
        backdropFilter: "blur(8px)",
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Reserva tu ritual"
        style={{
          width: "100%",
          maxWidth: 640,
          background: "var(--blanco)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-30px 0 80px -20px rgba(0,0,0,0.4)",
          animation: "slideInRight 0.35s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <div
          style={{
            padding: "22px 36px",
            borderBottom: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--ff-mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--cafe)",
            }}
          >
            Reserva · paso {step} de 4
          </div>
          <button
            type="button"
            onClick={reset}
            aria-label="Cerrar"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: 22,
              color: "var(--negro)",
              padding: 4,
              borderRadius: 4,
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: "18px 36px 0", display: "flex", gap: 6 }}>
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              style={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                background: s <= step ? "var(--negro)" : "var(--line)",
                transition: "background 0.4s ease",
              }}
            />
          ))}
        </div>

        <div style={{ flex: 1, padding: "40px 36px", overflow: "auto" }} key={step}>
          <div style={{ animation: "fadeUp 0.35s ease" }}>
            {step === 1 && (
              <div>
                <h2 style={headlineStyle}>
                  Elige tu <em style={{ color: "var(--cafe)" }}>ritual.</em>
                </h2>
                <p style={subStyle}>Cuatro caminos. Una sola intención.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {RITUALS.map((rit) => {
                    const sel = ritual === rit.name;
                    return (
                      <button
                        key={rit.name}
                        type="button"
                        onClick={() => setRitual(rit.name)}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "64px 1fr auto",
                          gap: 18,
                          alignItems: "center",
                          padding: 14,
                          background: sel ? "var(--negro)" : "#fff",
                          border: `1px solid ${sel ? "var(--negro)" : "var(--line)"}`,
                          borderRadius: 6,
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.18s ease",
                        }}
                      >
                        <Placeholder tone={rit.tone} style={{ width: 64, height: 64, borderRadius: 4 }} />
                        <div>
                          <div
                            style={{
                              fontFamily: "var(--ff-display)",
                              fontSize: 22,
                              color: sel ? "var(--blanco)" : "var(--negro)",
                            }}
                          >
                            {rit.name}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--ff-mono)",
                              fontSize: 9,
                              letterSpacing: "0.18em",
                              color: sel ? "var(--sage)" : "var(--ink-mute)",
                              textTransform: "uppercase",
                              marginTop: 4,
                            }}
                          >
                            {rit.duration} · {rit.sub}
                          </div>
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--ff-display)",
                            fontSize: 20,
                            color: sel ? "var(--blanco)" : "var(--negro)",
                          }}
                        >
                          {rit.price}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 style={headlineStyle}>
                  ¿Cuándo te <em style={{ color: "var(--cafe)" }}>recibimos?</em>
                </h2>
                <p style={subStyle}>
                  {ritual} · {r.duration}
                </p>

                <div style={{ marginBottom: 24 }}>
                  <div style={fieldLabelStyle}>Día</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
                    {DAYS.map((d, i) => {
                      const sel = day === d;
                      return (
                        <button
                          type="button"
                          key={d}
                          onClick={() => setDay(d)}
                          style={{
                            padding: "14px 4px",
                            textAlign: "center",
                            border: `1px solid ${sel ? "var(--negro)" : "var(--line)"}`,
                            background: sel ? "var(--negro)" : "#fff",
                            color: sel ? "var(--blanco)" : "var(--negro)",
                            borderRadius: 4,
                            cursor: "pointer",
                            fontFamily: "var(--ff-body)",
                            fontSize: 13,
                            transition: "all 0.15s ease",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "var(--ff-mono)",
                              fontSize: 9,
                              letterSpacing: "0.16em",
                              opacity: 0.7,
                              marginBottom: 2,
                            }}
                          >
                            May
                          </div>
                          {d} {DAY_NUMS[i]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div style={fieldLabelStyle}>Hora</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                    {SLOTS.map((t, i) => {
                      const isBlocked = blocked(i);
                      const sel = time === t && !isBlocked;
                      return (
                        <button
                          type="button"
                          key={t}
                          onClick={() => !isBlocked && setTime(t)}
                          disabled={isBlocked}
                          style={{
                            padding: 14,
                            textAlign: "center",
                            border: `1px solid ${sel ? "var(--negro)" : "var(--line)"}`,
                            background: sel ? "var(--negro)" : isBlocked ? "transparent" : "#fff",
                            color: sel ? "var(--blanco)" : isBlocked ? "#bfb39a" : "var(--negro)",
                            textDecoration: isBlocked ? "line-through" : "none",
                            borderRadius: 4,
                            cursor: isBlocked ? "not-allowed" : "pointer",
                            fontFamily: "var(--ff-body)",
                            fontSize: 13,
                            transition: "all 0.15s ease",
                          }}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      fontFamily: "var(--ff-body)",
                      fontSize: 12,
                      color: "var(--ink-mute)",
                    }}
                  >
                    ✦ Última cita 8 pm · Lun–Sáb. Domingo cierra 7 pm.
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
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
                  <Field
                    label="WhatsApp"
                    value={phone}
                    onChange={setPhone}
                    placeholder="+57 ..."
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
            )}

            {step === 4 && (
              <div>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
                  <div
                    aria-hidden
                    style={{
                      width: 84,
                      height: 84,
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle at 38% 38%, #f4f2e8, #80614b 65%, #1a1814)",
                      boxShadow: "0 0 50px rgba(168,186,163,0.5)",
                      animation: "moonRise 0.7s cubic-bezier(.2,.8,.2,1)",
                    }}
                  />
                </div>
                <h2 style={{ ...headlineStyle, fontSize: 56, textAlign: "center" }}>
                  <em style={{ color: "var(--cafe)" }}>Reservado.</em>
                </h2>
                <p style={{ ...subStyle, textAlign: "center" }}>
                  {name ? `Gracias, ${name.split(" ")[0]}. ` : ""}Te enviamos la confirmación por WhatsApp.
                </p>

                <div
                  style={{
                    background: "#fff",
                    border: "1px solid var(--line)",
                    borderRadius: 6,
                    padding: 26,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--ff-mono)",
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--cafe)",
                      marginBottom: 12,
                    }}
                  >
                    Tu reserva · #{reservationId}
                  </div>
                  {(
                    [
                      ["Ritual", `${ritual} · ${r.duration}`],
                      ["Fecha & hora", `${day} May · ${time}`],
                      ["Terapeuta", "María José · Lead"],
                      ["Lugar", "Cra. 11 #93–43, Bogotá"],
                      ["Total", r.price],
                    ] as const
                  ).map(([k, v], i, arr) => (
                    <div
                      key={k}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        padding: "12px 0",
                        borderTop: "1px solid var(--line-soft)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--ff-body)",
                          fontSize: 12,
                          color: "var(--ink-mute)",
                        }}
                      >
                        {k}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--ff-display)",
                          fontSize: i === arr.length - 1 ? 24 : 17,
                          color: "var(--negro)",
                        }}
                      >
                        {v}
                      </span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 22 }}>
                  <button
                    type="button"
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "1px solid var(--negro)",
                      color: "var(--negro)",
                      padding: 14,
                      borderRadius: 999,
                      fontFamily: "var(--ff-body)",
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    ＋ Calendario
                  </button>
                  <button
                    type="button"
                    style={{
                      flex: 1,
                      background: "var(--sage)",
                      border: "none",
                      color: "var(--negro)",
                      padding: 14,
                      borderRadius: 999,
                      fontFamily: "var(--ff-body)",
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    ✦ Abrir WhatsApp
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            padding: "18px 36px",
            borderTop: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            onClick={step === 1 ? reset : back}
            style={{
              background: "transparent",
              border: "none",
              fontFamily: "var(--ff-body)",
              fontSize: 14,
              color: "var(--ink-soft)",
              cursor: "pointer",
            }}
          >
            ← {step === 1 ? "Cancelar" : "Atrás"}
          </button>
          {step < 4 ? (
            <button
              type="button"
              onClick={next}
              className="btn btn-primary"
              style={{ fontSize: 13, padding: "14px 28px" }}
            >
              Continuar →
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onConfirm?.({ ritual, day, time, name });
                reset();
              }}
              className="btn btn-primary"
              style={{ fontSize: 13, padding: "14px 28px" }}
            >
              Listo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const headlineStyle = {
  fontFamily: "var(--ff-display)",
  fontWeight: 400,
  fontSize: 52,
  lineHeight: 1,
  margin: "0 0 10px",
  color: "var(--negro)",
} as const;

const subStyle = {
  fontFamily: "var(--ff-body)",
  fontSize: 15,
  color: "var(--ink-soft)",
  margin: "0 0 32px",
} as const;

const fieldLabelStyle = {
  fontFamily: "var(--ff-mono)",
  fontSize: 10,
  letterSpacing: "0.20em",
  color: "var(--cafe)",
  textTransform: "uppercase" as const,
  marginBottom: 12,
};

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
};

function Field({ label, value, onChange, placeholder, error }: FieldProps) {
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
