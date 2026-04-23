import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        plum: {
          DEFAULT: "#1a0b13",
          deep: "#0d0609",
          soft: "#24101c",
          midnight: "#120a1a",
        },
        wine: {
          DEFAULT: "#8b1e2e",
          deep: "#5a0f1d",
          glow: "#c04257",
        },
        rose: {
          DEFAULT: "#e8a5b8",
          pale: "#f4cbd4",
          deep: "#c96f88",
        },
        gold: {
          DEFAULT: "#d9b679",
          soft: "#efd9a8",
          deep: "#b8914f",
        },
        cream: "#efe2c9",
        ash: "#8c8275",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        hand: ["var(--font-caveat)", "Comic Sans MS", "cursive"],
      },
      letterSpacing: {
        eyebrow: "0.28em",
        caps: "0.4em",
      },
      boxShadow: {
        wine: "0 0 40px -10px rgba(139, 30, 46, 0.55)",
        rose: "0 0 38px -8px rgba(232, 165, 184, 0.35)",
        gold: "0 0 24px -6px rgba(217, 182, 121, 0.45)",
        card: "0 30px 60px -30px rgba(0,0,0,0.9), 0 0 0 1px rgba(232,221,199,0.08)",
        velvet:
          "0 30px 80px -30px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(217,182,121,0.18)",
        innerGlow:
          "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -20px 30px -20px rgba(192,66,87,0.25)",
      },
      backgroundImage: {
        "velvet-radial":
          "radial-gradient(ellipse at 30% 20%, rgba(232,165,184,0.10), transparent 60%), radial-gradient(ellipse at 80% 90%, rgba(217,182,121,0.10), transparent 55%), linear-gradient(180deg, #24101c 0%, #140810 100%)",
        "gold-line":
          "linear-gradient(90deg, transparent 0%, rgba(217,182,121,0.6) 50%, transparent 100%)",
        "rose-wine":
          "linear-gradient(135deg, #5a0f1d 0%, #8b1e2e 40%, #c04257 70%, #e8a5b8 100%)",
      },
      keyframes: {
        vignettePulse: {
          "0%,100%": { opacity: "0.55" },
          "50%": { opacity: "0.8" },
        },
        breathe: {
          "0%,100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.015)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
        drift: {
          "0%,100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(6px,-10px)" },
        },
        sway: {
          "0%,100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
      },
      animation: {
        vignette: "vignettePulse 8s ease-in-out infinite",
        breathe: "breathe 4s ease-in-out infinite",
        shimmer: "shimmer 2.4s ease-in-out infinite",
        drift: "drift 7s ease-in-out infinite",
        sway: "sway 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
