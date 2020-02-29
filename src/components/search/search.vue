<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query-change="queryChange"></search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper">
      <div ref="shortcut" class="shortcut" v-show="!query">
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
              <span class="clear">
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
      </div>
    </div>
    <div class="search-result" ref="searchResult" v-show="query">
      <suggest ref="suggest" :query="query" @select="saveSearchHistory"></suggest>
    </div>
    <!-- <confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm> -->
    <router-view></router-view>
  </div>
</template>

<script>
import SearchBox from '@/base/search-box/search-box.vue'
import Suggest from '@/components/suggest/suggest.vue'
import SearchList from '@/base/search-list/search-list.vue'
import { getHotSearchKeys } from '@/api/search.js'
import { ERR_OK } from '@/api/config.js'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      hotKeys: [],
      query: ''
    }
  },
  created() {
    this._getHotSearchKeys()
  },
  computed: {
    ...mapGetters(['searchHistoryList'])
  },
  methods: {
    ...mapActions(['saveSearchHistory', 'delSearchHistory']),
    queryChange(newQ) {
      this.query = newQ
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    _getHotSearchKeys() {
      getHotSearchKeys().then(({ data }) => {
        if (data.code === ERR_OK) {
          this.hotKeys = data.data.hotkey
        }
      })
    }
  },
  components: {
    SearchBox,
    Suggest,
    SearchList
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
