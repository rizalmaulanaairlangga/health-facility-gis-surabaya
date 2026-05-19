const fs = require("fs");

const inputPath =
  "C:\\Rizal_IT_B\\Sem. 4\\Workshop Sistem Informasi Geografis\\gis-surabaya-health\\backend_gis_surabaya_health\\data\\clean\\faskes.json";

const outputPath =
  "C:\\Rizal_IT_B\\Sem. 4\\Workshop Sistem Informasi Geografis\\gis-surabaya-health\\backend_gis_surabaya_health\\data\\clean\\faskes.json";

// convert nilai string ke integer
function parseNumber(value) {
  if (!value || value === "–" || value === "...") {
    return 0;
  }

  return parseInt(value.replace(/\./g, "")) || 0;
}

try {
  const rawFile = fs.readFileSync(inputPath, "utf-8");
  const json = JSON.parse(rawFile);

  const rawData = json.raw;

  const converted = rawData.map((item) => {
    const data = item.data;

    // format lama
    const puskesmasOld = parseNumber(
      data["Jumlah Puskesmas"]
    );

    // format baru
    const puskesmasRawatInap = parseNumber(
      data["Jumlah Puskesmas Rawat Inap"]
    );

    const puskesmasNonRawatInap = parseNumber(
      data["Jumlah Puskesmas Non Rawat Inap"]
    );

    // gabungkan puskesmas
    const jumlahPuskesmas =
      puskesmasOld +
      puskesmasRawatInap +
      puskesmasNonRawatInap;

    // klinik lama / baru
    const jumlahKlinik =
      parseNumber(
        data["Jumlah Klinik/Balai Kesehatan"]
      ) +
      parseNumber(
        data["Jumlah Klinik Pratama"]
      );

    const jumlahRumahSakitUmum = parseNumber(
      data["Jumlah Rumah Sakit Umum"]
    );

    const jumlahRumahSakitKhusus = parseNumber(
      data["Jumlah Rumah Sakit Khusus"]
    );

    // total semua faskes
    const totalFaskes =
      jumlahRumahSakitUmum +
      jumlahRumahSakitKhusus +
      jumlahPuskesmas +
      jumlahKlinik;

    return {
      kecamatan: item.kecamatan,
      tahun: item.tahun,

      jumlah_rumah_sakit_umum:
        jumlahRumahSakitUmum,

      jumlah_rumah_sakit_khusus:
        jumlahRumahSakitKhusus,

      jumlah_puskesmas: jumlahPuskesmas,

      jumlah_klinik: jumlahKlinik,

      total_faskes: totalFaskes,
    };
  });

  fs.writeFileSync(
    outputPath,
    JSON.stringify(converted, null, 2)
  );

  console.log(
    "Convert fasilitas kesehatan berhasil"
  );
} catch (err) {
  console.error("Gagal convert:", err);
}