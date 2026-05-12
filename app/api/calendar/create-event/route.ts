import getCalendarClient from '@/app/lib/googleCalendar';
import { NextRequest, NextResponse } from 'next/server';

type CreateEventBody = {
  summary: string;
  description?: string;
  location?: string;
  start: string;
  end: string;
  timeZone?: string;
  attendees?: { email: string; displayName?: string }[];
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<CreateEventBody>;
    const {
      summary,
      description,
      location,
      start,
      end,
      timeZone = 'America/Bogota',
      attendees,
    } = body;

    if (!summary || !start || !end) {
      return NextResponse.json(
        { success: false, error: 'summary, start and end are required' },
        { status: 400 }
      );
    }

    if (Number.isNaN(Date.parse(start)) || Number.isNaN(Date.parse(end))) {
      return NextResponse.json(
        { success: false, error: 'start and end must be valid ISO datetimes' },
        { status: 400 }
      );
    }

    if (new Date(end) <= new Date(start)) {
      return NextResponse.json(
        { success: false, error: 'end must be after start' },
        { status: 400 }
      );
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

    return NextResponse.json({
      success: true,
      event: {
        id: event.id,
        htmlLink: event.htmlLink,
        status: event.status,
        start: event.start,
        end: event.end,
      },
    });
  } catch (error) {
    console.error('Calendar create-event error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create calendar event' },
      { status: 500 }
    );
  }
}
