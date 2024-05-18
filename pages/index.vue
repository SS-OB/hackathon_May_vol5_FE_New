<template>
  <div class="home-container">
    <h1>ホーム画面</h1>
    <div class="grid-container">
      <div class="grid-item" v-for="item in items" :key="item.id">
        <img :src="item.image_path" alt="Memory Image" />
        <p>{{ item.diary }}</p>
      </div>
    </div>
    <div class="button-container">
      <UButton class="custom-button" @click="goToSavePage"
        >保存するボタン</UButton
      >
      <UButton class="custom-button" @click="goToPlaySong"
        >曲を再生するテスト</UButton
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const items = ref([]);

onMounted(async () => {
  const response = await fetch("/api/item");
  items.value = await response.json();
});

const router = useRouter();

const goToSavePage = () => {
  router.push("/save");
};

const goToPlaySong = () => {
  router.push("/playsong");
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  max-width: 1000px;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.grid-item img {
  max-width: 100%;
  height: auto;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
}

.custom-button {
  width: 200px;
  height: 50px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 1023px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
