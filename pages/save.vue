<template>
    <div class="save-container">
      <h1>保存画面</h1>
      <input v-model="query" @input="searchMusic" placeholder="曲を検索" />
      <ul>
        <li v-for="track in tracks" :key="track.id" @click="selectTrack(track)">
          {{ track.name }} - {{ track.artists[0].name }}
        </li>
      </ul>
      <input type="file" @change="uploadImage" />
      <textarea v-model="diary" placeholder="何があったの？"></textarea>
      <button @click="saveMemory">登録する！</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const query = ref("");
  const tracks = ref([]);
  const selectedTrack = ref(null);
  const image = ref(null);
  const diary = ref("");
  
  const searchMusic = async () => {
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
  };
  
  const uploadImage = (event) => {
    image.value = event.target.files[0];
  };
  
  const saveMemory = async () => {
    const formData = new FormData();
    formData.append("music_id", selectedTrack.value.id);
    formData.append("memory_date", new Date().toISOString());
    formData.append("diary", diary.value);
    formData.append("image", image.value);
  
    await fetch("/api/item", {
      method: "POST",
      body: formData,
    });
  
    useRouter().push("/");
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
  
  textarea {
    margin-top: 20px;
    width: 100%;
    height: 100px;
  }
  
  button {
    margin-top: 20px;
  }
  </style>
  