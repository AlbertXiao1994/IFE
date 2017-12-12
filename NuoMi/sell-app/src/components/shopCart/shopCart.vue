<template>
  <div class="shopCart">
    <div class="left-wrapper">
      <div class="logo-wrapper">
        <div class="logo" :class="{active: totalPrice}">
          <span class="icon-shopping_cart" :class="{active: totalPrice}"></span>
        </div>
        <div class="badge" v-show="totalCount">
          <span class="num">{{ totalCount }}</span>
        </div>
      </div>
      <div class="price" :class="{active: totalPrice}">¥{{ totalPrice }}</div>
      <div class="extra-price">另需配送费¥{{ deliveryPrice }}</div>
    </div>
    <div class="right-wrapper" :class="{enough: totalPrice>=minPrice}">{{ payDes }}</div>
    <div class="ball-wrapper">
      <div class="ball" v-for="ball in balls" v-show="ball.show"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedFood: {
      type: Array,
      default () {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 20
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectedFood.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectedFood.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDes () {
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差¥${diff}起送`
      } else {
        return '去结算'
      }
    }
  },
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shopCart {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 48px;
  z-index: 5;
}
.left-wrapper {
  flex: 1;
  background: #141c27;
  font-size: 0;
}
.right-wrapper {
  flex: 0 0 105px;
  width: 105px;
  background: #2b343b;
}
.logo-wrapper {
  display: inline-block;
  position: relative;
  top: -10px;
  margin-left: 12px;
  padding: 6px;
  background: #141c27;
  width: 58px;
  height: 58px;
  box-sizing: border-box;
  border-radius: 50%;
}
.logo-wrapper .logo {
  width: 100%;
  height: 100%;
  background: #2b343d;
  border-radius: 50%;
  text-align: center;
}
.icon-shopping_cart {
  color: #808589;
  font-size: 24px;
  line-height: 44px;
}
.logo-wrapper .badge {
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 16px;
  border-radius: 6px;
  background: rgb(240,20,20);
  text-align: center;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
}
.badge .num {
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  line-height: 16px;
}
.logo-wrapper .active {
  background: rgb(0,160,220);
}
.left-wrapper .price,.extra-price {
  display: inline-block;
  color: #808589;
  font-size: 16px;
  line-height: 24px;
  margin-top: 12px;
  vertical-align: top;
}
.left-wrapper .price {
  font-weight: 700;
  margin-left: 12px;
  padding-right: 12px;
  border-right: 1px solid rgba(255,255,255,0.1);
}
.left-wrapper .extra-price {
  margin-left:  12px;
}
.left-wrapper .active {
  color: #fff;
}
.right-wrapper {
  font-size: 12px;
  color: #808589;
  font-weight: 700;
  line-height: 48px;
  text-align: center;
}
.shopCart .enough {
  color: #fff;
  background: #11B33C;
}
.ball-wrapper {
  position: fixed;
  left: 32px;
  bottom: 22px;
}
.ball {
  width: 16px;
  height: 16px;
  background: rgb(0,160,220);
  border-radius: 50%;
}
</style>
