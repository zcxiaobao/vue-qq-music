import * as types from './mutation-types.js'
import { playMode } from '@/common/js/config.js'
import { shuffle } from '@/common/js/util.js'
import {
  saveSearch,
  delSearch,
  clearSearch,
  saveLaterPlay,
  delLaterPlay
} from '@/common/js/cache.js'

function findSongIndex(list, song) {
  return list.findIndex(item => item.id === song.id)
}
export const selectPlay = function({ commit, state }, { list, index }) {
  if (state.mode === playMode.random) {
    const randomList = shuffle(list)
    index = findSongIndex(randomList, list[index])
    commit(types.SET_PLAYLIST, randomList)
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function({ commit, state }, { list }) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  const randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function({ commit, state }, song) {
  const playlist = [...state.playlist]
  const sequenceList = [...state.sequenceList]
  let currentIndex = state.currentIndex
  const currentSong = playlist[currentIndex]

  const fsPlayIndex = findSongIndex(playlist, song)
  currentIndex++

  playlist.splice(currentIndex, 0, song)
  if (fsPlayIndex > -1) {
    if (fsPlayIndex > currentIndex) {
      playlist.splice(fsPlayIndex + 1, 1)
    } else {
      playlist.splice(fsPlayIndex, 1)
      currentIndex--
    }
  }

  let currentSeIndex = findSongIndex(sequenceList, currentSong) + 1
  const fsSequenceIndex = findSongIndex(sequenceList, song)
  sequenceList.splice(currentSeIndex, 0, song)
  if (fsSequenceIndex > -1) {
    if (fsSequenceIndex > currentSeIndex) {
      sequenceList.splice(fsSequenceIndex + 1, 1)
    } else {
      sequenceList.splice(fsSequenceIndex, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
export const deleteSong = function({ commit, state }, song) {
  const playlist = [...state.playlist]
  const sequenceList = [...state.sequenceList]
  let currentIndex = state.currentIndex
  const fpIndex = playlist.findIndex(s => s.id === song.id)
  playlist.splice(fpIndex, 1)
  const fsIndex = sequenceList.findIndex(s => s.id === song.id)
  sequenceList.splice(fsIndex, 1)
  console.log('fsIndex' + fsIndex)
  if (fpIndex < currentIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  const playState = playlist.length > 0
  commit(types.SET_PLAYING_STATE, playState)
}
export const clearPlaylist = function({ commit }) {
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
}
export const saveSearchHistory = function({ commit }, query) {
  commit(types.SET_SEARCH_HIS_LIST, saveSearch(query))
}
export const delSearchHistory = function({ commit }, query) {
  commit(types.SET_SEARCH_HIS_LIST, delSearch(query))
}
export const clearSearchHistory = function({ commit }) {
  commit(types.SET_SEARCH_HIS_LIST, clearSearch())
}

export const saveLaterPlayList = function({ commit }, query) {
  commit(types.SET_LATER_PLAY_LIST, saveLaterPlay(query))
}
export const delLaterPlayList = function({ commit }, query) {
  commit(types.SET_LATER_PLAY_LIST, delLaterPlay(query))
}
