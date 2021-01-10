<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">spot2rave</h1>
      <div class="links">
        <!-- <NuxtLink
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
          @click="goToLogin()"
        >
          Connect with Spotify
        </NuxtLink> -->
        <!-- <a
          href="/login"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
          @click="goToLogin()"
        >
          Connect with Spotify
        </a> -->
        <div class="button--green" @click="goToLogin()">
          Connect with Spotify
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpotifyService from '@/service/SpotifyService'

export default {
  setup() {
    async function goToLogin() {
      await SpotifyService.initLogin()
    }
    return {
      goToLogin,
    }
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 5rem;
  color: #35495e;
  letter-spacing: 1px;
}

.links {
  padding-top: 15px;
}
</style>
