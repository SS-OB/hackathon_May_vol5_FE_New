// server/api/spotify.js
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const tokenEndpoint = "https://accounts.spotify.com/api/token";

  try {
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }).toString(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Spotify token");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch Spotify token");
  }
});
