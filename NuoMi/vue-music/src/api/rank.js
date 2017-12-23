import jsonp from 'common/js/jsonp'

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