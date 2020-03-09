<template>
  <transition name="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs" />
  </transition>
</template>

<script>
import MusicList from '@/components/music-list/music-list.vue'
import { mapGetters, mapActions } from 'vuex'
import { getAlbumSongList } from '@/api/singer.js'
import { ERR_OK } from '@/api/config.js'
import { createSong } from '@/common/js/song.js'
export default {
  name: 'Album-Detail',
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.album.title
    },
    bgImage() {
      return this.album.cover
    },
    ...mapGetters({
      album: 'album'
    })
  },
  created() {
    this._getAlbumSongList()
  },
  methods: {
    _getAlbumSongList() {
      if (!this.album.content_id) {
        this.$router.push('/recommand')
        return
      }
      getAlbumSongList(this.album.content_id).then(({ data }) => {
        // console.log(data)
        if (data.code === ERR_OK) {
          this.songs = this._normallizeSong(data.cdlist[0].songlist)
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
