<template>
  <div class="food" v-show="isShow" ref="foodWrapper">
    <div class="food-content">
      <div class="food-img">
        <img :src="food.image" width="100%" height="100%">
      </div>
      <div class="food-detail">
        <h2 class="name">{{ food.name }}</h2>
        <div class=extra>
          <span class="sellCount">月售{{ food.sellCount }}份</span><span class="rating">好评率{{ food.rating }}%</span>
        </div>
        <div class="price">
          <span class="nowPrice">¥{{ food.price }}</span>
          <span class="oldPrice" v-if="food.oldPrice">¥{{ food.oldPrice }}<span class="line"></span></span>
        </div>
        <cart-control :food="food" class="cart-control" v-if="food.count"
        @ball-move="_drop"></cart-control>
        <div class="intoCart" v-else @click.stop.prevent="intoCart">加入购物车</div>
      </div>
      <div class="split"></div>
      <div class="food-info">
        <h1 class="title">商品介绍</h1>
        <p class="info-text">{{ food.info }}</p>
      </div>
      <div class="split"></div>
      <div class="food-rating">
        <h1 class="title">商品评价</h1>
        <rating-control  :ratingTypes="ratingTypes" :ratings="food.ratings"
        @on-change="updateState"></rating-control>
        <div class="rating-content">
          <ul>
            <li v-for="rating in food.ratings" class="rating-item" v-show="(allFlag&&(!contentFlag||rating.text))||(rating.rateType==selectedType&&(!contentFlag||rating.text))">
          <span class="rating-time">{{ rating.rateTime | formateTime }}</span>
          <div class="user">
            <span class="username">{{ rating.username }}</span>
            <div class="avatar">
              <img :src="rating.avatar">
            </div>
          </div>
          <div class="text-wrapper">
            <span class="icon-thumb_up" v-if="rating.rateType==0"></span>
            <span class="icon-thumb_down" v-if="rating.rateType==1"></span>
            <span class="rating-text">{{ rating.text }}</span>
          </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="close-wrapper" @click="back">
      <span class="icon-arrow_lift"></span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ratingControl from '../ratingControl/ratingControl'
import cartControl from '../cartControl/cartControl'
import BScroll from 'better-scroll'
import {formateDate} from '@/common/js/date.js'
export default {
  components: {
    ratingControl,
    cartControl
  },
  props: {
    food: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      isShow: false,
      ratingTypes: [
        {
          name: '推荐'
        },
        {
          name: '吐槽'
        }
      ],
      selectedType: '',
      contentFlag: false,
      allFlag: true
    }
  },
  created () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.foodWrapper, {click: true})
    })
  },
  filters: {
    formateTime (time) {
      let date = new Date(time)
      return formateDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
    showFood () {
      if (!event._constructed) {
        return
      }
      this.isShow = !this.isShow
    },
    back () {
      if (!event._constructed) {
        return
      }
      this.showFood()
    },
    _drop (el) {
      this.$emit('ball-move', el)
    },
    intoCart (event) {
      if (!event._constructed) {
        return
      }
      Vue.set(this.food, 'count', 1)
    },
    updateState (obj) {
      this.selectedType = obj.selectedType
      this.allFlag = obj.allFlag
      this.contentFlag = obj.contentFlag
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
  background: #fff;
  z-index: 30;
  overflow: hidden;
}
.food-img {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
}
.food-img img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.close-wrapper {
  position: fixed;
  left: 10px;
  top: 10px;
}
.icon-arrow_lift {
  display: inline-block;
  width: 30px;
  height: 30px;
  padding: 5px;
  font-size: 20px;
  color: #fff;
  line-height: 30px;
}
.food-detail {
  position: relative;
  flex: 1;
  padding: 18px;
  overflow: hidden;
  white-space: nowrap;
}
.food-detail .name {
  font-size: 14px;
  font-weight: 700;
  color: rgb(7,17,27);
  line-height: 14px;
}
.food-detail .extra {
  font-size: 10px;
  color: rgb(147,153,159);
  line-height: 10px;
  margin-top: 8px;
}
.food-detail .price {
  margin-top: 8px;
}
.nowPrice {
  font-size: 14px;
  color: rgb(240,20,20);
  font-weight: 700;
  line-height: 24px;
}
.oldPrice {
  position: relative;
  font-size: 10px;
  color: rgb(147,153,159);
  font-weight: 700;
  line-height: 24px;
  margin-left: 8px;
}
.oldPrice .line {
  display: inline-block;
  width: 100%;
  height: 1px;
  position: absolute;
  left: 0;
  bottom: 6px;
  border-bottom: 1px solid rgb(147,153,159);
}
.extra .sellCount {
  margin-right: 12px;
}
.intoCart {
  position: absolute;
  right: 18px;
  bottom: 18px;
  width: 74px;
  height: 24px;
  font-size: 10px;
  color: #fff;
  line-height: 24px;
  border-radius: 12px;
  background: rgb(0,160,220);
  text-align: center;
}
.cart-control {
  position: absolute;
  right: 18px;
  bottom: 18px;
}
.split {
  width: 100%;
  height: 16px;
  background: #f3f5f7;
  border-top: 1px solid rgba(7,17,27,0.1);
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.food-info {
  padding: 18px;
}
.title {
  font-size: 14px;
  font-weight: 700;
  color: rgb(77,85,93);
}
.food-info .info-text {
  padding: 6px 8px;
  font-size: 12px;
  color: rgb(77,85,93);
  line-height: 24px;
}
.food-rating .title {
  padding: 18px 18px 0 18px;
}
.food-rating .rating-content {
  padding: 0 18px;
}
.rating-item {
  position: relative;
  display: block;
  padding: 16px 0;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.user {
  position: absolute;
  right: 0;
  top: 16px;
}
.avatar {
  display: inline-block;
}
.avatar img {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.rating-time,.username {
  font-size: 10px;
  color: rgb(147,153,159);
  line-height: 12px;
}
.text-wrapper {
  margin-top: 6px;
}
.rating-text {
  font-size: 12px;
  color: rgb(7,17,27);
  line-height: 24px;
}
.icon-thumb_up {
  font-size: 12px;
  line-height: 24px;
  color: rgb(0,160,220);
}
.icon-thumb_down {
  font-size: 12px;
  line-height: 24px;
  color: rgb(147,153,159);
}
</style>
