import React, { useEffect, useMemo, useState } from 'react';
import MapComponent from '../components/MapComponent';
import DistrictRatioChart from '../components/DistrictRatioChart';
import Counter from '../components/Counter';
import { fetchAnalysis, fetchFaskes, fetchGeoJson } from '../api/gisApi';
import { useNavigate } from 'react-router-dom';
import { useHeader } from '../context/HeaderContext';
import { useLanguage, getStatusKey } from '../context/LanguageContext';
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

const getStatusColor = (value: number) => {
  if (value < 0.05) return { color: '#f87171', shadow: 'shadow-red-200' };
  if (value < 0.10) return { color: '#fb923c', shadow: 'shadow-orange-200' };
  if (value < 0.15) return { color: '#facc15', shadow: 'shadow-yellow-200' };
  if (value < 0.20) return { color: '#22c55e', shadow: 'shadow-green-200' };
  if (value < 0.25) return { color: '#38bdf8', shadow: 'shadow-sky-200' };
  if (value < 0.30) return { color: '#818cf8', shadow: 'shadow-indigo-200' };
  return { color: '#7c3aed', shadow: 'shadow-purple-200' };
};

const MapPage: React.FC = () => {
  const [geoData, setGeoData] = useState<GeoJsonData | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData[]>([]);
  const [faskesData, setFaskesData] = useState<FacilityData[]>([]);
  const { selectedYear, setSelectedYear, setAvailableYears } = useHeader();
  const { t, lang } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const formatNumber = (value: number) => new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'id-ID').format(value);

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
        setError(t('common.error'));
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
      <div className="flex items-center justify-center h-full w-full bg-slate-950 dark:bg-[#020617] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4" />
          <p className="text-sm text-slate-300">{t('common.loadingMap')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-[#EEF4FF] via-[#F1F6FF] to-[#ffffff] dark:from-[#0B1120] dark:via-[#131C2E] dark:to-[#0F172A] p-6">
        <div className="bg-white/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 max-w-md text-center shadow-glass backdrop-blur-xl">
          <p className="text-slate-700 dark:text-slate-200 font-semibold mb-2">⚠️ Error</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">{error}</p>
        </div>
      </div>
    );
  }

  const statusMeta = selectedDistrictData ? getStatusColor(selectedDistrictData.rasio_scaled) : null;
  const statusLabel = selectedDistrictData ? t(getStatusKey(selectedDistrictData.rasio_scaled)) : null;

  const renderStatusCard = (compact = false) => (
    <div className={`group rounded-[${compact ? '24px' : '32px'}] border border-sky-400/30 dark:border-white/10 bg-white/80 dark:bg-white/5 ${compact ? 'p-4' : 'p-5'} shadow-glass backdrop-blur-xl transition-all duration-300 hover:bg-white/90 dark:hover:bg-white/10`}>
      <p className="text-xs uppercase tracking-[0.28em] text-sky-600 dark:text-sky-300 font-black mb-3">{t('map.statusDistrict')}</p>
      <div className="flex items-center justify-between gap-2 mb-4">
        <h2 className="text-lg lg:text-xl font-black text-slate-900 dark:text-white truncate">
          {selectedDistrictData?.kecamatan ?? t('map.selectDistrict')}
        </h2>
        {statusMeta && statusLabel && (
          <span 
            className={`rounded-2xl px-2.5 py-1 text-xs font-black uppercase tracking-wider text-white shadow-lg ${statusMeta.shadow}`}
            style={{ backgroundColor: statusMeta.color }}
          >
            {statusLabel}
          </span>
        )}
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-sky-200/30 dark:border-white/10">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{t('map.ratioFaskes')}</span>
          <span className="text-sm font-black text-sky-700 dark:text-sky-300">
            {selectedDistrictData ? <Counter value={selectedDistrictData.rasio_scaled} formatter={(val) => val.toFixed(3)} /> : '-'}
          </span>
        </div>
        <p className="text-xs text-sky-600/60 dark:text-sky-300/60 italic font-black">
          {t('map.dataBasedOnYear')} {selectedYear}
        </p>
      </div>
    </div>
  );

  const renderStatCards = (compact = false) => (
    <div className={`grid ${compact ? 'grid-cols-2 gap-3' : 'grid-cols-1 gap-4'}`}>
      <div className={`group rounded-[${compact ? '20px' : '28px'}] border border-sky-400/30 dark:border-white/10 bg-white/80 dark:bg-white/5 ${compact ? 'p-3.5' : 'p-5'} shadow-glass backdrop-blur-xl`}>
        <p className="text-[10px] lg:text-xs uppercase tracking-[0.28em] text-sky-600 dark:text-sky-300 font-black mb-1 lg:mb-2">{t('map.totalPopulation')}</p>
        <p className={`${compact ? 'text-lg' : 'text-2xl'} font-black text-slate-900 dark:text-white`}>
          <Counter value={selectedDistrictData?.jumlah_penduduk ?? totalPopulation ?? 0} formatter={formatNumber} />
        </p>
        <p className="mt-1 text-[10px] lg:text-xs font-black text-sky-600/50 dark:text-sky-300/50 uppercase tracking-widest truncate">
          {selectedDistrictData ? `${t('map.kecamatanPrefix')} ${selectedDistrictData.kecamatan}` : t('map.entireSurabaya')}
        </p>
      </div>
      <div className={`group rounded-[${compact ? '20px' : '28px'}] border border-sky-400/30 dark:border-white/10 bg-white/80 dark:bg-white/5 ${compact ? 'p-3.5' : 'p-5'} shadow-glass backdrop-blur-xl`}>
        <p className="text-[10px] lg:text-xs uppercase tracking-[0.28em] text-sky-600 dark:text-sky-300 font-black mb-1 lg:mb-2">{t('map.totalFacilities')}</p>
        <p className={`${compact ? 'text-lg' : 'text-2xl'} font-black text-slate-900 dark:text-white`}>
          <Counter value={selectedDistrictData ? (selectedDistrictData.total_faskes_count ?? selectedDistrictData.total_fasilitas ?? 0) : totalFacilities} formatter={formatNumber} />
        </p>
        <p className="mt-1 text-[10px] lg:text-xs font-black text-sky-600/50 dark:text-sky-300/50 uppercase tracking-widest truncate">
          {selectedDistrictData ? `${selectedDistrictData.total_fasilitas} ${t('map.faskesAvailable')}` : t('map.totalInSurabaya')}
        </p>
      </div>
    </div>
  );

  const renderChartCard = (compact = false) => (
    <div className={`group rounded-[${compact ? '24px' : '32px'}] border border-sky-400/30 dark:border-white/10 bg-white/80 dark:bg-white/5 ${compact ? 'p-4' : 'p-5'} shadow-glass backdrop-blur-xl`}>
      <p className="text-xs uppercase tracking-[0.28em] text-sky-600 dark:text-sky-300 font-black mb-3 lg:mb-4">{t('map.ratioPerYear')}</p>
      <div className="h-[150px] lg:h-[180px]">
        <DistrictRatioChart data={selectedDistrictHistory} selectedYear={selectedYear} />
      </div>
    </div>
  );

  const renderBreakdownCard = (compact = false) => (
    <div className={`group rounded-[${compact ? '24px' : '32px'}] border border-sky-400/30 dark:border-white/10 bg-white/80 dark:bg-white/5 ${compact ? 'p-4' : 'p-6'} shadow-glass backdrop-blur-xl`}>
      <div className="flex items-center justify-between mb-4 lg:mb-5">
        <p className="text-xs uppercase tracking-[0.24em] text-sky-600 dark:text-sky-300 font-black">{t('map.breakdownFaskes')}</p>
        {selectedDistrictData && (
          <span className="text-[11px] lg:text-xs font-black text-white bg-sky-500 border border-sky-400 px-2 py-1 rounded-lg uppercase shadow-md truncate max-w-[120px]">
            {selectedDistrictData.kecamatan}
          </span>
        )}
      </div>
      <div className="grid gap-2">
        {selectedDistrictFaskes ? (
          [
            { label: t('map.hospitalGeneral'), value: selectedDistrictFaskes.jumlah_rumah_sakit_umum },
            { label: t('map.hospitalSpecial'), value: selectedDistrictFaskes.jumlah_rumah_sakit_khusus },
            { label: t('map.puskesmas'), value: selectedDistrictFaskes.jumlah_puskesmas },
            { label: t('map.clinic'), value: selectedDistrictFaskes.jumlah_klinik },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-2xl bg-white/60 dark:bg-white/5 px-3 lg:px-4 py-2.5 lg:py-3 text-sm border border-transparent dark:border-white/5">
              <span className="text-slate-600 dark:text-slate-300 font-black text-xs lg:text-sm">{item.label}</span>
              <span className="font-black text-sky-700 dark:text-sky-300 text-sm lg:text-base">
                <Counter value={item.value} />
              </span>
            </div>
          ))
        ) : (
          <div className="py-6 text-center">
            <p className="text-xs lg:text-sm text-sky-400 dark:text-sky-300 italic font-black">{t('map.selectDistrictHint')}</p>
          </div>
        )}
      </div>
      <button 
        onClick={() => navigate(selectedDistrict ? `/statistics/${encodeURIComponent(selectedDistrict)}` : '/statistics')}
        className="mt-4 lg:mt-6 w-full flex items-center justify-center gap-2 rounded-2xl bg-white dark:bg-white/10 border border-sky-200 dark:border-white/10 py-3 text-sm font-black text-sky-700 dark:text-sky-300 hover:bg-sky-500 hover:text-white transition-colors active:scale-[0.98]"
      >
        {t('map.viewDetail')}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </div>
  );

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#EEF4FF] via-[#F1F6FF] to-[#ffffff] dark:from-[#0B1120] dark:via-[#131C2E] dark:to-[#0F172A] flex flex-col lg:block">
      {/* Background radial */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.18),_transparent_30%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(21,93,252,0.15),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.12),_transparent_30%)] pointer-events-none" />

      {/* Map - top on mobile, full bg on desktop */}
      {geoData && (
        <div className="relative lg:absolute lg:inset-0 h-[52vh] lg:h-full w-full shrink-0 lg:shrink-0 z-10">
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

      {/* Desktop Overlays - hidden on mobile */}
      <div className="hidden lg:flex absolute left-4 top-[84px] z-20 w-[320px] flex-col gap-4">
        {renderStatusCard()}
        {renderStatCards()}
      </div>
      <div className="hidden lg:flex absolute right-4 top-[84px] z-20 w-[400px] flex-col gap-4">
        {renderChartCard()}
        {renderBreakdownCard()}
      </div>
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 bottom-6 z-20 w-fit flex-col gap-3 rounded-[28px] border border-sky-400/30 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 p-4 shadow-glass backdrop-blur-xl">
        <p className="text-xs text-center font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">{t('map.ratioScale')}</p>
        <div className="flex items-center gap-4 px-2">
          {RATIO_SCALE.map(({ label, color }) => (
            <div key={label} onClick={() => setHighlightedRange(highlightedRange === label ? null : label)} className="flex flex-col items-center gap-1.5 group cursor-pointer">
              <span className={`h-2.5 w-8 rounded-full shadow-lg transition-all group-hover:scale-110 ${highlightedRange === label ? 'ring-2 ring-sky-500 ring-offset-2 scale-110' : ''}`} style={{ backgroundColor: color }} />
              <span className={`text-[11px] font-black whitespace-nowrap ${highlightedRange === label ? 'text-sky-700 dark:text-sky-300' : 'text-slate-500 dark:text-slate-400'}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Sheet - visible only on mobile/tablet */}
      <div className="lg:hidden flex-1 overflow-y-auto relative z-20 bg-gradient-to-b from-transparent via-[#EEF4FF]/80 to-[#F8FBFF] dark:from-transparent dark:via-[#0B1120]/60 dark:to-[#0B1120] backdrop-blur-[1px]">
        <div className="p-3 pb-20 space-y-3">
          {/* Compact status + stats */}
          {renderStatusCard(true)}
          {renderStatCards(true)}
          {renderChartCard(true)}
          {renderBreakdownCard(true)}
          {/* Legend horizontal scroll */}
          <div className="rounded-[20px] border border-sky-400/30 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 p-3 shadow-glass backdrop-blur-xl">
            <p className="text-[10px] text-center font-black uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300 mb-2">{t('map.ratioScale')}</p>
            <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar pb-1 snap-x px-1">
              {RATIO_SCALE.map(({ label, color }) => (
                <div key={label} onClick={() => setHighlightedRange(highlightedRange === label ? null : label)} className="flex flex-col items-center gap-1 shrink-0 snap-center cursor-pointer min-w-[56px]">
                  <span className={`h-2 w-7 rounded-full ${highlightedRange === label ? 'ring-2 ring-sky-500' : ''}`} style={{ backgroundColor: color }} />
                  <span className={`text-[10px] font-black ${highlightedRange === label ? 'text-sky-700 dark:text-sky-300' : 'text-slate-500 dark:text-slate-400'}`}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
