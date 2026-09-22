import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
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
      <div class="p-5 font-sans min-w-[180px]">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-lg font-black text-slate-900">${kecamatanName}</h4>
          <span class="w-3 h-3 rounded-full" style="background-color: ${color}"></span>
        </div>
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400">${t('common.year')}</span>
            <span class="text-sm font-black text-slate-700">${selectedYear}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm font-bold uppercase tracking-wider text-slate-400">${t('dashboard.totalFacilities')}</span>
            <span class="text-sm font-black text-slate-700">${analysis?.total_fasilitas ?? '0'}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-sm font-bold uppercase tracking-wider text-slate-400">${t('map.totalPopulation')}</span>
            <span class="text-sm font-black text-slate-700">${analysis?.jumlah_penduduk ? analysis.jumlah_penduduk.toLocaleString(locale) : 'N/A'}</span>
          </div>
          <div class="pt-2 border-t border-slate-100 flex justify-between items-center">
            <span class="text-sm font-bold uppercase tracking-wider text-sky-500">${t('map.ratioFaskes')}</span>
            <span class="text-sm font-black text-sky-600">${ratio ? ratio.toFixed(4) : 'N/A'}</span>
          </div>
        </div>
      </div>
    `, {
      className: 'custom-leaflet-popup',
      maxWidth: 300
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
