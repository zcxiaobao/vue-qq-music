import jsonp from '@/common/js/jsonp.js'
import {
  configParam,
  options,
  qqMusicConfigParam
} from './config.js'

import axios from 'axios'
axios.defaults.withCredentials = true

// 获取推荐页 slider信息
export const getRecomSlider = function () {
  const sliderUrl = '/getRecomSlider'
  const data = {
    ...qqMusicConfigParam,
    '-': 'recom030954476498489703',
    data: {
      comm: {
        ct: 24
      },
      focus: {
        module: 'QQMusic.MusichallServer',
        method: 'GetFocus',
        param: {}
      }
    }
  }
  return axios
    .get(sliderUrl, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res)
    })
}
// 获取推荐页 recomPlayList信息
export const getRecomPlayList = function () {
  const playListUrl = '/getRecomPlayList'
  const data = {
    ...qqMusicConfigParam,
    '-': 'recom030954476498489703',
    data: {
      comm: {
        ct: 24
      },
      recomPlaylist: {
        method: 'get_hot_recommend',
        param: {
          async: 1,
          cmd: 2
        },
        module: 'playlist.HotRecommendServer'
      }
    }
  }
  return axios
    .get(playListUrl, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res)
    })
}
// 获取推荐页 newSong信息
export const getNewSongList = function (pi, ps = 8) {
  const playListUrl = '/getNewSongList'
  const data = {
    ...qqMusicConfigParam,
    '-': 'recom030954476498489703',
    data: {
      comm: {
        ct: 24
      },
      new_song: {
        module: 'newsong.NewSongServer',
        method: 'get_new_song_info',
        param: {
          type: 5
        },
        songlistPage: {
          pi,
          ps
        }
      }
    }
  }
  return axios
    .get(playListUrl, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res)
    })
}

// export const getRecommandSlider = function () {
//   const sliderUrl =
//     'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
//   const data = {
//     ...configParam,
//     platform: 'h5',
//     uin: 0,
//     needNewCode: 1
//   }
//   return jsonp(sliderUrl, data, options)
// }

export const getAllInfo = function () {
  const infoUrl = '/getAllInfo'
  const data = {
    ...configParam,
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  }
  return axios
    .get(infoUrl, {
      params: data
      // headers: {
      //   'token': 123
      // }
    })
    .then(res => {
      return Promise.resolve(res)
    })
}
export const getMusicHomeData = function () {
  const infoUrl = '/getMusicHomeData'
  const data = {
    ...qqMusicConfigParam,
    '-': 'recom030954476498489703',
    data: {
      comm: {
        ct: 24
      },
      category: {
        method: 'get_hot_category',
        param: {
          qq: ''
        },
        module: 'music.web_category_svr'
      },
      recomPlaylist: {
        method: 'get_hot_recommend',
        param: {
          async: 1,
          cmd: 2
        },
        module: 'playlist.HotRecommendServer'
      },
      // playlist: {
      //   method: 'get_playlist_by_category',
      //   param: {
      //     id: 8,
      //     curPage: 1,
      //     size: 40,
      //     order: 5,
      //     titleid: 8
      //   },
      //   module: 'playlist.PlayListPlazaServer'
      // },
      // new_song: {
      //   module: 'newsong.NewSongServer',
      //   method: 'get_new_song_info',
      //   param: {
      //     type: 5
      //   }
      // },
      // new_album: {
      //   module: 'newalbum.NewAlbumServer',
      //   method: 'get_new_album_info',
      //   param: {
      //     area: 1,
      //     sin: 0,
      //     num: 10
      //   }
      // },
      // new_album_tag: {
      //   module: 'newalbum.NewAlbumServer',
      //   method: 'get_new_album_area',
      //   param: {}
      // },
      toplist: {
        module: 'musicToplist.ToplistInfoServer',
        method: 'GetAll',
        param: {}
      },
      focus: {
        module: 'QQMusic.MusichallServer',
        method: 'GetFocus',
        param: {}
      }
    }
  }
  return axios
    .get(infoUrl, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res)
    })
}
