import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '../pages/index'
import DetailPage from '../pages/detail'
import DetailCouPage from '../pages/detail/count'
import DetailForPage from '../pages/detail/forecast'
import DetailAnaPage from '../pages/detail/analysis'
import DetailPubPage from '../pages/detail/publish'
import OrderListPage from '../pages/orderList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
        path: '/',
        component: IndexPage
    },
    {
        path: '/detail',
        component: DetailPage,
        redirect: '/detail/analysis',
        children: [
            {
                path: 'count',
                component: DetailCouPage
            },
            {
                path: 'forecast',
                component: DetailForPage
            },
            {
                path: 'analysis',
                component: DetailAnaPage
            },
            {
                path: 'publish',
                component: DetailPubPage
            }
        ]
    },
    {
        path: '/orderList',
        component: OrderListPage
    }
  ]
})
