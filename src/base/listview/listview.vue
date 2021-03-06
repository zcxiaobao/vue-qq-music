<template>
  <scroll
    class="listview"
    :data="data"
    ref="listview"
    :listenScroll="listenScroll"
    :probeType="probeType"
    @scroll="scroll"
  >
    <ul>
      <li v-for="(group,index) in data" class="list-group" ref="listGroup" :key="index">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li
            v-for="item in group.items"
            class="list-group-item"
            :key="item.id"
            @click="selectSinger(item)"
          >
            <img class="avatar" v-lazy="item.avatar" />
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="list-shortcut"
      @touchstart.stop.prevent="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
      @touchend.stop
    >
      <ul>
        <li
          v-for="(item, index) in shortcutList"
          :data-index="index"
          class="item"
          :class="{'current':currentIndex===index}"
          :key="index"
        >{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
    <div class="loading-container" v-show="!data || !data.length">
      <loading />
    </div>
  </scroll>
</template>

<script>
import Scroll from '@/base/scroll/scroll.vue'
import Loading from '@/base/loading/loading.vue'
import { htmlDataGetOrSet } from '@/common/js/dom.js'
const SHORTCUT_ITEM_LENGTH = 18
const FIXED_TITLE_HEIGHT = 30
export default {
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  // mixins: [playlistMixin],
  created() {
    this.touch = {}
    this.probeType = 3
    this.listHeight = []
    this.listenScroll = true
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  methods: {
    onShortcutTouchStart(e) {
      const shortcutIndex = htmlDataGetOrSet(e.target, 'index')
      this.touch.y1 = e.touches[0].pageY
      this.touch.anchorIndex = shortcutIndex
      this._scrollTo(shortcutIndex)
    },
    onShortcutTouchMove(e) {
      this.touch.y2 = e.touches[0].pageY
      const delta = Math.floor(
        (this.touch.y2 - this.touch.y1) / SHORTCUT_ITEM_LENGTH
      )
      const shortcutIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(shortcutIndex)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    refresh() {
      this.$refs.listview.refresh()
    },
    selectSinger(singer) {
      this.$emit('selectSinger', singer)
    },
    _scrollTo(shortcutIndex) {
      if (!shortcutIndex && shortcutIndex !== 0) {
        return
      }
      if (shortcutIndex < 0) {
        shortcutIndex = 0
      } else if (shortcutIndex > this.listHeight.length - 2) {
        shortcutIndex = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[shortcutIndex]
      this.$refs.listview.scrollToElement(
        this.$refs.listGroup[shortcutIndex],
        0
      )
    },
    _calcaulateHeight() {
      this.listHeight = []
      const listGroups = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < listGroups.length; i++) {
        height += listGroups[i].clientHeight
        this.listHeight.push(height)
      }
    }
  },
  components: {
    Scroll,
    Loading
  },
  computed: {
    shortcutList() {
      return this.data.map(singer => singer.title.substr(0, 1))
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex]
        ? this.data[this.currentIndex].title
        : ''
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calcaulateHeight()
      }, 20)
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      // 滚动至顶部及其以上
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 滚动至中部
      for (let i = 0; i < listHeight.length - 1; i++) {
        const height1 = listHeight[i]
        const height2 = listHeight[i + 1]
        if (newY <= -height1 && newY > -height2) {
          this.currentIndex = i
          this.diff = newY + height2
          return
        }
      }

      // 滚动至底部及其以下
      this.currentIndex = listHeight.length - 2
    },
    diff(newDiff) {
      const fixedTop =
        newDiff > 0 && newDiff < FIXED_TITLE_HEIGHT
          ? newDiff - FIXED_TITLE_HEIGHT
          : 0
      if (this.fixedTop === fixedTop) {
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  }
}
</script>

<style lang='less' scoped>
@import '~@/common/styles/variable.less';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: @color-background;
  .list-group {
    padding-bottom: 30px;
    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: @font-size-small;
      color: @color-text-l;
      background: @color-highlight-background;
    }
    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: @color-text-l;
        font-size: @font-size-medium;
      }
    }
  }
  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: @color-background-d;
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: @color-text-l;
      font-size: @font-size-small;
      &.current {
        color: @color-theme;
      }
    }
  }
  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: @font-size-small;
      color: @color-text-l;
      background: @color-highlight-background;
    }
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
