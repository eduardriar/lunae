"use client";

import { Service } from "@/app/generated/prisma/client";
import { fieldLabelStyle, headlineStyle, subStyle } from "./styles";
import { useCalendarAvailability } from "@/app/hooks/useCalendarAvailability";
import { useEffect, useMemo } from "react";
import { getUpcomingWorkDays, WorkDay } from "@/app/utils/workDays";
import { Therapist } from "../booking-modal";
import { Loading } from "../Loading/Loading";

type Step2DateTimeProps = {
  ritual: Service;
  day: WorkDay | undefined;
  setDay: (d: WorkDay) => void;
  time: string;
  setTime: (t: string) => void;
  therapist: Therapist | null
};

export function Step2DateTime({ ritual, day, setDay, time, setTime, therapist }: Step2DateTimeProps) {
  const { availability, loading, fetchCalendarAvailability } = useCalendarAvailability();
  const days = useMemo(() => getUpcomingWorkDays(5), []);

  useEffect(() => {
    if (day !== undefined && therapist !== undefined) fetchCalendarAvailability(day, therapist)
  }, [day]);

  const displayTimeSlot = () => {
    if (day === undefined) return <></>
    if (loading) {
      return <Loading />
    } else {
      return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {availability && availability.map((t, i) => {
            const isBlocked = t.blocked;
            const sel = time === t.displayTime && !isBlocked;
            return (
              <button
                type="button"
                key={t.displayTime}
                onClick={() => !isBlocked && setTime(t.displayTime)}
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
                {t.displayTime}
              </button>
            );
          })}
        </div>
      )
    }
  }

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
          {days.map((d, i) => {
            const sel = !!day && day.iso === d.iso;
            return (
              <button
                type="button"
                key={d.iso}
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
                  {d.month}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <span>{d.date.getDate()}</span>
                  <span>{d.isToday ? 'Hoy' : d.weekday}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={fieldLabelStyle}>Hora</div>
        {displayTimeSlot()}
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
