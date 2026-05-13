"use client";

import { useUsers } from "@/app/context/users-context";
import { User, UserType } from "@/app/generated/prisma/client";
import { Placeholder } from "../placeholder";
import { headlineStyle, subStyle } from "./styles";

type Therapist = User & { userType: UserType };

type Step2TherapistProps = {
  therapist: Therapist | null;
  setTherapist: (t: Therapist) => void;
};

export function Step2Therapist({ therapist, setTherapist }: Step2TherapistProps) {
  const { therapists, loading } = useUsers();

  return (
    <div>
      <h2 style={headlineStyle}>
        Elige tu <em style={{ color: "var(--cafe)" }}>terapeuta.</em>
      </h2>
      <p style={subStyle}>Quien guiará tu ritual.</p>

      {loading && therapists.length === 0 ? (
        <p style={{ fontFamily: "var(--ff-body)", color: "var(--ink-mute)" }}>
          Cargando terapeutas…
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {therapists.map((t) => {
            const selected = therapist ? therapist.id === t.id : false;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTherapist(t)}
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
                    {t.name}
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
                    {t.specialties ?? "Terapeuta · Lunae"}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "var(--ff-mono)",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: selected ? "var(--sage)" : "var(--cafe)",
                  }}
                >
                  {t.userType.name}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
