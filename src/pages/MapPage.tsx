import React, { useEffect, useMemo, useState } from 'react';
import MapComponent from '../components/MapComponent';
import DistrictRatioChart from '../components/DistrictRatioChart';
import Counter from '../components/Counter';
import { fetchAnalysis, fetchFaskes, fetchGeoJson } from '../api/gisApi';
import { useNavigate } from 'react-router-dom';
import { useHeader } from '../context/HeaderContext';
import type { AnalysisData, FacilityData, GeoJsonData } from '../types';

const RATIO_SCALE = [
  { label: '< 0.05', color: '#f87171' },
  { label: '0.05 - 0.10', color: '#fb923c' },
  { label: '0.10 - 0.15', color: '#facc15' },
  { label: '0.15 - 0.20', color: '#22c55e' },
  { label: '0.20 - 0.25', color: '#38bdf8' },
  { label: '0.25 - 0.30', color: '#818cf8' },
  { label: '> 0.30', color: '#7c3aed' },
];

const formatNumber = (value: number) => new Intl.NumberFormat('id-ID').format(value);

const getStatusInfo = (value: number) => {
  if (value < 0.05) return { label: 'Kritis', color: '#f87171', shadow: 'shadow-red-200' };
  if (value < 0.10) return { label: 'Sangat Rendah', color: '#fb923c', shadow: 'shadow-orange-200' };
  if (value < 0.15) return { label: 'Rendah', color: '#facc15', shadow: 'shadow-yellow-200' };
  if (value < 0.20) return { label: 'Sedang', color: '#22c55e', shadow: 'shadow-green-200' };
  if (value < 0.25) return { label: 'Baik', color: '#38bdf8', shadow: 'shadow-sky-200' };
  if (value < 0.30) return { label: 'Sangat Baik', color: '#818cf8', shadow: 'shadow-indigo-200' };
  return { label: 'Istimewa', color: '#7c3aed', shadow: 'shadow-purple-200' };
};

