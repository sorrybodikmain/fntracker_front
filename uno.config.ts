import transformerCompileClass from "@unocss/transformer-compile-class";
import { defineConfig, presetWind3 } from "unocss";

export default defineConfig({
  content: {
    filesystem: ["src/**/*.{html,js,ts,jsx,tsx}"],
  },
  presets: [presetWind3()],
  transformers: [transformerCompileClass({ classPrefix: "fntracker-" })],
  theme: {
    colors: {
      void: "#08080F",
      primary: "#00E5FF",
      accent: "#FF2D95",
      surface: "rgba(255,255,255,0.1)",
      "surface-elevated": "rgba(255,255,255,0.1)",
      "glow-cyan": "rgba(0,229,255,0.4)",
      "glow-magenta": "rgba(255,45,149,0.4)",
      foreground: "#F0F0F5",
      muted: "#9898AD",
      gray: {
        400: "#9898ad",
        500: "#a1a1a1",
        600: "#1a1a24",
        700: "#12121a",
        800: "#0e0e14",
        900: "#08080F",
      },
    },
    fontFamily: {
      display: "var(--font-orbitron), ui-sans-serif, system-ui, sans-serif",
      body: "var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
    },
    boxShadow: {
      glowSm: "0 0 12px rgba(0,229,255,0.25)",
      glowMd: "0 0 24px rgba(0,229,255,0.35), 0 0 48px rgba(255,45,149,0.15)",
      card: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
      glass: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
    },
  },
});
