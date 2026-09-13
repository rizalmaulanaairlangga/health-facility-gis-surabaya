```ts
// tailwind.config.ts

import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],

  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        /*
        |--------------------------------------------------------------------------
        | PRIMARY
        |--------------------------------------------------------------------------
        */

        primary: {
          50: "#EEF4FF",
          100: "#D9E7FF",
          200: "#B7D0FF",
          300: "#84AEFF",
          400: "#4D86FF",
          500: "#155DFC",
          600: "#0047E6",
          700: "#0038B4",
          800: "#002B87",
          900: "#001D59",
        },

        /*
        |--------------------------------------------------------------------------
        | SUCCESS
        |--------------------------------------------------------------------------
        */

        success: {
          50: "#ECFDF3",
          100: "#DDFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
        },

        /*
        |--------------------------------------------------------------------------
        | INFO
        |--------------------------------------------------------------------------
        */

        info: {
          50: "#ECFEFF",
          100: "#DDF7FF",
          200: "#BAEFFF",
          300: "#7DE3FC",
          400: "#22D3EE",
          500: "#06B6D4",
          600: "#0891B2",
          700: "#0E7490",
          800: "#155E75",
          900: "#164E63",
        },

        /*
        |--------------------------------------------------------------------------
        | WARNING
        |--------------------------------------------------------------------------
        */

        warning: {
          50: "#FFFBEB",
          100: "#FFF4D6",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },

        /*
        |--------------------------------------------------------------------------
        | DANGER
        |--------------------------------------------------------------------------
        */

        danger: {
          50: "#FEF2F2",
          100: "#FFE1E1",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
        },

        /*
        |--------------------------------------------------------------------------
        | DARK GLASS UI
        |--------------------------------------------------------------------------
        */

        darkbg: {
          50: "#1E293B",
          100: "#172033",
          200: "#131C2E",
          300: "#0F172A",
          400: "#0D1424",
          500: "#0B1120",
          600: "#090F1D",
          700: "#080C17",
          800: "#050A12",
          900: "#03060B",
        },

        /*
        |--------------------------------------------------------------------------
        | LIGHT GLASS UI
        |--------------------------------------------------------------------------
        */

        lightbg: {
          50: "#FFFFFF",
          100: "#F8FBFF",
          200: "#F1F6FF",
          300: "#EAF1FF",
          400: "#DFE9FF",
          500: "#D3E1FF",
          600: "#C5D6FF",
          700: "#B2C5F8",
          800: "#99AEEA",
          900: "#7E92C8",
        },

        /*
        |--------------------------------------------------------------------------
        | TEXT
        |--------------------------------------------------------------------------
        */

        text: {
          primary: "#F8FAFC",
          secondary: "#CBD5E1",
          muted: "#94A3B8",

          dark: "#0F172A",
          darkSecondary: "#334155",
          darkMuted: "#64748B",
        },

        /*
        |--------------------------------------------------------------------------
        | GLASS
        |--------------------------------------------------------------------------
        */

        glass: {
          white: "rgba(255,255,255,0.08)",
          light: "rgba(255,255,255,0.12)",
          heavy: "rgba(255,255,255,0.18)",

          dark: "rgba(15,23,42,0.72)",
          darkSoft: "rgba(15,23,42,0.55)",

          border: "rgba(255,255,255,0.12)",
          borderStrong: "rgba(255,255,255,0.20)",

          shadowBlue: "rgba(21,93,252,0.25)",
        },
      },

      /*
      |--------------------------------------------------------------------------
      | BLUR
      |--------------------------------------------------------------------------
      */

      backdropBlur: {
        xs: "2px",
        glass: "20px",
        heavy: "40px",
      },

      /*
      |--------------------------------------------------------------------------
      | SHADOW
      |--------------------------------------------------------------------------
      */

      boxShadow: {
        glass: `
          0 8px 32px rgba(31, 38, 135, 0.15)
        `,

        "glass-sm": `
          0 4px 20px rgba(31, 38, 135, 0.10)
        `,

        "glass-lg": `
          0 12px 40px rgba(31, 38, 135, 0.22)
        `,

        glow: `
          0 0 20px rgba(21,93,252,0.35)
        `,

        "glow-lg": `
          0 0 40px rgba(21,93,252,0.45)
        `,
      },

      /*
      |--------------------------------------------------------------------------
      | BORDER RADIUS
      |--------------------------------------------------------------------------
      */

      borderRadius: {
        glass: "24px",
        "glass-lg": "32px",
      },

      /*
      |--------------------------------------------------------------------------
      | BACKGROUND IMAGE
      |--------------------------------------------------------------------------
      */

      backgroundImage: {
        "glass-dark-gradient": `
          linear-gradient(
            135deg,
            #0B1120 0%,
            #155DFC 45%,
            #09122B 100%
          )
        `,

        "glass-light-gradient": `
          linear-gradient(
            135deg,
            #F8FBFF 0%,
            #D9E7FF 45%,
            #EEF4FF 100%
          )
        `,
      },

      /*
      |--------------------------------------------------------------------------
      | ANIMATION
      |--------------------------------------------------------------------------
      */

      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-8px)",
          },
        },

        glow: {
          "0%, 100%": {
            opacity: "0.7",
          },
          "50%": {
            opacity: "1",
          },
        },
      },

      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 4s ease-in-out infinite",
      },
    },
  },

  plugins: [],
} satisfies Config;
```

