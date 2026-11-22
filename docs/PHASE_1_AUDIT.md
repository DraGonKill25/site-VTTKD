# VAN THUYNE TAEKWONDO / ELITE

## Rapport de Phase 1 — Audit et conception

**Date de l’audit :** 5 novembre 2026  
**Périmètre :** audit documentaire et public, sans développement, déploiement ni modification DNS  
**Statut :** proposition soumise à validation du club

---

## 1. Synthèse exécutive

Au début de l’audit, le projet partait d’un espace de travail vierge. Le seul
fichier disponible était `logo.jpg`, un logo raster carré de 160 × 160 pixels.
Aucun dépôt Git, site Astro, contenu structuré, CMS, test ou workflow de
déploiement n’existait dans le dossier du projet.

Le domaine cible `vanthuynetkd.com` n’est pas encore acquis. Les requêtes DNS
publiques renvoient logiquement `NXDOMAIN` et une recherche RDAP n’a pas trouvé
d’inscription active au registre `.com` lors de l’audit. Le projet doit rester
indépendant du domaine jusqu’à son acquisition autorisée. Aucun achat, transfert
ou changement DNS n’entre dans les Phases 1 ou 2.

L’identité visuelle vérifiable repose sur un sceau circulaire bleu nuit et
blanc, un symbole yin-yang, deux silhouettes de taekwondo et les mentions
« VAN THUYNE TKD », « CLUB ELITE » et « GENTILLY ». L’image disponible permet
de proposer une direction artistique, mais pas de fixer définitivement les
couleurs, la typographie ou les règles du logo. Le fichier vectoriel original
reste nécessaire.

L’architecture recommandée est un site Astro statique bilingue, alimenté par
des fichiers validés et administré avec Decap CMS. Les mêmes fichiers Git
constituent l’unique source de vérité, qu’ils soient modifiés depuis le CMS ou
directement dans le dépôt. Cloudflare Pages est l’hébergement recommandé.

L’équipe éditoriale comptera 5 à 6 personnes et demande quatre niveaux de
droits. Aucune option gratuite étudiée ne couvre simultanément permissions
fines, workflow éditorial, comptes individuels, authentification forte et dépôt
privé. Deux scénarios restent à valider :

1. **Permissions fines :** Decap Turbo, GitHub App limitée au dépôt et module
   de rôles avancés. Coût indicatif observé : 38 €/mois pour 5 utilisateurs ou
   44 €/mois pour 6, hors éventuels sièges GitHub Team des mainteneurs.
2. **Compromis sans abonnement CMS :** Pages CMS hébergé, avec collaborateurs
   individuels, mais sans permissions par collection, MFA organisationnelle
   documentée ni workflow éditorial natif comparable.

Le backend GitHub standard de Decap n’est plus recommandé par défaut pour cette
équipe : chaque éditeur obtient un accès d’écriture étendu au dépôt et, sur un
dépôt privé, une portée OAuth `repo` potentiellement large.

---

## 2. Méthode, preuves et limites

### 2.1 Sources consultées

- Domaine cible non acquis : <https://vanthuynetkd.com/>
- DNS public Google : <https://dns.google/resolve?name=vanthuynetkd.com&type=NS>
- Registre RDAP `.com` : <https://rdap.verisign.com/com/v1/domain/VANTHUYNETKD.COM>
- Instagram présenté comme officiel dans le cahier des charges, propriété du
  compte à confirmer :
  <https://www.instagram.com/vanthuynetkd_officiel/>
- YouTube présenté comme officiel dans le cahier des charges, propriété du
  compte à confirmer :
  <https://www.youtube.com/@vanthuynetkdofficiel3760>
- Flux public YouTube de la chaîne : chaîne
  `UCARL_9BQTJc-udI2MZUjQtA`
- Fichier local fourni : `logo.jpg`
- Documentations officielles Astro, Decap CMS, Pages CMS, Keystatic,
  Cloudflare Pages, GitHub Pages et Netlify, référencées dans
  `docs/ARCHITECTURE.md`

### 2.2 Niveaux de certitude

- **Vérifié :** constat directement observable dans une source officielle ou
  dans le dossier du projet.
- **Recommandé :** choix d’architecture proposé à partir des besoins et des
  limites vérifiées.
- **À confirmer :** information inaccessible, ambiguë ou nécessitant la
  validation du club.

### 2.3 Limites de l’audit

