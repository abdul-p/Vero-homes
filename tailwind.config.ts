import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",

        // Neutrals (very important for real estate UI)
        background: "var(--color-bg)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",
        text: {
          DEFAULT: "var(--color-text)",
          muted: "var(--color-text-muted)",
        },
      },
      textShadow: {
        custom: "0 4px 10px rgba(0, 0, 0, 0.5)",
      },

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      spacing: {
        // for consistent layout rhythm
        section: "6rem",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },

      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",
        card: "0 6px 20px rgba(0,0,0,0.06)",
      },

      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      animation: {
        shimmer: "shimmer 2.5s linear infinite",
        "fade-up": "fadeUp 0.7s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
