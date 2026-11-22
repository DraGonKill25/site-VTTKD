# Contact et protection des données

**Phase :** 2 — spécification UX/RGPD  
**Statut :** durées, destinataires et mentions à valider avant mise en ligne  
**Limite :** ce document ne constitue pas un avis juridique

## 1. Finalité

Le formulaire sert uniquement à recevoir une demande et à y répondre. Il ne
crée pas de compte, n’inscrit pas à une newsletter et ne constitue pas une
inscription sportive.

## 2. Données proposées

| Donnée | Statut | Finalité |
|---|---|---|
| Nom ou nom d’usage | Obligatoire | Identifier l’interlocuteur |
| Adresse électronique | Obligatoire | Répondre à la demande |
| Objet | Obligatoire, liste courte | Orienter le message |
| Message | Obligatoire | Comprendre et traiter la demande |
| Téléphone | Non collecté par défaut | Inutile au parcours minimal |
| Données de l’enfant | Non demandées | Éviter les données de mineurs |
| Pièce jointe | Non proposée | Réduire risques et données inutiles |

L’objet peut proposer : information générale, entraînement, compétition,
médias/droit à l’image, données personnelles, autre.

## 3. Information affichée à l’utilisateur

Près du bouton d’envoi :

- finalité du traitement ;
- destinataires autorisés ;
- durée de conservation validée ;
- caractère obligatoire des champs ;
- lien vers la politique de confidentialité ;
- moyen d’exercer les droits et demander la suppression ;
- avertissement de ne pas transmettre de donnée sensible ou de document
  concernant un mineur.

Une case de consentement n’est pas ajoutée automatiquement. La base juridique
doit être déterminée par le responsable du site selon la finalité. Si une case
est juridiquement requise pour une finalité distincte, elle doit être libre,
spécifique et non précochée.

## 4. Accès

Accès recommandé :

- une boîte fonctionnelle appartenant au club ;
- l’administrateur principal ;
- un ou deux administrateurs éditoriaux désignés.

Les administrateurs sportifs et contributeurs n’accèdent pas aux messages par
défaut. Aucun transfert vers une boîte personnelle ne doit être organisé sans
justification et protection appropriée.

## 5. Conservation proposée

À faire valider par le responsable du traitement :

- message et réponse : 6 mois après le dernier échange, sauf obligation ou
  litige justifiant une durée différente ;
- message relatif aux droits RGPD : durée nécessaire au traitement et à la
  preuve de réponse, à définir avec le responsable ;
- journaux techniques anti-abus : 30 jours maximum proposé ;
- données bloquées comme spam : durée minimale du fournisseur à vérifier.

La suppression doit couvrir la boîte de réception, les dossiers partagés, les
exports, le fournisseur d’envoi et les journaux lorsque cela est applicable.
Une procédure manuelle documentée doit permettre recherche, export et
suppression.

## 6. Mineurs

- Ne pas demander le nom, l’âge, la date de naissance, la licence ou les
  coordonnées d’un enfant.
- Inviter le parent ou représentant légal à fournir ses propres coordonnées.
- Ne pas accepter de document médical, d’autorisation ou de pièce d’identité
  par ce formulaire.
- Rediriger les démarches sensibles vers un canal privé validé par le club.
- Traiter rapidement toute demande de retrait d’une image ou donnée de mineur.

## 7. Protection contre le spam et les abus

Mesures graduées proposées :

1. validation HTML et serveur ;
2. champ piège invisible aux utilisateurs ;
3. délai minimal raisonnable avant envoi ;
4. limite de taille du message ;
5. limitation de débit par signaux techniques minimisés ;
6. réponse générique ne révélant pas l’existence d’une adresse ;
7. Turnstile ou mécanisme équivalent uniquement si le spam persiste.

Aucune clé secrète ne doit être envoyée au navigateur. Les journaux ne doivent
pas contenir le message complet ni l’adresse électronique en clair lorsqu’elle
n’est pas nécessaire.

## 8. UX et accessibilité

- libellés visibles et champs correctement associés ;
- `autocomplete="name"` et `autocomplete="email"` ;
- résumé d’erreurs et erreur près de chaque champ ;
- valeurs conservées après erreur ;
- état d’envoi, succès et indisponibilité annoncés ;
- aucune couleur seule pour signaler une erreur ;
- ordre et largeur utilisables à 320 px ;
- aucune transmission dans le prototype de Phase 2.

## 9. Informations à fournir par le club

- identité légale exacte et coordonnées du responsable du traitement ;
- adresse fonctionnelle destinataire ;
- personnes habilitées ;
- durées définitives ;
- base juridique retenue ;
- coordonnées du contact pour les droits ;
- fournisseur d’envoi et localisation des traitements ;
- procédure de suppression et réponse aux demandes ;
- politique particulière pour les demandes liées aux mineurs.

## 10. Mentions à faire valider avant mise en ligne

- mentions légales de l’éditeur ;
- politique de confidentialité complète ;
- sous-traitants et transferts éventuels ;
- cookies/traceurs réellement utilisés ;
- droits d’accès, rectification, effacement, limitation et opposition selon le
  traitement ;
- droit de réclamation auprès de l’autorité compétente ;
- version et date de mise à jour de la politique.

Le prototype peut montrer l’emplacement et la hiérarchie de ces informations,
mais ne doit pas inventer l’identité légale, l’adresse ou les coordonnées du
club.

