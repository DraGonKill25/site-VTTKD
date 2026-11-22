# Décisions visuelles — Phase 2

**Statut global :** à valider par le club  
**Références :** `docs/BRAND_IDENTITY.md`, `docs/DESIGN_SYSTEM.md`

## 1. Lecture des statuts

- **Confirmé dans les ressources :** constat vérifiable, sans signifier qu’une
  charte officielle complète a été fournie.
- **Provisoire :** choix de maquette réversible.
- **À valider :** décision visible qui appartient au club.

## 2. Registre des décisions

| Élément | Statut | Décision de Phase 2 |
|---|---|---|
| Logo raster 160 × 160 | Confirmé dans les ressources | Petit affichage uniquement |
| Logo vectoriel | À valider/fournir | SVG original nécessaire avant production |
| Bleu nuit et blanc | Provisoire mesuré | Base `#04042E` / `#F9F9FA` |
| Accent chaud | Provisoire | `#F3A712`, jamais présenté comme officiel |
| Concept | À valider | « Maîtrise en mouvement » |
| Titres | Provisoire | Barlow Condensed avec repli système |
| Texte/interface | Provisoire | Inter avec repli système |
| Priorité disciplinaire | À valider | Kyorugi principal, Poomsae complet |
| Photographies | Non disponibles | Formes fictives dans le prototype |
| Animations | Provisoire | 150–250 ms, réduction respectée |
| Cartes résultats | Provisoire | Rang/médaille, participant, compétition, catégorie |
| Palmarès | Provisoire | Chiffres, périmètre et mention fictive visibles |

## 3. Contrastes vérifiés sur la palette provisoire

- bleu nuit sur papier : 18,79:1 ;
- bleu nuit sur accent : 9,74:1 ;
- accent sur papier : 1,93:1, interdit pour du texte ;
- texte secondaire sur papier : 5,68:1 ;
- blanc sur orange sombre : 5,67:1 ;
- focus orange sombre sur blanc : 4,67:1.

Ces mesures répondent aux usages textuels indiqués dans le design system, mais
devront être refaites si la palette change.

## 4. Hiérarchie

- Un seul H1 par page.
- Kyorugi est présenté avant Poomsae dans l’accueil et la navigation de
  discipline.
- Poomsae conserve une page, des filtres, des résultats et une présentation
  propres.
- Le classement et la médaille sont lisibles sans dépendre de la couleur.
- Les contenus longs restent dans une largeur de lecture limitée.

## 5. Composants clés

### Boutons et liens

- action principale orange avec texte bleu nuit ;
- action secondaire bordée ;
- libellé décrivant l’effet réel ;
- focus visible ;
- cible tactile proche de 44 px ;
- pas de lien uniquement distingué par la couleur.

### Compétitions

- date, lieu, statut et discipline immédiatement visibles ;
- Kyorugi/Poomsae libellés textuellement ;
- détail accessible sans survol ;
- carte à une colonne à 320/390 px.

### Résultats

- tableau sur grand écran et cartes équivalentes sur mobile ;
- aucun champ essentiel supprimé sur mobile ;
- médaille accompagnée du métal et du rang ;
- résultat sans médaille traité comme une participation, pas un échec.

### Athlètes

- photographie uniquement si autorisée ;
- silhouette neutre sinon ;
- aucune date de naissance, adresse, licence ou coordonnée privée ;
- résultats dérivés des seules données publiées.

### Palmarès

- totaux calculés et périmètre affiché ;
- séparation Kyorugi/Poomsae ;
- équipes comptées une fois ;
- toutes les valeurs de prototype marquées fictives.

## 6. Responsive

### 1440 px

Navigation complète, conteneur limité, tableaux lisibles et images immersives
sans étirer les textes.

### 834 px

Grilles de deux colonnes selon le contenu et administration utilisable sans
perte de libellé.

### 390 px

Une colonne, menu explicite, cartes de résultats complètes et actions
accessibles.

### 320 px

Ordre de lecture conservé, aucun débordement horizontal de page, contrôles
empilés et textes longs autorisés à revenir à la ligne.

## 7. Ressources nécessaires avant production

- SVG ou source vectorielle officielle ;
- PNG transparent haute définition ;
- variantes monochrome/fond clair/fond sombre ;
- palette et polices officielles si elles existent ;
- photographies originales autorisées ;
- crédits et autorisations, notamment pour les mineurs ;
- règles partenaires et cohabitation des logos.

Une vectorisation automatique du JPEG ne constitue pas un original officiel.

## 8. Décisions club

Le club doit valider le nom affiché, la palette, l’accent, les typographies, le
concept, la hiérarchie Kyorugi/Poomsae et le style des cartes. Les autres
détails de mise en œuvre peuvent rester à la charge de l’équipe de
développement tant qu’ils respectent ces décisions.

