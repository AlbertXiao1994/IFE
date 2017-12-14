<template>
  <div class="food" v-show="isShow">
    <div class="food-img">
      <img :src="food.image" width="100%" height="100%">
    </div>
    <div class="food-detail">
    </div>
    <div class="food-des">
    </div>
    <div class="food-rating">
      <h1 class="rating-title">商品评价</h1>
      <rating-list></rating-list>
    </div>
  </div>
</template>

<script>
import ratingList from '../ratingList/ratingList'
export default {
  components: {
    ratingList
  },
  props: {
    food: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    showFood () {
      this.isShow = !this.isShow
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.food {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 48px;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 40;
}
.food-img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 0;
  padding-top: 100%;
}
.food-img img {
  width: 100%;
  height: 100%;
}
</style>
