const fs = require("fs");
const path = require("path");

// ==========================
// LOAD DATA
// ==========================
const faskes = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/clean/faskes.json"))
);

const penduduk = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/clean/penduduk.json"))
);

// ==========================
// HELPER
// ==========================

// quantile break
function getQuantileBreaks(data) {
  const sorted = data
    .map(d => d.rasio)
    .sort((a, b) => a - b);

  const q1 = sorted[Math.floor(sorted.length * 0.33)];
  const q2 = sorted[Math.floor(sorted.length * 0.66)];

  return { q1, q2 };
}

// assign kategori berdasarkan quantile
function assignKategori(data, q1, q2) {
  data.forEach(d => {
    if (d.rasio <= q1) {
      d.kategori = "rendah";
      d.warna = "#ef4444"; // merah
    } else if (d.rasio <= q2) {
      d.kategori = "sedang";
      d.warna = "#facc15"; // kuning
    } else {
      d.kategori = "tinggi";
      d.warna = "#22c55e"; // hijau
    }
  });
}

// ==========================
// JOIN + ANALISIS
// ==========================
function analyze() {
  const result = [];

  const faskesData = faskes.aggregated;
  const pendudukData = penduduk.aggregated;

  faskesData.forEach((f) => {
    const p = pendudukData.find(
      (d) =>
        d.kecamatan === f.kecamatan &&
        d.tahun === f.tahun
    );

    if (!p) return;

    // 🔥 rasio asli
    const rasio = f.total_fasilitas / p.jumlah_penduduk;

    // 🔥 versi readable (per 1000 penduduk)
    const rasio_scaled = rasio * 1000;

    result.push({
      kecamatan: f.kecamatan,
      tahun: f.tahun,
      total_fasilitas: f.total_fasilitas,
      jumlah_penduduk: p.jumlah_penduduk,
      rasio,              // untuk klasifikasi
      rasio_scaled,       // untuk ditampilkan
    });
  });

  // ==========================
  // QUANTILE CLASSIFICATION
  // ==========================
  const { q1, q2 } = getQuantileBreaks(result);

  assignKategori(result, q1, q2);

  return result;
}

// ==========================
// MAIN
// ==========================
function main() {
  console.log("📊 Analyzing with quantile...");

  const result = analyze();

  fs.writeFileSync(
    path.join(__dirname, "../data/clean/analysis.json"),
    JSON.stringify(result, null, 2)
  );

  console.log("✅ Analysis selesai (quantile)");
}

main();