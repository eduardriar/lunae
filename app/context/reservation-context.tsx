"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Service } from "../generated/prisma/client";
import { WorkDay } from "../utils/workDays";
import { useCreateReservation } from "../hooks/useCreateReservation";
import type { Step3Errors } from "../components/Booking/Step3Contact";

export const TOTAL_STEPS = 4;

type ReservationContextValue = {
  // wizard
  step: number;
  setStep: (s: number) => void;
  next: () => void;
  back: () => void;
  reset: () => void;
  canContinue: () => boolean;
  validateContact: () => boolean;
  reservationId: string;

  // form fields
  ritual: Service | undefined;
  setRitual: (r: Service | undefined) => void;
  day: WorkDay | undefined;
  setDay: (d: WorkDay | undefined) => void;
  time: string;
  setTime: (t: string) => void;
  name: string;
  setName: (n: string) => void;
  phone: string;
  setPhone: (p: string) => void;
  prefs: Set<string>;
  togglePref: (p: string) => void;
  errors: Step3Errors;
  setErrors: (e: Step3Errors) => void;
  termsAccepted: boolean;
  setTermsAccepted: (v: boolean) => void;

  // submit
  submit: (onSuccess?: () => void) => Promise<void>;
  submitting: boolean;
  submitError: string | null;

  bookingOpen: boolean;
  setBookingOpen: Dispatch<SetStateAction<boolean>>
};

const ReservationContext = createContext<ReservationContextValue | undefined>(
  undefined
);

const DEFAULT_PREFS = new Set(["Aromaterapia suave"]);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [ritual, setRitual] = useState<Service | undefined>(undefined);
  const [day, setDay] = useState<WorkDay | undefined>(undefined);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [prefs, setPrefs] = useState<Set<string>>(new Set(DEFAULT_PREFS));
  const [errors, setErrors] = useState<Step3Errors>({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const {
    createReservation,
    loading: submitting,
    error: submitError,
  } = useCreateReservation();

  const reservationId = useMemo(
    () => `LN-${Math.floor(4000 + Math.random() * 1000)}`,
    [step === TOTAL_STEPS] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const togglePref = useCallback((p: string) => {
    setPrefs((current) => {
      const nextSet = new Set(current);
      if (nextSet.has(p)) nextSet.delete(p);
      else nextSet.add(p);
      return nextSet;
    });
  }, []);

  const validateContact = useCallback(() => {
    const e: Step3Errors = {};
    if (!name.trim() || name.trim().length < 2) e.name = "Necesitamos tu nombre";
    if (!phone.trim() || phone.replace(/\D/g, "").length < 7)
      e.phone = "WhatsApp con código de país";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [name, phone]);

  const canContinue = useCallback(() => {
    if (step === 1) return !!ritual;
    return true;
  }, [step, ritual]);

  const next = useCallback(() => {
    if (step === 1 && !ritual) return;
    if (step === 4 && !validateContact()) return;
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  }, [step, ritual, validateContact]);

  const back = useCallback(() => {
    setStep((s) => Math.max(1, s - 1));
  }, []);

  const reset = useCallback(() => {
    setStep(1);
    setRitual(undefined);
    setDay(undefined);
    setTime("");
    setName("");
    setPhone("");
    setPrefs(new Set(DEFAULT_PREFS));
    setErrors({});
    setTermsAccepted(false);
  }, []);

  const submit = useCallback(
    async (onSuccess?: () => void) => {
      if (!ritual || !day || !time) return;
      await createReservation(
        {
          name,
          phone,
          service: ritual,
          date: day,
          hour: time,
          duration: 1,
        },
        () => {
          onSuccess?.();
          reset();
        }
      );
    },
    [ritual, day, time, name, phone, createReservation, reset]
  );

  return (
    <ReservationContext.Provider
      value={{
        step,
        setStep,
        next,
        back,
        reset,
        canContinue,
        validateContact,
        reservationId,
        ritual,
        setRitual,
        day,
        setDay,
        time,
        setTime,
        name,
        setName,
        phone,
        setPhone,
        prefs,
        togglePref,
        errors,
        setErrors,
        termsAccepted,
        setTermsAccepted,
        submit,
        submitting,
        submitError,
        bookingOpen,
        setBookingOpen
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const ctx = useContext(ReservationContext);
  if (!ctx) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return ctx;
}
