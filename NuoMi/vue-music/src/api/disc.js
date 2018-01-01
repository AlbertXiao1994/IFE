import {commonParams} from 'api/config'
import axios from 'axios'

export function getDiscDetail(id) {
  const url = '/api/discDetail'

  const data = Object.assign({}, commonParams, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    g_tk: 3609139406,
    disstid: id,
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    jsonpCallback: 'playlistinfoCallback'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}