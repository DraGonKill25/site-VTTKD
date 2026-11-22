# Rapport final de revue — Phase 2

**Date :** 7 novembre 2026  
**Périmètre :** documents, maquettes et prototype autonomes  
**Hors périmètre :** Phase 3, CMS réel, authentification, API, hébergement, DNS

## 1. Résumé de la revue

La Phase 2 est désormais complète pour une validation humaine. Les documents
existants ont été alignés sur 5 à 6 comptes nominatifs, quatre rôles, la
priorité du Kyorugi, la confirmation obligatoire des résultats et l’exclusion
des brouillons, annulations et archives du palmarès public.

Le prototype autonome illustre les écrans publics, les parcours
d’administration et le cycle complet d’un résultat fictif : création,
récapitulatif, enregistrement simulé, modification, nouvelle confirmation,
liste mise à jour, palmarès recalculé et historique.

Aucune information réelle du club n’a été inventée. Les chiffres, noms et
justificatifs restent explicitement fictifs. Le domaine
`vanthuynetkd.com` n’est pas acquis et n’a pas été configuré.

## 2. Statut des points A à H

| Point | Sujet | Statut |
|---|---|---|
| A | Rôles et permissions pour 5 à 6 comptes | À VALIDER PAR LE CLUB |
| B | Saisie, confirmation et modification des résultats | À VALIDER PAR LE CLUB |
| C | Règles de calcul du palmarès | À VALIDER PAR LE CLUB |
| D | Identité visuelle et design system | À VALIDER PAR LE CLUB |
| E | Contact et protection des données | À VALIDER PAR LE CLUB |
| F | Vérification du prototype | VALIDÉ pour l’échantillon testé ; NON VÉRIFIÉ pour lecteur d’écran, zoom 200 % multi-moteurs et audit axe |
| G | Décisions à valider par le club | À VALIDER PAR LE CLUB |
| H | Cohérence des livrables | VALIDÉ après corrections de revue |

Aucun de ces points n’est une validation du club. `VALIDÉ` signifie seulement
que le livrable de Phase 2 a été produit et contrôlé dans la limite des tests
réalisés.

## 3. Fichiers créés

- [`docs/PHASE_2/README.md`](README.md)
- [`docs/PHASE_2/ROLE_PERMISSIONS.md`](ROLE_PERMISSIONS.md)
- [`docs/PHASE_2/SPORT_RESULTS_WORKFLOW.md`](SPORT_RESULTS_WORKFLOW.md)
- [`docs/PHASE_2/PALMARES_RULES.md`](PALMARES_RULES.md)
- [`docs/PHASE_2/DESIGN_DECISIONS.md`](DESIGN_DECISIONS.md)
- [`docs/PHASE_2/CONTACT_PRIVACY.md`](CONTACT_PRIVACY.md)
- [`docs/PHASE_2/TEST_REPORT.md`](TEST_REPORT.md)
- [`docs/PHASE_2/DECISIONS_TO_VALIDATE.md`](DECISIONS_TO_VALIDATE.md)
- [`docs/PHASE_2/FINAL_REVIEW.md`](FINAL_REVIEW.md)
- `design/phase-2/snapshots/` et son index

## 4. Fichiers modifiés

- `docs/PHASE_1_AUDIT.md`
- `docs/ARCHITECTURE.md`
- `docs/UX_UI_DESIGN.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/BRAND_IDENTITY.md`
- `design/phase-2/README.md`
- `design/phase-2/REVIEW_CHECKLIST.md`
- `design/phase-2/prototype/index.html`
- `design/phase-2/prototype/prototype.js`
- `design/phase-2/prototype/prototype.css`
- `design/phase-2/prototype/demo-content.js`

Les captures initiales `snapshot-home-desktop.png`,
`snapshot-results-mobile.png` et `snapshot-admin-tablet.png` sont conservées.

## 5. Corrections apportées

- Hypothèse d’équipe ramenée de 8–10 à 5–6 comptes nominatifs.
- Rôles unifiés : Administrateur principal, sportif, éditorial, Contributeur.
- Priorité éditoriale du Kyorugi, Poomsae conservé comme discipline complète.
- Confirmation récapitulative distincte d’une revue Git/mainteneur.
- Palmarès public limité au statut `published`.
- Coûts CMS recalculés : 38 €/mois pour 5 sièges ou 44 €/mois pour 6 avec
  rôles avancés Decap Turbo, aux tarifs observés le 7 novembre 2026.
