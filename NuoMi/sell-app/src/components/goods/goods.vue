<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="icon" v-if="item.type>0" :class=""></span>
          <span class="text">{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goods: {},
      classMap: []
    }
  },
  created () {
    this.$http.get('/api/goods')
    .then((res) => {
      this.goods = res.data
    }, (err) => {
      console.log(err)
    })
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
}
.menu-wrapper {
  flex: 0 0 80px;
  background: #f3f5f7;
  padding: 0 12px;
}
.menu-item {
  display: table;
  width: 100%;
  height: 54px;
}
.menu-item .text {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.goods-wrapper {
  
}
.decrease {
  background: url('./decrease_2@2x.png') no-repeat;
  background-size: 100% 100%;
}
.discount {
  background: url('./discount_2@2x.png') no-repeat;
  background-size: 100% 100%;
}
.special {
  background: url('./special_2@2x.png') no-repeat;
  background-size: 100% 100%;
}
.invoice {
  background: url('./invoice_2@2x.png') no-repeat;
  background-size: 100% 100%;
}
.guarantee {
  background: url('./guarantee_2@2x.png') no-repeat;
  background-size: 100% 100%;
}
</style>
