import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,

  modules: ["@nuxt/ui"],

  nitro: {
    handlers: [
      { route: "/api/item", handler: "~/server/api/item.js" },
      { route: "/api/spotify-token", handler: "~/server/api/spotify.js" },
    ],
    routeRules: {
      "/api/**": { cors: true },
    },
  },
});
