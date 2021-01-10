import axios from 'axios'

const topTracksEndpoint = 'https://api.spotify.com/v1/me/top/tracks'

class SpotifyService {
  // get top tracks
  // static so that we don't have to instantiate the class
  static getTopTrack(token) {
    console.log('topTracksEndpoint:', topTracksEndpoint)
    return new Promise((resolve, reject) => {
      axios
        .get(topTracksEndpoint, {
          headers: {
            authorization: 'Bearer ' + token,
            'content-type': 'application/json',
          },
        })
        .then((res) => {
          // console.log(res.data)
          const items = res.data.items
          resolve(
            items.map((item) => ({
              id: item.id,
              name: item.name,
              artists: item.artists.map((artist) => artist.name),
              release_date: item.release_date,
              popularity: item.popularity,
              image: item.album.images[item.album.images.length - 1].url,
            }))
          )
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default SpotifyService
