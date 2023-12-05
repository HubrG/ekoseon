/** @type {import('tailwindcss').Config} */
const appColor = "fuchsia";
const appColorRGBA = "fuchsia";
// tahiti   #22d3ee,
// rose     #fb7185,
// orange   #fb923c,
// fuchsia  #d946ef,
// indigo   #6366f1,
// pink     #ec4899,
// purpl    #a855f7,
// slate    #64748b,
// zinc     #71717a,
// neutral  #737373,
// stone    #78716c,
// red      #ef4444,
// amber    #f59e0b,
// yellow   #eab308,
// lime     #84cc16,
// green    #22c55e,
// emerald  #10b981
const colorPalettes = {
  tahiti: {
    50: "#e0f7fa",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
    950: "#164e63",
    DEFAULT: "#0e7490",
  },
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
    950: "#4c0519",
    DEFAULT: "#f43f5e",
  },
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    950: "#431407",
    DEFAULT: "#ea580c",
  },
  fuchsia: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
    950: "#4a044e",
    DEFAULT: "#c026d3",
  },
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b",
    DEFAULT: "#4f46e5",
  },
  pink: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
    950: "#500724",
    DEFAULT: "#db2777",
  },
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764",
    DEFAULT: "#9333ea",
  },
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
    DEFAULT: "#475569",
  },
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b",
    DEFAULT: "#52525b",
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a",
    DEFAULT: "#525252",
  },
  stone: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
    950: "#0c0a09",
    DEFAULT: "#57534e",
  },
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a",
    DEFAULT: "#dc2626",
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03",
    DEFAULT: "#d97706",
  },
  yellow: {
    50: "#FEFCE8",
    100: "#FEF9C3",
    200: "#FEF08A",
    300: "#FDE047",
    400: "#FACC15",
    500: "#EAB308",
    600: "#CA8A04",
    700: "#A16207",
    800: "#854D0E",
    900: "#713F12",
    950: "#422006",
    DEFAULT: "#CA8A04",
  },
  lime: {
    50: "#f7fee7",
    100: "#ecfccb",
    200: "#d9f99d",
    300: "#bef264",
    400: "#a3e635",
    500: "#84cc16",
    600: "#65a30d",
    700: "#4d7c0f",
    800: "#3f6212",
    900: "#365314",
    950: "#1a2e05",
    DEFAULT: "#65a30d",
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16",
    DEFAULT: "#15803d",
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22",
    DEFAULT: "#059669",
  },
};

