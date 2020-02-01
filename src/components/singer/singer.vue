<template>
  <div class="singer">
    <list-view :data="singers" @selectSinger="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import ListView from '@/base/listview/listview.vue'
import { getSinger, getSingerByJsonp } from '@/api/singer.js'
import { ERR_OK } from '@/api/config.js'
import Singer from '@/common/js/singer.js'
const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'
export default {
  name: 'Singer',
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSinger()
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
    },
    _getSinger() {
      getSingerByJsonp().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._normallizeSingerData(res.data.list)
        }
      })
    },
    _normallizeSingerData(list) {
      const singer = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, i) => {
        if (i < HOT_SINGER_LEN) {
          singer.hot.items.push(
            new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            })
          )
        }
        const key = item.Findex
        if (!singer[key]) {
          singer[key] = {
            title: key,
            items: []
          }
        }
        singer[key].items.push(
          new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          })
        )
      })
      // 保证按照hot A-Z顺序渲染
      const hot = []
      const ret = []
      Object.keys(singer).forEach(key => {
        const val = singer[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      })
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return [...hot, ...ret]
    }
  },
  components: {
    ListView
  }
}
</script>

<style lang='less' scoped>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
