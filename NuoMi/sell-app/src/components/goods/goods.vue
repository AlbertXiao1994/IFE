<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul class="menu">
        <li v-for="(item,index) in goods" class="menu-item" 
        :class="{selected: index==selectIndex}" @click="selectOption(index)">
          <span class="text"><icon v-if="item.type>0" :type="item.type" class="icon"></icon>{{ item.name }}</span>
          <span class="line"></span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" ref="goodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list">
          <h1 class="header">{{ item.name }}</h1>
          <ul class="food-content">
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="description">{{ food.description }}</p>
                <div class=extra>
                  <span class="sellCount">月售{{ food.sellCount }}份</span><span class="rating">好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="nowPrice">¥{{ food.price }}</span>
                  <span class="oldPrice" v-if="food.oldPrice">¥{{ food.oldPrice }}<span class="line"></span></span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import icon from '../icon/icon'
import BScroll from 'better-scroll'
export default {
  components: {
    icon
  },
  data () {
    return {
      goods: {},
      selectIndex: 0
    }
  },
  created () {
    this.$http.get('/api/goods')
    .then((res) => {
      this.goods = res.data
      this.$nextTick(() => {
        this._initScroll()
      })
    }, (err) => {
      console.log(err)
    })
  },
  methods: {
    selectOption (index) {
      this.selectIndex = index
    },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {})
      this.goodsScroll = new BScroll(this.$refs.goodsWrapper, {})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goods {
  display: flex;
  position: absolute;
  top: 176px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
}
.menu-wrapper {
  flex: 0 0 80px;
  width: 80px;
  background: #f3f5f7;
}
.menu-item {
  position: relative;
  display: table;
  width: 100%;
  height: 54px;
  padding: 0 12px;
}
.menu-item .text {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  width: 56px;
  font-size: 12px;
  line-height: 14px;
  font-weight: 200;
}
.menu-item .icon {
  vertical-align: middle;
}
.menu-item .line {
  position: absolute;
  bottom: 1px;
  left: 0;
  width: 100%;
  height: 1px;
  display: block;
  border-width: 54px;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.selected {
  color: rgb(240,20,20);
  background: #fff;
}
.goods-wrapper {
  flex: 1;
}
.header {
  width: 100%;
  height: 26px;
  background: #f3f5f7;
  border-left: 3px solid #d9dde1;
  font-size: 12px;
  color: rgb(147,153,159);
  line-height: 26px;
  padding-left: 14px;
}
.food-content {
  padding-left: 18px;
  padding-right: 18px;
}
.food-item {
  display: flex;
  padding: 18px 0;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.food-item:last-child {
  border-width: 0;
}
.food-item .icon {
  flex: 0 0 57px;
  margin-right: 10px;
}
.food-item .content {
  flex: 1;
  padding-top: 2px;
}
.content .name {
  font-size: 14px;
  color: rgb(7,17,27);
  line-height: 14px;
}
.content .description,.extra {
  font-size: 10px;
  color: rgb(147,153,159);
  line-height: 10px;
  margin-top: 8px;
}
.content .price {
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
</style>
