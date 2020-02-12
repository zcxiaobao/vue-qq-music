import {
  qqMusicConfigParam,
  configParam,
  options
} from './config.js'
import axios from 'axios'
import jsonp from '@/common/js/jsonp.js'

export const getLyric = function (songId) {
  const lyricUrl = '/getLyric'
  const data = {
    ...qqMusicConfigParam,
    '-': 'MusicJsonCallback_lrc',
    pcachetime: +new Date(),
    songmid: songId,
    g_tk: 1137451523
  }
  return axios
    .get(lyricUrl, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res)
    })
}
