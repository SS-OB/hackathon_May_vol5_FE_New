<template>
  <div>
    <h1>Spotify Authentication</h1>
    <a :href="loginUrl">Login with Spotify</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const runtimeConfig = useRuntimeConfig();
    
    const loginUrl = computed(() => {
      const clientId = runtimeConfig.public.clientId as string;
      const redirectUri = runtimeConfig.public.redirectUri as string;
      
      const scope = [
        'streaming',
        'user-read-email',
        'user-read-private',
        'user-modify-playback-state',
      ].join(' ');

      const url = new URL('https://accounts.spotify.com/authorize');
      url.searchParams.set('response_type', 'code');
      url.searchParams.set('client_id', clientId);
      url.searchParams.set('scope', scope);
      url.searchParams.set('redirect_uri', redirectUri);

      return url.href;
    });

    return {
      loginUrl,
    };
  },
});
</script>

<!-- 
<script lang="ts">
const runtimeConfig = useRuntimeConfig();
const clientId    = runtimeConfig.public.clientId;
const redirectUri = runtimeConfig.public.redirectUri;
<script> -->