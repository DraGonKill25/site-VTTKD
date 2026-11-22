import { describe, expect, it } from "vitest";
import {
  calculateHonours,
  type HonoursResult,
} from "../../src/domain/honours";

const base: HonoursResult = {
  id: "result-one",
  competitionId: "competition-one",
  discipline: "kyorugi",
  participantType: "individual",
  athleteIds: ["athlete-one"],
  medal: "gold",
  status: "published",
};

describe("public honours calculation", () => {
  it("counts published individual and team results once", () => {
    const summary = calculateHonours([
      base,
      {
        ...base,
        id: "result-two",
        medal: "none",
      },
      {
        ...base,
        id: "result-team",
        competitionId: "competition-two",
        discipline: "poomsae",
        participantType: "team",
        athleteIds: ["athlete-two", "athlete-three", "athlete-four"],
        medal: "silver",
      },
    ]);

    expect(summary).toMatchObject({
      participations: 3,
      individualParticipations: 2,
      teamParticipations: 1,
      distinctCompetitions: 2,
      medals: { gold: 1, silver: 1, bronze: 0, total: 2 },
    });
    expect(summary.byDiscipline.kyorugi.participations).toBe(2);
    expect(summary.byDiscipline.poomsae.participations).toBe(1);
    expect(summary.byDiscipline.poomsae.medals.silver).toBe(1);
  });

  it("excludes drafts, cancellations and archives", () => {
    const statuses = ["draft", "cancelled", "archived"] as const;
    const summary = calculateHonours(
      statuses.map((status, index) => ({
        ...base,
        id: `excluded-${index}`,
        status,
      })),
    );

    expect(summary.participations).toBe(0);
    expect(summary.medals.total).toBe(0);
    expect(summary.distinctCompetitions).toBe(0);
  });

  it("counts one team result as one participation and one medal", () => {
    const summary = calculateHonours([
      {
        ...base,
        participantType: "team",
        athleteIds: ["athlete-one", "athlete-two", "athlete-three"],
      },
    ]);

    expect(summary.participations).toBe(1);
    expect(summary.teamParticipations).toBe(1);
    expect(summary.medals.gold).toBe(1);
  });

  it("uses the latest value for a corrected stable identifier", () => {
    const summary = calculateHonours([
      base,
      { ...base, medal: "silver" },
    ]);

    expect(summary.participations).toBe(1);
    expect(summary.medals).toEqual({
      gold: 0,
      silver: 1,
      bronze: 0,
      total: 1,
    });
  });

  it("removes a corrected result when its latest status is cancelled", () => {
    const summary = calculateHonours([
      base,
      { ...base, status: "cancelled" },
    ]);

    expect(summary.participations).toBe(0);
    expect(summary.medals.total).toBe(0);
  });
});
