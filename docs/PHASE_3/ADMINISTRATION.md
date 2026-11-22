# Administration et CMS — Phase 3

**Date de vérification documentaire :** 22 novembre 2026  
**Limite du projet :** cinq comptes nominatifs maximum

## Choix technique de Phase 3

La configuration de référence préparée dans `.pages.yml` cible **Pages CMS**.
Ce choix permet de tester les collections dans une interface Git-based sans
ajouter de runtime au site Astro et sans souscrire un abonnement pendant la
Phase 3.

Ce choix n'est acceptable pour l'exploitation que si le club confirme qu'il
accepte des droits éditoriaux larges. Pages CMS ne documente pas de permissions
par rôle, collection ou champ pour ses collaborateurs. Les quatre rôles métier
restent donc une organisation humaine, pas une barrière technique.

Si la séparation Sport / Éditorial / Contribution doit être imposée par le
service, la recommandation devient **Decap Turbo Pro avec l'option de rôles
avancés**. Aucun compte, essai ou abonnement n'a été créé.

## Organisation des cinq comptes

1. un Administrateur principal ;
2. un Administrateur sportif ;
3. un Administrateur éditorial ;
4. un ou deux Contributeurs selon les besoins.

Une même personne peut cumuler des responsabilités. Chaque personne conserve
un compte nominatif ; aucun compte partagé n'est prévu. Le cinquième siège ne
doit pas être créé s'il n'est pas utile.

## Matrice métier cible

| Action | Principal | Sportif | Éditorial | Contributeur |
|---|---|---|---|---|
| Consulter les contenus | Tous | Tous | Tous | Autorisés |
| Athlètes, compétitions, résultats | Tous | Modifier/publier | Consulter | Autorisés |
| Horaires et exceptions | Tous | Modifier/publier | Consulter | Autorisés |
| Pages, actualités, événements, médias | Tous | Consulter | Modifier/publier | Autorisés |
| Créer et corriger un contenu attribué | Oui | Domaine sportif | Domaine éditorial | Oui |
| Archiver | Oui | Domaine sportif | Domaine éditorial | Non par défaut |
| Supprimer définitivement | Exceptionnel | Non | Non | Non |
| Gérer comptes, configuration et secrets | Oui | Non | Non | Non |

La suppression normale est remplacée par un statut d'archive. Les opérations
`rename` et `delete` sont désactivées dans `.pages.yml` pour les collections
principales afin de protéger les identifiants et les relations.

## Capacités réellement vérifiées de Pages CMS

La documentation officielle indique que :

- les collaborateurs sont invités par e-mail et limités à un dépôt ;
- ils peuvent modifier contenus et médias ;
- ils ne peuvent pas gérer `.pages.yml`, les collaborateurs ou le cache ;
- `operations` active ou désactive `create`, `rename` et `delete` pour toute
  une collection ;
- les écritures peuvent attribuer les commits à l'utilisateur avec
  `settings.commit.identity: user`.

Limites :

- aucune affectation documentée d'un collaborateur à certaines collections ;
- aucune distinction documentée créer/modifier/publier par personne ;
- toute personne ayant accès à `results` peut changer le statut `published` ;
- le récapitulatif obligatoire des résultats n'est pas imposé par Pages CMS ;
- la sauvegarde et la publication Git doivent être organisées par branche et
  contrôles externes ;
- l'authentification, la révocation et les conflits n'ont pas été testés sans
  dépôt distant et comptes autorisés.

La configuration regroupe visuellement Sport, Horaires et Éditorial, mais un
groupe d'interface n'est pas une permission.

## Alternative vérifiée : Decap Turbo

La documentation officielle actuelle confirme :

- un propriétaire d'organisation gère sites, membres, rôles et facturation ;
- un membre est affecté aux sites nécessaires ;
- le rôle complet voit toutes les collections ;
- un rôle personnalisé définit `edit`, `view` ou `none` par collection ;
- les restrictions sont appliquées côté serveur ;
- il n'existe pas de rôle intermédiaire « administrateur de site » ;
- `edit` ne sépare pas créer, modifier, publier, archiver et supprimer.

Au tarif affiché le 22 novembre 2026 :

- Pro inclut cinq sièges pour 19 € TTC par mois ;
- les rôles personnalisés ajoutent 19 € par mois ;
- total indicatif pour cinq comptes : **38 € TTC par mois**.

Le prix doit être revérifié et explicitement autorisé avant souscription.

## Configuration livrée

`.pages.yml` décrit :

- athlètes ;
- compétitions ;
- résultats ;
- cours récurrents et exceptions ;
- pages ;
- actualités ;
- événements ;
- médias.

Les champs bilingues utilisent des objets `fr` et `en`, les valeurs métier
sont des sélections contrôlées et les identifiants servent aux noms de fichier.
Le YAML a été analysé localement avec succès. Aucun service distant ne l'a
chargé ; sa compatibilité complète dans l'interface hébergée reste à vérifier
pendant la Phase 4.

## Administration locale des résultats

`/admin/results/` est un prototype fonctionnel autonome du récapitulatif,
de la modification et de l'historique. Il utilise `localStorage` et n'est pas
le CMS de production :

- aucune authentification ;
- aucune synchronisation ;
- aucune écriture Git ;
- aucune garantie d'intégrité ;
- aucune permission réelle.

Le parcours doit être conservé lors du raccordement au CMS. Pages CMS seul ne
peut pas garantir ce récapitulatif ; une action contrôlée ou une interface
spécifique sera nécessaire avant l'usage réel.

## État des essais

| Capacité | État |
|---|---|
| Schéma `.pages.yml` analysable | Vérifié localement |
| Collections correspondant aux fichiers Astro | Vérifié localement |
| Création/modification avec récapitulatif local | Vérifié |
| Conservation de l'identifiant lors d'une modification | Test automatisé |
| Comptes nominatifs et révocation Pages CMS | Non vérifié sans comptes |
| Permissions Pages CMS par rôle | Non disponible dans la documentation |
| Rôles Decap Turbo par collection | Vérifié dans la documentation |
| Publication Git et conflits simultanés | Non vérifié sans dépôt distant |

## Sources

- Pages CMS, configuration :
  <https://pagescms.org/docs/configuration/content/>
- Pages CMS, collaborateurs :
  <https://pagescms.org/docs/configuration/collaborators/>
- Pages CMS, opérations :
  <https://pagescms.org/docs/configuration/content/operations/>
- Decap Turbo, rôles :
  <https://decapcms.org/docs/turbo-roles-and-members/>
- Decap Turbo, offres :
  <https://decapcms.org/turbo/>
