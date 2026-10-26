/**
 * Tado-like heating colours: pale yellow for cool settings, amber around
 * 19-20 °C, then orange and red. Stops are in °C so a temperature has the
 * same colour in Fahrenheit. Themes can override the stops with the CSS
 * variables --shs-color-off and --shs-color-<°C> (e.g. --shs-color-22).
 */
import { toCelsius } from "./temperature";

type RGB = [number, number, number];

export const STOPS: [number, RGB][] = [
  [12, [245, 222, 140]],
  [16, [248, 206, 84]],
  [19, [250, 194, 43]],
  [21, [248, 168, 48]],
  [23, [244, 128, 52]],
  [25, [236, 90, 50]],
  [28, [222, 56, 46]],
];

export const OFF_COLOR = "#8a9bab";

const hex = ([r, g, b]: RGB): string =>
  `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;

/** The colour of a temperature in °C (null = heating off). */
export const celsiusColor = (celsius: number | null): string => {
  if (celsius === null) return OFF_COLOR;
  if (celsius <= STOPS[0][0]) return hex(STOPS[0][1]);
  for (let i = 1; i < STOPS.length; i++) {
    const [upper, upperColor] = STOPS[i];
    if (celsius <= upper) {
      const [lower, lowerColor] = STOPS[i - 1];
      const t = (celsius - lower) / (upper - lower);
      return hex(lowerColor.map((v, c) => v + (upperColor[c] - v) * t) as RGB);
    }
  }
  return hex(STOPS[STOPS.length - 1][1]);
};

/** CSS colour for a block, overridable by themes. */
export const temperatureColor = (temperature: number | null, unit: string): string => {
  if (temperature === null) return `var(--shs-color-off, ${OFF_COLOR})`;
  const celsius = toCelsius(temperature, unit);
  return `var(--shs-color-${Math.round(celsius)}, ${celsiusColor(celsius)})`;
};
