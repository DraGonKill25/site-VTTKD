import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

interface Entry {
  id: string;
}

interface ResultEntry extends Entry {
  competitionId: string;
  athleteIds: string[];
}

interface ScheduleExceptionEntry extends Entry {
  scheduleId: string;
}

const contentRoot = join(process.cwd(), "src", "content");

function readCollection<T extends Entry>(directory: string): T[] {
  const path = join(contentRoot, directory);

  return readdirSync(path)
    .filter((file) => file.endsWith(".json"))
    .map((file) =>
      JSON.parse(readFileSync(join(path, file), "utf8")) as T,
    );
}

function expectUniqueIds(entries: Entry[]): void {
  expect(new Set(entries.map(({ id }) => id)).size).toBe(entries.length);
}

describe("content relationships", () => {
  const athletes = readCollection<Entry>("athletes");
  const competitions = readCollection<Entry>("competitions");
  const results = readCollection<ResultEntry>("results");
  const schedules = readCollection<Entry>("course-schedules");
  const exceptions =
    readCollection<ScheduleExceptionEntry>("schedule-exceptions");

  it("keeps stable identifiers unique in relational collections", () => {
    [athletes, competitions, results, schedules, exceptions].forEach(
      expectUniqueIds,
    );
  });

  it("references existing athletes and competitions from every result", () => {
    const athleteIds = new Set(athletes.map(({ id }) => id));
    const competitionIds = new Set(competitions.map(({ id }) => id));

    for (const result of results) {
      expect(competitionIds.has(result.competitionId)).toBe(true);
      for (const athleteId of result.athleteIds) {
        expect(athleteIds.has(athleteId)).toBe(true);
      }
    }
  });

  it("references an existing recurring course from every exception", () => {
    const scheduleIds = new Set(schedules.map(({ id }) => id));

    for (const exception of exceptions) {
      expect(scheduleIds.has(exception.scheduleId)).toBe(true);
    }
  });
});
