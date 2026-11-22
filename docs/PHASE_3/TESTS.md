# Tests — Phase 3

**Dernière exécution complète :** 22 novembre 2026

## Résultats

| Contrôle | Résultat |
|---|---|
| `npm run check` | 37 fichiers, 0 erreur, 0 avertissement, 0 indication |
| `npm test` | 7 fichiers, 26 tests réussis |
| `npm run build` | 52 pages statiques générées |
| `npm run test:site` | 52 pages et 1 187 liens internes contrôlés |
| `npm audit --audit-level=high` | 0 vulnérabilité connue |
| Analyse syntaxique de `.pages.yml` | 3 groupes CMS chargés |

## Couverture unitaire

### Fondation

- langues prises en charge ;
- fuseau du club.

### Contenus

- unicité des identifiants des collections relationnelles ;
- existence des athlètes et compétitions référencés ;
- existence du cours référencé par une exception.

### Horaires

- validité temporelle et statuts ;
- changement ponctuel d'heure et de lieu ;
- absence de mutation du cours récurrent ;
- annulation d'une seule occurrence ;
- contrôle du jour de la semaine.

### Résultats

- cohérence médaille/classement ;
- différences affichées au récapitulatif ;
- identifiant conservé lors d'une modification ;
- historique des anciennes et nouvelles valeurs ;
- remplacement sans doublon.

### Palmarès

- résultats individuels et par équipe ;
- équipe comptée une fois ;
- séparation Kyorugi/Poomsae ;
- exclusion brouillon/annulé/archivé ;
- correction avec identifiant stable ;
- annulation après correction.

### Documents

- types PDF/JPEG/PNG ;
- limite de 10 Mo ;
- cohérence type/extension ;
- refus des documents privés ou personnels ;
- doublons ;
- chemin public normalisé.

### Contact

- validation des quatre champs nécessaires ;
- erreurs de format et de longueur ;
- champ piège ;
- délai anti-spam ;
- limite de 5 000 caractères.

## Contrôles de compilation

Le contrôle du site généré vérifie :

- toutes les cibles de liens internes ;
- l'absence de valeur `undefined` dans le HTML ;
- la langue du document pour chaque page FR/EN ;
- `canonical` ;
- `hreflang` français, anglais et `x-default`.

La compilation génère les pages publiques, profils d'athlètes, fiches de
compétitions et trois écrans administratifs locaux.

## Vérifications manuelles réalisées

- lecture des sorties de compilation ;
- cohérence des routes françaises et anglaises ;
- présence des états vides pour les horaires et l'encadrement ;
- contenu fictif signalé ;
- envoi du contact explicitement désactivé ;
- stockage documentaire explicitement non connecté ;
- formulaire de résultats séparant saisie, récapitulatif et confirmation.

## Non vérifié dans cette phase

- test visuel automatisé du site développé à 320, 390, 834 et 1440 px ;
- navigation avec lecteur d'écran réel ;
- audit axe ou Lighthouse du site développé ;
- scénarios E2E dans un navigateur sur le JavaScript client ;
- zoom 200 % multi-navigateurs ;
- comptes, révocation, concurrence et publication d'un CMS réel ;
- protections de branche et CI distante ;
- endpoint de contact, débit et délivrabilité ;
- chargement ou suppression dans un stockage réel ;
- en-têtes d'un hébergeur et HTTPS.

Les captures de Phase 2 concernent le prototype accepté, pas les pages Astro de
Phase 3. Les tests navigateur, accessibilité et responsive complets relèvent de
la Phase 4.

## Particularité du runtime

Le Node système du workspace est `22.21.1`, légèrement inférieur au minimum
Astro 7. Les scripts utilisent le runtime local verrouillé `22.23.4`. `npm
install` affiche donc un avertissement de moteur avant que les scripts
n'utilisent le runtime compatible. Aucun échec de contrôle n'en résulte.
