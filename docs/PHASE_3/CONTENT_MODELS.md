# Modèles de contenu — Phase 3

**Statut :** implémentés et validés au build  
**Source :** `src/content.config.ts` et `src/content/`

## Principes communs

- identifiants stables en minuscules, sans espace ;
- textes éditoriaux séparés en `fr` et `en` ;
- aucune traduction automatique ;
- statuts normalisés : `draft`, `published`, `archived`, `cancelled` ;
- disciplines canoniques : `kyorugi`, `poomsae` ;
- champ `demo: true` obligatoire pour les exemples fictifs ;
- relations stockées par identifiant, jamais par nom affiché ;
- données personnelles et justificatifs privés exclus du dépôt public.

Le nom `route` est utilisé pour les chemins localisés. Le champ spécial `slug`
du chargeur Astro n'est pas détourné pour stocker un objet bilingue.

## Collections

### Athlètes

`athletes` contient l'identifiant, le nom d'affichage, les disciplines, la
catégorie sportive, la visibilité du profil, le statut, une biographie
bilingue et une photo facultative.

Les données de naissance, coordonnées, informations médicales et autorisations
de mineurs ne font pas partie du modèle public.

### Compétitions

`competitions` contient les routes, le nom, les dates, le lieu structuré, le
niveau, les disciplines, le statut et un résumé. La date de fin ne peut pas
précéder la date de début.

### Résultats

`results` référence une compétition et un ou plusieurs athlètes. Le modèle
contient :

- discipline et type de participant (`individual`, `pair`, `team`) ;
- classement et médaille ;
- statut de publication ;
- commentaire et référence de source ;
- données propres au Kyorugi ou au Poomsae ;
- métadonnées de création et de dernière modification ;
- documents publics facultatifs.

Les contraintes vérifient notamment le nombre de participants, l'absence d'un
même athlète en double, la cohérence discipline/détails et les classements
associés aux médailles. Un justificatif privé ne doit jamais être ajouté à
`documents`.

### Horaires et exceptions

`courseSchedules` décrit un cours récurrent : nom, discipline, jour, début,
fin, fuseau `Europe/Paris`, lieu, groupe, validité, statut et ordre.

`scheduleExceptions` décrit uniquement un changement daté. Une modification
d'heure exige les deux heures ; une modification de lieu exige le nouveau
lieu. L'exception ne modifie jamais le cours récurrent.

Les horaires présents dans les fixtures sont archivés et explicitement
fictifs. Aucun horaire inventé n'est présenté comme actif.

### Actualités, événements et médias

- `news` : routes, titre, extrait, corps, date et statut ;
- `events` : dates avec décalage horaire, fuseau, lieu et disciplines ;
- `media` : photo locale ou identifiant YouTube, textes alternatifs, crédit,
  état des droits et statut.

Un média dont les droits sont `pending` ou `withdrawn` ne doit pas être rendu
publiquement.

### Pages institutionnelles

`pages` contient un identifiant stable, des routes, un titre, une introduction,
un corps bilingue et un statut. Les faits propres au club restent à compléter
avec des contenus validés.

### Palmarès

Le palmarès n'est pas une collection éditoriale. Il est calculé de manière
reproductible à partir de `results`. Seuls les résultats `published` et
valides contribuent aux totaux. La logique et ses tests sont décrits dans
`SPORT_RESULTS.md`.

### Contacts

Un message de contact n'est pas un contenu public et n'est pas enregistré dans
Git. Son modèle applicatif contient uniquement nom, e-mail, objet, message,
langue et champs anti-spam techniques. L'envoi et la conservation restent
désactivés tant que le destinataire, le fournisseur, la durée et les mentions
légales ne sont pas validés.

## Relations attendues

- `result.competitionId` doit référencer une compétition existante ;
- chaque `result.athleteIds[]` doit référencer un athlète existant ;
- `scheduleException.scheduleId` doit référencer un cours existant ;
- les identifiants et routes doivent rester uniques dans leur collection.

Les schémas contrôlent la forme au chargement. Les tests métier contrôlent les
relations et les calculs afin qu'une référence invalide bloque la vérification
du projet.

## Fixtures

Les fixtures livrées couvrent les deux disciplines, un résultat individuel, un
résultat d'équipe et les quatre statuts utiles aux exclusions du palmarès.
Elles portent toutes `demo: true`, à l'exception du fichier de logo fourni dans
le projet. Elles ne constituent ni des horaires, ni des résultats, ni des
personnes réelles du club.
