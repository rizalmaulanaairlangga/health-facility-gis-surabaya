const fs = require("fs");

const inputPath =
  "C:\\Rizal_IT_B\\Sem. 4\\Workshop Sistem Informasi Geografis\\gis-surabaya-health\\backend_gis_surabaya_health\\data\\clean\\penduduk.json";

const outputPath =
  "C:\\Rizal_IT_B\\Sem. 4\\Workshop Sistem Informasi Geografis\\gis-surabaya-health\\backend_gis_surabaya_health\\data\\clean\\penduduk.json";

// convert "46,2" -> 46200
function parseJumlahPenduduk(value) {
  return Math.round(
    parseFloat(value.replace(/\./g, "").replace(",", ".")) * 1000
  );
}

// convert "1,46" -> 1.46
function parsePersentase(value) {
  return parseFloat(value.replace(",", "."));
}

// convert "6.870" -> 6870
function parseKepadatan(value) {
  return parseInt(value.replace(/\./g, ""));
}

try {
  const rawFile = fs.readFileSync(inputPath, "utf-8");
  const json = JSON.parse(rawFile);

  const rawData = json.raw;

  const converted = rawData.map((item) => ({
    kecamatan: item.kecamatan,
    tahun: item.tahun,
    jumlah_penduduk: parseJumlahPenduduk(
      item.data["Jumlah Penduduk"]
    ),
    persentase_penduduk: parsePersentase(
      item.data["Persentase Penduduk"]
    ),
    kepadatan_penduduk: parseKepadatan(
      item.data["Kepadatan Penduduk per km persegi"]
    ),
  }));

  fs.writeFileSync(
    outputPath,
    JSON.stringify(converted, null, 2)
  );

  console.log("Convert population berhasil");
} catch (err) {
  console.error("Gagal convert:", err);
}