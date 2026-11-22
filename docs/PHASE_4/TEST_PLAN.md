# Plan de tests — Phase 4

**Date :** 22 novembre 2026  
**Cible :** build Astro local servi par `astro preview`  
**Périmètre :** tests et validation, sans déploiement ni service externe

## 1. Règles de compte rendu

Chaque test reçoit un identifiant et les cinq informations suivantes :

- **Résultat** : `RÉUSSI`, `ÉCHEC`, `NON VÉRIFIÉ` ou `BLOQUÉ` ;
- **Preuve** : commande, rapport JSON/HTML, capture ou constat manuel ;
- **Anomalie** : description factuelle, ou « aucune » ;
- **Gravité** : `CRITIQUE`, `ÉLEVÉE`, `MOYENNE`, `FAIBLE` ou
  `INFORMATION` ;
- **Correction proposée** : action précise, ou « aucune ».

Une correction locale est retestée. Un test automatisé ne remplace pas une
validation humaine de la lisibilité, des traductions ou du lecteur d'écran.

## 2. Environnement

- Windows 10 ;
- Node.js `22.23.4` ;
- npm `11.6.2` ;
- Astro en sortie statique ;
- Playwright local, sans compte ni service distant ;
- axe-core via Playwright ;
- Lighthouse local sur le serveur de prévisualisation.

Préconditions :

1. `npm run check` ;
2. `npm test` ;
3. `npm run build` ;
4. démarrage automatique de `npm run preview` sur `127.0.0.1` ;
5. données de démonstration réinitialisées avant chaque scénario admin.

## 3. Matrice visuelle

Largeurs obligatoires :

- `320 × 900` — petit mobile ;
- `390 × 900` — mobile ;
- `834 × 1112` — tablette ;
- `1440 × 1000` — ordinateur.

Pages publiques représentatives :

- accueil FR et EN ;
- Kyorugi FR ;
- Poomsae EN ;
- athlètes et profil ;
- compétitions et détail ;
- résultats ;
- palmarès ;
- horaires sans données réelles ;
- contact en état normal et erreur ;
- médias.

Administration locale :

- tableau de bord ;
- liste des résultats ;
- formulaire de résultat ;
- récapitulatif ;
- fiche et historique ;
- validation documentaire.

### Tests VIS

- **VIS-01** : captures stables aux quatre largeurs ;
- **VIS-02** : cohérence couleurs, cartes, titres et espacements ;
- **VIS-03** : contenu fictif clairement identifié ;
- **VIS-04** : tableaux remplacés par cartes sur petit écran ;
- **VIS-05** : aucune donnée ou photo réelle inventée ;
- **VIS-06** : aucun débordement horizontal du document ;
- **VIS-07** : menu et actions restent visibles sans chevauchement.

## 4. Navigation et bilinguisme

### Tests NAV

- **NAV-01** : `/` oriente vers `/fr/` ;
- **NAV-02** : navigation principale FR ;
- **NAV-03** : navigation principale EN ;
- **NAV-04** : changement FR/EN des pages statiques ;
- **NAV-05** : changement FR/EN d'un profil d'athlète ;
- **NAV-06** : changement FR/EN d'une compétition avec slug localisé ;
- **NAV-07** : menu mobile, `aria-expanded`, Escape et restitution du focus ;
- **NAV-08** : lien d'évitement vers le contenu principal ;
- **NAV-09** : canonical, hreflang et langue du document ;
- **NAV-10** : page inexistante non confondue avec un contenu valide.

## 5. Accessibilité

Objectif automatisé : WCAG 2.2 A/AA, complété par des contrôles manuels.

### Tests A11Y

- **A11Y-01** : axe sur les pages publiques prioritaires ;
- **A11Y-02** : axe sur les trois écrans administratifs ;
- **A11Y-03** : ordre de tabulation et focus visible ;
- **A11Y-04** : nom accessible des liens, boutons et champs ;
- **A11Y-05** : annonce et focus des erreurs/succès du contact ;
- **A11Y-06** : navigation clavier du menu mobile ;
- **A11Y-07** : reflow simulé à 200 % sans perte de contenu ;
- **A11Y-08** : arbre d'accessibilité des pages critiques ;
- **A11Y-09** : lecteur d'écran réel ;
- **A11Y-10** : Lighthouse accessibilité ;
- **A11Y-11** : réduction des animations ;
- **A11Y-12** : régions de tableaux défilables accessibles.

