import React, { useState, useEffect } from 'react';
import { useCounter } from './Counter';
import { useLanguage } from '../context/LanguageContext';

type ChartPoint = {
  tahun: number;
  value: number;
};

interface DistrictRatioChartProps {
  data: ChartPoint[];
  selectedYear: number | 'all';
}

const ChartValueLabel: React.FC<{ x: number; y: number; value: number; isSelected: boolean }> = ({ x, y, value, isSelected }) => {
  const animatedValue = useCounter(value, 1500);
  return (
    <text 
      x={x} 
      y={y - 14} 
      textAnchor="middle" 
      className={`text-[11px] font-black ${isSelected ? 'fill-sky-700 dark:fill-sky-300' : 'fill-slate-600 dark:fill-sky-300'}`}
    >
      {animatedValue.toFixed(3)}
    </text>
  );
};

const DistrictRatioChart: React.FC<DistrictRatioChartProps> = ({ data, selectedYear }) => {
  const { t } = useLanguage();
  const [animReady, setAnimReady] = useState(false);

  useEffect(() => {
    setAnimReady(false);
    const timer = setTimeout(() => setAnimReady(true), 150);
    return () => clearTimeout(timer);
  }, [data, selectedYear]);

  if (!data.length) {
    return <p className="text-sm text-slate-400 dark:text-slate-500">{t('stats.noRatioData')}</p>;
  }

  const width = 320;
  const height = 160;
  const leftPadding = 32;
  const rightPadding = 24;
  const bottomPadding = 28;
  const topPadding = 45; // Increased further to prevent overlap
  const plotWidth = width - leftPadding - rightPadding;
  const maxValue = Math.max(...data.map((item) => item.value), 0.15);
  const minValue = 0;
  
  const points = data.map((item, index) => {
    const x = leftPadding + (plotWidth * index) / Math.max(data.length - 1, 1);
    const y = topPadding + ((maxValue - item.value) / Math.max(maxValue - minValue, 0.0001)) * (height - bottomPadding - topPadding);
    return { ...item, x, y };
  });

  const linePath = points.map((point, index) => {
    return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
  }).join(' ');

  return (
    <div className="rounded-[24px] bg-sky-100/20 dark:bg-white/5 p-2 border border-transparent dark:border-white/5">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="ratioGlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Grid Lines */}
        <line x1={leftPadding} y1={topPadding} x2={width - rightPadding} y2={topPadding} stroke="#e2e8f0" strokeDasharray="4 4" />
        <line x1={leftPadding} y1={height - bottomPadding} x2={width - rightPadding} y2={height - bottomPadding} stroke="#e2e8f0" strokeWidth="1" />

        <path 
          d={linePath} 
          fill="none" 
          stroke="#0ea5e9"
          strokeWidth="3.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="dark:stroke-sky-400"
          style={{
            opacity: animReady ? 1 : 0,
            strokeDasharray: 1000,
            strokeDashoffset: animReady ? 0 : 1000,
            transition: animReady ? 'stroke-dashoffset 1.2s ease-out 0.1s, opacity 0.2s' : 'none'
          }}
        />

        {points.map((point, i) => {
          const delay = 0.6 + i * 0.15;
          return (
          <g 
            key={point.tahun} 
            style={{
              opacity: animReady ? 1 : 0,
              transform: animReady ? 'translateY(0)' : 'translateY(5px)',
              transition: animReady ? `opacity 0.5s ease-out ${delay}s, transform 0.5s ease-out ${delay}s` : 'none'
            }}
          >
            <circle
              cx={point.x}
              cy={point.y}
              r={selectedYear === point.tahun ? 7 : 4.5}
              fill={selectedYear === point.tahun ? '#0ea5e9' : '#ffffff'}
              stroke="#0ea5e9"
              strokeWidth={selectedYear === point.tahun ? 3 : 2}
            />
            <ChartValueLabel 
              x={point.x} 
              y={point.y} 
              value={point.value} 
              isSelected={selectedYear === point.tahun} 
            />
          </g>
        )})}

        {points.map((point) => (
          <text key={`label-${point.tahun}`} x={point.x} y={height - 8} textAnchor="middle" className={`text-[11px] font-bold ${selectedYear === point.tahun ? 'fill-sky-600 dark:fill-sky-300' : 'fill-slate-400 dark:fill-sky-300/70'}`}>
            {point.tahun}
          </text>
        ))}

        <text x="0" y="14" className="text-[10px] font-black uppercase tracking-wider fill-sky-600 dark:fill-sky-300">
          {t('stats.ratioPer1000')}
        </text>
      </svg>
    </div>
  );
};

export default DistrictRatioChart;
