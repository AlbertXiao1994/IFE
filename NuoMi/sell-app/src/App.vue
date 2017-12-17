<template>
  <div id="app">
    <div role="header">
    	<v-header :msg="seller"></v-header>
    </div>
    <div class="tab">
    	<router-link class="tab-item" :to="{path: '/goods'}" active-class="active">商品</router-link>
      <router-link class="tab-item" :to="{path: '/ratings'}" active-class="active">评价</router-link>
      <router-link class="tab-item" :to="{path: '/seller'}" active-class="active">商家</router-link>
    </div>
    <div class="content">
      <keep-alive>
    	 <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Header from './components/header/header'
export default {
  components: {
    vHeader: Header
  },
  created () {
    this.$http.get('/api/seller')
    .then((res) => {
      this.seller = res.data
    }, (err) => {
      console.log(err)
    })
  },
  data () {
    return {
      seller: {}
    }
  }
}
</script>

<style>
@import './common/style/icon.css'
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.tab-item {
  display: block;
  flex: 1;
  color: rgb(77,85,93);
  text-align: center;
}
.tab .active {
  color: rgb(240,20,20);
}
</style>
