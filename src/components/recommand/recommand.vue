<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="recomPlayList">
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
  getRecommandSlider,
  getAllInfo,
  getMusicHomeData
} from '@/api/recommand.js'
import { ERR_OK } from '@/api/config.js'
import Slider from '@/base/slider/slider.vue'
import Scroll from '@/base/scroll/scroll.vue'
import Loading from '@/base/loading/loading.vue'
export default {
  name: 'Recommand',
  data() {
    return {
      sliderItems: [], // 轮播图信息
      recomPlayList: [] // 热门歌单信息
    }
  },
  methods: {
    // _getRecommandSlider() {
    //   getRecommandSlider().then(res => {
    //     if (res.code === ERR_OK) {
    //       this.sliderItems = res.data.slider
    //     }
    //   })
    // },
    _getMusicHomeData() {
      getMusicHomeData().then(({ data }) => {
        if (data.code === ERR_OK) {
          this.sliderItems = data.focus.data.content
          this.recomPlayList = data.recomPlaylist.data.v_hot
        }
      })
    },
    loadImg() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }
  },
  created() {
    // this._getRecommandSlider()
    this._getMusicHomeData()
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
