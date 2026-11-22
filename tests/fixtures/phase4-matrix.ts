export const viewports = [
  { name: "small-mobile", width: 320, height: 900 },
  { name: "mobile", width: 390, height: 900 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "desktop", width: 1440, height: 1000 },
] as const;

export const visualRoutes = [
  { name: "home-fr", path: "/fr/" },
  { name: "home-en", path: "/en/" },
  { name: "kyorugi-fr", path: "/fr/disciplines/combat/" },
  { name: "poomsae-en", path: "/en/disciplines/poomsae/" },
  { name: "athletes-fr", path: "/fr/athletes/" },
  { name: "athlete-profile-en", path: "/en/athletes/demo-athlete-a/" },
  { name: "competitions-fr", path: "/fr/competitions/" },
  {
    name: "competition-detail-en",
    path: "/en/competitions/horizon-demonstration-tournament/",
  },
  { name: "results-fr", path: "/fr/resultats/" },
  { name: "honours-en", path: "/en/honours/" },
  { name: "schedules-fr", path: "/fr/horaires/" },
  { name: "contact-en", path: "/en/contact/" },
  { name: "media-fr", path: "/fr/medias/" },
  { name: "admin-dashboard", path: "/admin/" },
  { name: "admin-results", path: "/admin/results/" },
  { name: "admin-documents", path: "/admin/documents/" },
] as const;

export const axeRoutes = [
  "/fr/",
  "/en/",
  "/fr/disciplines/combat/",
  "/en/disciplines/poomsae/",
  "/fr/athletes/",
  "/en/athletes/demo-athlete-a/",
  "/fr/competitions/",
  "/fr/resultats/",
  "/en/honours/",
  "/fr/horaires/",
  "/en/contact/",
  "/fr/medias/",
  "/admin/",
  "/admin/results/",
  "/admin/documents/",
] as const;

export const reflowRoutes = [
  "/fr/",
  "/fr/resultats/",
  "/fr/contact/",
  "/admin/results/",
  "/admin/documents/",
] as const;
