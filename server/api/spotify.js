// server/api/spotify.js
import { defineEventHandler } from "h3";
import axios from "axios";
import qs from "qs";

export default defineEventHandler(async (event) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const tokenEndpoint = "https://accounts.spotify.com/api/token";

  try {
    const response = await axios.post(
      tokenEndpoint,
      qs.stringify({
        grant_type: "client_credentials",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Spotify token");
  }
});
