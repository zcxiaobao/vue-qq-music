<template>
  <div class="rank" ref="rank">
    <scroll class="toplist" ref="toplist" :data="toplist">
      <ul>
        <li class="item" @click="selectItem(top)" v-for="top in toplist" :key="top.listenNum">
          <div class="icon">
            <img width="100" height="100" v-lazy="top.headPicUrl" />
          </div>
          <ul class="songlist">
            <li class="song" v-for="(s,i) in top.song" :key="i">
              <span>{{i + 1}}.</span>
              <span>{{s.title}} - {{s.singerName}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!toplist.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { getTopList } from '@/api/rank.js'
import { ERR_OK } from '@/api/config.js'
import { mapMutations } from 'vuex'
import { playlistMixin } from '@/common/js/mixin.js'
import Scroll from '@/base/scroll/scroll.vue'
export default {
  mixins: [playlistMixin],
  data() {
    return {
      toplist: []
    }
  },
  created() {
    this._getTopList()
  },
  methods: {
    ...mapMutations({
      setTop: 'SET_TOP'
    }),
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : 0
      this.$refs.rank.style.bottom = bottom
      this.$refs.toplist.refresh()
    },
    selectItem(top) {
      this.$router.push(`/rank/${top.topId}`)
      this.setTop(top)
    },
    _getTopList() {
      getTopList().then(({ data }) => {
        if (data.code === ERR_OK) {
          const { data: toplist } = data.toplist
          this.toplist = [
            ...toplist.group[0].toplist.slice(0, 5),
            ...toplist.group[1].toplist
          ]
        }
      })
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="less" rel="stylesheet/stylus">
@import '~@/common/styles/variable';
@import '~@/common/styles/mixin.less';

.rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .toplist {
    height: 100%;
    overflow: hidden;

    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 20px;
      height: 100px;

      &:last-child {
        padding-bottom: 20px;
      }

      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
      }

      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        background: @color-highlight-background;
        color: @color-text-d;
        font-size: @font-size-small;

        .song {
          .no-wrap();
          line-height: 26px;
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
