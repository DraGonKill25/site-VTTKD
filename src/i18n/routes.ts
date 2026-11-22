import type { Language } from "../config/site";

export type RouteKey =
  | "home"
  | "club"
  | "coaching"
  | "disciplines"
  | "kyorugi"
  | "poomsae"
  | "athletes"
  | "competitions"
  | "results"
  | "honours"
  | "schedules"
  | "calendar"
  | "news"
  | "media"
  | "contact"
  | "legal"
  | "privacy";

const fragments: Record<RouteKey, Record<Language, string>> = {
  home: { fr: "", en: "" },
  club: { fr: "club", en: "club" },
  coaching: { fr: "club/encadrement", en: "club/coaching-team" },
  disciplines: { fr: "disciplines", en: "disciplines" },
  kyorugi: { fr: "disciplines/combat", en: "disciplines/combat" },
  poomsae: { fr: "disciplines/poomsae", en: "disciplines/poomsae" },
  athletes: { fr: "athletes", en: "athletes" },
  competitions: { fr: "competitions", en: "competitions" },
  results: { fr: "resultats", en: "results" },
  honours: { fr: "palmares", en: "honours" },
  schedules: { fr: "horaires", en: "class-schedule" },
  calendar: { fr: "calendrier", en: "calendar" },
  news: { fr: "actualites", en: "news" },
  media: { fr: "medias", en: "media" },
  contact: { fr: "contact", en: "contact" },
  legal: { fr: "mentions-legales", en: "legal-notice" },
  privacy: { fr: "politique-confidentialite", en: "privacy-policy" },
};

const configuredBase = import.meta.env.BASE_URL;
export const basePath = configuredBase.endsWith("/")
  ? configuredBase
  : `${configuredBase}/`;

export function withBasePath(pathname: string): string {
  const relativePath = pathname.replace(/^\/+/, "");
  return `${basePath}${relativePath}`;
}

export function stripBasePath(pathname: string): string {
  if (basePath === "/") return pathname;
  if (!pathname.startsWith(basePath)) return pathname;
  return `/${pathname.slice(basePath.length)}`;
}

export function route(lang: Language, key: RouteKey): string {
  const fragment = fragments[key][lang];
  return withBasePath(`${lang}/${fragment}${fragment ? "/" : ""}`);
}

export function switchLanguagePath(pathname: string, lang: Language): string {
  const other: Language = lang === "fr" ? "en" : "fr";
  const key = routeKeyFromPath(pathname, lang);
  return route(other, key ?? "home");
}

export function routeKeyFromPath(
  pathname: string,
  lang: Language,
): RouteKey | undefined {
  return (Object.keys(fragments) as RouteKey[]).find(
    (key) => route(lang, key) === pathname,
  );
}
