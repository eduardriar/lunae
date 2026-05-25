import { useState } from 'react';
import { Service } from '../generated/prisma/client';
import { WorkDay } from '../utils/workDays';

export type CreateReservationInput = {
  name: string;
  email?: string;
  phone: string;
  service: Service;
  date: WorkDay;
  hour: string;
  notes?: string;
  duration: number;
};

export type CreatedReservation = {
  id?: string | number;
  [key: string]: unknown;
};

export type CreateReservationCallback = (
  reservation: CreatedReservation | null
) => void | Promise<void>;

export const useCreateReservation = () => {
  const [reservation, setReservation] = useState<CreatedReservation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createReservation = async (
    input: CreateReservationInput,
    onSuccess?: CreateReservationCallback
  ): Promise<CreatedReservation | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        let message = `Request failed: ${res.status}`;
        try {
          const data = await res.json();
          if (data?.error) message = data.error;
        } catch {
          // body wasn't JSON, keep the status-based message
        }
        throw new Error(message);
      }

      let created: CreatedReservation | null = null;
      try {
        const data = await res.json();
        created = (data?.reservation ?? data) as CreatedReservation;
      } catch {
        // route currently has no success body — treat as success without payload
      }

      setReservation(created);
      await onSuccess?.(created);
      return created;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setReservation(null);
    setError(null);
  };

  return { createReservation, reservation, loading, error, reset };
};
