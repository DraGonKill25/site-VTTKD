# Résultats sportifs — Phase 3

## Parcours implémenté

L'écran local `/admin/results/` illustre le parcours complet :

1. ouvrir la liste ;
2. créer un résultat ou ouvrir une fiche existante ;
3. renseigner ou modifier tous les champs ;
4. sélectionner « Vérifier les informations » ;
5. consulter le récapitulatif complet ;
6. revenir au formulaire, annuler ou confirmer ;
7. enregistrer seulement après confirmation explicite ;
8. retrouver le résultat mis à jour et son historique.

La page de récapitulatif n'est pas une sauvegarde automatique. La fonction de
confirmation crée ou remplace l'enregistrement seulement au dernier bouton.
Aucune seconde validation humaine n'est imposée.

## Champs modifiables

- compétition de référence, nom, date et lieu ;
- discipline ;
- type de participation ;
- athlète, paire ou équipe ;
- catégorie ;
- classement et médaille ;
- commentaire ;
- source ou référence de justificatif ;
- statut.

Le récapitulatif montre les valeurs complètes et, lors d'une modification, la
liste des champs ayant changé.

## Identifiants et doublons

Une création reçoit un identifiant stable. Une modification passe par
`updateResultRecord`, qui conserve cet identifiant, l'auteur et la date de
création. `upsertResult` remplace l'enregistrement portant le même identifiant
au lieu d'ajouter une deuxième participation.

Le modèle de contenu publié référence la compétition par `competitionId`.
L'interface de démonstration présente aussi le nom, la date et le lieu pour
permettre la vérification demandée. Lors du branchement au CMS, la correction
des métadonnées partagées d'une compétition devra mettre à jour sa fiche sans
dupliquer la compétition.

## Validation

La validation bloque notamment :

- les champs structurants vides ;
- une date mal formée ;
- un classement inférieur à un ;
- une médaille d'or sans première place ;
- une médaille d'argent sans deuxième place ;
- une médaille de bronze sans troisième place.

Les schémas de contenu contrôlent en plus la discipline, le type de participant,
le nombre de membres, les références et les statuts.

## Historique

Chaque confirmation locale conserve :

- date et compte de création ;
- date et compte de dernière modification ;
- champ modifié ;
- ancienne et nouvelle valeur.

Les fixtures initiales ne possèdent qu'une entrée de création reconstruite.
Les changements effectués dans l'interface sont détaillés. Cet historique de
démonstration n'est ni signé, ni immuable, ni sécurisé.

## Persistance et sécurité

Pour rester autonome et ne pas simuler une infrastructure non choisie, l'écran
utilise `localStorage`. Les données restent uniquement dans le navigateur et
peuvent être réinitialisées. Il n'y a :

- aucune authentification réelle ;
- aucune écriture dans Git ou un CMS ;
- aucune synchronisation entre administrateurs ;
- aucune garantie d'intégrité ou de sauvegarde.

Cette persistance est destinée à tester l'ergonomie. Le fournisseur CMS,
l'authentification et les permissions devront remplacer ce stockage avant un
usage réel.

## Publication et palmarès

Seul le statut `published` rend un résultat éligible au palmarès. Les statuts
`draft`, `cancelled` et `archived` en sont exclus.

`calculateHonours` déduplique d'abord les enregistrements par identifiant
stable et retient la dernière valeur. Une correction remplace donc la
contribution précédente. Chaque résultat publié vaut une participation :

- un résultat individuel vaut une participation ;
- une paire vaut une participation ;
- une équipe vaut une participation, quel que soit le nombre de membres ;
- une médaille d'équipe vaut une médaille, pas une médaille par membre ;
- `none` compte comme participation sans augmenter les médailles ;
- les totaux Kyorugi et Poomsae sont calculés séparément ;
- le nombre de compétitions distinctes est déduit de `competitionId`.

La page publique affiche les participations, médailles, disciplines et
compétitions distinctes calculées. Aucun total éditorial n'est stocké.

## Tests automatisés

Les tests vérifient :

- la cohérence classement/médaille ;
- le détail des champs modifiés ;
- la conservation de l'identifiant ;
- l'ajout d'une entrée d'historique ;
- le remplacement sans doublon ;
- les résultats individuels, par paire et par équipe ;
- l'exclusion des trois statuts non publiés ;
- une correction de médaille et une annulation après correction.