- Identité visuelle séparée en confirmé / provisoire / à valider.
- Formulaire de contact sans case de consentement automatique.
- Prototype enrichi : pages Kyorugi/Poomsae, listes admin, création,
  confirmation, modification, historique, recalcul local du palmarès.
- Libellé d’accueil corrigé : plus de « poids éditorial équivalent ».
- Numérotation des sections de `BRAND_IDENTITY.md` corrigée.

## 6. Tests réalisés et résultats

Réussis :

- `node --check` sur `prototype.js` et `demo-content.js` ;
- unicité des identifiants fictifs ;
- 3 résultats publiés, 2 médailles, 1 or, 1 argent, 0 bronze ;
- 2 participations Kyorugi et 1 Poomsae ;
- 1 résultat d’équipe compté une fois ;
- 3 compétitions distinctes ;
- exclusion des 3 résultats brouillon, archivé et annulé ;
- diagnostics IDE sans erreur au moment de la revue ;
- captures représentatives à 1440, 834, 390 et 320 px.

Non vérifiés :

- lecteur d’écran réel ;
- reconnaissance vocale ;
- audit automatisé axe/Lighthouse ;
- zoom navigateur 200 % dans plusieurs moteurs ;
- matrice exhaustive de tous les états de tous les écrans ;
- CMS, OAuth, publication Git et formulaire réel.

Détail : [`TEST_REPORT.md`](TEST_REPORT.md).

## 7. Captures d’écran disponibles

Dans `design/phase-2/snapshots/` :

- accueil, Kyorugi, Poomsae, résultats, palmarès, contact en erreur ;
- permissions, liste, création, confirmation, confirmation de modification,
  historique.

Les captures montrent un prototype de revue, pas un site publié.

## 8. Limites du CMS envisagé

**Decap Turbo + rôles avancés**

- Comptes individuels sans GitHub obligatoire pour les éditeurs.
- Permissions réelles : `edit`, `view` ou `none` par collection.
- Pas de séparation native fine entre modifier, publier et supprimer.
- MFA organisationnelle obligatoire non démontrée dans la documentation
  consultée.
- Coût indicatif : 38 €/mois pour 5 sièges, 44 €/mois pour 6, hors sièges
  GitHub Team éventuels.

**Pages CMS hébergé**

- Collaborateurs invités par courriel, limités à un dépôt.
- Opérations `create` / `rename` / `delete` configurables par collection, pas
  par rôle métier individualisé.
- Pas de garantie Sport / Éditorial / Contributeur.
- Sauvegarde directe selon la branche configurée.
- MFA organisationnelle non documentée.
- Offre observée comme gratuite, à revérifier.

Aucun des deux scénarios n’est retenu définitivement. Le backend GitHub
standard de Decap n’est pas recommandé par défaut.

## 9. Problèmes encore ouverts

- Logo uniquement disponible en JPEG 160 × 160, sans original vectoriel.
- Nom officiel, mentions ELITE et GENTILLY non confirmés.
- Palette, accent et typographies provisoires.
- Aucun texte, résultat, athlète, coordonnée ou média réel fourni.
- Navigation admin en petit écran : défilement interne horizontal, sans
  débordement de page.
- Champ date natif : affichage dépendant de la langue du système.
- Historique de production : Git et journal CMS non encore branchés.
- Fournisseur d’envoi, durées RGPD et mentions légales à fournir par le club.
- Scénario CMS non choisi.

## 10. Décisions restant à prendre par le club

Le détail figure dans [`DECISIONS_TO_VALIDATE.md`](DECISIONS_TO_VALIDATE.md) :

1. identité visuelle et ressources officielles ;
2. navigation et priorité du Kyorugi ;
3. organisation des 5 à 6 administrateurs ;
4. CMS payant avec rôles ou compromis gratuit ;
5. confirmation des résultats sans double validation systématique ;
6. règles du palmarès ;
7. destinataires et conservation du formulaire ;
8. politique FR/EN ;
9. autorisation explicite de passer en Phase 3.

## 11. Recommandation finale

### OPTION 1 — PHASE 2 PRÊTE POUR VALIDATION HUMAINE

Tous les points A à H ont été traités. Les corrections nécessaires identifiées
pendant la revue ont été effectuées. Les tests automatiques et l’échantillon
visuel ont été réalisés. Les décisions restantes sont présentées au club, sans
être présumées validées.

Le prototype est prêt à être examiné. La Phase 3 — développement Astro, CMS,
authentification, hébergement ou domaine — ne doit commencer qu’après une
autorisation explicite du club.
