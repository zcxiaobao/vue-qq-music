import { playMode } from '@/common/js/config.js'
import { loadSearchHis } from '@/common/js/cache.js'
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
  top: {},
  searchHistoryList: loadSearchHis()
}
export default state
