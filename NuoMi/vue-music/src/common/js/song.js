import {requestLyric} from 'api/song'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, payplay}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.payplay = payplay
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      requestLyric(this.mid).then((res) => {
        if (res.code === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: getSingerName(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    payplay: musicData.pay.payplay
  })
}

function getSingerName(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((item) => {
    ret.push(item.name)
  })
  return ret.join('/')
}

// function getSongURL(songmid) {
//   let t = (new Date()).getUTCMilliseconds()
//   let guid = Math.round(2147483647 * Math.random()) * t % 1e10
//   getVkey(songmid, guid).then((res) => {
//     if (res.code === ERR_OK) {
//       let info = res.data.items[0]
//       let url = `http://dl.stream.qqmusic.qq.com/${info.filename}?vkey=${info.vkey}&guid=${guid}&uin=0&fromtag=66`
//       return url
//     }
//   }, (err) => {
//     return err
//   })
// }