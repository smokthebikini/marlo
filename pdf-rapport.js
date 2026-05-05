// ── MARLO — Générateur de rapport PDF ──
// Utilise jsPDF (chargé depuis CDN dans index.html)

function genererPDF(rapport, urlAnnonce) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  const W = 210;
  const bleu = [32, 32, 232];
  const encre = [17, 17, 16];
  const gris = [120, 119, 116];
  const grisClair = [232, 232, 228];
  const vert = [15, 123, 108];
  const rouge = [199, 55, 47];
  const ambre = [179, 83, 9];
  const blanc = [255, 255, 255];

  const score = rapport.score || 50;
  const scoreColor = score >= 70 ? vert : score >= 50 ? ambre : rouge;
  const verdict = rapport.verdict || 'À analyser';
  const titre = rapport.titre || 'Bien immobilier';
  const prixAffiche = rapport.prix_affiche || 0;
  const pm2 = rapport.prix_m2_annonce || 0;
  const pm2m = rapport.prix_m2_marche || 0;
  const ecart = rapport.ecart_pct || 0;
  const margeMin = rapport.marge_nego_min || 0;
  const margeMax = rapport.marge_nego_max || 0;
  const signaux = rapport.signaux || [];
  const questions = rapport.questions || [];
  const analyse = rapport.analyse_texto || '';
  const date = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  // ── PAGE 1 ──

  // Header bleu
  doc.setFillColor(...bleu);
  doc.rect(0, 0, W, 42, 'F');

  // Logo marlo
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...blanc);
  doc.text('marlo', 16, 18);

  // Tagline
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(200, 200, 255);
  doc.text('Votre copilote décisionnel immobilier', 16, 25);

  // Date + type rapport
  doc.setFontSize(8);
  doc.setTextColor(180, 180, 230);
  doc.text(`Rapport généré le ${date}`, 16, 32);

  // Score cercle
  doc.setFillColor(...scoreColor);
  doc.circle(183, 21, 13, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...blanc);
  doc.text(String(score), 183, 24, { align: 'center' });
  doc.setFontSize(7);
  doc.text('/ 100', 183, 30, { align: 'center' });

  let y = 54;

  // Titre du bien
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...encre);
  doc.text(titre, 16, y);
  y += 7;

  // Verdict badge
  doc.setFillColor(...scoreColor);
  doc.roundedRect(16, y, 38, 7, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...blanc);
  doc.text(verdict.toUpperCase(), 35, y + 4.8, { align: 'center' });
  y += 14;

  // URL source
  if (urlAnnonce) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...gris);
    const urlCourte = urlAnnonce.length > 70 ? urlAnnonce.substring(0, 70) + '…' : urlAnnonce;
    doc.text('Source : ' + urlCourte, 16, y);
    y += 10;
  }

  // ── SECTION PRIX ──
  doc.setFillColor(248, 248, 252);
  doc.roundedRect(14, y, W - 28, 40, 3, 3, 'F');
  doc.setDrawColor(...grisClair);
  doc.roundedRect(14, y, W - 28, 40, 3, 3, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...gris);
  doc.text('ANALYSE DES PRIX', 20, y + 8);

  // 3 colonnes prix
  const colW = (W - 28) / 3;
  const col1x = 14, col2x = 14 + colW, col3x = 14 + colW * 2;

  // Col 1 — Prix annoncé
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...gris);
  doc.text('Prix annoncé / m²', col1x + colW/2, y + 16, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...encre);
  doc.text(pm2 > 0 ? pm2.toLocaleString('fr') + ' €' : '—', col1x + colW/2, y + 25, { align: 'center' });

  // Col 2 — Marché
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...gris);
  doc.text('Prix marché / m²', col2x + colW/2, y + 16, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...vert);
  doc.text(pm2m > 0 ? pm2m.toLocaleString('fr') + ' €' : '—', col2x + colW/2, y + 25, { align: 'center' });

  // Ligne séparatrice
  doc.setDrawColor(...grisClair);
  doc.line(col2x, y + 10, col2x, y + 36);
  doc.line(col3x, y + 10, col3x, y + 36);

  // Col 3 — Marge négo
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(...gris);
  doc.text('Marge négociable', col3x + colW/2, y + 16, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...bleu);
  const margeText = margeMin > 0 ? `${margeMin.toLocaleString('fr')} – ${margeMax.toLocaleString('fr')} €` : '~Juste prix';
  doc.text(margeText, col3x + colW/2, y + 25, { align: 'center' });

  // Prix total
  if (prixAffiche > 0) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...gris);
    doc.text(`Prix affiché : ${prixAffiche.toLocaleString('fr')} €  ·  Écart vs marché : ${ecart > 0 ? '+' : ''}${ecart}%`, 16, y + 35);
  }

  y += 48;

  // ── SIGNAUX ──
  if (signaux.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...encre);
    doc.text('Signaux détectés', 16, y);
    y += 7;

    signaux.forEach(s => {
      const icon = s.icon || '🟡';
      const couleur = icon === '🔴' ? rouge : icon === '🟢' ? vert : ambre;
      doc.setFillColor(...couleur);
      doc.circle(19, y - 1.5, 2, 'F');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...encre);
      const lines = doc.splitTextToSize(s.texte || '', W - 42);
      doc.text(lines, 24, y);
      y += lines.length * 5 + 3;
    });

    y += 4;
  }

  // ── SYNTHÈSE IA ──
  if (analyse) {
    doc.setFillColor(234, 234, 255);
    const analyseLines = doc.splitTextToSize(analyse, W - 38);
    const analyseH = analyseLines.length * 5 + 14;
    doc.roundedRect(14, y, W - 28, analyseH, 3, 3, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...bleu);
    doc.text('SYNTHÈSE MARLO', 20, y + 7);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(...encre);
    doc.text(analyseLines, 20, y + 13);
    y += analyseH + 8;
  }

  // ── PAGE 2 — QUESTIONS ──
  if (questions.length > 0) {
    doc.addPage();

    // Mini header
    doc.setFillColor(...bleu);
    doc.rect(0, 0, W, 18, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...blanc);
    doc.text('marlo', 16, 12);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(200, 200, 255);
    doc.text('Questions à poser au vendeur', 40, 12);

    y = 30;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...encre);
    doc.text('Questions à poser lors de la visite', 16, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...gris);
    doc.text('Ces questions ont été générées par Marlo pour maximiser vos chances de négociation.', 16, y);
    y += 12;

    questions.forEach((q, i) => {
      // Numéro
      doc.setFillColor(...bleu);
      doc.circle(21, y - 1.5, 4, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...blanc);
      doc.text(String(i + 1), 21, y + 0.8, { align: 'center' });

      // Question
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...encre);
      const lines = doc.splitTextToSize(q, W - 46);
      doc.text(lines, 30, y);

      // Espace réponse
      y += lines.length * 5 + 3;
      doc.setDrawColor(...grisClair);
      doc.line(30, y, W - 16, y);
      y += 8;
    });

    // ── CTA COURTIER ──
    y += 6;
    doc.setFillColor(240, 253, 246);
    doc.setDrawColor(134, 239, 172);
    doc.roundedRect(14, y, W - 28, 28, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...vert);
    doc.text('Prêt à passer à l\'action ?', 20, y + 9);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...encre);
    doc.text('Un courtier partenaire Marlo peut optimiser votre financement en 48h.', 20, y + 16);
    doc.text('Mise en relation gratuite sur marlo-rho.vercel.app', 20, y + 22);
  }

  // Footer sur chaque page
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFillColor(248, 248, 252);
    doc.rect(0, 287, W, 10, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...gris);
    doc.text(`Rapport Marlo · ${date} · marlo-rho.vercel.app`, 16, 293);
    doc.text(`Page ${i} / ${pageCount}`, W - 16, 293, { align: 'right' });
  }

  // Téléchargement
  const nomFichier = `marlo-rapport-${titre.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase().substring(0, 30)}.pdf`;
  doc.save(nomFichier);
}
