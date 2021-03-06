import { getLyric } from '@/api/song.js'
import { ERR_OK } from '@/api/config.js'
import { Base64 } from 'js-base64'

export class Song {
  constructor({ id, name, mid, singer, album, image, interval }) {
    this.id = id
    this.name = name
    this.mid = mid
    this.singer = singer
    this.album = album
    this.interval = interval
    this.image = image
  }
  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then(({ data }) => {
        if (data.retcode === ERR_OK) {
          this.lyric = Base64.decode(data.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}

// export default class Song {
//   constructor({id, mid, singer, name, album, duration, image, url}) {
//     this.id = id
//     this.mid = mid
//     this.singer = singer
//     this.name = name
//     this.album = album
//     this.duration = duration
//     this.image = image
//     this.url = url
//   }

//   getLyric() {
//     if (this.lyric) {
//       return Promise.resolve(this.lyric)
//     }

//     return new Promise((resolve, reject) => {
//       getLyric(this.mid).then((res) => {
//         if (res.retcode === ERR_OK) {
//           this.lyric = Base64.decode(res.lyric)
//           resolve(this.lyric)
//         } else {
//           reject('no lyric')
//         }
//       })
//     })
//   }
// }

export function createSong(songInfo) {
  return new Song({
    id: songInfo.id,
    mid: songInfo.mid,
    singer: filterSinger(songInfo.singer),
    name: songInfo.name,
    album: songInfo.album.name,
    interval: songInfo.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${songInfo.album.mid}.jpg?max_age=2592000`
    // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach(s => {
    ret.push(s.name)
  })
  return ret.join('/')
}
