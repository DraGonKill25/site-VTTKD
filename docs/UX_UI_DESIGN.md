# UX/UI — VAN THUYNE TAEKWONDO / ELITE

**Phase :** 2 — maquettes et validation  
**Statut :** proposition à valider avant développement  
**Prototype associé :** `design/phase-2/prototype/index.html`

## 1. Objet et limites

Ce document définit l’expérience du futur site public et les parcours attendus
pour l’administration. Il ne constitue ni une implémentation Astro, ni un CMS
opérationnel.

Les maquettes utilisent exclusivement :

- des noms commençant par « Démo » ou « Exemple » ;
- des identifiants `demo-*` ;
- des résultats et statistiques explicitement marqués fictifs ;
- des formes géométriques à la place de portraits ;
- le logo raster fourni uniquement en petite taille.

Aucun contenu social, résultat réel, photographie d’athlète ou donnée de mineur
n’est repris.

## 2. Objectifs d’expérience

### Visiteurs

- Comprendre rapidement l’identité et l’ambition sportive du club.
- Accéder en priorité aux résultats, compétitions et prochaines échéances.
- Mettre le Kyorugi (Combat) au premier plan tout en donnant au Poomsae une
  présentation complète et identifiable.
- Découvrir les athlètes et l’encadrement dont la publication est autorisée.
- Naviguer en français ou en anglais sans perdre le contexte.
- Contacter le club avec un minimum de données.

### Responsables du club

- Trouver rapidement la collection à modifier.
- Distinguer faits communs et textes FR/EN.
- Comprendre l’état d’un contenu avant publication.
- Prévisualiser les deux langues et plusieurs formats d’écran.
- Identifier les erreurs, droits médias manquants et conflits.
- Soumettre une modification sans risque de publication accidentelle.

## 3. Publics prioritaires

### Visiteur intéressé par le club

Cherche les disciplines, l’encadrement, les événements et le contact. Il peut
arriver sur mobile depuis un moteur de recherche ou un réseau social.

### Suiveur sportif

Cherche une compétition, un résultat, un podium ou le parcours public d’un
athlète. Il attend des filtres rapides et des données datées.

### Membre ou famille

Cherche une information à venir, une actualité, une galerie autorisée ou un
moyen de joindre le club. Aucune information privée ne doit être nécessaire.

### Visiteur anglophone

Arrive potentiellement sur une page profonde. Il doit accéder à l’équivalent
anglais validé, sans traduction automatique cachée.

### Équipe éditoriale

Cinq à six personnes au maximum, avec des niveaux techniques et des domaines de
responsabilité différents.

## 4. Architecture de l’information

### Navigation française

- Accueil
- Le club
  - Présentation
  - Équipe encadrante
- Disciplines
  - Kyorugi (Combat)
  - Poomsae
- Athlètes
- Compétitions
- Résultats
- Palmarès
- Calendrier
- Actualités
- Médias
  - Photos
  - Vidéos
- Contact

Navigation secondaire :

- Instagram
- YouTube
- Mentions légales
- Politique de confidentialité
- English

### English navigation

- Home
- Club
  - About
  - Coaching team
- Disciplines
  - Kyorugi (Combat)
  - Poomsae
- Athletes
- Competitions
- Results
- Honours
- Calendar
- News
- Media
  - Photos
  - Videos
- Contact

Secondary navigation:

- Instagram
- YouTube
- Legal notice
- Privacy policy
- Français

### Routes proposées

```text
/fr/
/fr/club/
/fr/club/encadrement/
/fr/disciplines/
/fr/disciplines/combat/
/fr/disciplines/poomsae/
/fr/athletes/
/fr/athletes/[slug]/
/fr/competitions/
/fr/competitions/[slug]/
/fr/resultats/
/fr/palmares/
/fr/calendrier/
/fr/evenements/[slug]/
/fr/actualites/
/fr/actualites/[slug]/
/fr/medias/photos/
/fr/medias/videos/
/fr/contact/
/fr/mentions-legales/
/fr/politique-confidentialite/

/en/
/en/club/
/en/club/coaching-team/
/en/disciplines/
/en/disciplines/combat/
/en/disciplines/poomsae/
/en/athletes/
/en/athletes/[slug]/
/en/competitions/
/en/competitions/[slug]/
/en/results/
/en/honours/
/en/calendar/
/en/events/[slug]/
/en/news/
/en/news/[slug]/
/en/media/photos/
/en/media/videos/
/en/contact/
/en/legal-notice/
/en/privacy-policy/
```

