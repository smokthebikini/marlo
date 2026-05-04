# Marlo API — Instructions de déploiement

## Ce que contient ce dossier

```
marlo-api/
├── api/
│   └── analyse.js     ← Proxy Claude API (sécurisé)
├── index.html         ← Landing page Marlo
├── vercel.json        ← Config Vercel
├── package.json       ← Config Node
└── README.md          ← Ce fichier
```

---

## Déploiement en 5 minutes

### 1. Pusher sur GitHub

```bash
cd marlo-api
git init
git add .
git commit -m "Marlo immo - MVP avec Claude API"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/marlo-api.git
git push -u origin main
```

### 2. Connecter à Vercel

1. Va sur vercel.com → "Add New Project"
2. Importe le repo GitHub `marlo-api`
3. Laisse tous les paramètres par défaut
4. Clique "Deploy"

### 3. Ajouter la clé API (IMPORTANT)

Dans Vercel → Settings → Environment Variables :

| Name | Value |
|---|---|
| `ANTHROPIC_API_KEY` | `sk-ant-api03-...` (ta nouvelle clé) |

Redéploie après avoir ajouté la variable.

### 4. Mettre à jour l'URL dans index.html

Dans `index.html`, ligne ~680, remplace :
```js
const PROXY_URL = 'https://marlo-api.vercel.app/api/analyse';
```
Par l'URL réelle de ton projet Vercel (ex: `https://marlo-abc123.vercel.app/api/analyse`).

---

## Limites de sécurité recommandées

- **Plafond Anthropic** : 5€/mois sur console.anthropic.com
- **Rate limit Vercel** : activé par défaut sur le plan gratuit
- Ne jamais commiter la clé API dans le code

---

## Test local

```bash
npm install -g vercel
vercel dev
```

Puis ouvre http://localhost:3000
