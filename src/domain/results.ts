export type ResultDiscipline = "kyorugi" | "poomsae";
export type ResultParticipantType = "individual" | "pair" | "team";
export type ResultMedal = "none" | "bronze" | "silver" | "gold";
export type ResultStatus = "draft" | "published" | "archived" | "cancelled";

export interface ResultDraft {
  competitionId: string;
  competitionName: string;
  competitionDate: string;
  competitionLocation: string;
  discipline: ResultDiscipline;
  participantType: ResultParticipantType;
  participantName: string;
  category: string;
  rank: number | null;
  medal: ResultMedal;
  comment: string;
  sourceRef: string;
  status: ResultStatus;
}

export interface ResultChange {
  field: keyof ResultDraft;
  previousValue: string;
  nextValue: string;
}

export interface ResultHistoryEntry {
  changedAt: string;
  changedBy: string;
  changes: ResultChange[];
}

export interface ResultRecord extends ResultDraft {
  id: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  history: ResultHistoryEntry[];
  demo: true;
}

const fields: Array<keyof ResultDraft> = [
  "competitionId",
  "competitionName",
  "competitionDate",
  "competitionLocation",
  "discipline",
  "participantType",
  "participantName",
  "category",
  "rank",
  "medal",
  "comment",
  "sourceRef",
  "status",
];

function serialize(value: ResultDraft[keyof ResultDraft]): string {
  return value === null ? "" : String(value);
}

export function validateResultDraft(draft: ResultDraft): string[] {
  const errors: string[] = [];

  if (!draft.competitionId.trim()) errors.push("competitionId");
  if (!draft.competitionName.trim()) errors.push("competitionName");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.competitionDate)) {
    errors.push("competitionDate");
  }
  if (!draft.competitionLocation.trim()) errors.push("competitionLocation");
  if (!draft.participantName.trim()) errors.push("participantName");
  if (!draft.category.trim()) errors.push("category");
  if (draft.rank !== null && (!Number.isInteger(draft.rank) || draft.rank < 1)) {
    errors.push("rank");
  }
  if (draft.medal === "gold" && draft.rank !== 1) errors.push("rank");
  if (draft.medal === "silver" && draft.rank !== 2) errors.push("rank");
  if (draft.medal === "bronze" && draft.rank !== 3) errors.push("rank");

  return [...new Set(errors)];
}

export function diffResult(
  previous: ResultDraft,
  next: ResultDraft,
): ResultChange[] {
  return fields.flatMap((field) => {
    const previousValue = serialize(previous[field]);
    const nextValue = serialize(next[field]);

    return previousValue === nextValue
      ? []
      : [{ field, previousValue, nextValue }];
  });
}

export function createResultRecord(
  id: string,
  draft: ResultDraft,
  actor: string,
  timestamp: string,
): ResultRecord {
  return {
    id,
    ...draft,
    createdAt: timestamp,
    createdBy: actor,
    updatedAt: timestamp,
    updatedBy: actor,
    history: [
      {
        changedAt: timestamp,
        changedBy: actor,
        changes: fields.map((field) => ({
          field,
          previousValue: "",
          nextValue: serialize(draft[field]),
        })),
      },
    ],
    demo: true,
  };
}

export function updateResultRecord(
  record: ResultRecord,
  draft: ResultDraft,
  actor: string,
  timestamp: string,
): ResultRecord {
  const changes = diffResult(record, draft);
  if (changes.length === 0) return record;

  return {
    ...record,
    ...draft,
    id: record.id,
    createdAt: record.createdAt,
    createdBy: record.createdBy,
    updatedAt: timestamp,
    updatedBy: actor,
    history: [
      ...record.history,
      { changedAt: timestamp, changedBy: actor, changes },
    ],
    demo: true,
  };
}

export function upsertResult(
  records: ResultRecord[],
  result: ResultRecord,
): ResultRecord[] {
  const index = records.findIndex(({ id }) => id === result.id);
  if (index === -1) return [...records, result];

  return records.map((record, currentIndex) =>
    currentIndex === index ? result : record,
  );
}
