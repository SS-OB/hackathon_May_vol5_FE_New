<template>
  <div class="save-container">
    <h1>保存画面</h1>
    <button @click="goToAuthPage">認証する</button>
    <input
      :class="{ valid: isValid }"
      v-model="query"
      @input="searchMusic"
      placeholder="曲を検索"
    />
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

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useRuntimeConfig } from 'nuxt/app'; // Nuxt 3の場合

const query = ref("");
const tracks = ref([]);
const selectedTrack = ref<any>(null);
const image = ref<File | null>(null);
const diary = ref("");
const isValid = ref(false);

const router = useRouter();
const route = useRoute(); // 変更部分
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

const selectTrack = (track: any) => {
  selectedTrack.value = track;
  query.value = `${track.name} - ${track.artists[0].name}`;
  tracks.value = [];
  isValid.value = true;
};

const uploadImage = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    image.value = target.files[0];
  }
};

const saveMemory = async () => {
  const formData = new FormData();
  formData.append("music_id", selectedTrack.value.id);
  formData.append("memory_date", new Date().toISOString());
  formData.append("diary", diary.value);
  formData.append("image", image.value!);

  await fetch("/api/item", {
    method: "POST",
    body: formData,
  });

  router.push("/");
};

// 変更部分開始
const loginUrl = computed(() => {
  const clientId = runtimeConfig.public.clientId as string;
  const redirectUri = `${window.location.origin}/save`;

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

const goToAuthPage = () => {
  window.location.href = loginUrl.value;
};

const handleSpotifyAuth = async () => {
  const code = route.query.code as string;
  if (code) {
    const response = await fetch('/api/spotify-auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (response.ok) {
      const data = await response.json();
      // アクセストークンをローカルストレージに保存するか、適切な方法で管理
      localStorage.setItem('spotifyAccessToken', data.access_token);
      console.log('Spotify認証が成功しました');
    } else {
      console.error('Spotify認証に失敗しました');
    }
  }
};

onMounted(() => {
  handleSpotifyAuth();
});
// 変更部分終了
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

.valid {
  background-color: #82ff824d;
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



<!-- <template>
  <div>
    <h1>Callback Page</h1>
    <p v-if="!accessToken">Fetching access token...</p>
    <p v-if="accessToken">Access Token: {{ accessToken }}</p>
    <p v-if="error">Error: {{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Callback",
  data() {
    return {
      accessToken: "",
      error: "",
    };
  },
  async mounted() {
    try {
      const route = useRoute();
      const code = route.query.code as string;

      // Your Spotify client ID and client secret
      const runtimeConfig = useRuntimeConfig();
      const clientId = runtimeConfig.public.clientId;
      const clientSecret = runtimeConfig.public.clientSecret;

      // Spotify API endpoint to request access token
      const tokenEndpoint = "https://accounts.spotify.com/api/token";

      // Request body for token exchange
      const data = new URLSearchParams();
      data.append("grant_type", "authorization_code");
      data.append("code", code);
      data.append("redirect_uri", `${window.location.origin}/callback`);

      // Base64 encode client ID and client secret
      const basicAuth = btoa(`${clientId}:${clientSecret}`);

      // Fetch request to Spotify token endpoint
      const response = await fetch(tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${basicAuth}`,
        },
        body: data,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      this.accessToken = responseData.access_token;

      // Now you have the access token, you can save it or use as needed
      console.log("Access Token:", this.accessToken);
    } catch (error) {
      console.error("Error fetching access token:", error);
      this.error = (error as any).message || "Failed to get access token";
    }
  },
});
</script>

<style>
/* Add your styles here if needed */
</style>

<!-- <template>
  <div>
    <h1>Callback Page</h1>
    <p v-if="accessToken || error">Fetching access token...</p>
    <p v-if="accessToken">Access Token: {{ accessToken }}</p>
    <p v-if="error">Error: {{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'Callback',
  data() {
    return {
      accessToken: '',
      refreshToken: '',
      error: '',
    };
  },
  async mounted() {
    try {
      // Get the query parameter 'code' from the URL
      const code = this.$route.query.code;

      // Your client ID and client secret from Spotify
      const clientId = 'your_client_id';
      const clientSecret = 'your_client_secret';

      // Spotify API endpoint to exchange code for access token
      const tokenEndpoint = 'https://accounts.spotify.com/api/token';

      // Base64 encode client ID and client secret
      const basicAuth = btoa(`${clientId}:${clientSecret}`);

      // Request body for token exchange
      const data = new URLSearchParams();
      data.append('grant_type', 'authorization_code');
      data.append('code', code);
      data.append('redirect_uri', `${window.location.origin}/callback.vue`);

      // POST request to Spotify token endpoint using fetch API
      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${basicAuth}`
        },
        body: data
      });

      if (!response.ok) {
        throw new Error('Failed to get access token');
      }

      const responseData = await response.json();
      this.accessToken = responseData.access_token;
      this.refreshToken = responseData.refresh_token;

      // Now you have access token and refresh token, you can save them or use as needed
      console.log('Access Token:', this.accessToken);
      console.log('Refresh Token:', this.refreshToken);
    } catch (error) {
      console.error('Error fetching access token:', error);
      this.error = error.message || 'Failed to get access token';
    }
  }
};
</script>

<style>
/* Add your styles here if needed */
</style> --> 
