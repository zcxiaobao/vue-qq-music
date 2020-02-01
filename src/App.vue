<template>
  <div id="app">
    <m-header />
    <tab />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import MHeader from '@/components/m-header/m-header.vue'
import Tab from '@/components/tab/tab.vue'
export default {
  components: {
    MHeader,
    Tab
  }
}
</script>
<style></style>
