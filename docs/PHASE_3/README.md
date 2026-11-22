# Phase 3 — Développement

**Statut :** développement terminé, prêt pour la Phase 4  
**Environnement :** développement local uniquement

## Installation

Prérequis recommandé : Node.js `22.23.4` ou plus récent.

Le projet inclut temporairement un runtime Node local verrouillé afin que les
scripts restent exécutables dans le workspace actuel, dont le Node système est
légèrement antérieur au minimum requis par Astro 7.

```bash
npm install
npm run dev
```

Contrôles :

```bash
npm run check
npm test
npm run build
npm run test:site
npm audit --audit-level=high
```

## Versions principales

- Astro `7.4.13`
- TypeScript `6.0.3`
- Vitest `5.1.1`
- `@astrojs/check` `0.9.12`
- `@types/node` `22.20.5`
- runtime Node local `22.23.4`

Les versions sont verrouillées dans `package.json` et `package-lock.json`.

## Documents

- [`LOT_1_AUDIT.md`](LOT_1_AUDIT.md)
- [`TECHNICAL_ARCHITECTURE.md`](TECHNICAL_ARCHITECTURE.md)
- [`CONTENT_MODELS.md`](CONTENT_MODELS.md)
- [`COURSE_SCHEDULES.md`](COURSE_SCHEDULES.md)
- [`SPORT_RESULTS.md`](SPORT_RESULTS.md)
- [`ADMINISTRATION.md`](ADMINISTRATION.md)
- [`DOCUMENT_STORAGE.md`](DOCUMENT_STORAGE.md)
- [`CONTACT_AND_MEDIA.md`](CONTACT_AND_MEDIA.md)
- [`TESTS.md`](TESTS.md)
- [`KNOWN_LIMITATIONS.md`](KNOWN_LIMITATIONS.md)
- [`FINAL_REPORT.md`](FINAL_REPORT.md)

## Points d'entrée locaux

- site français : `/fr/` ;
- site anglais : `/en/` ;
- tableau de bord de démonstration : `/admin/` ;
- parcours des résultats : `/admin/results/` ;
- validation documentaire : `/admin/documents/`.

Le dossier `dist/` contient 52 pages après compilation. Les contenus sportifs,
personnes, compétitions et horaires affichés comme démonstration sont fictifs.

## Limites

- aucun déploiement ;
- aucun domaine configuré ;
- aucun compte CMS créé ;
- aucun fournisseur de formulaire ou de stockage souscrit ;
- aucun contenu personnel ou média d'athlète publié.
