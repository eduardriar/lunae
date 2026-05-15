import getCalendarClient from './googleCalendar';

export type CreateCalendarEventInput = {
  summary: string;
  description?: string;
  location?: string;
  start: string;
  end: string;
  timeZone?: string;
  attendees?: { email: string; displayName?: string }[];
};

export type CreatedCalendarEvent = {
  id: string | null | undefined;
  htmlLink: string | null | undefined;
  status: string | null | undefined;
  start: unknown;
  end: unknown;
};

export class CalendarEventError extends Error {
  status: number;
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = 'CalendarEventError';
    this.status = status;
  }
}

export const createCalendarEvent = async (
  input: CreateCalendarEventInput
): Promise<CreatedCalendarEvent> => {
  const {
    summary,
    description,
    location,
    start,
    end,
    timeZone = 'America/Bogota',
    attendees,
  } = input;

  if (!summary || !start || !end) {
    throw new CalendarEventError('summary, start and end are required', 400);
  }

  if (Number.isNaN(Date.parse(start)) || Number.isNaN(Date.parse(end))) {
    throw new CalendarEventError('start and end must be valid ISO datetimes', 400);
  }

  if (new Date(end) <= new Date(start)) {
    throw new CalendarEventError('end must be after start', 400);
  }

  const calendar = getCalendarClient();

  const response = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
    requestBody: {
      summary,
      description,
      location,
      start: { dateTime: new Date(start).toISOString(), timeZone },
      end: { dateTime: new Date(end).toISOString(), timeZone },
      attendees,
    },
  });

  const event = response.data;

  return {
    id: event.id,
    htmlLink: event.htmlLink,
    status: event.status,
    start: event.start,
    end: event.end,
  };
};
