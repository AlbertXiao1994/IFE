import jsonp from 'common/js/jsonp'
import {commonParams, options} from 'api/config'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export function getPlayList() {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    data: '{"playlist":{"method":"get_playlist_by_category","param":{"id":1,"curPage":1,"size":30,"order":5,"titleid":1},"module":"playlist.PlayListPlazaServer"}}'
  })
  let option = {
    param: 'callback'
  }
  return jsonp(url, data, option)
}