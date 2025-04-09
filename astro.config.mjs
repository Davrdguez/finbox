// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// 👇 Agrega esto
const viteOptions = {
  server: {
    allowedHosts: ['.ngrok-free.app'],
    host: true,
  },
};

// https://astro.build/config
export default defineConfig({
  
  vite: {
    plugins: [tailwindcss()],
  },
});