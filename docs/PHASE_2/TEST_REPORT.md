# Rapport de tests du prototype — Phase 2

**Date :** 7 novembre 2026  
**Périmètre :** prototype HTML/CSS/JavaScript autonome  
**Hors périmètre :** CMS, authentification, API, stockage, déploiement

## 1. Environnement

- Windows 10 ;
- Microsoft Edge headless ;
- Node.js pour la validation syntaxique et les fixtures ;
- ouverture locale `file://` ;
- contenus exclusivement fictifs.

## 2. Résultat global

Le prototype est exploitable pour une revue humaine de Phase 2. Les écrans
publics, l’administration et le parcours de résultat sont disponibles en FR/EN.
Les contrôles automatiques et les captures représentatives n’ont révélé aucune
erreur JavaScript bloquante.

La matrice exhaustive écran × langue × largeur × état n’a pas été photographiée
intégralement : les écrans ont été inspectés dans le code et un échantillon
visuel a été capturé. Un test avec lecteur d’écran réel et une validation
juridique ne sont pas effectués.

## 3. Contrôles techniques

| Contrôle | Résultat | Preuve |
|---|---|---|
| Syntaxe `prototype.js` | Réussi | `node --check` |
| Syntaxe `demo-content.js` | Réussi | `node --check` |
| Identifiants de fixtures uniques | Réussi | 6 résultats, aucun doublon |
| Filtre palmarès | Réussi | 3 publiés sur 6 |
| Médailles publiées | Réussi | 2 (1 or, 1 argent, 0 bronze) |
| Kyorugi / Poomsae | Réussi | 2 / 1 participations |
| Compétitions distinctes | Réussi | 3 |
| Résultat d’équipe publié | Réussi | 1 résultat = 1 participation |
| Statuts exclus | Réussi | brouillon, archivé, annulé |
| Recherche de secrets | Réussi | aucun motif détecté |
| Ancienne hypothèse 8–10 | Réussi | plus aucune hypothèse opérationnelle ; mentions historiques seulement |
| Diagnostics IDE | Réussi | aucun diagnostic au moment de la revue |

## 4. Écrans publics

| Écran | FR | EN | États pertinents | Responsive |
|---|---:|---:|---|---:|
| Accueil | Réussi | Réussi | normal | Réussi |
| Club/encadrement | Réussi | Réussi | normal | Réussi |
| Disciplines | Réussi | Réussi | normal | Réussi |
| Kyorugi | Réussi | Réussi | normal/vide/erreur | Réussi |
| Poomsae | Réussi | Réussi | normal/vide/erreur | Réussi |
| Athlètes/profil | Réussi | Réussi | normal/vide/manquant/erreur | Réussi |
| Compétitions/détail | Réussi | Réussi | normal/vide/manquant/erreur | Réussi |
| Résultats | Réussi | Réussi | normal/vide/manquant/erreur | Réussi |
| Palmarès | Réussi | Réussi | normal/vide/manquant/erreur | Réussi |
| Calendrier | Réussi | Réussi | normal/vide/manquant/erreur | Réussi |
| Actualités | Réussi | Réussi | normal/vide/manquant/erreur | Réussi |
| Médias | Réussi | Réussi | normal/vide/manquant/erreur | Réussi |
| Contact | Réussi | Réussi | normal/erreur/succès | Réussi |
| Utilitaires | Réussi | Réussi | normal/manquant | Réussi |

## 5. Écrans administratifs

| Écran | FR | EN | Résultat |
|---|---:|---:|---|
| Connexion | Réussi | Réussi | Maquette, aucune authentification |
| Tableau de bord | Réussi | Réussi | États normal/vide/manquant/erreur |
| Gestion contenus | Réussi | Réussi | Liste fictive |
| Gestion athlètes | Réussi | Réussi | Liste fictive |
| Gestion compétitions | Réussi | Réussi | Liste fictive |
| Liste résultats | Réussi | Réussi | Tous statuts, actions accessibles |
| Création résultat | Réussi | Réussi | Formulaire complet |
| Confirmation création | Réussi | Réussi | Récapitulatif séparé |
| Fiche résultat | Réussi | Réussi | Accès modification/historique |
| Modification | Réussi | Réussi | Tous champs principaux |
| Confirmation modification | Réussi | Réussi | Comparaison avant/après |
| Historique | Réussi | Réussi | Dates, comptes et actions fictifs |
| Permissions | Réussi | Réussi | 4 rôles, 5–6 comptes |

