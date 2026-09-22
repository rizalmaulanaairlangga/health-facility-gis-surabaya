import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type ColorBlindMode = 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia' | 'highContrast';

type AccessibilityContextType = {
  mode: ColorBlindMode;
  setMode: (m: ColorBlindMode) => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ColorBlindMode>(() => {
    const saved = localStorage.getItem('gis_a11y') as ColorBlindMode | null;
    if (saved) return saved;
    return 'normal';
  });

  const setMode = (m: ColorBlindMode) => {
    setModeState(m);
    localStorage.setItem('gis_a11y', m);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('cb-protanopia', 'cb-deuteranopia', 'cb-tritanopia', 'cb-achromatopsia', 'cb-highContrast');
    if (mode !== 'normal') {
      const map: Record<string, string> = {
        protanopia: 'cb-protanopia',
        deuteranopia: 'cb-deuteranopia',
        tritanopia: 'cb-tritanopia',
        achromatopsia: 'cb-achromatopsia',
        highContrast: 'cb-highContrast',
      };
      root.classList.add(map[mode]);
    }
    root.setAttribute('data-a11y', mode);
  }, [mode]);

  const value = useMemo(() => ({ mode, setMode }), [mode]);

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
};

export const useAccessibility = (): AccessibilityContextType => {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return ctx;
};
