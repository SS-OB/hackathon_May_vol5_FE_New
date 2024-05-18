<template>
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
</style>
