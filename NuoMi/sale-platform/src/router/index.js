import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '../pages/index'
import DetailPage from '../pages/detail'
import DetailCouPage from '../pages/detail/count'
import DetailForPage from '../pages/detail/forecast'
import DetailAnaPage from '../pages/detail/analysis'
import DetailPubPage from '../pages/detail/publish'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
    	path: '/detail',
    	component: DetailPage,
        name: 'DetailPage',
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
    }
  ]
})
