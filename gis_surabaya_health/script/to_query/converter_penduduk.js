const fs = require("fs");

const inputPath =
  "C:\\Rizal_IT_B\\Sem. 4\\Workshop Sistem Informasi Geografis\\gis-surabaya-health\\backend_gis_surabaya_health\\data\\clean\\penduduk.json";

const outputPath =
  "C:\\Rizal_IT_B\\Sem. 4\\Workshop Sistem Informasi Geografis\\gis-surabaya-health\\backend_gis_surabaya_health\\data\\query\\insert_penduduk.sql";

try {
  // baca file json
  const rawFile = fs.readFileSync(inputPath, "utf-8");
  const data = JSON.parse(rawFile);

  let sql = `
TRUNCATE TABLE public.penduduk RESTART IDENTITY CASCADE;

INSERT INTO public.penduduk (
  kecamatan_id,
  tahun,
  jumlah_penduduk,
  persentase,
  kepadatan
)
VALUES
`;

  const values = data.map((item) => {
    // escape single quote
    const kecamatan = item.kecamatan.replace(/'/g, "''");

    return `(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = '${kecamatan}'
    LIMIT 1
  ),
  ${item.tahun},
  ${item.jumlah_penduduk},
  ${item.persentase_penduduk},
  ${item.kepadatan_penduduk}
)`;
  });

  sql += values.join(",\n");
  sql += ";\n";

  // simpan file sql
  fs.writeFileSync(outputPath, sql);

  console.log("Convert berhasil");
} catch (err) {
  console.error("Gagal convert:", err);
}