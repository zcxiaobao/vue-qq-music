import 'babel-polyfill'
import fastclick from 'fastclick'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/common/styles/index.less'
// import setMusicCookie from '@/common/js/setCookie.js'
import vueLazyLoad from 'vue-lazyload'

fastclick.attach(document.body)
Vue.use(vueLazyLoad, {
  loading: require('@/common/image/default.png')
})

Vue.config.productionTip = false
// setMusicCookie()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
