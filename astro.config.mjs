import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://abm.auiri.com.br",
  output: "server",
  adapter: vercel(),
  integrations: [react()],
});




