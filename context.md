# Marlo — Context Document
*Référence projet · Mai 2026*

---

## Vision

Marlo est un **copilote décisionnel IA pour l'achat immobilier**.

L'objectif : aider les acheteurs (en priorité les primo-accédants) à prendre de meilleures décisions d'achat — avant, pendant et après la recherche — là où tous les acteurs existants s'arrêtent au crédit ou à la logistique.

**Pitch en une phrase :**
> *"L'agent immobilier IA que tu n'as pas les moyens de payer."*

---

## Origine — Pourquoi ce pivot

Marlo a démarré comme copilote mariage (budget, prestataires, retroplanning IA). Après analyse stratégique :

- Le marché mariage est structurellement limité : TAM restreint, usage unique, LTV ~100€/couple, rétention nulle
- Le vrai actif de Marlo n'est **pas** l'outil mariage — c'est un moteur de décision IA sur un achat complexe et émotionnel
- L'immobilier partage exactement la même mécanique (stress, asymétrie d'information, enjeu financier majeur) avec un TAM 10× supérieur et une LTV par transaction de 1 000–3 000€ (lead courtier)

---

## Positionnement

**Ce que Marlo fait :**
Accompagner l'acheteur de la première annonce à l'offre signée — analyse de prix, détection de risques, dossier acheteur, simulation financement.

**Ce que Marlo ne fait pas :**
Courtage (pas de carte T/ORIAS requis). Marlo est un "outil d'aide à la décision", pas un conseil financier ou juridique.

**Le vide confirmé :**
Pretto, SeLoger, MeilleursAgents, Bridebook, Bien'ici — aucun n'accompagne l'acheteur pendant la phase de recherche. Pretto commence quand le projet est formé. Marlo existe 3–6 mois avant.

---

## Modèle économique cible

### Phase 1 — MVP (maintenant)
- **Freemium B2C** : analyseur d'annonce gratuit, rapport complet gratuit
- Objectif : acquisition organique, pas de revenus immédiats
- Métriques à valider : rétention J+7, J+30

### Phase 2 — Monétisation initiale
- **Lead gen courtiers** : acheteur qualifié (budget + projet + timeline) → vendu 200–500€ à un courtier partenaire
- 3–5 courtiers partenaires signés manuellement
- Pas de Stripe/abonnement pour l'instant

### Phase 3 — Scale
- **SaaS B2B** : dashboard courtier/chasseur immo, 20–60€/mois
- **Commission crédit** : 0.5–1% du montant emprunté via partenariat courtier ORIAS
- Sur 300k€ empruntés = 1 500–3 000€ par transaction

---

## Produit — Ce qui est buildé

### Landing page (`marlo-immo.html`)
- Hero avec input URL d'annonce
- Rapport demo généré côté client (sans backend)
- Exemple de rapport statique
- Design Marlo : Inter, Geist Mono, accent #2020e8, thème clair forcé

### Tunnel conversationnel (`marlo-tunnel.html`)
- 8 écrans enchaînés façon Pretto : phrase dynamique construite par les choix
- Projet → achat seul/duo → type bien → prix → apport → revenus → charges → statut pro
- Calculs réels : taux d'endettement, mensualité 20 ans à 3.8%, frais notaire, apport minimum
- Rapport final : score dossier, verdict finançabilité, analyse prix m², signaux, questions vendeur, CTA crédit
- Tout en HTML/JS vanilla, zéro dépendance

---

## Stack technique

| Composant | Choix actuel | Évolution cible |
|---|---|---|
| Frontend | HTML/JS vanilla | Next.js |
| Auth + DB | — | Supabase |
| IA | — (simulé) | Claude API (Anthropic) |
| Backend | — | Vercel Edge Functions |
| Emails | — | Resend |
| Paiement | — | Stripe |
| Analytics | — | Posthog |
| Deploy | — | Vercel |

---

## Règles de développement (absolues)

- Thème clair forcé — jamais de dark mode (`color-scheme: light only`)
- Vérifier la balance des accolades JS avant chaque livraison
- Protéger contre NaN dans tous les calculs numériques
- Ne jamais casser les features existantes
- Inter pour la typo, Geist Mono pour les chiffres
- Accent : `#2020e8`
- Modifications par `str_replace` sur sections concernées — pas de réécriture complète sauf si demandé

---

## Variables CSS de référence

```css
--ink: #111110;
--ink-2: #3d3d3a;
--muted: #787774;
--subtle: #acaba8;
--border: #e8e8e4;
--bg: #ffffff;
--bg-off: #fafaf8;
--accent: #2020e8;
--accent-light: #eaeaff;
--green: #0f7b6c;
--green-bg: #edfaf6;
--red: #c7372f;
--red-bg: #fff5f5;
--amber: #b35309;
--amber-bg: #fef9ee;
--radius: 10px;
--radius-lg: 14px;
```

---

## Audience cible

**Utilisateur principal :** primo-accédant 28–42 ans, IDF ou grandes métropoles, premier achat immobilier, revenus 2 500–6 000€/mois net, stressé par l'opacité du marché.

**Utilisateur secondaire :** chasseur immo indépendant cherchant un outil pour qualifier et accompagner ses clients.

---

## Ce que Marlo n'est PAS

- Pas un annuaire de biens (SeLoger fait ça)
- Pas un simulateur de crédit (Pretto fait ça)
- Pas un agent immobilier (réglementairement interdit sans carte T)
- Pas un outil généraliste "pour tous les acheteurs" — commencer primo-accédants IDF uniquement