# Cara Desain Glassmorphism yang Maksimal

---

# 1. Struktur Layering

Glassmorphism bukan sekadar blur.

Struktur ideal:

```txt
Background Gradient
    ↓
Glow Layer
    ↓
Glass Card
    ↓
Border Highlight
    ↓
Content
```

---

# 2. Background Wajib Kompleks

JANGAN pakai background flat.

Bagus:

```tsx
<div className="min-h-screen bg-glass-dark-gradient" />
```

Lebih bagus:

* gradient
* radial glow
* noise texture
* blob blur

---

# 3. Opacity Ideal

## Dark Glass

```txt
bg-white/5
bg-white/10
bg-white/12
```

Jangan lebih dari:

* `/20`

Karena:

* jadi susu/frost terlalu tebal
* hilang efek kaca

---

## Light Glass

Ideal:

```txt
bg-white/40
bg-white/50
bg-white/60
```

---

# 4. Blur Terbaik

Ideal:

```txt
backdrop-blur-xl
backdrop-blur-2xl
```

atau custom:

```txt
backdrop-blur-glass
```

---

# 5. Border Sangat Penting

Tanpa border:

* card terlihat seperti kabut

Gunakan:

```tsx
border border-white/10
```

atau

```tsx
border border-white/20
```

---

# 6. Shadow Ideal

Glass UI tidak cocok shadow hitam pekat.

Bagus:

```tsx
shadow-glass
shadow-glow
```

Buruk:

```tsx
shadow-2xl
```

---

# 7. Warna Accent

Gunakan primary hanya untuk:

* button utama
* active state
* glow
* icon penting
* focus ring

JANGAN:

* semua card biru
* semua section biru

---

# 8. Typography

Glassmorphism sangat bergantung pada typography.

Ideal:

```txt
font-medium
font-semibold
tracking-tight
```

Hindari:

* font terlalu tipis
* font terlalu bold

---

# 9. Padding dan Spacing

Glass UI perlu ruang napas besar.

Ideal:

```txt
p-6
p-8
gap-6
gap-8
```

Jangan terlalu rapat.

---

# 10. Rounded Corner

Gunakan rounded besar.

Ideal:

```txt
rounded-2xl
rounded-3xl
rounded-glass
```

Glass UI dengan sudut kecil terlihat kuno.

---

# 11. Hover Animation

Glass UI hidup karena motion.

Ideal:

```tsx
hover:scale-[1.02]
hover:bg-white/15
transition-all duration-300
```

---

# 12. Komposisi Ideal

## Dashboard

* Background gradient gelap
* Sidebar glass
* Floating card
* Soft blue glow

---

## Login Page

* Centered glass card
* Large blur background blob
* Glow biru lembut
* Sedikit floating animation

---

## Modal

* background overlay:

```txt
bg-black/40
backdrop-blur-sm
```

* modal:

```txt
bg-white/10
backdrop-blur-xl
```

---

# 13. Class Reusable yang Sangat Direkomendasikan

## Glass Card

```tsx
className="
bg-white/10
backdrop-blur-glass
border border-white/10
shadow-glass
rounded-3xl
"
```

---

## Primary Button

```tsx
className="
bg-primary-500
hover:bg-primary-400
text-white
shadow-glow
transition-all
duration-300
"
```

---

## Dark Input

```tsx
className="
bg-white/5
border border-white/10
backdrop-blur-xl
focus:border-primary-400
focus:ring-2
focus:ring-primary-500/30
"
```

---

# 14. Kesalahan Umum

## Salah

* terlalu banyak blur
* opacity terlalu tinggi
* terlalu banyak warna
* semua elemen glow
* shadow hitam keras
* spacing rapat

---

## Benar

* warna sedikit
* glow seperlunya
* whitespace besar
* blur medium
* border soft
* motion subtle

---

# 15. Formula Visual Modern 2026

Tema glass modern biasanya:

```txt
70% dark neutral
20% transparency
10% accent color
```

Bukan:

```txt
50% accent color
```

Karena akan terlihat murahan dan melelahkan di mata.
