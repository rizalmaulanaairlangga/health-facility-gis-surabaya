const fs = require("fs");
const path = require("path");

// ==========================
// CONFIG PATH
// ==========================
const INPUT_FILE = path.join(
  __dirname,
  "../data/raw/gis/surabaya_kecamatan_arcgis.json"
);

const OUTPUT_FILE = path.join(
  __dirname,
  "../data/clean/surabaya_kecamatan.geojson"
);

// ==========================
// HELPER
// ==========================

// EPSG:3857 → EPSG:4326
function toLatLng([x, y]) {
  const lng = (x / 20037508.34) * 180;
  let lat = (y / 20037508.34) * 180;

  lat =
    (180 / Math.PI) *
    (2 * Math.atan(Math.exp((lat * Math.PI) / 180)) - Math.PI / 2);

  return [lng, lat];
}

// 🔥 format nama kecamatan → Title Case
function formatKecamatan(name) {
  return name
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// ==========================
// CONVERTER
// ==========================
function convertArcgisToGeoJSON(data) {
  const features = data.layers[0].featureSet.features;

  return {
    type: "FeatureCollection",
    features: features.map(f => ({
      type: "Feature",
      properties: {
        kecamatan: formatKecamatan(f.attributes.kecamatan),
        kab_kota: f.attributes.kab_kota
      },
      geometry: {
        type: "Polygon",
        coordinates: f.geometry.rings.map(ring =>
          ring.map(coord => toLatLng(coord))
        )
      }
    }))
  };
}

// ==========================
// MAIN
// ==========================
function main() {
  console.log("🚀 Converting GIS data...");

  const raw = JSON.parse(fs.readFileSync(INPUT_FILE, "utf-8"));

  const geojson = convertArcgisToGeoJSON(raw);

  // pastikan folder clean ada
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(geojson, null, 2)
  );

  console.log("✅ Convert selesai");
  console.log(`📁 Output: ${OUTPUT_FILE}`);
}

main();