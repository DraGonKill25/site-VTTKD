import { describe, expect, it } from "vitest";
import {
  listCurrentSchedules,
  resolveOccurrence,
  type CourseSchedule,
  type ScheduleException,
} from "../../src/domain/schedules";

const schedule: CourseSchedule = {
  id: "course-test",
  name: { fr: "Cours test", en: "Test class" },
  discipline: "kyorugi",
  dayOfWeek: "wednesday",
  startTime: "18:00",
  endTime: "19:30",
  timeZone: "Europe/Paris",
  location: { fr: "Salle A", en: "Hall A" },
  group: { fr: "Groupe test", en: "Test group" },
  description: { fr: "", en: "" },
  validFrom: "2026-01-01",
  status: "active",
  displayOrder: 1,
  demo: true,
};

describe("course schedules", () => {
  it("excludes suspended, archived and out-of-validity schedules", () => {
    const archived = { ...schedule, id: "archived", status: "archived" as const };
    const future = {
      ...schedule,
      id: "future",
      validFrom: "2027-01-01",
    };

    expect(
      listCurrentSchedules([archived, future, schedule], "2026-02-18").map(
        ({ id }) => id,
      ),
    ).toEqual(["course-test"]);
  });

  it("applies a one-off time and venue change without mutating recurrence", () => {
    const exception: ScheduleException = {
      id: "exception-test",
      scheduleId: schedule.id,
      date: "2026-02-18",
      kind: "time-change",
      startTime: "19:00",
      endTime: "20:00",
      location: { fr: "Salle B", en: "Hall B" },
      message: { fr: "Changement test", en: "Test change" },
      status: "published",
      demo: true,
    };

    const occurrence = resolveOccurrence(schedule, exception.date, [exception]);

    expect(occurrence).toMatchObject({
      startTime: "19:00",
      endTime: "20:00",
      location: { fr: "Salle B", en: "Hall B" },
      cancelled: false,
    });
    expect(schedule).toMatchObject({
      startTime: "18:00",
      endTime: "19:30",
      location: { fr: "Salle A", en: "Hall A" },
    });
  });

  it("marks only the selected occurrence as cancelled", () => {
    const cancellation: ScheduleException = {
      id: "cancellation-test",
      scheduleId: schedule.id,
      date: "2026-02-18",
      kind: "cancelled",
      message: { fr: "Annulation test", en: "Test cancellation" },
      status: "published",
      demo: true,
    };

    expect(
      resolveOccurrence(schedule, cancellation.date, [cancellation])?.cancelled,
    ).toBe(true);
    expect(resolveOccurrence(schedule, "2026-02-25", [])?.cancelled).toBe(false);
  });

  it("does not create an occurrence on another weekday", () => {
    expect(resolveOccurrence(schedule, "2026-02-19", [])).toBeUndefined();
  });
});
