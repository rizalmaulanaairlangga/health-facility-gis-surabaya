const fs = require("fs");
const path = require("path");

// ==========================
// CONFIG PATH
// ==========================
const RAW_FASKES_DIR = path.join(__dirname, "../data/raw/faskes");
const RAW_PENDUDUK_DIR = path.join(__dirname, "../data/raw/penduduk");

const OUTPUT_DIR = path.join(__dirname, "../data/clean");

const OUTPUT_FASKES = path.join(OUTPUT_DIR, "faskes.json");
const OUTPUT_PENDUDUK = path.join(OUTPUT_DIR, "penduduk.json");

// ==========================
// HELPER
// ==========================

// handle angka (faskes)
function parseValue(val) {
  if (!val || val === "–" || val === "..." || val === "NA") return 0;
  return Number(val);
}

// handle angka penduduk (format ribuan, koma, dll)
function parseNumber(val) {
  if (!val) return 0;

  return Number(
    val
      .replace(/\./g, "")     // hapus ribuan (.)
      .replace(",", ".")      // ubah koma ke titik
  );
}

// mapping variabel
function getVariableMap(kolom) {
  const map = {};
  for (const key in kolom) {
    map[key] = kolom[key].nama_variabel;
  }
  return map;
}

// ==========================
// FASKES CONVERTER
// ==========================
function convertFaskes(dataset) {
  const tahun = dataset.tahun_data;
  const variableMap = getVariableMap(dataset.kolom);

  const raw = [];
  const aggregated = [];

  dataset.data.forEach((item) => {
    const kecamatan = item.label;

    let total = 0;
    const rawVariables = {};

    for (const varId in item.variables) {
      const varName = variableMap[varId];
      const valueRaw = item.variables[varId].value;
      const value = parseValue(valueRaw);

      // ==========================
      // FILTER SESUAI TAHUN
      // ==========================

      let isValid = false;

      // 2018–2019
      if (tahun <= 2019) {
        if (
          varName === "Jumlah Rumah Sakit Umum" ||
          varName === "Jumlah Rumah Sakit Khusus" ||
          varName === "Jumlah Puskesmas" ||
          varName === "Jumlah Klinik/Balai Kesehatan"
        ) {
          isValid = true;
        }
      }

      // 2022+
      else {
        if (
          varName === "Jumlah Rumah Sakit Umum" ||
          varName === "Jumlah Rumah Sakit Khusus" ||
          varName === "Jumlah Puskesmas Rawat Inap" ||
          varName === "Jumlah Puskesmas Non Rawat Inap" ||
          varName === "Jumlah Klinik Pratama"
        ) {
          isValid = true;
        }
      }

      // ==========================
      // APPLY FILTER
      // ==========================
      if (isValid) {
        rawVariables[varName] = valueRaw;
        total += value;
      }
    }

    raw.push({
      kecamatan,
      tahun,
      data: rawVariables, // hanya variabel terpilih
    });

    aggregated.push({
      kecamatan,
      tahun,
      total_fasilitas: total,
    });
  });

  return { raw, aggregated };
}

// ==========================
// PENDUDUK CONVERTER
// ==========================
function convertPenduduk(dataset) {
  const tahun = dataset.tahun_data;
  const variableMap = getVariableMap(dataset.kolom);

  const raw = [];
  const aggregated = [];

  dataset.data.forEach((item) => {
    const kecamatan = item.label;

    const rawVariables = {};

    let jumlahPenduduk = 0;
    let persentase = 0;
    let kepadatan = 0;

    for (const varId in item.variables) {
      const varName = variableMap[varId];
      const valueRaw = item.variables[varId].value;

      // 🔥 FILTER hanya 3 variabel
      if (
        varName === "Jumlah Penduduk" ||
        varName === "Persentase Penduduk" ||
        varName === "Kepadatan Penduduk per km persegi"
      ) {
        rawVariables[varName] = valueRaw;
      }

      // ==========================
      // AGGREGATED EXTRACTION
      // ==========================

      if (varName === "Jumlah Penduduk") {
        jumlahPenduduk = parseNumber(valueRaw) * 1000;
      }

      if (varName === "Persentase Penduduk") {
        persentase = parseNumber(valueRaw);
      }

      if (varName === "Kepadatan Penduduk per km persegi") {
        kepadatan = parseNumber(valueRaw);
      }
    }

    raw.push({
      kecamatan,
      tahun,
      data: rawVariables, // hanya 3 variabel
    });

    aggregated.push({
      kecamatan,
      tahun,
      jumlah_penduduk: jumlahPenduduk,
      persentase_penduduk: persentase,
      kepadatan_penduduk: kepadatan,
    });
  });

  return { raw, aggregated };
}

// ==========================
// LOAD FILES
// ==========================
function loadAllFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith(".json"))
    .map(file => {
      const json = JSON.parse(
        fs.readFileSync(path.join(dir, file))
      );
      return json.data[1];
    });
}

// ==========================
// MAIN
// ==========================
function main() {
  console.log("🚀 Build data started...");

  const faskesDatasets = loadAllFiles(RAW_FASKES_DIR);
  const pendudukDatasets = loadAllFiles(RAW_PENDUDUK_DIR);

  let faskesRaw = [];
  let faskesAgg = [];

  let pendudukRaw = [];
  let pendudukAgg = [];

  // process faskes
  faskesDatasets.forEach(ds => {
    const res = convertFaskes(ds);
    faskesRaw.push(...res.raw);
    faskesAgg.push(...res.aggregated);
  });

  // process penduduk
  pendudukDatasets.forEach(ds => {
    const res = convertPenduduk(ds);
    pendudukRaw.push(...res.raw);
    pendudukAgg.push(...res.aggregated);
  });

  // pastikan folder ada
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // save
  fs.writeFileSync(
    OUTPUT_FASKES,
    JSON.stringify({ raw: faskesRaw, aggregated: faskesAgg }, null, 2)
  );

  fs.writeFileSync(
    OUTPUT_PENDUDUK,
    JSON.stringify({ raw: pendudukRaw, aggregated: pendudukAgg }, null, 2)
  );

  console.log("✅ Build selesai");
}

main();