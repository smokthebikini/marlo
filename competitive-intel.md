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
