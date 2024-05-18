<template>
  <button @click="login">Sign in with Spotify</button>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  setup() {
    const loginPath = ref("");

    const login = () => {
      window.location.href = loginPath.value;
    };

    onMounted(async () => {
      const scopes = [
        "streaming",
        "user-read-email",
        "user-read-private",
        "playlist-modify-public",
        "playlist-modify-private",
      ];
      const params = new URLSearchParams();
      const clientId = process.env.VUE_APP_CLIENT_ID;
      const redirectUri = process.env.VUE_APP_RETURN_TO;

      if (!clientId || !redirectUri) {
        console.error(
          "Missing required environment variables: VUE_APP_CLIENT_ID and/or VUE_APP_RETURN_TO"
        );
        return;
      }

      params.append("client_id", clientId);
      params.append("response_type", "code");
      params.append("redirect_uri", redirectUri);
      params.append("scope", scopes.join(" "));
      params.append("state", "state");

      loginPath.value = `https://accounts.spotify.com/authorize?${params.toString()}`;
    });

    return {
      login,
    };
  },
};
</script>
