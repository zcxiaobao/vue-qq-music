import * as types from './mutation-types.js'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_CURRENT_SONG_URL](state, url) {
    state.currentSongUrl = url
  },
  [types.SET_ALBUM](state, album) {
    state.album = album
  },
  [types.SET_TOP](state, top) {
    state.top = top
  },
  [types.SET_SEARCH_HIS_LIST](state, searchHisList) {
    state.searchHistoryList = searchHisList
  },
  [types.SET_LATER_PLAY_LIST](state, laterPlayList) {
    state.laterPlayList = laterPlayList
  },
  [types.SET_FAVOURITE_LIST](state, favouriteList) {
    state.favouriteList = favouriteList
  }
}

export default mutations
