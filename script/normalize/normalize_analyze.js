const fs = require("fs");
const path = require("path");

const inputPath =
  "C:\\Rizal_IT_B\\Sem. 4\\Workshop Sistem Informasi Geografis\\gis-surabaya-health\\backend_gis_surabaya_health\\data\\clean\\analysis.json";

const outputPath =
  "C:\\Rizal_IT_B\\Sem. 4\\Workshop Sistem Informasi Geografis\\gis-surabaya-health\\backend_gis_surabaya_health\\data\\clean\\analysis.json";

try {
  // baca file lama
  const raw = fs.readFileSync(inputPath, "utf-8");
  const data = JSON.parse(raw);

  // ambil field yang diperlukan
  const cleaned = data.map((item) => ({
    kecamatan: item.kecamatan,
    tahun: item.tahun,
    total_fasilitas: item.total_fasilitas,
    jumlah_penduduk: item.jumlah_penduduk,
    rasio: item.rasio,
    rasio_scaled: item.rasio_scaled,
    kategori: item.kategori,
    warna: item.warna,
  }));

  // overwrite file
  fs.writeFileSync(outputPath, JSON.stringify(cleaned, null, 2));

  console.log("analysis.json berhasil di-convert");
} catch (err) {
  console.error("Gagal convert file:", err);
}