<template>
  <div>
    <h1>Callback Page</h1>
    <p v-if="!accessToken">Fetching access token...</p>
    <!-- <p v-else>Access Token: {{ accessToken }}</p> -->
    <p v-else>認証に成功しました。自動的に保存画面に戻ります。</p>
    <p v-if="error">Error: {{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "Callback",
  data() {
    return {
      accessToken: "",
      error: "",
    };
  },
  async mounted() {
    try {
      const route = useRoute();
      const code = route.query.code as string;

      // Your Spotify client ID and client secret
      const runtimeConfig = useRuntimeConfig();
      const clientId = runtimeConfig.public.clientId;
      const clientSecret = runtimeConfig.public.clientSecret;

      // Spotify API endpoint to request access token
      const tokenEndpoint = "https://accounts.spotify.com/api/token";

      // Request body for token exchange
      const data = new URLSearchParams();
      data.append("grant_type", "authorization_code");
      data.append("code", code);
      data.append("redirect_uri", `${window.location.origin}/callback`);

      // Base64 encode client ID and client secret
      const basicAuth = btoa(`${clientId}:${clientSecret}`);

      // Fetch request to Spotify token endpoint
      const response = await fetch(tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${basicAuth}`,
        },
        body: data,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      this.accessToken = responseData.access_token;

      // Now you have the access token, you can save it or use as needed
      console.log("Access Token:", this.accessToken);

      // Redirect to save.vue with access token after 2 seconds
      setTimeout(() => {
        this.$router.push({
          path: "/save",
          query: { accessToken: this.accessToken },
        });
      }, 2000);

    } catch (error) {
      console.error("Error fetching access token:", error);
      this.error = (error as any).message || "Failed to get access token";
    }
  },
});
</script>

<style>
/* Add your styles here if needed */
</style>
