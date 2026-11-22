import { describe, expect, it } from "vitest";
import {
  validateContactDraft,
  type ContactDraft,
} from "../../src/domain/contact";

const now = 10_000;
const validDraft: ContactDraft = {
  name: "Visiteur Démo",
  email: "visiteur@example.test",
  subject: "Question de démonstration",
  message: "Message fictif suffisamment long pour la validation.",
  language: "fr",
  website: "",
  startedAt: 1_000,
};

describe("contact form validation", () => {
  it("accepts the four necessary visitor fields", () => {
    expect(validateContactDraft(validDraft, now)).toEqual({
      valid: true,
      fields: [],
    });
  });

  it("reports understandable field-level failures", () => {
    expect(
      validateContactDraft(
        {
          ...validDraft,
          name: "",
          email: "not-an-email",
          subject: "x",
          message: "court",
        },
        now,
      ).fields,
    ).toEqual(["name", "email", "subject", "message"]);
  });

  it("rejects the honeypot and submissions made too quickly", () => {
    expect(
      validateContactDraft(
        { ...validDraft, website: "https://spam.test", startedAt: 9_500 },
        now,
      ).fields,
    ).toContain("spam");
  });

  it("limits message length", () => {
    expect(
      validateContactDraft(
        { ...validDraft, message: "a".repeat(5_001) },
        now,
      ).fields,
    ).toContain("message");
  });
});
