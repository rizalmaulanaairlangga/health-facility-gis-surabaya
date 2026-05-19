import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map as MapIcon, LayoutDashboard, ChevronDown, HelpCircle, Menu, X, BarChart3 } from 'lucide-react';
import { useHeader } from '../context/HeaderContext';
import { fetchAnalysis } from '../api/gisApi';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { selectedYear, setSelectedYear, availableYears, setAvailableYears } = useHeader();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isStatistikOpen, setIsStatistikOpen] = useState(false);
  const [kecamatanList, setKecamatanList] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const pathParts = location.pathname.split('/');
  const activeKecamatan = pathParts[1] === 'statistics' && pathParts[2] ? decodeURIComponent(pathParts[2]) : undefined;

  useEffect(() => {
    const loadKecamatanAndYears = async () => {
      try {
        const data = await fetchAnalysis();
        
        // Populate Kecamatan list
        const list = Array.from(new Set(data.map((item) => item.kecamatan))).sort();
        setKecamatanList(list);

        // Populate and initialize Available Years in Header Context
        const years = Array.from(new Set(data.map((item) => item.tahun))).sort((a, b) => b - a);
        setAvailableYears(years);
        setSelectedYear((prev: number | 'all') => (prev === 0 || !prev) && years.length ? years[0] : prev);
      } catch (error) {
        console.error('Failed to load metadata in Layout:', error);
      }
    };
    loadKecamatanAndYears();
  }, [setAvailableYears, setSelectedYear]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && 
          hamburgerRef.current && !hamburgerRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { name: 'Peta', path: '/', icon: MapIcon },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ];

  return (
    <div className="relative h-screen w-full bg-[#f8fafc] text-slate-900 overflow-hidden font-['Poppins']">
      <header className="absolute top-0 left-0 right-0 h-16 bg-white/40 border-b border-sky-200/30 flex items-center justify-between px-6 z-[1000] backdrop-blur-xl shadow-glass transition-all hover:bg-white/60">
        <div className="flex items-center gap-3">
          <button 
            ref={hamburgerRef}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="relative p-2 bg-white/50 hover:bg-white/80 rounded-xl border border-sky-200/50 shadow-sm transition-all w-9 h-9 flex items-center justify-center"
          >
            <Menu size={20} className={`absolute text-slate-600 transition-all duration-300 transform ${isSidebarOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
            <X size={20} className={`absolute text-slate-600 transition-all duration-300 transform ${isSidebarOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />
          </button>
          <div className="p-2 bg-sky-500 rounded-xl shadow-sky-200 shadow-lg ml-2">
            <MapIcon className="text-white" size={20} />
          </div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-slate-900 to-sky-700 bg-clip-text text-transparent">GIS Surabaya Health</h1>
        </div>

        <div className="flex items-center gap-6">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`group flex items-center gap-3 rounded-2xl border px-4 py-2 shadow-sm transition-all duration-300 ${
                  isDropdownOpen 
                    ? 'border-sky-400 bg-sky-50/80 ring-4 ring-sky-400/10' 
                    : 'border-sky-200/50 bg-white/40 hover:border-sky-300 hover:bg-white/60'
                }`}
              >
                <span className="text-xs font-black uppercase tracking-[0.2em] text-sky-500/70">Tahun</span>
                <span className="text-sm font-black text-slate-900">{selectedYear === 'all' ? 'Semua' : selectedYear}</span>
                <ChevronDown className={`h-4 w-4 text-sky-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-sky-600' : 'group-hover:text-sky-600'}`} strokeWidth={2.5} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-[calc(100%+8px)] right-0 min-w-[120px] bg-white/90 backdrop-blur-xl rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-sky-100 py-2 z-[1001] animate-in fade-in zoom-in-95 duration-200">
                  <div className="max-h-[280px] overflow-y-auto custom-scrollbar px-1.5 space-y-1">
                    {location.pathname === '/dashboard' && (
                      <button
                        onClick={() => {
                          setSelectedYear('all');
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-[14px] text-[13px] font-black transition-all ${
                          selectedYear === 'all' 
                            ? 'bg-sky-500 text-white shadow-lg shadow-sky-100' 
                            : 'text-slate-600 hover:bg-sky-50 hover:text-sky-700'
                        }`}
                      >
                        Semua
                      </button>
                    )}
                    {availableYears.map((year) => (
                      <button
                        key={year}
                        onClick={() => {
                          setSelectedYear(year);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-[14px] text-[13px] font-black transition-all ${
                          selectedYear === year 
                            ? 'bg-sky-500 text-white shadow-lg shadow-sky-100' 
                            : 'text-slate-600 hover:bg-sky-50 hover:text-sky-700'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          <nav className="flex items-center gap-2 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-black transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
                  location.pathname === item.path
                    ? 'bg-white text-sky-600 shadow-md border border-sky-100'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-white/70'
                }`}
              >
                <item.icon size={18} strokeWidth={2.5} />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="h-full w-full relative">
        {/* Sidebar */}
        <div ref={sidebarRef} className={`absolute top-16 left-0 h-[calc(100vh-64px)] bg-white/95 backdrop-blur-xl border-r border-sky-200/30 z-[900] transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-72 shadow-2xl`}>
          <div className="p-6 h-full flex flex-col justify-between overflow-y-auto custom-scrollbar">
            <div>
              <h2 className="text-xs font-black text-sky-500 uppercase tracking-widest mb-6">Pilihan Analisis</h2>
              <div className="space-y-3">
                
                {/* Collapsible Statistik Faskes Dropdown */}
                <div>
                  <button 
                    onClick={() => setIsStatistikOpen(!isStatistikOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-black transition-all ${
                      location.pathname.startsWith('/statistics')
                        ? 'bg-sky-500 text-white shadow-lg shadow-sky-100'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent hover:border-slate-200'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <BarChart3 size={18} strokeWidth={2.5} />
                      Statistik Faskes
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isStatistikOpen ? 'rotate-180' : ''}`} strokeWidth={2.5} />
                  </button>
                  
                  {isStatistikOpen && (
                    <div className="mt-3 ml-4 pl-3 border-l-2 border-sky-200/50 space-y-1.5 max-h-60 overflow-y-auto custom-scrollbar relative">
                      <Link
                        to="/statistics"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
                          location.pathname === '/statistics'
                            ? 'text-sky-700 bg-sky-100 shadow-sm border border-sky-200/50'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <MapIcon size={14} />
                        Kota Surabaya
                      </Link>
                      
                      <div className="relative py-2 flex items-center justify-center">
                        <div className="w-full border-t border-sky-200/50"></div>
                        <span className="absolute bg-white px-2 text-[9px] font-black uppercase text-sky-400 tracking-widest">Kecamatan</span>
                      </div>

                      {kecamatanList.map((kec) => (
                        <Link
                          key={kec}
                          to={`/statistics/${encodeURIComponent(kec)}`}
                          onClick={() => setIsSidebarOpen(false)}
                          className={`block px-4 py-2 rounded-xl text-xs font-black transition-all truncate ${
                            activeKecamatan === kec
                              ? 'text-sky-600 bg-sky-50 font-black'
                              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                          }`}
                        >
                          {kec}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>



              </div>
            </div>
          </div>
        </div>

        {children}
      </main>

      {/* About this web button - Bottom Left */}
      <div className="absolute bottom-6 left-6 z-[1000] group">
        <div className="absolute bottom-full left-0 mb-3 invisible group-hover:visible animate-in fade-in slide-in-from-bottom-2 duration-300 pointer-events-none">
          <div className="bg-slate-900 text-white text-[10px] font-black px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
            about this website?
          </div>
          <div className="w-2 h-2 bg-slate-900 rotate-45 ml-4 -mt-1 shadow-xl"></div>
        </div>
        <button
          onClick={() => window.alert('Analisis Rasio Fasilitas Kesehatan Surabaya\nData diproses dari Supabase / data lokal.')}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-sky-200 shadow-lg shadow-sky-100 text-sky-500 transition-all duration-300 hover:bg-sky-500 hover:text-white hover:border-sky-400 hover:scale-110 active:scale-95"
        >
          <HelpCircle size={24} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default Layout;
