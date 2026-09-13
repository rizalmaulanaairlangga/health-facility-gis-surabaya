const fs = require("fs");
const path = require("path");

// ==========================
// FILE PATH
// ==========================
const FILE_PATH = path.join(
  __dirname,
  "../data/clean/penduduk.json"
);

// ==========================
// LOAD DATA
// ==========================
const data = JSON.parse(
  fs.readFileSync(FILE_PATH, "utf-8")
);

// ==========================
// REMOVE FIELD
// ==========================
const cleaned = data.map(item => {
  const {
    persentase_penduduk,
    ...rest
  } = item;

  return rest;
});

// ==========================
// SAVE
// ==========================
fs.writeFileSync(
  FILE_PATH,
  JSON.stringify(cleaned, null, 2)
);

console.log("✅ persentase_penduduk berhasil dihapus");