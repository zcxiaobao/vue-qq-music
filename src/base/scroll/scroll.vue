<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    listenPullingUp: {
      type: Boolean,
      default: false
    },
    listenBeforeScroll: {
      type: Boolean,
      default: false
    },
    pullUpLoad: {
      type: Object,
      default: null
    },
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        pullUpLoad: this.pullUpLoad
      })
      if (this.listenScroll) {
        this.scroll.on('scroll', pos => {
          this.$emit('scroll', pos)
        })
      }
      if (this.listenPullingUp) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
      if (this.listenBeforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disable() {
      this.scroll && this.s.disable()
    },
    destroy() {
      this.scroll && this.scroll.destroy()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  watch: {
    data() {
      setTimeout(() => {
        if (this.listenPullingUp) {
          this.finishPullUp()
        }

        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>

<style>
</style>
