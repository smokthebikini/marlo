// api/analyse.js
// v3 — DVF géolocalisé + Claude avec vraies données de marché

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prix, surface, ville, type_bien, mode } = req.body;

  if (!prix || !surface || !ville) {
    return res.status(400).json({ error: 'Prix, surface et ville sont requis.' });
  }

  const prixNum = Number(prix);
  const surfaceNum = Number(surface);
  if (isNaN(prixNum) || prixNum <= 0 || isNaN(surfaceNum) || surfaceNum <= 0) {
    return res.status(400).json({ error: 'Prix et surface invalides.' });
  }

  const prixM2 = Math.round(prixNum / surfaceNum);
  const typeBien = type_bien || 'appartement';
  const modeAnalyse = mode || 'acheteur';

  // ── ÉTAPE 1 : Géocoder la ville/quartier ──
  let lat, lon, codeInsee, nomCommune;
  try {
    const geoRes = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(ville)}&limit=1`
    );
    const geoData = await geoRes.json();
    const feat = geoData.features?.[0];
    if (!feat) throw new Error('Ville introuvable');
    [lon, lat] = feat.geometry.coordinates;
    codeInsee = feat.properties.citycode;
    nomCommune = feat.properties.city || ville;
  } catch (e) {
    console.error('Geocoding error:', e.message);
    // Fallback : continuer sans DVF
    lat = null; lon = null; codeInsee = null;
  }

  // ── ÉTAPE 2 : Récupérer les transactions DVF ──
  let dvfContext = '';
  let dvfStats = null;

  if (lat && codeInsee) {
    try {
      const dept = codeInsee.startsWith('75') ? '75' :
                   codeInsee.startsWith('69') ? '69' :
                   codeInsee.substring(0, 2);

      // Télécharger le CSV DVF de l'année courante
      const annee = new Date().getFullYear() - 1; // données N-1 (dernière année complète)
      const csvUrl = `https://files.data.gouv.fr/geo-dvf/latest/csv/${annee}/communes/${dept}/${codeInsee}.csv`;
      const csvRes = await fetch(csvUrl);

      if (csvRes.ok) {
        const csvText = await csvRes.text();
        const transactions = parseDVF(csvText, lat, lon, 500, typeBien);

        if (transactions.length >= 5) {
          dvfStats = calculerStats(transactions);
          dvfContext = formatDVFContext(dvfStats, transactions.slice(0, 10), ville, annee);
        }
      }
    } catch (e) {
      console.error('DVF error:', e.message);
    }
  }

  // ── ÉTAPE 3 : Prompt Claude avec données réelles ──
  const contextDVF = dvfContext
    ? `\n\nDONNÉES DVF RÉELLES (transactions notariées dans un rayon de 500m) :\n${dvfContext}`
    : '\n\nNote: Données DVF non disponibles pour ce secteur — utilise tes connaissances du marché local.';

  const promptAcheteur = `Tu es Marlo, expert immobilier. Analyse ce bien avec précision.

BIEN À ANALYSER :
- Type : ${typeBien}
- Prix demandé : ${prixNum.toLocaleString('fr')} €
- Surface : ${surfaceNum} m²
- Prix au m² annoncé : ${prixM2.toLocaleString('fr')} €/m²
- Ville / Quartier : ${ville}
${contextDVF}

${dvfStats ? `Le prix au m² médian réel du secteur est de ${dvfStats.mediane.toLocaleString('fr')} €/m² (basé sur ${dvfStats.count} transactions notariées). Utilise CETTE donnée comme référence de marché.` : ''}

Réponds UNIQUEMENT en JSON valide, sans markdown, sans backticks :

{
  "titre": "${typeBien} · ${surfaceNum}m² · ${ville}",
  "prix_affiche": ${prixNum},
  "prix_m2_annonce": ${prixM2},
  "prix_m2_marche": ${dvfStats ? dvfStats.mediane : 0},
  "ecart_pct": ${dvfStats ? (((prixM2 - dvfStats.mediane) / dvfStats.mediane) * 100).toFixed(1) : 0},
  "score": 00,
  "verdict": "Bonne affaire" | "Prix cohérent" | "À négocier" | "Surestimé",
  "jours_marche": 00,
  "marge_nego_min": 0000,
  "marge_nego_max": 00000,
  "source_marche": "${dvfStats ? `DVF ${dvfStats.count} transactions 500m` : 'Estimation marché'}",
  "signaux": [
    { "icon": "🔴" | "🟡" | "🟢", "texte": "Signal précis avec chiffres réels" },
    { "icon": "🔴" | "🟡" | "🟢", "texte": "Signal précis et actionnable" },
    { "icon": "🔴" | "🟡" | "🟢", "texte": "Signal précis et actionnable" },
    { "icon": "🔴" | "🟡" | "🟢", "texte": "Signal précis et actionnable" }
  ],
  "questions": [
    "Question chirurgicale à poser au vendeur",
    "Question chirurgicale à poser au vendeur",
    "Question chirurgicale à poser au vendeur",
    "Question chirurgicale à poser au vendeur"
  ],
  "analyse_texto": "2-3 phrases de synthèse honnête avec les chiffres DVF réels"
}

Règles :
- prix_m2_marche = ${dvfStats ? dvfStats.mediane : 'estime-le depuis tes connaissances du marché'}
- ecart_pct = ${dvfStats ? (((prixM2 - dvfStats.mediane) / dvfStats.mediane) * 100).toFixed(1) : 'calcule-le'}
- score : 10 (catastrophique) → 90 (excellent). Si ecart > 15% = score < 40. Si ecart < 0% = score > 70.
- marge_nego : montants en euros réalistes selon l'écart constaté
- Le 1er signal DOIT mentionner les données DVF si disponibles`;

  const promptInvestisseur = `Tu es Marlo, expert en investissement locatif. Analyse ce bien.

BIEN À ANALYSER :
- Type : ${typeBien}
- Prix demandé : ${prixNum.toLocaleString('fr')} €
- Surface : ${surfaceNum} m²
- Prix au m² annoncé : ${prixM2.toLocaleString('fr')} €/m²
- Ville / Quartier : ${ville}
${contextDVF}

${dvfStats ? `Prix médian marché : ${dvfStats.mediane.toLocaleString('fr')} €/m² (${dvfStats.count} transactions DVF).` : ''}

Réponds UNIQUEMENT en JSON valide, sans markdown, sans backticks :

{
  "titre": "${typeBien} · ${surfaceNum}m² · ${ville}",
  "prix_affiche": ${prixNum},
  "prix_m2_annonce": ${prixM2},
  "prix_m2_marche": ${dvfStats ? dvfStats.mediane : 0},
  "ecart_pct": ${dvfStats ? (((prixM2 - dvfStats.mediane) / dvfStats.mediane) * 100).toFixed(1) : 0},
  "score": 00,
  "verdict": "Opportunité" | "Passable" | "À éviter",
  "jours_marche": 00,
  "marge_nego_min": 0000,
  "marge_nego_max": 00000,
  "loyer_estime": 000,
  "loyer_net_estime": 000,
  "rendement_brut": 0.0,
  "rendement_net": 0.0,
  "cashflow_mensuel": 0,
  "tension_locative": "Forte 🔥" | "Modérée 📊" | "Faible ⚠️",
  "verdict_investissement": "Opportunité" | "Passable" | "À éviter",
  "verdict_investissement_desc": "Synthèse honnête sur la rentabilité",
  "source_marche": "${dvfStats ? `DVF ${dvfStats.count} transactions 500m` : 'Estimation marché'}",
  "signaux": [
    { "icon": "🔴" | "🟡" | "🟢", "texte": "Signal précis avec chiffres réels" },
    { "icon": "🔴" | "🟡" | "🟢", "texte": "Signal précis et actionnable" },
    { "icon": "🔴" | "🟡" | "🟢", "texte": "Signal précis et actionnable" }
  ],
  "signaux_investisseur": [
    { "icon": "🔴" | "🟡" | "🟢", "texte": "Signal rentabilité avec chiffres réels" },
    { "icon": "🔴" | "🟡" | "🟢", "texte": "Signal rentabilité avec chiffres réels" },
    { "icon": "🔴" | "🟡" | "🟢", "texte": "Signal rentabilité avec chiffres réels" }
  ],
  "questions": [
    "Question investisseur à poser",
    "Question investisseur à poser",
    "Question investisseur à poser"
  ],
  "analyse_texto": "2-3 phrases de synthèse sur la rentabilité avec chiffres réels"
}`;

  const prompt = modeAnalyse === 'investisseur' ? promptInvestisseur : promptAcheteur;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 1200,
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

    let rapport;
    try {
      const clean = text.replace(/```json|```/g, '').trim();
      rapport = JSON.parse(clean);
    } catch (e) {
      console.error('JSON parse error:', text);
      return res.status(500).json({ error: 'Réponse IA invalide' });
    }

    // Injecter les stats DVF dans la réponse pour affichage
    if (dvfStats) {
      rapport._dvf = {
        count: dvfStats.count,
        mediane: dvfStats.mediane,
        min: dvfStats.min,
        max: dvfStats.max,
        rayon: 500
      };
    }

    return res.status(200).json({ success: true, rapport });

  } catch (err) {
    console.error('Fetch error:', err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}

// ── HELPERS DVF ──

function parseDVF(csvText, targetLat, targetLon, rayonM, typeBien) {
  const lines = csvText.split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',');
  const idx = (name) => headers.indexOf(name);

  const I = {
    vf: idx('valeur_fonciere'),
    surf: idx('surface_reelle_bati'),
    type: idx('type_local'),
    lat: idx('latitude'),
    lon: idx('longitude'),
    date: idx('date_mutation'),
  };

  // Mapper le type_bien utilisateur vers type_local DVF
  const typeMap = {
    'appartement': 'Appartement',
    'studio': 'Appartement',
    'loft': 'Appartement',
    'maison': 'Maison',
    'terrain': 'Terrain',
  };
  const typeDVF = typeMap[typeBien] || 'Appartement';

  const transactions = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    if (cols.length < 10) continue;

    try {
      const type = cols[I.type]?.trim();
      if (type !== typeDVF) continue;

      const lat = parseFloat(cols[I.lat]);
      const lon = parseFloat(cols[I.lon]);
      const vf = parseFloat(cols[I.vf]?.replace(',', '.'));
      const surf = parseFloat(cols[I.surf]?.replace(',', '.') || '0');

      if (isNaN(lat) || isNaN(lon) || isNaN(vf) || isNaN(surf)) continue;
      if (surf < 9 || vf < 30000) continue;

      const pm2 = Math.round(vf / surf);
      if (pm2 < 1000 || pm2 > 30000) continue;

      const d = haversine(targetLat, targetLon, lat, lon);
      if (d > rayonM) continue;

      transactions.push({
        date: cols[I.date],
        prix: vf,
        surface: surf,
        pm2,
        dist: Math.round(d)
      });
    } catch (_) {}
  }

  return transactions.sort((a, b) => b.date.localeCompare(a.date));
}

