import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          electric: "#00d4ff"
        },
        purple: {
          deep: "#7c3aed"
        },
        ink: {
          950: "#050a0f",
          900: "#08111a",
          800: "#0c1824"
        }
      },
      borderRadius: {
        xl: "14px",
        "2xl": "16px"
      },
      boxShadow: {
        cyan: "0 0 36px rgba(0, 212, 255, 0.24)",
        purple: "0 0 44px rgba(124, 58, 237, 0.26)",
        glass: "0 24px 80px rgba(0, 0, 0, 0.35)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(circle at center, rgba(0,212,255,0.18) 0, transparent 34%), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
