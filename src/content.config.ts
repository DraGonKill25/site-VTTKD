import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/);
const stableId = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const localizedText = z.object({
  fr: z.string().min(1),
  en: z.string().min(1),
});

const optionalLocalizedText = z.object({
  fr: z.string(),
  en: z.string(),
});

export const discipline = z.enum(["kyorugi", "poomsae"]);
export const publicationStatus = z.enum([
  "draft",
  "published",
  "archived",
  "cancelled",
]);
export const medal = z.enum(["none", "bronze", "silver", "gold"]);

const athletes = defineCollection({
  loader: glob({ base: "./src/content/athletes", pattern: "**/*.json" }),
  schema: z.object({
    id: stableId,
    displayName: localizedText,
    disciplines: z.array(discipline).min(1),
    sportCategory: localizedText,
    profileVisibility: z.enum(["public", "hidden"]),
    status: publicationStatus,
    biography: optionalLocalizedText,
    photo: z.string().optional(),
    demo: z.boolean().default(false),
  }),
});

const competitions = defineCollection({
  loader: glob({ base: "./src/content/competitions", pattern: "**/*.json" }),
  schema: z
    .object({
      id: stableId,
      route: localizedText,
      name: localizedText,
      startDate: isoDate,
      endDate: isoDate.optional(),
      location: z.object({
        venue: localizedText,
        city: localizedText,
        country: localizedText,
      }),
      level: localizedText,
      disciplines: z.array(discipline).min(1),
      status: publicationStatus,
      summary: optionalLocalizedText,
      demo: z.boolean().default(false),
    })
    .refine(
      ({ startDate, endDate }) => !endDate || endDate >= startDate,
      "Competition endDate must not precede startDate",
    ),
});

const resultDocument = z.object({
  id: stableId,
  title: localizedText,
  path: z.string().startsWith("/documents/"),
  mimeType: z.enum(["application/pdf", "image/jpeg", "image/png"]),
  sizeBytes: z.number().int().positive().max(10_000_000),
  visibility: z.literal("public"),
});

const results = defineCollection({
  loader: glob({ base: "./src/content/results", pattern: "**/*.json" }),
  schema: z
    .object({
      id: stableId,
      competitionId: stableId,
      discipline,
      participantType: z.enum(["individual", "pair", "team"]),
      athleteIds: z.array(stableId).min(1),
      teamName: optionalLocalizedText.optional(),
      rank: z.number().int().positive().nullable(),
      medal,
      status: publicationStatus,
      comment: optionalLocalizedText,
      sourceRef: z.string(),
      documents: z.array(resultDocument).default([]),
      details: z.discriminatedUnion("discipline", [
        z.object({
          discipline: z.literal("kyorugi"),
          weightCategory: localizedText,
          ageCategory: localizedText,
          bouts: z.number().int().nonnegative().optional(),
        }),
        z.object({
          discipline: z.literal("poomsae"),
          category: localizedText,
          poomsaeType: localizedText,
        }),
      ]),
      createdAt: z.iso.datetime(),
      createdBy: z.string().min(1),
      updatedAt: z.iso.datetime(),
      updatedBy: z.string().min(1),
      changeSummary: optionalLocalizedText,
      demo: z.boolean().default(false),
    })
    .superRefine((result, context) => {
      if (result.details.discipline !== result.discipline) {
        context.addIssue({
          code: "custom",
          path: ["details", "discipline"],
          message: "Result details must match the result discipline",
        });
      }
      const requiredMembers =
        result.participantType === "individual"
          ? 1
          : result.participantType === "pair"
            ? 2
            : 3;
      if (
        (result.participantType === "team" &&
          result.athleteIds.length < requiredMembers) ||
        (result.participantType !== "team" &&
          result.athleteIds.length !== requiredMembers)
      ) {
        context.addIssue({
          code: "custom",
          path: ["athleteIds"],
          message: "Participant count does not match participantType",
        });
      }
      if (result.medal === "gold" && result.rank !== 1) {
        context.addIssue({
          code: "custom",
          path: ["rank"],
          message: "A gold medal must have rank 1",
        });
      }
      if (result.medal === "silver" && result.rank !== 2) {
        context.addIssue({
          code: "custom",
          path: ["rank"],
          message: "A silver medal must have rank 2",
        });
      }
      if (result.medal === "bronze" && result.rank !== 3) {
        context.addIssue({
          code: "custom",
          path: ["rank"],
          message: "A bronze medal must have rank 3",
        });
      }
      if (new Set(result.athleteIds).size !== result.athleteIds.length) {
        context.addIssue({
          code: "custom",
          path: ["athleteIds"],
          message: "A participant must not occur twice in one result",
        });
      }
    }),
});

