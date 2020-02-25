<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs" />
  </transition>
</template>

<script>
import MusicList from '@/components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getTopListSongs } from '@/api/rank.js'
import { ERR_OK } from '@/api/config.js'
import { createSong } from '@/common/js/song.js'
export default {
  created() {
    this._getTopListSongs()
  },
  data() {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters(['top']),
    title() {
      return this.top.title
    },
    bgImage() {
      return this.top.mbFrontPicUrl
    }
  },
  methods: {
    _getTopListSongs() {
      if (!this.top.topId) {
        this.$router.push('/rank')
        return
      }
      getTopListSongs(this.top.topId).then(({ data }) => {
        if (data.code === ERR_OK) {
          const { data: topSongList } = data.detail
          this.songs = this._normallizeSong(topSongList.songInfoList)
        }
      })
    },
    _normallizeSong(list) {
      const songs = []
      list.forEach(song => {
        songs.push(createSong(song))
      })
      return songs
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang='less' scoped>
@import '~@/common/styles/variable.less';

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
