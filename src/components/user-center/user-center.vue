<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back">
        <i class="icon-back" @click.stop="back"></i>
      </div>
      <div class="switches-wrapper">
        <switches :currentIndex="currentIndex" :switches="switches" @switch="currentIndexChange"></switches>
      </div>
      <div ref="playBtn" class="play-btn">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <scroll
          ref="favoriteList"
          class="list-scroll"
          :data="favouriteList"
          v-if="currentIndex === 0"
        >
          <div class="list-inner">
            <song-list :songs="favouriteList"></song-list>
          </div>
        </scroll>
        <scroll ref="playList" class="list-scroll" :data="laterPlayList" v-if="currentIndex === 1">
          <div class="list-inner">
            <song-list :songs="laterPlayList"></song-list>
          </div>
        </scroll>
      </div>
      <!-- <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="noResultDesc"></no-result>
      </div>-->
    </div>
  </transition>
</template>

<script>
import Switches from '@/base/switches/switches.vue'
import Scroll from '@/base/scroll/scroll.vue'
import SongList from '@/base/song-list/song-list.vue'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      currentIndex: 0,
      switches: [{ name: '我喜欢的' }, { name: '搜索历史' }]
    }
  },
  computed: {
    ...mapGetters(['favouriteList', 'laterPlayList'])
  },
  methods: {
    back() {
      this.$router.back()
    },
    currentIndexChange(index) {
      this.currentIndex = index
    }
  },
  components: {
    Switches,
    Scroll,
    SongList
  }
}
</script>

<style scoped lang="less">
@import '~@/common/styles/variable';

.user-center {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  background: @color-background;

  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.3s;
  }

  &.slide-enter,
  &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;

    .icon-back {
      display: block;
      padding: 10px;
      font-size: @font-size-large-x;
      color: @color-theme;
    }
  }

  .switches-wrapper {
    margin: 10px 0 30px 0;
  }

  .play-btn {
    box-sizing: border-box;
    width: 135px;
    padding: 7px 0;
    margin: 0 auto;
    text-align: center;
    border: 1px solid @color-text-l;
    color: @color-text-l;
    border-radius: 100px;
    font-size: 0;

    .icon-play {
      display: inline-block;
      vertical-align: middle;
      margin-right: 6px;
      font-size: @font-size-medium-x;
    }

    .text {
      display: inline-block;
      vertical-align: middle;
      font-size: @font-size-small;
    }
  }

  .list-wrapper {
    position: absolute;
    top: 110px;
    bottom: 0;
    width: 100%;

    .list-scroll {
      height: 100%;
      overflow: hidden;

      .list-inner {
        padding: 20px 30px;
      }
    }
  }

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
