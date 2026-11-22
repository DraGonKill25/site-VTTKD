# Anomalies et limites — Phase 4

**Date :** 22 novembre 2026  
**Périmètre :** environnement local uniquement

## P4-001 — Débordement horizontal de l'en-tête à 320 px

- **Statut :** CORRIGÉ ET RETESTÉ.
- **Gravité :** MOYENNE.
- **Constat initial :** les treize routes publiques de la matrice dépassaient
  la largeur de 320 px ; le sélecteur de langue sortait de l'écran.
- **Cause :** l'en-tête conservait trois colonnes trop larges.
- **Correction :** en-tête mobile réorganisé sur deux lignes, marque
  compressible et actions réparties sur toute la largeur.
- **Preuve :** 66/66 tests `test:visual` réussis ; captures
  `evidence/screenshots/small-mobile/`.

## P4-002 — Contraste d'un libellé sur fond sombre

- **Statut :** CORRIGÉ ET RETESTÉ.
- **Gravité :** MOYENNE, règle axe classée `serious`.
- **Constat initial :** ratio 3,48:1 pour l'eyebrow de la section sombre des
  accueils FR et EN.
- **Correction :** utilisation de la couleur d'accent claire sur les sections
  sombres.
- **Preuve :** 15/15 routes axe sans violation après correction ; rapports
  `evidence/axe/`.

## P4-003 — Lecteur d'écran réel

- **Statut :** NON VÉRIFIÉ.
- **Gravité :** ÉLEVÉE avant validation d'accessibilité.
- **Limite :** aucun essai réellement entendu avec NVDA, Narrateur, JAWS ou
  VoiceOver n'a été possible dans cette campagne automatisée.
- **Preuve disponible :** arbre d'accessibilité
  `evidence/accessibility-tree/contact-fr.json`, noms accessibles, régions,
  erreurs et focus testés automatiquement.
- **Correction proposée :** faire parcourir accueil, navigation, résultats,
  horaires, contact et administration locale avec NVDA ou Narrateur avant
  toute décision de production.

## P4-004 — Zoom natif à 200 %

- **Statut :** PARTIELLEMENT VÉRIFIÉ.
- **Gravité :** MOYENNE.
- **Limite :** le reflow à 200 % a été simulé par une taille de texte doublée
  dans Chromium ; ce test ne remplace pas le zoom natif de chaque navigateur.
- **Correction réalisée :** suppression de la largeur minimale en `rem` et
  adaptation de la navigation administrative.
- **Preuve :** 5/5 scénarios de reflow réussis.
- **Correction proposée :** contrôle humain à 200 % dans Edge et Firefox sur
  les cinq routes de la matrice.

## P4-005 — `/admin/*` n'est pas sécurisé

- **Statut :** OUVERT — BLOCAGE DE PRODUCTION ATTENDU.
- **Gravité :** ÉLEVÉE.
- **Constat :** accès sans authentification, données de résultats dans
  `localStorage`, historique modifiable et aucune permission réelle.
- **Preuve :** tests `SEC-01` à `SEC-05`, bannière visible et
  `noindex,nofollow,noarchive`.
- **Correction proposée :** ne jamais exposer ces routes comme administration
  réelle ; raccorder ultérieurement un service authentifié, des comptes
  nominatifs et des contrôles serveur après décision du club.

## P4-006 — CMS, comptes et concurrence non essayés

- **Statut :** NON VÉRIFIÉ — BLOCAGE DE PRODUCTION.
- **Gravité :** ÉLEVÉE.
- **Constat :** Pages CMS n'a pas été connecté à un dépôt distant ; aucun
  compte, révocation, publication Git ni conflit simultané n'a été testé.
  Ses permissions ne séparent pas les quatre rôles par personne.
- **Correction proposée :** le club doit choisir entre des droits Pages CMS
  larges et une solution à rôles imposés ; réaliser ensuite un essai avec cinq
  comptes nominatifs maximum, sans compte partagé.

## P4-007 — Score SEO Lighthouse en environnement local

- **Statut :** LIMITE CONNUE.
- **Gravité :** INFORMATION.
- **Constat :** score SEO 0,66 avec indexation volontairement désactivée et
  canonical de développement.
- **Preuve :** `evidence/lighthouse/summary.json`.
- **Correction proposée :** conserver `noindex` tant que le site n'est pas
  autorisé à être publié ; valider domaine, canonical, sitemap et indexation
  dans une phase ultérieure.

## P4-008 — Tabulation automatisée WebKit sous Windows

- **Statut :** LIMITE D'OUTIL DOCUMENTÉE.
- **Gravité :** INFORMATION.
- **Constat :** WebKit Playwright sous Windows ne tabule pas vers les liens
  sans le réglage système propre à Safari.
- **Traitement :** les mêmes assertions de focus et d'activation sont
  exécutées avec un focus programmatique sous WebKit ; Firefox et Chromium
  utilisent la touche Tab.
- **Correction proposée :** contrôle clavier humain supplémentaire dans un
  Safari réel si ce navigateur devient une cible de validation.

## P4-009 — Contact et documents sans services réels

- **Statut :** NON VÉRIFIÉ — BLOCAGE DE PRODUCTION.
- **Gravité :** ÉLEVÉE.
- **Constat :** aucun message n'est envoyé, aucun fichier n'est chargé, aucun
  fournisseur, destinataire, stockage privé ou politique de conservation
  n'est configuré.
- **Preuve :** les tests confirment précisément l'absence de POST et d'upload.
- **Correction proposée :** choix et validation juridique/technique par le
  club avant un essai d'intégration serveur sécurisé.

## P4-010 — Contenus officiels manquants

- **Statut :** À VALIDER PAR LE CLUB.
- **Gravité :** ÉLEVÉE avant publication.
- **Constat :** horaires, coordonnées, textes, traductions, médias,
  autorisations et données sportives officielles n'ont pas été fournis.
- **Protection actuelle :** fixtures et pages explicitement marquées comme
  démonstration ; aucune donnée réelle n'a été inventée.
- **Correction proposée :** collecte, validation bilingue et revue des droits
  avant remplacement des contenus de démonstration.