function calculerStats(transactions) {
  const pm2s = transactions.map(t => t.pm2).sort((a, b) => a - b);
  const med = pm2s[Math.floor(pm2s.length / 2)];
  const avg = Math.round(pm2s.reduce((s, v) => s + v, 0) / pm2s.length);
  return {
    count: transactions.length,
    mediane: med,
    moyenne: avg,
    min: pm2s[0],
    max: pm2s[pm2s.length - 1],
    p25: pm2s[Math.floor(pm2s.length * 0.25)],
    p75: pm2s[Math.floor(pm2s.length * 0.75)],
  };
}

function formatDVFContext(stats, transactions, ville, annee) {
  const lignes = transactions.slice(0, 8).map(t =>
    `  - ${t.date} | ${t.surface}m² | ${Math.round(t.prix).toLocaleString('fr')}€ | ${t.pm2.toLocaleString('fr')}€/m² | à ${t.dist}m`
  ).join('\n');

  return `Secteur: ${ville} (rayon 500m) | Année: ${annee}
Statistiques (${stats.count} transactions appartements) :
  - Médiane : ${stats.mediane.toLocaleString('fr')} €/m²
  - Moyenne : ${stats.moyenne.toLocaleString('fr')} €/m²
  - Q1 (25%) : ${stats.p25.toLocaleString('fr')} €/m²
  - Q3 (75%) : ${stats.p75.toLocaleString('fr')} €/m²
  - Min / Max : ${stats.min.toLocaleString('fr')} / ${stats.max.toLocaleString('fr')} €/m²
Dernières transactions :
${lignes}`;
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dlat = (lat2 - lat1) * Math.PI / 180;
  const dlon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dlat/2)**2 +
    Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * Math.sin(dlon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
