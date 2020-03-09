import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from './config'
import { shuffle } from './util'
export const playlistMixin = {
  computed: {
    ...mapGetters(['playlist'])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}

export const playerMixin = {
  computed: {
    ...mapGetters([
      'mode',
      'sequenceList',
      'playlist',
      'currentSong',
      'favouriteList'
    ]),
    iconMode() {
      return this.mode === playMode.sequence
        ? 'icon-sequence'
        : this.mode === playMode.loop
        ? 'icon-loop'
        : 'icon-random'
    }
  },
  methods: {
    ...mapMutations({
      setPlaying: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST'
    }),
    ...mapActions(['saveFavouriteList', 'delFavouriteList']),
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let songList = null
      if (mode === playMode.random) {
        songList = shuffle(this.playlist)
      } else {
        songList = this.sequenceList
      }
      const nowSongIndex = songList.findIndex(song => {
        return song.id === this.currentSong.id
      })
      this.setCurrentIndex(nowSongIndex)
      this.setPlayList(songList)
    },
    getFavoriteIcon(song) {
      return this.isFavorite(song) ? 'icon-favorite' : 'icon-not-favorite'
    },
    toggleFavourite(song) {
      if (this.isFavorite(song)) {
        this.delFavouriteList(song)
      } else {
        this.saveFavouriteList(song)
      }
    },
    isFavorite(song) {
      const index = this.favouriteList.findIndex(s => s.id === song.id)
      return index > -1
    }
  }
}

export const serachMixin = {
  data() {
    return {
      query: ''
    }
  },
  computed: {
    ...mapGetters(['searchHistoryList'])
  },
  methods: {
    ...mapActions(['saveSearchHistory', 'delSearchHistory']),
    queryChange(newQ) {
      this.query = newQ
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    }
  }
}
// export const playerMixin = {
//   computed: {
//     iconMode() {
//       return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
//     },
//     ...mapGetters([
//       'sequenceList',
//       'playlist',
//       'currentSong',
//       'mode',
//       'favoriteList'
//     ])
//   },
//   methods: {
//     changeMode() {
//       const mode = (this.mode + 1) % 3
//       this.setPlayMode(mode)
//       let list = null
//       if (mode === playMode.random) {
//         list = shuffle(this.sequenceList)
//       } else {
//         list = this.sequenceList
//       }
//       this.resetCurrentIndex(list)
//       this.setPlaylist(list)
//     },
//     resetCurrentIndex(list) {
//       let index = list.findIndex((item) => {
//         return item.id === this.currentSong.id
//       })
//       this.setCurrentIndex(index)
//     },
//     toggleFavorite(song) {
//       if (this.isFavorite(song)) {
//         this.deleteFavoriteList(song)
//       } else {
//         this.saveFavoriteList(song)
//       }
//     },
//     getFavoriteIcon(song) {
//       if (this.isFavorite(song)) {
//         return 'icon-favorite'
//       }
//       return 'icon-not-favorite'
//     },
//     isFavorite(song) {
//       const index = this.favoriteList.findIndex((item) => {
//         return item.id === song.id
//       })
//       return index > -1
//     },
//     ...mapMutations({
//       setPlayMode: 'SET_PLAY_MODE',
//       setPlaylist: 'SET_PLAYLIST',
//       setCurrentIndex: 'SET_CURRENT_INDEX',
//       setPlayingState: 'SET_PLAYING_STATE'
//     }),
//     ...mapActions([
//       'saveFavoriteList',
//       'deleteFavoriteList'
//     ])
//   }
// }

// export const searchMixin = {
//   data() {
//     return {
//       query: '',
//       refreshDelay: 120
//     }
//   },
//   computed: {
//     ...mapGetters([
//       'searchHistory'
//     ])
//   },
//   methods: {
//     onQueryChange(query) {
//       this.query = query
//     },
//     blurInput() {
//       this.$refs.searchBox.blur()
//     },
//     addQuery(query) {
//       this.$refs.searchBox.setQuery(query)
//     },
//     saveSearch() {
//       this.saveSearchHistory(this.query)
//     },
//     ...mapActions([
//       'saveSearchHistory',
//       'deleteSearchHistory'
//     ])
//   }
// }
