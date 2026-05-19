import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

type HeaderContextType = {
  selectedYear: number | 'all';
  setSelectedYear: React.Dispatch<React.SetStateAction<number | 'all'>>;
  availableYears: number[];
  setAvailableYears: React.Dispatch<React.SetStateAction<number[]>>;
};

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>(() => {
    const saved = localStorage.getItem('gis_selected_year');
    if (saved) {
      if (saved === 'all') return 'all';
      const num = parseInt(saved, 10);
      if (!isNaN(num)) return num;
    }
    return 0;
  });
  const [availableYears, setAvailableYears] = useState<number[]>([]);

  useEffect(() => {
    if (selectedYear !== 0) {
      localStorage.setItem('gis_selected_year', String(selectedYear));
    }
  }, [selectedYear]);

  const value = useMemo(
    () => ({ selectedYear, setSelectedYear, availableYears, setAvailableYears }),
    [selectedYear, availableYears]
  );

  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>;
};

export const useHeader = (): HeaderContextType => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
};
