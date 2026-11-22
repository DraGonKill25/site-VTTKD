# Rôles et permissions — Phase 2

**Périmètre :** proposition pour 5 à 6 comptes nominatifs  
**Statut :** à valider par le club  
**Dernière vérification des offres :** 7 novembre 2026

## 1. Principes

- Aucun compte partagé.
- Quatre rôles seulement.
- Une même personne peut cumuler des responsabilités, mais conserve un compte
  unique.
- Le moindre privilège s’applique aux contenus comme aux paramètres.
- La confirmation récapitulative d’un résultat est obligatoire ; elle ne
  constitue pas une seconde validation par une autre personne.
- Les documents d’autorisation, secrets et données privées ne sont jamais
  stockés dans le CMS.

## 2. Rôles proposés

### Administrateur principal

Gère les comptes, les permissions, les paramètres et tous les contenus. Ce rôle
doit être limité à une ou deux personnes et inclut la récupération d’accès.

### Administrateur sportif

Gère les athlètes publiables, compétitions, résultats, palmarès et contenus
Kyorugi/Poomsae. Il ne gère ni comptes ni paramètres techniques.

### Administrateur éditorial

Gère pages, actualités, événements, médias et contenus FR/EN. Il consulte les
faits sportifs utiles, mais ne modifie pas les résultats.

### Contributeur

Crée et corrige uniquement les contenus qui lui sont attribués. Il ne gère ni
utilisateurs, ni paramètres, ni suppression définitive. La publication dépend
des capacités du CMS et de l’autorisation qui lui est accordée.

## 3. Matrice métier cible

Légende : **T** tous, **D** domaine du rôle, **A** contenus autorisés, **C**
consultation, **—** aucun accès.

| Action ou contenu | Principal | Sportif | Éditorial | Contributeur |
|---|---:|---:|---:|---:|
| Consulter les contenus publiables | T | T | T | A |
| Pages du club et disciplines | T | C | D | A |
| Athlètes | T | D | C | A |
| Compétitions | T | D | C | A |
| Résultats et historique | T | D | C | A |
| Palmarès calculé | T | D | C | C |
| Actualités et événements | T | C | D | A |
| Médias autorisés | T | C | D | A |
| Traductions FR/EN | T | D sportif | D éditorial | A |
| Modifier | T | D | D | A |
| Publier | T | D | D | — par défaut |
| Archiver | T | D | D | — |
| Supprimer définitivement | T | — | — | — |
| Gérer les utilisateurs et rôles | T | — | — | — |
| Gérer paramètres, secrets et domaine | T | — | — | — |

La suppression métier normale est un archivage réversible. La suppression
définitive reste exceptionnelle, réservée à l’administrateur principal et
soumise à contrôle de l’historique Git.

## 4. Faisabilité dans les CMS étudiés

### Decap Turbo avec rôles avancés

La documentation officielle vérifiée permet :

- des propriétaires d’organisation, seuls habilités à gérer sites, membres,
  rôles, facturation et zone dangereuse ;
- des membres affectés à un site ;
- un rôle complet ou des rôles personnalisés appliquant `edit`, `view` ou
  `none` par collection ;
- une application serveur de ces restrictions ;
- un journal d’activité.

Limites :

- `edit` ne sépare pas nativement créer, modifier, publier, archiver et
  supprimer ;
- il n’existe pas de rôle distinct « administrateur du site » entre owner et
  membre ;
- la publication contrôlée peut encore nécessiter un workflow Git ou une
  convention, sans imposer une double validation humaine à chaque résultat ;
- l’obligation MFA à l’échelle de toute l’organisation n’est pas démontrée dans
  la documentation consultée.

Coût indicatif TTC observé :

- 5 sièges : Pro 19 € + rôles avancés 19 € = **38 €/mois** ;
- 6 sièges : Pro 19 € + siège supplémentaire 6 € + rôles avancés 19 € =
  **44 €/mois**.

Ces tarifs devront être revérifiés avant souscription.

### Pages CMS hébergé

La documentation officielle vérifiée permet :

- des collaborateurs invités par courriel et limités à un dépôt ;
- l’édition de contenus et médias ;
- une configuration globale des opérations `create`, `rename` et `delete` par
  collection ;
- une écriture via la GitHub App du dépôt.

Limites :

- pas de rôles métier individualisés par collection documentés ;
- pas de séparation Sport/Éditorial/Contributeur garantie par le service ;
- les collaborateurs ne gèrent ni configuration, ni collaborateurs ;
- MFA organisationnelle obligatoire non documentée ;
- sauvegarde directe selon la branche configurée, sans workflow équivalent à
  une approbation éditoriale complète.

Pages CMS peut appliquer un accès éditorial large, mais ne peut pas garantir la
matrice métier ci-dessus. Les rôles deviennent alors des règles d’équipe.

## 5. Recommandation

Si le club exige que les limites Sport/Éditorial soient techniquement
contraignantes, retenir provisoirement **Decap Turbo Pro avec rôles avancés** et
accepter que publier/supprimer ne soient pas séparés aussi finement que dans la
matrice cible.

Si le coût nul est prioritaire, **Pages CMS** reste possible uniquement si le
club accepte que les collaborateurs aient des droits éditoriaux larges. Dans ce
cas :

- réserver gestion des comptes et configuration aux propriétaires GitHub ;
- désactiver les suppressions là où elles ne sont pas nécessaires ;
- utiliser des statuts brouillon/publié/archivé ;
- auditer les commits et former l’équipe.

## 6. Organisation recommandée pour 5 à 6 personnes

- 1 administrateur principal, avec un remplaçant documenté ;
- 1 ou 2 administrateurs sportifs ;
- 1 ou 2 administrateurs éditoriaux ;
- 1 contributeur, ou cumul avec un rôle existant.

Le club doit désigner les personnes, décider si le Contributeur peut publier et
choisir le niveau de contrainte réellement attendu du CMS.

## 7. Sources vérifiées

- Decap Turbo, offres et tarifs :
  <https://decapcms.org/turbo/>
- Decap Turbo, organisations et rôles :
  <https://decapcms.org/docs/turbo-roles-and-members/>
- Pages CMS, collaborateurs :
  <https://pagescms.org/docs/configuration/collaborators/>
- Pages CMS, authentification :
  <https://pagescms.org/docs/development/authentication/>

