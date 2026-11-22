# Design system provisoire — VAN THUYNE TAEKWONDO / ELITE

**Phase :** 2 — proposition visuelle  
**Statut :** non officiel, à valider  
**Référence :** `docs/BRAND_IDENTITY.md`

## 1. Principes

Le système visuel traduit le concept « Maîtrise en mouvement » :

- stabilité et exigence par le bleu nuit ;
- précision et lisibilité par les surfaces claires ;
- énergie par un accent chaud limité ;
- photographie sportive authentique lorsque les droits sont validés ;
- données et résultats organisés avec rigueur ;
- mouvement discret, jamais nécessaire à la compréhension.

Le design doit rester identifiable sans recopier les motifs internes du logo.
Le yin-yang et les silhouettes du sceau ne sont pas extraits comme éléments
décoratifs.

## 2. Statut des choix

### Vérifié

- logo circulaire bleu nuit et blanc ;
- symbole central, silhouettes et mentions du club ;
- logo raster disponible en 160 × 160 pixels ;
- présence d’un orange soutenu sur la bannière YouTube observée.

### Provisoire

- valeurs hexadécimales ;
- accent chaud ;
- familles typographiques ;
- rayons, espacements et grille ;
- iconographie ;
- traitements photographiques.

### À valider par le club

- graphie officielle du nom, mentions ELITE et GENTILLY ;
- couleurs et typographies officielles ;
- concept « Maîtrise en mouvement » ;
- priorité visuelle du Kyorugi ;
- logo vectoriel et variantes.

Le prototype affiche ces choix pour validation, sans les présenter comme une
charte officielle. Voir `docs/PHASE_2/DESIGN_DECISIONS.md`.

## 3. Couleurs

### Palette principale provisoire

- `--color-brand-900: #04042E` — bleu nuit issu de l’échantillonnage du logo.
- `--color-brand-800: #0B1238` — surface sombre secondaire.
- `--color-brand-700: #171D4A` — interaction sombre.
- `--color-paper: #F9F9FA` — blanc légèrement cassé observé.
- `--color-white: #FFFFFF` — texte ou surface technique.
- `--color-ink: #111322` — texte principal sur fond clair.
- `--color-muted: #5C6470` — texte secondaire.
- `--color-line: #D7DAE2` — bordures.
- `--color-surface: #FFFFFF` — cartes.
- `--color-surface-muted: #F1F2F6` — zones secondaires.

### Accent provisoire

- `--color-accent: #F3A712` — orange doré.
- `--color-accent-strong: #B1440E` — orange sombre pour texte ou état fort.
- `--color-focus: #C54F0A` — indicateur de focus contrasté.

Règles :

- l’accent principal porte du texte bleu nuit, jamais blanc ;
- l’accent ne colore pas de longs textes ;
- l’orange sombre peut porter du texte blanc ;
- aucun résultat sportif ne dépend de l’accent.

### Couleurs fonctionnelles

- `--color-success: #1F7A4D`
- `--color-warning: #8A5A00`
- `--color-error: #B42318`
- `--color-info: #2457A6`

Chaque état associe une icône, un titre et un texte.

### Médailles

- `--color-medal-gold: #7A5B00`
- `--color-medal-silver: #667085`
- `--color-medal-bronze: #9A5A2E`

La médaille est toujours accompagnée de :

- son nom ;
- son rang ;
- une forme ou une icône ;
- un texte accessible.

### Contrastes mesurés

Mesures indicatives WCAG sur les couleurs provisoires :

- bleu nuit `#04042E` sur papier `#F9F9FA` : 18,79:1 ;
- bleu nuit `#04042E` sur accent `#F3A712` : 9,74:1 ;
- accent `#F3A712` sur papier `#F9F9FA` : 1,93:1, combinaison interdite pour
  du texte ;
- texte secondaire `#5C6470` sur papier `#F9F9FA` : 5,68:1 ;
- blanc sur orange sombre `#B1440E` : 5,67:1.
- focus `#C54F0A` sur blanc : 4,67:1 et sur bleu nuit : environ 4,1:1 ;
- médaille or textuelle `#7A5B00` sur blanc : environ 6,3:1.