- Instagram limite fortement la consultation automatisée sans session
  authentifiée. Le profil et son image ont été observés, mais les publications,
  légendes, stories et droits d’utilisation n’ont pas été audités.
- Le domaine ne résout pas ; aucune page, technologie, redirection, sauvegarde,
  statistique ni URL historique n’a pu être inspectée.
- Le service d’archives web n’était pas exploitable pendant l’audit.
- Aucun résultat sportif, fichier d’athlète, texte institutionnel ou document
  juridique officiel n’a été fourni.
- Les prix et limites de services présentés sont ceux observés à la date de
  l’audit. Ils devront être vérifiés avant souscription ou mise en production.

---

## 3. Ressources officielles du club

### 3.1 Logo local

**Vérifié :**

- Format JPEG, 160 × 160 pixels.
- Sceau circulaire à dominante bleu nuit et blanc.
- Texte visible : « VAN THUYNE TKD », « CLUB ELITE », « GENTILLY ».
- Symbole yin-yang central et silhouettes de taekwondo.
- Cohérence visuelle avec les avatars publics Instagram et YouTube observés.

**Limites :**

- Définition insuffisante pour un grand affichage.
- Compression JPEG et fond non transparent.
- Pas de variante horizontale, monochrome ou favicon officielle.
- Police et couleurs exactes inconnues.

### 3.2 Instagram

**Vérifié au 5 novembre 2026 :**

- Nom public observé : « VAN THUYNE TKD OFFICIEL ».
- Identifiant : `@vanthuynetkd_officiel`.
- Les métadonnées publiques observées indiquaient 2 097 abonnés,
  104 abonnements et 263 publications.
- L’avatar reprend le même signe que `logo.jpg`.

**Non vérifié :**

- Biographie complète.
- Thèmes précis et fréquence des publications.
- Couleurs ou polices des affiches.
- Autorisations de réutilisation des images et légendes.

**Action recommandée :** demander un export Instagram et les originaux des
visuels retenus. Un contenu visible sur Instagram n’est pas automatiquement
réutilisable sur le site.

### 3.3 YouTube

**Vérifié :**

- Nom de chaîne : « VAN THUYNE TKD OFFICIEL ».
- Identifiant de chaîne : `UCARL_9BQTJc-udI2MZUjQtA`.
- La chaîne expose des vidéos de compétitions, entraînements, interviews,
  cérémonies et présentation du dojang.
- Le dernier envoi observé dans le flux public datait du 1er avril 2024.
- La bannière publique observée associe photographie sportive et orange vif.

**Recommandation :**

- Stocker manuellement les URL/identifiants des vidéos sélectionnées.
- Utiliser un composant d’intégration différée et respectueux de la vie privée.
- Ne pas rendre le site dépendant de l’API YouTube.
- Conserver titre, description, miniature, langue et relations avec une
  compétition dans les fichiers de contenu.

### 3.4 Contenus à préserver si une sauvegarde existe

- Textes institutionnels et coordonnées.
- Historique, encadrement et installations.
- Résultats et palmarès vérifiables.
- Anciennes actualités et leurs dates.
- Photos, vidéos, légendes et crédits.
- URLs historiques pour préparer les redirections.
- Documents légaux, exports Search Console et statistiques d’audience.

---

## 4. Audit du domaine cible non acquis

### 4.1 État observé

**Vérifié :**

- `vanthuynetkd.com` et `www.vanthuynetkd.com` ne résolvent pas.
- La réponse DNS publique est `NXDOMAIN`.
- Aucun site HTTP ou HTTPS ne peut donc être audité.
- Aucune page indexée n’a été retrouvée par recherche ciblée.
- Une requête RDAP Verisign n’a pas confirmé d’enregistrement actif.

La réponse `500` obtenue par certains outils de lecture web n’est pas une
réponse du serveur du club : elle résulte de l’impossibilité de résoudre le nom.

### 4.2 Conséquences

- Aucun hébergement existant ne peut être identifié.
- Il est impossible d’inventorier les anciennes URLs ou de vérifier les
  redirections.
- Le HTTPS, les en-têtes de sécurité et le certificat ne peuvent pas être
  évalués.
- Le nom peut présenter un risque d’expiration, de perte ou d’usurpation.

### 4.3 Procédure d’acquisition future

1. Vérifier la disponibilité auprès d’un registrar reconnu au moment de
   l’achat.
