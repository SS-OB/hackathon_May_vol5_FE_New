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
        handler: "~/server/api/item.js",
      },
      {
        route: "/api/spotify-token",
        handler: "~/server/api/spotify.js",
      },
    ],
    routeRules: {
      "/api/**": {
        cors: true,
      },
    },
  },
  app: {
    head: {
      title: "Music Memory App",
      meta: [
        {
          charset: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          hid: "description",
          name: "description",
          content: "Music memory application built with Nuxt 3",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
      ],
    },
  },

  hooks: {
    "pages:extend"(routes) {
      routes.push({
        name: "music",
        path: "/music/:musicid",
        file: "/pages/music/[musicid].vue",
      });
    },
  },
});
