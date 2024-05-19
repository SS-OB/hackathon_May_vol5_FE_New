<template>
  <div>
    <iframe
      id="spotify-player"
      :src="`https://open.spotify.com/embed/track/${$route.params.musicid}`"
      width="500"
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
    <UButton class="custom-button" @click="goToHomePage">ホームに戻る</UButton>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onBeforeMount } from "vue";

const route = useRoute();
const router = useRouter();
const itemData = ref({});

onBeforeMount(() => {
  if (route.query.item) {
    itemData.value = JSON.parse(route.query.item);
  }
});

const goToHomePage = () => {
  router.push("/");
};
</script>
