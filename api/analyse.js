module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { url } = req.body;
  if (!url || typeof url !== 'string') return res.status(400).json({ error: 'URL manquante' });

  const domainesAutorisés = ['seloger.com', 'leboncoin.fr', 'pap.fr', 'bienici.com', 'logic-immo.com'];
  let urlValide = false;
  try {
    const u = new URL(url);
    urlValide = domainesAutorisés.some(d => u.hostname.includes(d));
  } catch { return res.status(400).json({ error: 'URL invalide' }); }
  if (!urlValide) return res.status(400).json({ error: 'URL non supportée' });

  const prompt = `Tu es Marlo, un copilote décisionnel pour l'achat immobilier en France. Un utilisateur t'a soumis cette annonce : ${url}. Tu ne peux pas accéder à l'URL directement. Génère une analyse réaliste basée sur le marché immobilier français 2025-2026. Réponds UNIQUEMENT en JSON valide, sans markdown. Format exact : {"titre":"Type · Surface · Ville","prix_affiche":000000,"prix_m2_annonce":0000,"prix_m2_marche":0000,"ecart_pct":0,"score":00,"verdict":"Finançable","jours_marche":00,"marge_nego_min":0000,"marge_nego_max":00000,"signaux":[{"icon":"🔴","texte":"Signal précis"}],"questions":["Question précise"],"analyse_texto":"2-3 phrases de synthèse"}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 1000, messages: [{ role: 'user', content: prompt }] })
    });

    const data = await response.json();
    const text = data.content?.[0]?.text || '';
    const clean = text.replace(/```json|```/g, '').trim();
    const rapport = JSON.parse(clean);
    return res.status(200).json({ success: true, rapport });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