Ces routes sont une proposition UX. Elles seront implémentées uniquement après
validation et pendant la Phase 3.

## 5. Navigation globale

### En-tête bureau

- Logo compact et nom du club.
- Navigation principale sur une ligne ou deux groupes clairement identifiés.
- Sous-menus pour Club, Disciplines et Médias.
- Changement de langue visible.
- Bouton principal « Voir les résultats » / « View results ».

### En-tête mobile

- Logo compact et nom abrégé lisible.
- Bouton de menu avec état ouvert/fermé annoncé.
- Langue visible au premier niveau, jamais uniquement dans le pied de page.
- Menu en panneau, ordre identique à l’ordre de lecture.
- Fermeture par bouton, touche Échap et retour du focus au déclencheur.

### Fil d’Ariane

Présent sur les pages profondes :

- discipline ;
- athlète ;
- compétition ;
- événement ;
- article ;
- galerie.

La page courante n’est pas un lien et utilise `aria-current="page"`.

### Pied de page

- nom du club ;
- navigation essentielle ;
- réseaux sociaux sous forme de liens ;
- contact public validé ;
- mentions légales et confidentialité ;
- sélecteur de langue ;
- mention de droits sans date inventée.

## 6. Modèles de pages publiques

### 6.1 Accueil

Ordre de contenu :

1. Hero : identité, message court, actions Résultats et Club.
2. Bandeau de prochaine échéance.
3. Présentation concise.
4. Un accès principal vers le Kyorugi et un accès clairement visible vers le
   Poomsae.
5. Derniers résultats.
6. Palmarès calculé.
7. Athlètes mis en avant si autorisés.
8. Actualités.
9. Prochains événements.
10. Vidéo sélectionnée avec chargement différé.
11. Liens Instagram et YouTube.

Le hero du prototype utilise une composition abstraite. La photographie finale
est bloquée jusqu’à réception d’un média autorisé.

### 6.2 Club et encadrement

La page Club présente :

- histoire ;
- valeurs ;
- philosophie ;
- objectifs ;
- installations si validées ;
- accès à l’encadrement.

L’encadrement utilise des cartes avec photo facultative, rôle et présentation
validée. Aucun diplôme ou fonction n’est affiché sans source officielle.

### 6.3 Disciplines

La page d’ensemble donne la priorité éditoriale au Kyorugi sans reléguer le
Poomsae ni réduire les informations qui lui sont consacrées.

Chaque détail présente :

- définition générale ;
- objectifs ;
- préparation ;
- déroulement des compétitions ;
- résultats associés ;
- actualités associées ;
- appel vers le calendrier.

Le contenu propre au club reste provisoire jusqu’à validation.

### 6.4 Athlètes

L’index propose :

- filtres Kyorugi/Poomsae ;
- filtre de catégorie lorsque les données le permettent ;
- recherche par nom affiché ;
- état vide explicite ;
- cartes sans information personnelle inutile.

Le profil contient :

- nom affiché ;
- photo autorisée ou silhouette neutre ;
- discipline et catégorie sportive ;
- parcours éditorial ;
- résultats dérivés ;
- galerie autorisée facultative.

Un profil non publié n’est jamais mentionné dans l’interface publique.

### 6.5 Compétitions

L’index est chronologique et filtrable par :

- année ;
- discipline ;
- niveau ;
- statut à venir/passé.

La page détail contient :

- nom, date, lieu et pays ;
- niveau et discipline ;
- résumé FR/EN ;
- participants publiables ;
- résultats associés ;
- médias et vidéos autorisés ;
- lien vers l’événement ou l’actualité associée.

