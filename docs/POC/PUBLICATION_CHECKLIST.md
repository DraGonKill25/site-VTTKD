# Checklist de publication du POC

**État actuel :** publication non autorisée  
**Usage :** contrôle obligatoire avant toute création de remote, changement de
visibilité ou exécution du workflow GitHub Pages

## Autorisation du propriétaire

- [ ] Le propriétaire du dépôt autorise explicitement la création du dépôt
  GitHub distant.
- [ ] Le propriétaire confirme le nom du compte ou de l'organisation et le
  nom du dépôt.
- [ ] Le propriétaire choisit et accepte la visibilité du dépôt.
- [ ] Le propriétaire autorise explicitement la publication GitHub Pages.
- [ ] Le propriétaire confirme que le logo et les liens Instagram/YouTube
  peuvent être rendus publics dans ce POC.
- [ ] La décision est datée et conservée dans un canal traçable.

Une validation de maquette ou de Phase 4 ne vaut pas autorisation de rendre le
dépôt ou le site public.

## Conditions GitHub Pages

- [ ] Les conditions GitHub applicables au compte ont été vérifiées au moment
  de la publication.
- [ ] Si le dépôt doit rester privé, l'offre du compte permet GitHub Pages et
  le propriétaire comprend que le site Pages peut néanmoins être accessible
  publiquement.
- [ ] GitHub Actions est autorisé pour le dépôt.
- [ ] La source Pages est configurée sur **GitHub Actions**, jamais sur un
  dossier contenant les routes administratives.
- [ ] Aucune dépense, offre payante ou création de compte supplémentaire n'est
  nécessaire.

GitHub Pages ne fournit pas ici de contrôle d'accès. `noindex` n'est pas une
protection : toute personne connaissant l'URL peut consulter le POC.

## Audit du dépôt réel

À effectuer après le premier commit mais avant le premier push public :

- [ ] `git status` ne montre aucun fichier inattendu.
- [ ] Tout l'historique Git a été contrôlé, pas seulement le dernier état.
- [ ] Aucun `.env`, jeton, clé privée, adresse personnelle ou document privé
  n'est suivi.
- [ ] `node scripts/phase4-security-check.mjs` réussit.
- [ ] `npm audit --audit-level=high` ne signale aucune vulnérabilité élevée.
- [ ] Les contenus sportifs restent fictifs et marqués comme démonstration.
- [ ] Aucun fichier n'est présent sous `public/documents/` dans l'artefact.
- [ ] Aucune photographie d'athlète ou de mineur n'est ajoutée.

## Contrôle fonctionnel local

- [ ] `npm ci` réussit dans un environnement propre.
- [ ] `npm run check` réussit sans erreur.
- [ ] `npm test` réussit.
- [ ] `npm run build` et `npm run test:site` réussissent.
- [ ] `npm run build:poc` réussit avec le `POC_SITE_URL` et le
  `POC_BASE_PATH` définitifs.
- [ ] `npm run test:site:poc` contrôle les 49 pages publiques.
- [ ] `npm run test:poc` réussit sur Chromium.
- [ ] Les captures 320, 390, 834 et 1440 px ont été relues.
- [ ] La navigation FR/EN reste sous le préfixe du dépôt.
- [ ] Le contact indique clairement qu'aucun message n'est envoyé.

## Contrôle de l'artefact

- [ ] `dist/admin/` n'existe pas.
- [ ] `/admin/`, `/admin/results/` et `/admin/documents/` répondent 404.
- [ ] `dist/documents/` n'existe pas.
- [ ] Aucun lien public ne pointe vers `/admin/*`.
- [ ] Aucun `CNAME` n'existe.
- [ ] Toutes les ressources `_astro`, images, CSS et scripts utilisent le bon
  préfixe.
- [ ] Toutes les pages publiques contiennent `noindex,nofollow`.
- [ ] La bannière « POC — Version de démonstration non officielle » est
  visible.

## Déclenchement manuel

Le workflow `.github/workflows/poc-pages.yml` utilise uniquement
`workflow_dispatch`. Après autorisation :

1. créer le dépôt et pousser la version auditée ;
2. vérifier que Pages utilise GitHub Actions ;
3. ouvrir manuellement **POC GitHub Pages** ;
4. contrôler les paramètres affichés ;
5. déclencher une seule exécution ;
6. conserver l'URL produite et le lien vers l'exécution.

## Contrôle après publication

- [ ] L'URL réelle est inscrite dans `DEPLOYMENT_REPORT.md`.
- [ ] Les pages `/fr/` et `/en/` s'ouvrent.
- [ ] Le changement de langue fonctionne.
- [ ] Les ressources CSS, JavaScript et logo chargent sans erreur.
- [ ] Les quatre largeurs sont revérifiées sur l'URL réelle.
- [ ] Les routes `/admin/*` et `/documents/*` répondent 404.
- [ ] Le code source confirme `noindex,nofollow`.
- [ ] Le formulaire de contact ne transmet aucune requête.
- [ ] Des captures distantes sont conservées.

## Point d'arrêt

Tant que toutes les cases d'autorisation et d'audit ne sont pas cochées :

- ne pas créer de remote ;
- ne pas rendre le dépôt public ;
- ne pas pousser vers GitHub ;
- ne pas modifier les réglages Pages ;
- ne pas déclencher le workflow.
