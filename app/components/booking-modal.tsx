"use client";

import { useEffect } from "react";
import { Step1Ritual } from "./Booking/Step1Ritual";
import { Step2DateTime } from "./Booking/Step2DateTime";
import { Step3Contact } from "./Booking/Step3Contact";
import { Step4Confirmation } from "./Booking/Step4Confirmation";
import { Service, User, UserType } from "../generated/prisma/client";
import { useServices } from "../context/services-context";
import { useReservation, TOTAL_STEPS } from "../context/reservation-context";
import { SideModal } from "./SideModal/side-modal";

export type Therapist = User & { userType: UserType };

type BookingModalProps = {
  open: boolean;
  initialRitual?: Service | null;
  onClose: () => void;
  onConfirm?: (ritual: Service | undefined) => void;
};

export function BookingModal({ open, initialRitual, onClose, onConfirm }: BookingModalProps) {
  const { services } = useServices();
  const reservation = useReservation();

  useEffect(() => {
    if (!open) return;
    if (initialRitual) {
      reservation.setRitual(initialRitual);
    } else if (!reservation.ritual && services[0]) {
      reservation.setRitual(services[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialRitual]);

  const handleConfirm = () => {
    if (!reservation.ritual || !reservation.day || !reservation.time) return;
    reservation.submit(() => {
      onConfirm?.(reservation.ritual);
      onClose();
    });
  };

  return (
    <SideModal open={open} onClose={onClose} ariaLabel="Reserva tu ritual">
      <div
        style={{
          padding: "22px 36px",
          borderBottom: "1px solid var(--line)",
          display: "flex",
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
          Reserva · paso {reservation.step} de {TOTAL_STEPS}
        </div>
      </div>

      <div style={{ padding: "18px 36px 0", display: "flex", gap: 6 }}>
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
          <div
            key={s}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 2,
              background: s <= reservation.step ? "var(--negro)" : "var(--line)",
              transition: "background 0.4s ease",
            }}
          />
        ))}
      </div>

      <div style={{ flex: 1, padding: "40px 36px", overflow: "auto" }} key={reservation.step}>
        <div style={{ animation: "fadeUp 0.35s ease" }}>
          {reservation.step === 1 && reservation.ritual && (
            <Step1Ritual ritual={reservation.ritual} setRitual={reservation.setRitual} />
          )}
          {reservation.step === 2 && reservation.ritual && (
            <Step2DateTime
              ritual={reservation.ritual}
              day={reservation.day}
              setDay={reservation.setDay}
              time={reservation.time}
              setTime={reservation.setTime}
            />
          )}
          {reservation.step === 3 && (
            <Step3Contact
              name={reservation.name}
              setName={reservation.setName}
              phone={reservation.phone}
              setPhone={reservation.setPhone}
              prefs={reservation.prefs}
              togglePref={reservation.togglePref}
              errors={reservation.errors}
            />
          )}
          {reservation.step === 4 && reservation.ritual && (
            <Step4Confirmation
              ritual={reservation.ritual}
              day={reservation.day}
              time={reservation.time}
              name={reservation.name}
              reservationId={reservation.reservationId}
              termsAccepted={reservation.termsAccepted}
              onTermsChange={reservation.setTermsAccepted}
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
          onClick={
            reservation.step === 1
              ? () => {
                  reservation.reset();
                  onClose();
                }
              : reservation.back
          }
          style={{
            background: "transparent",
            border: "none",
            fontFamily: "var(--ff-body)",
            fontSize: 14,
            color: "var(--ink-soft)",
            cursor: "pointer",
          }}
        >
          ← {reservation.step === 1 ? "Cancelar" : "Atrás"}
        </button>
        {reservation.step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={reservation.next}
            disabled={!reservation.canContinue()}
            className="btn btn-primary"
            style={{
              fontSize: 13,
              padding: "14px 28px",
              opacity: reservation.canContinue() ? 1 : 0.45,
              cursor: reservation.canContinue() ? "pointer" : "not-allowed",
            }}
          >
            Continuar →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!reservation.termsAccepted}
            className="btn btn-primary"
            style={{
              fontSize: 13,
              padding: "14px 28px",
              opacity: reservation.termsAccepted ? 1 : 0.45,
              cursor: reservation.termsAccepted ? "pointer" : "not-allowed",
            }}
          >
            Confirmar
          </button>
        )}
      </div>
    </SideModal>
  );
}
