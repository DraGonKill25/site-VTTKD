export interface HonoursResult {
  id: string;
  competitionId: string;
  discipline: "kyorugi" | "poomsae";
  participantType: "individual" | "pair" | "team";
  athleteIds: string[];
  medal: "none" | "bronze" | "silver" | "gold";
  status: "draft" | "published" | "archived" | "cancelled";
}

export interface MedalTotals {
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

export interface HonoursSlice {
  participations: number;
  individualParticipations: number;
  pairParticipations: number;
  teamParticipations: number;
  medals: MedalTotals;
}

export interface HonoursSummary extends HonoursSlice {
  distinctCompetitions: number;
  byDiscipline: {
    kyorugi: HonoursSlice;
    poomsae: HonoursSlice;
  };
}

function emptySlice(): HonoursSlice {
  return {
    participations: 0,
    individualParticipations: 0,
    pairParticipations: 0,
    teamParticipations: 0,
    medals: { gold: 0, silver: 0, bronze: 0, total: 0 },
  };
}

function addResult(slice: HonoursSlice, result: HonoursResult): void {
  slice.participations += 1;

  if (result.participantType === "individual") {
    slice.individualParticipations += 1;
  } else if (result.participantType === "pair") {
    slice.pairParticipations += 1;
  } else {
    slice.teamParticipations += 1;
  }

  if (result.medal !== "none") {
    slice.medals[result.medal] += 1;
    slice.medals.total += 1;
  }
}

export function calculateHonours(results: HonoursResult[]): HonoursSummary {
  const latestById = new Map<string, HonoursResult>();
  for (const result of results) latestById.set(result.id, result);

  const eligible = [...latestById.values()].filter(
    ({ status }) => status === "published",
  );
  const summary: HonoursSummary = {
    ...emptySlice(),
    distinctCompetitions: new Set(
      eligible.map(({ competitionId }) => competitionId),
    ).size,
    byDiscipline: {
      kyorugi: emptySlice(),
      poomsae: emptySlice(),
    },
  };

  for (const result of eligible) {
    addResult(summary, result);
    addResult(summary.byDiscipline[result.discipline], result);
  }

  return summary;
}
