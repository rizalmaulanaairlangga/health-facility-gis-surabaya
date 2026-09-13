import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHeader } from '../context/HeaderContext';
import { fetchFaskes, fetchAnalysis } from '../api/gisApi';
import type { FacilityData, AnalysisData } from '../types';
import { Activity, Building2, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Counter from '../components/Counter';

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

// Consistent Colors for Healthcare Facility Types across all charts
const FASKES_COLORS = {
  rsu: '#38bdf8',      // Bright Luminous Sky Blue (Rumah Sakit Umum - high contrast)
  rsk: '#a855f7',      // Purple (Rumah Sakit Khusus)
  puskesmas: '#22c55e',// Green (Puskesmas)
  klinik: '#eab308'    // Yellow (Klinik)
};

const DONUT_RADIUS = 40;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;

const StatisticsPage: React.FC = () => {
  const { kecamatan } = useParams<{ kecamatan?: string }>();
  const decodedKecamatan = kecamatan ? decodeURIComponent(kecamatan) : undefined;
  const navigate = useNavigate();
  const { selectedYear } = useHeader();
  
  const [faskesData, setFaskesData] = useState<FacilityData[]>([]);
  const [analysisData, setAnalysisData] = useState<AnalysisData[]>([]);
  const [loading, setLoading] = useState(true);

  // States for Interactive Cross-Chart Hover and Active (Click) Synchronizations
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const [isLocalDonutHover, setIsLocalDonutHover] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredPoint, setHoveredPoint] = useState<{ label: string; x: number; y: number; value: number; color: string } | null>(null);

  // Animation state for initial page load / refresh
  const [animReady, setAnimReady] = useState(false);
  const [activeDeps, setActiveDeps] = useState(`${selectedYear}-${decodedKecamatan}`);

  if (activeDeps !== `${selectedYear}-${decodedKecamatan}`) {
    setActiveDeps(`${selectedYear}-${decodedKecamatan}`);
    setAnimReady(false);
  }

  useEffect(() => {
    if (!loading) {
      if (!animReady) {
        const timer = setTimeout(() => setAnimReady(true), 50);
        return () => clearTimeout(timer);
      }
    } else {
      setAnimReady(false);
    }
  }, [loading, animReady, activeDeps]);

  // Determine if a specific type is active (either hovered OR selected when no other hover is active)
  const isTypeActive = (typeKey: string) => {
    if (hoveredType) {
      return hoveredType === typeKey;
    }
    return selectedType === typeKey;
  };



  const handleMouseMove = (e: React.MouseEvent) => {
    const container = e.currentTarget.closest('.relative');
    if (container) {
      const rect = container.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [faskes, analysis] = await Promise.all([fetchFaskes(), fetchAnalysis()]);
        setFaskesData(faskes);
        setAnalysisData(analysis);
      } catch (error) {
        console.error('Failed to fetch faskes statistics data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Aggregate or filter data by Year and Kecamatan
  const yearlyData = useMemo(() => {
    const yearsMap: { [year: number]: FacilityData } = {};
    
    faskesData.forEach(item => {
      if (decodedKecamatan && item.kecamatan !== decodedKecamatan) return;
      
      const year = item.tahun;
      if (!yearsMap[year]) {
        yearsMap[year] = {
          kecamatan: decodedKecamatan || 'Surabaya',
          tahun: year,
          jumlah_rumah_sakit_umum: 0,
          jumlah_rumah_sakit_khusus: 0,
          jumlah_puskesmas: 0,
          jumlah_klinik: 0,
          total_faskes: 0
        };
      }
      
      yearsMap[year].jumlah_rumah_sakit_umum += item.jumlah_rumah_sakit_umum;
      yearsMap[year].jumlah_rumah_sakit_khusus += item.jumlah_rumah_sakit_khusus;
      yearsMap[year].jumlah_puskesmas += item.jumlah_puskesmas;
      yearsMap[year].jumlah_klinik += item.jumlah_klinik;
      yearsMap[year].total_faskes += item.total_faskes || (
        item.jumlah_rumah_sakit_umum +
        item.jumlah_rumah_sakit_khusus +
        item.jumlah_puskesmas +
        item.jumlah_klinik
      );
    });

    return Object.values(yearsMap).sort((a, b) => a.tahun - b.tahun);
  }, [faskesData, decodedKecamatan]);

  const latestYear = yearlyData.length > 0 ? Math.max(...yearlyData.map(d => d.tahun)) : 2024;
  const activeYear = selectedYear === 0 ? latestYear : selectedYear;

  const activeYearData = useMemo(() => {
    if (activeYear === 'all') {
      if (yearlyData.length === 0) return null;
      return yearlyData.reduce((acc, curr) => ({
        ...acc,
        jumlah_rumah_sakit_umum: acc.jumlah_rumah_sakit_umum + curr.jumlah_rumah_sakit_umum,
        jumlah_rumah_sakit_khusus: acc.jumlah_rumah_sakit_khusus + curr.jumlah_rumah_sakit_khusus,
        jumlah_puskesmas: acc.jumlah_puskesmas + curr.jumlah_puskesmas,
        jumlah_klinik: acc.jumlah_klinik + curr.jumlah_klinik,
        total_faskes: acc.total_faskes + curr.total_faskes
      }), {
        kecamatan: decodedKecamatan || 'Surabaya',
        tahun: 'Semua Tahun' as any,
        jumlah_rumah_sakit_umum: 0,
        jumlah_rumah_sakit_khusus: 0,
        jumlah_puskesmas: 0,
        jumlah_klinik: 0,
        total_faskes: 0
      });
    }
    return yearlyData.find(d => d.tahun === activeYear) || yearlyData[yearlyData.length - 1] || null;
  }, [yearlyData, activeYear, decodedKecamatan]);

  const activeKecamatanAnalysis = useMemo(() => {
    if (!decodedKecamatan) return null;
    
    if (activeYear === 'all') {
      const records = analysisData.filter(d => d.kecamatan === decodedKecamatan);
      if (records.length === 0) return null;
      
      const totalPop = records.reduce((acc, curr) => acc + (curr.jumlah_penduduk || 0), 0);
      const avgPop = totalPop / records.length;
      const avgRasioScaled = records.reduce((acc, curr) => acc + curr.rasio_scaled, 0) / records.length;
      return {
        kecamatan: decodedKecamatan,
        tahun: 'Semua Tahun' as any,
        jumlah_penduduk: Math.round(avgPop),
        rasio_scaled: avgRasioScaled
      };
    }
    
    return analysisData.find(d => d.kecamatan === decodedKecamatan && d.tahun === activeYear) || null;
  }, [analysisData, activeYear, decodedKecamatan]);

  // Find ratio statistics (highest, average, lowest) for Surabaya Analysis
  const ratioStats = useMemo(() => {
    const targetAnalysis = activeYear === 'all' 
      ? analysisData 
      : analysisData.filter(d => d.tahun === activeYear);
    if (targetAnalysis.length === 0) return { highest: null, average: 0, lowest: null };

    const sorted = [...targetAnalysis].sort((a, b) => a.rasio_scaled - b.rasio_scaled);
    const lowest = sorted[0];
    const highest = sorted[sorted.length - 1];
    
    const sum = sorted.reduce((acc, curr) => acc + curr.rasio_scaled, 0);
    const average = sum / sorted.length;

    return {
      highest,
      average,
      lowest
    };
  }, [analysisData, activeYear]);

  // Data for Visitor Sources (Doughnut Chart) with consistent coloring and keys
  const faskesTypes = useMemo(() => {
    if (!activeYearData) return [];
    
    const rsu = activeYearData.jumlah_rumah_sakit_umum;
    const rsk = activeYearData.jumlah_rumah_sakit_khusus;
    const puskesmas = activeYearData.jumlah_puskesmas;
    const klinik = activeYearData.jumlah_klinik;
    const total = rsu + rsk + puskesmas + klinik || 1;

    return [
      { key: 'rsu', name: 'Rumah Sakit Umum', value: rsu, percentage: rsu / total, color: FASKES_COLORS.rsu },
      { key: 'rsk', name: 'Rumah Sakit Khusus', value: rsk, percentage: rsk / total, color: FASKES_COLORS.rsk },
      { key: 'puskesmas', name: 'Puskesmas', value: puskesmas, percentage: puskesmas / total, color: FASKES_COLORS.puskesmas },
      { key: 'klinik', name: 'Klinik', value: klinik, percentage: klinik / total, color: FASKES_COLORS.klinik }
    ];
  }, [activeYearData]);

  // Compute segments for SVG Doughnut - 100% melingkar, sorted clockwise, generous spacing gaps
  const doughnutSegments = useMemo(() => {
    const radius = 40; // Shrink slightly from 44 to 40 for perfect card proportions
    const circumference = 2 * Math.PI * radius;
    
    // Only render segments where value > 0 to prevent phantom overlapping dots
    const activeTypes = faskesTypes.filter(t => t.value > 0);
    const totalActive = activeTypes.length;
    
    // Allocate a constant gap per active segment
    const visualGap = totalActive > 1 ? 12 : 0;
    const totalGapSpace = visualGap * totalActive;
    
    // The remaining circumference is distributed based on percentages
    const availableLength = Math.max(circumference - totalGapSpace, 0);
    
    let accumulatedLength = 0;

    return activeTypes.map((t) => {
      // Calculate stroke length proportionally to the available space
      const strokeLength = Math.max(t.percentage * availableLength, 0.1);
      
      // Offset starts clockwise at negative accumulated length
      const strokeOffset = -accumulatedLength;
      
      // Advance by the drawn length PLUS the constant visual gap
      accumulatedLength += strokeLength + visualGap;

      return {
        ...t,
        strokeDasharray: `${strokeLength} ${circumference}`,
        strokeDashoffset: strokeOffset
      };
    });
  }, [faskesTypes]);

  // Data for Performance Overview (Bar Chart) - Widened & Consistent Colors & keys
  const barChartData = useMemo(() => {
    if (!activeYearData) return [];
    
    const data = [
      { key: 'rsu', label: 'RS Umum', value: activeYearData.jumlah_rumah_sakit_umum, color: FASKES_COLORS.rsu },
      { key: 'rsk', label: 'RS Khusus', value: activeYearData.jumlah_rumah_sakit_khusus, color: FASKES_COLORS.rsk },
      { key: 'puskesmas', label: 'Puskesmas', value: activeYearData.jumlah_puskesmas, color: FASKES_COLORS.puskesmas },
      { key: 'klinik', label: 'Klinik', value: activeYearData.jumlah_klinik, color: FASKES_COLORS.klinik }
    ];
    
    const maxVal = Math.max(...data.map(d => d.value), 5);
    
    return data.map((d, index) => {
      const height = 130;
      const barHeight = (d.value / maxVal) * height;
      const x = 70 + index * 105; // Spaced across 500px width
      const y = 160 - barHeight;
      return {
        ...d,
        x,
        y,
        barHeight
      };
    });
  }, [activeYearData]);

  // Data for Trend Analysis (Line Chart) - Wavy/Curved Lines for ALL faskes types
  const trendLines = useMemo(() => {
    if (!yearlyData.length) return [];
    
    const fields = [
      { key: 'jumlah_rumah_sakit_umum' as const, typeKey: 'rsu', label: 'RS Umum', color: FASKES_COLORS.rsu },
      { key: 'jumlah_rumah_sakit_khusus' as const, typeKey: 'rsk', label: 'RS Khusus', color: FASKES_COLORS.rsk },
      { key: 'jumlah_puskesmas' as const, typeKey: 'puskesmas', label: 'Puskesmas', color: FASKES_COLORS.puskesmas },
      { key: 'jumlah_klinik' as const, typeKey: 'klinik', label: 'Klinik', color: FASKES_COLORS.klinik }
    ];

    const maxVal = Math.max(
      ...yearlyData.map(d => Math.max(
        d.jumlah_rumah_sakit_umum,
        d.jumlah_rumah_sakit_khusus,
        d.jumlah_puskesmas,
        d.jumlah_klinik
      )),
      5
    );

    const plotWidth = 280;
    const plotHeight = 110;
    const leftPadding = 45;
    const topPadding = 20;

    return fields.map(f => {
      const points = yearlyData.map((d, index) => {
        const x = leftPadding + (plotWidth * index) / Math.max(yearlyData.length - 1, 1);
        const y = topPadding + plotHeight - (d[f.key] / maxVal) * plotHeight;
        return { x, y, value: d[f.key], tahun: d.tahun };
      });

      // Generate a smooth curved path
      let path = `M ${points[0].x} ${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const dx = (p1.x - p0.x) / 3;
        
        // Check if flat/nearly flat and apply an elegant decorative wave curve!
        if (Math.abs(p1.y - p0.y) < 5) {
          // Creating a soft elegant curve/wave so flat categories are melengkung too!
          path += ` C ${p0.x + dx} ${p0.y - 7}, ${p1.x - dx} ${p1.y + 7}, ${p1.x} ${p1.y}`;
        } else {
          // Normal S-curve bezier curve
          path += ` C ${p0.x + dx} ${p0.y}, ${p1.x - dx} ${p1.y}, ${p1.x} ${p1.y}`;
        }
      }

      return {
        ...f,
        points,
        path
      };
    });
  }, [yearlyData]);



  // Find active segment details for tooltip displaying (cross-chart sync)
  const activeSegmentDetails = useMemo(() => {
    const activeKey = hoveredType || selectedType;
    if (!activeKey) return null;
    return faskesTypes.find(t => t.key === activeKey) || null;
  }, [faskesTypes, hoveredType, selectedType]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-slate-50 text-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4" />
          <p className="text-sm text-slate-500 font-bold">Memuat analisis statistik...</p>
        </div>
      </div>
    );
  }

  return (
    // Raised Page Title: pt-18 for less gap under top navbar
    <div className="pt-18 p-8 h-full overflow-y-auto bg-gradient-to-br from-[#EEF4FF] via-[#F1F6FF] to-[#ffffff] text-slate-800 font-['Poppins']">
      <div className="max-w-6xl mx-auto space-y-4">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black bg-gradient-to-r from-slate-900 to-sky-700 bg-clip-text text-transparent">
              Statistik Fasilitas Kesehatan
            </h2>
            <p className="text-sm text-slate-600 font-bold mt-1">
              Analisis komprehensif wilayah: <span className="text-sky-600">{decodedKecamatan || 'Seluruh Surabaya'}</span> ({activeYear === 'all' ? 'Semua Tahun' : activeYear})
            </p>
          </div>
        </div>

        {/* 2. SUMMARY CARDS: Top Level Information Cards with Dynamic Surabaya/Kecamatan Logic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {!decodedKecamatan ? (
            // Surabaya Analysis Mode: Rasio Tertinggi, Sedang, Terendah
            <>
              {/* Card 1: Rasio Tertinggi (Clickable) */}
              <div 
                onClick={() => ratioStats.highest && navigate(`/statistics/${encodeURIComponent(ratioStats.highest.kecamatan)}`)}
                className="bg-white/70 backdrop-blur-xl border border-sky-300/70 rounded-[28px] p-5 shadow-glass flex items-center justify-between transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/10 group"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-black">Rasio Tertinggi</p>
                  <h4 className="text-3xl font-black text-slate-900 mt-1">
                    <Counter value={ratioStats.highest ? ratioStats.highest.rasio_scaled : 0} duration={1500} formatter={(val) => val.toFixed(2)} />
                  </h4>
                  <p className="text-[10px] font-bold text-emerald-600 mt-1">
                    Kec. {ratioStats.highest ? ratioStats.highest.kecamatan : '-'}
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 border border-emerald-200 rounded-2xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  <ArrowUpRight className="text-emerald-600" size={20} />
                </div>
              </div>

              {/* Card 2: Rasio Sedang (Rata-rata Surabaya) */}
              <div className="bg-white/70 backdrop-blur-xl border border-sky-300/70 rounded-[28px] p-5 shadow-glass flex items-center justify-between transition-all hover:scale-[1.02] hover:shadow-md">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-black">Rasio Sedang (Rata-rata)</p>
                  <h4 className="text-3xl font-black text-slate-900 mt-1">
                    <Counter value={ratioStats.average} duration={1500} formatter={(val) => val.toFixed(2)} />
                  </h4>
                  <p className="text-[10px] font-bold text-sky-600 mt-1">
                    Rata-rata Kota Surabaya
                  </p>
                </div>
                <div className="p-3 bg-sky-100 border border-sky-200 rounded-2xl">
                  <Activity className="text-sky-600" size={20} />
                </div>
              </div>

              {/* Card 3: Rasio Terendah (Clickable) */}
              <div 
                onClick={() => ratioStats.lowest && navigate(`/statistics/${encodeURIComponent(ratioStats.lowest.kecamatan)}`)}
                className="bg-white/70 backdrop-blur-xl border border-sky-300/70 rounded-[28px] p-5 shadow-glass flex items-center justify-between transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer hover:border-rose-400 hover:bg-rose-50/10 group"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-black">Rasio Terendah</p>
                  <h4 className="text-3xl font-black text-slate-900 mt-1">
                    <Counter value={ratioStats.lowest ? ratioStats.lowest.rasio_scaled : 0} duration={1500} formatter={(val) => val.toFixed(2)} />
                  </h4>
                  <p className="text-[10px] font-bold text-rose-600 mt-1">
                    Kec. {ratioStats.lowest ? ratioStats.lowest.kecamatan : '-'}
                  </p>
                </div>
                <div className="p-3 bg-rose-100 border border-rose-200 rounded-2xl transition-transform group-hover:translate-x-1 group-hover:translate-y-1">
                  <ArrowDownRight className="text-rose-600" size={20} />
                </div>
              </div>
            </>
          ) : (
            // Specific Kecamatan Mode: Jumlah Faskes, Hasil Rasio Faskes - Penduduk, Jumlah Penduduk
            <>
              {/* Card 1: Jumlah Faskes */}
              <div className="bg-white/70 backdrop-blur-xl border border-sky-300/70 rounded-[28px] p-5 shadow-glass flex items-center justify-between transition-all hover:scale-[1.02] hover:shadow-md">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-black">Jumlah Faskes</p>
                  <h4 className="text-3xl font-black text-slate-900 mt-1">
                    <Counter value={activeYearData?.total_faskes || 0} duration={1500} formatter={(val) => formatNumber(Math.floor(val))} />
                  </h4>
                  <p className="text-[10px] font-bold text-sky-600 mt-1">
                    Total Fasilitas Kesehatan
                  </p>
                </div>
                <div className="p-3 bg-sky-100 border border-sky-200 rounded-2xl">
                  <Building2 className="text-sky-600" size={20} />
                </div>
              </div>

              {/* Card 2: Hasil Rasio Jumlah Penduduk dengan Jumlah Faskes */}
              {(() => {
                const ratioVal = activeKecamatanAnalysis?.rasio_scaled || 0;
                const statusInfo = getStatusInfo(ratioVal);
                return (
                  <div className="relative group">
                    {/* Circle Glow Aura behind the card */}
                    <div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl opacity-40 pointer-events-none transition-all duration-500 group-hover:scale-110"
                      style={{
                        backgroundColor: statusInfo.color
                      }}
                    />
                    <div 
                      className="relative z-10 bg-white/70 backdrop-blur-xl border rounded-[28px] p-5 shadow-glass flex items-center justify-between transition-all hover:scale-[1.02] hover:shadow-md"
                      style={{ borderColor: `${statusInfo.color}50` }}
                    >
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-black">Rasio Faskes - Penduduk</p>
                        <h4 className="text-3xl font-black text-slate-900 mt-1">
                          <Counter value={ratioVal} duration={1500} formatter={(val) => val.toFixed(3)} />
                        </h4>
                        <p className="text-[10px] font-black mt-1" style={{ color: statusInfo.color }}>
                          Status: {statusInfo.label}
                        </p>
                      </div>
                      <div 
                        className="p-3 rounded-2xl text-white shadow-md transition-all duration-300"
                        style={{ backgroundColor: statusInfo.color }}
                      >
                        <Activity size={20} />
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Card 3: Jumlah Penduduk */}
              <div className="bg-white/70 backdrop-blur-xl border border-sky-300/70 rounded-[28px] p-5 shadow-glass flex items-center justify-between transition-all hover:scale-[1.02] hover:shadow-md">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-black">Jumlah Penduduk</p>
                  <h4 className="text-3xl font-black text-slate-900 mt-1">
                    <Counter value={activeKecamatanAnalysis?.jumlah_penduduk || 0} duration={1500} formatter={(val) => formatNumber(Math.floor(val))} />
                  </h4>
                  <p className="text-[10px] font-bold text-sky-600 mt-1">
                    Jiwa Penduduk Wilayah
                  </p>
                </div>
                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl">
                  <TrendingUp className="text-indigo-600" size={20} />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Chart Grid - Tighter gaps (gap-4) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* 1. Persentase Faskes (Donut Chart - Cross-chart Hovers, spacing gaps, absolute hovering tooltip) */}
          <div className="md:col-span-1 bg-gradient-to-br from-blue-600 to-sky-500 text-white rounded-[32px] p-6 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[460px] border border-sky-400 transition-all hover:shadow-2xl">
            {/* Background glowing pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent_40%)] pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg font-black text-white">Persentase Faskes</p>
                <Building2 className="text-blue-100 opacity-90" size={20} />
              </div>
            </div>

            {/* Doughnut Chart SVG - Perfectly Scaled (w-64 h-64) with custom styled gap segments */}
            <div className="flex justify-center items-center my-2 relative z-10">
              <svg key={`donut-${activeDeps}`} viewBox="0 0 100 100" className="w-64 h-64 transform -rotate-90">
                {/* Background Translucent Track Circle for Bright Blue Background - Highly visible frosted white */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgba(255,255,255,0.65)"
                  strokeWidth="8"
                />
                {/* Active Segments with Rounded Ends, Spacing Gaps, Consistent Colors & Connected Active Syncs */}
                {doughnutSegments.map((seg, segIndex) => {
                  const active = isTypeActive(seg.key);
                  return (
                    <circle
                      key={seg.name}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={seg.color}
                      strokeWidth={active ? "11" : "8"}
                      strokeLinecap="round"
                      strokeDasharray={animReady ? seg.strokeDasharray : `0 ${DONUT_CIRCUMFERENCE}`}
                      strokeDashoffset={seg.strokeDashoffset}
                      className="cursor-pointer"
                      style={{
                        opacity: (selectedType && selectedType !== seg.key) ? 0.4 : 1,
                        transition: `stroke-dasharray 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${segIndex * 0.15}s, stroke-width 0.2s ease-out, opacity 0.2s ease-out`
                      }}
                      onMouseEnter={() => {
                        setHoveredType(seg.key);
                        setIsLocalDonutHover(true);
                      }}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={() => {
                        setHoveredType(null);
                        setIsLocalDonutHover(false);
                      }}
                      onClick={() => setSelectedType(selectedType === seg.key ? null : seg.key)}
                    />
                  );
                })}
              </svg>
              
              {/* Central Text - LOCKED as Total Faskes */}
              <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-black text-white tracking-tight">
                  <Counter value={activeYearData?.total_faskes || 0} duration={1500} formatter={(val) => formatNumber(Math.floor(val))} />
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-100 text-center mt-1">
                  Total Faskes
                </span>
              </div>

              {/* Absolute Hover Floating Tooltip inside Donut Container - Dynamically follows cursor locally OR locks centered if cross-charted */}
              {activeSegmentDetails && (
                <div 
                  style={isLocalDonutHover ? {
                    left: `${tooltipPos.x}px`,
                    top: `${tooltipPos.y - 50}px`,
                    transform: 'translateX(-50%)'
                  } : {
                    left: '50%',
                    top: '-48px',
                    transform: 'translateX(-50%)'
                  }}
                  className="absolute bg-slate-900 border border-white/20 px-4 py-2 rounded-2xl shadow-2xl text-center pointer-events-none z-20 flex flex-col items-center min-w-[130px] transition-all duration-200"
                >
                  <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                    {activeSegmentDetails.name}
                  </span>
                  <span className="text-sm font-black mt-1" style={{ color: activeSegmentDetails.color }}>
                    {formatNumber(activeSegmentDetails.value)} Fasilitas
                  </span>
                </div>
              )}
            </div>

            {/* Breakdown List - HIGH CONTRAST & Connected hover-locking states */}
            <div className="space-y-2 relative z-10">
              {faskesTypes.map((type) => {
                const active = isTypeActive(type.key);
                return (
                  <div 
                    key={type.name} 
                    className={`flex justify-between items-center py-2 border-b border-white/10 text-xs transition-all duration-200 cursor-pointer ${
                      active ? 'bg-white/10 px-3 rounded-lg border-transparent translate-x-1 shadow-sm' : (selectedType ? 'opacity-50' : 'hover:bg-white/5 hover:px-2 rounded-lg')
                    }`}
                    onMouseEnter={() => setHoveredType(type.key)}
                    onMouseLeave={() => setHoveredType(null)}
                    onClick={() => setSelectedType(selectedType === type.key ? null : type.key)}
                  >
                    <div className="flex items-center gap-2.5">
                      <span 
                        className="w-3 h-3 rounded-full border border-white/20 shadow-sm transition-transform duration-200" 
                        style={{ 
                          backgroundColor: type.color,
                          transform: active ? 'scale(1.2)' : 'scale(1)'
                        }}
                      />
                      <span className="font-bold text-slate-100">{type.name}</span>
                    </div>
                    {/* Modern pill background percentage wrapper */}
                    <span className="font-black text-white bg-white/15 px-2 py-0.5 rounded-lg shadow-sm">
                      {(type.percentage * 100).toFixed(1)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column containing Bar & Line Charts with tighter gaps (gap-4) */}
          <div className="md:col-span-2 flex flex-col gap-4">
            
            {/* 2. Jumlah Fasilitas Kesehatan (Bar Chart - Synchronized Bars, Hover Scales & Click Activations) */}
            <div className="bg-white/70 backdrop-blur-xl border border-sky-300/70 rounded-[32px] p-6 shadow-glass flex flex-col justify-between min-h-[220px] transition-all hover:shadow-md">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-lg font-black bg-gradient-to-r from-slate-900 to-sky-700 bg-clip-text text-transparent">Jumlah Fasilitas Kesehatan</p>
                  <Activity className="text-sky-500" size={18} />
                </div>
              </div>

              {/* Widened Bar Chart SVG */}
              <div className="h-44 mt-4 w-full">
                <svg key={`bar-${activeDeps}`} viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                  {/* Horizontal Grid Lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                    const y = 160 - pct * 130;
                    const maxVal = Math.max(...barChartData.map(d => d.value), 5);
                    const value = Math.round(pct * maxVal);
                    return (
                      <g key={i} className="opacity-40">
                        <line x1="30" y1={y} x2="470" y2={y} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                        <text x="15" y={y + 4} fill="#64748b" className="text-[10px] font-black text-right" textAnchor="end">{value}</text>
                      </g>
                    );
                  })}

                  {/* Widened Bars with Connected hover animations & click events */}
                  {barChartData.map((bar, barIndex) => {
                    const active = isTypeActive(bar.key);
                    const barDelay = barIndex * 0.12 + 0.2;
                    return (
                      <g 
                        key={bar.label} 
                        className="group"
                        onMouseEnter={() => setHoveredType(bar.key)}
                        onMouseLeave={() => setHoveredType(null)}
                        onClick={() => setSelectedType(selectedType === bar.key ? null : bar.key)}
                      >
                        {/* Background Track */}
                        <rect
                          x={bar.x}
                          y="30"
                          width="36"
                          height="130"
                          rx="8"
                          fill="#e2e8f0"
                          className="opacity-40"
                        />
                        {/* Active Filled Bar - Animated from bottom + Scaling 3D Pop on hover */}
                        <rect
                          x={bar.x}
                          y={bar.y}
                          width="36"
                          height={bar.barHeight}
                          rx="8"
                          fill={bar.color}
                          className="cursor-pointer"
                          style={{
                            transform: animReady 
                              ? (active ? 'scaleX(1.15) scaleY(1.05)' : 'scale(1)') 
                              : 'scaleY(0)',
                            transformOrigin: `${bar.x + 18}px 160px`,
                            opacity: (selectedType && selectedType !== bar.key) ? 0.5 : 1,
                            transition: `transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${barDelay}s, opacity 0.3s ease-out`
                          }}
                        />
                        {/* Value label - ALWAYS visible & ENLARGED to 13px */}
                        <text
                          x={bar.x + 18}
                          y={bar.y - 8}
                          textAnchor="middle"
                          fill={active ? bar.color : "#0f172a"}
                          className="text-[13px] font-black"
                          style={{
                            transformOrigin: `${bar.x + 18}px ${bar.y - 8}px`,
                            opacity: animReady ? ((selectedType && selectedType !== bar.key) ? 0.5 : 1) : 0,
                            transform: animReady ? (active ? 'scale(1.1) translateY(-2px)' : 'scale(1)') : 'translateY(10px)',
                            transition: `opacity 0.6s ease-out ${barDelay + 0.3}s, transform 0.6s ease-out ${barDelay + 0.3}s`
                          }}
                        >
                          {bar.value}
                        </text>
                        {/* Label under bar - ENLARGED to 12px */}
                        <text
                          x={bar.x + 18}
                          y="180"
                          textAnchor="middle"
                          fill={active ? "#0f172a" : "#64748b"}
                          className={`text-[12px] font-black uppercase tracking-wider ${
                            active ? 'scale-105' : ''
                          }`}
                          style={{
                            transformOrigin: `${bar.x + 18}px 180px`,
                            opacity: (selectedType && selectedType !== bar.key) ? 0.6 : 1,
                            transition: 'opacity 0.3s, transform 0.3s'
                          }}
                        >
                          {bar.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* 3. Pertumbuhan Faskes (Line Chart - Connected Curve thickness fading & Absolute Top tooltips) */}
            <div className="bg-white/70 backdrop-blur-xl border border-sky-300/70 rounded-[32px] p-6 shadow-glass flex flex-col justify-between min-h-[220px] transition-all hover:shadow-md">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-lg font-black bg-gradient-to-r from-slate-900 to-sky-700 bg-clip-text text-transparent">Pertumbuhan Faskes</p>
                  <TrendingUp className="text-sky-500" size={18} />
                </div>
              </div>

              {/* Flex Container for Chart & Legend on Right Side */}
              <div className="flex flex-col md:flex-row gap-6 items-center mt-2">
                
                {/* SVG Curved Chart */}
                <div className="flex-1 w-full h-44">
                  <svg key={`line-${activeDeps}`} viewBox="0 0 380 180" className="w-full h-full overflow-visible">
                    {/* Horizontal Grid Lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                      const y = 130 - pct * 110;
                      const maxVal = Math.max(...yearlyData.map(d => Math.max(d.jumlah_rumah_sakit_umum, d.jumlah_rumah_sakit_khusus, d.jumlah_puskesmas, d.jumlah_klinik)), 5);
                      const value = Math.round(pct * maxVal);
                      return (
                        <g key={i} className="opacity-40">
                          <line x1="45" y1={y} x2="345" y2={y} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                          {/* Y-Axis Value Labels - ENLARGED to 12px */}
                          <text x="35" y={y + 4} fill="#64748b" className="text-[12px] font-black text-right" textAnchor="end">{value}</text>
                        </g>
                      );
                    })}

                    {/* Render paths first - Active Curve gets Thicker and fully opaque, inactive gets thin and transparent */}
                    {trendLines.map((line, lineIndex) => {
                      const active = isTypeActive(line.typeKey);
                      const lineDelay = lineIndex * 0.15 + 0.3;
                      return (
                        <g key={line.label}>
                          {/* Glow path */}
                          <path
                            d={line.path}
                            fill="none"
                            stroke={line.color}
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ 
                              filter: 'blur(2px)',
                              opacity: (selectedType && selectedType !== line.typeKey) ? 0.05 : 0.15,
                              strokeDasharray: '600',
                              strokeDashoffset: animReady ? '0' : '600',
                              transition: animReady ? `stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1) ${lineDelay}s, opacity 0.3s ease-out` : 'none'
                            }}
                          />
                          {/* Main wavy curve path - Animated left to right */}
                          <path
                            d={line.path}
                            fill="none"
                            stroke={line.color}
                            strokeWidth={active ? "3.5" : "1.8"}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                              opacity: (selectedType && selectedType !== line.typeKey) ? 0.4 : 1,
                              strokeDasharray: '600',
                              strokeDashoffset: animReady ? '0' : '600',
                              transition: animReady ? `stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1) ${lineDelay}s, stroke-width 0.3s ease-out, opacity 0.3s ease-out` : 'none'
                            }}
                          />
                        </g>
                      );
                    })}

                    {/* Draw interactive points on top of all paths - Synchronized active points */}
                    {trendLines.map((line, lineIndex) => {
                      const active = isTypeActive(line.typeKey);
                      return (
                        <g key={`${line.label}-points`}>
                          {line.points.map((pt, i) => {
                            const isPointHovered = hoveredPoint?.x === pt.x && hoveredPoint?.y === pt.y && hoveredPoint?.label === line.label;
                            const pointDelay = lineIndex * 0.15 + 0.3 + (i * 0.1) + 0.8;
                            return (
                              <circle
                                key={i}
                                cx={pt.x}
                                cy={pt.y}
                                r={isPointHovered ? "6.5" : (active ? "4" : "2.5")}
                                fill="#ffffff"
                                stroke={line.color}
                                strokeWidth={isPointHovered ? "3.5px" : "2.5px"}
                                className="cursor-pointer"
                                style={{
                                  opacity: animReady ? ((selectedType && selectedType !== line.typeKey) ? 0.4 : 1) : 0,
                                  transform: animReady ? 'scale(1)' : 'scale(0)',
                                  transformOrigin: `${pt.x}px ${pt.y}px`,
                                  transition: animReady ? `opacity 0.4s ease-out ${pointDelay}s, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${pointDelay}s, r 0.3s ease-out, stroke-width 0.3s ease-out` : 'none'
                                }}
                                onMouseEnter={() => {
                                  setHoveredType(line.typeKey);
                                  setHoveredPoint({ 
                                    label: line.label, 
                                    x: pt.x, 
                                    y: pt.y, 
                                    value: pt.value, 
                                    color: line.color 
                                  });
                                }}
                                onMouseLeave={() => {
                                  setHoveredType(null);
                                  setHoveredPoint(null);
                                }}
                                onClick={() => setSelectedType(selectedType === line.typeKey ? null : line.typeKey)}
                              />
                            );
                          })}
                        </g>
                      );
                    })}

                    {/* Absolute top-most layer for the stacked popup/tooltip - ENLARGED texts */}
                    {hoveredPoint && (
                      <g className="pointer-events-none transition-all duration-200">
                        {/* Shadowed Dark Rounded Rectangle */}
                        <rect
                          x={hoveredPoint.x - 55}
                          y={hoveredPoint.y - 50}
                          width="110"
                          height="38"
                          rx="10"
                          fill="#0f172a"
                          stroke={hoveredPoint.color}
                          strokeWidth="1.5"
                          className="shadow-2xl"
                        />
                        {/* Stacked Row 1: Label / Faskes Type - ENLARGED to 9px */}
                        <text
                          x={hoveredPoint.x}
                          y={hoveredPoint.y - 36}
                          textAnchor="middle"
                          fill="#94a3b8"
                          className="text-[9px] font-black uppercase tracking-wider"
                        >
                          {hoveredPoint.label}
                        </text>
                        {/* Stacked Row 2: Value / Count - ENLARGED to 12px */}
                        <text
                          x={hoveredPoint.x}
                          y={hoveredPoint.y - 22}
                          textAnchor="middle"
                          fill="#ffffff"
                          className="text-[12px] font-black"
                        >
                          {hoveredPoint.value} Fasilitas
                        </text>
                      </g>
                    )}

                    {/* X Axis Labels (Years) - ENLARGED to 13px */}
                    {yearlyData.map((d, index) => {
                      const plotWidth = 280;
                      const leftPadding = 45;
                      const x = leftPadding + (plotWidth * index) / Math.max(yearlyData.length - 1, 1);
                      return (
                        <text
                          key={d.tahun}
                          x={x}
                          y="155"
                          textAnchor="middle"
                          fill="#64748b"
                          className="text-[13px] font-black"
                        >
                          {d.tahun}
                        </text>
                      );
                    })}
                  </svg>
                </div>

                {/* Legend on Right Side - Fully interactive hover/click synchronizations */}
                <div className="flex flex-col gap-2 min-w-[130px] bg-slate-50 border border-sky-100 rounded-2xl p-3 shadow-inner self-stretch justify-center">
                  <p className="text-[9px] uppercase tracking-wider text-slate-400 font-black mb-1.5 text-center">Tipe Faskes</p>
                  {trendLines.map(line => {
                    const active = isTypeActive(line.typeKey);
                    return (
                      <div 
                        key={line.label} 
                        className={`flex items-center gap-2 text-xs cursor-pointer p-1.5 rounded-xl transition-all duration-200 ${
                          active ? 'bg-white border border-sky-200/60 scale-[1.03] shadow-sm' : (selectedType ? 'opacity-50' : 'hover:bg-slate-100')
                        }`}
                        onMouseEnter={() => setHoveredType(line.typeKey)}
                        onMouseLeave={() => setHoveredType(null)}
                        onClick={() => setSelectedType(selectedType === line.typeKey ? null : line.typeKey)}
                      >
                        <span 
                          className="w-4 h-1.5 rounded-full" 
                          style={{ backgroundColor: line.color }} 
                        />
                        <span className="font-bold text-slate-700">{line.label}</span>
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default StatisticsPage;