2. Obtenir l’autorisation et le budget du responsable du club.
3. Enregistrer le domaine au nom de l’entité ou du responsable désigné, jamais
   au nom personnel du développeur.
4. Activer le verrouillage, le renouvellement automatique et
   l’authentification à deux facteurs.
5. Conserver facture, codes de récupération et procédure d’accès dans un espace
   privé contrôlé par le club.
6. Ne configurer les DNS qu’en Phase 5, après validation du site et de
   l’hébergement.

**Interdiction de Phase 1 :** aucun achat, transfert ou changement DNS.

### 4.4 Raccordement futur

Après acquisition et uniquement en Phase 5 :

1. Construire et tester le site sur l’URL de prévisualisation de l’hébergeur.
2. Documenter les enregistrements DNS requis sans les appliquer.
3. Vérifier les éventuels enregistrements de messagerie avant toute opération.
4. Raccorder la version racine et choisir la redirection `www`.
5. Vérifier HTTPS, redirections, formulaires, CMS et pages principales.
6. Conserver l’ancienne configuration DNS exportée pour permettre un retour
   arrière.

Aucune migration d’un ancien site ou redirection historique n’est présumée,
puisqu’aucun site antérieur sur ce domaine n’a été confirmé.

---

## 5. Identité graphique et direction artistique

Les observations détaillées et les règles provisoires figurent dans
`docs/BRAND_IDENTITY.md`.

### 5.1 Direction recommandée

Le site doit traduire l’idée de performance sportive sans transformer
l’interface en affiche publicitaire. La direction proposée repose sur :

- une base bleu nuit et blanc issue du logo ;
- un accent chaud, utilisé avec retenue, inspiré de la bannière YouTube mais à
  confirmer sur les supports officiels ;
- de grandes photographies d’action avec cadrages nets ;
- une typographie de titres condensée ou athlétique, complétée par une police
  de lecture très lisible ;
- des blocs éditoriaux asymétriques, des lignes franches et des chiffres de
  résultats clairement hiérarchisés ;
- des animations courtes, désactivables avec `prefers-reduced-motion`.

### 5.2 Principes pour les maquettes

- Approche mobile d’abord.
- Menu court, stable et bilingue.
- Accès prioritaire aux résultats, athlètes, événements et disciplines.
- Kyorugi prioritaire dans la hiérarchie, avec une présentation complète et
  identifiable du Poomsae.
- Les podiums sont mis en avant sans masquer les autres participations.
- Les contenus provisoires sont explicitement signalés.
- Aucune photographie de mineur n’est intégrée sans autorisation tracée.

### 5.3 Navigation prévisionnelle

- Accueil
- Le club
- Disciplines
  - Kyorugi (Combat)
  - Poomsae
- Athlètes
- Compétitions
- Résultats
- Palmarès
- Calendrier
- Actualités
- Médias
  - Photos
  - Vidéos
- Contact
- Sélecteur FR / EN
- Liens Instagram / YouTube

---

## 6. Architecture technique recommandée

La spécification détaillée figure dans `docs/ARCHITECTURE.md`.

### 6.1 Solution recommandée

- **Astro en sortie statique** pour la majorité des pages.
- **TypeScript strict** pour les modèles et la logique.
- **Astro Content Collections** et schémas de validation.
- **Markdown/MDX** pour les textes longs.
- **YAML ou JSON** pour les données structurées selon les capacités du CMS.
- **CSS moderne et design tokens**, sans dépendance UI lourde par défaut.
- **GitHub** pour le dépôt, l’historique, les revues et la CI.
- **Decap CMS** pour l’administration graphique.
- **Cloudflare Pages** pour le site et les prévisualisations.
- **Cloudflare Worker ou Pages Function** limité au broker OAuth et, si retenu,
  au formulaire de contact.

### 6.2 Avantages

- Site public rapide, simple à mettre en cache et peu exposé.
- Pas de base de données à exploiter.
- Contenu portable et versionné.
- Retour arrière par Git.
- Faible coût d’exploitation.
- Faible quantité de JavaScript envoyée aux visiteurs.

### 6.3 Inconvénients

- La publication déclenche une compilation.
- Les conflits restent possibles si deux personnes modifient le même fichier.
- L’OAuth GitHub nécessite un composant serveur minimal ou un service hébergé.
- Les médias lourds peuvent faire grossir le dépôt ; une politique stricte est
  nécessaire.

### 6.4 Alternatives