Ces mesures devront être refaites lorsque les couleurs officielles seront
fournies.

## 4. Typographie

### Familles proposées

Titres, chiffres et labels sportifs :

```css
font-family: "Barlow Condensed", "Arial Narrow", sans-serif;
```

Texte courant et interface :

```css
font-family: "Inter", "Segoe UI", Arial, sans-serif;
```

Le prototype fonctionne sans télécharger de police. La Phase 3 décidera si les
fichiers de police sont auto-hébergés.

### Échelle

- Display : `clamp(2.5rem, 7vw, 5.5rem)`, ligne 0,95.
- H1 : `clamp(2.25rem, 5vw, 4rem)`, ligne 1.
- H2 : `clamp(1.75rem, 3vw, 2.75rem)`, ligne 1,05.
- H3 : `clamp(1.25rem, 2vw, 1.625rem)`, ligne 1,15.
- Lead : `clamp(1.0625rem, 1.5vw, 1.25rem)`, ligne 1,55.
- Corps : `1rem`, ligne 1,6.
- Petit : `0.875rem`, ligne 1,45.
- Label : `0.75rem`, capitales espacées uniquement pour des textes courts.

### Règles

- Un H1 par page.
- Aucune capitale intégrale sur un paragraphe.
- Ligne de lecture de 55 à 75 caractères.
- Chiffres tabulaires pour résultats et dates.
- Graisse 600 ou 700 pour titres, 400 à 600 pour le corps.
- Les mots anglais longs sont testés avant validation.

## 5. Espacement

Base : 4 pixels.

- `--space-1: 0.25rem`
- `--space-2: 0.5rem`
- `--space-3: 0.75rem`
- `--space-4: 1rem`
- `--space-5: 1.5rem`
- `--space-6: 2rem`
- `--space-7: 3rem`
- `--space-8: 4rem`
- `--space-9: 6rem`

Les composants utilisent cette échelle. Aucun espacement arbitraire n’est
introduit sans justification.

## 6. Grille et conteneurs

### Conteneurs

- contenu principal : maximum 1200 px ;
- article : maximum 720 px ;
- formulaires : maximum 760 px ;
- gouttière mobile : 16 px ;
- gouttière tablette : 24 px ;
- gouttière bureau : 32 px.

### Points de rupture du prototype

- mobile : moins de 640 px ;
- tablette : 640 à 959 px ;
- bureau : 960 px et plus ;
- grand écran : 1280 px et plus.

Ces seuils répondent au contenu plutôt qu’à un appareil précis.

### Grille

- mobile : 4 colonnes conceptuelles ;
- tablette : 8 colonnes ;
- bureau : 12 colonnes ;
- espacement entre colonnes : 16 à 24 px.

## 7. Formes et surfaces

### Rayons

- petit : 4 px ;
- contrôle : 8 px ;
- carte : 12 px ;
- pastille : 999 px.

Le logo circulaire ne justifie pas une interface composée uniquement de
pastilles.

### Bordures

- 1 px pour séparateurs et cartes ;
- 2 px pour focus et contrôles sélectionnés ;
- 3 px maximum pour accents structurants.

### Ombres

Les ombres sont rares et réservées aux panneaux superposés :

```css
box-shadow: 0 12px 30px rgb(4 4 46 / 0.16);
```

Les cartes ordinaires utilisent une bordure et non une ombre.

## 8. Iconographie

- tracé simple ;
- épaisseur cohérente ;
- taille minimale visuelle de 20 px ;
- libellé textuel pour toute action non universelle ;
- `aria-hidden="true"` pour une icône décorative ;
- aucun symbole du logo redessiné.

La Phase 3 choisira une source d’icônes ou des SVG internes limités. Aucune
bibliothèque n’est ajoutée pendant la Phase 2.

## 9. Photographie et illustrations

### Photographies finales

- club et événements réels uniquement ;
- autorisations vérifiées ;
- priorité visuelle au Kyorugi avec une couverture complète du Poomsae ;
- crédit et alternative ;
- point focal pour recadrage ;
- colorimétrie cohérente ;
- aucun filtre spectaculaire.

### Prototype

