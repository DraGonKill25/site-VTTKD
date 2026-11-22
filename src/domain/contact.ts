export interface ContactDraft {
  name: string;
  email: string;
  subject: string;
  message: string;
  language: "fr" | "en";
  website: string;
  startedAt: number;
}

export type ContactField = "name" | "email" | "subject" | "message" | "spam";

export interface ContactValidation {
  valid: boolean;
  fields: ContactField[];
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactDraft(
  draft: ContactDraft,
  now = Date.now(),
): ContactValidation {
  const fields: ContactField[] = [];
  const name = draft.name.trim();
  const subject = draft.subject.trim();
  const message = draft.message.trim();

  if (name.length < 2 || name.length > 100) fields.push("name");
  if (
    draft.email.length > 254 ||
    !emailPattern.test(draft.email.trim().toLowerCase())
  ) {
    fields.push("email");
  }
  if (subject.length < 3 || subject.length > 150) fields.push("subject");
  if (message.length < 10 || message.length > 5_000) fields.push("message");
  if (
    draft.website.trim() ||
    !Number.isFinite(draft.startedAt) ||
    now - draft.startedAt < 3_000
  ) {
    fields.push("spam");
  }

  return { valid: fields.length === 0, fields: [...new Set(fields)] };
}
