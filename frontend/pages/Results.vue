<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">spot2rave</h1>
      <div class="results">
        <!-- <p>params: {{ params }}</p> -->
        <!-- <p>topTracks: {{ topTracks }}</p> -->
        <div
          v-for="(top, index) in topTracks"
          :key="top.index"
          class="top"
          :item="top"
          :index="index"
        >
          <!-- <p>{{ top.id }}</p> -->
          <p class="top-index">{{ index + 1 }}</p>
          <img class="top-image" :src="top.image" />
          <p class="top-name">{{ top.name }}</p>
          <p class="top-artists">{{ top.artists }}</p>
          <p class="top-popularity">{{ top.popularity }}</p>
          <p class="top-artists">{{ top.artists }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from '@nuxtjs/composition-api'
import SpotifyService from '@/service/SpotifyService'

export default {
  setup(_, context) {
    const isLoading = ref(true)
    const topTracks = ref([])
    const accessToken = context.root.$route.query.access_token
    // console.log('accessToken:', accessToken)
    onBeforeMount(async () => {
      console.log('onBeforeMount')
      topTracks.value = await fetchTopTracks(accessToken)
      isLoading.value = false
    })
    async function fetchTopTracks(token) {
      console.log('fetchTopTracks | token:', token)
      // const data = await SpotifyService.getTopTrack(token)
      const data = await SpotifyService.getMock()
      // console.log('data:', JSON.stringify(data))
      return data
    }
    return {
      isLoading,
      topTracks,
      fetchTopTracks,
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
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.results {
  padding-top: 15px;
}

.top {
  display: flex;
  justify-content: flex-start;
}
.top-index {
  width: auto;
}
.top-image {
  width: auto;
}
.top-name {
  width: auto;
}
.top-artists {
  width: auto;
}
.top-popularity {
  width: auto;
}
.top-artists {
  width: auto;
}
</style>
