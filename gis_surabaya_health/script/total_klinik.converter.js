const fs = require("fs");

const klinikPath =
  "C:\\Rizal_IT_B\\Sem. 4\\Workshop Sistem Informasi Geografis\\gis-surabaya-health\\backend_gis_surabaya_health\\data\\raw\\total_klinik_per_kecamatan.json";

const faskesPath =
  "C:\\Rizal_IT_B\\Sem. 4\\Workshop Sistem Informasi Geografis\\gis-surabaya-health\\backend_gis_surabaya_health\\data\\clean\\faskes.json";

try {
  // baca data klinik baru
  const klinikRaw = fs.readFileSync(
    klinikPath,
    "utf-8"
  );

  const klinikData = JSON.parse(klinikRaw);

  // baca data faskes lama
  const faskesRaw = fs.readFileSync(
    faskesPath,
    "utf-8"
  );

  const faskesData = JSON.parse(faskesRaw);

  // mapping klinik per kecamatan
  const klinikMap = {};

  klinikData.forEach((item) => {
    if (!item.kecamatan) return;

    // normalisasi nama
    let nama = item.kecamatan.trim();

    // sinkronisasi nama beda
    if (nama === "Sukomanunggal") {
      nama = "Suko Manunggal";
    }

    klinikMap[nama] = item.total_klinik;
  });

  // update data faskes
  const updated = faskesData.map((item) => {
    // hanya update tahun 2023
    if (item.tahun !== 2023) {
      return item;
    }

    const totalKlinik =
      klinikMap[item.kecamatan] ?? 0;

    const totalFaskes =
      item.jumlah_rumah_sakit_umum +
      item.jumlah_rumah_sakit_khusus +
      item.jumlah_puskesmas +
      totalKlinik;

    return {
      ...item,
      jumlah_klinik: totalKlinik,
      total_faskes: totalFaskes,
    };
  });

  // overwrite file
  fs.writeFileSync(
    faskesPath,
    JSON.stringify(updated, null, 2)
  );

  console.log(
    "Update jumlah klinik berhasil"
  );
} catch (err) {
  console.error("Gagal update:", err);
}