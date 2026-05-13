export type CreateEventInput = {
  summary: string;
  description: string;
  location?: string;
  start: string;
  end: string;
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

export const createEvent = async (
    input: CreateEventInput,
    onSuccess?: CreateEventCallback
  ): Promise<CreatedEvent | null | string> => {
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
      await onSuccess?.(created);
      return created;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      return message;
    }
  };