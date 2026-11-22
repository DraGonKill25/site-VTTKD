# Rapport de tests — Phase 4

**Date :** 22 novembre 2026  
**Cible :** build Astro local sur `127.0.0.1`  
**Déploiement :** aucun

## 1. Synthèse

La campagne automatisée couvre les quatre largeurs imposées, les routes FR/EN,
les interactions principales, axe, Lighthouse, les parcours métier locaux et
les limites de sécurité. Deux défauts locaux ont été trouvés puis corrigés :
débordement de l'en-tête à 320 px et contraste d'un libellé sur fond sombre.

Le prototype est techniquement prêt à être examiné par le club. Il n'est pas
prêt pour la production : `/admin/*` n'est pas authentifié, le CMS distant,
l'envoi de contact et le stockage documentaire ne sont pas raccordés.

## 2. Preuves conservées

- captures : `docs/PHASE_4/evidence/screenshots/` ;
- résultats axe : `docs/PHASE_4/evidence/axe/` ;
- arbre d'accessibilité :
  `docs/PHASE_4/evidence/accessibility-tree/contact-fr.json` ;
- rapports Lighthouse HTML et JSON :
  `docs/PHASE_4/evidence/lighthouse/` ;
- scan local :
  `docs/PHASE_4/evidence/security/local-security-scan.json` ;
- spécifications exécutables : `tests/e2e/`.

## 3. Tests visuels

- **VIS-01 — RÉUSSI.** Preuve : 64 captures de 16 routes aux largeurs 320,
  390, 834 et 1440 px. Anomalie : aucune après retest. Gravité :
  INFORMATION. Correction : aucune.
- **VIS-02 — RÉUSSI.** Preuve : inspection des captures accueil, résultats,
  horaires, contact et administration. Anomalie : aucune incohérence
  bloquante. Gravité : INFORMATION. Correction : aucune.
- **VIS-03 — RÉUSSI.** Preuve : avertissements « contenu de démonstration »
  visibles. Anomalie : aucune. Gravité : INFORMATION. Correction : aucune.
- **VIS-04 — RÉUSSI.** Preuve : test table/cartes à 390 et 1440 px.
  Anomalie : aucune. Gravité : INFORMATION. Correction : aucune.
- **VIS-05 — RÉUSSI.** Preuve : scan des 124 fichiers initiaux et revue des
  fixtures. Anomalie : aucune donnée ou photo réelle ajoutée. Gravité :
  INFORMATION. Correction : aucune.
- **VIS-06 — RÉUSSI APRÈS CORRECTION.** Preuve : 66/66 tests visuels sans
  dépassement horizontal. Anomalie initiale : P4-001. Gravité : MOYENNE.
  Correction : largeur minimale supprimée et en-têtes adaptés.
- **VIS-07 — RÉUSSI APRÈS CORRECTION.** Preuve :
  `evidence/screenshots/small-mobile/home-fr.png` et
  `admin-documents.png`. Anomalie initiale : actions mobiles hors écran.
  Gravité : MOYENNE. Correction : marque et actions réparties sur deux lignes.

## 4. Navigation et français/anglais

- **NAV-01 — RÉUSSI.** Preuve : Playwright confirme `/` vers `/fr/`.
  Anomalie : aucune. Gravité : INFORMATION. Correction : aucune.
- **NAV-02 — RÉUSSI.** Preuve : navigation FR parcourue et liens contrôlés.
  Anomalie : aucune. Gravité : INFORMATION. Correction : aucune.
- **NAV-03 — RÉUSSI.** Preuve : navigation EN parcourue et liens contrôlés.
  Anomalie : aucune. Gravité : INFORMATION. Correction : aucune.
- **NAV-04 — RÉUSSI.** Preuve : changement de langue d'une route statique.
  Anomalie : aucune. Gravité : INFORMATION. Correction : aucune.
- **NAV-05 — RÉUSSI.** Preuve : profil fictif conservé par identifiant stable.
  Anomalie : aucune. Gravité : INFORMATION. Correction : aucune.
- **NAV-06 — RÉUSSI.** Preuve : compétition associée à son slug anglais.
  Anomalie : aucune. Gravité : INFORMATION. Correction : aucune.
- **NAV-07 — RÉUSSI.** Preuve : `aria-expanded`, Escape et restitution du
  focus vérifiés. Anomalie : aucune. Gravité : INFORMATION. Correction :
  aucune.