**Next.js ou autre framework rendu côté serveur :** plus flexible pour des
fonctions dynamiques, mais plus complexe et plus coûteux à maintenir sans besoin
fonctionnel démontré.

**Base de données et CMS headless :** utile à très grande échelle ou pour des
permissions avancées, mais introduit un service supplémentaire, des migrations,
des sauvegardes et un coût potentiel.

**WordPress :** administration familière, mais surface d’attaque, mises à jour,
hébergement et maintenance plus élevés. Il ne répond pas aussi directement au
besoin d’une source Git modifiable par fichiers.

---

## 7. Choix du système d’administration

### 7.1 Recommandation révisée pour 5 à 6 comptes

La décision finale dépend du niveau de permissions à imposer :

- **Si les rôles par collection sont obligatoires :** Decap Turbo avec module
  de rôles avancés est la solution la plus proche du besoin. Sa GitHub App peut
  être limitée au seul dépôt et les éditeurs ordinaires n’ont pas besoin
  d’accès GitHub.
- **Si le coût nul est prioritaire et que des droits éditoriaux larges sont
  acceptables :** Pages CMS hébergé est le compromis retenu pour le prototype.
  Il offre des comptes collaborateurs individuels, mais ne sépare pas les
  rubriques Sport, Éditorial et Administration.

Decap conserve des avantages fonctionnels importants : intégration Astro,
i18n, workflow Git, brouillons, revue et prévisualisation. Ces avantages ne
doivent toutefois pas masquer le coût et les limites d’identité pour cinq à
six personnes.

### 7.2 Authentification

**Decap GitHub standard — non recommandé par défaut :**

- cinq à six comptes GitHub et un droit `Write` sur tout le dépôt ;
- portée OAuth `repo` possible sur dépôt privé et jeton utilisé dans le
  navigateur ;
- aucun contrôle d’accès par collection ;
- GitHub Team potentiellement requis pour les protections de branche sur dépôt
  privé ;
- broker OAuth à sécuriser et maintenir.

**Decap Turbo — scénario permissions fines :**

- GitHub App restreinte au dépôt sélectionné ;
- éditeurs sans accès GitHub direct ;
- contenu Git canonique, avec miroir de contenu dans la base Turbo ;
- coût indicatif : 19 €/mois pour 5 sièges ou 25 €/mois pour 6 sièges ;
- module de rôles avancés : 19 €/mois supplémentaire ;
- total indicatif : 38 €/mois pour 5 comptes ou 44 €/mois pour 6 comptes ;
- MFA imposable à toute l’organisation Turbo non documentée ; privilégier une
  connexion fédérée dont la MFA est activée, sans la présenter comme garantie ;
- les rôles `edit/view/none` ne distinguent pas à eux seuls l’approbation de la
  publication, qui reste soumise à une revue GitHub par un mainteneur.

Les tarifs devront être revérifiés avant décision.

### 7.3 Alternatives

**Pages CMS :**

- points forts : service hébergé annoncé gratuit, GitHub App, collaborateurs
  invités par courriel, médias dans le dépôt ;
- limites : sauvegarde directe sur la branche sélectionnée, pas de workflow
  éditorial comparable à Decap, pas de gestion bilingue liée aussi aboutie,
  MFA obligatoire non documentée et aucune permission fine par collection ;
- la GitHub App demande des permissions significatives sur le dépôt ; utiliser
  une identité de commit par utilisateur pour améliorer l’attribution ;
- conséquence maintenance : moins d’infrastructure d’authentification, mais
  davantage de conventions ou d’automatisation à construire.

**Keystatic :**

- points forts : schémas TypeScript, bonne expérience développeur, GitHub App ;
- limites : mode déployé nécessitant un runtime serveur, i18n éditorial à
  concevoir, workflow moins adapté et dépendance éventuelle à Keystatic Cloud ;
- coût observé pour dix utilisateurs Cloud : environ 45 US$/mois ;
- conséquence maintenance : architecture plus complexe que le besoin actuel.

### 7.4 Décision proposée

La Phase 2 présentera les deux scénarios sans simuler leur fonctionnement réel.
Avant la Phase 3, le club doit choisir entre les permissions fines payantes de
Decap Turbo et le compromis gratuit de Pages CMS. Un prototype
d’authentification, de publication et de révocation sera obligatoire avant
toute mise en production.

---

## 8. Gestion hybride et source de vérité

### 8.1 Principe

