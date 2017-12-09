<template>
  <div class="header">
    <div class="header-wrapper">
      <!-- 商家头像 -->
      <div class="avatar">
        <img width='64' height="64" :src="msg.avatar">
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
      <div class="more" v-if="isShow">
        <div class="more-wrapper clearfix">
          <div class="more-main">
            <h1 class="name">{{ msg.name }}</h1>
          </div>
        </div>
        <div class="icon-close" @click="closeMore"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: Object
    }
  },
  data () {
    return {
      seller: {},
      isShow: false
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
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.header {
  position: relative;
  background: rgba(7,17,27,0.5);
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
  background-image: url('./decrease_1@2x.png');
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
  box-sizing: border-box;
  margin-top: 18px;
  width: 100%;
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
.more {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(7,17,27,0.8);
  z-index: 10;
  overflow: auto;
}
.more-wrapper {
  min-height: 100%;
  width: 100%;
}
.more-main {
  margin-top: 64px;
  padding-bottom: 64px;
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
}
</style>
