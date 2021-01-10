<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">spot2rave</h1>
      <div class="links">
        <a
          :href="loginUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Connect with Spotify
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const loginUrl = `${process.env.serverBaseUrl}/spotify/login`
    return {
      loginUrl,
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
