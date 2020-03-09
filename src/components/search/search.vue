<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query-change="queryChange"></search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper">
      <scroll ref="shortcut" class="shortcut" v-show="!query" :data="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li class="item" v-for="hot in hotKeys" :key="hot.n" @click="addQuery(hot.k)">
                <span>{{hot.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistoryList.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="clearSearchHis">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list
              @select-search="addQuery"
              @del-search="delSearchHistory"
              :searchHisList="searchHistoryList"
            ></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" ref="searchResult" v-show="query">
      <suggest ref="suggest" :query="query" @select="saveSuggest"></suggest>
    </div>
    <confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchBox from '@/base/search-box/search-box.vue'
import Suggest from '@/components/suggest/suggest.vue'
import SearchList from '@/base/search-list/search-list.vue'
import Confirm from '@/base/confirm/confirm.vue'
import Scroll from '@/base/scroll/scroll.vue'
import { getHotSearchKeys } from '@/api/search.js'
import { ERR_OK } from '@/api/config.js'
import { mapActions, mapGetters } from 'vuex'
import { playlistMixin, serachMixin } from '@/common/js/mixin.js'
export default {
  mixins: [playlistMixin, serachMixin],
  data() {
    return {
      hotKeys: []
      // query: ''
    }
  },
  created() {
    this._getHotSearchKeys()
  },
  computed: {
    // ...mapGetters(['searchHistoryList']),
    shortcut() {
      return [...this.hotKeys, ...this.searchHistoryList]
    }
  },
  methods: {
    ...mapActions([
      // 'saveSearchHistory',
      // 'delSearchHistory',
      'clearSearchHistory'
    ]),
    saveSuggest() {
      this.saveSearch()
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : 0
      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.shortcut.refresh()
      this.$refs.searchResult.style.bottom = bottom
      this.$refs.suggest.refresh()
    },
    // queryChange(newQ) {
    //   this.query = newQ
    // },
    clearSearchHis() {
      this.$refs.confirm.show()
    },
    // addQuery(query) {
    //   this.$refs.searchBox.setQuery(query)
    // },
    _getHotSearchKeys() {
      getHotSearchKeys().then(({ data }) => {
        if (data.code === ERR_OK) {
          this.hotKeys = data.data.hotkey
        }
      })
    }
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  },
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Confirm,
    Scroll
  }
}
</script>

<style lang="less">
@import '~@/common/styles/variable';
@import '~@/common/styles/mixin';

.search {
  .search-box-wrapper {
    margin: 20px;
  }

  .shortcut-wrapper {
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;

    .shortcut {
      height: 100%;
      overflow: hidden;

      .hot-key {
        margin: 0 20px 20px 20px;

        .title {
          margin-bottom: 20px;
          font-size: @font-size-medium;
          color: @color-text-l;
        }

        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: @color-highlight-background;
          font-size: @font-size-medium;
          color: @color-text-d;
        }
      }

      .search-history {
        position: relative;
        margin: 0 20px;

        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: @font-size-medium;
          color: @color-text-l;

          .text {
            flex: 1;
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
    }
  }

  .search-result {
    position: fixed;
    width: 100%;
    top: 178px;
    bottom: 0;
  }
}
</style>
