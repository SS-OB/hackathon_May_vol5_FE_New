<template>
  <div>
    <iframe
      id="spotify-player"
      :src="spotifyEmbedUrl"
      width="300"
      height="380"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
    ></iframe>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const musicId = computed(() => route.params.musicId);
const spotifyEmbedUrl = computed(
  () => `https://open.spotify.com/embed/track/${musicId.value}`
);
</script>

<button id="play-button">再生</button>
<button id="pause-button">一時停止</button>
