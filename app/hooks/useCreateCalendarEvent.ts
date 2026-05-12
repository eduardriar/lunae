import { useState } from 'react';

export type CreateEventInput = {
  summary: string;
  description?: string;
  location?: string;
  start?: string;
  end?: string;
  timeZone?: string;
  attendees?: { email: string; displayName?: string }[];
};

export type CreatedEvent = {
  id: string | null | undefined;
  htmlLink: string | null | undefined;
  status: string | null | undefined;
  start: unknown;
  end: unknown;
};

export type CreateEventCallback = (event: CreatedEvent) => void | Promise<void>;

export const useCreateCalendarEvent = () => {
  const [event, setEvent] = useState<CreatedEvent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEvent = async (
    input: CreateEventInput,
    onSuccess?: CreateEventCallback
  ): Promise<CreatedEvent | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/calendar/create-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || `Request failed: ${res.status}`);
      }

      const created = data.event as CreatedEvent;
      setEvent(created);
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
    setEvent(null);
    setError(null);
  };

  return { createEvent, event, loading, error, reset };
};