## 6. Parcours résultats

### Création

- « Vérifier les informations » ne sauvegarde pas ;
- les erreurs conservent les valeurs et déplacent le focus vers le résumé ;
- retour au formulaire sans perte ;
- confirmation explicite ;
- annulation disponible ;
- succès annoncé.

### Modification

- ouverture par identifiant stable ;
- tous les champs importants modifiables ;
- comparaison des valeurs ;
- annulation vers la fiche inchangée ;
- remplacement par identifiant, sans ajout d’une copie ;
- historique enrichi ;
- résultats publics et palmarès recalculés si le statut est publié.

La mémoire est réinitialisée au rechargement, ce qui est clairement annoncé.

## 7. Largeurs vérifiées

| Largeur du cadre | Cas représentatifs | Résultat |
|---:|---|---|
| 1440 px | Accueil FR, confirmation EN | Réussi |
| 834 px | Poomsae EN, permissions FR | Réussi |
| 390 px | Résultats FR, création résultat FR | Réussi |
| 320 px | Contact erreur EN, historique EN | Réussi |

Les cadres 390/320 ont été capturés dans une fenêtre plus large pour éviter la
largeur minimale imposée par Edge headless ; la mise en page testée reste celle
du conteneur sélectionné. Les tableaux de permissions et la navigation admin
utilisent un défilement interne, sans imposer un débordement à la page.

## 8. Accessibilité et ergonomie

Vérifié par inspection et interaction :

- lien d’évitement ;
- landmarks et H1 ;
- libellés visibles ;
- messages d’erreur textuels et `aria-invalid` ;
- résumé d’erreurs focalisable ;
- région `aria-live` ;
- fermeture du menu avec Échap et restitution du focus ;
- dialogue média avec restitution du focus ;
- réduction des animations ;
- médailles avec texte et rang ;
- cartes mobiles équivalentes au tableau ;
- focus visible ;
- contrastes documentés.

Non vérifié :

- lecteur d’écran réel NVDA/JAWS/VoiceOver ;
- navigation complète avec reconnaissance vocale ;
- audit automatisé axe/Lighthouse ;
- zoom navigateur réel à 200 % dans plusieurs moteurs.

Ces limites n’empêchent pas la validation des maquettes, mais devront être
testées pendant la Phase 4 sur l’implémentation réelle.

## 9. Bilinguisme

- changement FR/EN disponible sur tous les écrans ;
- faits sportifs partagés et libellés traduits ;
- écran de traduction manquante explicite ;
- aucune traduction automatique ;
- noms fictifs clairement identifiés.

La qualité éditoriale finale des traductions anglaises reste à valider par une
personne désignée par le club.

## 10. Protection des données

- le formulaire ne transmet aucune donnée ;
- aucune adresse personnelle ;
- aucune donnée réelle de mineur ;
- aucune pièce jointe ;
- case d’information non utilisée comme condition de validation ;
- sources fictives `demo://` ;
- aucun secret dans les fichiers.

## 11. Captures

Les captures se trouvent dans `design/phase-2/snapshots/` :

- `home-fr-1440.png` ;
- `kyorugi-fr-1440.png` ;
- `poomsae-en-834.png` ;
- `results-fr-390.png` ;
- `honours-fr-834.png` ;
- `contact-en-error-320.png` ;
- `permissions-fr-834.png` ;
- `result-list-fr-834.png` ;
- `result-create-fr-390.png` ;
- `result-confirm-en-1440.png` ;
- `result-edit-confirm-fr-834.png` ;
- `result-history-en-320.png`.

Les trois captures initiales `snapshot-home-desktop.png`,
`snapshot-results-mobile.png` et `snapshot-admin-tablet.png` sont conservées.

## 12. Conclusion de test

Les contrôles nécessaires à une revue humaine de Phase 2 sont réussis. Les
tests de technologie de production, CMS, sécurité serveur et persistance sont
hors périmètre et n’ont pas été simulés.

