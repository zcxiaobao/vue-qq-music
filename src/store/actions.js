import * as types from './mutation-types.js'
import { playMode } from '@/common/js/config.js'
import { shuffle } from '@/common/js/util.js'
import { saveSearch, delSearch } from '@/common/js/cache.js'

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

export const saveSearchHistory = function({ commit }, query) {
  commit(types.SET_SEARCH_HIS_LIST, saveSearch(query))
}
export const delSearchHistory = function({ commit }, query) {
  commit(types.SET_SEARCH_HIS_LIST, delSearch(query))
}