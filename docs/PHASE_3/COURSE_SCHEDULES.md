# Horaires des cours — Phase 3

## Modèle retenu

Un cours récurrent et une exception ponctuelle sont deux objets distincts.

`courseSchedules` contient :

- identifiant stable ;
- nom bilingue ;
- discipline ;
- jour de la semaine ;
- heures de début et de fin ;
- fuseau `Europe/Paris` ;
- lieu et groupe bilingues ;
- description facultative ;
- dates de validité ;
- statut `active`, `suspended` ou `archived` ;
- ordre d'affichage.

`scheduleExceptions` contient :

- identifiant et référence au cours ;
- date concernée ;
- type : annulation, changement d'heure, changement de lieu ou information ;
- nouvelles heures ou nouveau lieu si nécessaire ;
- message bilingue ;
- statut éditorial.

## Règles d'affichage

Seuls les cours `active` dont la période de validité couvre la date courante
sont visibles. Les cours suspendus, archivés, futurs ou expirés sont exclus.

Une exception publiée s'applique uniquement à l'occurrence portant la même
date. La fonction `resolveOccurrence` crée une vue calculée sans modifier
l'objet récurrent. Une annulation ponctuelle ne supprime donc pas les séances
suivantes.

Les horaires sont affichés dans le fuseau du club. Les heures d'été et d'hiver
sont prises en charge par l'identifiant IANA `Europe/Paris`, sans stocker un
décalage UTC fixe.

## Administration prévue

Les administrateurs autorisés pourront créer, modifier, suspendre ou archiver
un cours via la collection correspondante. Les vacances, jours fériés,
annulations et changements temporaires devront être saisis dans la collection
d'exceptions.

La suppression définitive est déconseillée si un historique éditorial est
utile ; l'archivage est l'action par défaut. Les permissions exactes dépendent
du CMS retenu et sont décrites dans `ADMINISTRATION.md`.

## État des données

Le club n'a fourni aucun horaire réel vérifiable. La seule fixture présente
est archivée, datée dans le passé et marquée comme démonstration. La page
publique affiche donc un état « horaires à communiquer » en français et en
anglais.

## Tests

Les tests automatisés vérifient :

- l'exclusion des cours suspendus, archivés ou hors validité ;
- l'application d'un changement ponctuel d'heure et de lieu ;
- l'absence de mutation du cours récurrent ;
- l'annulation d'une seule occurrence ;
- l'absence d'occurrence un autre jour de la semaine.
