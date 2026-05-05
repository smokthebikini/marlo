# Marlo — Competitive Intelligence
*Analyse concurrence · Mai 2026*

---

## Cartographie des acteurs

| Acteur | Segment | Ce qu'ils font | Ce qu'ils ne font pas | Verdict Marlo |
|---|---|---|---|---|
| SeLoger / Bien'ici | Portails FR | Distribution annonces, SEO massif | Accompagnement décisionnel | Concurrent indirect — distribution imbattable |
| MeilleursAgents | Estimation FR | Prix au m², données transactions | Aide à l'achat, IA | Donnée utile, pas concurrent |
| Pretto | Crédit FR | Simulation crédit, mise en relation courtier | Décision d'achat, phase recherche | Partenaire naturel pour le CTA crédit |
| Cafpi / Meilleurtaux | Crédit FR | Courtage traditionnel | Digital, IA, acheteur early stage | Non pertinent |
| Hosman / Liberkeys | Agent low-cost | Vente sans commission | IA décisionnelle, acheteur | Non concurrent |
| Homepilot / Flatsy | Gestion locative | Locatif | Achat | Non pertinent |
| Chasseurs immo indépendants | Accompagnement | Recherche personnalisée | Scalable, accessible, digital | Partenaires distribution cibles |

---

## Analyse Pretto approfondie
*Source : test complet du tunnel app.pretto.fr — Mai 2026*

### Ce qu'ils font très bien

**Tunnel conversationnel** (écrans 3–15 du test)
- Phrase construite dynamiquement avec les choix : *"Vous êtes **chef d'entreprise** depuis **Janvier 2021**"*
- Une question par écran, boutons plutôt que champs texte
- Progression visible (barre en haut)
- Crée une sensation de personnalisation forte, réduit l'anxiété du formulaire long
- **→ Pattern à copier intégralement dans Marlo**

**Page résultat "non finançable"** (écrans 11–18)
- Au lieu de perdre l'utilisateur, ils expliquent *pourquoi* avec 3 sections dépliables
- Proposent des solutions concrètes avec CTAs actionnables ("Ajouter un co-emprunteur", "Acheter un bien neuf")
- Garde la main sur l'étape suivante : "Modifier ma simulation"
- Feedback utilisateur en bas (emojis) pour itérer
- **→ Notre page rapport doit avoir la même logique de rétention**

**Finspot** (écran 1)
- Scanner d'offres bancaires en temps réel, 125 banques
- Logos de banques = social proof produit fort
- **→ Équivalent Marlo : afficher les courtiers partenaires dans le CTA final**

**Personnalisation par profil** (écrans 14–16)
- Détection chef d'entreprise → écran interstitiel rassurant ("Vous êtes entre de bonnes mains")
- Conseils adaptés au statut pro dans les revenus
- **→ Marlo doit faire pareil : adapter les signaux et questions selon le profil réel**

### Ce que Pretto ne fait PAS — Le vide Marlo

1. **Zéro analyse du bien** — Pretto parle crédit, jamais "est-ce que ce bien vaut ce prix ?"
2. **Zéro aide pendant la phase de recherche** — leur tunnel commence quand le projet est formé. Marlo existe 3–6 mois avant
3. **Zéro IA conversationnelle** — c'est du formulaire intelligent, pas du copilote
4. **Zéro dossier acheteur** — ils qualifient financièrement mais ne donnent pas d'outil à présenter aux agents
5. **Zéro signaux de risque sur le bien** — DPE, durée annonce, red flags annonce

### La complémentarité naturelle

```
Marlo (phase recherche)  →  CTA "Simuler mon crédit"  →  Pretto (phase financement)
```

Le partenariat lead gen le plus évident : Marlo envoie des leads qualifiés à Pretto ou à des courtiers indépendants. Commission ~1% du montant emprunté.

---

## Analyse SeLoger / Bien'ici

### Forces
- Distribution massive : 1er et 2e portails immo FR par trafic
- SEO imbattable : années d'autorité de domaine
- Données de prix via filiales (MeilleursAgents pour SeLoger)
- Ressources pour intégrer GPT-4 rapidement

### Faiblesses
- Modèle économique côté vendeurs/agences → incitation à montrer des biens, pas à aider l'acheteur
- UX datée, pas mobile-first
- Aucune aide à la décision — juste de la recherche et des filtres
- Slow movers : 12–18 mois pour intégrer une feature IA significative

### Risque pour Marlo
**Élevé à 18 mois.** Si SeLoger intègre un analyseur d'annonce IA, il a la distribution pour tuer le wedge. **C'est pourquoi le moat données doit être construit maintenant**, avant que la couche IA soit commoditisée.

