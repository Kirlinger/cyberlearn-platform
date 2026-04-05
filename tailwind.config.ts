import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef5ff",
          100: "#d9e8ff",
          200: "#bcd8ff",
          300: "#8ec1ff",
          400: "#599eff",
          500: "#3b7dff",
          600: "#1b55f5",
          700: "#1443e2",
          800: "#1736b7",
          900: "#19338f",
          950: "#142157",
        },
        cyber: {
          50: "#edfff8",
          100: "#d5ffef",
          200: "#aeffdf",
          300: "#70ffc9",
          400: "#2bfdab",
          500: "#00e890",
          600: "#00c074",
          700: "#009760",
          800: "#06764e",
          900: "#076142",
          950: "#003724",
        },
        surface: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          700: "#1e293b",
          800: "#0f172a",
          850: "#0c1222",
          900: "#080e1a",
          950: "#040812",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.12)",
        glow: "0 0 20px rgba(59, 125, 255, 0.3)",
        "glow-lg": "0 0 40px rgba(59, 125, 255, 0.2)",
        "glow-cyber": "0 0 20px rgba(0, 232, 144, 0.3)",
        card: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)",
        "card-hover":
          "0 4px 24px rgba(59, 125, 255, 0.15), 0 1px 3px rgba(0,0,0,0.08)",
        elevated:
          "0 8px 40px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-mesh":
          "linear-gradient(135deg, rgba(59,125,255,0.08) 0%, rgba(0,232,144,0.05) 50%, rgba(59,125,255,0.03) 100%)",
        "hero-mesh-dark":
          "linear-gradient(135deg, rgba(59,125,255,0.15) 0%, rgba(0,232,144,0.08) 50%, rgba(59,125,255,0.05) 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-down": "fadeInDown 0.4s ease-out",
        "slide-in-left": "slideInLeft 0.4s ease-out",
        "slide-in-right": "slideInRight 0.4s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(59, 125, 255, 0.2)",
          },
          "50%": { boxShadow: "0 0 30px rgba(59, 125, 255, 0.4)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