- **NAV-08 — RÉUSSI.** Preuve : lien d'évitement activé vers le contenu.
  Anomalie : limitation WebKit P4-008, sans défaut confirmé. Gravité :
  INFORMATION. Correction : focus programmatique équivalent sous WebKit.
- **NAV-09 — RÉUSSI.** Preuve : `lang`, canonical et deux `hreflang`
  présents. Anomalie : canonical local attendu. Gravité : INFORMATION.
  Correction : domaine réel à renseigner seulement après autorisation.
- **NAV-10 — RÉUSSI.** Preuve : une route inconnue renvoie 404. Anomalie :
  aucune. Gravité : INFORMATION. Correction : aucune.

## 5. Accessibilité

- **A11Y-01 — RÉUSSI APRÈS CORRECTION.** Preuve : axe sans violation sur
  douze routes publiques. Anomalie initiale : P4-002, contraste 3,48:1.
  Gravité : MOYENNE. Correction : accent clair sur fond sombre.
- **A11Y-02 — RÉUSSI.** Preuve : axe sans violation sur les trois écrans
  administratifs. Anomalie : aucune. Gravité : INFORMATION. Correction :
  aucune.
- **A11Y-03 — RÉUSSI.** Preuve : focus visible, lien d'évitement et clavier
  testés sous Chromium et Firefox. Anomalie : limite WebKit P4-008. Gravité :
  INFORMATION. Correction : contrôle Safari réel recommandé.
- **A11Y-04 — RÉUSSI.** Preuve : axe et sélecteurs par rôles accessibles.
  Anomalie : aucune. Gravité : INFORMATION. Correction : aucune.
- **A11Y-05 — RÉUSSI.** Preuve : l'alerte contact reçoit le focus et expose
  un message compréhensible. Anomalie : aucune. Gravité : INFORMATION.
  Correction : aucune.
- **A11Y-06 — RÉUSSI.** Preuve : ouverture, fermeture par Escape et retour
  du focus du menu mobile. Anomalie : aucune. Gravité : INFORMATION.
  Correction : aucune.
- **A11Y-07 — RÉUSSI POUR LE PROXY.** Preuve : 5/5 routes sans dépassement
  avec taille de texte doublée. Anomalie : zoom navigateur natif non couvert,
  P4-004. Gravité : MOYENNE. Correction : essai humain Edge/Firefox à 200 %.
- **A11Y-08 — RÉUSSI.** Preuve : arbre de contact conservé et régions
  principales présentes. Anomalie : aucune détectée. Gravité : INFORMATION.
  Correction : aucune.
- **A11Y-09 — NON VÉRIFIÉ.** Preuve : aucun lecteur d'écran réellement
  entendu. Anomalie : P4-003. Gravité : ÉLEVÉE avant production. Correction :
  session NVDA ou Narrateur requise.
- **A11Y-10 — RÉUSSI.** Preuve : Lighthouse accessibilité à 1,00 sur les
  quatre pages après correction. Anomalie : aucune. Gravité : INFORMATION.
  Correction : aucune.
- **A11Y-11 — RÉUSSI.** Preuve : préférence `prefers-reduced-motion`
  appliquée pendant les tests. Anomalie : aucune. Gravité : INFORMATION.
  Correction : aucune.
- **A11Y-12 — RÉUSSI.** Preuve : axe, responsive et bascule table/cartes.
  Anomalie : aucune région tabulaire inaccessible détectée. Gravité :
  INFORMATION. Correction : aucune.

## 6. Parcours résultats

- **E2E-RES-01 — RÉUSSI.** Preuve : formulaire vide refusé avec alerte.
  Anomalie : aucune. Gravité : INFORMATION. Correction : aucune.
- **E2E-RES-02 — RÉUSSI.** Preuve : aucune donnée en `localStorage` avant le
  récapitulatif et la confirmation. Anomalie : aucune. Gravité : INFORMATION.
  Correction : aucune.
- **E2E-RES-03 — RÉUSSI.** Preuve : retour « Modifier » et valeurs conservées.
  Anomalie : aucune. Gravité : INFORMATION. Correction : aucune.
- **E2E-RES-04 — RÉUSSI.** Preuve : ligne ajoutée seulement après confirmation.
  Anomalie : aucune. Gravité : INFORMATION. Correction : aucune.