### 6.6 Résultats

Les filtres sont visibles sur bureau et accessibles dans un panneau sur mobile :

- année ;
- discipline ;
- athlète ;
- compétition ;
- médaille.

Chaque résultat affiche :

- compétition ;
- date et lieu ;
- participant ou équipe ;
- discipline ;
- catégorie ;
- classement ;
- médaille textuelle et visuelle.

Les cartes mobiles fournissent les mêmes informations que le tableau bureau.
Aucune information n’est accessible uniquement au survol.

### 6.7 Palmarès

Le palmarès présente des agrégats calculés :

- compétitions distinctes ;
- participations ;
- médailles par métal ;
- répartition Combat/Poomsae ;
- évolution par saison.

Chaque chiffre doit indiquer son périmètre. Une médaille d’équipe compte comme
un résultat club. Le prototype affiche « Exemple fictif » à côté de chaque
total.

### 6.8 Calendrier et événements

L’index sépare :

- prochaines échéances ;
- événements passés.

Les heures affichent le fuseau si nécessaire. La page détail propose lieu,
description, discipline, lien externe validé et contenu associé.

### 6.9 Actualités

L’index propose catégories et pagination ou chargement explicite.

Un article contient :

- titre ;
- résumé ;
- date ;
- catégorie ;
- image autorisée facultative ;
- contenu structuré ;
- galerie/vidéo facultative ;
- liens vers compétition ou événement.

### 6.10 Médias

Photos :

- albums ;
- miniatures optimisées ;
- crédits ;
- légendes ;
- visionneuse accessible ;
- retrait simple.

Vidéos :

- miniature ;
- titre ;
- description ;
- lien YouTube ;
- lecteur chargé uniquement sur action.

### 6.11 Contact

Contenu :

- coordonnées publiques validées ;
- liens sociaux ;
- formulaire minimal ;
- informations de confidentialité.

Champs proposés :

- nom ;
- adresse de réponse ;
- objet ;
- message ;
- information de confidentialité proche de l’envoi ; une case de consentement
  n’est ajoutée que si la base juridique validée l’exige.

États maquettés :

- initial ;
- erreurs de validation ;
- envoi en cours ;
- succès ;
- service indisponible.

Le prototype ne transmet aucune donnée.

### 6.12 Pages utilitaires

- 404 avec retour à l’accueil et navigation.
- Traduction absente, sans contenu inventé.
- Résultats vides après filtre.
- Média retiré ou non autorisé.
- Service de contact indisponible.

## 7. Correspondance bilingue

### Règle normale

Le sélecteur envoie vers la page équivalente validée. La langue est conservée
pendant la navigation.

### Traduction absente

La maquette affiche :

- le nom de la langue indisponible ;
- un lien vers la liste dans cette langue ;
- un lien facultatif vers la version originale, clairement étiquetée ;
- aucune traduction automatique.

La redirection silencieuse vers l’accueil est déconseillée, car elle fait
perdre le contexte.

### Contraintes de contenu

- Les noms propres ne sont pas traduits.
- Dates, lieux, classements et médailles sont communs.
- Titres, résumés et métadonnées sont validés séparément.
- Le changement de langue reste accessible au clavier.

## 8. Parcours visiteurs

### Parcours A — découvrir le club

Accueil → Discipline → Club/Encadrement → Calendrier → Contact.

Critères :

- action suivante visible ;
- informations non inventées ;
- contact accessible sans compte ;
- retour facile vers la navigation.

### Parcours B — suivre une performance

Accueil → Derniers résultats → Compétition → Profil public ou galerie.

Critères :

- discipline et date visibles ;
- filtres conservés au retour ;
- résultat et médaille non ambigus ;
- médias différés.

### Parcours C — consulter le calendrier

Accueil → Prochaine échéance → Détail événement → Lien externe validé.

Critères :

- date, heure, fuseau et lieu lisibles ;
- événement passé distingué ;
- aucun bouton d’inscription fictif.

