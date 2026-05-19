const fs = require("fs");
const path = require("path");

// ======================================================
// PATH
// ======================================================

const INPUT_PATH =
  "C:/Rizal_IT_B/Sem. 4/Workshop Sistem Informasi Geografis/gis-surabaya-health/backend_gis_surabaya_health/data/clean/surabaya_kecamatan.geojson";

const OUTPUT_DIR =
  "C:/Rizal_IT_B/Sem. 4/Workshop Sistem Informasi Geografis/gis-surabaya-health/backend_gis_surabaya_health/data/query";

const OUTPUT_FILE =
  path.join(OUTPUT_DIR, "insert_kecamatan.sql");

// ======================================================
// LOAD GEOJSON
// ======================================================

const geojson = JSON.parse(
  fs.readFileSync(INPUT_PATH, "utf8")
);

// ======================================================
// SQL RESULT
// ======================================================

let sql = "";

// ======================================================
// HEADER
// ======================================================

sql += `-- =====================================================
-- GENERATED QUERY KECAMATAN
-- =====================================================

begin;

truncate table kecamatan restart identity cascade;

`;

// ======================================================
// LOOP FEATURES
// ======================================================

for (const feature of geojson.features) {

  // ambil nama kecamatan
  const namaKecamatan =
    feature.properties.kecamatan;

  // ambil geometry
  let geometry = feature.geometry;

  // ==================================================
  // CONVERT POLYGON -> MULTIPOLYGON
  // ==================================================

  if (geometry.type === "Polygon") {

    geometry = {
      type: "MultiPolygon",
      coordinates: [geometry.coordinates]
    };
  }

  // ==================================================
  // ESCAPE JSON
  // ==================================================

  const geometryJson =
    JSON.stringify(geometry)
      .replace(/'/g, "''");

  // ==================================================
  // GENERATE QUERY
  // ==================================================

  sql += `
insert into kecamatan (
    nama_kecamatan,
    geom
)
values (
    '${namaKecamatan}',

    ST_SetSRID(
        ST_GeomFromGeoJSON(
            '${geometryJson}'
        ),
        4326
    )
);

`;
}

// ======================================================
// FOOTER
// ======================================================

sql += `
commit;
`;

// ======================================================
// CREATE OUTPUT DIRECTORY
// ======================================================

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, {
    recursive: true
  });
}

// ======================================================
// SAVE FILE
// ======================================================

fs.writeFileSync(
  OUTPUT_FILE,
  sql,
  "utf8"
);

console.log("=================================");
console.log("QUERY BERHASIL DIBUAT");
console.log("=================================");
console.log(OUTPUT_FILE);