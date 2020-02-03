const axios = require('axios')
const vueAxios = axios.create({
  headers: {
    origin: 'https://y.qq.com/',
    'sec-fetch-site': 'same-site',
    'access-control-allow-origin': 'https://y.qq.com',
    'access-control-expose-headers': 'Area',
    referer: 'https://c.y.qq.com/'
  },
  timeout: 3000
})

const sendAxiosAjax = (url, params) => {
  return Promise.resolve(vueAxios.get(url, {
    params
  }))
}
const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

module.exports = function before(app, server, compiler) {
  // #region 推荐页
  // 获取 qq music 推荐页 slider信息
  app.get('/getRecomSlider', (req, res) => {
    sendAxiosAjax(url, req.query).then(response => {
      return res.json(response.data)
    }).catch(e => {
      console.log(e)
    })
  })

  // 获取 qq music 推荐页 recomPlayList信息
  app.get('/getRecomPlayList', (req, res) => {
    sendAxiosAjax(url, req.query).then(response => {
      return res.json(response.data)
    }).catch(e => {
      console.log(e)
    })
  })

  // #endregion

  // #region 歌手详情页
  // 获取 歌手的 song-list信息
  app.get('/getSingerSongList', (req, res) => {
    sendAxiosAjax(url, req.query).then(response => {
      return res.json(response.data)
    }).catch(e => {
      console.log(e)
    })
  })
}
