# Limites connues — Phase 3

## Contenus et identité

- aucun horaire, athlète, résultat, compétition, actualité ou événement réel
  n'a été fourni ;
- les fixtures sont fictives et marquées comme démonstration ;
- les textes institutionnels, l'encadrement et les coordonnées sont à fournir ;
- le logo disponible reste un JPEG 160 × 160 sans version vectorielle ;
- les photographies et vidéos d'athlètes ne sont pas intégrées.

## Administration

- Pages CMS est configuré mais n'a pas été connecté à un dépôt distant ;
- aucun compte réel n'a été créé ;
- Pages CMS ne garantit pas la séparation Sport/Éditorial/Contributeur ;
- les opérations désactivées le sont par collection, pas par personne ;
- le récapitulatif obligatoire des résultats n'est pas une fonction native de
  Pages CMS ;
- `/admin/` est un prototype local sans authentification ;
- les modifications de résultats sont stockées dans `localStorage`, sans
  synchronisation, sauvegarde ou garantie d'intégrité ;
- l'historique local n'est ni signé ni immuable ;
- les fixtures initiales reconstruisent uniquement une entrée de création.

## Résultats et compétitions

- le contenu publié reste normalisé par `competitionId` ;
- l'écran local présente aussi nom, date et lieu pour le récapitulatif, mais ne
  modifie pas le fichier de compétition ;
- le raccordement CMS devra traiter une correction de compétition partagée
  sans recopier ni diverger les métadonnées ;
- les règles de classement/médaille supposent or 1, argent 2 et bronze 3 ; une
  compétition appliquant une règle différente demandera une extension validée.

## Contact et confidentialité

- aucun message n'est envoyé ;
- aucun destinataire ou fournisseur n'est configuré ;
- la validation et l'anti-spam sont uniquement côté client ;
- la base juridique, les durées de conservation et la procédure de suppression
  ne sont pas validées ;
- les mentions légales et la politique de confidentialité sont incomplètes ;
- le nom légal, le responsable de publication et l'hébergeur sont inconnus.

## Documents et médias

- l'interface documentaire valide les métadonnées mais ne charge aucun fichier ;
- aucun stockage externe, quota ou coût n'est choisi ;
- le contrôle du type réel devra être répété côté serveur ;
- aucun mécanisme privé de conservation des justificatifs n'est configuré ;
- les liens Instagram et YouTube sont fournis, mais leur propriété et les
  droits de réutilisation de chaque contenu restent à confirmer ;
- aucun lecteur vidéo tiers n'est intégré.

## SEO et mise en ligne

- le domaine cible n'est pas acquis ;
- les canonical utilisent l'origine de développement ;
- l'indexation est désactivée par défaut ;
- aucun sitemap de production n'est généré ;
- aucun déploiement, DNS, certificat ou en-tête d'hébergement n'est configuré ;
- aucune donnée structurée d'organisation n'est publiée faute d'informations
  officielles vérifiées.

## Git et exploitation

- Git est initialisé sur `main`, mais aucun commit ni dépôt distant n'existe ;
- aucune CI distante, protection de branche ou règle de revue n'est active ;
- les conflits simultanés de cinq éditeurs ne sont pas testés ;
- les procédures de sauvegarde, restauration et révocation restent à tester
  avec les services retenus.

## Tests

- les fonctions métier, types, compilation et liens sont testés ;
- les interactions client ne disposent pas encore de tests E2E navigateur ;
- le responsive du site Astro n'a pas reçu la campagne visuelle multi-largeurs
  prévue pour la Phase 4 ;
- lecteur d'écran, axe, Lighthouse, zoom 200 % et tests multi-navigateurs
  restent à réaliser.

Ces limites empêchent de considérer le site comme prêt pour la production,
mais pas comme prêt pour la Phase 4 — tests et validation.