Avec le backend GitHub standard de Decap, le CMS lit et écrit les mêmes fichiers
que ceux accessibles dans le dépôt. Decap Turbo synchronise et met en miroir le
contenu du dépôt dans sa propre base pour fournir ses fonctions ; les fichiers
Git validés restent néanmoins la source canonique de publication. Pages CMS
écrit également dans le dépôt. Aucun scénario ne crée une seconde source
canonique indépendante.

Flux prévu :

1. Un éditeur ouvre `/admin`.
2. Il s’authentifie.
3. Il modifie un formulaire validé.
4. Decap crée une branche et une demande de fusion en mode éditorial.
5. La CI valide les schémas, liens, traductions, tests et compilation.
6. Une prévisualisation Cloudflare est disponible.
7. La fusion publie le contenu sur la branche principale.
8. Cloudflare Pages reconstruit le site de production.

Une modification directe suit un chemin manuel équivalent : branche dédiée,
commit, demande de fusion, CI, revue, prévisualisation, puis fusion. La branche
principale interdit les écritures directes, exige les contrôles et une revue,
et aucun éditeur ordinaire ne dispose d’un droit de contournement.

### 8.2 Prévention des conflits

- Un contenu principal par fichier.
- Identifiants et noms de fichiers stables.
- Éviter deux éditeurs simultanés sur une même entrée.
- Afficher les conflits Git dans la demande de fusion.
- Ne jamais forcer une fusion qui supprime des données.
- Documenter une procédure de résolution et de restauration.

### 8.3 Sauvegarde et restauration

- Git constitue l’historique principal.
- Les médias originaux doivent aussi être conservés hors de tout dépôt Git.
- Export périodique du dépôt et des paramètres critiques.
- Restauration par annulation d’un commit, puis validation CI.
- Exercice de restauration avant mise en production.

---

## 9. Modèle des compétitions et résultats

### 9.1 Principes

- Identifiants stables et uniques.
- Données communes partagées entre Combat et Poomsae.
- Champs spécifiques portés par une variante typée.
- Références vers les athlètes, sans recopier leurs données.
- État global de l’entité et état éditorial distinct pour chaque langue.
- Dates au format ISO et fuseau explicite pour les horaires.
- Aucune statistique saisie manuellement si elle peut être calculée.

### 9.2 Entités principales

**Competition**

- `id`
- `slug`
- `name`
- `startDate`
- `endDate` facultative
- `location`
- `level`
- `disciplines`
- `status`
- textes FR/EN
- galerie et vidéos associées

**Athlete**

- `id`
- nom affiché
- disciplines
- catégorie sportive
- statut de publication
- autorisation de publication vérifiée hors site
- photographie autorisée
- biographie et parcours FR/EN

**Result**

- `id`
- `competitionId`
- `athleteIds` ou identifiant d’équipe
- `discipline`
- `participationType`
- classement final
- médaille normalisée : `gold`, `silver`, `bronze` ou `none`
- statut de publication
- résumé FR/EN facultatif
- données spécifiques selon la discipline

**CombatDetails**

- catégorie de poids
- catégorie d’âge

**PoomsaeDetails**

- type : individuel, paire ou équipe
- catégorie
- composition de l’équipe si nécessaire

### 9.3 Définition du palmarès

Une médaille est comptée uniquement si :

- le résultat est éligible à la publication selon son statut ;
- son identifiant est unique ;
- la médaille est explicitement `gold`, `silver` ou `bronze` ;
- la compétition et les athlètes référencés existent ;
- le résultat est `published` et sa compétition n’est pas
  `cancelled`.

Une participation correspond à un résultat unique dont le statut est
`published`. Les résultats `draft`, `cancelled` ou `archived` sont exclus du
palmarès public. Une compétition est comptée une seule fois par
identifiant, même si plusieurs athlètes participent. Les résultats de paire ou
d’équipe comptent comme un résultat sportif, pas comme autant de médailles que
de membres. Des statistiques distinctes peuvent compter les participations
individuelles, mais elles doivent porter un libellé différent.

### 9.4 Contrôles automatiques prévus

- unicité des identifiants ;
- cohérence médaille/classement ;
- références existantes ;
- champs spécifiques à la discipline ;
- absence de statistiques manuelles ;
- validité des dates ;
- traduction obligatoire avant publication selon la politique validée ;
- médias existants et textes alternatifs renseignés.

---

## 10. Organisation du bilinguisme

### 10.1 URLs

