import type { Config } from "tailwindcss";
import daisyui from 'daisyui';

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#4f46e5",
          secondary: "#7c3aed",
          "base-100": "#ffffff",
          "base-content": "#171717",
        },
      },
    ],
  },
} satisfies Config;