const courseSchedules = defineCollection({
  loader: glob({
    base: "./src/content/course-schedules",
    pattern: "**/*.json",
  }),
  schema: z
    .object({
      id: stableId,
      name: localizedText,
      discipline,
      dayOfWeek: z.enum([
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ]),
      startTime: time,
      endTime: time,
      timeZone: z.string().min(1).default("Europe/Paris"),
      location: localizedText,
      group: localizedText,
      description: optionalLocalizedText,
      validFrom: isoDate,
      validTo: isoDate.optional(),
      status: z.enum(["active", "suspended", "archived"]),
      displayOrder: z.number().int().nonnegative(),
      demo: z.boolean().default(false),
    })
    .refine(({ startTime, endTime }) => endTime > startTime, {
      message: "Course endTime must be after startTime",
      path: ["endTime"],
    })
    .refine(
      ({ validFrom, validTo }) => !validTo || validTo >= validFrom,
      {
        message: "Course validTo must not precede validFrom",
        path: ["validTo"],
      },
    ),
});

const scheduleExceptions = defineCollection({
  loader: glob({
    base: "./src/content/schedule-exceptions",
    pattern: "**/*.json",
  }),
  schema: z
    .object({
      id: stableId,
      scheduleId: stableId,
      date: isoDate,
      kind: z.enum([
        "cancelled",
        "time-change",
        "location-change",
        "custom",
      ]),
      startTime: time.optional(),
      endTime: time.optional(),
      location: optionalLocalizedText.optional(),
      message: localizedText,
      status: z.enum(["draft", "published", "archived"]),
      demo: z.boolean().default(false),
    })
    .superRefine((exception, context) => {
      if (
        exception.kind === "time-change" &&
        (!exception.startTime || !exception.endTime)
      ) {
        context.addIssue({
          code: "custom",
          path: ["startTime"],
          message: "A time change requires startTime and endTime",
        });
      }
      if (
        exception.startTime &&
        exception.endTime &&
        exception.endTime <= exception.startTime
      ) {
        context.addIssue({
          code: "custom",
          path: ["endTime"],
          message: "Exception endTime must be after startTime",
        });
      }
      if (exception.kind === "location-change" && !exception.location) {
        context.addIssue({
          code: "custom",
          path: ["location"],
          message: "A location change requires a location",
        });
      }
    }),
});

const news = defineCollection({
  loader: glob({ base: "./src/content/news", pattern: "**/*.json" }),
  schema: z.object({
    id: stableId,
    route: localizedText,
    title: localizedText,
    excerpt: localizedText,
    body: localizedText,
    publishedAt: z.iso.datetime(),
    status: publicationStatus,
    demo: z.boolean().default(false),
  }),
});

const events = defineCollection({
  loader: glob({ base: "./src/content/events", pattern: "**/*.json" }),
  schema: z
    .object({
      id: stableId,
      route: localizedText,
      title: localizedText,
      description: localizedText,
      startDateTime: z.iso.datetime({ offset: true }),
      endDateTime: z.iso.datetime({ offset: true }).optional(),
      timeZone: z.string().min(1),
      location: localizedText,
      disciplines: z.array(discipline),
      status: publicationStatus,
      demo: z.boolean().default(false),
    })
    .refine(
      ({ startDateTime, endDateTime }) =>
        !endDateTime || endDateTime >= startDateTime,
      {
        message: "Event endDateTime must not precede startDateTime",
        path: ["endDateTime"],
      },
    ),
});

const media = defineCollection({
  loader: glob({ base: "./src/content/media", pattern: "**/*.json" }),
  schema: z.object({
    id: stableId,
    kind: z.enum(["photo", "youtube"]),
    title: localizedText,
    description: optionalLocalizedText,
    source: z.string().min(1),
    alt: optionalLocalizedText,
    credit: z.string(),
    rightsStatus: z.enum(["approved", "pending", "withdrawn"]),
    status: publicationStatus,
    demo: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/*.json" }),
  schema: z.object({
    id: stableId,
    route: localizedText,
    title: localizedText,
    lead: localizedText,
    body: localizedText,
    status: publicationStatus,
    demo: z.boolean().default(false),
  }),
});

export const collections = {
  athletes,
  competitions,
  results,
  courseSchedules,
  scheduleExceptions,
  news,
  events,
  media,
  pages,
};
