<template>
  <div class="search-list">
    <transition-group name="list" tag="ul">
      <li
        @click="selectItem(search)"
        class="search-item"
        v-for="search in searchHisList"
        :key="search"
      >
        <span class="text">{{search}}</span>
        <span class="icon" @click.stop="del(search)">
          <i class="icon-delete"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    searchHisList: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  methods: {
    selectItem(search) {
      this.$emit('select-search', search)
    },
    del(search) {
      this.$emit('del-search', search)
    }
  }
}
</script>

<style scoped lang="less" >
@import '~@/common/styles/variable';
@import '~@/common/styles/mixin';

.search-list {
  .search-item {
    display: flex;
    align-items: center;
    height: 40px;
    overflow: hidden;

    &.list-enter-active,
    &.list-leave-active {
      transition: all 0.1s;
    }

    &.list-enter,
    &.list-leave-to {
      height: 0;
    }

    .text {
      flex: 1;
      color: @color-text-l;
    }

    .icon {
      .extendClick();

      .icon-delete {
        font-size: @font-size-small;
        color: @color-text-d;
      }
    }
  }
}
</style>
