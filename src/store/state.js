import { playMode } from '@/common/js/config.js'
import { loadSearchHis, loadLaterPlayList } from '@/common/js/cache.js'
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
  searchHistoryList: loadSearchHis(),
  laterPlayList: loadLaterPlayList()
}
export default state
