<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul class="menu">
        <li v-for="(item,index) in goods" class="menu-item"
        @click="selectOption(index,$event)"
        :class="{selected: currentIndex==index}">
          <span class="text"><icon v-if="item.type>0" :type="item.type" class="icon"></icon>{{ item.name }}</span>
          <span class="line"></span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" ref="goodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="header">{{ item.name }}</h1>
          <ul class="food-content">
            <li v-for="food in item.foods" class="food-item" @click.stop.prevent="seeDetail(food,$event)">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="description" v-show="food.description">{{ food.description }}</p>
                <div class=extra>
                  <span class="sellCount">月售{{ food.sellCount }}份</span><span class="rating">好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="nowPrice">¥{{ food.price }}</span>
                  <span class="oldPrice" v-if="food.oldPrice">¥{{ food.oldPrice }}<span class="line"></span></span>
                </div>
                <cart-control :food="food" @ball-move="_drop" class="cart-control"></cart-control>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectedFood="selectedFood" ref="shopCart"></shop-cart>
    <food :food="selectSinfood" ref="foodCpt" @ball-move="_drop"></food>
  </div>
</template>

<script>
import icon from '../icon/icon'
import BScroll from 'better-scroll'
import ShopCart from '../shopCart/shopCart'
import cartControl from '../cartControl/cartControl'
import food from '../food/food'
export default {
  components: {
    icon,
    ShopCart,
    cartControl,
    food
  },
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      scrollY: 0,
      listHeight: [],
      selectSinfood: {}
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length - 1; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (this.scrollY + 5 >= height1 && this.scrollY + 5 < height2) {
          return i
        }
      }
      return 0
    },
    selectedFood () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created () {
    this.$http.get('/api/goods')
    .then((res) => {
      this.goods = res.data
      this.$nextTick(() => {
        this._initScroll()
        this.calcHeight()
      })
    }, (err) => {
      console.log(err)
    })
  },
  methods: {
    selectOption (index, event) {
      if (!event._constructed) {
        return
      }
      let foodlist = this.$refs.goodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodlist[index]
      this.goodsScroll.scrollToElement(el, 300)
    },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {click: true})
      this.goodsScroll = new BScroll(this.$refs.goodsWrapper, {
        click: true,
        probeType: 3
      })
      this.goodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    calcHeight () {
      let foodlist = this.$refs.goodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodlist.length; i++) {
        height += foodlist[i].clientHeight
        this.listHeight.push(height)
      }
    },
    _drop (el) {
      // 异步执行
      this.$nextTick(() => {
        this.$refs.shopCart.drop(el)
      })
    },
    seeDetail (food, event) {
      if (!event._constructed) {
        return
      }
      this.selectSinfood = food
      this.$refs.foodCpt.showFood()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goods {
  display: flex;
  position: absolute;
  top: 177px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
}
.menu-wrapper {
  flex: 0 0 80px;
  width: 80px;
  background: #f3f5f7;
  z-index: 1;
}
.menu-item {
  position: relative;
  display: table;
  width: 100%;
  height: 54px;
  padding: 0 12px;
  box-sizing: border-box;
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
  font-weight: 700;
  border: none;
}
.goods-wrapper {
  flex: 1;
  overflow: hidden;
  z-index: 1;
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
  position: relative;
  flex: 1;
  padding-top: 2px;
  overflow: hidden;
  white-space: nowrap;
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
.content .description {
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 12px;
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
.cart-control {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