- formes géométriques ;
- silhouettes abstraites sans visage ;
- mention « Emplacement média autorisé » ;
- aucun contenu social téléchargé.

### Ratios

- hero : 16/9 ou cadrage éditorial large ;
- carte actualité : 3/2 ;
- profil : 4/5 ;
- galerie : ratio natif avec emprise réservée.

## 10. Mouvement

- interaction courte : 150 ms ;
- panneau/menu : 200 à 250 ms ;
- courbe : `cubic-bezier(.2, .8, .2, 1)` ;
- aucune parallaxe ;
- aucun autoplay ;
- aucune animation infinie.

Avec `prefers-reduced-motion: reduce` :

- transitions ramenées à une durée quasi nulle ;
- défilement non animé ;
- aucun mouvement décoratif.

## 11. Focus

Style proposé :

```css
outline: 3px solid #C54F0A;
outline-offset: 3px;
```

Sur fond accent, le focus utilise le bleu nuit, avec un halo blanc lorsque le
fond extérieur est également sombre. Le contraste bleu nuit/accent est 9,74:1.
L’orange clair `#F3A712` n’est pas utilisé comme anneau de focus sur fond blanc.
Le focus n’est jamais supprimé sans remplacement.

## 12. Composants

### 12.1 Bannière de prototype

- toujours visible dans la Phase 2 ;
- indique « contenu fictif » ;
- n’existera pas en production ;
- contraste fort et texte court.

### 12.2 En-tête

États :

- bureau ;
- mobile fermé ;
- mobile ouvert ;
- sous-menu ouvert ;
- langue courante.

Exigences :

- logo petit ;
- nom textuel ;
- navigation clavier ;
- action Résultats visible ;
- menu mobile avec `aria-expanded`.

### 12.3 Boutons

**Primaire**

- fond accent ;
- texte bleu nuit ;
- action principale unique par zone.

**Secondaire**

- fond transparent ;
- bordure bleu nuit ou claire selon surface ;
- action alternative.

**Texte**

- lien avec soulignement au survol et au focus ;
- pas de couleur seule.

États : repos, survol, focus, actif, désactivé, chargement.

Hauteur minimale : 44 px pour les actions principales.

### 12.4 Liens

- soulignement visible dans les paragraphes ;
- indication externe textuelle ou iconographique accessible ;
- pas de cible vide ;
- état courant avec `aria-current`.

### 12.5 Pastilles et badges

Utilisations autorisées :

- discipline ;
- statut ;
- catégorie ;
- médaille.

Une pastille ne remplace pas un bouton. Les statuts utilisent un libellé
explicite.

### 12.6 Cartes

Types :

- discipline ;
- actualité ;
- événement ;
- athlète ;
- compétition ;
- résultat.

Règles :

- titre de niveau cohérent ;
- lien principal clair ;
- zone entière cliquable uniquement si les liens internes restent valides ;
- information essentielle visible sans survol ;
- média facultatif.

### 12.7 Résultat

Ordre :

1. médaille et rang ;
2. participant ;
3. compétition ;
4. discipline/catégorie ;
5. date et lieu.

Bureau : tableau sémantique si comparaison.  
Mobile : cartes, avec les mêmes champs et libellés.

### 12.8 Statistiques

- chiffre ;
- libellé ;
- périmètre ;
- mention « Exemple fictif » dans le prototype ;
- aucune animation de compteur nécessaire.

### 12.9 Filtres

- groupe avec légende ;
- état sélectionné visible ;
- bouton Réinitialiser ;
- nombre de résultats annoncé ;
- panneau mobile non modal si possible ;
- conservation des choix au retour.

### 12.10 Formulaires

Structure :

- label ;
- champ ;
- aide ;
- erreur ;
- compteur si nécessaire.

Règles :

- aucun placeholder utilisé comme seul libellé ;
- `autocomplete` pertinent ;
- erreurs après validation sans effacer les valeurs ;
- résumé d’erreurs en tête ;
- texte de confidentialité près de l’envoi.

### 12.11 Navigation par onglets

Usage limité à :

- langues FR/EN dans l’administration ;
- vues Aperçu/Données ;
- aucune navigation principale.

