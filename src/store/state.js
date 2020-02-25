import {
  playMode
} from '@/common/js/config.js'
const state = {
  singer: {},
  // 播放器部分
  playing: false,
  fullScreen: false,
  playlist: [],
  mode: playMode.sequence,
  sequenceList: [],
  currentIndex: -1,
  currentSongUrl: '',
  album: {},
  top: {}
}
export default state
