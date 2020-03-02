<template>
  <ul class="switches">
    <li
      class="switch-item"
      v-for="(s,index) in switches"
      :key="index"
      :class="{'active': currentIndex === index}"
    >
      <span @click="selectItem(index)">{{s.name}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    switches: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    selectItem(index) {
      this.$emit('switch', index)
    }
  }
}
</script>

<style scoped lang="less">
@import '~@/common/styles/variable';

.switches {
  display: flex;
  align-items: center;
  width: 240px;
  margin: 0 auto;
  border: 1px solid @color-highlight-background;
  border-radius: 5px;

  .switch-item {
    flex: 1;
    padding: 8px;
    text-align: center;
    font-size: @font-size-medium;
    color: @color-text-d;

    &.active {
      background: @color-highlight-background;
      color: @color-text;
    }
  }
}
</style>
