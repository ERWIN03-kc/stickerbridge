// Vercel Serverless Function — POST /api/extract
// Official/authorized-first scaffold. TikTok Research API access is restricted
// and its documented comment schema returns text/metadata, not sticker image files.
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Gunakan metode POST." });
  }

  const { url } = req.body || {};
  if (typeof url !== "string" || url.length > 2000) {
    return res.status(400).json({ error: "URL video tidak valid." });
  }

  let parsed;
  try { parsed = new URL(url); } catch {
    return res.status(400).json({ error: "Format URL tidak valid." });
  }
  const allowedHosts = new Set(["tiktok.com", "www.tiktok.com", "m.tiktok.com", "vm.tiktok.com", "vt.tiktok.com"]);
  if (!allowedHosts.has(parsed.hostname.toLowerCase()) || parsed.protocol !== "https:") {
    return res.status(400).json({ error: "Masukkan URL HTTPS TikTok yang valid." });
  }

  // Do not scrape private endpoints, bypass login, or pretend the public API
  // returns comment sticker media. Add an authorized provider here only after
  // confirming its terms and the exact fields/media it can lawfully provide.
  return res.status(200).json({
    provider: "official-api-scaffold",
    items: [],
    message: "Backend aktif, tetapi belum ada provider berizin yang mengembalikan gambar stiker komentar. TikTok Research API memerlukan akses yang disetujui dan dokumentasi komentar yang tersedia hanya mencakup teks/metadata, bukan file gambar stiker. Website tidak akan menampilkan data palsu."
  });
                                 }