- **E2E-RES-05 — RÉUSSI.** Preuve : lieu et commentaire corrigés ensemble.
  Anomalie : aucune. Gravité : INFORMATION. Correction : aucune.
- **E2E-RES-06 — RÉUSSI.** Preuve : identifiant avant/après strictement égal.
  Anomalie : aucune. Gravité : INFORMATION. Correction : aucune.
- **E2E-RES-07 — RÉUSSI.** Preuve : une seule entrée après correction.
  Anomalie : aucune. Gravité : INFORMATION. Correction : aucune.
- **E2E-RES-08 — RÉUSSI.** Preuve : deux événements d'historique et valeurs
  corrigées visibles. Anomalie : historique local non immuable. Gravité :
  ÉLEVÉE pour la production. Correction : persistance serveur ultérieure.
- **E2E-RES-09 — RÉUSSI.** Preuve : modification annulée absente du stockage.
  Anomalie : aucune. Gravité : INFORMATION. Correction : aucune.
- **E2E-RES-10 — RÉUSSI.** Preuve : réinitialisation restaure le nombre
  initial de lignes. Anomalie : aucune. Gravité : INFORMATION. Correction :
  aucune.

Captures associées :
`evidence/screenshots/workflows/result-create-form.png`,
`result-create-review.png`, `result-update-review.png` et
`result-history.png`.

## 7. Horaires

- **E2E-HOR-01 — RÉUSSI.** Preuve : état « Horaires à communiquer » en FR.
  Anomalie : horaires réels absents. Gravité : ÉLEVÉE avant publication.
  Correction : fournir les horaires officiels.
- **E2E-HOR-02 — RÉUSSI.** Preuve : état équivalent en EN. Anomalie :
  traduction officielle à valider. Gravité : MOYENNE. Correction : validation
  humaine du texte.
- **E2E-HOR-03 — RÉUSSI.** Preuve : fixture archivée absente du rendu.
  Anomalie : aucune. Gravité : INFORMATION. Correction : aucune.
- **E2E-HOR-04 — RÉUSSI.** Preuve : tests unitaires des récurrences,
  suspensions, dates et exceptions. Anomalie : aucune. Gravité : INFORMATION.
  Correction : aucune.

## 8. Documents

- **E2E-DOC-01 — RÉUSSI.** Preuve : PDF fictif public accepté et chemin
  stable préparé. Anomalie : aucun stockage réel. Gravité : ÉLEVÉE pour la
  production. Correction : choisir un stockage sécurisé.
- **E2E-DOC-02 — RÉUSSI.** Preuve : fichier texte refusé. Anomalie : contrôle
  uniquement client. Gravité : ÉLEVÉE pour la production. Correction :
  répéter type et taille côté serveur.
- **E2E-DOC-03 — RÉUSSI.** Preuve : absence de caractère public refusée.
  Anomalie : aucune dans le prototype. Gravité : INFORMATION. Correction :
  aucune.
- **E2E-DOC-04 — RÉUSSI.** Preuve : absence de confirmation sur les données
  personnelles refusée. Anomalie : aucune dans le prototype. Gravité :
  INFORMATION. Correction : contrôle humain et serveur ultérieur.
- **E2E-DOC-05 — RÉUSSI.** Preuve : association manquante signalée
  « résultat manquant ». Anomalie : aucune. Gravité : INFORMATION.
  Correction : aucune.
- **E2E-DOC-06 — RÉUSSI.** Preuve : aucune requête non-GET pendant la
  validation. Anomalie : fonction d'upload volontairement absente. Gravité :
  ÉLEVÉE pour la production. Correction : intégration autorisée ultérieure.

## 9. Contact

- **E2E-CON-01 — RÉUSSI.** Preuve : formulaire vide refusé avec alerte
  focalisée. Anomalie : aucune. Gravité : INFORMATION. Correction : aucune.
- **E2E-CON-02 — RÉUSSI.** Preuve : message fictif accepté après délai
  anti-spam. Anomalie : protection uniquement client. Gravité : ÉLEVÉE pour
  la production. Correction : validation et anti-spam côté serveur.
- **E2E-CON-03 — RÉUSSI.** Preuve : confirmation « Aucun message n'a été
  envoyé ». Anomalie : envoi volontairement absent. Gravité : INFORMATION.
  Correction : fournisseur à valider par le club.
