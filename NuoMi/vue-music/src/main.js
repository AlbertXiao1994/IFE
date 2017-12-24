// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick' // 解决移动端300ms延迟
import VueLazyLoad from 'vue-lazyload'
import store from './store'

// 静态资源
import 'common/sass/index.scss'

fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
