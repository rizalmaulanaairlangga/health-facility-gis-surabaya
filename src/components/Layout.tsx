import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map as MapIcon, LayoutDashboard, ChevronDown, HelpCircle, Menu, X, BarChart3, Sun, Moon, Monitor, Languages, Eye, Settings2 } from 'lucide-react';
import { useHeader } from '../context/HeaderContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAccessibility, type ColorBlindMode } from '../context/AccessibilityContext';
import { fetchAnalysis } from '../api/gisApi';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { selectedYear, setSelectedYear, availableYears, setAvailableYears } = useHeader();
  const { lang, setLang, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { mode, setMode } = useAccessibility();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isA11yOpen, setIsA11yOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isStatistikOpen, setIsStatistikOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [kecamatanList, setKecamatanList] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const a11yRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const pathParts = location.pathname.split('/');
  const activeKecamatan = pathParts[1] === 'statistics' && pathParts[2] ? decodeURIComponent(pathParts[2]) : undefined;

  useEffect(() => {
    const loadKecamatanAndYears = async () => {
      try {
        const data = await fetchAnalysis();
        const list = Array.from(new Set(data.map((item) => item.kecamatan))).sort();
        setKecamatanList(list);
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
      if (a11yRef.current && !a11yRef.current.contains(event.target as Node)) {
        setIsA11yOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
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
    { key: 'nav.map', path: '/', icon: MapIcon },
    { key: 'nav.dashboard', path: '/dashboard', icon: LayoutDashboard },
  ];

  const a11yOptions: { value: ColorBlindMode; labelKey: string }[] = [
    { value: 'normal', labelKey: 'a11y.normal' },
    { value: 'protanopia', labelKey: 'a11y.protanopia' },
    { value: 'deuteranopia', labelKey: 'a11y.deuteranopia' },
    { value: 'tritanopia', labelKey: 'a11y.tritanopia' },
    { value: 'achromatopsia', labelKey: 'a11y.achromatopsia' },
    { value: 'highContrast', labelKey: 'a11y.highContrast' },
  ];

  return (
    <div className="relative h-screen w-full bg-[#f8fafc] dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 overflow-hidden font-['Poppins'] transition-colors duration-300">
      <header className="absolute top-0 left-0 right-0 h-16 bg-white/40 dark:bg-slate-900/40 border-b border-sky-200/30 dark:border-white/10 flex items-center justify-between px-3 sm:px-4 lg:px-6 z-[1000] backdrop-blur-xl shadow-glass transition-all hover:bg-white/60 dark:hover:bg-slate-900/60 gap-2">
        <div className="flex items-center gap-2 lg:gap-3 flex-1 min-w-0">
          <button 
            ref={hamburgerRef}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="relative p-2 bg-white/50 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 rounded-xl border border-sky-200/50 dark:border-white/10 shadow-sm transition-all w-9 h-9 flex items-center justify-center shrink-0"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} className={`absolute text-slate-600 dark:text-slate-300 transition-all duration-300 transform ${isSidebarOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
            <X size={20} className={`absolute text-slate-600 dark:text-slate-300 transition-all duration-300 transform ${isSidebarOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />
          </button>
          <div className="p-2 bg-sky-500 rounded-xl shadow-sky-200 shadow-lg ml-1 lg:ml-2 hidden sm:flex shrink-0">
            <MapIcon className="text-white" size={20} />
          </div>
          {/* Judul website TIDAK diterjemahkan — 2 baris di layar kecil */}
          <h1 className="text-[12px] xs:text-sm lg:text-lg font-bold bg-gradient-to-r from-slate-900 to-sky-700 dark:from-white dark:to-sky-300 bg-clip-text text-transparent leading-tight whitespace-normal break-words line-clamp-2 max-w-[110px] xs:max-w-[150px] sm:max-w-none">GIS Surabaya Health</h1>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
            {/* Year */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`group flex items-center gap-2 lg:gap-3 rounded-2xl border px-3 lg:px-4 py-2 shadow-sm transition-all duration-300 ${
                  isDropdownOpen 
                    ? 'border-sky-400 bg-sky-50/80 dark:bg-sky-900/30 ring-4 ring-sky-400/10' 
                    : 'border-sky-200/50 dark:border-white/10 bg-white/40 dark:bg-white/5 hover:border-sky-300 dark:hover:bg-white/10'
                }`}
              >
                <span className="hidden sm:inline text-xs font-black uppercase tracking-[0.2em] text-sky-500/70 dark:text-sky-300/70">{t('header.year')}</span>
                <span className="text-sm font-black text-slate-900 dark:text-white">{selectedYear === 'all' ? t('header.all') : selectedYear}</span>
                <ChevronDown className={`h-4 w-4 text-sky-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-sky-600' : 'group-hover:text-sky-600'}`} strokeWidth={2.5} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-[calc(100%+8px)] right-0 min-w-[120px] bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-sky-100 dark:border-white/10 py-2 z-[1001]">
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
                            : 'text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-white/10 hover:text-sky-700'
                        }`}
                      >
                        {t('header.all')}
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
                            : 'text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-white/10 hover:text-sky-700'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          <nav className="hidden md:flex items-center gap-2 bg-slate-100/50 dark:bg-white/5 p-1.5 rounded-2xl border border-slate-200/50 dark:border-white/10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 lg:px-5 py-2 rounded-xl text-sm font-black transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-white dark:bg-sky-500 text-sky-600 dark:text-white shadow-md border border-sky-100 dark:border-sky-400'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-white/10'
                }`}
              >
                <item.icon size={18} strokeWidth={2.5} />
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Settings / Controls - Language, Theme, A11y combined */}
          <div className="relative" ref={settingsRef}>
            {/* Desktop inline controls */}
            <div className="hidden xl:flex items-center gap-2 bg-white/40 dark:bg-white/5 backdrop-blur-xl p-1.5 rounded-2xl border border-sky-200/40 dark:border-white/10 shadow-sm">
              {/* Language */}
              <div className="flex items-center gap-1 bg-slate-100/60 dark:bg-black/20 rounded-xl p-1 border border-slate-200/30 dark:border-white/5">
                <Languages size={14} className="text-slate-400 ml-1.5" />
                {(['id','en'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${lang===l ? 'bg-sky-500 text-white shadow' : 'text-slate-500 dark:text-slate-400 hover:text-sky-600'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              {/* Theme */}
              <div className="flex items-center bg-slate-100/60 dark:bg-black/20 rounded-xl p-1 border border-slate-200/30 dark:border-white/5">
                {[
                  { v: 'light' as const, icon: Sun, label: t('theme.light') },
                  { v: 'dark' as const, icon: Moon, label: t('theme.dark') },
                  { v: 'system' as const, icon: Monitor, label: t('theme.system') },
                ].map(({v,icon:Icon}) => (
                  <button
                    key={v}
                    onClick={() => setTheme(v)}
                    title={v}
                    className={`p-1.5 rounded-lg transition-all ${theme===v ? 'bg-white dark:bg-white/15 text-sky-600 dark:text-sky-300 shadow border border-sky-100 dark:border-white/10' : 'text-slate-400 hover:text-slate-700 dark:hover:text-white'}`}
                  >
                    <Icon size={15} strokeWidth={2.5} />
                  </button>
                ))}
              </div>
              {/* A11y - custom dropdown styled like Tahun */}
              <div className="relative" ref={a11yRef}>
                <button
                  onClick={() => setIsA11yOpen(!isA11yOpen)}
                  className={`group flex items-center gap-2 rounded-xl border px-3 py-1.5 shadow-sm transition-all duration-300 ${
                    isA11yOpen
                      ? 'border-sky-400 bg-sky-50/80 dark:bg-sky-900/30 ring-4 ring-sky-400/10'
                      : 'border-sky-200/50 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:border-sky-300 dark:hover:bg-white/10'
                  }`}
                >
                  <Eye size={14} className="text-sky-500/70 dark:text-sky-300/70" />
                  <span className="text-[11px] font-black text-slate-900 dark:text-white max-w-[90px] truncate">{t(a11yOptions.find(o=>o.value===mode)?.labelKey || 'a11y.normal')}</span>
                  <ChevronDown className={`h-3.5 w-3.5 text-sky-400 transition-transform duration-300 ${isA11yOpen ? 'rotate-180 text-sky-600' : 'group-hover:text-sky-600'}`} strokeWidth={2.5} />
                </button>
                {isA11yOpen && (
                  <div className="absolute top-[calc(100%+8px)] right-0 min-w-[200px] bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-sky-100 dark:border-white/10 py-2 z-[1001]">
                    <div className="max-h-[320px] overflow-y-auto custom-scrollbar px-1.5 space-y-1">
                      {a11yOptions.map((o) => (
                        <button
                          key={o.value}
                          onClick={() => { setMode(o.value); setIsA11yOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 rounded-[14px] text-[13px] font-black transition-all ${
                            mode === o.value
                              ? 'bg-sky-500 text-white shadow-lg shadow-sky-100'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-white/10 hover:text-sky-700'
                          }`}
                        >
                          {t(o.labelKey)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile/Tablet: single settings button */}
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="xl:hidden flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/60 dark:bg-white/10 border border-sky-200/50 dark:border-white/10 shadow-sm backdrop-blur-xl text-slate-700 dark:text-slate-200"
            >
              <Settings2 size={16} />
              <span className="hidden sm:inline text-xs font-black">{t('header.language')}/{t('header.theme')}</span>
              <ChevronDown size={14} className={`transition-transform ${isSettingsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isSettingsOpen && (
              <div className="xl:hidden absolute top-[calc(100%+8px)] right-0 w-72 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-[24px] shadow-2xl border border-sky-100 dark:border-white/10 p-4 z-[1001] space-y-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-500 dark:text-sky-300 mb-2 flex items-center gap-1.5"><Languages size={12}/> {t('header.language')}</p>
                  <div className="flex gap-2">
                    {(['id','en'] as const).map(l => (
                      <button key={l} onClick={() => setLang(l)} className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${lang===l ? 'bg-sky-500 text-white border-sky-400 shadow' : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10'}`}>{l === 'id' ? 'Indonesia' : 'English'}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-500 dark:text-sky-300 mb-2 flex items-center gap-1.5"><Sun size={12}/> {t('header.theme')}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { v:'light' as const, icon: Sun, label: t('theme.light') },
                      { v:'dark' as const, icon: Moon, label: t('theme.dark') },
                      { v:'system' as const, icon: Monitor, label: t('theme.system') },
                    ].map(({v,icon:Icon,label}) => (
                      <button key={v} onClick={() => setTheme(v)} className={`flex flex-col items-center gap-1 py-2.5 rounded-xl border text-[11px] font-black transition-all ${theme===v ? 'bg-sky-500 text-white border-sky-400' : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10'}`}>
                        <Icon size={16} />{label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">{theme==='system' ? 'Mengikuti device' : ''}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-500 dark:text-sky-300 mb-2 flex items-center gap-1.5"><Eye size={12}/> {t('a11y.filterTitle')}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">{t('a11y.filterDesc')}</p>
                  <div className="grid grid-cols-1 gap-1.5">
                    {a11yOptions.map(o => (
                      <button key={o.value} onClick={() => setMode(o.value)} className={`text-left px-3 py-2 rounded-xl text-xs font-bold border transition-all ${mode===o.value ? 'bg-sky-500 text-white border-sky-400' : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-sky-200'}`}>{t(o.labelKey)}</button>
                    ))}
                  </div>
                </div>
                {/* Mobile nav */}
                <div className="md:hidden pt-3 border-t border-slate-200 dark:border-white/10 flex gap-2">
                  {navItems.map(item => (
                    <Link key={item.path} to={item.path} onClick={()=>setIsSettingsOpen(false)} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black border ${location.pathname===item.path ? 'bg-sky-500 text-white border-sky-400' : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10'}`}><item.icon size={14}/>{t(item.key)}</Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="h-full w-full relative">
        {/* Sidebar */}
        <div ref={sidebarRef} className={`absolute top-16 left-0 h-[calc(100vh-64px)] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-sky-200/30 dark:border-white/10 z-[900] transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-72 shadow-2xl`}>
          <div className="p-6 h-full flex flex-col justify-between overflow-y-auto custom-scrollbar">
            <div>
              <h2 className="text-xs font-black text-sky-500 dark:text-sky-300 uppercase tracking-widest mb-6">{t('sidebar.analysis')}</h2>
              <div className="space-y-3">
                
                <div>
                  <button 
                    onClick={() => setIsStatistikOpen(!isStatistikOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-black transition-all ${
                      location.pathname.startsWith('/statistics')
                        ? 'bg-sky-500 text-white shadow-lg shadow-sky-100'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-slate-200 dark:hover:border-white/10'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <BarChart3 size={18} strokeWidth={2.5} />
                      {t('nav.statistics')}
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isStatistikOpen ? 'rotate-180' : ''}`} strokeWidth={2.5} />
                  </button>
                  
                  {isStatistikOpen && (
                    <div className="mt-3 ml-4 pl-3 border-l-2 border-sky-200/50 dark:border-white/10 space-y-1.5 max-h-60 overflow-y-auto custom-scrollbar relative">
                      <Link
                        to="/statistics"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
                          location.pathname === '/statistics'
                            ? 'text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-900/30 shadow-sm border border-sky-200/50 dark:border-white/10'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                        }`}
                      >
                        <MapIcon size={14} />
                        {t('sidebar.city')}
                      </Link>
                      
                      <div className="relative py-2 flex items-center justify-center">
                        <div className="w-full border-t border-sky-200/50 dark:border-white/10"></div>
                        <span className="absolute bg-white dark:bg-slate-900 px-2 text-[9px] font-black uppercase text-sky-400 tracking-widest">{t('sidebar.district')}</span>
                      </div>

                      {kecamatanList.map((kec) => (
                        <Link
                          key={kec}
                          to={`/statistics/${encodeURIComponent(kec)}`}
                          onClick={() => setIsSidebarOpen(false)}
                          className={`block px-4 py-2 rounded-xl text-xs font-black transition-all truncate ${
                            activeKecamatan === kec
                              ? 'text-sky-600 dark:text-sky-300 bg-sky-50 dark:bg-white/10 font-black'
                              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'
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
        <div className="absolute bottom-full left-0 mb-3 invisible group-hover:visible pointer-events-none">
          <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
            {t('map.aboutTooltip')}
          </div>
          <div className="w-2 h-2 bg-slate-900 dark:bg-white rotate-45 ml-4 -mt-1 shadow-xl"></div>
        </div>
        <button
          onClick={() => window.alert(t('map.aboutAlert'))}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-slate-800 border border-sky-200 dark:border-white/10 shadow-lg shadow-sky-100 dark:shadow-black/20 text-sky-500 dark:text-sky-300 transition-all duration-300 hover:bg-sky-500 hover:text-white hover:border-sky-400 hover:scale-110 active:scale-95"
          aria-label="About"
        >
          <HelpCircle size={24} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default Layout;
