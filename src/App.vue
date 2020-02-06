<template>
  <div id="app">
    <m-header />
    <tab />
    <keep-alive>
      <router-view />
    </keep-alive>
    <player />
  </div>
</template>
<script>
import MHeader from '@/components/m-header/m-header.vue'
import Tab from '@/components/tab/tab.vue'
import Player from '@/components/player/player.vue'
export default {
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>
<style></style>
