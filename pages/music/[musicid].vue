<template>
  <div class="container">
    <div class="item-data">
      <img :src="imagePath" alt="Memory Image" class="memory-image" />
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
import { ref, onBeforeMount, computed } from "vue";

const route = useRoute();
const router = useRouter();
const itemData = ref({});

// 追加した部分: imagePath の計算
const imagePath = computed(() => {
  const musicId = route.params.musicid;
  if (musicId === "3nQcpdy9tvhbBVSBwyptQc") {
    return "/meat.jpg";
  } else if (musicId === "0kdqcbwei4MDWFEX5f33yG") {
    return "/ski.jpg";
  } else if (musicId === "0bYg9bo50gSsH3LtXe2SQn") {
    return "/shibuya.jpg";
  } else if (musicId === "6jEVAnwC1SfmenU3wJCohS") {
    return "/camp.jpg";
  } else if (musicId === "5blG2vXcJC2n9l3rb5sCOr") {
    return "/hamberger.jpg";
  } else if (musicId === "5mjkeVu24NbkHeX8zt7muo") {
    return "/otsumami.jpg";
  }
  return "/default.jpg"; // デフォルトの画像パス
});

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
