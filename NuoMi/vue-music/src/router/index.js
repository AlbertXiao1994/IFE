import Vue from 'vue'
import Router from 'vue-router'
// import Rank from 'components/rank/rank'
import Recommend from 'components/recommend/recommend'
// import Search from 'components/search/search'
// import Singer from 'components/singer/singer'
// import SingerDetail from 'components/singer-detail/singer-detail'
// import Disc from 'components/disc/disc'
// import TopList from 'components/top-list/top-list'
// import UserCenter from 'components/user-center/user-center'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: () => import('components/disc/disc')
        }
      ]
    },
    {
      path: '/rank',
      component: () => import('components/rank/rank'),
      children: [
        {
          path: ':id',
          component: () => import('components/top-list/top-list')
        }
      ]
    },
    {
      path: '/singer',
      component: () => import('components/singer/singer'),
      children: [
        {
          path: ':id',
          component: () => import('components/singer-detail/singer-detail')
        }
      ]
    },
    {
      path: '/search',
      component: () => import('components/search/search'),
      children: [
        {
          path: ':id',
          component: () => import('components/singer-detail/singer-detail')
        }
      ]
    },
    {
      path: '/user',
      component: () => import('components/user-center/user-center')
    }
  ]
})
