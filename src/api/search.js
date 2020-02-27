import {
  configParam,
  options,
  qqMusicConfigParam
} from './config.js'

import axios from 'axios'

export const getHotSearchKeys = function (topId) {
  const topSongUrl = '/getHotSearchKeys'
  const data = {
    ...qqMusicConfigParam
  }
  return axios
    .get(topSongUrl, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res)
    })
}

export const getSearchSongList = function (hotkey, page, perpage) {
  const topSongUrl = '/getSearchSongList'
  const data = {
    ct: 24,
    qqmusic_ver: 1298,
    new_json: 1,
    remoteplace: 'txt.yqq.song',
    searchid: 54187145726741324,
    t: 0,
    aggr: 1,
    cr: 1,
    catZhida: 1,
    lossless: 0,
    flag_qc: 0,
    p: page,
    n: perpage,
    w: hotkey,
    ...qqMusicConfigParam
  }
  return axios
    .get(topSongUrl, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res)
    })
}