const colorPalettesRGBA = {
  tahiti: {
    50: "rgba(224, 247, 250, 1)",
    100: "rgba(207, 250, 254, 1)",
    200: "rgba(165, 243, 252, 1)",
    300: "rgba(103, 232, 249, 1)",
    400: "rgba(34, 211, 238, 1)",
    500: "rgba(6, 182, 212, 1)",
    600: "rgba(8, 145, 178, 1)",
    700: "rgba(14, 116, 144, 1)",
    800: "rgba(21, 94, 117, 1)",
    900: "rgba(22, 78, 99, 1)",
    950: "rgba(22, 78, 99, 1)",
    DEFAULT: "rgba(14, 116, 144, 1)",
  },
  rose: {
    50: "rgba(255, 241, 242, 1)",
    100: "rgba(255, 228, 230, 1)",
    200: "rgba(254, 205, 211, 1)",
    300: "rgba(253, 164, 175, 1)",
    400: "rgba(251, 113, 133, 1)",
    500: "rgba(244, 63, 94, 1)",
    600: "rgba(225, 29, 72, 1)",
    700: "rgba(190, 18, 60, 1)",
    800: "rgba(159, 18, 57, 1)",
    900: "rgba(136, 19, 55, 1)",
    950: "rgba(76, 5, 25, 1)",
    DEFAULT: "rgba(244, 63, 94, 1)",
  },
  orange: {
    50: "rgba(255, 247, 237, 1)",
    100: "rgba(255, 237, 213, 1)",
    200: "rgba(254, 215, 170, 1)",
    300: "rgba(253, 186, 116, 1)",
    400: "rgba(251, 146, 60, 1)",
    500: "rgba(249, 115, 22, 1)",
    600: "rgba(234, 88, 12, 1)",
    700: "rgba(194, 65, 12, 1)",
    800: "rgba(154, 52, 18, 1)",
    900: "rgba(124, 45, 18, 1)",
    950: "rgba(67, 20, 7, 1)",
    DEFAULT: "rgba(234, 88, 12, 1)",
  },
  fuchsia: {
    50: "rgba(253, 244, 255, 1)",
    100: "rgba(250, 232, 255, 1)",
    200: "rgba(245, 208, 254, 1)",
    300: "rgba(240, 171, 252, 1)",
    400: "rgba(232, 121, 249, 1)",
    500: "rgba(217, 70, 239, 1)",
    600: "rgba(192, 38, 211, 1)",
    700: "rgba(162, 28, 175, 1)",
    800: "rgba(134, 25, 143, 1)",
    900: "rgba(112, 26, 117, 1)",
    950: "rgba(74, 4, 78, 1)",
    DEFAULT: "rgba(192, 38, 211, 1)",
  },
  indigo: {
    50: "rgba(238, 242, 255, 1)",
    100: "rgba(224, 231, 255, 1)",
    200: "rgba(199, 210, 254, 1)",
    300: "rgba(165, 180, 252, 1)",
    400: "rgba(129, 140, 248, 1)",
    500: "rgba(99, 102, 241, 1)",
    600: "rgba(79, 70, 229, 1)",
    700: "rgba(67, 56, 202, 1)",
    800: "rgba(55, 48, 163, 1)",
    900: "rgba(49, 46, 129, 1)",
    950: "rgba(30, 27, 75, 1)",
    DEFAULT: "rgba(79, 70, 229, 1)",
  },
  pink: {
    50: "rgba(253, 242, 248, 1)",
    100: "rgba(252, 231, 243, 1)",
    200: "rgba(251, 207, 232, 1)",
    300: "rgba(249, 168, 212, 1)",
    400: "rgba(244, 114, 182, 1)",
    500: "rgba(236, 72, 153, 1)",
    600: "rgba(219, 39, 119, 1)",
    700: "rgba(190, 24, 93, 1)",
    800: "rgba(157, 23, 77, 1)",
    900: "rgba(131, 24, 67, 1)",
    950: "rgba(80, 7, 36, 1)",
    DEFAULT: "rgba(219, 39, 119, 1)",
  },
  purple: {
    50: "rgba(250, 245, 255, 1)",
    100: "rgba(243, 232, 255, 1)",
    200: "rgba(233, 213, 255, 1)",
    300: "rgba(216, 180, 254, 1)",
    400: "rgba(192, 132, 252, 1)",
    500: "rgba(168, 85, 247, 1)",
    600: "rgba(147, 51, 234, 1)",
    700: "rgba(126, 34, 206, 1)",
    800: "rgba(107, 33, 168, 1)",
    900: "rgba(88, 28, 135, 1)",
    950: "rgba(59, 7, 100, 1)",
    DEFAULT: "rgba(147, 51, 234, 1)",
  },
  slate: {
    50: "rgba(248, 250, 252, 1)",
    100: "rgba(241, 245, 249, 1)",
    200: "rgba(226, 232, 240, 1)",
    300: "rgba(203, 213, 225, 1)",
    400: "rgba(148, 163, 184, 1)",
    500: "rgba(100, 116, 139, 1)",
    600: "rgba(71, 85, 105, 1)",
    700: "rgba(51, 65, 85, 1)",
    800: "rgba(30, 41, 59, 1)",
    900: "rgba(15, 23, 42, 1)",
    950: "rgba(2, 6, 23, 1)",
    DEFAULT: "rgba(71, 85, 105, 1)",
  },
  zinc: {
    50: "rgba(250, 250, 250, 1)",
    100: "rgba(244, 244, 245, 1)",
    200: "rgba(228, 228, 231, 1)",
    300: "rgba(212, 212, 216, 1)",
    400: "rgba(161, 161, 170, 1)",
    500: "rgba(113, 113, 122, 1)",
    600: "rgba(82, 82, 91, 1)",
    700: "rgba(63, 63, 70, 1)",
    800: "rgba(39, 39, 42, 1)",
    900: "rgba(24, 24, 27, 1)",
    950: "rgba(9, 9, 11, 1)",
    DEFAULT: "rgba(82, 82, 91, 1)",
  },
  neutral: {
    50: "rgba(250, 250, 250, 1)",
    100: "rgba(245, 245, 245, 1)",
    200: "rgba(229, 229, 229, 1)",
    300: "rgba(212, 212, 212, 1)",
    400: "rgba(163, 163, 163, 1)",
    500: "rgba(115, 115, 115, 1)",
    600: "rgba(82, 82, 82, 1)",
    700: "rgba(64, 64, 64, 1)",
    800: "rgba(38, 38, 38, 1)",
    900: "rgba(23, 23, 23, 1)",
    950: "rgba(10, 10, 10, 1)",
    DEFAULT: "rgba(82, 82, 82, 1)",
  },
  stone: {
    50: "rgba(250, 250, 249, 1)",
    100: "rgba(245, 245, 244, 1)",
    200: "rgba(231, 229, 228, 1)",
    300: "rgba(214, 211, 209, 1)",
    400: "rgba(168, 162, 158, 1)",
    500: "rgba(120, 113, 108, 1)",
    600: "rgba(87, 83, 78, 1)",
    700: "rgba(68, 64, 60, 1)",
    800: "rgba(41, 37, 36, 1)",
    900: "rgba(28, 25, 23, 1)",
    950: "rgba(12, 10, 9, 1)",
    DEFAULT: "rgba(87, 83, 78, 1)",
  },
  red: {
    50: "rgba(254, 242, 242, 1)",
    100: "rgba(254, 226, 226, 1)",
    200: "rgba(254, 202, 202, 1)",
    300: "rgba(252, 165, 165, 1)",
    400: "rgba(248, 113, 113, 1)",
    500: "rgba(239, 68, 68, 1)",
    600: "rgba(220, 38, 38, 1)",
    700: "rgba(185, 28, 28, 1)",
    800: "rgba(153, 27, 27, 1)",
    900: "rgba(127, 29, 29, 1)",
    950: "rgba(69, 10, 10, 1)",
    DEFAULT: "rgba(220, 38, 38, 1)",
  },
  amber: {
    50: "rgba(255, 251, 235, 1)",
    100: "rgba(254, 243, 199, 1)",
    200: "rgba(253, 230, 138, 1)",
    300: "rgba(252, 211, 77, 1)",
    400: "rgba(251, 191, 36, 1)",
    500: "rgba(245, 158, 11, 1)",
    600: "rgba(217, 119, 6, 1)",
    700: "rgba(180, 83, 9, 1)",
    800: "rgba(146, 64, 14, 1)",
    900: "rgba(120, 53, 15, 1)",
    950: "rgba(69, 26, 3, 1)",
    DEFAULT: "rgba(217, 119, 6, 1)",
  },
  yellow: {
    50: "rgba(254, 252, 232, 1)",
    100: "rgba(254, 249, 195, 1)",
    200: "rgba(254, 240, 138, 1)",
    300: "rgba(253, 224, 71, 1)",
    400: "rgba(250, 204, 21, 1)",
    500: "rgba(234, 179, 8, 1)",
    600: "rgba(202, 138, 4, 1)",
    700: "rgba(161, 98, 7, 1)",
    800: " rgba(133, 77, 14, 1)",
    900: "rgba(113, 63, 18, 1)",
    950: "rgba(66, 32, 6, 1)",
    DEFAULT: "rgba(202, 138, 4, 1)",
  },
  lime: {
    50: "rgba(247, 254, 231, 1)",
    100: "rgba(236, 252, 203, 1)",
    200: "rgba(217, 249, 157, 1)",
    300: "rgba(190, 242, 100, 1)",
    400: "rgba(163, 230, 53, 1)",
    500: "rgba(132, 204, 22, 1)",
    600: "rgba(101, 163, 13, 1)",
    700: "rgba(77, 124, 15, 1)",
    800: "rgba(63, 98, 18, 1)",
    900: "rgba(54, 83, 20, 1)",
    950: "rgba(26, 46, 5, 1)",
    DEFAULT: "rgba(101, 163, 13, 1)",
  },
  green: {
    50: "rgba(240, 253, 244, 1)",
    100: "rgba(220, 252, 231, 1)",
    200: "rgba(187, 247, 208, 1)",
    300: "rgba(134, 239, 172, 1)",
    400: "rgba(74, 222, 128, 1)",
    500: "rgba(34, 197, 94, 1)",
    600: "rgba(22, 163, 74, 1)",
    700: "rgba(21, 128, 61, 1)",
    800: "rgba(22, 101, 52, 1)",
    900: "rgba(20, 83, 45, 1)",
    950: "rgba(5, 46, 22, 1)",
    DEFAULT: "rgba(21, 128, 61, 1)",
  },
  emerald: {
    50: "rgba(236, 253, 245, 1)",
    100: "rgba(209, 250, 229, 1)",
    200: "rgba(167, 243, 208, 1)",
    300: "rgba(110, 231, 183, 1)",
    400: "rgba(52, 211, 153, 1)",
    500: "rgba(16, 185, 129, 1)",
    600: "rgba(5, 150, 105, 1)",
    700: "rgba(4, 120, 87, 1)",
    800: "rgba(6, 95, 70, 1)",
    900: "rgba(6, 78, 59, 1)",
    950: "rgba(2, 44, 34, 1)",
    DEFAULT: "rgba(5, 150, 105, 1)",
  },
};

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-sans)", "system-ui"],
      serif: ["var(--font-serif)", "Georgia"],
      display: ["var(--font-display)", "Comic Sans MS"],
      // emoji: ["Noto Color Emoji", "system-ui"],
    },
    extend: {
      boxShadow: {
        "t-sm": "0 -1px 2px 0 rgba(0, 0, 0, 0.05)",
        "t-md":
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "t-lg":
          "0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "t-xl":
          "0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "t-2xl": "0 -25px 50px -12px rgba(0, 0, 0, 0.25)",
        "t-3xl": "0 -35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        app: colorPalettes[appColor],
        apprgba: colorPalettesRGBA[appColorRGBA],

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: false, // applies background color and foreground color for root element by default
    styled: false, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
  plugins: [require("tailwindcss-animate"),require("daisyui")],
};
