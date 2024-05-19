<template>
  <div class="save-container">
    <h1>保存画面</h1>
    <div class="button-container">
      <UButton class="custom-button" @click="goToAuthPage">認証する</UButton>
    </div>
    <input
      :class="{ valid: isValid }"
      class="search-bar"
      v-model="query"
      @input="searchMusic"
      placeholder="曲を検索"
    />
    <ul>
      <li :class="{ is_dark: isDark }" v-for="track in tracks" :key="track.id" @click="selectTrack(track)">
        {{ track.name }} - {{ track.artists[0].name }}
      </li>
    </ul>
    <UInput class="input" type="file" @change="uploadImage" />
    <UTextarea class="textarea" placeholder="何があったの？" />
    <div class="button-container">
      <UButton class="custom-button" @click="saveMemory">登録する！</UButton>
    </div>
  </div>
</template>

<!-- <script setup> -->
<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useRuntimeConfig } from "nuxt/app";

const isDark = document.getElementsByTagName("html")[0].getAttribute("class") === "dark";
console.log(isDark);

const query = ref("");
const tracks = ref([]);
const selectedTrack = ref(null);
const image = ref(null);
const diary = ref("");
const isValid = ref(false);

const router = useRouter();
const runtimeConfig = useRuntimeConfig();

const searchMusic = async () => {
  isValid.value = false;
  if (query.value.length === 0) return;

  const tokenResponse = await fetch("/api/spotify-token");
  const tokenData = await tokenResponse.json();
  const token = tokenData.access_token;

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query.value}&type=track`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  tracks.value = data.tracks.items;
};

const selectTrack = (track) => {
  selectedTrack.value = track;
  query.value = `${track.name} - ${track.artists[0].name}`;
  tracks.value = [];
  isValid.value = true;
};

const uploadImage = (event) => {
  image.value = event.target.files[0];
  console.log(image.value);
};

const saveMemory = async () => {
  const body = JSON.stringify({
    music_id: selectedTrack.value.id,
    memory_date: new Date().toISOString().slice(0, 10),
    diary: diary.value,
    image_path: image.value.name,
  });
  await fetch("http://localhost:8080/item", {
    method: "POST",
    body: body,
  });

  router.push("/");
};

const loginUrl = computed(() => {
  const clientId = runtimeConfig.public.clientId; // as string;
  const redirectUri = runtimeConfig.public.redirectUri; // as string;

  const scope = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-modify-playback-state",
  ].join(" ");

  const url = new URL("https://accounts.spotify.com/authorize");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("scope", scope);
  url.searchParams.set("redirect_uri", redirectUri);

  return url.href;
});

// return {
//   loginUrl,
// };

// const goToAuthPage = () => {
//   router.push("/auth");
// };
const goToAuthPage = () => {
  window.location.href = loginUrl.value;
};
</script>

<style scoped>
.save-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

input[type="file"] {
  margin-top: 20px;
}

.search-bar {
  margin-bottom: 20px;
  padding: 5px;
  border: 1px solid gray;
  border-radius: 5px;
}

.valid {
  background: #82ff824d;
}

ul {
  position: fixed;
  top: 180px;
  padding: 10px;
  border-radius: 5px;
  z-index: 1;
}

li {
  background-color: #f8f8f8;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
}

.is_dark {
  background-color: black;
}

li:hover {
  background-color: lightgray;
}

li:hover.is_dark {
  background-color: gray;
}

.textarea {
  margin-top: 20px;
  width: 100%;
  height: 100px;
  max-width: 700px;
}

button {
  margin-top: 20px;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
  margin-bottom: 20px;
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
</style>
