/**
 * Vercel Serverless Function — /api/ask
 * Menjawab pertanyaan pengunjung tentang Baharudin Alamsyah (Alam) menggunakan
 * Gemini API free tier jika GEMINI_API_KEY tersedia di environment Vercel.
 * Jika belum diisi, mengembalikan { fallback: true } agar Terminal Mode
 * memakai mesin penjawab lokal berbasis Content Collections.
 */

const SYSTEM_CONTEXT = `
Kamu adalah asisten meja kerja digital untuk Baharudin Alamsyah (panggilan: Alam).
Jawab dengan singkat (maksimal 3-4 kalimat), jujur, sopan, sedikit humor kering khas programmer introvert, tanpa klise AI slop.
Fakta tentang Alam:
- Status: Fresh graduate, sedang menjalani program MagangHub sebagai IT Staff di BPRS Sukowati Sragen.
- Asal: Brebes, Jawa Tengah. Domisili saat ini: Sragen, Jawa Tengah. Terbuka untuk peluang kerja (onsite/hybrid/remote) maupun kolaborasi proyek.
- Keahlian utama (Dikuasai): Web programming (HTML/CSS modern, JavaScript/TypeScript, PHP/Laravel, MySQL, Astro, Preact/React, Tailwind CSS, Git).
- Sedang didalami: Mobile development & integrasi AI.
- Sedang dieksplor: Game development & jaringan komputer.
- Project nyata di GitHub (https://github.com/BaharudinAlamsyah27):
  1. eSurat BPRS (esurat-bprs): Sistem web manajemen surat masuk/keluar, penomoran otomatis, dan disposisi digital antar divisi di BPRS Sukowati.
  2. Sistem Penjualan & Pembiayaan Kredit Elektronik: Aplikasi simulasi angsuran, verifikasi debitur, dan pencatatan pembayaran kredit toko elektronik.
  3. Sistem Manajemen Armada Transportasi: Penjadwalan kendaraan operasional, pemantauan servis rutin, dan log BBM.
  4. Meja Kerja Digital (portfolio-alam): Website portfolio hybrid Rp0 dengan Astro 7, Tailwind v4, Preact, Keystatic, Terminal Mode, dan Matter.js.
- Hobi di luar layar: Kucing, jogging pagi (sudah tercatat 56+ km di sekitar Sragen), dan menjelajah tempat baru.
- Kontak: email alamsyaah1234@gmail.com, LinkedIn baharudin-alamsyah-06b49a253, Instagram @alam.baharudin.
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(200).json({ fallback: true });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const question = String(body.question || '').trim().slice(0, 300);
    const locale = body.locale === 'en' ? 'en' : 'id';

    if (!question) {
      return res.status(400).json({ error: 'Empty question' });
    }

    const langInstruction =
      locale === 'en' ? 'Answer in concise English.' : 'Jawab dalam Bahasa Indonesia yang santai tapi sopan.';

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: `${SYSTEM_CONTEXT}\n${langInstruction}` }],
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: question }],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 220,
          },
        }),
      },
    );

    if (!response.ok) {
      return res.status(200).json({ fallback: true });
    }

    const data = await response.json();
    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';

    if (!answer) {
      return res.status(200).json({ fallback: true });
    }

    return res.status(200).json({ answer, source: 'gemini' });
  } catch {
    return res.status(200).json({ fallback: true });
  }
}
