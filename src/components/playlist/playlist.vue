<template>
  <transition name="list-fade">
    <div class="playlist" @click="hide" v-show="showFlag">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click="changeMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click.stop="clearSongs()">
              <i class="icon-clear"></i>
            </span>
          </h1>
        </div>
        <scroll ref="listContent" class="list-content" :data="sequenceList">
          <transition-group ref="list" name="list" v-show="sequenceList.length" tag="ul">
            <li
              class="item"
              v-for="(song,index) in sequenceList"
              :key="song.id"
              @click.stop="selectSong(song,index)"
              ref="song"
            >
              <i class="current" :class="getCurrentIcon(song)"></i>
              <span class="text">{{song.name}}</span>
              <span class="like">
                <i class="icon-not-favorite"></i>
              </span>
              <span class="delete" @click.stop="delSong(song)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div class="add" @click.stop="addSongShow">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close" @click.stop="hide">
          <span>关闭</span>
        </div>
      </div>
      <confirm ref="confirm" @confirm="confirmClear" text="是否清空播放列表" confirmBtnText="清空"></confirm>
      <add-song ref="addSong"></add-song>
    </div>
  </transition>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import Confirm from '@/base/confirm/confirm'
import AddSong from '@/components/add-song/add-song.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from '@/common/js/config.js'
import { playerMixin } from '@/common/js/mixin.js'
export default {
  mixins: [playerMixin],
  data() {
    return {
      showFlag: false
    }
  },
  computed: {
    modeText() {
      return this.mode === playMode.sequence
        ? '顺序播放'
        : this.mode === playMode.random
        ? '随机播放'
        : '单曲循环'
    }
  },
  methods: {
    ...mapActions(['deleteSong', 'clearPlaylist']),
    show() {
      this.showFlag = true
      setTimeout(() => {
        this.$refs.listContent.refresh()
        this.scrollToSong(this.currentSong)
      }, 20)
    },
    hide() {
      this.showFlag = false
    },
    addSongShow() {
      this.$refs.addSong.show()
    },
    delSong(song) {
      this.deleteSong(song)
      if (!this.playlist.length) {
        this.hide()
      }
    },
    clearSongs() {
      this.$refs.confirm.show()
    },
    confirmClear() {
      this.clearPlaylist()
      this.$refs.confirm.hide()
    },
    selectSong(song, index) {
      if (this.mode === playMode.random) {
        index = this.playlist.findIndex(s => s.id === song.id)
      }
      this.setCurrentIndex(index)
      this.setPlaying(true)
    },
    scrollToSong(song) {
      const index = this.sequenceList.findIndex(s => s.id === song.id)
      this.$refs.listContent.scrollToElement(
        this.$refs.list.$el.children[index],
        300
      )
      // console.log(this.$refs.list.$el.children)
      // console.log(this.$refs.song)
      // this.$refs.listContent.scrollToElement(this.$refs.song[index], 300)
    },
    getCurrentIcon(song) {
      if (this.currentSong.id === song.id) {
        return 'icon-play'
      }
      return ''
    }
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id) {
        return
      }
      setTimeout(() => {
        this.scrollToSong(newSong)
      }, 20)
    }
  },
  components: {
    Scroll,
    Confirm,
    AddSong
  }
}
</script>

<style scoped lang="less" >
@import '~@/common/styles/variable';
@import '~@/common/styles/mixin';

.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: @color-background-d;

  &.list-fade-enter-active,
  &.list-fade-leave-active {
    transition: opacity 0.3s;

    .list-wrapper {
      transition: all 0.3s;
    }
  }

  &.list-fade-enter,
  &.list-fade-leave-to {
    opacity: 0;

    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }

  &.list-fade-enter,
  .list-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: @color-highlight-background;

    .list-header {
      position: relative;
      padding: 20px 30px 10px 20px;

      .title {
        display: flex;
        align-items: center;

        .icon {
          margin-right: 10px;
          font-size: 30px;
          color: @color-theme-d;
        }

        .text {
          flex: 1;
          font-size: @font-size-medium;
          color: @color-text-l;
        }

        .clear {
          .extendClick();

          .icon-clear {
            font-size: @font-size-medium;
            color: @color-text-d;
          }
        }
      }
    }

    .list-content {
      max-height: 240px;
      overflow: hidden;

      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;

        &.list-enter-active,
        &.list-leave-active {
          transition: all 0.1s;
        }

        &.list-enter,
        &.list-leave-to {
          height: 0;
        }

        .current {
          flex: 0 0 20px;
          width: 20px;
          font-size: @font-size-small;
          color: @color-theme-d;
        }

        .text {
          flex: 1;
          .no-wrap();
          font-size: @font-size-medium;
          color: @color-text-d;
        }

        .like {
          .extendClick();
          margin-right: 15px;
          font-size: @font-size-small;
          color: @color-theme;

          .icon-favorite {
            color: @color-sub-theme;
          }
        }

        .delete {
          .extendClick();
          font-size: @font-size-small;
          color: @color-theme;
        }
      }
    }

    .list-operate {
      width: 140px;
      margin: 20px auto 30px auto;

      .add {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        border: 1px solid @color-text-l;
        border-radius: 100px;
        color: @color-text-l;

        .icon-add {
          margin-right: 5px;
          font-size: @font-size-small-s;
        }

        .text {
          font-size: @font-size-small;
        }
      }
    }

    .list-close {
      text-align: center;
      line-height: 50px;
      background: @color-background;
      font-size: @font-size-medium-x;
      color: @color-text-l;
    }
  }
}
</style>
