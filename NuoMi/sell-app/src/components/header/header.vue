<template>
  <div class="header">
    <div class="header-wrapper">
      <!-- 商家头像 -->
      <div class="avatar">
        <img :src="msg.avatar">
      </div>
      <!-- 详细信息 -->
      <div class="detail">
        <div class="name">
          <span class="brand"></span>
          <span>{{ msg.name }}</span>
        </div>
        <div class="description">{{ msg.description }}/{{ msg.deliveryTime }}分钟</div>
        <div class="supports" v-if="msg.supports">
          <span class="spt-icon"></span>
          <span class="spt-des">{{ msg.supports[0].description }}</span>
        </div>
        <div class="supports-count" v-if="msg.supports" @click="showMore">
          <span class="count">{{ msg.supports.length }}个</span>
          <span class="icon icon-keyboard_arrow_right"></span>
        </div>
      </div>
      <!-- 公告 -->
      <div class="bulletin" @click="showMore">
        <span class="bulletin-icon"></span><span class="bulletin-text">{{ msg.bulletin }}</span>
        <span class="icon icon-keyboard_arrow_right"></span>
      </div>
      <div class="background">
        <img :src="msg.avatar" width="100%" height="100%">
      </div>
    </div>
    <div class="more" v-if="isShow">
        <div class="more-wrapper clearfix">
          <div class="more-main">
            <h1 class="name">{{ msg.name }}</h1>
            <div class="star-wrapper">
              <star :score="msg.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports-info" v-if="msg.supports">
              <li class="info-item" v-for="item in msg.supports">
                <!-- <span class="icon" :class="classMap[item.type]"></span> -->
                <icon :type="item.type"></icon>
                <span class="text">{{ item.description }}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin-content">{{ msg.bulletin }}</div>
          </div>
        </div>
        <div class="icon-close" @click="closeMore"></div>
    </div>
  </div>
</template>

<script>
import star from '../star/star'
import icon from '../icon/icon'
export default {
  components: {
    star,
    icon
  },
  props: {
    msg: {
      type: Object
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  data () {
    return {
      seller: {},
      isShow: false,
      classMap: []
    }
  },
  methods: {
    showMore () {
      this.isShow = true
    },
    closeMore () {
      this.isShow = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  position: relative;
  background: rgba(7,17,27,0.5);
  overflow: hidden;
}
.header-wrapper {
  position: relative;
  width: 100%;
  padding-top: 24px;
  color: rgb(255,255,255);
  text-align: left;
}
.avatar {
  display: inline-block;
  margin-left: left;
  margin-left: 24px;
  vertical-align: top;
}
.avatar img {
  display: inline-block;
  width: 64px;
  height: 64px;
  border-radius: 4px;
}
.detail {
  display: inline-block;
  margin-left: 16px;
  margin-top: 2px;
  font-size: 0;
}
.name {
  font-size: 18px;
  font-weight: bold;
  line-height: 18px;
}
.brand {
  display: inline-block;
  width: 30px;
  height: 18px;
  background-image: url('./brand@2x.png');
  background-size: 100% 100%;
  margin-right: 6px;
}
.description,.supports {
  color: rgb(255,255,255);
  font-weight: 200;
  line-height: 12px;
}
.description {
  position: relative;
  font-size: 12px;
  margin-top: 8px;
}
.supports{
  font-size: 10px;
  margin-top: 10px;
}
.spt-icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  background-image: url('./decrease_2@2x.png');
  background-size: 100% 100%;
  margin-right: 4px;
}
.supports-count {
  box-sizing: border-box;
  position: absolute;
  right: 12px;
  bottom: 46px;
  box-sizing: border-box;
  width: 50px;
  height: 24px;
  padding: 7px 8px;
  border-radius: 12px;
  background-color: rgba(0,0,0,0.2);
  font-size: 0;
}
.count {
  display: inline-block;
  font-size: 10px;
  font-weight: 200;
}
.icon-keyboard_arrow_right {
  display: inline-block;
  font-size: 10px;
  margin-left: 2px;
  color: #fff;
}
.bulletin {
  position: relative;
  margin-top: 18px;
  height: 28px;
  padding: 0 22px 0 12px;
  line-height: 28px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: rgba(7,17,27,0.2);
}
.bulletin-text {
  font-size: 10px;
  font-weight: 200;
  margin-left: 4px;
  margin-top: 8px;
  vertical-align: top;
}
.bulletin-icon {
  display: inline-block;
  width: 22px;
  height: 12px;
  background-image: url('./bulletin@2x.png');
  background-size: 100% 100%;
}
.bulletin .icon-keyboard_arrow_right {
  position: absolute;
  top: 7px;
  right: 12px;
  font-size: 10px;
}
.background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  filter: blur(10px);
}
.header .more {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(7,17,27,0.8);
  z-index: 200;
  overflow: auto;
}
.more-wrapper {
  min-height: 100%;
  width: 100%;
  z-index: 200;
}
.more-main {
  margin-top: 64px;
  padding-bottom: 64px;
  margin-left: 36px;
  margin-right: 36px;
  z-index: 200;
  color: #fff;
}
.more-main .name {
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  text-align: center;
}
.icon-close {
  position: relative;
  width: 32px;
  height: 32px;
  font-size: 32px;
  color: rgba(255,255,255,0.5);
  margin: -64px auto 0 auto;
  clear: both;
  z-index: 100;
}
.star-wrapper {
  width: 100%;
  text-align: center;
  margin-top: 16px;
}
.title {
  display: flex;
  width: 100%;
  margin: 28px auto 24px auto;
}
.title .line {
  position: relative;
  top: -6px;
  flex: 1;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}
.title .text {
  font-size: 14px;
  color: #fff;
  font-weight: 700;
  line-height: 14px;
  padding: 0 12px;
}
.supports-info .info-item {
  display: block;
  padding: 0 12px;
  margin-bottom: 12px;
  font-size: 0;
}
.supports-info .info-item:last-child {
  margin-bottom: 0;
}
.info-item .icon {
  display: inline-block;
  width: 16px;
  height: 16px;
}
.info-item .text {
  font-size: 12px;
  line-height: 16px;
  font-weight: 200;
  margin-left: 6px;
  vertical-align: top;
}
.bulletin-content {
  padding: 0 12px;
  font-size: 14px;
  font-weight: 200;
  line-height: 24px; 
}
</style>
