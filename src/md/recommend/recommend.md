### recommend实现
1. ui图设计：参考了网易云音乐及————
2. 推荐页功能主要三部分：
  - slider轮播图
  - recomPlayList热门歌单
  - newSong最新音乐
3. 数据获取：直接调用qq music会存在跨域问题，因此通过配置vue.config.js实现
4. 插件依赖
  - better-scroll
  - vue-lazyload