- Français : `/fr/...`
- Anglais : `/en/...`
- Redirection de `/` vers la langue par défaut, sans géolocalisation intrusive.
- URLs localisées et stables.

### 10.2 Séparation des données

- Les faits sportifs communs ne sont stockés qu’une fois.
- Les titres, résumés, descriptions et métadonnées sont traduits séparément.
- Les entrées FR et EN partagent un identifiant de traduction.
- Les noms propres, classements, dates et médailles ne sont pas dupliqués.

### 10.3 Repli

- Aucun texte n’est traduit et publié automatiquement.
- Une traduction absente reste en brouillon ou affiche une politique de repli
  validée.
- Le sélecteur pointe vers l’équivalent traduit quand il existe.
- Les pages sans équivalent ne déclarent pas de `hreflang` invalide.

### 10.4 SEO bilingue

- titre et description propres à chaque langue ;
- `lang` correct sur le document ;
- balises `hreflang` FR, EN et éventuellement `x-default` ;
- canonical vers la version courante ;
- sitemap contenant les variantes ;
- données structurées cohérentes dans chaque langue.

---

## 11. Stratégie de sécurité et RGPD

### 11.1 Surface publique

- Génération statique par défaut.
- HTTPS obligatoire.
- Dépendances minimales, versions verrouillées et mises à jour suivies.
- En-têtes `Content-Security-Policy`, `Strict-Transport-Security`,
  `X-Content-Type-Options`, `Referrer-Policy` et `Permissions-Policy`.
- Les règles `_headers` de Cloudflare ne couvrent pas les réponses des
  Functions : OAuth et contact doivent ajouter et tester leurs propres en-têtes
  de sécurité.
- CSP introduite d’abord en mode rapport, puis durcie après test des vidéos,
  images et outils d’administration.

### 11.2 Administration

- OAuth réel ; aucun mot de passe local codé en dur.
- 2FA obligatoire sur GitHub et le compte Cloudflare.
- Secrets uniquement dans les coffres de la plateforme.
- Vérification stricte de `state`, des origines et des URLs de retour OAuth.
- Jetons jamais journalisés.
- Le backend GitHub standard exige un droit d’écriture ; pour un dépôt privé,
  l’application OAuth peut demander la portée large `repo` et le jeton est
  utilisé par l’administration dans le navigateur. Cette exposition doit être
  acceptée explicitement, limitée à des comptes n’ayant accès qu’aux dépôts
  nécessaires, et comparée à Turbo ou à une solution fondée sur GitHub App.
- Permissions minimales possibles dans ce cadre et révocation documentée.
- Protection de la branche principale et revue des changements.

### 11.3 Formulaire de contact

- Collecte limitée à nom, moyen de réponse, objet et message.
- Validation côté serveur.
- Champ piège, limitation de débit et protection anti-automatisation
  proportionnée.
- Pas de clé secrète dans le navigateur.
- Conservation et suppression documentées pour la Function, les journaux, les
  files du fournisseur, le service d’envoi et la boîte de réception finale.
- Aucun service de formulaire n’est retenu avant validation du destinataire,
  du volume et du lieu de traitement.

### 11.4 Données et médias

- Dépôt privé requis pour éviter d’exposer brouillons, profils masqués ou
  historiques de retrait.
- Aucun fichier administratif, preuve d’autorisation ni donnée personnelle non
  publiée dans Git, même dans un dépôt privé.
- Minimiser les informations d’athlètes.
- Publication des mineurs uniquement avec autorisation appropriée.
- Conserver la preuve d’autorisation dans un espace privé.
- Associer chaque média à son crédit, son texte alternatif et son statut de
  droits.
- Procédure de retrait simple et traçable.
- Prévisualisations protégées par Cloudflare Access ou mécanisme équivalent.
- Procédure d’incident pour réécrire l’historique si nécessaire, purger les
  caches, révoquer les liens et notifier les personnes concernées après une
  publication accidentelle.

### 11.5 Chaîne logicielle

- CI sur chaque demande de fusion.
- analyse TypeScript, lint, tests, compilation et audit des dépendances ;
- dépendances automatisées à examiner, jamais fusionnées sans contrôles ;
- secrets détectés avant commit et dans la CI ;
- journal d’incident et procédure de rotation des secrets.

---

## 12. Hébergement recommandé

### 12.1 Cloudflare Pages — choix prioritaire

**Avantages vérifiés :**

