
# Tahap Perhitungan

# 1. Menghitung Skor Fasilitas Kesehatan

Jumlah masing-masing fasilitas dikalikan dengan bobotnya.

## Rumus:

Skor\ Faskes = (RSU \times 10) + (RSK \times 8) + (Puskesmas \times 5) + (Klinik \times 2) + (Posyandu \times 1)

Keterangan:

* RSU = jumlah rumah sakit umum
* RSK = jumlah rumah sakit khusus

---

# 2. Menghitung Rasio terhadap Jumlah Penduduk

Skor fasilitas kesehatan kemudian dibandingkan dengan jumlah penduduk.

## Rumus:

Rasio = \frac{Skor\ Faskes}{Jumlah\ Penduduk}

---

# 3. Normalisasi per 1000 Penduduk

Agar lebih mudah dibaca dan dibandingkan antar wilayah, rasio dikalikan 1000.

## Rumus:

Rasio_{1000} = \left( \frac{Skor\ Faskes}{Jumlah\ Penduduk} \right) \times 1000

Interpretasi:

* semakin tinggi nilai rasio,
* semakin baik ketersediaan fasilitas kesehatan terhadap jumlah penduduk.

---

# Contoh Perhitungan

Misal Kecamatan A memiliki:

| Fasilitas | Jumlah |
| --------- | ------ |
| RS Umum   | 1      |
| RS Khusus | 0      |
| Puskesmas | 3      |
| Klinik    | 5      |
| Posyandu  | 20     |

Jumlah penduduk:

```text id="t4w7ee"
100.000 jiwa
```

---

## Langkah 1 — Hitung skor

(1 \times 10) + (0 \times 8) + (3 \times 5) + (5 \times 2) + (20 \times 1) = 55

---

## Langkah 2 — Hitung rasio

\frac{55}{100000} = 0.00055

---

## Langkah 3 — Rasio per 1000 penduduk

0.00055 \times 1000 = 0.55

Hasil:

```text id="ecr0ic"
0,55 skor fasilitas kesehatan per 1000 penduduk
```

---

# Interpretasi Hasil

| Rasio Tinggi                        | Rasio Rendah                          |
| ----------------------------------- | ------------------------------------- |
| Ketersediaan fasilitas relatif baik | Ketersediaan fasilitas relatif kurang |
| Beban layanan lebih ringan          | Potensi beban layanan lebih tinggi    |

---

# Kelebihan Metode Ini

## ✔ Lebih realistis

Karena mempertimbangkan perbedaan kapasitas layanan tiap fasilitas.

---

## ✔ Lebih fleksibel

Bobot dapat diubah tanpa mengubah struktur data.

---

## ✔ Cocok untuk visualisasi GIS

Nilai rasio dapat digunakan untuk:

* pewarnaan choropleth map,
* ranking kecamatan,
* dashboard analitik.

---

# Keterbatasan Analisis

Metode ini belum mempertimbangkan:

* kapasitas tempat tidur,
* jumlah tenaga medis,
* kualitas layanan,
* luas wilayah,
* jarak akses masyarakat.

Namun metode ini sudah cukup representatif untuk analisis distribusi fasilitas kesehatan berbasis wilayah pada skala kota.
