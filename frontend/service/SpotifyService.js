import axios from 'axios'

const topTracksEndpoint = 'https://api.spotify.com/v1/me/top/tracks'
const mock = [
  {
    id: '6l9Ebgt7opzxvsDt8IETJd',
    name: 'Warmongers',
    artists: ['Vega Missile'],
    popularity: 38,
    image: 'https://i.scdn.co/image/ab67616d00004851071927a304df706d9ccae85a',
  },
  {
    id: '591pnGpkSms2aA1GAU79qC',
    name: 'Expansion',
    artists: ['Vega Missile'],
    popularity: 32,
    image: 'https://i.scdn.co/image/ab67616d0000485179909067ad5802a8f20cdbc7',
  },
  {
    id: '1ulHVDFC1wNpbDC2mWE4ZA',
    name: 'Deux arabesques, L. 66: 1. Andantino con moto',
    artists: ['Mauro Bertoli'],
    popularity: 6,
    image: 'https://i.scdn.co/image/ab67616d000048513d6243605e647869d4e3d670',
  },
  {
    id: '3IpPZ6QYc9nGGihOKVWWMN',
    name: 'Feel My Love',
    artists: ['TODIIX'],
    popularity: 29,
    image: 'https://i.scdn.co/image/ab67616d0000485132e00747d0eef887c2412752',
  },
  {
    id: '1lHvMGnvWGhYQltRgXDbYM',
    name: 'Birba',
    artists: ['Luca Draccar'],
    popularity: 42,
    image: 'https://i.scdn.co/image/ab67616d00004851539a41f90beaf94c6f82d4c9',
  },
  {
    id: '6ESEOwrbLFiMrPbf7KO9lN',
    name: 'Belfort',
    artists: ['Helsloot'],
    popularity: 25,
    image: 'https://i.scdn.co/image/ab67616d00004851510e0ba4ca7867fecad21f54',
  },
  {
    id: '3kn0wJavHokxqS65gkj44N',
    name: 'More Days on Week',
    artists: ['Gabriel Marchisio'],
    popularity: 27,
    image: 'https://i.scdn.co/image/ab67616d00004851d4852f0f6c6fdbdc33efc397',
  },
  {
    id: '6Z8R6UsFuGXGtiIxiD8ISb',
    name: 'Safe And Sound',
    artists: ['Capital Cities'],
    popularity: 82,
    image: 'https://i.scdn.co/image/ab67616d0000485113c6cb6a81c8db4dbc8b9924',
  },
  {
    id: '4RpNETpCJm2Nfr3aTpt4cJ',
    name: 'Coeur des hommes',
    artists: ['Roméo Elvis'],
    popularity: 47,
    image: 'https://i.scdn.co/image/ab67616d00004851f99fb4c3e3812bb4ea81f1f7',
  },
]

class SpotifyService {
  // get top tracks
  // static so that we don't have to instantiate the class
  static getTopTrack(token) {
    console.log('SpotifyService | getTopTrack')
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

  static getMock() {
    console.log('SpotifyService | getMock')
    return new Promise((resolve, reject) => {
      resolve(mock)
    })
  }
}

export default SpotifyService
