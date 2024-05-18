import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,

  nitro: {
    handlers: [
      { route: "/api/item", handler: "~/server/api/item.js", override: true },
      {
        route: "/api/spotify-token",
        handler: "~/server/api/spotify.js",
        override: true,
      },
    ],
    routeRules: {
      "/api/**": { cors: true },
    },
  },

  modules: ["@nuxt/ui"],
});
