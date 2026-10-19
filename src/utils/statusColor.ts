import type { CSSProperties } from 'react';

const INK = '#0f172a';
const GLOW = '#ffffff';

const toRgb = (hex: string): [number, number, number] => {
  const h = hex.replace('#', '');
  const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(v, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const toHex = (rgb: [number, number, number]): string =>
  '#' + rgb.map((c) => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, '0')).join('');

const mix = (a: string, b: string, t: number): string => {
  const ra = toRgb(a);
  const rb = toRgb(b);
  return toHex([
    ra[0] + (rb[0] - ra[0]) * t,
    ra[1] + (rb[1] - ra[1]) * t,
    ra[2] + (rb[2] - ra[2]) * t,
  ]);
};

export const relativeLuminance = (hex: string): number => {
  const [r, g, b] = toRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** Status text over a light surface: darken until WCAG AA-safe. */
export const statusTextOnLight = (hex: string): string => {
  let c = hex;
  // 0.135 keeps AA even over a 22%-tint of the same status color
  for (let i = 0; i < 14 && relativeLuminance(c) > 0.135; i++) c = mix(c, INK, 0.2);
  return c;
};

/** Status text over a dark surface: lighten until WCAG AA-safe. */
export const statusTextOnDark = (hex: string): string => {
  let c = hex;
  for (let i = 0; i < 12 && relativeLuminance(c) < 0.5; i++) c = mix(c, GLOW, 0.2);
  return c;
};

/**
 * Foreground (and fill, adjusted only when neither ink nor white can reach
 * AA on the raw status color) for text or icons sitting on a solid
 * status-colored chip.
 */
export const statusChipColors = (hex: string): { background: string; color: string } => {
  const lum = relativeLuminance(hex);
  if (lum >= 0.231) return { background: hex, color: INK };
  if (lum <= 0.16) return { background: hex, color: GLOW };
  let bg = hex;
  for (let i = 0; i < 8 && relativeLuminance(bg) > 0.16; i++) bg = mix(bg, INK, 0.2);
  return { background: bg, color: GLOW };
};

/** Theme-adaptive status text via the .status-text class in index.css. */
export const statusTextVars = (hex: string): CSSProperties =>
  ({
    '--status-on-light': statusTextOnLight(hex),
    '--status-on-dark': statusTextOnDark(hex),
  }) as CSSProperties;
