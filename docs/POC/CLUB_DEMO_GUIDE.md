# Guide de démonstration au club

**Durée conseillée :** 20 à 30 minutes  
**Support actuel :** aperçu local du POC  
**Message d'ouverture :** ce site est une démonstration non officielle, pas
un lancement public ni une mise en production.

## Avant la réunion

1. Exécuter `npm run build:poc`.
2. Exécuter `npm run test:site:poc`.
3. Démarrer l'aperçu avec `npm run preview:poc -- --host 127.0.0.1 --port 4322`.
4. Ouvrir `http://127.0.0.1:4322/site-VTTKD/fr/`.
5. Vérifier que la bannière POC est visible.
6. Ne saisir aucune donnée réelle ou personnelle.

Si le propriétaire a ultérieurement autorisé GitHub Pages, remplacer l'URL
locale par celle inscrite dans `DEPLOYMENT_REPORT.md`.

## Parcours de présentation

### 1. Accueil et identité

- montrer la bannière « POC — Version de démonstration non officielle » ;
- expliquer que le logo et les liens sociaux sont les seules ressources
  publiques fournies ;
- confirmer la direction sportive premium et la priorité du Kyorugi ;
- demander un avis sur les couleurs, la typographie et la navigation.

### 2. Disciplines

- ouvrir Kyorugi et présenter son rôle prioritaire ;
- ouvrir Poomsae et vérifier que sa présentation reste complète ;
- rappeler que les textes sont des propositions à valider.

### 3. Athlètes et compétitions

- montrer un profil « Athlète Démo » ;
- ouvrir une compétition fictive ;
- rappeler qu'aucun nom, résultat ou photo réel n'est publié ;
- demander quelles informations le club souhaite fournir et autoriser.

### 4. Résultats et palmarès

- expliquer que seules les fixtures publiées alimentent l'affichage ;
- montrer la séparation Kyorugi/Poomsae ;
- rappeler qu'une correction conserve l'identifiant et ne crée pas de
  doublon ;
- faire confirmer les règles métier avant toute donnée réelle.

### 5. Horaires

- montrer l'état « horaires à communiquer » ;
- expliquer qu'aucune heure n'a été inventée ;
- demander les jours, heures, groupes, lieux, dates de validité et exceptions.

### 6. Actualités et médias

- montrer les contenus de démonstration ;
- confirmer qu'aucune photographie d'athlète n'est intégrée ;
- demander la procédure d'autorisation, les crédits et les responsables des
  publications.

### 7. Contact

- remplir uniquement avec des valeurs fictives ;
- montrer la validation et la confirmation « aucun message envoyé » ;
- préciser qu'aucun destinataire, fournisseur ou stockage n'est configuré.

### 8. Français et anglais

- utiliser le sélecteur de langue sur plusieurs pages ;
- demander une validation humaine de toutes les traductions ;
- relever les termes sportifs à corriger ou harmoniser.

### 9. Responsive

- montrer au minimum une vue 320 px, une vue tablette et une vue ordinateur ;
- vérifier menu, bannière, cartes, boutons et absence de défilement
  horizontal ;
- utiliser les captures de `docs/POC/evidence/screenshots/` si nécessaire.

## Ce qui n'est pas présenté comme fonctionnel

- aucune administration publique ;
- aucune authentification ou permission ;
- aucun CMS ;
- aucun envoi de contact ;
- aucun téléversement ou stockage documentaire ;
- aucune donnée sportive réelle ;
- aucune indexation ;
- aucun domaine officiel ;
- aucune garantie de disponibilité ou de sauvegarde.

Les routes `/admin/*` et `/documents/*` sont absentes de l'artefact POC.

## Questions à faire trancher par le club

1. La navigation et la priorité du Kyorugi sont-elles validées ?
2. La présentation du Poomsae est-elle suffisante ?
3. Le design peut-il servir de base aux prochaines phases ?
4. Quels contenus institutionnels et sportifs peuvent devenir publics ?
5. Quels horaires officiels doivent être intégrés ?
6. Quelles photographies et vidéos disposent d'autorisations vérifiables ?
7. Qui valide les versions française et anglaise ?
8. Le club accepte-t-il que le POC soit accessible à toute personne disposant
   de l'URL ?
9. Le dépôt peut-il être public, ou faut-il vérifier une offre GitHub adaptée
   à un dépôt privé ?
10. Qui est autorisé à donner l'accord de publication final ?

## Prise de notes

- **Décision générale :** ...................................................
- **Corrections visuelles :** ...............................................
- **Corrections FR/EN :** ...................................................
- **Contenus autorisés :** ..................................................
- **Contenus interdits :** ..................................................
- **Responsable de validation :** ...........................................
- **Échéance :** ............................................................

## Conclusion à annoncer

La démonstration sert uniquement à recueillir des décisions. Elle ne vaut pas
validation de production. Après la réunion, toute publication, intégration de
service, donnée réelle ou évolution vers la production fera l'objet d'une
autorisation et d'un périmètre séparés.
