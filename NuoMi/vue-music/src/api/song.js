import {commonParams} from 'api/config'
import axios from 'axios'

export function requestLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    g_tk: 961292963,
    songmid: mid,
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    pcachetime: getTimeStamp(),
    callback: 'MusicJsonCallback_lrc',
    jsonpCallback: 'MusicJsonCallback_lrc'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

function getTimeStamp() {
  return new Date().getTime()
}