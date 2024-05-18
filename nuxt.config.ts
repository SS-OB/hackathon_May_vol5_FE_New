import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,

  modules: ["@nuxt/ui"],

  runtimeConfig:{
    public:{
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    }
  },
  nitro: {
    handlers: [
      { 
        route: "/api/item", 
        handler: "~/server/api/item.js"
      },
      {
        route: "/api/spotify-token",
        handler: "~/server/api/spotify.js"
      },
    ],
    routeRules: {
      "/api/**": { cors: true },
    },
  },

  
});