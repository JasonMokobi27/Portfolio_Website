import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E0B08",       // photochemical amber-black
        grain: "#171310",
        halide: "#E8E4DA",    // silver-halide off-white
        "halide-dim": "#9A968C",
        safelight: "#C2352A", // darkroom red — accent only
        densito: "#3A6E7A",   // densitometer cyan — data
        line: "rgba(232,228,218,0.14)",
      },
      fontFamily: {
        disp: ["var(--font-disp)", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        pulse: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.3" } },
      },
      animation: { pulse: "pulse 2s infinite" },
    },
  },
  plugins: [],
};
export default config;
