# Prototype UX/UI — Phase 2

## Objet

Ce dossier contient une maquette autonome du futur site VAN THUYNE TAEKWONDO /
ELITE. Il sert à valider l’architecture de l’information, le design system, le
responsive, le bilinguisme et les parcours d’administration.

Ce n’est pas le futur site :

- aucun framework ;
- aucune dépendance ;
- aucun build ;
- aucun CMS ;
- aucune authentification ;
- aucune API ;
- aucune transmission de formulaire ;
- aucun déploiement.

Le code du prototype est jetable et ne doit pas être copié automatiquement dans
la Phase 3.

## Ouvrir la maquette

Ouvrir directement :

`design/phase-2/prototype/index.html`

Le prototype fonctionne avec une URL `file://` et ne requiert pas de serveur.

## Contrôles de revue

La barre supérieure permet de choisir :

- l’écran ;
- le français ou l’anglais ;
- une largeur fluide, 1440, 834, 390 ou 320 pixels ;
- un état normal, vide, traduction absente, erreur ou succès ;
- l’affichage d’annotations d’accessibilité.

Seuls les états pertinents pour l’écran choisi sont activés. Par exemple,
Contact propose erreur/succès, les listes proposent vide/traduction
absente/erreur, et l’éditeur d’administration propose son état d’erreur.

## Écrans publics

- Accueil.
- Club et encadrement.
- Disciplines Combat/Poomsae.
- Pages distinctes Kyorugi et Poomsae.
- Athlètes.
- Profil d’athlète.
- Résultats.
- Palmarès.
- Compétition.
- Calendrier.
- Actualités.
- Photos et vidéos.
- Contact.
- États utilitaires.

## Écrans d’administration

- Connexion.
- Tableau de bord.
- Gestion des contenus, athlètes et compétitions.
- Liste et fiche des résultats.
- Création et modification d’un résultat.
- Récapitulatif obligatoire avant chaque enregistrement.
- Confirmation, annulation et historique.
- Champs français et anglais.
- Validation, erreurs et succès.
- Deux scénarios de permissions pour 5 à 6 comptes.

Les enregistrements sont simulés en mémoire et disparaissent au rechargement.
Ces écrans décrivent un besoin. Ils ne promettent pas que Decap Turbo ou Pages
CMS aura exactement cette apparence ou toutes les permissions affichées.

## Données

Toutes les données sont déclarées dans :

`design/phase-2/prototype/demo-content.js`

Règles :

- identifiants `demo-*` ;
- noms explicitement fictifs ;
- résultats et statistiques marqués « Exemple fictif » ;
- statuts publié, brouillon, archivé et annulé pour vérifier le palmarès ;
- équipe Poomsae comptée comme un résultat sportif ;
- aucune photographie ;
- aucun contenu Instagram ;
- aucune miniature YouTube ;
- aucun nom réel.

## Logo

Le fichier raster `logo.jpg` est affiché uniquement en petit dans l’en-tête et
l’administration. Il n’est ni modifié, ni redessiné, ni utilisé comme grande
image.

## Fichiers

- `prototype/index.html` : structure de l’outil de revue.
- `prototype/prototype.css` : tokens et styles responsive.
- `prototype/demo-content.js` : fixtures fictives.
- `prototype/prototype.js` : rendu et interactions locales.
- `REVIEW_CHECKLIST.md` : contrôles avant validation.
- `snapshot-home-desktop.png` : contrôle visuel de l’accueil à 1440 px.
- `snapshot-results-mobile.png` : contrôle visuel des résultats à 390 px.
- `snapshot-admin-tablet.png` : contrôle visuel de l’éditeur à 834 px.

Captures complémentaires dans `snapshots/` :

- accueil FR à 1440 px ;
- Kyorugi FR à 1440 px ;
- Poomsae EN à 834 px ;
- résultats FR à 390 px ;
- palmarès FR à 834 px ;
- contact EN en erreur à 320 px ;
- permissions FR à 834 px ;
- liste des résultats FR à 834 px ;
- création FR à 390 px ;
- confirmation EN à 1440 px ;
- confirmation de modification FR à 834 px ;
- historique EN à 320 px.

## Parcours de résultat

1. Ouvrir « Admin — création résultat ».
2. Modifier les champs puis choisir « Vérifier les informations ».
3. Examiner le récapitulatif.
4. Revenir au formulaire ou confirmer l’enregistrement simulé.
5. Depuis la liste, ouvrir un résultat existant et le modifier.
6. Examiner la comparaison avant/après.
7. Confirmer, puis consulter la liste, le palmarès et l’historique.

Le hash suit la forme :

`#écran/langue/état/largeur`

Exemple :

`#admin-result-create/fr/default/mobile`

## Références

- `docs/UX_UI_DESIGN.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/BRAND_IDENTITY.md`
- `docs/ARCHITECTURE.md`
- `docs/PHASE_2/ROLE_PERMISSIONS.md`
- `docs/PHASE_2/SPORT_RESULTS_WORKFLOW.md`
- `docs/PHASE_2/PALMARES_RULES.md`
- `docs/PHASE_2/TEST_REPORT.md`
- `docs/PHASE_2/DECISIONS_TO_VALIDATE.md`
- `docs/PHASE_2/FINAL_REVIEW.md`

## Point d’arrêt

Après la revue, consigner les décisions dans la checklist. Ne pas initialiser
Astro, le CMS, l’hébergement ou le domaine avant validation explicite de la
Phase 2.
