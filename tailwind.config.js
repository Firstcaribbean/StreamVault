/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#080810",
        "obsidian-soft": "#10101c",
        vault: "#7C3AED",
        "vault-light": "#A78BFA",
        molten: "#F59E0B",
        ember: "#EF4444",
        aurora: "#22D3EE",
      },
      fontFamily: {
        heading: ['"Bebas Neue"', "Impact", "sans-serif"],
        body: ['"DM Sans"', "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 35px rgba(124, 58, 237, 0.38)",
        "gold-glow": "0 0 28px rgba(245, 158, 11, 0.32)",
        cinema: "0 24px 80px rgba(0, 0, 0, 0.55)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -14px, 0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 22px rgba(124, 58, 237, 0.42)" },
          "50%": { boxShadow: "0 0 42px rgba(245, 158, 11, 0.38)" },
        },
        "gradient-shift": {
          "0%, 100%": { transform: "translate3d(-4%, -3%, 0) scale(1)" },
          "50%": { transform: "translate3d(4%, 3%, 0) scale(1.08)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.55s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        "gradient-shift": "gradient-shift 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
