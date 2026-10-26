import { describe, expect, it } from "vitest";

import {
  deleteBlock,
  insertBlock,
  orderedDays,
  toSegments,
  updateBlock,
  validateDay,
  withDay,
} from "../src/schedule";
import type { Block, WeekSchedule } from "../src/types";

const day = (...blocks: [string, number | null][]): Block[] =>
  blocks.map(([start, temperature]) => ({ start, temperature }));

const tado = day(["00:00", 19], ["04:00", 20], ["08:00", 19]);

describe("insertBlock", () => {
  it("splits the block it falls into", () => {
    expect(insertBlock(tado, 12 * 60, 14 * 60, 21)).toEqual(
      day(["00:00", 19], ["04:00", 20], ["08:00", 19], ["12:00", 21], ["14:00", 19]),
    );
  });

  it("trims and removes overlapped blocks", () => {
    expect(insertBlock(tado, 2 * 60, 10 * 60, 22)).toEqual(day(["00:00", 19], ["02:00", 22], ["10:00", 19]));
  });

  it("can cover the whole day", () => {
    expect(insertBlock(tado, 0, 24 * 60, null)).toEqual(day(["00:00", null]));
  });

  it("rejects ranges off the grid or too short", () => {
    expect(() => insertBlock(tado, 60, 70, 20)).toThrow();
    expect(() => insertBlock(tado, 60, 60, 20)).toThrow();
  });

  it("always produces a valid day", () => {
    for (let start = 0; start < 1440; start += 105) {
      for (let end = start + 15; end <= 1440; end += 135) {
        expect(validateDay(insertBlock(tado, start, end, 18))).toBe(true);
      }
    }
  });
});

describe("updateBlock", () => {
  it("changes the temperature", () => {
    expect(updateBlock(tado, 1, 240, 480, 21)).toEqual(day(["00:00", 19], ["04:00", 21], ["08:00", 19]));
  });

  it("lets neighbours grow when a block shrinks", () => {
    expect(updateBlock(tado, 1, 300, 420, 20)).toEqual(
      day(["00:00", 19], ["05:00", 20], ["07:00", 19]),
    );
  });

  it("overwrites neighbours when a block grows", () => {
    expect(updateBlock(tado, 1, 60, 600, 20)).toEqual(day(["00:00", 19], ["01:00", 20], ["10:00", 19]));
  });

  it("keeps the first block at 00:00 and the last at 24:00", () => {
    const first = updateBlock(tado, 0, 120, 180, 18);
    expect(first[0]).toEqual({ start: "00:00", temperature: 18 });
    expect(toSegments(first).at(-1)!.end).toBe(1440);
    const last = updateBlock(tado, 2, 480, 600, 18);
    expect(toSegments(last).at(-1)).toEqual({ start: 480, end: 1440, temperature: 18 });
  });

  it("can move a block past its neighbours", () => {
    const moved = updateBlock(tado, 1, 1200, 1260, 22);
    expect(validateDay(moved)).toBe(true);
    // Blocks are never merged automatically: the old 04:00-08:00 time goes to
    // the block before it, and 08:00 stays a boundary.
    expect(moved).toEqual(day(["00:00", 19], ["08:00", 19], ["20:00", 22], ["21:00", 19]));
  });
});

describe("deleteBlock", () => {
  it("gives the time to the previous block", () => {
    expect(deleteBlock(tado, 1)).toEqual(day(["00:00", 19], ["08:00", 19]));
  });

  it("gives the time of the first block to the next one", () => {
    expect(deleteBlock(tado, 0)).toEqual(day(["00:00", 20], ["08:00", 19]));
  });

  it("never removes the last remaining block", () => {
    const single = day(["00:00", 19]);
    expect(deleteBlock(single, 0)).toBe(single);
  });
});

describe("week helpers", () => {
  const week: WeekSchedule = {
    days: { mon: tado, tue: tado, wed: tado, thu: tado, fri: tado, sat: tado, sun: tado },
  };

  it("replaces one day", () => {
    const updated = withDay(week, "wed", day(["00:00", 15]));
    expect(updated.days.wed).toEqual(day(["00:00", 15]));
    expect(updated.days.tue).toBe(tado);
    expect(week.days.wed).toBe(tado);
  });

  it("orders days from the first weekday", () => {
    expect(orderedDays(0)).toEqual(["mon", "tue", "wed", "thu", "fri", "sat", "sun"]);
    expect(orderedDays(6)).toEqual(["sun", "mon", "tue", "wed", "thu", "fri", "sat"]);
  });
});
