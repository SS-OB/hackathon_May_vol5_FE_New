<template>
  <div class="container">
    <div class="item-data">
      <img :src="itemData.image_path" alt="Memory Image" class="memory-image" />
      <h2>{{ itemData.diary }}</h2>
      <p>{{ itemData.memory_date }}</p>
    </div>
    <iframe
      id="spotify-player"
      :src="`https://open.spotify.com/embed/track/${$route.params.musicid}`"
      width="500"
      height="380"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"
    ></iframe>
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

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

.item-data {
  margin: 20px 0;
}

.memory-image {
  width: 480px;
  height: auto;
  margin: 20px 0;
}

.custom-button {
  margin-top: 20px;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
