import Vue from 'vue'
import VueRouter from 'vue-router'
import Singer from '@/components/singer/singer.vue'
import Recommand from '@/components/recommand/recommand.vue'
import Rank from '@/components/rank/rank.vue'
import Search from '@/components/search/search.vue'
import SingerDetail from '@/components/singer-detail/singer-detail.vue'
import AlbumDetail from '@/components/album-detail/album-detail.vue'
import TopList from '@/components/top-list/top-list.vue'
import UserCenter from '@/components/user-center/user-center.vue'
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/recommand'
  },
  {
    path: '/recommand',
    name: 'recommand',
    component: Recommand,
    children: [
      {
        path: ':id',
        component: AlbumDetail
      }
    ]
  },
  {
    path: '/singer',
    name: 'singer',
    component: Singer,
    children: [
      {
        path: ':id',
        name: 'singer-detail',
        component: SingerDetail
      }
    ]
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/rank',
    name: 'rank',
    component: Rank,
    children: [
      {
        path: ':id',
        component: TopList
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: UserCenter
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