---

## Analyse MeilleursAgents

### Ce qu'ils ont
- Base de données transactions DVF enrichie
- Estimation au m² par rue, par immeuble
- Rachat par SeLoger → intégration portail

### Ce qu'ils n'ont pas
- Aide à la décision d'achat
- Analyse du bien spécifique (seulement le prix, pas les risques)
- Relation continue avec l'acheteur

### Opportunité
Leurs données de prix sont la source de vérité pour Marlo. Deux options :
1. Utiliser l'API DVF (données publiques gratuites) comme base
2. Négocier un partenariat data avec MeilleursAgents

---

---

## Analyse approfondie : LyBox, Horiz.io, Simulateur Locatif
*Source : test terrain + avis App Store · Mai 2026*

### LyBox

**Ce qu'ils font :**
- Extension Chrome qui analyse les annonces directement sur SeLoger, Leboncoin, etc.
- Moteur de recherche multi-sites (1500+ sources)
- Calcul automatique : rendement brut/net, cashflow, prix au m² vs marché
- Alertes email/push sur nouveaux biens rentables
- Dossier bancaire PDF exportable
- Favoris multi-appareils avec persistance

**Ce qu'ils ne font PAS — notre terrain :**
- Zéro analyse décisionnelle ("dois-je acheter ce bien ?")
- Zéro accompagnement primo-accédant résidence principale
- Nécessite une extension Chrome → friction énorme (installation)
- Outil pour investisseur expert, pas pour acheteur lambda
- Payant avec abonnement mensuel
- Zéro IA conversationnelle

**Avertissement légal :** LyBox scrape les portails immobiliers. Ils ont des CGU tendues avec SeLoger/Leboncoin. Risque légal à surveiller — ne pas copier cette approche.

---

### Horiz.io

**Ce qu'ils font :**
- Application mobile + web pour simuler la rentabilité locative
- Formules complètes : VAN, TRI, cashflow sur 25 ans, fiscalité LMNP/SCI/Pinel
- Alertes push sur nouvelles annonces rentables
- Plugin qui enrichit les annonces immobilières

**Avis utilisateurs — enseignements directs :**

✅ *"Le service d'alertes en temps réel fonctionne bien avec les notifs push"* → les alertes sont la feature la plus appréciée, indépendamment du reste

✅ *"Très utile pour suivre le marché localement tout en étant à distance"* → la notion de surveillance passive à distance est très valorisée

❌ *"Quand tu cliques sur simuler le projet d'achat, tu veux la simulation dans l'app et pas sur ton navigateur web"* → les redirections cassent l'expérience. **Marlo ne doit jamais faire de redirection mid-flow.**

❌ *"Trop de crash lors des recherches avancées"* → la complexité crée des bugs. Notre approche simple = moins de bugs

❌ *"La recherche ne s'effectue que par ville"* → leurs filtres géographiques sont limités

**Ce qu'ils ne font PAS — notre terrain :**
- Zéro analyse d'une annonce spécifique à la demande (URL)
- Zéro accompagnement primo-accédant
- Complexité rebutante pour le non-expert

---

### Simulateur Locatif (app + simulateur-locatif.fr)

**Ce qu'ils font :**
- Simulateur fiscal ultra-complet : micro-foncier, LMNP, SCI, déficit foncier, Pinel
- PDF 4 pages avec graphiques cashflow, VAN, TRI sur 25 ans, tableaux fiscaux annuels
- Tableau d'amortissement exportable
- Paramètres avancés : CFE, CRL, amortissement gros œuvre/façades/équipements IGT

**Avis utilisateurs — enseignements directs :**

✅ *"Superbe appli pour avoir un bon visuel sur la rentabilité d'un projet"* → la visualisation est clé

✅ *"Hyper simple d'utilisation"* → paradoxalement, malgré la complexité, l'UX est appréciée

❌ *"Dommage qu'on ne puisse pas renseigner son profil fiscal commun à toutes les simulations"* → **les utilisateurs veulent UN profil persistant qui s'applique partout**. C'est exactement ce que notre tunnel crée.

❌ *"L'enregistrement des simulations dans l'application ne semble pas fonctionner"* → la persistance des données est le problème #1 non résolu par tous ces acteurs. **C'est pourquoi Supabase est critique pour Marlo.**

❌ *"Il manque l'amortissement du bâti... ça fait toute la différence en LMNP"* → leurs utilisateurs experts veulent encore plus de complexité. Ce n'est pas notre cible.