### Parcours D — changer de langue

Page profonde FR → équivalent EN → navigation EN → retour FR.

Critères :

- contexte conservé ;
- `lang` correct ;
- traduction manquante annoncée ;
- aucune publication automatique.

### Parcours E — navigation clavier et lecteur d’écran

Lien d’évitement → navigation → filtres → résultat → retour.

Critères :

- focus visible ;
- ordre logique ;
- états annoncés ;
- tableau et cartes mobiles équivalents.

## 9. Parcours d’administration

Les écrans d’administration du prototype sont des spécifications fonctionnelles.
Ils ne reproduisent pas exactement une interface CMS future.

### Parcours commun

1. Connexion avec compte nominatif.
2. Tableau de bord et collections autorisées.
3. Sélection d’un contenu.
4. Saisie des faits communs.
5. Saisie et validation FR/EN.
6. Ajout d’un média avec crédit, alternative et droits.
7. Correction des erreurs.
8. Aperçu FR/EN et responsive.
9. Vérification récapitulative obligatoire pour un résultat sportif.
10. Confirmation et enregistrement.
11. Publication si le rôle l’autorise, ou demande de publication dans les
    autres cas.

### Ajout d’une compétition

1. Créer la compétition.
2. Saisir date, fuseau, lieu, pays, niveau et discipline.
3. Renseigner les textes FR et EN.
4. Sélectionner les participants publiables.
5. Créer plusieurs résultats liés.
6. Vérifier les champs spécifiques Combat ou Poomsae.
7. Ajouter les médias autorisés.
8. Prévisualiser.
9. Vérifier le récapitulatif et confirmer l’enregistrement.

### Correction d’un résultat

1. Rechercher par compétition ou identifiant.
2. Ouvrir le résultat.
3. Corriger classement ou médaille.
4. Vérifier l’alerte de recalcul du palmarès.
5. Ajouter une justification interne non publique si nécessaire.
6. Vérifier le nouveau récapitulatif, confirmer la modification et contrôler
   l’aperçu des agrégats.

### Gestion des traductions

- faits communs en lecture unique ;
- onglets FR et EN ;
- état `missing`, `draft`, `validated`, `published` ;
- liste des champs manquants ;
- aucun bouton de traduction/publication automatique.

### Gestion des médias

- miniature ;
- fichier web ;
- texte alternatif ;
- légende ;
- crédit ;
- propriétaire/droit ;
- autorisation concernant un mineur : état uniquement, document conservé hors
  du dépôt ;
- point focal ;
- retrait.

### Erreur ou conflit

- résumé d’erreurs en tête ;
- liens vers chaque champ ;
- valeurs non perdues ;
- comparaison des versions ;
- choix explicite : annuler, enregistrer une copie, demander une résolution ;
- aucune fusion forcée.

## 10. Deux scénarios de permissions à maquetter

### Scénario A — permissions fines

Support cible : Decap Turbo avec rôles avancés.

- Administrateur principal : comptes, paramètres et toutes les collections.
- Administrateur sportif : disciplines, athlètes, compétitions, résultats et
  palmarès.
- Administrateur éditorial : pages, actualités, événements, médias et langues.
- Contributeur : collections explicitement autorisées.

Les rôles de collection Decap Turbo distinguent `edit`, `view` et `none`, mais
pas finement modifier, publier et supprimer. La matrice métier cible doit donc
être comparée à cette limite avant le choix du CMS.

### Scénario B — compromis gratuit

Support cible : Pages CMS hébergé.

- Tous les collaborateurs ont un accès éditorial large.
- Les rôles sont des consignes d’équipe, pas une barrière technique par
  collection.
- Les brouillons utilisent le statut du contenu.
- L’aperçu et la revue reposent sur des actions/conventions supplémentaires.
- L’absence de MFA organisationnelle documentée est signalée.

Le prototype présente clairement ces limites afin de ne pas promettre des
permissions inexistantes.

## 11. Responsive

### Points de revue

