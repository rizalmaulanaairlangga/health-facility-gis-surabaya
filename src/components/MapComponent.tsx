import React, { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { AnalysisData, GeoJsonData } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAccessibility } from '../context/AccessibilityContext';

interface MapComponentProps {
  geoData: GeoJsonData;
  analysisData: AnalysisData[];
  selectedYear: number | 'all';
  selectedDistrict: string | null;
  highlightedRange: string | null;
  onKecamatanClick: (name: string) => void;
}

const isRatioInRange = (ratio: number, label: string) => {
  if (label === '< 0.05') return ratio < 0.05;
  if (label === '0.05 - 0.10') return ratio >= 0.05 && ratio < 0.10;
  if (label === '0.10 - 0.15') return ratio >= 0.10 && ratio < 0.15;
  if (label === '0.15 - 0.20') return ratio >= 0.15 && ratio < 0.20;
  if (label === '0.20 - 0.25') return ratio >= 0.20 && ratio < 0.25;
  if (label === '0.25 - 0.30') return ratio >= 0.25 && ratio < 0.30;
  if (label === '> 0.30') return ratio >= 0.30;
  return false;
};

const getRatioColor = (ratio: number) => {
  if (ratio < 0.05) return '#f87171';
  if (ratio < 0.10) return '#fb923c';
  if (ratio < 0.15) return '#facc15';
  if (ratio < 0.20) return '#22c55e';
  if (ratio < 0.25) return '#38bdf8';
  if (ratio < 0.30) return '#818cf8';
  return '#7c3aed';
};

// Color-blind safe alternative palette (pattern-friendly by adding distinct hues)
const getRatioColorSafe = (ratio: number, mode: string) => {
  const base = getRatioColor(ratio);
  if (mode === 'normal' || mode === 'highContrast') return base;
  // For color-blind, we shift to more distinguishable palette using blue-yellow scheme
  // Keep similar luminance but adjust
  if (mode === 'achromatopsia') {
    // Grayscale mapping by ratio
    if (ratio < 0.05) return '#1a1a1a';
    if (ratio < 0.10) return '#404040';
    if (ratio < 0.15) return '#737373';
    if (ratio < 0.20) return '#a3a3a3';
    if (ratio < 0.25) return '#d4d4d4';
    if (ratio < 0.30) return '#e5e5e5';
    return '#fafafa';
  }
  // For protanopia/deuteranopia/tritanopia use ColorBrewer color-blind safe
  if (ratio < 0.05) return '#d7191c';
  if (ratio < 0.10) return '#fdae61';
  if (ratio < 0.15) return '#ffffbf';
  if (ratio < 0.20) return '#a6d96a';
  if (ratio < 0.25) return '#1a9641';
  if (ratio < 0.30) return '#2c7bb6';
  return '#053061';
};

const getStatusKey = (ratio: number) => {
  if (ratio < 0.05) return 'status.critical';
  if (ratio < 0.10) return 'status.veryLow';
  if (ratio < 0.15) return 'status.low';
  if (ratio < 0.20) return 'status.medium';
  if (ratio < 0.25) return 'status.good';
  if (ratio < 0.30) return 'status.veryGood';
  return 'status.excellent';
};

