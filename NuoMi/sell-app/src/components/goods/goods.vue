<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul class="menu">
        <li v-for="(item,index) in goods" class="menu-item" 
        :class="{selected: index==selectIndex}" @click="selectOption(index)">
          <span class="text"><icon v-if="item.type>0" :type="item.type" class="icon"></icon>{{ item.name }}</span>
          <span class="line"></span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper">
      <ul>
        <li v-for="item in goods" class="food-list">
          <h1 class="header">{{ item.name }}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="description">{{ food.description }}</p>
                <div class=extra>
                  <span class="sellCount">月售{{ food.sellCount }}份</span>
                  <span class="rating">好评率{{ food.rating }}%</span>
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
    }, (err) => {
      console.log(err)
    })
  },
  methods: {
    selectOption (index) {
      this.selectIndex = index
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
  overflow: auto;
}
</style>
