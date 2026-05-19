const fs = require("fs");
const path = require("path");

const inputPath =
    "C:\\Rizal_IT_B\\Sem. 4\\Workshop Sistem Informasi Geografis\\gis-surabaya-health\\backend_gis_surabaya_health\\data\\clean\\faskes.json";

const outputPath =
    "C:\\Rizal_IT_B\\Sem. 4\\Workshop Sistem Informasi Geografis\\gis-surabaya-health\\backend_gis_surabaya_health\\data\\query\\insert_faskes.sql";

try {
    // baca json
    const rawFile = fs.readFileSync(inputPath, "utf-8");
    const data = JSON.parse(rawFile);

    let sql = `
TRUNCATE TABLE public.faskes RESTART IDENTITY CASCADE;

INSERT INTO public.faskes (
  kecamatan_id,
  jenis_faskes_id,
  tahun,
  jumlah
)
VALUES
`;

    const values = [];

    data.forEach((item) => {
        const kecamatan = item.kecamatan.replace(/'/g, "''");

        const jenisFaskes = [
            {
                nama: "Rumah Sakit Umum",
                jumlah: item.jumlah_rumah_sakit_umum,
            },
            {
                nama: "Rumah Sakit Khusus",
                jumlah: item.jumlah_rumah_sakit_khusus,
            },
            {
                nama: "Puskesmas",
                jumlah: item.jumlah_puskesmas,
            },
            {
                nama: "Klinik",
                jumlah: item.jumlah_klinik,
            },
        ];

        jenisFaskes.forEach((jenis) => {
            values.push(`(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = '${kecamatan}'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = '${jenis.nama}'
    LIMIT 1
  ),
  ${item.tahun},
  ${jenis.jumlah}
)`);
        });
    });

    sql += values.join(",\n");
    sql += ";\n";

    // buat folder jika belum ada
    const outputDir = path.dirname(outputPath);

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, {
            recursive: true,
        });
    }

    // simpan sql
    fs.writeFileSync(outputPath, sql);

    console.log("Convert faskes ke SQL berhasil");
} catch (err) {
    console.error("Gagal convert:", err);
}