const MapPage: React.FC = () => {
  const [geoData, setGeoData] = useState<GeoJsonData | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData[]>([]);
  const [faskesData, setFaskesData] = useState<FacilityData[]>([]);
  const { selectedYear, setSelectedYear, setAvailableYears } = useHeader();
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [geo, analysis, faskes] = await Promise.all([
          fetchGeoJson(),
          fetchAnalysis(),
          fetchFaskes(),
        ]);

        setGeoData(geo);
        setAnalysisData(analysis);
        setFaskesData(faskes);
        const years = Array.from(new Set(analysis.map((item) => item.tahun))).sort((a, b) => b - a);
        setAvailableYears(years);
        setSelectedYear((prev: number | 'all') => (prev === 0 || !prev) && years.length ? years[0] : prev);
      } catch (err) {
        console.error('Failed to fetch GIS data:', err);
        setError('Gagal memuat data dari server. Pastikan layanan backend Anda aktif dan berjalan dengan benar.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const years = useMemo(
    () => Array.from(new Set(analysisData.map((item) => item.tahun))).sort((a, b) => b - a),
    [analysisData]
  );

  useEffect(() => {
    setSelectedYear((prev: number | 'all') => (prev === 0 || !prev) && years.length ? years[0] : prev);
  }, [years]);

  const currentYearData = useMemo(
    () => analysisData.filter((item) => item.tahun === selectedYear),
    [analysisData, selectedYear]
  );

  const criticalDistrict = useMemo(
    () => currentYearData.reduce<AnalysisData | null>((lowest, item) => {
      if (!lowest) return item;
      return item.rasio_scaled < lowest.rasio_scaled ? item : lowest;
    }, null),
    [currentYearData]
  );

  useEffect(() => {
    if (selectedYear && currentYearData.length) {
      const hasCurrentSelection = selectedDistrict
        ? currentYearData.some((item) => item.kecamatan === selectedDistrict)
        : false;

      if (!hasCurrentSelection) {
        setSelectedDistrict(criticalDistrict?.kecamatan ?? currentYearData[0]?.kecamatan ?? null);
      }
    }
  }, [currentYearData, selectedDistrict, selectedYear, criticalDistrict]);

  const selectedDistrictData = useMemo(
    () => analysisData.find((item) => item.kecamatan === selectedDistrict && item.tahun === selectedYear) ?? null,
    [analysisData, selectedDistrict, selectedYear]
  );

  const selectedDistrictHistory = useMemo(
    () => analysisData
      .filter((item) => item.kecamatan === selectedDistrict)
      .sort((a, b) => a.tahun - b.tahun)
      .map((item) => ({ tahun: item.tahun, value: item.rasio_scaled })),
    [analysisData, selectedDistrict]
  );

  const selectedDistrictFaskes = useMemo(
    () => faskesData.find((item) => item.kecamatan === selectedDistrict && item.tahun === selectedYear) ?? null,
    [faskesData, selectedDistrict, selectedYear]
  );

  const totalPopulation = useMemo(
    () => currentYearData.reduce((sum, item) => sum + (item.jumlah_penduduk ?? 0), 0),
    [currentYearData]
  );

  const totalFacilities = useMemo(
    () => currentYearData.reduce((sum, item) => sum + (item.total_fasilitas ?? 0), 0),
    [currentYearData]
  );

  const [highlightedRange, setHighlightedRange] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-slate-950 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4" />
          <p className="text-sm text-slate-300">Memuat data peta...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-[#EEF4FF] via-[#F1F6FF] to-[#ffffff] p-6">
        <div className="bg-white/80 border border-slate-200/80 rounded-3xl p-6 max-w-md text-center shadow-glass">
          <p className="text-slate-700 font-semibold mb-2">⚠️ Error</p>
          <p className="text-sm text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  const statusInfo = selectedDistrictData ? getStatusInfo(selectedDistrictData.rasio_scaled) : null;

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#EEF4FF] via-[#F1F6FF] to-[#ffffff]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.18),_transparent_30%)] pointer-events-none" />

      {/* Left Overlay - District Info & Stats */}
      <div className="absolute left-4 top-[84px] z-50 w-[min(320px,calc(100%-2rem))] flex flex-col gap-4">
        {/* Status Kecamatan Card */}
        <div className="group rounded-[32px] border border-sky-400/30 bg-sky-50/50 p-5 shadow-glass backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-sky-100/60 hover:border-sky-400/50">
          <p className="text-xs uppercase tracking-[0.28em] text-sky-600 font-black mb-3">Status Kecamatan</p>
          <div className="flex items-center justify-between gap-2 mb-4">
            <h2 className="text-xl font-black text-slate-900 truncate">
              {selectedDistrictData?.kecamatan ?? 'Pilih Kecamatan'}
            </h2>
            {statusInfo && (
              <span 
                className={`rounded-2xl px-2.5 py-1 text-xs font-black uppercase tracking-wider text-white shadow-lg transition-all duration-300 ${statusInfo.shadow}`}
                style={{ backgroundColor: statusInfo.color }}
              >
                {statusInfo.label}
              </span>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-sky-200/30">
              <span className="text-xs font-bold text-slate-500">Rasio Faskes</span>
              <span className="text-sm font-black text-sky-700">
                {selectedDistrictData ? (
                  <Counter 
                    value={selectedDistrictData.rasio_scaled} 
                    formatter={(val) => val.toFixed(3)} 
                  />
                ) : '-'}
              </span>
            </div>
            <p className="text-xs text-sky-600/60 italic font-black">
              Data berdasarkan tahun {selectedYear}
            </p>
          </div>
        </div>

        {/* Population & Facilities Cards */}
        <div className="grid grid-cols-1 gap-4">
          <div className="group rounded-[28px] border border-sky-400/30 bg-sky-50/50 p-5 shadow-glass backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-sky-100/60">
            <p className="text-xs uppercase tracking-[0.28em] text-sky-600 font-black mb-2">Total Penduduk</p>
            <p className="text-2xl font-black text-slate-900 group-hover:text-sky-700 transition-colors">
              <Counter 
                value={selectedDistrictData?.jumlah_penduduk ?? totalPopulation ?? 0} 
                formatter={formatNumber} 
              />
            </p>
            <p className="mt-1 text-xs font-black text-sky-600/50 uppercase tracking-widest">
              {selectedDistrictData ? `Kec. ${selectedDistrictData.kecamatan}` : 'Seluruh Surabaya'}
            </p>
          </div>
          
          <div className="group rounded-[28px] border border-sky-400/30 bg-sky-50/50 p-5 shadow-glass backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:bg-sky-100/60">
            <p className="text-xs uppercase tracking-[0.28em] text-sky-600 font-black mb-2">Total Fasilitas</p>
            <p className="text-2xl font-black text-slate-900 group-hover:text-sky-700 transition-colors">
              <Counter 
                value={selectedDistrictData ? (selectedDistrictData.total_faskes_count ?? selectedDistrictData.total_fasilitas ?? 0) : totalFacilities} 
                formatter={formatNumber} 
              />
            </p>
            <p className="mt-1 text-xs font-black text-sky-600/50 uppercase tracking-widest">
              {selectedDistrictData ? `${selectedDistrictData.total_fasilitas} Faskes tersedia` : 'Total di Surabaya'}
            </p>
          </div>
        </div>
      </div>

      {/* Right Overlay - Chart & Breakdown */}
      <div className="absolute right-4 top-[84px] z-50 flex w-[min(400px,calc(100%-2rem))] flex-col gap-4">
        {/* Ratio Chart Card */}
        <div className="group rounded-[32px] border border-sky-400/30 bg-sky-50/50 p-5 shadow-glass backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:bg-sky-100/60">
          <p className="text-xs uppercase tracking-[0.28em] text-sky-600 font-black mb-4">Rasio Faskes Per Tahun</p>
          <div className="h-[180px]">
            <DistrictRatioChart data={selectedDistrictHistory} selectedYear={selectedYear} />
          </div>
        </div>

        {/* Breakdown Faskes Card */}
        <div className="group rounded-[32px] border border-sky-400/30 bg-sky-50/50 p-6 shadow-glass backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] hover:bg-sky-100/60">
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs uppercase tracking-[0.24em] text-sky-600 font-black">Breakdown Faskes</p>
            {selectedDistrictData && (
              <span className="text-xs font-black text-white bg-sky-500 border border-sky-400 px-2 py-1 rounded-lg uppercase shadow-md shadow-sky-100">
                {selectedDistrictData.kecamatan}
              </span>
            )}
          </div>

          <div className="grid gap-2.5">
            {selectedDistrictFaskes ? (
              [
                { label: 'Rumah Sakit Umum', value: selectedDistrictFaskes.jumlah_rumah_sakit_umum },
                { label: 'Rumah Sakit Khusus', value: selectedDistrictFaskes.jumlah_rumah_sakit_khusus },
                { label: 'Puskesmas', value: selectedDistrictFaskes.jumlah_puskesmas },
                { label: 'Klinik', value: selectedDistrictFaskes.jumlah_klinik },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-2xl bg-white/40 px-4 py-3 text-sm transition-all duration-300 hover:bg-white hover:translate-x-1 hover:shadow-sm">
                  <span className="text-slate-600 font-black">{item.label}</span>
                  <span className="font-black text-sky-700">
                    <Counter value={item.value} />
                  </span>
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-sky-400 italic font-black">Pilih kecamatan pada peta untuk melihat detail fasilitas</p>
              </div>
            )}
          </div>

          <button 
            onClick={() => navigate(selectedDistrict ? `/statistics/${encodeURIComponent(selectedDistrict)}` : '/statistics')}
            className="mt-6 w-full flex items-center justify-center gap-2 rounded-2xl bg-white/60 border border-sky-200 py-3 text-sm font-black text-sky-700 transition-all duration-300 hover:bg-sky-500 hover:text-white hover:border-sky-400 hover:shadow-lg hover:shadow-sky-100"
          >
            Lihat Detail Analytics
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Legend - Centered at bottom */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-50 flex w-fit flex-col gap-3 rounded-[28px] border border-sky-400/30 bg-sky-50/50 p-4 shadow-glass backdrop-blur-xl transition-all hover:bg-sky-100/60">
        <p className="text-xs text-center font-black uppercase tracking-[0.2em] text-sky-600">Skala Rasio</p>
        <div className="flex items-center gap-4 px-2">
          {RATIO_SCALE.map(({ label, color }) => (
            <div 
              key={label} 
              onClick={() => setHighlightedRange(highlightedRange === label ? null : label)}
              className="flex flex-col items-center gap-1.5 group cursor-pointer"
            >
              <span 
                className={`h-2.5 w-8 rounded-full shadow-lg transition-all duration-300 group-hover:scale-125 group-hover:rotate-6 ${
                  highlightedRange === label ? 'ring-2 ring-sky-500 ring-offset-2 scale-110' : ''
                }`} 
                style={{ backgroundColor: color }} 
              />
              <span className={`text-[11px] font-black whitespace-nowrap transition-colors ${
                highlightedRange === label ? 'text-sky-700' : 'text-slate-500'
              }`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {geoData && (
        <div className="relative z-10 h-full w-full">
          <MapComponent
            geoData={geoData}
            analysisData={analysisData}
            selectedYear={selectedYear}
            selectedDistrict={selectedDistrict}
            highlightedRange={highlightedRange}
            onKecamatanClick={(name) => setSelectedDistrict(name)}
          />
        </div>
      )}
    </div>
  );
};

export default MapPage;

