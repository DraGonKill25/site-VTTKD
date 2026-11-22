# Contact, médias et confidentialité — Phase 3

## Formulaire de contact

Le formulaire français et anglais collecte uniquement :

- nom ;
- adresse e-mail ;
- objet ;
- message.

Aucun téléphone, adresse postale, date de naissance, licence ou donnée
concernant un mineur n'est demandé. Aucune case de consentement générique n'est
ajoutée : la base juridique et les mentions devront être validées pour le
traitement réellement retenu.

## Validation et anti-spam

La validation locale contrôle les longueurs, le format de l'e-mail et la taille
maximale de 5 000 caractères. Un champ piège et un délai minimal de trois
secondes bloquent des soumissions automatisées simples.

Ces contrôles client ne suffisent pas pour la production. Le futur endpoint
devra répéter la validation, limiter le débit, contrôler l'origine et la taille
de la requête, retourner des messages sans fuite d'information et ne conserver
que les journaux strictement nécessaires.

## Envoi désactivé

Le bouton vérifie le message et affiche une confirmation explicite indiquant
qu'aucun envoi n'a eu lieu. Aucun destinataire, fournisseur, secret ou endpoint
n'est configuré.

Avant activation, le club doit valider :

- l'adresse destinataire ;
- les personnes autorisées à consulter la boîte ;
- le fournisseur et le lieu de traitement ;
- la base juridique et les informations à afficher ;
- la durée de conservation dans l'endpoint, les journaux, le fournisseur et
  la boîte de réception ;
- la procédure de suppression et de réponse aux demandes ;
- le niveau d'anti-spam proportionné.

## Médias

Le modèle conserve type, source, titre, description, texte alternatif, crédit,
statut des droits et statut de publication. La page publique exclut tout média
non publié ou dont les droits ne sont pas `approved`.

La seule image affichée est le logo fourni dans le projet. Aucune photo
d'athlète n'est ajoutée. Les canaux Instagram et YouTube fournis sont proposés
par liens directs ; aucun lecteur tiers, cookie ou suivi n'est chargé
automatiquement.

Les photographies de mineurs exigent une autorisation adaptée, conservée hors
du dépôt. Une procédure de retrait doit supprimer la source publique, lancer
une nouvelle compilation et, si nécessaire, purger le cache de l'hébergeur.

## État juridique

Les pages Mentions légales et Politique de confidentialité existent en français
et en anglais, mais restent marquées comme documents de préparation. Le nom
légal de l'association, le responsable de publication, les coordonnées,
l'hébergeur et les durées définitives ne sont pas connus. Elles ne doivent pas
être considérées comme prêtes pour la production.

## Tests

Les tests unitaires vérifient :

- un message valide ;
- les quatre erreurs de champs ;
- le champ piège ;
- la soumission trop rapide ;
- la limite de longueur.

L'envoi réel, la délivrabilité, la limitation de débit serveur et la suppression
chez un fournisseur restent non vérifiés puisqu'aucun service n'est activé.
