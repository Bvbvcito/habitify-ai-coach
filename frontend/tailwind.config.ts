import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  safelist: [
    // Explicit class names
    "hover:text-amber-600",
    "hover:text-purple-600",
    "hover:text-emerald-600",
    "hover:text-slate-600",

    {
      pattern:
        /bg-(purple|emerald|amber|slate|green|yellow|pink|gray|teal|indigo)-600/,
    },
    {
      pattern:
        /text-(purple|emerald|amber|slate|green|yellow|pink|gray|teal|indigo)-600/,
    },
  ],

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
