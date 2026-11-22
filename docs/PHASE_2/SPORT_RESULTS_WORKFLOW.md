# Parcours de gestion des résultats sportifs

**Phase :** 2 — spécification UX et prototype  
**Statut :** à valider par le club

## 1. Objectif

Réduire les erreurs sans imposer une double validation systématique. Toute
création ou modification passe par un récapitulatif explicite avant
enregistrement. Le prototype simule ce parcours localement ; il ne sauvegarde
rien dans un CMS.

## 2. Données communes

- identifiant stable et non modifiable après création ;
- compétition ;
- date et lieu de la compétition ;
- discipline : Kyorugi ou Poomsae ;
- participant : athlète, paire ou équipe ;
- catégorie ;
- classement éventuel ;
- médaille : aucune, bronze, argent ou or ;
- commentaire public facultatif ;
- référence de source/justificatif facultative ;
- statut : brouillon, publié, archivé ou annulé.

La référence justificative est un libellé ou une URL autorisée. Un document
contenant des données personnelles ne doit pas être importé dans le dépôt.

Champs Kyorugi : catégorie de poids et catégorie d’âge si elles sont publiables.  
Champs Poomsae : individuel, paire ou équipe, catégorie et type si vérifié.

## 3. Création

1. L’administrateur ouvre « Nouveau résultat ».
2. Le système génère un identifiant `demo-*` dans le prototype ; la future
   implémentation générera un identifiant unique stable.
3. L’administrateur remplit les champs.
4. « Vérifier les informations » valide les champs sans enregistrer.
5. En cas d’erreur, un résumé et des messages proches des champs sont affichés
   sans perdre les valeurs.
6. Le récapitulatif affiche toutes les données, le futur effet sur le palmarès
   et la mention « aucune sauvegarde automatique ».
7. L’administrateur choisit :
   - « Modifier les informations » : retour au formulaire prérempli ;
   - « Confirmer et enregistrer » : création ;
   - « Annuler » : abandon avec confirmation si des données ont changé.
8. Un message de succès fournit un accès à la fiche et à la liste.

La confirmation appartient à la personne qui saisit. Elle ne nécessite pas une
deuxième personne.

## 4. Contenu du récapitulatif

Le récapitulatif regroupe :

1. compétition, date, lieu ;
2. discipline ;
3. athlète, paire ou équipe ;
4. catégorie et détails spécifiques à la discipline ;
5. classement et médaille ;
6. commentaire ;
7. source ou justificatif ;
8. statut de publication ;
9. avertissement de recalcul du palmarès.

Les valeurs absentes sont indiquées « Non renseigné », jamais par une cellule
vide ambiguë. La médaille est exprimée par texte et rang, pas seulement par
couleur.

## 5. Modification

1. Rechercher le résultat par identifiant, compétition, participant ou statut.
2. Ouvrir la fiche.
3. Choisir « Modifier ».
4. Corriger n’importe quel champ important, y compris compétition, date, lieu,
   discipline, participant, catégorie, classement, médaille, commentaire et
   source.
5. Choisir « Vérifier les modifications ».
6. Le récapitulatif compare les anciennes et nouvelles valeurs.
7. « Modifier les informations » retourne au formulaire ; « Annuler les
   modifications » retourne à la fiche inchangée.
8. « Confirmer les modifications » remplace l’entrée portant le même
   identifiant.
9. La liste et le palmarès sont recalculés si le résultat est publié.

Une modification ne crée jamais un nouvel identifiant et ne duplique donc pas
le résultat.

## 6. Historique

La fiche administrative expose uniquement aux rôles autorisés :

- date de création ;
- compte créateur ;
- date de dernière modification ;
- compte ayant effectué la dernière modification ;
- résumé des champs modifiés ;
- statut avant/après ;
- versions précédentes lorsque le CMS/Git permet de les consulter.

Le prototype utilise des comptes fictifs comme « Compte démo Sport ». En
production, l’historique Git et le journal du CMS devront être rapprochés sans
enregistrer de secret ni de justificatif privé.

## 7. Publication et palmarès

- Seul un résultat `published` et valide contribue au palmarès public.
- `draft`, `cancelled` et `archived` sont exclus.
- Une correction confirmée remplace le résultat existant, puis recalcule les
  totaux.
- Une médaille d’équipe vaut une médaille club, pas une médaille par membre.
- Une participation correspond à un résultat sportif unique.
- Le bouton de confirmation ne publie que si le rôle y est autorisé ; sinon il
  enregistre en brouillon.

Les règles détaillées sont dans
[`PALMARES_RULES.md`](PALMARES_RULES.md).

## 8. États UX

- **Normal :** formulaire ou fiche complète.
- **Vide :** aucun résultat enregistré ou aucun résultat pour les filtres.
- **Contenu manquant :** donnée liée indisponible ou traduction non validée.
- **Erreur :** validation impossible, valeurs conservées.
- **Succès :** enregistrement simulé confirmé avec prochaine action.

## 9. Écrans du prototype

- liste administrative des résultats ;
- formulaire de création ;
- confirmation de création ;
- fiche d’un résultat existant ;
- formulaire de modification ;
- confirmation des modifications ;
- liste mise à jour ;
- historique.

Les changements du prototype sont conservés uniquement en mémoire et sont
réinitialisés au rechargement de la page.

## 10. Critères d’acceptation

- aucun enregistrement avant confirmation ;
- retour au formulaire sans perte ;
- tous les champs importants modifiables ;
- annulation sans mutation ;
- identifiant stable ;
- liste et palmarès mis à jour après confirmation ;
- historique visible uniquement dans l’administration ;
- parcours utilisable au clavier, en FR/EN et à 320 px.

