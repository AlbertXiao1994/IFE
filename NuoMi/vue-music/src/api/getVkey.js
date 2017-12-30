import jsonp from 'common/js/jsonp'
import {commonParams} from 'api/config'

export function getVkey(song, guid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: '205361747',
    uin: 0,
    songmid: song.mid,
    filename: `C400${song.mid}.m4a`,
    guid: guid
  })
  let option = {
    param: 'callback'
  }
  return jsonp(url, data, option)
}