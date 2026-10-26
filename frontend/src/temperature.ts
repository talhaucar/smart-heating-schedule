import type { HassEntity } from "./types";

export const FAHRENHEIT = "°F";

export interface Limits {
  min: number;
  max: number;
  step: number;
}

const DEFAULTS: Record<string, Limits> = {
  "°C": { min: 5, max: 30, step: 0.5 },
  "°F": { min: 41, max: 86, step: 1 },
};

export const defaultLimits = (unit: string): Limits => DEFAULTS[unit] ?? DEFAULTS["°C"];

/** Min, max and step of a thermostat, with defaults for the unit. */
export const limitsFor = (stateObj: HassEntity | undefined, unit: string): Limits => {
  const defaults = defaultLimits(unit);
  const attrs = stateObj?.attributes ?? {};
  return {
    min: Number(attrs.min_temp ?? defaults.min),
    max: Number(attrs.max_temp ?? defaults.max),
    step: Number(attrs.target_temp_step || defaults.step),
  };
};

/** Default temperature for a new block. */
export const defaultTemperature = (unit: string): number => (unit === FAHRENHEIT ? 68 : 20);

export const clamp = (value: number, limits: Limits): number => {
  const stepped = Math.round(value / limits.step) * limits.step;
  return Math.min(limits.max, Math.max(limits.min, Number(stepped.toFixed(2))));
};

const decimals = (unit: string, step: number): number =>
  step < 1 ? (step < 0.1 ? 2 : 1) : unit === FAHRENHEIT ? 0 : 1;

/**
 * Format like Tado: "19.0°" on the timeline. With `compact`, trailing ".0"
 * is dropped ("19°") as in Tado's block list.
 */
export const formatTemperature = (
  value: number,
  unit: string,
  step = defaultLimits(unit).step,
  compact = false,
  locale?: string,
): string => {
  const digits = decimals(unit, step);
  const text = new Intl.NumberFormat(locale, {
    minimumFractionDigits: compact ? 0 : digits,
    maximumFractionDigits: digits,
  }).format(value);
  return `${text}°`;
};

export const toCelsius = (value: number, unit: string): number =>
  unit === FAHRENHEIT ? ((value - 32) * 5) / 9 : value;
