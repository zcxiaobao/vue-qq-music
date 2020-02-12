<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs" />
  </transition>
</template>

<script>
import MusicList from '@/components/music-list/music-list.vue'
import { mapGetters, mapActions } from 'vuex'
import { getSingerSongList } from '@/api/singer.js'
import { ERR_OK } from '@/api/config.js'
import { createSong } from '@/common/js/song.js'
export default {
  name: 'Singer-Detail',
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters({
      singer: 'singer'
    })
  },
  created() {
    this._getSingerSongList()
  },
  data() {
    return {
      songs: []
    }
  },
  methods: {
    _getSingerSongList() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerSongList(this.singer).then(({ data }) => {
        if (data.code === ERR_OK) {
          // console.log(data.singerSongList.data.songList)
          this.songs = this._normallizeSong(data.singerSongList.data.songList)
        }
      })
    },
    _normallizeSong(list) {
      const songs = []
      list.forEach(song => {
        songs.push(createSong(song.songInfo))
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
