# GIS Surabaya Health Facility

Proyek Sistem Informasi Geografis untuk pemetaan fasilitas kesehatan di Surabaya. Proyek ini terdiri dari backend berbasis .NET 10 dan frontend berbasis React + Vite.

## Struktur Proyek

- `backend_gis_surabaya_health`: ASP.NET Core Web API untuk menyediakan data GIS.
- `frontend_gis_surabaya_health`: React Application dengan pemetaan menggunakan Leaflet/Mapbox.

## Prasyarat

Sebelum menjalankan proyek, pastikan Anda telah menginstal:

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Node.js](https://nodejs.org/) (versi LTS direkomendasikan)
- [npm](https://www.npmjs.com/) (biasanya terinstal bersama Node.js)

## Cara Menjalankan Program

### 1. Menjalankan Backend

1. Buka terminal dan masuk ke direktori backend:
   ```powershell
   cd backend_gis_surabaya_health
   ```
2. Jalankan aplikasi:
   ```powershell
   dotnet run
   ```
   Backend akan berjalan di `http://localhost:5100` secara default.

### 2. Menjalankan Frontend

1. Buka terminal baru dan masuk ke direktori frontend:
   ```powershell
   cd frontend_gis_surabaya_health
   ```
2. Instal dependensi (hanya jika pertama kali):
   ```powershell
   npm install
   ```
3. Jalankan aplikasi frontend:
   ```powershell
   npm run dev
   ```
   Frontend akan berjalan di `http://localhost:5175`.

## Konfigurasi Port

Berikut adalah konfigurasi port yang digunakan dalam proyek ini untuk menghindari konflik:

- **Backend**: `5100`
- **Frontend**: `5175`

Jika Anda perlu mengubah port, silakan periksa file berikut:
- Backend: `backend_gis_surabaya_health/Properties/launchSettings.json`
- Frontend: `frontend_gis_surabaya_health/vite.config.ts`

## Fitur Utama

- Pemetaan lokasi Fasilitas Kesehatan di Surabaya.
- Analisis rasio fasilitas kesehatan terhadap jumlah penduduk per kecamatan.
- Visualisasi data menggunakan GeoJSON untuk batas wilayah kecamatan.
