import React, { useEffect, useState } from 'react';
import { fetchAnalysis } from '../api/gisApi';
import type { AnalysisData } from '../types';
import { useHeader } from '../context/HeaderContext';

type SortField = 'default' | 'facilities' | 'population' | 'status';
type SortDirection = 'desc' | 'asc';

const DashboardPage: React.FC = () => {
  const [analysisData, setAnalysisData] = useState<AnalysisData[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedYear, setAvailableYears } = useHeader();
  const [sortBy, setSortBy] = useState<SortField>('default');
  const [sortDir, setSortDir] = useState<SortDirection>('desc');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAnalysis();
        setAnalysisData(data);
        const years = Array.from(new Set(data.map((item) => item.tahun))).sort((a, b) => b - a);
        setAvailableYears(years);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [setAvailableYears]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-[#EEF4FF] via-[#F1F6FF] to-[#ffffff]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4" />
          <p className="text-sm text-slate-500 font-bold">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  const latestYear = analysisData.length > 0 ? Math.max(...analysisData.map(d => d.tahun)) : 0;
  const activeYear = selectedYear === 0 ? latestYear : selectedYear;

  const targetData = activeYear === 'all' 
    ? analysisData 
    : analysisData.filter(d => d.tahun === activeYear);

  const displayYearText = activeYear === 'all' ? 'Semua Tahun' : activeYear;

  const totalKecamatan = activeYear === 'all' 
    ? new Set(targetData.map(d => d.kecamatan)).size 
    : targetData.length;

  const avgRasio = targetData.length > 0 
    ? (targetData.reduce((acc, curr) => acc + curr.rasio_scaled, 0) / targetData.length).toFixed(2)
    : '0.00';

  const totalFasilitas = targetData.reduce((acc, curr) => acc + (curr.total_fasilitas ?? 0), 0);

  return (
    <div className="pt-24 p-8 h-full overflow-y-auto bg-gradient-to-br from-[#EEF4FF] via-[#F1F6FF] to-[#ffffff] text-slate-800 font-['Poppins']">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-black bg-gradient-to-r from-slate-900 to-sky-700 bg-clip-text text-transparent mb-6">
          Dashboard Statistik Kesehatan Surabaya ({displayYearText})
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-xl border border-sky-300/70 p-6 rounded-[28px] shadow-glass transition-all hover:scale-[1.02] hover:shadow-md">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-black mb-1">Total Kecamatan</p>
            <p className="text-3xl font-black text-slate-900">{totalKecamatan}</p>
          </div>
          <div className="bg-white/70 backdrop-blur-xl border border-sky-300/70 p-6 rounded-[28px] shadow-glass transition-all hover:scale-[1.02] hover:shadow-md">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-black mb-1">Rata-rata Rasio</p>
            <p className="text-3xl font-black text-sky-600">
              {avgRasio}
            </p>
          </div>
          <div className="bg-white/70 backdrop-blur-xl border border-sky-300/70 p-6 rounded-[28px] shadow-glass transition-all hover:scale-[1.02] hover:shadow-md">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-black mb-1">Total Fasilitas</p>
            <p className="text-3xl font-black text-emerald-600">
              {totalFasilitas}
            </p>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-[28px] shadow-glass border border-sky-300/70 overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-5 border-b border-sky-200/50 bg-white/40 gap-4">
            <h3 className="font-black text-lg text-slate-800">Data Per Kecamatan</h3>
            <div className="flex flex-wrap items-center gap-3">

              {/* Direction filter */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Urutan</span>
                <div className="flex rounded-xl overflow-hidden border border-sky-200 shadow-sm">
                  {(['desc', 'asc'] as SortDirection[]).map((dir) => (
                    <button
                      key={dir}
                      onClick={() => setSortDir(dir)}
                      className={`px-3 py-1.5 text-xs font-black transition-all ${
                        sortDir === dir
                          ? 'bg-sky-500 text-white'
                          : 'bg-white text-slate-500 hover:bg-sky-50 hover:text-sky-700'
                      }`}
                    >
                      {dir === 'desc' ? '↑ Tertinggi' : '↓ Terendah'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Field filter */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data</span>
                <div className="flex flex-wrap rounded-xl overflow-hidden border border-sky-200 shadow-sm">
                  {([
                    { value: 'default', label: 'Default' },
                    { value: 'facilities', label: 'Fasilitas' },
                    { value: 'population', label: 'Penduduk' },
                    { value: 'status', label: 'Status' },
                  ] as { value: SortField; label: string }[]).map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSortBy(opt.value)}
                      className={`px-3 py-1.5 text-xs font-black transition-all ${
                        sortBy === opt.value
                          ? 'bg-sky-500 text-white'
                          : 'bg-white text-slate-500 hover:bg-sky-50 hover:text-sky-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-sky-50/50 text-slate-500 text-xs uppercase tracking-wider font-black">
                  <th className="px-6 py-3">Kecamatan</th>
                  {activeYear === 'all' && <th className="px-6 py-3">Tahun</th>}
                  <th className="px-6 py-3">Fasilitas</th>
                  <th className="px-6 py-3">Penduduk</th>
                  <th className="px-6 py-3">Rasio (per 1k)</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[...targetData].sort((a, b) => {
                  let valA = 0;
                  let valB = 0;

                  if (sortBy === 'facilities') {
                    valA = a.total_fasilitas || 0;
                    valB = b.total_fasilitas || 0;
                  } else if (sortBy === 'population') {
                    valA = a.jumlah_penduduk || 0;
                    valB = b.jumlah_penduduk || 0;
                  } else if (sortBy === 'status') {
                    valA = a.rasio_scaled;
                    valB = b.rasio_scaled;
                  } else {
                    // Default sort
                    if (activeYear === 'all') {
                      if (a.kecamatan !== b.kecamatan) return a.kecamatan.localeCompare(b.kecamatan);
                      return b.tahun - a.tahun;
                    }
                    return b.rasio_scaled - a.rasio_scaled;
                  }

                  // Apply selected sort direction
                  // desc = highest to lowest (↑ Tertinggi)
                  // asc = lowest to highest (↓ Terendah)
                  return sortDir === 'desc' ? valB - valA : valA - valB;
                }).map((item) => (
                  <tr key={`${item.kecamatan}-${item.tahun}`} className="hover:bg-sky-50/50 border-b border-sky-100/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{item.kecamatan}</td>
                    {activeYear === 'all' && <td className="px-6 py-4 font-semibold text-slate-600">{item.tahun}</td>}
                    <td className="px-6 py-4 font-semibold text-slate-700">{item.total_fasilitas}</td>
                    <td className="px-6 py-4 font-semibold text-slate-700">{item.jumlah_penduduk ? item.jumlah_penduduk.toLocaleString() : '-'}</td>
                    <td className="px-6 py-4 font-black text-sky-700">{item.rasio_scaled.toFixed(3)}</td>
                    <td className="px-6 py-4">
                      <span 
                        className="inline-flex items-center px-3 py-1 rounded-xl text-[11px] font-black uppercase tracking-wider shadow-sm"
                        style={{ backgroundColor: `${item.warna}22`, color: item.warna, border: `1px solid ${item.warna}40` }}
                      >
                        {item.kategori.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
