import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'id' | 'en';

type Dict = Record<string, string>;

const dictionaries: Record<Lang, Dict> = {
  id: {
    // Nav
    'nav.map': 'Peta',
    'nav.dashboard': 'Dashboard',
    'nav.statistics': 'Statistik Faskes',
    // Header
    'header.year': 'Tahun',
    'header.all': 'Semua',
    'header.language': 'Bahasa',
    'header.theme': 'Tema',
    'header.accessibility': 'Aksesibilitas',
    // Sidebar
    'sidebar.analysis': 'Pilihan Analisis',
    'sidebar.city': 'Kota Surabaya',
    'sidebar.district': 'Kecamatan',

    // Common
    'common.loadingMap': 'Memuat data peta...',
    'common.loadingDashboard': 'Memuat dashboard...',
    'common.loadingStatistics': 'Memuat analisis statistik...',
    'common.error': 'Gagal memuat data dari server. Pastikan layanan backend Anda aktif dan berjalan dengan benar.',
    'common.district': 'Kecamatan',
    'common.year': 'Tahun',
    'common.allYears': 'Semua Tahun',
    'common.citySurabaya': 'Kota Surabaya',
    // MapPage
    'map.statusDistrict': 'Status Kecamatan',
    'map.selectDistrict': 'Pilih Kecamatan',
    'map.ratioFaskes': 'Rasio Faskes',
    'map.dataBasedOnYear': 'Data berdasarkan tahun',
    'map.totalPopulation': 'Total Penduduk',
    'map.totalFacilities': 'Total Fasilitas',
    'map.entireSurabaya': 'Seluruh Surabaya',
    'map.faskesAvailable': 'Faskes tersedia',
    'map.totalInSurabaya': 'Total di Surabaya',
    'map.ratioPerYear': 'Rasio Faskes Per Tahun',
    'map.breakdownFaskes': 'Breakdown Faskes',
    'map.hospitalGeneral': 'Rumah Sakit Umum',
    'map.hospitalSpecial': 'Rumah Sakit Khusus',
    'map.puskesmas': 'Puskesmas',
    'map.clinic': 'Klinik',
    'map.selectDistrictHint': 'Pilih kecamatan pada peta untuk melihat detail fasilitas',
    'map.viewDetail': 'Lihat Detail Analytics',
    'map.ratioScale': 'Skala Rasio',
    'map.aboutTooltip': 'tentang website ini?',
    'map.aboutAlert': 'Analisis Rasio Fasilitas Kesehatan Surabaya\nData diproses dari Supabase / data lokal.',
    'map.kecamatanPrefix': 'Kec.',
    // Status
    'status.critical': 'Kritis',
    'status.veryLow': 'Sangat Rendah',
    'status.low': 'Rendah',
    'status.medium': 'Sedang',
    'status.good': 'Baik',
    'status.veryGood': 'Sangat Baik',
    'status.excellent': 'Istimewa',

    // Dashboard
    'dashboard.title': 'Dashboard Statistik Kesehatan Surabaya',
    'dashboard.totalDistrict': 'Total Kecamatan',
    'dashboard.avgRatio': 'Rata-rata Rasio',
    'dashboard.totalFacilities': 'Total Fasilitas',
    'dashboard.dataPerDistrict': 'Data Per Kecamatan',
    'dashboard.order': 'Urutan',
    'dashboard.highest': 'Tertinggi',
    'dashboard.lowest': 'Terendah',
    'dashboard.data': 'Data',
    'dashboard.default': 'Default',
    'dashboard.facilities': 'Fasilitas',
    'dashboard.population': 'Penduduk',
    'dashboard.status': 'Status',
    'dashboard.colDistrict': 'Kecamatan',
    'dashboard.colYear': 'Tahun',
    'dashboard.colFacilities': 'Fasilitas',
    'dashboard.colPopulation': 'Penduduk',
    'dashboard.colRatio': 'Rasio (per 1k)',

    // Statistics
    'stats.title': 'Statistik Fasilitas Kesehatan',
    'stats.subtitle': 'Analisis komprehensif wilayah:',
    'stats.highestRatio': 'Rasio Tertinggi',
    'stats.averageRatio': 'Rasio Sedang (Rata-rata)',
    'stats.lowestRatio': 'Rasio Terendah',
    'stats.cityAverage': 'Rata-rata Kota Surabaya',
    'stats.totalFaskes': 'Jumlah Faskes',
    'stats.totalFaskesDesc': 'Total Fasilitas Kesehatan',
    'stats.ratioFaskesPopulation': 'Rasio Faskes - Penduduk',
    'stats.totalPopulation': 'Jumlah Penduduk',
    'stats.populationDesc': 'Jiwa Penduduk Wilayah',
    'stats.percentageFaskes': 'Persentase Faskes',
    'stats.totalFaskesCenter': 'Total Faskes',
    'stats.amountHealthFacilities': 'Jumlah Fasilitas Kesehatan',
    'stats.growthFaskes': 'Pertumbuhan Faskes',
    'stats.faskesType': 'Tipe Faskes',
    'stats.facilities': 'Fasilitas',
    'stats.ratioPer1000': 'Rasio / 1.000 Penduduk',
    'stats.noRatioData': 'Data rasio tidak tersedia untuk kecamatan ini.',

    // Theme
    'theme.light': 'Terang',
    'theme.dark': 'Gelap',
    'theme.system': 'Sistem',
    // Accessibility
    'a11y.normal': 'Normal',
    'a11y.protanopia': 'Protanopia (Merah)',
    'a11y.deuteranopia': 'Deuteranopia (Hijau)',
    'a11y.tritanopia': 'Tritanopia (Biru)',
    'a11y.achromatopsia': 'Akromatopsia (Grayscale)',
    'a11y.highContrast': 'Kontras Tinggi',
    'a11y.filterTitle': 'Filter Buta Warna',
    'a11y.filterDesc': 'Sesuaikan warna peta & grafik untuk visibilitas optimal',
  },
  en: {
    'nav.map': 'Map',
    'nav.dashboard': 'Dashboard',
    'nav.statistics': 'Health Facility Statistics',

    'header.year': 'Year',
    'header.all': 'All',
    'header.language': 'Language',
    'header.theme': 'Theme',
    'header.accessibility': 'Accessibility',

    'sidebar.analysis': 'Analysis Options',
    'sidebar.city': 'Surabaya City',
    'sidebar.district': 'District',

    'common.loadingMap': 'Loading map data...',
    'common.loadingDashboard': 'Loading dashboard...',
    'common.loadingStatistics': 'Loading statistical analysis...',
    'common.error': 'Failed to load data from server. Please ensure your backend service is running correctly.',
    'common.district': 'District',
    'common.year': 'Year',
    'common.allYears': 'All Years',
    'common.citySurabaya': 'Surabaya City',

    'map.statusDistrict': 'District Status',
    'map.selectDistrict': 'Select District',
    'map.ratioFaskes': 'Facility Ratio',
    'map.dataBasedOnYear': 'Data based on year',
    'map.totalPopulation': 'Total Population',
    'map.totalFacilities': 'Total Facilities',
    'map.entireSurabaya': 'Entire Surabaya',
    'map.faskesAvailable': 'facilities available',
    'map.totalInSurabaya': 'Total in Surabaya',
    'map.ratioPerYear': 'Facility Ratio Per Year',
    'map.breakdownFaskes': 'Facility Breakdown',
    'map.hospitalGeneral': 'General Hospital',
    'map.hospitalSpecial': 'Specialized Hospital',
    'map.puskesmas': 'Public Health Center',
    'map.clinic': 'Clinic',
    'map.selectDistrictHint': 'Select a district on the map to view facility details',
    'map.viewDetail': 'View Detailed Analytics',
    'map.ratioScale': 'Ratio Scale',
    'map.aboutTooltip': 'about this website?',
    'map.aboutAlert': 'Surabaya Health Facility Ratio Analysis\nData processed from Supabase / local data.',
    'map.kecamatanPrefix': 'Dist.',

    'status.critical': 'Critical',
    'status.veryLow': 'Very Low',
    'status.low': 'Low',
    'status.medium': 'Moderate',
    'status.good': 'Good',
    'status.veryGood': 'Very Good',
    'status.excellent': 'Excellent',

    'dashboard.title': 'Surabaya Health Statistics Dashboard',
    'dashboard.totalDistrict': 'Total Districts',
    'dashboard.avgRatio': 'Average Ratio',
    'dashboard.totalFacilities': 'Total Facilities',
    'dashboard.dataPerDistrict': 'Data Per District',
    'dashboard.order': 'Order',
    'dashboard.highest': 'Highest',
    'dashboard.lowest': 'Lowest',
    'dashboard.data': 'Data',
    'dashboard.default': 'Default',
    'dashboard.facilities': 'Facilities',
    'dashboard.population': 'Population',
    'dashboard.status': 'Status',
    'dashboard.colDistrict': 'District',
    'dashboard.colYear': 'Year',
    'dashboard.colFacilities': 'Facilities',
    'dashboard.colPopulation': 'Population',
    'dashboard.colRatio': 'Ratio (per 1k)',

    'stats.title': 'Health Facility Statistics',
    'stats.subtitle': 'Comprehensive analysis for',
    'stats.highestRatio': 'Highest Ratio',
    'stats.averageRatio': 'Medium Ratio (Average)',
    'stats.lowestRatio': 'Lowest Ratio',
    'stats.cityAverage': 'Surabaya City Average',
    'stats.totalFaskes': 'Total Facilities',
    'stats.totalFaskesDesc': 'Total Health Facilities',
    'stats.ratioFaskesPopulation': 'Facility - Population Ratio',
    'stats.totalPopulation': 'Total Population',
    'stats.populationDesc': 'Residents in Area',
    'stats.percentageFaskes': 'Facility Percentage',
    'stats.totalFaskesCenter': 'Total Facilities',
    'stats.amountHealthFacilities': 'Total Health Facilities',
    'stats.growthFaskes': 'Facility Growth',
    'stats.faskesType': 'Facility Type',
    'stats.facilities': 'Facilities',
    'stats.ratioPer1000': 'Ratio / 1,000 Residents',
    'stats.noRatioData': 'Ratio data is not available for this district.',

    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'theme.system': 'System',

    'a11y.normal': 'Normal',
    'a11y.protanopia': 'Protanopia (Red-blind)',
    'a11y.deuteranopia': 'Deuteranopia (Green-blind)',
    'a11y.tritanopia': 'Tritanopia (Blue-blind)',
    'a11y.achromatopsia': 'Achromatopsia (Grayscale)',
    'a11y.highContrast': 'High Contrast',
    'a11y.filterTitle': 'Color Blind Filter',
    'a11y.filterDesc': 'Adjust map & chart colors for optimal visibility',
  },
};

type LanguageContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('gis_lang') as Lang | null;
    if (saved === 'en' || saved === 'id') return saved;
    return 'id';
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('gis_lang', l);
    document.documentElement.lang = l;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useMemo(() => {
    return (key: string) => dictionaries[lang][key] ?? dictionaries['id'][key] ?? key;
  }, [lang]) as (key: string) => string;

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};

export const getStatusKey = (value: number): string => {
  if (value < 0.05) return 'status.critical';
  if (value < 0.10) return 'status.veryLow';
  if (value < 0.15) return 'status.low';
  if (value < 0.20) return 'status.medium';
  if (value < 0.25) return 'status.good';
  if (value < 0.30) return 'status.veryGood';
  return 'status.excellent';
};
