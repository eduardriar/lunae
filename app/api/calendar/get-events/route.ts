import getCalendarClient from '@/app/lib/googleCalendar';
import { NextRequest, NextResponse } from 'next/server';

const TZ_OFFSET = '-05:00';

export async function GET(req: NextRequest) {
  try {
    const date = req.nextUrl.searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { success: false, error: 'date is required (YYYY-MM-DD)' },
        { status: 400 }
      );
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { success: false, error: 'date must be in YYYY-MM-DD format' },
        { status: 400 }
      );
    }

    const timeMin = new Date(`${date}T00:00:00${TZ_OFFSET}`);
    const timeMax = new Date(`${date}T23:59:59.999${TZ_OFFSET}`);

    if (Number.isNaN(timeMin.getTime()) || Number.isNaN(timeMax.getTime())) {
      return NextResponse.json(
        { success: false, error: 'date is not a valid calendar date' },
        { status: 400 }
      );
    }

    const calendar = getCalendarClient();

    console.log('Calendar ID being used:', process.env.GOOGLE_CALENDAR_ID || 'primary');

    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = (response.data.items || []).map((event) => ({
      id: event.id,
      summary: event.summary,
      description: event.description,
      location: event.location,
      status: event.status,
      htmlLink: event.htmlLink,
      start: event.start,
      end: event.end,
    }));

    return NextResponse.json({
      success: true,
      date,
      count: events.length,
      events,
    });
  } catch (error) {
    console.error('Calendar get-events error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch calendar events' },
      { status: 500 }
    );
  }
}
