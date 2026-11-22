# Périmètre du POC public

**Date de l'audit :** 22 novembre 2026  
**Statut :** PRÉPARATION LOCALE — NON PUBLIÉ  
**Finalité :** démonstration temporaire avant la réunion du club

## Audit Git

- dépôt Git local initialisé sur `main` ;
- aucun commit et donc aucun historique à publier ou à auditer ;
- aucun remote GitHub configuré ;
- tous les fichiers du projet sont actuellement non suivis ;
- aucune URL GitHub Pages ne peut être déterminée à ce stade.

Le premier commit, le remote, la visibilité du dépôt et la publication restent
soumis à une autorisation distincte du propriétaire.

## Secrets, données personnelles et documents

- `node scripts/phase4-security-check.mjs` : 197 fichiers texte analysés,
  aucun motif de secret et aucune fixture sportive non marquée `demo` ;
- `npm audit --audit-level=high` : aucune vulnérabilité connue ;
- seul `.env.example` existe ; il ne contient aucun secret ;
- `public/documents/results/` ne contient qu'un fichier `.gitkeep` ;
- aucun document, téléversement, message de contact ou donnée personnelle
  réelle n'est inclus dans le périmètre public ;
- le formulaire de contact valide uniquement dans le navigateur et ne
  transmet rien.

Le scan automatisé ne constitue pas une garantie absolue. Il devra être relancé
sur les fichiers réellement suivis et sur tout l'historique après création du
dépôt distant, avant autorisation de publication.

## Contenus de démonstration

Les athlètes, compétitions, résultats, événements, actualités, horaires et
exceptions présents dans `src/content/` sont fictifs et marqués `demo`.

Les pages publiques affichent déjà des avertissements de démonstration. Le POC
ajoute une bannière persistante indiquant :

> POC — Version de démonstration non officielle

Les horaires restent dans un état vide explicite. Aucun contenu fictif ne doit
être présenté comme une information officielle du club.

## Ressources et droits

- `logo.jpg` est la seule image intégrée ;
- aucune photographie d'athlète n'est publiée ;
- aucun lecteur vidéo ou contenu tiers incorporé n'est chargé ;
- Instagram et YouTube restent de simples liens externes.

Pour cette préparation, le logo et les liens sociaux ont été indiqués comme
autorisés pour le POC. La checklist exige néanmoins une confirmation finale du
propriétaire avant publication publique.

## Pages incluses

- accueil ;
- club et encadrement ;
- disciplines, Kyorugi et Poomsae ;
- athlètes et profils fictifs ;
- compétitions fictives et résultats associés ;
- résultats et palmarès de démonstration ;
- horaires avec état vide ;
- calendrier, actualités et médias de démonstration ;
- contact sans transmission ;
- mentions légales et confidentialité provisoires.

Le site reste bilingue sous `/fr/` et `/en/`, avec priorité visuelle et
éditoriale au Kyorugi.

## Éléments exclus de l'artefact public

- `/admin/`, `/admin/results/` et `/admin/documents/` ;
- fichiers privés ou personnels ;
- photographies sans autorisation ;
- fonctions d'envoi, d'upload, de CMS ou d'authentification ;
- documents sportifs ;
- secrets et variables d'environnement privées.

Le build POC doit échouer si un fichier ou un lien administratif subsiste dans
`dist/`.

## Hébergement prévu

Le POC est préparé pour une URL de projet GitHub Pages de la forme :

`https://<propriétaire>.github.io/<dépôt>/`

La configuration reste paramétrable tant que le propriétaire et le nom du
dépôt ne sont pas confirmés. Aucun `CNAME`, domaine personnalisé, DNS, compte,
abonnement ou service payant n'est prévu.

L'indexation reste désactivée. `noindex` réduit le risque d'indexation mais ne
protège pas l'accès : toute personne disposant de l'URL pourra consulter le
POC.

## Conclusion d'audit

Le contenu local ne présente pas de secret, donnée personnelle ou document
privé détecté. Les blocages avant publication sont :

1. autorisation explicite du propriétaire ;
2. confirmation finale des ressources publiables ;
3. création et audit de l'historique Git réel ;
4. choix du dépôt GitHub et de sa visibilité ;
5. réussite des tests du build POC sans routes administratives.
