
TRUNCATE TABLE public.penduduk RESTART IDENTITY CASCADE;

INSERT INTO public.penduduk (
  kecamatan_id,
  tahun,
  jumlah_penduduk,
  persentase,
  kepadatan
)
VALUES
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Karang Pilang'
    LIMIT 1
  ),
  2019,
  77600,
  2.46,
  8402
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Jambangan'
    LIMIT 1
  ),
  2019,
  54100,
  1.71,
  12911
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gayungan'
    LIMIT 1
  ),
  2019,
  47800,
  1.51,
  7878
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wonocolo'
    LIMIT 1
  ),
  2019,
  85300,
  2.7,
  12596
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tenggilis Mejoyo'
    LIMIT 1
  ),
  2019,
  60300,
  1.91,
  10917
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gunung Anyar'
    LIMIT 1
  ),
  2019,
  60500,
  1.92,
  6231
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Rungkut'
    LIMIT 1
  ),
  2019,
  121200,
  3.84,
  5751
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sukolilo'
    LIMIT 1
  ),
  2019,
  116900,
  3.7,
  4936
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Mulyorejo'
    LIMIT 1
  ),
  2019,
  91300,
  2.89,
  6426
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gubeng'
    LIMIT 1
  ),
  2019,
  143900,
  4.55,
  18004
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wonokromo'
    LIMIT 1
  ),
  2019,
  170000,
  5.38,
  20069
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Dukuh Pakis'
    LIMIT 1
  ),
  2019,
  62800,
  1.99,
  6316
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wiyung'
    LIMIT 1
  ),
  2019,
  74000,
  2.34,
  5936
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Lakarsantri'
    LIMIT 1
  ),
  2019,
  61900,
  1.96,
  3257
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sambikerep'
    LIMIT 1
  ),
  2019,
  66800,
  2.11,
  2820
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tandes'
    LIMIT 1
  ),
  2019,
  96600,
  3.06,
  8725
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Suko Manunggal'
    LIMIT 1
  ),
  2019,
  108200,
  3.43,
  11725
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sawahan'
    LIMIT 1
  ),
  2019,
  216400,
  6.85,
  31226
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tegalsari'
    LIMIT 1
  ),
  2019,
  108100,
  3.42,
  25193
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Genteng'
    LIMIT 1
  ),
  2019,
  63200,
  2,
  15593
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tambaksari'
    LIMIT 1
  ),
  2019,
  239300,
  7.57,
  26613
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Kenjeran'
    LIMIT 1
  ),
  2019,
  179200,
  5.67,
  23063
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Bulak'
    LIMIT 1
  ),
  2019,
  46200,
  1.46,
  6870
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Simokerto'
    LIMIT 1
  ),
  2019,
  104100,
  3.3,
  40207
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Semampir'
    LIMIT 1
  ),
  2019,
  206400,
  6.54,
  23566
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Pabean Cantian'
    LIMIT 1
  ),
  2019,
  85900,
  2.72,
  12625
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Bubutan'
    LIMIT 1
  ),
  2019,
  107800,
  3.41,
  27933
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Krembangan'
    LIMIT 1
  ),
  2019,
  126700,
  4.01,
  15196
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Asemrowo'
    LIMIT 1
  ),
  2019,
  49800,
  1.58,
  3226
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Benowo'
    LIMIT 1
  ),
  2019,
  68400,
  2.16,
  2880
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Pakal'
    LIMIT 1
  ),
  2019,
  58600,
  1.85,
  2655
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Karang Pilang'
    LIMIT 1
  ),
  2023,
  75600,
  2.51,
  8048
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Jambangan'
    LIMIT 1
  ),
  2023,
  54200,
  1.8,
  13220
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gayungan'
    LIMIT 1
  ),
  2023,
  44000,
  1.46,
  7470
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wonocolo'
    LIMIT 1
  ),
  2023,
  80000,
  2.66,
  12249
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tenggilis Mejoyo'
    LIMIT 1
  ),
  2023,
  59000,
  1.96,
  10153
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gunung Anyar'
    LIMIT 1
  ),
  2023,
  61600,
  2.05,
  6066
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Rungkut'
    LIMIT 1
  ),
  2023,
  121900,
  4.05,
  5323
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sukolilo'
    LIMIT 1
  ),
  2023,
  115100,
  3.82,
  3818
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Mulyorejo'
    LIMIT 1
  ),
  2023,
  87600,
  2.91,
  5041
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Gubeng'
    LIMIT 1
  ),
  2023,
  133800,
  4.45,
  16937
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wonokromo'
    LIMIT 1
  ),
  2023,
  155000,
  5.15,
  18765
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Dukuh Pakis'
    LIMIT 1
  ),
  2023,
  59500,
  1.98,
  5802
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Wiyung'
    LIMIT 1
  ),
  2023,
  75400,
  2.5,
  6089
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Lakarsantri'
    LIMIT 1
  ),
  2023,
  64100,
  2.13,
  3390
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sambikerep'
    LIMIT 1
  ),
  2023,
  67900,
  2.26,
  3957
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tandes'
    LIMIT 1
  ),
  2023,
  91900,
  3.05,
  9248
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Suko Manunggal'
    LIMIT 1
  ),
  2023,
  104800,
  3.48,
  11304
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Sawahan'
    LIMIT 1
  ),
  2023,
  199300,
  6.62,
  27763
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tegalsari'
    LIMIT 1
  ),
  2023,
  98300,
  3.27,
  22811
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Genteng'
    LIMIT 1
  ),
  2023,
  58700,
  1.95,
  14468
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Tambaksari'
    LIMIT 1
  ),
  2023,
  227000,
  7.54,
  25306
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Kenjeran'
    LIMIT 1
  ),
  2023,
  181300,
  6.02,
  21304
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Bulak'
    LIMIT 1
  ),
  2023,
  47100,
  1.56,
  7545
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Simokerto'
    LIMIT 1
  ),
  2023,
  92700,
  3.08,
  35511
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Semampir'
    LIMIT 1
  ),
  2023,
  182400,
  6.06,
  20151
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Pabean Cantian'
    LIMIT 1
  ),
  2023,
  74500,
  2.48,
  13593
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Bubutan'
    LIMIT 1
  ),
  2023,
  97300,
  3.23,
  25006
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Krembangan'
    LIMIT 1
  ),
  2023,
  115300,
  3.83,
  13409
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Asemrowo'
    LIMIT 1
  ),
  2023,
  48000,
  1.6,
  3191
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Benowo'
    LIMIT 1
  ),
  2023,
  73300,
  2.44,
  2752
),
(
  (
    SELECT id
    FROM public.kecamatan
    WHERE nama_kecamatan = 'Pakal'
    LIMIT 1
  ),
  2023,
  62700,
  2.08,
  3377
);
