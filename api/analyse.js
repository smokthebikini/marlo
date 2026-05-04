// api/analyse.js
// Proxy sécurisé — la clé API reste côté serveur

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url, type } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL manquante' });
  }

  // Valider que c'est bien une URL immobilière
  const domainesAutorisés = [
    'seloger.com', 'leboncoin.fr', 'pap.fr',
    'bienici.com', 'logic-immo.com', 'meilleursagents.com'
  ];
  let urlValide = false;
  try {
    const u = new URL(url);
    urlValide = domainesAutorisés.some(d => u.hostname.includes(d));
  } catch {
    return res.status(400).json({ error: 'URL invalide' });
  }
  if (!urlValide) {
    return res.status(400).json({ error: 'URL non supportée' });
  }

  // Prompt Claude
  const prompt = `Tu es Marlo, un copilote décisionnel pour l'achat immobilier en France.

Un utilisateur t'a soumis cette annonce : ${url}

Tu ne peux pas accéder à l'URL directement. Génère une analyse réaliste et utile basée sur ce que tu sais du marché immobilier français en 2025-2026.

Réponds UNIQUEMENT en JSON valide, sans markdown, sans backticks, sans texte avant ou après. Format exact :

{
  "titre": "Type de bien · Surface · Ville/Quartier",
  "prix_affiche": 000000,
  "prix_m2_annonce": 0000,
  "prix_m2_marche": 0000,
  "ecart_pct": 0,
  "score": 00,
  "verdict": "Finançable" | "À négocier" | "Surestimé" | "Bonne affaire",
  "jours_marche": 00,
  "marge_nego_min": 0000,
  "marge_nego_max": 00000,
  "signaux": [
    { "icon": "🔴" | "🟡" | "🟢", "texte": "Signal précis et actionnable" },
    { "icon": "🔴" | "🟡" | "🟢", "texte": "Signal précis et actionnable" },
    { "icon": "🔴" | "🟡" | "🟢", "texte": "Signal précis et actionnable" },
    { "icon": "🔴" | "🟡" | "🟢", "texte": "Signal précis et actionnable" }
  ],
  "questions": [
    "Question précise à poser au vendeur",
    "Question précise à poser au vendeur",
    "Question précise à poser au vendeur",
    "Question précise à poser au vendeur"
  ],
  "analyse_texto": "2-3 phrases de synthèse honnête sur ce bien, ton d'expert bienveillant"
}

Règles importantes :
- Les signaux doivent être PRÉCIS et UTILES, pas génériques. Cite des chiffres réels du marché.
- Les questions doivent être CHIRURGICALES — celles qu'un agent chevronné poserait
- Le score va de 10 (catastrophique) à 90 (excellent)
- marge_nego_min et marge_nego_max sont les montants en euros négociables estimés
- Sois honnête : si le prix semble juste, dis-le. Ne surjoue pas les alertes.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic error:', err);
      return res.status(500).json({ error: 'Erreur API Claude' });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '';

    // Parser le JSON proprement
    let rapport;
    try {
      // Nettoyer les éventuels backticks
      const clean = text.replace(/```json|```/g, '').trim();
      rapport = JSON.parse(clean);
    } catch (e) {
      console.error('JSON parse error:', text);
      return res.status(500).json({ error: 'Réponse IA invalide' });
    }

    return res.status(200).json({ success: true, rapport });

  } catch (err) {
    console.error('Fetch error:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