- **E2E-CON-04 — RÉUSSI.** Preuve : aucune requête non-GET observée.
  Anomalie : aucune transmission disponible. Gravité : ÉLEVÉE pour la
  production. Correction : essai sécurisé après choix du fournisseur.

## 10. Sécurité de l'administration locale

- **SEC-01 — RÉUSSI COMME CONSTAT DE LIMITE.** Preuve : les trois routes
  répondent 200 sans authentification. Anomalie : P4-005. Gravité : ÉLEVÉE.
  Correction : ne pas exposer ces routes en production.
- **SEC-02 — RÉUSSI.** Preuve : bannière « prototype local » sur chaque route.
  Anomalie : aucune. Gravité : INFORMATION. Correction : aucune.
- **SEC-03 — RÉUSSI.** Preuve : `noindex,nofollow,noarchive`. Anomalie :
  aucune. Gravité : INFORMATION. Correction : aucune avant publication.
- **SEC-04 — RÉUSSI.** Preuve : aucun cookie, jeton de session ou
  `sessionStorage`. Anomalie : authentification absente. Gravité : ÉLEVÉE.
  Correction : service d'identité serveur à définir.
- **SEC-05 — RÉUSSI.** Preuve : seule la clé de démonstration apparaît dans
  `localStorage` après confirmation. Anomalie : stockage modifiable. Gravité :
  ÉLEVÉE. Correction : persistance contrôlée côté serveur.
- **SEC-06 — RÉUSSI.** Preuve : scan des sources/build sans secret détecté.
  Anomalie : aucune. Gravité : INFORMATION. Correction : maintenir le scan.
- **SEC-07 — RÉUSSI.** Preuve : scan sans fixture non étiquetée comme
  démonstration. Anomalie : aucune. Gravité : INFORMATION. Correction :
  aucune.
- **SEC-08 — RÉUSSI.** Preuve : formulaires sans action POST et aucune
  requête d'écriture observée. Anomalie : intégrations réelles absentes.
  Gravité : ÉLEVÉE pour la production. Correction : interfaces serveur
  sécurisées après validation.
- **SEC-09 — RÉUSSI.** Preuve : documentation et interface déclarent
  explicitement l'absence de sécurité. Anomalie : P4-005 reste ouverte.
  Gravité : ÉLEVÉE. Correction : bloquer toute exposition publique.

## 11. Lighthouse

Les quatre pages `/fr/`, `/en/`, `/fr/resultats/` et `/fr/contact/` obtiennent
1,00 en accessibilité et bonnes pratiques après correction. La performance est
comprise entre 0,95 et 1,00. Le score SEO reste à 0,66 en raison du `noindex`
volontaire et de l'origine locale (P4-007).

- **Résultat :** RÉUSSI dans le périmètre local.
- **Preuve :** `evidence/lighthouse/summary.json` et rapports HTML.
- **Anomalie :** aucune anomalie de performance/accessibilité ; SEO local
  volontairement limité.
- **Gravité :** INFORMATION.
- **Correction proposée :** canonical, sitemap et indexation uniquement dans
  une future phase de préparation à la production.

## 12. Contrôles de qualité finaux

- `npm run check` : 45 fichiers, aucune erreur, aucun avertissement ni
  indication ;
- `npm test` : 26/26 tests unitaires réussis sur 7 fichiers ;
- `npm run build` : 52 pages générées ;
- `npm run test:site` : 52 pages et 1 187 liens contrôlés ;
- `npm run test:e2e` : 143 tests réussis ; 184 scénarios mono-navigateur
  explicitement ignorés dans les autres moteurs ;
- `npm run test:lighthouse` : seuils atteints sur quatre pages ;
- scan local : aucun secret ni fixture réelle non identifiée ;
- `npm audit --audit-level=high` : aucune vulnérabilité de niveau élevé.

## 13. Conclusion

**PHASE 4 PRÊTE POUR VALIDATION HUMAINE DU CLUB.**

Les contrôles automatisables et les corrections locales sont terminés. La
validation humaine doit encore couvrir le lecteur d'écran réel, le zoom natif,
les textes/traductions et les choix de services. Cette conclusion n'autorise
ni mise en production, ni déploiement, ni création de compte externe.