`A11Y-09` ne sera marqué `RÉUSSI` qu'après un essai réellement entendu avec
NVDA, JAWS, Narrateur ou VoiceOver. Un arbre d'accessibilité Playwright n'est
pas présenté comme un lecteur d'écran.

## 6. Parcours E2E

### Résultats

- **E2E-RES-01** : création refusée si les champs sont invalides ;
- **E2E-RES-02** : récapitulatif obligatoire avant enregistrement ;
- **E2E-RES-03** : retour au formulaire sans perte des valeurs ;
- **E2E-RES-04** : confirmation et apparition dans la liste ;
- **E2E-RES-05** : modification de plusieurs champs ;
- **E2E-RES-06** : même identifiant après modification ;
- **E2E-RES-07** : aucune ligne en double ;
- **E2E-RES-08** : historique avec anciennes/nouvelles valeurs ;
- **E2E-RES-09** : annulation d'une modification ;
- **E2E-RES-10** : réinitialisation de la démonstration.

### Horaires

- **E2E-HOR-01** : état vide FR ;
- **E2E-HOR-02** : état vide EN ;
- **E2E-HOR-03** : la fixture archivée n'est pas affichée ;
- **E2E-HOR-04** : les règles récurrentes et exceptions restent couvertes par
  les tests unitaires.

### Documents

- **E2E-DOC-01** : fichier PDF public valide ;
- **E2E-DOC-02** : type interdit ;
- **E2E-DOC-03** : absence de confirmation de caractère public ;
- **E2E-DOC-04** : absence de confirmation de données personnelles ;
- **E2E-DOC-05** : résultat associé obligatoire ;
- **E2E-DOC-06** : aucun upload ou appel réseau.

### Contact

- **E2E-CON-01** : erreurs compréhensibles ;
- **E2E-CON-02** : message valide après délai anti-spam ;
- **E2E-CON-03** : confirmation indiquant qu'aucun envoi n'a eu lieu ;
- **E2E-CON-04** : aucune requête POST ou transmission externe.

## 7. Sécurité des interfaces administratives

- **SEC-01** : `/admin/*` est accessible sans authentification ;
- **SEC-02** : bannière « prototype local » visible ;
- **SEC-03** : `noindex,nofollow,noarchive` présent ;
- **SEC-04** : aucun cookie ou jeton de session créé ;
- **SEC-05** : stockage limité à `localStorage` pour les résultats ;
- **SEC-06** : aucun secret ou jeton dans les sources et le build ;
- **SEC-07** : aucun document privé ou donnée sportive réelle ;
- **SEC-08** : aucun POST, upload ou écriture CMS ;
- **SEC-09** : l'absence d'authentification est classée comme blocage de
  production, pas comme administration sécurisée.

## 8. Lighthouse

Pages :

- `/fr/` ;
- `/en/` ;
- `/fr/resultats/` ;
- `/fr/contact/`.

Catégories : performance, accessibilité, bonnes pratiques et SEO. Les rapports
HTML et JSON sont conservés. Les scores SEO liés au `noindex` et aux URL
locales sont interprétés comme limites de l'environnement, pas corrigés par un
déploiement interdit.

## 9. Validation du club

Le club devra examiner :

- navigation et priorité du Kyorugi ;
- présentation complète du Poomsae ;
- design aux quatre largeurs ;
- textes FR/EN ;
- état vide des horaires ;
- résultat, récapitulatif, modification et historique ;
- règles du palmarès ;
- formulaire de contact sans envoi ;
- limites CMS et administration non sécurisée ;
- liste des contenus, coordonnées, médias et décisions encore manquants.

La validation de Phase 4 ne vaut pas autorisation de mise en production.
