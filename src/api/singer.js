import {
  qqMusicConfigParam,
  configParam,
  options
} from './config.js'
import axios from 'axios'
import jsonp from '@/common/js/jsonp.js'
export const getSinger = function () {
  const singerInfoUrl = '/getSinger'
  const data = {
    ...qqMusicConfigParam,
    '-': 'getUCGI14918969730439313',
    data: {
      'comm': {
        'ct': 24,
        'cv': 0
      },
      'singerList': {
        'module': 'Music.SingerListServer',
        'method': 'get_singer_list',
        'param': {
          'area': -100,
          'sex': -100,
          'genre': -100,
          'index': -100,
          'sin': 0,
          'cur_page': 1
        }
      }
    }
  }
  return axios
    .get(singerInfoUrl, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res)
    })
}

export const getSingerByJsonp = function () {
  const sliderUrl =
    'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = {
    ...configParam,
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  }
  return jsonp(sliderUrl, data, options)
}

export const getSingerSongList = function (singer) {
  const singerSongListUrl = '/getSingerSongList'
  const data = {
    ...qqMusicConfigParam,
    '-': 'getSingerSong5820184818895127',
    data: {
      'comm': {
        'ct': 24,
        'cv': 0
      },
      'singerSongList': {
        'method': 'GetSingerSongList',
        'param': {
          'order': 1,
          'singerMid': singer.id,
          'begin': 0,
          'num': 20
        },
        'module': 'musichall.song_list_server'
      }
    }
  }
  return axios(singerSongListUrl, {
    params: data
  }).then(res => {
    return Promise.resolve(res)
  })
}
