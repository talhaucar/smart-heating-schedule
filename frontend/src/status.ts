import { formatIsoTime } from "./format";
import type { Localize } from "./localize";
import { formatTemperature } from "./temperature";
import type { Room } from "./types";

export interface StatusText {
  text: string;
  error: boolean;
}

/** A one line description of what the schedule is doing, e.g. "20.0° until 22:00". */
export const roomStatusText = (
  room: Room,
  localize: Localize,
  options: { unit: string; step: number; h12: boolean; language: string; timeZone?: string },
): StatusText => {
  const { status } = room;
  if (!room.enabled) return { text: localize("status.disabled"), error: false };
  if (status.last_error) return { text: localize("status.error", { error: status.last_error }), error: true };
  if (status.pending) return { text: localize("status.pending"), error: false };
  const temperature =
    status.temperature === null
      ? null
      : formatTemperature(status.temperature, options.unit, options.step, false, options.language);
  if (!status.end) {
    return temperature === null
      ? { text: localize("status.constant_off"), error: false }
      : { text: localize("status.constant", { temperature }), error: false };
  }
  const time = formatIsoTime(status.end, options.h12, options.timeZone);
  return temperature === null
    ? { text: localize("status.off_until", { time }), error: false }
    : { text: localize("status.until", { temperature, time }), error: false };
};
