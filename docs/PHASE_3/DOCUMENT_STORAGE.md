# Stockage des documents sportifs — Phase 3

## Règles communes

Un document associé à un résultat n'est public que si :

- sa publication est nécessaire et autorisée ;
- il ne contient aucune donnée personnelle, privée ou sensible ;
- il ne s'agit pas d'une autorisation concernant un mineur ;
- son type réel est PDF, JPEG ou PNG ;
- sa taille ne dépasse pas 10 000 000 octets ;
- son identifiant et le résultat associé sont stables ;
- aucun doublon n'existe.

Une simple extension de fichier n'est pas une preuve de type. Le contrôle
client améliore l'ergonomie, mais le stockage retenu devra répéter les
vérifications côté serveur ou dans un workflow de confiance.

## Interface préparée

`/admin/documents/` permet localement :

- de choisir un résultat ;
- de sélectionner un fichier ;
- de vérifier type, extension et taille ;
- de confirmer son caractère public et non personnel ;
- de générer le chemin normalisé ;
- de refuser les entrées invalides.

Elle n'envoie et ne copie aucun fichier. Elle n'est donc pas un mécanisme de
stockage et n'expose aucun jeton.

## Mode A — Hébergement gratuit

### Architecture

L'interface CMS transmettrait le fichier à un stockage sécurisé via une
fonction serveur ou un mécanisme officiel du CMS. Le navigateur ne doit jamais
recevoir de jeton Git, de clé S3/R2 ou de secret durable.

Flux attendu :

1. l'administrateur s'authentifie auprès du CMS ;
2. il choisit le résultat et le fichier ;
3. le serveur contrôle identité, permission, taille, type détecté et doublon ;
4. le serveur stocke le fichier avec un nom généré ;
5. seules les métadonnées publiques sont ajoutées au résultat ;
6. la compilation vérifie que la référence est résolue.

### Limites

- Pages CMS peut gérer des médias du dépôt, mais ne sépare pas les droits par
  rôle métier ;
- un stockage externe demande un service et une fonction sécurisée ;
- quotas, localisation, coût futur, suppression et export dépendent du
  fournisseur ;
- aucune offre gratuite ne doit être supposée pérenne.

Aucun fournisseur n'est retenu et aucun compte n'a été créé en Phase 3.

## Mode B — Hébergement payant avec dépôt autorisé

Seuls les documents explicitement publics peuvent être placés dans le dépôt.
Arborescence :

```text
public/documents/results/
└── <result-id>/
    └── <document-id>.<pdf|jpg|jpeg|png>
```

La référence de contenu utilise :

```text
/documents/results/<result-id>/<document-id>.<extension>
```

Procédure :

1. valider l'autorisation et l'absence de donnée privée ;
2. exécuter la validation locale ;
3. créer le dossier du résultat si nécessaire ;
4. copier le fichier sous son identifiant stable ;
5. ajouter les métadonnées au tableau `documents` du résultat ;
6. lancer les contrôles de contenu et la compilation ;
7. vérifier qu'aucun fichier n'est orphelin ;
8. faire relire puis fusionner la modification.

Le remplacement conserve l'identifiant si le document représente la même
pièce. Un nouveau document reçoit un nouvel identifiant. La suppression exige
d'abord le retrait de la référence puis le contrôle des liens ; l'historique
Git conserve les anciennes versions et ne convient donc pas à une pièce privée.

## Métadonnées

Le modèle public conserve :

- `id` ;
- titre français et anglais ;
- chemin public ;
- type MIME ;
- taille ;
- visibilité fixée à `public`.

Le schéma Astro refuse les autres visibilités, les types non autorisés, les
fichiers de plus de 10 Mo et les chemins extérieurs à `/documents/`.

## Documents privés

Les justificatifs non publics, coordonnées, licences, données médicales et
autorisations de mineurs doivent être conservés dans un espace privé validé par
le responsable du club, avec contrôle d'accès, durée de conservation et
procédure de suppression. Ils ne sont référencés dans le site que par une
mention interne non sensible si cela est réellement nécessaire.

Ni un dépôt Git privé ni une URL « difficile à deviner » ne transforment un
fichier en stockage confidentiel adapté.

## Comparaison et recommandation

| Critère | Mode A | Mode B |
|---|---|---|
| Ajout par non-technicien | Meilleur si CMS intégré | Faible sans interface Git |
| Secrets dans le navigateur | Interdits ; fonction requise | Aucun secret côté site |
| Historique | Selon fournisseur | Git |
| Fichiers publics légers | Adapté | Adapté |
| Fichiers privés | Espace privé séparé | Interdit dans le dépôt |
| Dépendance fournisseur | Plus élevée | Faible |
| Mise en œuvre actuelle | Non activée | Arborescence et validation préparées |

Recommandation provisoire : utiliser le dépôt uniquement pour de petits
documents publics approuvés. Si les administrateurs doivent charger des
documents sans accès Git, retenir ultérieurement un mécanisme CMS/stockage
sécurisé après comparaison des coûts. Les pièces privées restent hors des deux
circuits publics.

## Tests

Les tests automatisés couvrent :

- un PDF public valide ;
- les types interdits ;
- une extension incohérente ;
- la limite de 10 Mo ;
- les documents privés ou personnels ;
- les identifiants et doublons ;
- la construction du chemin normalisé.
