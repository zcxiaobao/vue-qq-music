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
          <ul>
            <li v-for="item in recomPlayList" class="item" :key="item.content_id">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.cover" />
              </div>
              <div class="text">
                <h2 class="name" v-html="item.username"></h2>
                <p class="desc" v-html="item.title"></p>
              </div>
            </li>
          </ul>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in newSongList" class="item" :key="item.id">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.image" />
              </div>
              <div class="text">
                <h2 class="name" v-html="item.name"></h2>
                <p class="desc" v-html="item.sing"></p>
              </div>
            </li>
          </ul>
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
      newSongListPageIndex: 1
    }
  },
  methods: {
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
          this.recomPlayList = data.recomPlaylist.data.v_hot
        }
      })
    },
    _getNewSongList() {
      this.newSongListPageIndex++
      getNewSongList(this.newSongListPageIndex).then(({ data }) => {
        if (data.code === ERR_OK) {
          if (data.newSongList && data.newSongList.length > 0) {
            const list = this._normallizeSong(data.newSongList)
            this.newSongList = [...this.newSongList, ...list]
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
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: @font-size-medium;
        color: @color-theme;
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
          }
          .desc {
            color: @color-text-d;
          }
        }
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
