<template>
  <div>
    <p>Callback Page</p>
    <button @click="login">Go to searching page</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToSavePage() {
      this.$router.push("/tmp");
    },
  },
  async created() {
    const code = this.$route.query.code;
    if (code) {
      try {
        const params = new URLSearchParams();
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", process.env.VUE_APP_RETURN_TO);

        const clientId = process.env.VUE_APP_CLIENT_ID;
        const clientSecret = process.env.VUE_APP_CLIENT_SECRET;
        const credentials = btoa(`${clientId}:${clientSecret}`);

        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${credentials}`,
          },
          body: params,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch access token");
        }

        const data = await response.json();
        console.log(data);
        // アクセストークンを保存する処理をここに追加する
      } catch (error) {
        console.error("Error fetching access token", error);
      }
    } else {
      console.error("Authorization code not found");
    }
  },
};
</script>

<style>
/* スタイルを追加する場合はここに記述 */
</style>

<!-- <template>
    <div>
      <p>Callback Page</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    async created() {
      const code = this.$route.query.code;
      if (code) {
        try {
          const params = new URLSearchParams();
          params.append('grant_type', 'authorization_code');
          params.append('code', code);
          params.append('redirect_uri', process.env.VUE_APP_RETURN_TO);
  
          const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            params,
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${btoa(`${process.env.VUE_APP_CLIENT_ID}:${process.env.VUE_APP_CLIENT_SECRET}`)}`
              }
            }
          );
  
          // アクセストークンを保存する処理
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching access token', error);
        }
      } else {
        console.error('Authorization code not found');
      }
    }
  }
  </script>

  <style>
  /* スタイルを追加する場合はここに記述 */
  </style>
   -->
