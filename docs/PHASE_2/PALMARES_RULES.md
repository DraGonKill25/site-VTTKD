# Règles de calcul du palmarès

**Phase :** 2 — règles fonctionnelles  
**Statut :** à valider par le club  
**Données ci-dessous :** exclusivement fictives

## 1. Définitions

- **Résultat sportif :** enregistrement unique identifié par `result.id`.
- **Participation :** un résultat publié et valide, avec ou sans classement.
- **Classement sans médaille :** participation dont `rank` est renseigné et
  `medal` vaut `none`.
- **Médaille :** valeur normalisée `gold`, `silver` ou `bronze`.
- **Résultat individuel :** un participant.
- **Résultat par équipe :** une paire ou équipe enregistrée comme un seul
  résultat sportif.
- **Compétition distincte :** un `competitionId` unique présent dans au moins un
  résultat éligible.

## 2. Éligibilité publique

Un résultat contribue au palmarès uniquement si :

1. son identifiant est unique ;
2. son statut est `published` ;
3. la compétition référencée existe et n’est pas annulée ;
4. la discipline vaut `kyorugi` ou `poomsae` ;
5. le participant ou l’équipe existe dans les données publiables ;
6. les champs obligatoires sont valides ;
7. la médaille et le classement ne sont pas contradictoires.

Sont exclus :

- brouillons ;
- résultats annulés ;
- résultats archivés ;
- références invalides ;
- doublons d’identifiant ;
- résultats de compétitions annulées.

L’archivage conserve une trace administrative, mais retire le résultat des
statistiques publiques.

## 3. Comptages

### Participations

Chaque résultat éligible compte pour **une participation sportive**, y compris :

- sans classement ;
- avec classement sans médaille ;
- individuel ;
- paire ou équipe.

Une vue différente peut compter les membres d’une équipe, mais doit s’appeler
« participations d’athlètes » et ne fait pas partie du total principal.

### Médailles

Chaque résultat éligible avec `gold`, `silver` ou `bronze` compte pour une
médaille du métal correspondant.

Une médaille d’équipe compte pour **une médaille club**, jamais une médaille par
membre.

### Compétitions

Le total de compétitions est le nombre d’identifiants de compétition distincts
parmi les résultats éligibles. Plusieurs résultats dans une même compétition ne
l’augmentent qu’une fois.

### Disciplines

Les totaux sont calculés :

- globalement ;
- séparément pour Kyorugi ;
- séparément pour Poomsae.

Le total global doit égaler la somme des deux disciplines pour participations et
médailles.

## 4. Correction, annulation et archivage

- **Correction :** remplacement de l’entrée portant le même `id`, puis recalcul
  complet. L’ancienne valeur n’est plus comptée.
- **Annulation :** statut `cancelled`, exclusion immédiate de tous les agrégats.
- **Archivage :** statut `archived`, exclusion du palmarès public mais maintien
  dans l’historique administratif.
- **Dépublication :** passage à `draft`, exclusion immédiate.
- **Republication :** retour à `published` après confirmation, réintégration si
  les données sont valides.

## 5. Prévention des doublons

- `result.id` est immuable.
- Une création avec un identifiant existant est rejetée.
- Une modification remplace par identifiant ; elle n’ajoute pas une ligne.
- Une paire/équipe possède un seul résultat et une liste de membres.
- Une même performance importée deux fois avec des identifiants différents ne
  peut pas être détectée avec certitude : le futur contrôle doit signaler une
  combinaison identique compétition + discipline + participant + catégorie.

## 6. Exemples fictifs

### Exemple A — individuel et classement sans médaille

Entrées :

| ID | Discipline | Type | Statut | Rang | Médaille |
|---|---|---|---|---:|---|
| `demo-result-a1` | Kyorugi | Individuel | Publié | 1 | Or |
| `demo-result-a2` | Kyorugi | Individuel | Publié | 5 | Aucune |

Attendu :

- participations : 2 ;
- compétitions distinctes : 1 ;
- or : 1, argent : 0, bronze : 0 ;
- médailles totales : 1 ;
- Kyorugi : 2 participations, 1 médaille ;
- Poomsae : 0.

### Exemple B — équipe Poomsae

Entrée :

| ID | Discipline | Type | Membres | Statut | Médaille |
|---|---|---|---:|---|---|
| `demo-result-b1` | Poomsae | Équipe | 3 | Publié | Argent |

Attendu :

- participations sportives : 1 ;
- participations d’athlètes, si affichées séparément : 3 ;
- médailles club : 1 argent ;
- aucun triplement de la médaille.

### Exemple C — correction

État initial : `demo-result-c1`, Kyorugi, publié, bronze.  
Correction confirmée : même identifiant, médaille argent.

Attendu après correction :

- nombre de résultats : inchangé ;
- participations : inchangées ;
- bronze : -1 ;
- argent : +1 ;
- aucune ligne supplémentaire.

### Exemple D — annulation

État initial : `demo-result-d1`, Poomsae, publié, or.  
État confirmé : même identifiant, `cancelled`.

Attendu après annulation :

- participation : -1 ;
- or : -1 ;
- compétition distincte : -1 seulement si aucun autre résultat éligible ne la
  référence.

### Exemple E — archivage et brouillon

| ID | Statut | Médaille |
|---|---|---|
| `demo-result-e1` | Archivé | Bronze |
| `demo-result-e2` | Brouillon | Or |

Attendu : 0 participation et 0 médaille dans le palmarès public.

## 7. Jeu de vérification consolidé

Entrées publiées valides :

- `demo-test-01` : Kyorugi individuel, or, compétition A ;
- `demo-test-02` : Kyorugi individuel, rang 5 sans médaille, compétition A ;
- `demo-test-03` : Poomsae équipe, argent, compétition B.

Entrées exclues :

- `demo-test-04` : Poomsae annulé, bronze ;
- `demo-test-05` : Kyorugi archivé, or ;
- `demo-test-06` : Poomsae brouillon, argent.

Totaux attendus :

- résultats/participations : 3 ;
- compétitions distinctes : 2 ;
- or : 1 ;
- argent : 1 ;
- bronze : 0 ;
- médailles : 2 ;
- Kyorugi : 2 participations, 1 médaille ;
- Poomsae : 1 participation, 1 médaille.

## 8. Tests attendus en Phase 3

Ces tests sont spécifiés mais non implémentés pendant la Phase 2 :

- identifiant dupliqué rejeté ;
- correction sans création ;
- annulation et archivage exclus ;
- brouillon exclu ;
- équipe comptée une fois ;
- classement sans médaille compté comme participation ;
- séparation Kyorugi/Poomsae ;
- compétition distincte comptée une fois ;
- incohérence médaille/classement signalée ;
- recalcul identique quel que soit l’ordre des entrées.

