"use client";

import { useEffect, useMemo, useState } from "react";
import { Step1Ritual } from "./Booking/Step1Ritual";
import { Step2DateTime } from "./Booking/Step2DateTime";
import { Step3Contact, type Step3Errors } from "./Booking/Step3Contact";
import { Step4Confirmation } from "./Booking/Step4Confirmation";
import { Service, User, UserType } from "../generated/prisma/client";
import { useServices } from "../context/services-context";
import { WorkDay } from "../utils/workDays";
import { useCreateReservation } from "../hooks/useCreateReservation";

export type Therapist = User & { userType: UserType };

type BookingModalProps = {
  open: boolean;
  initialRitual?: Service | null;
  onClose: () => void;
  onConfirm?: (ritual: Service) => void;
};

const TOTAL_STEPS = 4;

export function BookingModal({ open, initialRitual, onClose, onConfirm }: BookingModalProps) {
  const { services } = useServices();
  const [step, setStep] = useState(1);
  const [ritual, setRitual] = useState<Service>(initialRitual ?? services[0]);
  const [day, setDay] = useState<WorkDay>();
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [prefs, setPrefs] = useState<Set<string>>(new Set(["Aromaterapia suave"]));
  const [errors, setErrors] = useState<Step3Errors>({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { createReservation, loading: loadingReservation, error: loadingError, reservation } = useCreateReservation();
  const reservationId = useMemo(
    () => `LN-${Math.floor(4000 + Math.random() * 1000)}`,
    [step === TOTAL_STEPS] // eslint-disable-line react-hooks/exhaustive-deps
  );

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

  const togglePref = (p: string) => {
    setPrefs((current) => {
      const next = new Set(current);
      if (next.has(p)) next.delete(p);
      else next.add(p);
      return next;
    });
  };

  const validateContact = () => {
    const e: Step3Errors = {};
    if (!name.trim() || name.trim().length < 2) e.name = "Necesitamos tu nombre";
    if (!phone.trim() || phone.replace(/\D/g, "").length < 7) e.phone = "WhatsApp con código de país";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const canContinue = () => {
    if (step === 1) return !!ritual;
    return true;
  };

  const next = () => {
    if (!canContinue()) return;
    if (step === 4 && !validateContact()) return;
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));
  const reset = () => {
    setStep(1);
    setName("");
    setPhone("");
    setErrors({});
    setTermsAccepted(false);
    onClose();
  };

  const createCalendarEvent = async () => {

    if (!!day && !!time) {
      createReservation({
        name: name,
        phone: phone,
        service: ritual,
        date: day,
        hour: time,
        duration: 1
      }, () => {
          onConfirm?.(ritual);
          reset();
      })
    }
  }

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
            Reserva · paso {step} de {TOTAL_STEPS}
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
          {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
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
            {step === 1 && <Step1Ritual ritual={ritual} setRitual={setRitual} />}
            {/* {step === 2 && (
              <Step2Therapist therapist={therapist} setTherapist={setTherapist} />
            )} */}
            {step === 2 && (
              <Step2DateTime
                ritual={ritual}
                day={day}
                setDay={setDay}
                time={time}
                setTime={setTime}
              />
            )}
            {step === 3 && (
              <Step3Contact
                name={name}
                setName={setName}
                phone={phone}
                setPhone={setPhone}
                prefs={prefs}
                togglePref={togglePref}
                errors={errors}
              />
            )}
            {step === 4 && (
              <Step4Confirmation
                ritual={ritual}
                day={day}
                time={time}
                name={name}
                reservationId={reservationId}
                termsAccepted={termsAccepted}
                onTermsChange={setTermsAccepted}
              />
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
          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={next}
              disabled={!canContinue()}
              className="btn btn-primary"
              style={{
                fontSize: 13,
                padding: "14px 28px",
                opacity: canContinue() ? 1 : 0.45,
                cursor: canContinue() ? "pointer" : "not-allowed",
              }}
            >
              Continuar →
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                createCalendarEvent()
              }}
              disabled={!termsAccepted}
              className="btn btn-primary"
              style={{
                fontSize: 13,
                padding: "14px 28px",
                opacity: termsAccepted ? 1 : 0.45,
                cursor: termsAccepted ? "pointer" : "not-allowed",
              }}
            >
              Confirmar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
