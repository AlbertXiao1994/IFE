<template>
  <div class="cartControl">
    <transition name="move">
      <div class="cart-des icon-remove_circle_outline" @click.stop.prevent="desCount" v-if="food.count>0"></div>
    </transition>
    <div class="cart-count" v-if="food.count>0">{{ food.count }}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCount"></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCount (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('ball-move', event.target)
    },
    desCount (event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cartControl {
  display: inline-block;
  font-size: 0;
}
.cart-des,.cart-add {
  display: inline-block;
  padding: 6px;
  font-size: 24px;
  line-height: 24px;
  color: rgb(0,160,220);
}
.move-enter-active,.move-leave-active {
  transition: all 0.5s linear;
  transform: translate3d(0,0,0);
  opacity: 1;
}
.move-enter,.move-leave-to {
  transform: translate3d(24px,0,0);
  opacity: 0;
}
.cart-count {
  display: inline-block;
  width: 12px;
  font-size: 10px;
  line-height: 36px;
  color: rgb(147,153,159);
  text-align: center;
  vertical-align: top;
}
</style>