**Ce qu'ils ne font PAS — notre terrain :**
- Zéro connexion aux annonces (tout est manuel)
- Zéro IA, zéro décisionnel
- PDF trop dense pour être partagé facilement

---

## Enseignements produit directs — À intégrer dans Marlo

### Ce qu'on doit faire (validé par les avis concurrents)

**1. Persistance des données = priorité absolue**
Tous les concurrents échouent là-dessus. Les utilisateurs le réclament explicitement dans les avis. Supabase doit être branché avant d'envoyer Marlo à des early users.

**2. Profil unique partagé entre tous les biens**
Les utilisateurs veulent renseigner leur profil fiscal/financier une fois. Notre tunnel crée ce profil — c'est un différenciateur réel, à mettre en avant dans le wording.

**3. Alertes email = feature star**
Citée en positif chez LyBox et Horiz. À builder en mois 2 avec Resend. Wording suggéré : *"Ce bien que tu surveilles vient de baisser de 12 000€"*.

**4. PDF rapport = "effet waouh" documenté**
LyBox documente que leur PDF crée un "effet waouh garanti lors du rendez-vous" bancaire. Notre PDF Marlo doit être plus clair, moins dense, et brandé pour l'acheteur (pas l'investisseur).

**5. Zéro redirection mid-flow**
Les utilisateurs Horiz se plaignent des redirections. Marlo doit garder l'utilisateur sur la même page du début à la fin.

**6. Expérience fluide > Fonctionnalités complètes**
Les outils les plus notés positivement sont ceux décrits comme "simples" malgré leur complexité sous-jacente. L'interface doit masquer la complexité.

### Ce qu'on ne doit PAS faire

- **Ne pas scraper les portails** → risque légal confirmé (LyBox marche sur des œufs avec SeLoger/Leboncoin)
- **Ne pas complexifier l'interface** → VAN, TRI, amortissement IGT, CFE = perte immédiate de notre cible
- **Ne pas forcer l'inscription avant la valeur** → le tunnel doit rester optionnel jusqu'à ce que l'utilisateur veuille sauvegarder
- **Ne pas faire une app mobile** → le web sans installation est notre avantage face à LyBox (extension) et Simulateur Locatif (app)

---

## Positionnement différenciant confirmé

| Ce que fait la concurrence | Ce que fait Marlo |
|---|---|
| Tu cherches des biens → on t'aide à filtrer | Tu as trouvé un bien → on t'aide à décider |
| Tu dois être expert pour utiliser l'outil | Tu ne sais rien, c'est normal |
| Formulaires manuels | Une URL suffit |
| Investisseur locatif | Acheteur primo-accédant |
| Extension Chrome ou app à installer | Web, zéro friction |
| Payant dès le départ | Gratuit, lead gen vers courtiers |
| Données que tu entres | IA qui analyse pour toi |

**La phrase qui résume tout :**
*"Eux font des outils pour ceux qui savent déjà. Marlo fait un outil pour ceux qui apprennent."*

---

## Le vide stratégique confirmé

```
Phase 1 : Je cherche des biens          → [MARLO] ← vide actuel
Phase 2 : J'ai un projet précis         → Pretto, courtiers
Phase 3 : J'ai un financement           → Notaire, diagnostiqueurs
```

Personne n'accompagne l'acheteur en phase 1. C'est là que la douleur est maximale (incertitude, peur de se tromper, asymétrie d'information totale) et là que Marlo s'installe.

---

## Signaux de marché

- **Zola** (US, mariage) a levé des dizaines de millions et leur réponse à la décision c'est des humains en chat → validation que le besoin existe, la réponse scalable IA manque
- **Elle.fr** (2025) recommande encore Canva et Pinterest pour organiser un mariage → même vide sur l'immo, aucun outil natif décisionnel cité
- **DVF** (données gouvernementales) : toutes les transactions immobilières françaises depuis 2014, accessibles gratuitement → source de données marché légale et gratuite pour Marlo

---

## Conclusion stratégique

**Le moat de Marlo n'est pas l'IA** (tout le monde peut en faire) — **c'est la donnée comportementale des acheteurs**.

Chaque analyse d'annonce, chaque simulation de tunnel, chaque décision prise dans Marlo crée un dataset que personne d'autre n'a :
- Budget réel vs déclaré
- Timeline d'achat
- Sensibilité prix
- Quartiers alternatifs considérés
- Signaux de blocage (endettement, apport)

Avec assez de données, Marlo peut prédire la probabilité d'achat, scorer les leads pour les courtiers, et devenir indispensable dans le workflow acheteur → courtier → notaire.

**C'est cette vision qu'on vend aux investisseurs. Pas un analyseur d'annonce.**
