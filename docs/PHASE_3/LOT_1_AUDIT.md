# Phase 3 — LOT 1 — Audit du projet

**Date :** 22 novembre 2026  
**Périmètre :** état du workspace avant initialisation du site Astro  
**Statut :** audit terminé

## 1. Résultat exécutif

Le workspace contient les livrables documentaires des Phases 1 et 2, le
prototype autonome validé, le logo raster et les captures de revue. Il ne
contenait, au début du LOT 1, aucun dépôt Git, projet Astro, `package.json`,
code TypeScript, collection de contenu, CMS, test applicatif ou workflow CI.

La Phase 3 doit donc réimplémenter le prototype proprement. Le JavaScript
monolithique du prototype reste une référence fonctionnelle, pas une base de
production.

## 2. État du repository

- `git rev-parse --is-inside-work-tree` : échec, aucun dépôt Git initialisé.
- Branche : aucune.
- Modifications suivies : non applicable avant initialisation.
- Gestionnaire retenu pour l'initialisation : npm, déjà disponible.
- Environnement observé :
  - Node.js `22.21.1` ;
  - npm `11.6.2`.

## 3. Fichiers réellement présents

### Documentation

Les documents demandés sont présents :

- `docs/PHASE_1_AUDIT.md` ;
- `docs/ARCHITECTURE.md` ;
- `docs/BRAND_IDENTITY.md` ;
- `docs/UX_UI_DESIGN.md` ;
- `docs/DESIGN_SYSTEM.md` ;
- `docs/PHASE_2/*.md`.

Les fichiers prévisionnels mentionnés en Phase 1 comme
`CONTENT_MANAGEMENT.md`, `DEPLOYMENT.md`, `MAINTENANCE.md`, `MEDIA_MANAGEMENT.md`,
`SECURITY.md` et `TRANSLATION.md` n'existaient pas. Ils ne sont donc pas
considérés comme des livrables disponibles.

### Prototype et ressources

- `design/phase-2/prototype/index.html` ;
- `design/phase-2/prototype/prototype.css` ;
- `design/phase-2/prototype/prototype.js` ;
- `design/phase-2/prototype/demo-content.js` ;
- captures initiales et complémentaires sous `design/phase-2/` ;
- `logo.jpg`, JPEG carré de 160 × 160 pixels.

Le logo est utilisable en petit format. L'original vectoriel reste nécessaire
avant une mise en production.

### Code applicatif

Absent avant l'initialisation :

- `package.json` et fichier de verrouillage ;
- `astro.config.*` et `tsconfig.json` ;
- `src/`, `public/`, `tests/` ;
- dépendances npm ;
- CMS et authentification ;
- configuration de déploiement.

## 4. Éléments réutilisables

### À réimplémenter

- palette, contrastes, rythme, typographies et composants du design system ;
- navigation bilingue et routes publiques ;
- shell public, en-tête, pied de page, fil d'Ariane et menu mobile ;
- tableaux de résultats avec cartes mobiles équivalentes ;
- cartes, états vides, alertes, formulaires et focus visible ;
- parcours de confirmation des résultats ;
- règles de calcul du palmarès ;
- contenus de démonstration explicitement identifiés.

### À conserver uniquement comme référence

- routage par hash du prototype ;
- rendu par `innerHTML` ;
- état mutable en mémoire ;
- barre de revue, choix artificiel de viewport et annotations ;
- simulation de connexion et de permissions ;
- calcul du palmarès côté navigateur.

Ces mécanismes sont remplacés par des routes Astro, des composants typés, des
collections validées et des fonctions métier testées.

## 5. Décisions du club intégrées

- cinq comptes administrateurs au maximum ;
- quatre rôles de référence ;
- Kyorugi comme discipline principale ;
- Poomsae présenté complètement ;
- français et anglais ;
- récapitulatif obligatoire avant tout enregistrement de résultat ;
- modification avec identifiant stable ;
- palmarès calculé uniquement depuis les résultats `published` valides ;
- brouillons, annulations et archives exclus ;
- ajout d'une gestion des horaires de cours.

