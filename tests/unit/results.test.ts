import { describe, expect, it } from "vitest";
import {
  createResultRecord,
  diffResult,
  updateResultRecord,
  upsertResult,
  validateResultDraft,
  type ResultDraft,
} from "../../src/domain/results";

const draft: ResultDraft = {
  competitionId: "competition-test",
  competitionName: "Compétition test",
  competitionDate: "2026-03-10",
  competitionLocation: "Lieu test",
  discipline: "kyorugi",
  participantType: "individual",
  participantName: "Athlète test",
  category: "Catégorie test",
  rank: 1,
  medal: "gold",
  comment: "",
  sourceRef: "",
  status: "published",
};

describe("result confirmation workflow", () => {
  it("rejects inconsistent medals before confirmation", () => {
    expect(validateResultDraft({ ...draft, rank: 2 })).toContain("rank");
    expect(validateResultDraft(draft)).toEqual([]);
  });

  it("lists every changed field for the recap", () => {
    const changes = diffResult(draft, {
      ...draft,
      competitionLocation: "Nouveau lieu",
      rank: 3,
      medal: "bronze",
    });

    expect(changes.map(({ field }) => field)).toEqual([
      "competitionLocation",
      "rank",
      "medal",
    ]);
  });

  it("updates the same stable identifier and records history", () => {
    const created = createResultRecord(
      "result-stable",
      draft,
      "Admin Démo",
      "2026-03-11T10:00:00Z",
    );
    const updated = updateResultRecord(
      created,
      { ...draft, comment: "Correction test" },
      "Admin Sport Démo",
      "2026-03-12T10:00:00Z",
    );

    expect(updated.id).toBe(created.id);
    expect(updated.createdAt).toBe(created.createdAt);
    expect(updated.history).toHaveLength(2);
    expect(updated.history[1]?.changes).toEqual([
      {
        field: "comment",
        previousValue: "",
        nextValue: "Correction test",
      },
    ]);
  });

  it("replaces an edited result instead of creating a participation", () => {
    const created = createResultRecord(
      "result-stable",
      draft,
      "Admin Démo",
      "2026-03-11T10:00:00Z",
    );
    const updated = updateResultRecord(
      created,
      { ...draft, rank: 2, medal: "silver" },
      "Admin Démo",
      "2026-03-12T10:00:00Z",
    );

    expect(upsertResult([created], updated)).toEqual([updated]);
  });
});
