import getCalendarClient from './googleCalendar';

const BUSINESS_HOURS = { start: 9, end: 19 };
const SLOT_DURATION = 60;
const SLOT_CAPACITY = 4;
const TZ_OFFSET = '-05:00';

export type AvailableSlot = {
  start: string;
  end: string;
  displayTime: string;
  blocked: boolean;
};

export const getAvailableSlots = async (date: string): Promise<AvailableSlot[]> => {
  const calendar = getCalendarClient();

  const timeMin = new Date(`${date}T00:00:00${TZ_OFFSET}`);
  const timeMax = new Date(`${date}T23:59:59.999${TZ_OFFSET}`);

  const eventsResponse = await calendar.events.list({
    calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  });

  const busySlots = (eventsResponse.data.items || []).map((event) => ({
    start: new Date(event.start?.dateTime!),
    end: new Date(event.end?.dateTime!),
  }));

  const slots: AvailableSlot[] = [];
  const now = new Date();

  for (let hour = BUSINESS_HOURS.start; hour < BUSINESS_HOURS.end; hour++) {
    for (let minutes = 0; minutes < 60; minutes += SLOT_DURATION) {
      const hh = String(hour).padStart(2, '0');
      const mm = String(minutes).padStart(2, '0');
      const slotStart = new Date(`${date}T${hh}:${mm}:00${TZ_OFFSET}`);
      const slotEnd = new Date(slotStart.getTime() + SLOT_DURATION * 60_000);

      const overlapping = busySlots.filter(
        (busy) => slotStart < busy.end && slotEnd > busy.start
      );

      const isFull = overlapping.length >= SLOT_CAPACITY;
      const isPast = slotStart <= now;
      const blocked = isFull || isPast;

      slots.push({
        start: slotStart.toISOString(),
        end: slotEnd.toISOString(),
        displayTime: `${hh}:${mm}`,
        blocked,
      });
    }
  }

  return slots;
};
