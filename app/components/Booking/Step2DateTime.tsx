"use client";

import { Service } from "@/app/generated/prisma/client";
import { RITUAL_BY_NAME, type RitualName } from "../rituals";
import { fieldLabelStyle, headlineStyle, subStyle } from "./styles";
import { useServices } from "@/app/context/services-context";

const DAYS = ["Hoy", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const DAY_NUMS = [1, 2, 3, 4, 5, 6, 7];
const SLOTS = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00", "20:30"];

type Step2DateTimeProps = {
  ritual: Service;
  day: string;
  setDay: (d: string) => void;
  time: string;
  setTime: (t: string) => void;
};

export function Step2DateTime({ ritual, day, setDay, time, setTime }: Step2DateTimeProps) {
  const blocked = (i: number) => i === 2 || (day === "Mar" && i === 5);

  return (
    <div>
      <h2 style={headlineStyle}>
        ¿Cuándo te <em style={{ color: "var(--cafe)" }}>recibimos?</em>
      </h2>
      <p style={subStyle}>
        {ritual.name} · {ritual.duration}
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
  );
}
