<template>
  <div class="seller-wrapper" ref="sellerWrapper">
    <div class="seller-content">
      <div class="sell-header">
        <div class="line-one">
          <div class="title">{{ seller.name }}</div>
          <div class="rating">
            <star class="star" :score="seller.score"></star>
            <span>({{ seller.ratingCount }})</span>
            <span>{{ seller.sellCount }}</span>
          </div>
          <div class="collect">
            <span class="icon-favorite" @click="collectFlag=!collectFlag" :class="{active: collectFlag}"></span>
            <span v-if="!collectFlag">收藏</span>
            <span v-else>已收藏</span>
          </div>
        </div>
        <div class="line-two">
          <div class="des">
            <div class="label">起送价</div>
            <div class="value">{{ seller.minPrice }}<span class="dimension">元</span></div>
          </div>
          <div class="des">
            <div class="label">商家配送</div>
            <div class="value">{{ seller.deliveryPrice }}<span class="dimension">元</span></div>
          </div>
          <div class="des">
            <div class="label">平均配送时间</div>
            <div class="value">{{ seller.deliveryTime }}<span class="dimension">分钟</span></div>
          </div>
        </div>
      </div>
      <div class="split"></div>
      <div class="bul-act">
        <h1 class="title">公告与活动</h1>
        <div class="bul">{{ seller.bulletin }}</div>
        <ul>
          <li class="act-item" v-for="support in seller.supports">
            <icon :type="support.type"></icon>
            <span class="text">{{ support.description }}</span>
          </li>
        </ul>
      </div>
      <div class="split"></div>
      <div class="seller-imgs">
        <h1 class="title">商家实景</h1>
      </div>
      <div class="split"></div>
      <div class="seller-info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="item in seller.infos">
            <span class="text">{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../star/star'
import icon from '../icon/icon'
import BScroll from 'better-scroll'
export default {
  components: {
    star,
    icon
  },
  created () {
    this.$nextTick(() => {
      this.$http.get('/api/seller')
      .then((res) => {
        this.seller = res.data
      }, (err) => {
        console.log(err)
      })
      this.sellerScroll = new BScroll(this.$refs.sellerWrapper, {click: true})
    })
  },
  data () {
    return {
      seller: {},
      collectFlag: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.split {
  width: 100%;
  height: 16px;
  background: #f3f5f7;
  border-top: 1px solid rgba(7,17,27,0.1);
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.seller-wrapper {
  position: absolute;
  top: 177px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}
.seller-content .sell-header {
  padding: 0 18px;
}
.seller-content .title {
  font-size: 14px;
  font-weight: 700;
  color: rgb(7,17,27);
  line-height: 14px;
}
.line-one {
  position: relative;
  padding: 18px 0;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.line-two {
  display: flex;
  padding: 18px 0;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.line-one .rating {
  margin-top: 8px;
}
.rating .star {
  display: inline-block;
  padding-right: 8px;
}
.rating >span {
  display: inline-block;
  font-size: 10px;
  color: rgb(77,85,93);
  line-height: 20px;
  vertical-align: top;
}
.line-one .collect {
  position: absolute;
  right: 0;
  top: 18px;
  text-align: center;
}
.icon-favorite {
  display: block;
  font-size: 24px;
  color: #87B0F9;
  line-height: 24px;
}
.collect .active {
  color: rgb(240,20,20);
}
.line-two .des {
  flex: 1;
  text-align: center;
  border-right: 1px solid rgba(7,17,27,0.1);
}
.des:last-child {
  border: none;
}
.seller-content .bul-act {
  padding: 18px;
}
.bul-act .bul {
  margin-top: 8px;
  padding: 0 12px;
  font-size: 12px;
  font-weight: 200;
  color: rgb(240,20,20);
  line-height: 24px;
  margin-bottom: 16px;
}
.bul-act .act-item {
  display: block;
  padding: 16px 12px;
  border-top: 1px solid rgba(7,17,27,0.1);
}
.act-item,.info-item .text {
  font-size: 12px;
  font-weight: 200;
  color: rgb(7,17,27);
  line-height: 16px;
  vertical-align: top;
}
.seller-content .seller-imgs,.seller-info {
  padding: 18px;
}
.seller-info .info-item {
  display: block;
  padding: 16px 12px;
  border-top: 1px solid rgba(7,17,27,0.1);
}
</style>
