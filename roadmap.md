# Marlo — Roadmap
*Mai 2026 · Version 2.0 — Modèle économique validé*

---

## Modèle économique

### Le principe
Marlo est un apporteur d'affaires intelligent. On accompagne l'acheteur de la première annonce au financement, et on se rémunère sur les leads qualifiés envoyés aux courtiers.

```
Acheteur gratuit → Qualifié → Lead courtier (150–400€) → Commission crédit (phase 2)
```

### Phase 1 — Lead qualifié payant
- Définition d'un lead qualifié : tunnel complété + budget > 150k€ + projet < 6 mois
- Prix : 150€/lead pour les 10 premiers, puis 250–400€
- Légalement simple : apporteur d'affaires, pas d'ORIAS nécessaire

### Phase 2 — Commission sur crédit (mois 6+)
- 0,5 à 1% du montant emprunté via partenariat courtier ORIAS
- Sur 300k€ empruntés = 1 500 à 3 000€ par transaction
- **Attention : valider la réglementation avec un avocat avant de démarrer**

### Ce qui sécurise le modèle
- Le dossier pré-rempli Marlo = switching cost fort
- Le formulaire de mise en relation = traçabilité complète de chaque lead
- L'accord contractuel signé avec chaque courtier = obligation de déclaration
- Diversifier : minimum 5 courtiers, aucun > 30% du revenu

---

## Métriques à valider

1. **Rétention J+30** — les acheteurs reviennent-ils ?
2. **CAC < 15€** — peut-on acquérir à faible coût ?
3. **Conversion lead** — un courtier paie-t-il pour ces leads ?
4. **Taux de closing** — quel % des leads Marlo aboutissent à un crédit ?

---

## ✅ Fait — MVP complet

- [x] Landing V5 — analyseur annonce + toggle acheteur/investisseur + inscription
- [x] Tunnel V2 — 9 étapes, profil propriétaire, calculs bancaires réels
- [x] Dashboard — liste biens + comparaison + profil
- [x] Formulaire mise en relation courtier
- [x] Proxy Vercel prêt (clé API sécurisée)
- [x] Design system Direction A Clarity
- [x] 3 docs projet (context, roadmap, competitive intel)

---

## 🔴 Cette semaine — Priorité absolue

**1. Déployer (mardi matin, sur ordi)**
- GitHub → Vercel → ANTHROPIC_API_KEY → tester avec vraie URL SeLoger

**2. Signer 3 courtiers indépendants IDF**
- LinkedIn : "courtier immobilier indépendant Paris"
- Script : *"J'envoie des leads qualifiés — brief structuré complet. Gratuit pour 10 premiers, puis 150€/lead."*
- Pas de grands réseaux — des indépendants

**3. Valider la réglementation apporteur d'affaires**
- 1h avocat fintech/immobilier (~300€)
- Question clé : ORIAS nécessaire pour le lead payant ?

**4. Appeler les 3 potes (acheteurs + investisseur)**
- Acheteurs : peur #1 ? auriez-vous payé ? ce qui manque ?
- Investisseur : quel signal t'aurait évité une erreur ?

---

## 🔲 Phase 1 — IA + Persistance (Mois 1)

**Claude API — prompt enrichi avec audit qualité :**
- Cashflow = loyer - mensualité - charges copro - taxe foncière - assurance PNO - vacance 8%
- Rendement net basé sur régime fiscal réel (LMNP vs nu)
- Tension locative chiffrée : "X demandes pour 1 logement"
- DPE F/G : "Travaux obligatoires avant 2028, budget X–Y k€, impact rentabilité"

**Supabase :**
- Table users, biens, leads
- Magic link email

---

## 🔲 Phase 2 — Lead gen opérationnel (Mois 1–2)

**Brief courtier — ce que reçoit le partenaire :**
```
Lead Marlo — [prénom] · [email]
Budget : X € · Apport : X €
Revenus : X €/mois · Taux endettement : X%
Capacité emprunt estimée : X €
Projet : [type] · [seul/duo] · [timeline]
Situation : [locataire / proprio]
Biens analysés : X
Maturité : [réflexion / recherche active / offre imminente]
```

**Tracking leads :**
- ID unique par lead dans Supabase
- Statut : envoyé → contacté → RDV → dossier → signé
- Dashboard courtier minimal pour mise à jour statut

**Accord contractuel :**
- Convention apporteur d'affaires signée
- Obligation déclaration mensuelle des conversions
- Paiement 30 jours après déclaration
- Clause : lead identifié par email Marlo = commission due

---

## 🔲 Phase 3 — Moat données + Dossier acheteur (Mois 2–3)

**Dossier acheteur PDF**
- Généré depuis le tunnel : profil + capacité + projet + motivations
- Partageable avec agent ou courtier en 1 clic
- Principal switching cost — reconstruire ailleurs = des heures

**Base de données propriétaire**
- 500+ tunnels complétés = dataset irréplicable
- Prix réels déclarés vs prix affichés
- Patterns de décision (quels biens déclenchent une offre ?)

---

## 🔲 Phase 4 — Scale & Levée (Mois 4–6)

**Ce qu'il faut montrer :**
- 1 000+ utilisateurs actifs · Rétention J+30 > 40%
- 5+ courtiers · Taux closing leads > 15%
- 500+ tunnels complétés

**Pitch :**
> *"On a les données d'intention d'achat que SeLoger n'a pas — budget réel, timeline, profil d'endettement. On se rémunère uniquement quand la transaction a lieu."*

---

## Risques et mitigations

| Risque | Probabilité | Mitigation |
|---|---|---|
| Utilisateurs sortent du funnel | Haute | Dossier pré-rempli = switching cost naturel |
| Courtiers ne paient pas | Moyenne | Contrat signé + ID lead unique |
| Requalification ORIAS | Moyenne | Avocat AVANT la commission sur crédit |
| SeLoger copie l'analyseur | Haute (18 mois) | Moat données + dossier acheteur |
| Cycle de vente long 8–12 mois | Certaine | Lead payant pour cashflow court terme |

---

## À éviter absolument

- Proposer le courtier avant que l'utilisateur soit qualifié
- Signer avec 1 seul courtier en exclusivité
- Démarrer la commission sur crédit sans validation juridique
- Builder des features avant d'avoir 3 courtiers signés
- Mettre un verrou pour forcer la rétention
