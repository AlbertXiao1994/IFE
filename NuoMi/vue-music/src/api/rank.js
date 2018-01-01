import jsonp from 'common/js/jsonp'
import {commonParams, options} from 'api/config'

export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg'

  const data = {
    page: 'index',
    format: 'html',
    tpl: 'macv4',
    v8debug: 1
  }
  const options = {
    param: 'jsonCallback',
    name: 'jsonCallback'
  }
  return jsonp(url, data, options)
}

export function getClassifiedTop(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    tpl: 3,
    page: 'detail',
    // date: getTime(),
    topid,
    type: 'top',
    song_begin: 0,
    song_num: 100,
    g_tk: 189803645,
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  })
  return jsonp(url, data, options)
}

// function getTime() {
//   let t = new Date()
//   let fmt = {
//     y: t.getFullYear(),
//     m: t.getMonth() + 1,
//     d: t.getDate() - 1
//   }

//   return `${fmt.y}-${fmt.m}-${fmt.d}`
// }