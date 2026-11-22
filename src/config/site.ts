export const SITE_NAME = "VAN THUYNE TAEKWONDO / ELITE";

export const SUPPORTED_LANGUAGES = ["fr", "en"] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "fr";
export const CLUB_TIME_ZONE = "Europe/Paris";

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/vanthuynetkd_officiel/",
  youtube: "https://www.youtube.com/@vanthuynetkdofficiel3760",
} as const;

/**
 * Le domaine cible n'est pas acquis. Ne pas utiliser cette valeur comme preuve
 * de propriété ni comme URL de production avant validation en Phase 5.
 */
export const TARGET_DOMAIN = "vanthuynetkd.com";

export function isSupportedLanguage(value: string): value is Language {
  return SUPPORTED_LANGUAGES.some((language) => language === value);
}
