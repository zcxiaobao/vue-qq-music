<template>
  <!-- <transition name="slide">歌单详情</transition> -->
  <div class="singer-detail">歌单详情</div>
</template>

<script>
export default {
  name: 'Singer-Detail'
}
</script>

<style lang='less' scoped>
@import '~@/common/styles/variable.less';
.singer-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: @color-background;
}
// .slide-enter-active,
// .slide-leave-active {
//   transition: all 0.3s;
// }
// .slide-enter,
// .slide-leave-to {
//   transform: translate3d(100%, 0, 0);
// }
</style>
