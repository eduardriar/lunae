import { WorkDay } from "./workDays";

const SLOT_DURATION_MIN = 60;
const TZ_OFFSET = "-05:00";

export const buildSlotRange = (
  day: WorkDay,
  time: string,
  durationMin: number = SLOT_DURATION_MIN
): { start: string; end: string } | null => {
  if (!day || !time) return null;
  const start = new Date(`${day.iso}T${time}:00${TZ_OFFSET}`);
  if (Number.isNaN(start.getTime())) return null;
  const end = new Date(start.getTime() + durationMin * 60_000);
  return { start: start.toISOString(), end: end.toISOString() };
};