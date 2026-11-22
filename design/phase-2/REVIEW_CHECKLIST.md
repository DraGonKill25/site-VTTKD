# Checklist de validation — Phase 2

**Statut initial :** à examiner avec le club  
**Prototype :** `design/phase-2/prototype/index.html`

## 1. Identité

- [ ] Le nom affiché est correct.
- [ ] La mention ELITE est utilisée correctement.
- [ ] La mention GENTILLY est autorisée.
- [ ] Le bleu nuit et le blanc conviennent.
- [ ] Le principe d’un accent chaud est accepté.
- [ ] Le concept « Maîtrise en mouvement » est accepté.
- [ ] Barlow Condensed et Inter conviennent.
- [ ] Le logo vectoriel sera fourni avant la production.

## 2. Navigation

- [ ] La navigation française est complète.
- [ ] La navigation anglaise est complète.
- [ ] Compétitions, Résultats et Palmarès sont suffisamment distincts.
- [ ] Photos et Vidéos peuvent rester regroupées sous Médias.
- [ ] Le sélecteur de langue est assez visible.
- [ ] Le menu mobile est compréhensible.
- [ ] Le fil d’Ariane est utile sur les pages profondes.

## 3. Pages

- [ ] Accueil validé.
- [ ] Club et encadrement validés.
- [ ] Kyorugi (Combat) validé comme discipline principale.
- [ ] Poomsae validé.
- [ ] Athlètes et profil validés.
- [ ] Compétitions validées.
- [ ] Résultats et filtres validés.
- [ ] Palmarès validé.
- [ ] Calendrier validé.
- [ ] Actualités validées.
- [ ] Photos et vidéos validées.
- [ ] Contact validé.
- [ ] États 404, vide et traduction absente validés.

## 4. Contenu sportif

- [ ] La priorité du Kyorugi et la visibilité du Poomsae sont adaptées.
- [ ] Les champs de Combat sont corrects.
- [ ] Les champs de Poomsae sont corrects.
- [ ] La présentation des podiums est claire.
- [ ] Un résultat sans médaille reste valorisé correctement.
- [ ] Une médaille d’équipe compte comme un résultat club.
- [ ] La distinction résultat/participation est comprise.

## 5. Bilinguisme

- [ ] Les labels anglais sont approuvés.
- [ ] Les slugs anglais sont approuvés.
- [ ] Le changement de langue conserve la page équivalente.
- [ ] La politique de traduction absente est acceptée.
- [ ] La traduction automatique non validée reste interdite.
- [ ] Une personne est désignée pour valider l’anglais.

## 6. Responsive

- [ ] Accueil vérifié à 1440 px.
- [ ] Accueil vérifié à 834 px.
- [ ] Accueil vérifié à 390 px.
- [ ] Navigation vérifiée à 320 px.
- [ ] Résultats vérifiés à 320 px.
- [ ] Compétition vérifiée à 390 px.
- [ ] Contact vérifié à 390 px.
- [ ] Administration vérifiée à 834 px paysage.
- [ ] Aucun défilement horizontal de page.
- [ ] Zoom 200 % utilisable sur les parcours critiques.

## 7. Accessibilité

- [ ] Lien d’évitement utilisable.
- [ ] Navigation complète au clavier.
- [ ] Focus toujours visible.
- [ ] Le menu mobile se ferme avec Échap.
- [ ] Dialogues rendent le focus au déclencheur.
- [ ] Libellés de formulaire visibles.
- [ ] Résumé d’erreurs compréhensible.
- [ ] Les médailles ne reposent pas uniquement sur la couleur.
- [ ] Les cartes mobiles contiennent les mêmes données que le tableau.
- [ ] La réduction des animations est respectée.
- [ ] Les contrastes provisoires sont acceptables.

## 8. Médias et protection

- [ ] Les photographies à utiliser sont identifiées.
- [ ] Les crédits sont disponibles.
- [ ] Les autorisations de publication sont vérifiées.
- [ ] La procédure concernant les mineurs est validée.
- [ ] La procédure de retrait est validée.
- [ ] Les vidéos YouTube retenues sont listées.
- [ ] Aucun flux social automatique n’est nécessaire.

## 9. Administration

- [ ] Les 5 à 6 comptes nominatifs nécessaires sont confirmés.
- [ ] L’administrateur principal est désigné.
- [ ] Les administrateurs sportifs sont désignés.
- [ ] Les administrateurs éditoriaux sont désignés.
- [ ] Les droits du rôle Contributeur sont définis.
- [ ] Les personnes autorisées à publier sont définies.
- [ ] Le parcours compétition/résultats est compris.
- [ ] La page de confirmation avant enregistrement est comprise.
- [ ] Le retour au formulaire conserve les informations.
- [ ] La modification d’un résultat existant est comprise.
- [ ] La confirmation des modifications est comprise.
- [ ] L’historique proposé est suffisant.
- [ ] Brouillons, annulations et archives sont exclus du palmarès public.
- [ ] Le parcours FR/EN est compris.
- [ ] Le parcours média et droits est compris.
- [ ] Le traitement d’un conflit est compris.

## 10. Décision CMS

### Scénario A — permissions fines

- [ ] Le coût indicatif Decap Turbo est accepté : environ 38 €/mois pour
  5 comptes ou 44 €/mois pour 6 comptes.
- [ ] La limite `edit/view/none` sans séparation fine publier/supprimer est
  comprise.
- [ ] Les limites de MFA sont comprises.
- [ ] Les éventuels sièges GitHub Team sont budgétés.
- [ ] La revue mainteneur avant publication est acceptée.

### Scénario B — compromis gratuit

- [ ] L’absence de permissions par collection est acceptée.
- [ ] Les rôles Sport/Éditorial/Contributeur sont compris comme des consignes
  non garanties techniquement dans Pages CMS.
- [ ] L’absence de workflow éditorial natif comparable est acceptée.
- [ ] Les limites de MFA sont comprises.
- [ ] Les conventions de brouillon et de revue sont acceptées.

### Décision

- [ ] Scénario A retenu.
- [ ] Scénario B retenu.
- [ ] Décision reportée avec responsable et date cible.

## 11. Domaine et exploitation

- [ ] Le responsable de la future acquisition est identifié.
- [ ] Le budget du domaine est autorisé.
- [ ] Aucun achat ou DNS n’est demandé pendant la Phase 2.
- [ ] L’adresse publique de contact est définie.
- [ ] Le traitement et la conservation des messages sont définis.
- [ ] Les personnes autorisées à lire les messages sont désignées.
- [ ] La politique relative aux demandes concernant des mineurs est validée.

## 12. Autorisation de passer en Phase 3

- [ ] Les maquettes sont validées.
- [ ] Le design system provisoire est validé.
- [ ] Les décisions bloquantes ont un responsable.
- [ ] Le CMS cible est choisi.
- [ ] La Phase 3 est explicitement autorisée.

Sans validation de cette dernière section, aucun développement Astro ou CMS ne
doit commencer.