- déploiement Git et prévisualisations de branches ;
- domaine personnalisé et certificats TLS ;
- fichiers `_headers` et `_redirects` ;
- trafic statique annoncé sans facturation sur l’offre gratuite ;
- 500 compilations mensuelles annoncées sur l’offre gratuite ;
- Functions/Workers disponibles pour OAuth et formulaire à faible volume.

**Inconvénients :**

- le formulaire doit être implémenté ou relié à un service ;
- le broker OAuth doit être déployé et audité ;
- dépendance à l’infrastructure Cloudflare pour les fonctions.

**Coût estimé :** 0 € par mois dans les limites gratuites, hors domaine,
messagerie et éventuel service d’authentification.

### 12.2 GitHub Pages — solution de repli

**Avantages :**

- hébergement statique, HTTPS et domaine personnalisé ;
- intégration directe au dépôt ;
- coût nul pour un dépôt public dans les conditions observées.

**Inconvénients :**

- aucune fonction serveur pour OAuth ou formulaire ;
- pas de prévisualisations de demandes de fusion comparables ;
- contrôle des en-têtes et redirections limité ;
- le dépôt privé recommandé peut nécessiter une offre GitHub différente ; ce
  coût doit être revérifié avant de retenir cette solution ;
- nécessité d’un service externe pour l’authentification Decap.

### 12.3 Netlify — alternative fonctionnelle

**Avantages :**

- prévisualisations, fonctions, en-têtes, redirections et formulaires gérés ;
- intégration historique avec Decap.

**Inconvénients :**

- offre gratuite actuelle fondée sur des crédits ;
- les déploiements et le trafic consomment ces crédits ;
- les sites du compte peuvent être suspendus jusqu’au renouvellement si le
  quota est épuisé ;
- Git Gateway est déprécié.

**Conclusion :** excellent confort fonctionnel, mais coût gratuit moins
prévisible pour un site régulièrement publié.

---

## 13. Coûts éventuels

### 13.1 Socle potentiellement gratuit

- Astro, TypeScript, Decap CMS et outils de test : 0 € de licence.
- GitHub : 0 € selon le type de dépôt et les quotas retenus.
- Cloudflare Pages : 0 € dans les limites gratuites observées.
- Broker OAuth Cloudflare : 0 € à faible volume dans les limites Workers.
- Certificat HTTPS : inclus avec l’hébergement.

### 13.2 Coûts possibles

- Première acquisition puis renouvellement annuel du domaine cible.
- Messagerie professionnelle.
- Decap Turbo avec rôles avancés : environ 38 €/mois pour 5 comptes ou
  44 €/mois pour 6 comptes aux tarifs observés.
- Éventuels sièges GitHub Team pour au moins deux mainteneurs chargés des
  protections de branche et validations.
- Service d’envoi de courriels ou de formulaire au-delà d’un quota gratuit.
- Stockage média externe si le dépôt devient trop volumineux.
- Achat/licence de polices ou de photographies.
- Temps humain de traduction, saisie, contrôle des droits et maintenance.

### 13.3 Règle de décision

Ne souscrire aucun service payant avant d’avoir :

1. confirmé si les 5 à 6 personnes ont toutes besoin d’un accès CMS ;
2. testé le parcours d’authentification ;
3. estimé le volume de publications, médias et formulaires ;
4. vérifié les tarifs officiels le jour de la décision ;
5. documenté l’export et la stratégie de sortie.

---

## 14. Arborescence prévisionnelle

