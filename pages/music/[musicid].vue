<template>
  <div>
    <iframe
      id="spotify-player"
      :src="`https://open.spotify.com/embed/track/${$route.params.musicid}`"
      width="300"
      height="380"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
    ></iframe>
    <div>
      <h2>{{ itemData.diary }}</h2>
      <p>{{ itemData.memory_date }}</p>
      <img :src="itemData.image_path" alt="Memory Image" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onBeforeMount } from "vue";

const route = useRoute();
const itemData = ref({});

onBeforeMount(() => {
  if (route.query.item) {
    itemData.value = JSON.parse(route.query.item);
  }
});
</script>