Les anciennes mentions « 5 à 6 » sont des constats historiques de Phase 2.
La limite opérationnelle de Phase 3 est cinq.

## 6. Écarts et choix techniques

### Discipline

Les anciennes spécifications alternent `combat` et `kyorugi`. La donnée
canonique de Phase 3 sera `kyorugi`; le slug public reste `combat` pour
préserver les URLs validées.

### Horaires

Les horaires récurrents n'existent pas dans le prototype. Une collection
`courseSchedules` et une collection `scheduleExceptions` sont ajoutées :

- le cours récurrent porte le jour, les heures, le lieu, le groupe, la période
  de validité et le fuseau ;
- une exception ponctuelle annule ou remplace une occurrence sans modifier le
  cours permanent.

Le fuseau par défaut proposé est `Europe/Paris`, à confirmer si le club change
de localisation.

### CMS

Le choix final reste ouvert :

- Decap Turbo avec rôles avancés est le seul scénario déjà étudié qui applique
  `edit/view/none` par collection, mais il est payant ;
- Pages CMS est plus simple et annoncé gratuit, mais ne garantit pas les quatre
  rôles métier.

La Phase 3 peut préparer une configuration Git-based sans créer de compte ni
souscrire un service. Aucune permission non démontrée ne sera promise.

### Documents sportifs

Deux modes seront documentés et préparés. Les documents publics pourront être
référencés par identifiant stable. Les justificatifs privés, données
personnelles et autorisations de mineurs resteront hors du dépôt public et hors
des collections publiées.

### Contact

Le formulaire sera implémenté et validé côté client comme expérience de
développement, mais aucun envoi réel ne sera activé avant validation du
destinataire, du fournisseur et des mentions RGPD.

## 7. Arborescence technique proposée

```text
site-VTTKD/
├── public/
│   ├── admin/
│   ├── brand/
│   └── documents/
├── src/
│   ├── components/
│   │   ├── content/
│   │   ├── forms/
│   │   ├── layout/
│   │   ├── media/
│   │   ├── results/
│   │   └── schedules/
│   ├── content/
│   │   ├── athletes/
│   │   ├── competitions/
│   │   ├── course-schedules/
│   │   ├── events/
│   │   ├── media/
│   │   ├── news/
│   │   ├── pages/
│   │   ├── results/
│   │   └── schedule-exceptions/
│   ├── i18n/
│   ├── layouts/
│   ├── lib/
│   │   ├── content/
│   │   ├── i18n/
│   │   ├── results/
│   │   └── schedules/
│   ├── pages/
│   │   ├── admin/
│   │   └── [lang]/
│   ├── styles/
│   └── types/
├── tests/
│   ├── fixtures/
│   ├── integration/
│   └── unit/
├── docs/PHASE_3/
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

## 8. Plan d'exécution du LOT 2

1. Initialiser Git sur une branche `main`.
2. Créer un projet Astro minimal sans écraser les livrables existants.
3. Activer le mode TypeScript strict.
4. Ajouter les scripts `dev`, `build`, `preview`, `check` et `test`.
5. Installer uniquement Astro, TypeScript, `@astrojs/check` et Vitest.
6. Créer les dossiers applicatifs et copier le logo dans `public/brand/`.
7. Ajouter `.gitignore`, `.env.example` sans secret et les métadonnées du
   projet.
8. Vérifier `astro check`, les tests et le build.

## 9. Blocages

Aucun blocage pour les LOTS 2 à 8.

Les choix suivants devront être validés avant de présenter l'administration
comme opérationnelle : CMS, authentification, fournisseur de stockage privé,
destinataire du contact et fournisseur d'envoi.

## 10. Limites

Cet audit n'est ni un audit juridique ni un test de sécurité d'un CMS réel. Le
domaine cible n'est pas considéré comme acquis. Aucun compte, abonnement,
déploiement ou DNS n'a été créé ou modifié.
