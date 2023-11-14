import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mont: ["var(--font-mont)"],
      },
      colors: {
        border: "#e4e4e7",
        input: "#e4e4e7",
        ring: "#18181b",
        background: "#ffffff",
        foreground: "#0a0a0a",
        primary: {
          DEFAULT: "#18181b",
          foreground: "#fafafa",
        },
        secondary: {
          DEFAULT: "#f4f4f5",
          foreground: "#0a0a0a",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#fafafa",
        },
        muted: {
          DEFAULT: "#f4f4f5",
          foreground: "#71717a",
        },
        accent: {
          DEFAULT: "#f4f4f5",
          foreground: "#18181b",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#09090b;",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#09090b",
        },
      },
      borderRadius: {
        xl: `12px`,
        lg: `8px`,
        md: `6px`,
        sm: "4px",
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
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    nextui(),
    require("daisyui"),
  ],
};
export default config;