```text
site-VTTKD/
├── .github/
│   └── workflows/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── BRAND_IDENTITY.md
│   ├── CONTENT_MANAGEMENT.md
│   ├── DEPLOYMENT.md
│   ├── MAINTENANCE.md
│   ├── MEDIA_MANAGEMENT.md
│   ├── PHASE_1_AUDIT.md
│   ├── PHASE_2/
│   ├── SECURITY.md
│   └── TRANSLATION.md
├── public/
│   ├── admin/
│   ├── brand/
│   ├── icons/
│   └── uploads/
├── src/
│   ├── components/
│   ├── config/
│   ├── content/
│   │   ├── athletes/
│   │   ├── club/
│   │   ├── competitions/
│   │   ├── events/
│   │   ├── galleries/
│   │   ├── news/
│   │   ├── results/
│   │   └── videos/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   │   └── [lang]/
│   ├── styles/
│   └── types/
├── tests/
│   ├── e2e/
│   ├── integration/
│   └── unit/
├── .env.example
├── .gitignore
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Cette arborescence est une proposition. Aucun de ces fichiers applicatifs n’est
créé pendant la Phase 1.

---

## 15. Risques identifiés

### Risques critiques

**Domaine cible non acquis**  
Impact : indisponibilité future possible du nom souhaité.  
Réponse : développer sans dépendance au domaine et préparer une procédure
d’acquisition par le club, sans action DNS avant la Phase 5.

**Droits des médias et données de mineurs**  
Impact : atteinte à la vie privée et risque juridique.  
Réponse : registre privé d’autorisations, publication minimale et procédure de
retrait.

### Risques élevés

**Logo uniquement disponible en basse définition**  
Réponse : obtenir l’original vectoriel avant les maquettes finales.

**Équipe éditoriale de 5 à 6 personnes**  
Réponse : comptes nominatifs, formation, gestion de concurrence et comparaison
formelle entre Decap Turbo avec rôles et Pages CMS sans droits fins.

**Absence de données sportives structurées**  
Réponse : définir un format d’import, faire valider les données et interdire les
statistiques manuelles.

**Conflits Git entre éditeurs**  
Réponse : workflow éditorial, fichiers fins, prévisualisation, revue et
procédure de résolution.

### Risques modérés

**Croissance du dépôt média**  
Réponse : limites de poids, optimisation, originaux hors dépôt et revue
périodique.

**Traductions incomplètes**  
Réponse : statut par langue, contrôles CI et politique de repli explicite.

**Dépendance au broker OAuth**  
Réponse : composant minimal, audit, supervision et solution Turbo de repli.

**Évolution des offres gratuites**  
Réponse : revue annuelle des limites, architecture portable et documentation
de sortie.

---

## 16. Informations manquantes nécessitant l’intervention du club

### Priorité immédiate

- Responsable et budget autorisés pour la future acquisition du domaine.
- Répartition exacte des 5 à 6 personnes entre administration principale,
  administration sportive, administration éditoriale et contribution.
- Décision entre permissions fines payantes et accès éditorial large gratuit.
- Fichier vectoriel du logo et règles de marque existantes.
- Coordonnées du représentant autorisé à valider le projet.

### Contenu institutionnel

- Nom légal exact de l’association.
- Numéro RNA/SIREN si applicable.
- Adresse du siège et lieux d’entraînement.
- Coordonnées publiques.
- Histoire, valeurs, objectifs et organisation.
- Encadrants et informations dont la publication est autorisée.
- Affiliations et labels vérifiés.

### Contenu sportif

- Liste des compétitions et résultats officiels.
- Liste des athlètes publiables.
- Catégories et saisons utilisées par le club.
- Règles de comptage du palmarès à faire valider.
- Calendrier et actualités initiales.
- Textes Combat et Poomsae approuvés.

### Médias et droits

- Export Instagram et sélection autorisée.
- Liste des vidéos YouTube à mettre en avant.
- Photos originales, crédits et textes alternatifs.
- Preuves d’autorisation, notamment pour les mineurs.
- Contact et délai cible pour les demandes de retrait.

### Exploitation

- Adresse de réception du formulaire.
- Choix de la messagerie et politique de conservation.
- Comptes GitHub et Cloudflare propriétaires.
- Fréquence de publication estimée.
- Responsable des traductions anglaises.
- Personnes habilitées à publier et à valider.

---

## 17. Décisions proposées à validation

1. Valider Astro statique et TypeScript strict.
2. Choisir Decap Turbo avec rôles avancés ou Pages CMS avec droits larges.
3. Valider le coût et les limites d’authentification du scénario retenu.
4. Valider Cloudflare Pages comme hébergement prioritaire.
5. Confirmer que les fichiers Git sont l’unique source de vérité.
6. Valider le modèle séparant Competition, Result, Athlete et détails de
   discipline.
7. Valider la règle de comptage d’une médaille d’équipe comme un résultat.
8. Valider les routes `/fr/` et `/en/` et la politique de traduction.
9. Valider la direction visuelle bleu nuit/blanc avant maquette.
10. Autoriser l’acquisition du domaine avant la préparation de mise en ligne.

---

## 18. Point d’arrêt

La Phase 1 est documentaire. Aucun développement, dépôt Git, CMS, compte de
service, abonnement, déploiement ou changement DNS ne doit être engagé avant
validation explicite de ce rapport.