const FlyToDistrict: React.FC<{ selectedDistrict: string | null; geoData: GeoJsonData }> = ({ selectedDistrict, geoData }) => {
  const map = useMap();
  useEffect(() => {
    if (!selectedDistrict || !(geoData as any)?.features) return;
    const feature: any = (geoData as any).features.find((f: any) => f.properties.kecamatan === selectedDistrict);
    if (!feature) return;
    try {
      const layer = L.geoJSON(feature as any);
      const bounds = (layer as any).getBounds();
      if (bounds && bounds.isValid && bounds.isValid()) {
        const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
        // Padding to keep district centered in visible map area, not under side panels on desktop
        const padding: [number, number] = isDesktop ? [40, 40] : [24, 24];
        map.flyToBounds(bounds, { padding, maxZoom: 13, duration: 0.9, easeLinearity: 0.2 });
      }
    } catch {}
  }, [selectedDistrict, geoData, map]);
  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({
  geoData,
  analysisData,
  selectedYear,
  selectedDistrict,
  highlightedRange,
  onKecamatanClick,
}) => {
  const { t, lang } = useLanguage();
  const { resolvedTheme } = useTheme();
  const { mode } = useAccessibility();

  const getStyle = (feature: any) => {
    const kecamatanName = feature.properties.kecamatan;
    const analysis = analysisData.find(
      (d) => d.kecamatan === kecamatanName && d.tahun === selectedYear
    );
    const ratio = analysis?.rasio_scaled ?? 0;
    const isSelected = selectedDistrict === kecamatanName;
    const isHighlighted = highlightedRange ? isRatioInRange(ratio, highlightedRange) : false;
    const fillColor = analysis ? getRatioColorSafe(ratio, mode) : (resolvedTheme === 'dark' ? '#1e293b' : '#f1f5f9');

    return {
      fillColor,
      weight: isSelected ? 5 : (isHighlighted ? 4.5 : 1.5),
      opacity: 1,
      color: isSelected ? '#0ea5e9' : (isHighlighted ? (resolvedTheme === 'dark' ? '#e2e8f0' : '#0f172a') : '#ffffff'),
      dashArray: isSelected ? '5, 5' : '0',
      fillOpacity: isSelected || isHighlighted ? 0.95 : (mode === 'highContrast' ? 0.9 : 0.8),
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    const kecamatanName = feature.properties.kecamatan;
    const analysis = analysisData.find(
      (d) => d.kecamatan === kecamatanName && d.tahun === selectedYear
    );
    const ratio = analysis?.rasio_scaled ?? 0;
    const isHighlighted = highlightedRange ? isRatioInRange(ratio, highlightedRange) : false;
    const isSelected = selectedDistrict === kecamatanName;

    if (isHighlighted || isSelected) {
      setTimeout(() => layer.bringToFront(), 0);
    }

    const statusLabel = t(getStatusKey(ratio));
    const color = getRatioColorSafe(ratio, mode);

    layer.bindTooltip(`
      <div class="px-3 py-2">
        <p class="text-sm font-black text-slate-900 dark:text-white mb-0.5">${kecamatanName}</p>
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full" style="background-color: ${color}"></span>
          <p class="text-[10px] font-black uppercase tracking-wider text-slate-500">${statusLabel}</p>
        </div>
      </div>
    `, {
      sticky: true,
      direction: 'top',
      className: 'custom-tooltip',
      opacity: 1
    });

    const locale = lang === 'en' ? 'en-US' : 'id-ID';
    layer.bindPopup(`
      <div class="font-sans w-[82vw] max-w-[300px] sm:w-[300px] overflow-hidden">
        <!-- Header -->
        <div class="px-4 pt-4 pb-3 flex items-start justify-between gap-3">
          <div class="min-w-0">
            <h4 class="text-[16px] sm:text-lg font-black text-slate-900 leading-tight truncate pr-2">${kecamatanName}</h4>
            <div class="mt-1 inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest" style="background:${color}14; border-color:${color}30; color:${color}">
              <span class="w-1.5 h-1.5 rounded-full" style="background:${color}"></span>
              ${statusLabel}
            </div>
          </div>
          <span class="hidden sm:block w-3 h-3 rounded-full shrink-0 mt-1 shadow-sm ring-2 ring-white" style="background:${color}"></span>
        </div>
        <!-- Stats grid - 2 cols on mobile -->
        <div class="px-4 grid grid-cols-2 gap-2">
          <div class="rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 p-3">
            <p class="text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">${t('common.year')}</p>
            <p class="text-[13px] font-black text-slate-900 dark:text-white mt-1">${selectedYear}</p>
          </div>
          <div class="rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 p-3">
            <p class="text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">${t('dashboard.totalFacilities')}</p>
            <p class="text-[13px] font-black text-slate-900 dark:text-white mt-1">${analysis?.total_fasilitas ?? '0'}</p>
          </div>
          <div class="col-span-2 rounded-2xl bg-sky-50 dark:bg-sky-500/10 border border-sky-100 dark:border-sky-400/20 p-3 flex items-center justify-between">
            <div>
              <p class="text-[9px] font-black uppercase tracking-[0.14em] text-sky-600/70 dark:text-sky-300/70">${t('map.totalPopulation')}</p>
              <p class="text-[13px] font-black text-slate-900 dark:text-white mt-1">${analysis?.jumlah_penduduk ? analysis.jumlah_penduduk.toLocaleString(locale) : 'N/A'}</p>
            </div>
            <div class="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-sm">👥</div>
          </div>
        </div>
        <!-- Ratio highlight -->
        <div class="mx-4 mt-3 rounded-2xl bg-gradient-to-br from-sky-500 to-sky-400 dark:from-sky-600 dark:to-sky-500 p-3.5 flex items-center justify-between text-white shadow-md">
          <div class="flex items-center gap-2">
            <span class="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center text-[12px]">◈</span>
            <span class="text-[10px] font-black uppercase tracking-[0.16em] text-white/90">${t('map.ratioFaskes')}</span>
          </div>
          <span class="text-[15px] font-black tracking-tight">${ratio ? ratio.toFixed(4) : 'N/A'}</span>
        </div>
        <p class="px-4 py-2.5 text-[10px] text-center font-bold text-slate-400">${t('map.viewDetail')} →</p>
      </div>
    `, {
      className: 'custom-leaflet-popup',
      maxWidth: 320,
      autoPan: false,
      keepInView: false,
      closeButton: true
    });

    layer.on({
      click: (e: any) => {
        onKecamatanClick(kecamatanName);
        layer.openPopup(e.latlng);
      },
      mouseover: (e: any) => {
        const l = e.target;
        l.setStyle({
          weight: 5,
          color: '#3b82f6',
          fillOpacity: 0.95,
        });
        l.bringToFront();
      },
      mouseout: (e: any) => {
        const l = e.target;
        l.setStyle(getStyle(feature));
      },
    });
  };

  // 100% gratis tanpa API key — OSM standard (light & dark via CSS filter)
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  return (
    <div className={`relative z-10 h-full w-full ${resolvedTheme === 'dark' ? 'is-dark-tiles' : ''}`}>
      <MapContainer
        center={[-7.2575, 112.7521]}
        zoom={12}
        className="h-full w-full"
        zoomControl={false}
        scrollWheelZoom={true}
      >
        <TileLayer
          key={tileUrl}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={tileUrl}
          opacity={1}
        />
        <FlyToDistrict selectedDistrict={selectedDistrict} geoData={geoData} />
        <GeoJSON
          key={`${selectedYear}-${analysisData.length}-${selectedDistrict ?? 'none'}-${highlightedRange ?? 'none'}-${resolvedTheme}-${mode}`}
          data={geoData}
          style={getStyle}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
