import getCalendarClient from '@/app/lib/googleCalendar';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

// Horarios disponibles del spa
const BUSINESS_HOURS = {
  start: 9,  // 9 AM
  end: 18,   // 10 PM
};

const SLOT_DURATION = 60; // minutos
const SLOT_CAPACITY = 4;
const TZ_OFFSET = '-05:00';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url); // Ej: "2024-05-15"
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json({ error: 'Date is required' });
    }

    const calendar = getCalendarClient();

    // Obtener eventos del día
    const timeMin = new Date(`${date}T00:00:00${TZ_OFFSET}`);
    const timeMax = new Date(`${date}T23:59:59.999${TZ_OFFSET}`);

    console.log('Calendar ID being used:', process.env.GOOGLE_CALENDAR_ID || 'primary');

    const eventsResponse = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = (eventsResponse.data.items || []).map((event) => ({
      id: event.id,
      summary: event.summary,
      description: event.description,
      location: event.location,
      status: event.status,
      htmlLink: event.htmlLink,
      start: event.start,
      end: event.end,
    }));

    // Calcular slots disponibles
    const busySlots = (events || []).map(event => ({
      start: new Date(event.start?.dateTime!),
      end: new Date(event.end?.dateTime!),
    }));

    const availableSlots = [];
    const now = new Date();

    for (let hour = BUSINESS_HOURS.start; hour < BUSINESS_HOURS.end; hour++) {
      for (let minutes = 0; minutes < 60; minutes += SLOT_DURATION) {
        const hh = String(hour).padStart(2, '0');
        const mm = String(minutes).padStart(2, '0');
        const slotStart = new Date(`${date}T${hh}:${mm}:00${TZ_OFFSET}`);
        const slotEnd = new Date(slotStart.getTime() + SLOT_DURATION * 60_000);

        const overlapping = busySlots.filter(
          busy => slotStart < busy.end && slotEnd > busy.start
        );

        const isFull = overlapping.length >= SLOT_CAPACITY;
        const isPast = slotStart <= now;
        const isBooked = isFull || isPast;

        availableSlots.push({
          start: slotStart.toISOString(),
          end: slotEnd.toISOString(),
          displayTime: `${hh}:${mm}`,
          blocked: isBooked && isPast
        });
      }
    }

    return NextResponse.json({
      success: true,
      date,
      availableSlots,
    });
  } catch (error) {
    console.error('Calendar API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch available slots',
    });
  }
}