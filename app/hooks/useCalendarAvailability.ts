import { useState } from 'react';
import { WorkDay } from '../utils/workDays';

export type AvailableSlots = {
    start: string,
    end: string,
    displayTime: string,
    blocked: boolean
}

export const useCalendarAvailability = () => {
    const [availability, setAvailability] = useState<AvailableSlots[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCalendarAvailability = async (date: WorkDay | string | undefined) => {
        if (!date) return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/calendar/available-slots?date=${typeof date !== "string" ? date?.iso : date}`);
            if (!res.ok) throw new Error(`Request failed: ${res.status}`);
            const data = await res.json();
            setAvailability(data.availableSlots);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    }

    return {
        availability, loading, error, fetchCalendarAvailability
    }
};