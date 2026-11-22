import type { Language } from "../config/site";

export const ui = {
  fr: {
    skip: "Aller au contenu",
    menu: "Menu",
    close: "Fermer",
    home: "Accueil",
    club: "Le club",
    coaching: "Encadrement",
    disciplines: "Disciplines",
    kyorugi: "Kyorugi",
    poomsae: "Poomsae",
    athletes: "Athlètes",
    competitions: "Compétitions",
    results: "Résultats",
    honours: "Palmarès",
    schedules: "Horaires",
    calendar: "Calendrier",
    news: "Actualités",
    media: "Médias",
    contact: "Contact",
    privacy: "Politique de confidentialité",
    legal: "Mentions légales",
    viewResults: "Voir les résultats",
    demo: "Contenu de démonstration",
    demoText:
      "Les informations de cette page sont des exemples clairement identifiés, pas des données officielles du club.",
    pocTitle: "POC — Version de démonstration non officielle",
    pocText:
      "Les contenus sportifs sont fictifs et les horaires ainsi que les informations institutionnelles restent en attente de validation.",
    noContent: "Contenu à fournir par le club",
    learnMore: "Découvrir",
    published: "Publié",
    draft: "Brouillon",
    archived: "Archivé",
    cancelled: "Annulé",
  },
  en: {
    skip: "Skip to content",
    menu: "Menu",
    close: "Close",
    home: "Home",
    club: "Club",
    coaching: "Coaching team",
    disciplines: "Disciplines",
    kyorugi: "Kyorugi",
    poomsae: "Poomsae",
    athletes: "Athletes",
    competitions: "Competitions",
    results: "Results",
    honours: "Honours",
    schedules: "Class schedule",
    calendar: "Calendar",
    news: "News",
    media: "Media",
    contact: "Contact",
    privacy: "Privacy policy",
    legal: "Legal notice",
    viewResults: "View results",
    demo: "Demonstration content",
    demoText:
      "Information on this page is clearly labelled sample content, not official club data.",
    pocTitle: "POC — Unofficial demonstration version",
    pocText:
      "Sporting content is fictional; schedules and institutional information are awaiting validation.",
    noContent: "Content to be provided by the club",
    learnMore: "Discover",
    published: "Published",
    draft: "Draft",
    archived: "Archived",
    cancelled: "Cancelled",
  },
} as const;

export type UiDictionary = (typeof ui)[Language];

export function getUi(lang: Language): UiDictionary {
  return ui[lang];
}
