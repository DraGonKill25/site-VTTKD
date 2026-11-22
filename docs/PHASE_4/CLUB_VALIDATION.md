# Validation du club — Phase 4

**Objet :** revue humaine du site local VAN THUYNE TAEKWONDO / ELITE  
**Important :** cette validation n'autorise ni déploiement ni mise en
production.

## 1. Préparation de la séance

La séance doit utiliser le build local de Phase 4. Aucun compte externe,
message réel ou fichier privé n'est nécessaire. Les personnes participantes
doivent disposer de `TEST_REPORT.md`, `ISSUES.md` et des captures dans
`evidence/screenshots/`.

Pour chaque point, inscrire l'une des décisions suivantes :

- `VALIDÉ PAR LE CLUB` ;
- `MODIFICATION DEMANDÉE` ;
- `REPORTÉ` ;
- `NON EXAMINÉ`.

Ne pas interpréter une absence de remarque comme une validation.

## 2. Identité, design et responsive

### VAL-01 — Direction visuelle

- Vérifier couleurs, typographies, logo JPEG provisoire, cartes et boutons.
- Examiner accueil, résultats, palmarès et contact.
- Tailles : 320, 390, 834 et 1440 px.
- **Décision du club :** ....................................................
- **Remarques :** ..........................................................

### VAL-02 — Navigation mobile et ordinateur

- Vérifier l'ordre des rubriques, le menu mobile et les appels à l'action.
- Confirmer que Kyorugi reste prioritaire et que Poomsae reste complet.
- **Décision du club :** ....................................................
- **Remarques :** ..........................................................

## 3. Français et anglais

### VAL-03 — Libellés et contenus

- Parcourir accueil, disciplines, athlètes, compétitions, résultats, horaires,
  médias et contact dans les deux langues.
- Valider humainement toutes les traductions avant publication.
- Identifier les contenus officiels encore à fournir.
- **Décision du club :** ....................................................
- **Remarques :** ..........................................................

## 4. Résultats et palmarès

### VAL-04 — Parcours de résultat

- Créer un résultat fictif.
- Vérifier le récapitulatif obligatoire.
- Revenir au formulaire sans perdre les données.
- Confirmer, rouvrir, modifier plusieurs champs et annuler une modification.
- Vérifier l'identifiant stable, l'absence de doublon et l'historique.
- **Décision du club :** ....................................................
- **Remarques :** ..........................................................

### VAL-05 — Règles du palmarès

- Confirmer qu'un résultat publié compte comme une participation.
- Confirmer l'exclusion des brouillons, annulations et archives.
- Confirmer qu'une équipe et sa médaille ne sont comptées qu'une fois.
- Confirmer qu'une correction met à jour le résultat existant.
- **Décision du club :** ....................................................
- **Remarques :** ..........................................................

## 5. Horaires

### VAL-06 — État actuel et données à fournir

- Vérifier l'état vide FR/EN sans horaire inventé.
- Fournir ultérieurement jours, heures, lieux, groupes, validité et exceptions.
- Confirmer la formulation affichée tant que ces données manquent.
- **Décision du club :** ....................................................
- **Remarques :** ..........................................................

## 6. Contact, confidentialité et documents

### VAL-07 — Formulaire de contact

- Vérifier nom, e-mail, objet, message, erreurs et confirmation sans envoi.
- Désigner ultérieurement le destinataire et le fournisseur.
- Faire valider mentions, base juridique, conservation et suppression.
- **Décision du club :** ....................................................
- **Remarques :** ..........................................................

### VAL-08 — Documents sportifs

- Vérifier l'association au résultat, les formats et la limite de 10 Mo.
- Confirmer l'interdiction des documents privés ou personnels dans Git.
- Choisir ultérieurement le mode gratuit ou payant et le stockage autorisé.
- **Décision du club :** ....................................................
- **Remarques :** ..........................................................

## 7. Administration et CMS

### VAL-09 — Organisation des cinq comptes maximum

- Confirmer un compte nominatif par personne, sans compte partagé.
- Confirmer les quatre rôles métier.
- Décider si des droits larges Pages CMS sont acceptables.
- Si une séparation technique des rôles est exigée, autoriser l'étude finale
  d'une solution à rôles avancés avant toute dépense.
- **Décision du club :** ....................................................
- **Remarques :** ..........................................................

### VAL-10 — Limite de l'administration locale

- Reconnaître que `/admin/*` n'a ni authentification, ni permissions, ni
  stockage fiable.
- Confirmer que cette interface ne sera jamais exposée comme administration
  réelle.
- **Décision du club :** ....................................................
- **Remarques :** ..........................................................

## 8. Accessibilité humaine obligatoire

### VAL-11 — Lecteur d'écran

- Avec NVDA ou Narrateur, parcourir : en-tête, menu, contenu, résultats,
  horaires, formulaire de contact et messages d'erreur.
- Vérifier ordre, noms annoncés, états du menu et retour du focus.
- **Décision du club :** ....................................................
- **Anomalies entendues :** .................................................

### VAL-12 — Zoom natif et clavier

- Dans Edge et Firefox à 200 %, vérifier accueil, résultats, contact,
  administration des résultats et documents.
- Parcourir entièrement au clavier sans piège ni contenu masqué.
- **Décision du club :** ....................................................
- **Anomalies constatées :** ................................................

## 9. Contenus et autorisations

### VAL-13 — Éléments officiels à fournir

- coordonnées et identité légale ;
- textes institutionnels et traductions approuvées ;
- horaires officiels ;
- athlètes, compétitions et résultats autorisés ;
- médias, crédits et autorisations, notamment pour les mineurs ;
- logo vectoriel si disponible ;
- propriété des liens sociaux.

- **Responsable de collecte :** .............................................
- **Échéance :** ............................................................
- **Décision du club :** ....................................................

## 10. Décision de fin de Phase 4

Cocher une seule conclusion :

- [ ] **PHASE 4 VALIDÉE PAR LE CLUB**, avec réserves listées ci-dessous.
- [ ] **PHASE 4 À CORRIGER**, une nouvelle revue est requise.
- [ ] **VALIDATION REPORTÉE**, éléments manquants.

**Réserves ou corrections demandées :**

............................................................................

............................................................................

**Nom et rôle du validateur :** .............................................

**Date :** .................................................................

**Signature ou accord traçable :** ..........................................

## 11. Limite de cette décision

Même si la Phase 4 est validée, la production reste bloquée jusqu'à une
autorisation distincte couvrant au minimum l'authentification, les permissions,
le CMS, le stockage, le contact, les contenus officiels, le domaine,
l'hébergement, la sécurité et la conformité juridique.
