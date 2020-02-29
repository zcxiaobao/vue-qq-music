<template>
  <scroll
    ref="suggest"
    class="suggest"
    :data="resultList"
    :listenPullingUp="listenPullingUp"
    :pullUpLoad="pullUpLoad"
    @pullingUp="pullingUp"
  >
    <ul class="suggest-list">
      <li class="suggest-item" v-for="song in resultList" :key="song.id" @click="selectItem(song)">
        <div class="icon">
          <i :class="getIconCls(song)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDispName(song)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title="加载歌曲中"></loading>
      <p class="suggest-bottom" v-show="!hasMore">我也是有底线的</p>
    </ul>
    <!-- <div class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>-->
  </scroll>
</template>

<script>
import { getSearchSongList } from '@/api/search.js'
import Loading from '@/base/loading/loading.vue'
import Scroll from '@/base/scroll/scroll.vue'
import { ERR_OK } from '@/api/config.js'
import { createSong } from '@/common/js/song.js'
import { mapMutations, mapActions } from 'vuex'
import Singer from '@/common/js/singer.js'
const PERPAGE = 20
const SINGER = 'SINGER'
export default {
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      page: 1,
      resultList: [],
      hasMore: true,
      listenPullingUp: true,
      pullUpLoad: {
        threshold: 50
      }
    }
  },
  methods: {
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions(['insertSong']),
    search() {
      this.hasMore = true
      this.page = 1
      getSearchSongList(this.query, this.page, PERPAGE).then(({ data }) => {
        if (data.code === ERR_OK) {
          this.resultList = this._genResult(data.data)
        }
      })
    },
    pullingUp() {
      this.page++
      getSearchSongList(this.query, this.page, PERPAGE).then(({ data }) => {
        if (data.code === ERR_OK) {
          this.resultList = this.resultList.concat(
            this._genResult(data.data, false)
          )
          this._checkMore(data.data)
        }
      })
    },
    selectItem(song) {
      if (song.type === SINGER) {
        const singer = new Singer({
          id: song.singerMID,
          name: song.singerName
        })
        this.$router.push({
          path: `/search/${song.singerID}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(song)
      }
    },
    getIconCls(song) {
      if (song.type === SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDispName(song) {
      if (song.type === SINGER) {
        return `${song.singerName}`
      } else {
        return `${song.name}-${song.singer}`
      }
    },
    _checkMore(data) {
      const song = data.song
      if (
        !song.list.length ||
        song.curnum + song.curpage * PERPAGE >= song.totalnum
      ) {
        this.hasMore = false
      }
    },
    _genResult(data, isNeedSinger = true) {
      let ret = []
      if (isNeedSinger) {
        if (
          data.zhida &&
          data.zhida.zhida_singer &&
          data.zhida.zhida_singer.singerID
        ) {
          ret.push({ ...data.zhida.zhida_singer, type: SINGER })
        }
      }
      if (data.song && data.song.list) {
        ret = ret.concat(this._normallizeSong(data.song.list))
      }
      return ret
    },
    _normallizeSong(list) {
      const songs = []
      list.forEach(song => {
        songs.push(createSong(song))
      })
      return songs
    }
  },
  watch: {
    query() {
      this.search()
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="less">
@import '~@/common/styles/variable';
@import '~@/common/styles/mixin';

.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    padding: 0 30px;

    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }

    .icon {
      flex: 0 0 30px;
      width: 30px;

      [class^='icon-'] {
        font-size: 14px;
        color: @color-text-d;
      }
    }

    .name {
      flex: 1;
      font-size: @font-size-medium;
      color: @color-text-d;
      overflow: hidden;

      .text {
        .no-wrap();
      }
    }
  }
  .suggest-bottom {
    text-align: center;
    color: @color-text-d;
    font-size: @font-size-medium;
    height: 40px;
    line-height: 40px;
  }

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