Clavier conforme au motif d’onglets ou remplacement par simples liens si le
comportement complet n’est pas nécessaire.

### 12.12 Tableau

- en-têtes explicites ;
- légende ou titre ;
- tri annoncé ;
- aucune cellule essentielle vide sans libellé ;
- alternative mobile complète ;
- pas de défilement horizontal de page.

### 12.13 Galerie

- grille responsive ;
- bouton d’ouverture ;
- dialogue avec titre et fermeture ;
- navigation clavier ;
- focus restauré ;
- légende et crédit ;
- aucune lecture automatique.

### 12.14 Vidéo

- miniature locale ou autorisée ;
- bouton « Charger la vidéo » ;
- durée si connue ;
- lien direct YouTube ;
- iframe créée après action.

### 12.15 Alertes

Niveaux :

- information ;
- succès ;
- avertissement ;
- erreur.

L’alerte contient un titre, un texte et une action éventuelle. La couleur seule
ne porte jamais le niveau.

### 12.16 États vides

Un état vide explique :

- ce qui est absent ;
- pourquoi si cette information est publique ;
- l’action suivante possible ;
- les filtres actifs le cas échéant.

### 12.17 Administration

Composants spécifiques :

- barre latérale de collections ;
- état Brouillon/À relire/Prêt/Publié ;
- indicateur FR/EN ;
- panneau de validation ;
- résumé des droits ;
- aperçu responsive ;
- comparaison de versions ;
- message de conflit.

Ces motifs expriment le besoin, pas l’apparence exacte du CMS retenu.

## 13. Discipline et résultats

### Kyorugi (Combat)

- label principal « Kyorugi », complété par « Combat » lorsque le contexte
  grand public le nécessite ;
- catégorie de poids ;
- catégorie d’âge ;
- nombre de combats uniquement s’il est fourni ;
- aucun champ Poomsae.

### Poomsae

- label « Poomsae » ;
- individuel, paire ou équipe ;
- catégorie ;
- type de Poomsae si la donnée est officielle ;
- aucun champ de poids.

### Hiérarchie des médailles

Les trois métaux sont visibles sans réduire les autres classements. Un résultat
sans médaille reste lisible et ne reçoit pas un style d’échec.

## 14. Contenu et voix

### Français

- phrases courtes ;
- termes sportifs vérifiés ;
- dates explicites ;
- tutoiement évité dans l’institutionnel.

### Anglais

- traduction humaine ;
- termes sportifs cohérents ;
- éviter les traductions littérales de catégories officielles ;
- contrôler la longueur des boutons.

### Contenu fictif

Préfixes autorisés :

- « Démo » ;
- « Exemple » ;
- « Fictif » ;
- « Demo » ;
- « Example » ;
- « Fictional ».

Les noms réalistes, statistiques plausibles non marquées et portraits sont
interdits dans les maquettes.

## 15. Design tokens proposés

```css
:root {
  --color-brand-900: #04042e;
  --color-brand-800: #0b1238;
  --color-paper: #f9f9fa;
  --color-ink: #111322;
  --color-muted: #5c6470;
  --color-line: #d7dae2;
  --color-accent: #f3a712;
  --color-accent-strong: #b1440e;
  --color-focus: #c54f0a;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --container: 75rem;
  --reading: 45rem;
}
```

Ces tokens sont provisoires et centralisés afin de pouvoir remplacer la palette
sans modifier chaque composant.

## 16. Checklist composant

Avant validation d’un composant :

- nom et rôle définis ;
- états documentés ;
- comportement clavier défini ;
- focus visible ;
- contraste vérifié ;
- version mobile définie ;
- FR/EN testés ;
- contenu vide et erreur prévus ;
- aucune donnée réelle non autorisée ;
- réduction des animations respectée.

## 17. Éléments encore manquants

- logo vectoriel ;
- teintes officielles ;
- police officielle éventuelle ;
- photographies autorisées ;
- règles de partenaires ;
- validation du nom ELITE et de la mention GENTILLY ;
- choix CMS et permissions ;
- coordonnées publiques ;
- contenus FR/EN.

Ces éléments empêchent une charte finale, mais pas la validation de la structure
et des parcours de Phase 2.
