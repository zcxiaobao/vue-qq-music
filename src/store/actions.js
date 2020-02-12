import * as types from './mutation-types.js'
import {
  playMode
} from '@/common/js/config.js'
import {
  shuffle
} from '@/common/js/util.js'

function findSongIndex(list, song) {
  return list.findIndex(item => item.id === song.id)
}
export const selectPlay = function ({
  commit,
  state
}, {
  list,
  index
}) {
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

export const randomPlay = function ({
  commit,
  state
}, {
  list
}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  const randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
