import { configParam, options, qqMusicConfigParam } from './config.js'

import axios from 'axios'

const http = axios.create({
  baseURL: 'http://47.240.82.152:8000/',
  // baseURL: 'http://localhost:8000/',
  timeout: 3000
})
export const getTopList = function() {
  return http.get('/ranks/getTopList').then(res => {
    return Promise.resolve(res)
  })
}
export const getTopListSongs = function(topId) {
  return http.get(`getTopListSongs/${topId}`).then(res => {
    return Promise.resolve(res)
  })
}
/*
export const getTopList = function () {
  const topListUrl = '/getTopList'
  const data = {
    ...qqMusicConfigParam,
    '-': 'recom' + (+new Date()),
    data: {
      comm: {
        ct: 24
      },
      toplist: {
        module: 'musicToplist.ToplistInfoServer',
        method: 'GetAll',
        param: {}
      }
    }
  }
  return axios
    .get(topListUrl, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res)
    })
}

export const getTopListSongs = function (topId) {
  const topSongUrl = '/getTopListSongs'
  const data = {
    '-': 'getUCGI4195015404019351',
    'needNewCode': 0,
    'data': {
      'detail': {
        'module': 'musicToplist.ToplistInfoServer',
        'method': 'GetDetail',
        'param': {
          'topId': topId,
          'offset': 0,
          'num': 20
          // 'period': '2020-02-25'
        }
      },
      'comm': {
        'ct': 24,
        'cv': 0
      }
    }
  }
  return axios
    .get(topSongUrl, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res)
    })
}
*/
