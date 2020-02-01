import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.includes('?') ? '&' : '?') + param(data)
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(data)
      }
    })
  })
}

function param(data) {
  let url = ''
  for (let k in data) {
    const val = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(val)}`
  }
  return url ? url.substring(1) : ''
}
