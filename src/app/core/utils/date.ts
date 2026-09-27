const DAY_MS = 24 * 60 * 60 * 1000;

/** Formats a date as yyyy-MM-dd in local time (the format used by <input type="date">). */
export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseIsoDate(value: string | null | undefined): Date | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return isNaN(date.getTime()) ? null : date;
}

export function todayIso(): string {
  return toIsoDate(new Date());
}

export function addDaysIso(iso: string, days: number): string {
  const date = parseIsoDate(iso) ?? new Date();
  date.setDate(date.getDate() + days);
  return toIsoDate(date);
}

export function nightsBetween(checkIn: string | null | undefined, checkOut: string | null | undefined): number {
  const start = parseIsoDate(checkIn);
  const end = parseIsoDate(checkOut);
  if (!start || !end) return 0;
  return Math.max(0, Math.round((end.getTime() - start.getTime()) / DAY_MS));
}
