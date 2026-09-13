# GIS Surabaya Health Facility

A premium, interactive Geographic Information System (GIS) application to analyze and visualize the distribution, density, and scaling ratios of healthcare facilities (Fasilitas Kesehatan / Faskes) across all subdistricts (Kecamatan) in the city of Surabaya.

Built using **React + TypeScript + Vite + TailwindCSS + Leaflet**, featuring custom SVG-based analytics, complex data dashboarding, and a high-end **Glassmorphism Theme** fully optimized for smooth animations and visually stunning user experience.

---

## 🚀 Key Features

### 1. Interactive Geographic Map (`MapPage`)
- **Map Visualization**: Renders all subdistrict boundaries using Leaflet GeoJSON polygons.
- **Dynamic Popup & Tooltip**: Hovering over subdistricts reveals tooltips, while clicking opens a styled popup centered over the subdistrict (with safety-spaced close button).
- **Scale and Highlighting**: Highlights subdistricts interactively based on ratio scale classification (from critical red to elite purple).
- **Subdistrict Analytics**: Navigate instantly to detail analytics with **"Lihat Detail Analytics"**.

### 2. Proportional Data Analytics (`StatisticsPage`)
- **SVG Charts**: Fully animated entering transitions on SVG charts.
- **Proportional Segment Donut Chart**: Custom SVG donut with **fixed visual gap + proportional length distribution**, fixing overlap/clipping for small percentages (e.g. RSK / Puskesmas in dominated subdistricts like Mulyorejo).
- **Animated Bar & Line Charts**: Historical ratio trendlines and facility distributions with remount animations on subdistrict transitions.

### 3. Glassmorphic Data Dashboard (`DashboardPage`)
- **Premium Design System**: Custom cards, tables, and buttons (vibrant gradients, border highlights, backdrop-blur, Poppins font harmony).
- **Advanced Sorting**: Multi-dimensional sorting (Fasilitas, Penduduk, Rasio, Status) with independent directions (`↑ Tertinggi` / `↓ Terendah`) and instant reactive updates.

### 4. Interactive Sidebar (`Layout`)
- **Collapsible sidebar**: Auto-collapses on outside click or navigation.
- **Animated Hamburger Icon**: Morphs from 3-line menu to close `X` with rotation + crossfade.
- **Visual Dividers**: Separates city-wide ("Kota Surabaya") analysis from subdistricts.

---

## 🛠️ Tech Stack

- **Core**: React 19, TypeScript, Vite
- **Styling**: TailwindCSS v4, Poppins Google Fonts, Lucide Icons
- **Mapping**: React-Leaflet, Leaflet
- **HTTP Client**: Axios / Fetch with custom services
- **Data Source**: Local JSON & GeoJSON in `public/data` (no separate backend required)

---

## 📁 Project Structure

```
.
├── public/
│   └── data/               # JSON & GeoJSON for facilities & boundaries
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # MapPage, StatisticsPage, DashboardPage
│   ├── services/           # Data fetching & processing
│   ├── types/              # TypeScript interfaces
│   └── ...
├── index.html
├── vite.config.ts          # dev server on port 5175
├── tailwind.config.js
└── package.json
```

---

## ✅ Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** (bundled with Node.js)

Check versions:
```bash
node -v
npm -v
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/rizalmaulanaairlangga/health-facility-gis-surabaya.git
cd health-facility-gis-surabaya
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run dev server
```bash
npm run dev
```
App will run at **http://localhost:5175** (configured in `vite.config.ts`).

### 4. Build for production
```bash
npm run build
npm run preview
```

### 5. Lint
```bash
npm run lint
```

---

## ⚙️ Configuration

- **Port**: `5175` → change in `vite.config.ts` (`server.port`)
- **Data**: Edit files in `public/data/` to update facility counts or GeoJSON boundaries

---

## 📖 Notes

This repository is now **flat at root** — opening the repo shows the project immediately without an extra nested folder. Data is served statically from `public/data`, so no C#/.NET backend is needed.

---

## 📄 License

See [LICENSE](./LICENSE)
