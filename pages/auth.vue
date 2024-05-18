<template>
  <div>
    <h1>Spotify Authentication</h1>
    <a :href="loginUrl">Login with Spotify</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    loginUrl(): string {
      const scope = [
        'streaming',
        'user-read-email',
        'user-read-private',
        'user-modify-playback-state',
      ].join(' ');

      const url = new URL('https://accounts.spotify.com/authorize');
      url.searchParams.set('response_type', 'code');
      url.searchParams.set('client_id', this.$config.spotifyClientId as string);
      url.searchParams.set('scope', encodeURIComponent(scope));
      url.searchParams.set('redirect_uri', encodeURIComponent(this.$config.spotifyRedirectUri as string));

      return url.href;
    },
  },
});
</script>
