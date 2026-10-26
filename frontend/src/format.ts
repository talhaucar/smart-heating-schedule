import { DAY } from "./schedule";
import type { HomeAssistant } from "./types";

/** Whether the user wants a 12 hour clock. */
export const uses12h = (hass: Pick<HomeAssistant, "locale">): boolean => {
  const setting = hass.locale.time_format;
  if (setting === "12") return true;
  if (setting === "24") return false;
  const locale = setting === "system" ? undefined : hass.locale.language;
  return new Intl.DateTimeFormat(locale, { hour: "numeric" }).resolvedOptions().hour12 ?? false;
};

/**
 * Format minutes since midnight. 24 hour times are zero padded like Tado
 * ("07:00"); `tick` drops the padding for axis labels ("8:00").
 */
export const formatMinutes = (minutes: number, h12: boolean, tick = false): string => {
  if (!h12 && tick && minutes === DAY) return "24:00";
  const value = minutes % DAY;
  const hours = Math.floor(value / 60);
  const mins = String(value % 60).padStart(2, "0");
  if (h12) {
    const suffix = hours < 12 ? "AM" : "PM";
    return `${hours % 12 || 12}:${mins} ${suffix}`;
  }
  return `${tick ? hours : String(hours).padStart(2, "0")}:${mins}`;
};

export interface ZonedTime {
  /** Monday = 0. */
  weekday: number;
  /** Minutes since midnight. */
  minutes: number;
}

const WEEKDAY_INDEX: Record<string, number> = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };

/** Weekday and time of a moment in a time zone (the Home Assistant server's). */
export const zonedTime = (date: Date, timeZone?: string): ZonedTime => {
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    }).formatToParts(date);
  } catch {
    return zonedTime(date);
  }
  const part = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  return {
    weekday: WEEKDAY_INDEX[part("weekday")] ?? 0,
    minutes: Number(part("hour")) * 60 + Number(part("minute")),
  };
};

/** Format the time of day of an ISO date string in a time zone. */
export const formatIsoTime = (iso: string, h12: boolean, timeZone?: string): string =>
  formatMinutes(zonedTime(new Date(iso), timeZone).minutes, h12);

// 1 January 2024 was a Monday.
const MONDAY = new Date(2024, 0, 1);

/** Localized weekday name; Monday = 0. */
export const weekdayName = (language: string, weekday: number, style: "long" | "short" = "long"): string => {
  const date = new Date(MONDAY);
  date.setDate(MONDAY.getDate() + weekday);
  const name = new Intl.DateTimeFormat(language, { weekday: style }).format(date);
  return name.charAt(0).toUpperCase() + name.slice(1);
};

/** The first day of the week (Monday = 0) from the user's settings. */
export const firstWeekday = (hass: Pick<HomeAssistant, "locale">): number => {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const setting = hass.locale.first_weekday;
  if (setting && days.includes(setting)) return days.indexOf(setting);
  try {
    const locale = new Intl.Locale(hass.locale.language) as Intl.Locale & {
      weekInfo?: { firstDay: number };
      getWeekInfo?: () => { firstDay: number };
    };
    const info = locale.getWeekInfo?.() ?? locale.weekInfo;
    if (info) return (info.firstDay + 6) % 7;
  } catch {
    // Unknown locale: fall through to Monday.
  }
  return 0;
};
