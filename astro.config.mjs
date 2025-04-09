// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";


// 👇 Agrega esto
const viteOptions = {
  server: {
    allowedHosts: ['.ngrok-free.app'],
    host: true,
  },
};

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),  
  vite: {
    
    plugins: [tailwindcss()],
  },
});