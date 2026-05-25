"use client";

import { Service, User, UserType } from "@/app/generated/prisma/client";
import { formatCurrency } from "@/app/utils/currency";
import { headlineStyle, subStyle } from "./styles";
import { WorkDay } from "@/app/utils/workDays";
import { ADDRESS } from "@/app/lib/content/content";
import { TermsAndConditions } from "../shared/TermsAndConditions";

type Step4ConfirmationProps = {
  ritual: Service;
  day: WorkDay | undefined;
  time: string;
  name: string;
  reservationId: string;
  termsAccepted: boolean;
  onTermsChange: (accepted: boolean) => void;
};

export function Step4Confirmation({
  ritual,
  day,
  time,
  name,
  reservationId,
  termsAccepted,
  onTermsChange,
}: Step4ConfirmationProps) {
  const rows = [
    ["Ritual", `${ritual.name} · ${ritual.duration} minutos`],
    ["Fecha & hora", `${!!day && day.iso} May · ${time}`],
    ["Lugar", ADDRESS],
    ["Total", formatCurrency(ritual.price)],
  ] as const;

  return (
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
        {rows.map(([k, v], i, arr) => (
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

      <label
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          marginTop: 18,
          fontFamily: "var(--ff-body)",
          fontSize: 13,
          color: "var(--ink)",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => onTermsChange(e.target.checked)}
          style={{ marginTop: 3, accentColor: "var(--cafe)", cursor: "pointer" }}
        />
        <span>
          He leído y acepto los{" "}
        </span>
        <TermsAndConditions style={{ color: "var(--cafe)" }} />
        .
      </label>

      {/* <div style={{ display: "flex", gap: 8, marginTop: 22 }}>
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
      </div> */}
    </div>
  );
}
