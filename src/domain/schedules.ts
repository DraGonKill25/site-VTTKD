import type { LocalizedText } from "../lib/content";

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface CourseSchedule {
  id: string;
  name: LocalizedText;
  discipline: "kyorugi" | "poomsae";
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  timeZone: string;
  location: LocalizedText;
  group: LocalizedText;
  description: LocalizedText;
  validFrom: string;
  validTo?: string;
  status: "active" | "suspended" | "archived";
  displayOrder: number;
  demo: boolean;
}

export interface ScheduleException {
  id: string;
  scheduleId: string;
  date: string;
  kind: "cancelled" | "time-change" | "location-change" | "custom";
  startTime?: string;
  endTime?: string;
  location?: LocalizedText;
  message: LocalizedText;
  status: "draft" | "published" | "archived";
  demo: boolean;
}

export interface ScheduleOccurrence extends CourseSchedule {
  date: string;
  cancelled: boolean;
  exception?: ScheduleException;
}

export function isScheduleCurrent(
  schedule: CourseSchedule,
  date: string,
): boolean {
  return (
    schedule.status === "active" &&
    schedule.validFrom <= date &&
    (!schedule.validTo || schedule.validTo >= date)
  );
}

export function listCurrentSchedules(
  schedules: CourseSchedule[],
  date: string,
): CourseSchedule[] {
  return schedules
    .filter((schedule) => isScheduleCurrent(schedule, date))
    .sort(
      (left, right) =>
        left.displayOrder - right.displayOrder ||
        left.startTime.localeCompare(right.startTime),
    );
}

export function resolveOccurrence(
  schedule: CourseSchedule,
  date: string,
  exceptions: ScheduleException[],
): ScheduleOccurrence | undefined {
  if (!isScheduleCurrent(schedule, date)) return undefined;

  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: schedule.timeZone,
  })
    .format(new Date(`${date}T12:00:00Z`))
    .toLowerCase() as DayOfWeek;

  if (weekday !== schedule.dayOfWeek) return undefined;

  const exception = exceptions.find(
    (candidate) =>
      candidate.scheduleId === schedule.id &&
      candidate.date === date &&
      candidate.status === "published",
  );

  return {
    ...schedule,
    date,
    startTime: exception?.startTime ?? schedule.startTime,
    endTime: exception?.endTime ?? schedule.endTime,
    location: exception?.location ?? schedule.location,
    cancelled: exception?.kind === "cancelled",
    exception,
  };
}
