# Rapport de préparation et de déploiement du POC

**Date :** 22 novembre 2026  
**Statut :** PRÉPARÉ LOCALEMENT — NON PUBLIÉ  
**Production officielle :** NON

## URL temporaire

**URL réelle : NON DISPONIBLE.**

Le dépôt ne possède aucun commit ni remote GitHub et le propriétaire n'a pas
encore autorisé sa publication. La forme attendue est :

`https://<propriétaire>.github.io/<dépôt>/`

L'URL réelle sera inscrite ici uniquement après une instruction séparée
autorisant la création du dépôt distant, sa visibilité et le déclenchement
manuel du workflow.

## Artefact préparé

La commande `npm run build:poc` :

1. active le mode de démonstration publique ;
2. configure `site` et `base` à partir de `POC_SITE_URL` et
   `POC_BASE_PATH` ;
3. conserve `noindex,nofollow` ;
4. compile le site statique ;
5. retire `dist/admin/` et `dist/documents/` ;
6. retire les ressources JavaScript orphelines des pages administratives.

Le contrôle bloquant confirme :

- 49 pages HTML dans l'artefact ;
- 48 pages localisées FR/EN plus la redirection racine ;
- 1 167 liens internes valides ;
- aucune route ou lien `/admin/*` ;
- aucun document public ;
- aucun `CNAME` ;
- aucune URL interne sortant du préfixe configuré ;
- bannière POC et `noindex,nofollow` présents.

## Tests exécutés

- `npm run check` : aucune erreur, aucun avertissement, aucune indication ;
- `npm test` : 26 tests réussis sur 7 fichiers ;
- `npm run build` : 52 pages, administration locale comprise ;
- `npm run test:site` : 52 pages et 1 186 liens internes contrôlés ;
- `npm run build:poc` : artefact public réduit à 49 pages ;
- `npm run test:site:poc` : 49 pages et 1 167 liens contrôlés ;
- `npm run test:poc` : 34 tests Playwright réussis ;
- axe : aucune violation sérieuse ou critique sur les pages prioritaires ;
- responsive : 320, 390, 834 et 1440 px sans débordement horizontal ;
- contact : validation locale sans requête non-GET ;
- administration et documents : réponses 404 dans l'aperçu POC ;
- sécurité : 197 fichiers texte analysés, aucun secret ou contenu sportif non
  étiqueté comme démonstration détecté ;
- `npm audit --audit-level=high` : aucune vulnérabilité connue.

## Captures locales

Les preuves se trouvent dans :

- `docs/POC/evidence/screenshots/small-mobile/` ;
- `docs/POC/evidence/screenshots/mobile/` ;
- `docs/POC/evidence/screenshots/tablet/` ;
- `docs/POC/evidence/screenshots/desktop/`.

Vingt-huit captures couvrent accueil FR/EN, Kyorugi, Poomsae, résultats,
horaires et contact aux quatre largeurs.

## Workflow préparé

`.github/workflows/poc-pages.yml` :

- se déclenche uniquement manuellement avec `workflow_dispatch` ;
- utilise Node.js 22.23.4, npm 11.6.2 et installe explicitement les dépendances
  optionnelles Linux ;
- exécute audit, tests, build POC et contrôles ;
- dérive l'origine et le préfixe depuis le dépôt GitHub ;
- charge exclusivement `dist/` comme artefact Pages ;
- ne contient aucun domaine personnalisé ni `CNAME`.

Le workflow n'a pas été exécuté.

## Limites connues

- aucune URL distante n'a été testée ;
- aucune vérification post-publication ne peut être déclarée réussie ;
- l'historique Git réel devra être audité après le premier commit ;
- GitHub Pages ne protège pas l'accès au POC ;
- `noindex` ne garantit pas l'absence d'indexation ;
- les contenus sportifs sont fictifs ;
- les horaires et informations institutionnelles sont en attente de
  validation ;
- les mentions légales et la politique de confidentialité restent
  provisoires ;
- le contact n'envoie rien ;
- aucun CMS, compte administrateur, stockage ou document n'est connecté ;
- les canonical utilisent une origine fictive pendant le test local.

## Après autorisation

Une fois l'autorisation explicite reçue :

1. créer et auditer le premier commit ;
2. configurer le remote validé ;
3. confirmer la visibilité et les conditions GitHub Pages ;
4. pousser les fichiers approuvés ;
5. déclencher manuellement le workflow ;
6. ouvrir l'URL réelle ;
7. refaire navigation, ressources, responsive, contact et absences
   `/admin/*`/`documents/*` ;
8. ajouter ici l'URL, l'exécution Actions et les captures distantes.

## Conclusion

Le POC est prêt techniquement pour une décision de publication, mais il n'est
pas publié. Aucun dépôt distant, changement de visibilité, GitHub Pages,
domaine, DNS, abonnement ou service externe n'a été créé ou activé.
