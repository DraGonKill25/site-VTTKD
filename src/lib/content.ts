import type { Language } from "../config/site";

export interface LocalizedText {
  fr: string;
  en: string;
}

export function localize(
  value: LocalizedText | undefined,
  lang: Language,
): string {
  if (!value) return "";

  const text = value[lang].trim();
  if (text) return text;

  return lang === "fr"
    ? "Traduction à fournir"
    : "Translation to be provided";
}

export function formatDate(value: string, lang: Language): string {
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", {
    dateStyle: "long",
    timeZone: "Europe/Paris",
  }).format(new Date(`${value.slice(0, 10)}T12:00:00+01:00`));
}

export function formatDateTime(value: string, lang: Language): string {
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Paris",
  }).format(new Date(value));
}
