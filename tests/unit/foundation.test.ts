import { describe, expect, it } from "vitest";

import {
  CLUB_TIME_ZONE,
  DEFAULT_LANGUAGE,
  isSupportedLanguage,
  SUPPORTED_LANGUAGES,
} from "../../src/config/site";

describe("project foundation", () => {
  it("supports exactly the validated French and English locales", () => {
    expect(SUPPORTED_LANGUAGES).toEqual(["fr", "en"]);
    expect(DEFAULT_LANGUAGE).toBe("fr");
    expect(isSupportedLanguage("fr")).toBe(true);
    expect(isSupportedLanguage("en")).toBe(true);
    expect(isSupportedLanguage("de")).toBe(false);
  });

  it("uses the documented club time zone", () => {
    expect(CLUB_TIME_ZONE).toBe("Europe/Paris");
  });
});
