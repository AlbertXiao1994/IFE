import originJsonp from 'jsonp'

export default function jsonp(url, data, options) {
  // 拼接完整url
  url += (url.includes('?') ? '&' : '?') + param(data)
  return new Promise((resolve, reject) => {
    originJsonp(url, options, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

// 将请求参数拼接
export function param(data) {
  let url = ''
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : url
}
