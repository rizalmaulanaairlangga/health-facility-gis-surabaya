
TRUNCATE TABLE public.faskes RESTART IDENTITY CASCADE;

INSERT INTO public.faskes (
  kecamatan_id,
  jenis_faskes_id,
  tahun,
  jumlah
)
VALUES
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Karang Pilang'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Karang Pilang'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Karang Pilang'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Karang Pilang'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  5
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Jambangan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Jambangan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Jambangan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Jambangan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gayungan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gayungan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gayungan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gayungan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  7
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wonocolo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wonocolo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wonocolo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  3
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wonocolo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  16
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tenggilis Mejoyo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tenggilis Mejoyo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tenggilis Mejoyo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tenggilis Mejoyo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  13
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gunung Anyar'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gunung Anyar'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gunung Anyar'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gunung Anyar'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  10
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Rungkut'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Rungkut'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Rungkut'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Rungkut'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  17
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sukolilo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  3
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sukolilo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sukolilo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  3
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sukolilo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  15
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Mulyorejo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  3
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Mulyorejo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Mulyorejo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Mulyorejo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  31
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gubeng'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gubeng'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  5
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gubeng'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gubeng'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  34
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wonokromo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  6
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wonokromo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wonokromo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  3
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wonokromo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  28
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Dukuh Pakis'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Dukuh Pakis'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Dukuh Pakis'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Dukuh Pakis'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  20
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wiyung'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  3
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wiyung'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wiyung'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wiyung'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  7
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Lakarsantri'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Lakarsantri'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Lakarsantri'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  3
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Lakarsantri'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  8
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sambikerep'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sambikerep'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sambikerep'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sambikerep'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  6
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tandes'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tandes'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tandes'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tandes'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  10
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Suko Manunggal'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Suko Manunggal'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Suko Manunggal'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Suko Manunggal'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  10
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sawahan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sawahan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sawahan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  4
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sawahan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  12
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tegalsari'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tegalsari'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tegalsari'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tegalsari'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  26
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Genteng'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Genteng'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Genteng'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Genteng'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  19
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tambaksari'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tambaksari'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tambaksari'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  3
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tambaksari'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  21
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Kenjeran'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Kenjeran'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Kenjeran'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  4
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Kenjeran'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  3
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Bulak'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Bulak'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Bulak'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Bulak'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Simokerto'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  3
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Simokerto'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Simokerto'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Simokerto'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Semampir'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Semampir'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Semampir'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  4
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Semampir'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  3
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Pabean Cantian'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  4
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Pabean Cantian'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Pabean Cantian'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Pabean Cantian'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  5
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Bubutan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Bubutan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Bubutan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Bubutan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Krembangan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Krembangan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Krembangan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  3
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Krembangan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  8
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Asemrowo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Asemrowo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Asemrowo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Asemrowo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Benowo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Benowo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Benowo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Benowo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Pakal'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Pakal'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2019,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Pakal'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2019,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Pakal'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2019,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Karang Pilang'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Karang Pilang'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Karang Pilang'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Karang Pilang'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Jambangan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Jambangan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Jambangan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Jambangan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gayungan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gayungan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gayungan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gayungan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wonocolo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wonocolo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wonocolo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  3
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wonocolo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tenggilis Mejoyo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tenggilis Mejoyo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tenggilis Mejoyo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tenggilis Mejoyo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gunung Anyar'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gunung Anyar'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gunung Anyar'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gunung Anyar'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Rungkut'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Rungkut'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Rungkut'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Rungkut'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sukolilo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  3
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sukolilo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sukolilo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  3
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sukolilo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Mulyorejo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  3
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Mulyorejo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Mulyorejo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Mulyorejo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gubeng'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gubeng'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  4
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gubeng'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gubeng'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wonokromo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  6
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wonokromo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wonokromo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  3
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wonokromo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Dukuh Pakis'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Dukuh Pakis'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Dukuh Pakis'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Dukuh Pakis'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wiyung'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  3
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wiyung'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wiyung'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wiyung'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Lakarsantri'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Lakarsantri'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Lakarsantri'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  3
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Lakarsantri'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sambikerep'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sambikerep'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sambikerep'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sambikerep'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tandes'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tandes'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tandes'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tandes'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Suko Manunggal'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Suko Manunggal'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Suko Manunggal'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Suko Manunggal'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sawahan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sawahan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sawahan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  4
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sawahan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tegalsari'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tegalsari'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tegalsari'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tegalsari'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Genteng'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Genteng'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Genteng'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Genteng'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tambaksari'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tambaksari'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tambaksari'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  3
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tambaksari'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Kenjeran'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Kenjeran'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Kenjeran'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  4
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Kenjeran'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Bulak'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Bulak'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Bulak'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Bulak'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Simokerto'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  3
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Simokerto'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Simokerto'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Simokerto'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Semampir'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Semampir'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Semampir'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  4
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Semampir'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Pabean Cantian'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  4
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Pabean Cantian'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Pabean Cantian'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Pabean Cantian'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Bubutan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Bubutan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Bubutan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Bubutan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Krembangan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Krembangan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Krembangan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  3
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Krembangan'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Asemrowo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Asemrowo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Asemrowo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Asemrowo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Benowo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  2
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Benowo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Benowo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Benowo'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Pakal'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Umum'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Pakal'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Rumah Sakit Khusus'
    LIMIT 1
  ),
  2023,
  0
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Pakal'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Puskesmas'
    LIMIT 1
  ),
  2023,
  1
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Pakal'
    LIMIT 1
  ),
  (
    SELECT id
    FROM public.jenis_faskes
    WHERE nama = 'Klinik'
    LIMIT 1
  ),
  2023,
  0
);
