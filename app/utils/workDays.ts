const WEEKDAY_SHORT = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const monthFormatter = new Intl.DateTimeFormat("es-CO", { month: "short" });

const formatMonth = (d: Date) =>
  monthFormatter
    .format(d)
    .replace(".", "")
    .replace(/^./, (c) => c.toUpperCase());

export type WorkDay = {
  date: Date;
  iso: string;
  weekday: string;
  dayNumber: number;
  month: string;
  isToday: boolean;
};

const isWeekend = (day: number) => day === 0 || day === 6;

const toIsoDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

export function getUpcomingWorkDays(count: number = 5): WorkDay[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayIso = toIsoDate(today);

  const result: WorkDay[] = [];
  const cursor = new Date(today);

  while (result.length < count) {
    const iso = toIsoDate(cursor);
      result.push({
        date: new Date(cursor),
        iso,
        weekday: WEEKDAY_SHORT[cursor.getDay()],
        dayNumber: cursor.getDate(),
        month: formatMonth(cursor),
        isToday: iso === todayIso,
      });
    cursor.setDate(cursor.getDate() + 1);
  }

  return result;
}
