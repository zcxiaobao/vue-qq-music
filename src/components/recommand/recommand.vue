<template>
  <div class="recommend" ref="recommend">
    <scroll
      ref="scroll"
      class="recommend-content"
      :data="data"
      :listenPullingUp="listenPullingUp"
      :pullUpLoad="pullUpLoad"
      @pullingUp="pullingUp"
    >
      <div>
        <div v-if="sliderItems.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
            <div v-for="item in sliderItems" :key="item.id">
              <a :href="item.jump_info.url">
                <img class="needsclick" @load="loadImg" :src="item.pic_info.url" />
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul class="recom-wrapper">
            <li
              v-for="item in recomPlayList"
              class="recom-item"
              :key="item.content_id"
              @click="selectAlbum(item)"
            >
              <div class="icon">
                <img v-lazy="item.cover" />
              </div>
              <div class="text" v-html="item.title"></div>
            </li>
          </ul>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">最新音乐</h1>
          <ul>
            <li v-for="item in newSongList" class="item" :key="item.id">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.image" />
              </div>
              <div class="text">
                <h2 class="name" v-html="item.name"></h2>
                <p class="desc" v-html="item.singer"></p>
              </div>
              <div class="interval">{{_normallizeSongInterval(item.interval)}}</div>
            </li>
          </ul>
          <loading class="newsong-loading" v-show="newSongLoading && !isNewSongBottom" />
          <p class="recommend-bottom" v-show="isNewSongBottom">——我也是有底线的——</p>
        </div>
      </div>
      <div class="loading-container" v-show="!recomPlayList.length">
        <loading />
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import {
  getRecomSlider,
  getRecomPlayList,
  getNewSongList
} from '@/api/recommand.js'
import { ERR_OK } from '@/api/config.js'
import { createSong } from '@/common/js/song.js'
import Slider from '@/base/slider/slider.vue'
import Scroll from '@/base/scroll/scroll.vue'
import Loading from '@/base/loading/loading.vue'
import { mapMutations } from 'vuex'
export default {
  name: 'Recommand',
  data() {
    return {
      sliderItems: [], // 轮播图信息
      recomPlayList: [], // 推荐歌单信息
      newSongList: [], // 新歌列表
      pullUpLoad: {
        threshold: 20
      },
      listenPullingUp: true,
      newSongListPageIndex: 0,
      newSongLoading: false,
      isNewSongBottom: false
    }
  },
  methods: {
    ...mapMutations({
      setAlbum: 'SET_ALBUM'
    }),
    selectAlbum(item) {
      console.log(item)
      this.$router.push({
        path: `/recommand/${item.content_id}`
      })
      this.setAlbum(item)
    },
    pullingUp() {
      this._getNewSongList()
    },
    loadImg() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    },
    _getRecomSlider() {
      getRecomSlider().then(({ data }) => {
        if (data.code === ERR_OK) {
          this.sliderItems = data.focus.data.content
        }
      })
    },
    _getRecomPlayList() {
      getRecomPlayList().then(({ data }) => {
        if (data.code === ERR_OK) {
          this.recomPlayList = data.recomPlaylist.data.v_hot.slice(0, 9)
        }
      })
    },
    _getNewSongList() {
      this.newSongListPageIndex++
      this.newSongLoading = true
      getNewSongList(this.newSongListPageIndex).then(({ data }) => {
        if (data.code === ERR_OK) {
          if (data.newSongList && data.newSongList.length > 0) {
            const list = this._normallizeSong(data.newSongList)
            this.newSongList = [...this.newSongList, ...list]
            this.newSongLoading = false
          } else {
            this.isNewSongBottom = true
          }
        }
      })
    },
    _normallizeSong(list) {
      const songs = []
      list.forEach(song => {
        songs.push(createSong(song))
      })
      return songs
    },
    _normallizeSongInterval(seconds) {
      const mins = `${Math.floor(seconds / 60)}`
      const secs = `${seconds % 60}`
      return `${mins.padStart(2, '0')}:${secs.padStart(2, '0')}`
    }
  },
  computed: {
    data() {
      return [...this.newSongList, ...this.recomPlayList]
    }
  },

  created() {
    this._getRecomSlider()
    this._getRecomPlayList()
    this._getNewSongList()
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
}
</script>

<style lang="less" scoped>
@import '~@/common/styles/variable.less';
@import '~@/common/styles/mixin.less';
.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .recommend-list {
      .list-title {
        height: 45px;
        line-height: 45px;
        padding-left: 9px;
        font-size: @font-size-large;
        color: @color-theme;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 0px;
          width: 3px;
          height: 16px;
          transform: translate(0, -50%);
          background-color: #f00;
        }
      }
      .recom-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .recom-item {
          flex: 1 0 30%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          margin: 5px;
          .icon {
            flex: 0 0 80px;
            width: 100%;
            img {
              width: 100%;
            }
          }
          .text {
            line-height: 1.2;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: @font-size-medium;
            color: @color-text-d;
          }
        }
      }
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;
        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: @font-size-medium;
          .name {
            margin-bottom: 10px;
            color: @color-text;
            .no-wrap();
          }
          .desc {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            color: @color-text-d;
          }
        }
        .interval {
          flex: 0 0 50px;
          text-align: center;
          align-self: center;
          color: @color-text-ll;
          font-size: @font-size-small;
          margin-left: 10px;
        }
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
    .recommend-bottom {
      text-align: center;
      color: @color-text-d;
      font-size: @font-size-medium;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
