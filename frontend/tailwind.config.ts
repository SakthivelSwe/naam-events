import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#e6007e", // Vibrant Pink
          secondary: "#00b0ff", // Light Blue
          accent: "#ffcc00", // Yellow/Gold
          dark: "#111827",
          background: "#FFFFFF",
          text: "#1f2937",
          muted: "#fdf2f8", // Light pink background
          border: "#fbcfe8"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"]
      },
      boxShadow: {
        card: "0 20px 48px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.04)",
        glow: "0 0 40px rgba(230, 0, 126, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;

