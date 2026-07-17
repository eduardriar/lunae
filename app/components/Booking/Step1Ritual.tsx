"use client";

import { useServices } from "@/app/context/services-context";
import { Placeholder } from "../placeholder";
import { headlineStyle, subStyle } from "./styles";
import { Service } from "@/app/generated/prisma/client";
import { formatCurrency } from "@/app/utils/currency";
import { BOOKING_STEP1 } from "@/app/utils/copies";

type Step1RitualProps = {
  ritual: Service;
  setRitual: (r: Service) => void;
};

export function Step1Ritual({ ritual, setRitual }: Step1RitualProps) {
  const { services } = useServices();

  return (
    <div>
      <h2 style={headlineStyle}>{BOOKING_STEP1.title}</h2>
      <p style={subStyle}>{BOOKING_STEP1.subtitle}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {services.map((service) => {
          const selected = ritual ? ritual.name === service.name : false;
          return (
            <button
              key={service.name}
              type="button"
              onClick={() => setRitual(service)}
              style={{
                display: "grid",
                gridTemplateColumns: "64px 1fr auto",
                gap: 18,
                alignItems: "center",
                padding: 14,
                background: selected ? "var(--negro)" : "#fff",
                border: `1px solid ${selected ? "var(--negro)" : "var(--line)"}`,
                borderRadius: 6,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.18s ease",
              }}
            >
              <Placeholder style={{ width: 64, height: 64, borderRadius: 4 }} />
              <div>
                <div
                  style={{
                    fontFamily: "var(--ff-display)",
                    fontSize: 22,
                    color: selected ? "var(--blanco)" : "var(--negro)",
                  }}
                >
                  {service.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--ff-mono)",
                    fontSize: 9,
                    letterSpacing: "0.18em",
                    color: selected ? "var(--sage)" : "var(--ink-mute)",
                    textTransform: "uppercase",
                    marginTop: 4,
                  }}
                >
                  {service.duration} {BOOKING_STEP1.minutes}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "var(--ff-display)",
                  fontSize: 20,
                  color: selected ? "var(--blanco)" : "var(--negro)",
                }}
              >
                {formatCurrency(service.price)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