- Mobile : 390 px.
- Petit mobile critique : 320 px.
- Tablette : 834 px.
- Bureau : 1440 px.
- Zoom : 200 % sur les parcours critiques.

### Mobile

- une colonne ;
- menu en panneau ;
- filtres dans un panneau conservant le contexte ;
- résultats sous forme de cartes complètes ;
- contrôles tactiles d’environ 44 px lorsque possible ;
- aucun défilement horizontal de page.

### Tablette

- grilles de deux colonnes ;
- filtres latéraux si l’espace le permet ;
- administration utilisable en paysage ;
- formulaires regroupés sans masquer les libellés.

### Bureau

- conteneur maximal ;
- grilles de trois ou quatre colonnes seulement pour les contenus courts ;
- filtres persistants ;
- tableaux lisibles ;
- ligne de lecture limitée pour les articles.

## 12. Accessibilité

Objectif : WCAG 2.2 AA.

### Structure

- lien d’évitement ;
- landmarks ;
- un H1 par page ;
- hiérarchie sans saut décoratif ;
- ordre DOM identique à l’ordre visuel.

### Clavier

- tout contrôle activable ;
- focus visible ;
- Échap ferme les panneaux et dialogues ;
- focus piégé uniquement dans un vrai dialogue modal ;
- retour du focus après fermeture.

### Formulaires

- libellés visibles ;
- aide associée ;
- champs obligatoires annoncés ;
- résumé d’erreurs ;
- erreurs textuelles près des champs ;
- succès annoncé par région de statut.

### Couleurs et contenus

- contrastes AA mesurés ;
- médaille indiquée par couleur, texte et rang ;
- discipline jamais distinguée uniquement par couleur ;
- alternatives d’image contextualisées ;
- image décorative ignorée.

### Mouvement

- aucun autoplay ;
- transitions courtes ;
- version sans animation avec `prefers-reduced-motion`;
- aucun contenu essentiel révélé seulement par mouvement.

## 13. États d’interface obligatoires

Pour chaque composant interactif :

- repos ;
- survol si pertinent ;
- focus ;
- actif ;
- désactivé ;
- chargement simulé ;
- succès ;
- erreur.

Pour les données :

- contenu disponible ;
- brouillon ;
- traduction manquante ;
- résultat vide ;
- référence invalide réservée à l’administration ;
- média retiré.

## 14. Critères d’acceptation de la Phase 2

- Navigation complète et cohérente en FR et EN.
- Modèles principaux visibles dans le prototype.
- Kyorugi prioritaire et Poomsae clairement présenté.
- Résultats utilisables sur mobile sans perte d’information.
- Administration montrant les deux scénarios de droits sans prétendre être
  fonctionnelle.
- Tous les contenus de démonstration marqués fictifs.
- Aucun média social ou portrait réel réutilisé.
- Focus et navigation clavier vérifiables.
- Réduction des animations respectée.
- Contrastes documentés dans le design system.
- Aucune dépendance, serveur, API ou stockage.

## 15. Décisions à valider

Le détail, les options et les conséquences figurent dans
`docs/PHASE_2/DECISIONS_TO_VALIDATE.md`. Aucune de ces décisions n’est
considérée comme approuvée.

1. Architecture de navigation et priorité du Kyorugi.
2. Concept « Maîtrise en mouvement ».
3. Palette provisoire et principe de l’accent chaud.
4. Typographies Barlow Condensed et Inter.
5. Style des cartes de résultats et du palmarès.
6. Politique de traduction manquante.
7. Organisation des 5 à 6 administrateurs et quatre rôles.
8. Scénario CMS : permissions fines payantes ou compromis gratuit.
9. Confirmation obligatoire des résultats, sans double validation systématique.
10. Règle définitive de comptage du palmarès.
11. Formulaire de contact et conservation des messages.
12. Logo vectoriel, photographies et médias autorisés.

## 16. Point d’arrêt

Après validation du prototype et de ces décisions, une Phase 3 séparée pourra
initialiser Astro et implémenter les composants. Aucun élément du prototype ne
doit être présenté comme une fonctionnalité de production.
