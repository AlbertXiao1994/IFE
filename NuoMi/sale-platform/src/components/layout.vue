<template>
  <div @click="resetComponent">
    <div class="app-head">
      <div class="app-head-inner">
        <router-link :to="{path: '/'}">
          <img src="../assets/logo.png">
        </router-link>
        <div class="head-nav">
          <ul class="nav-list">
            <li> {{ username }}</li>
            <li class="nav-pile" v-if="!username==''">|</li>
            <li v-if="!username==''" @click="quit">退出</li>
            <li @click="openDialog('isShowLogDialog')" v-if="username==''">登录</li>
            <li class="nav-pile" v-if="username==''">|</li>
            <li @click="openDialog('isShowRegDialog')" v-if="username==''">注册</li>
            <li class="nav-pile">|</li>
            <li @click="openDialog('isShowAboutDialog')">关于</li>
          </ul>
        </div>  
      </div>
    </div>
    <div class="app-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="app-foot">
      <p>© 2017 Albert MIT</p>
    </div>
    <!-- 登录 -->
    <my-dialog @on-close="closeDialog('isShowLogDialog')" :isShow="isShowLogDialog">
      <log-form @has-log="onSuccessLogin"></log-form>
    </my-dialog>
    <!-- 注册 -->
    <my-dialog @on-close="closeDialog('isShowRegDialog')" :isShow="isShowRegDialog">
      <reg-form></reg-form>
    </my-dialog>
    <!-- 关于 -->
    <my-dialog @on-close="closeDialog('isShowAboutDialog')" :isShow="isShowAboutDialog">
      <p>本网站是我跟着慕课网《带你入门Vue2.0开发》课程做的，主要学习Vue在项目开发中的作用，在听课与源码的基础上，所有js代码都过了一遍，使用vue-cli搭建脚手架项目，使用vue-router设置路由，vue-resource调用封装好的ajax方法，使用json-server模拟数据接口，编写布局、轮播线性、登录-注册、模态框等组件，熟悉模块化开发，而HTML和CSS部分没太多关注，收获颇丰，熟悉了单页面开发</p>
    </my-dialog>
  </div>
</template>

<script>
import Dialog from './base/dialog'
import logForm from './logForm'
import regForm from './regForm'
import { eventBus } from '../../eventBus'
export default {
  name: 'Layout',
  components: {
    myDialog: Dialog,
    logForm,
    regForm
  },
  data () {
    return {
      isShowLogDialog: false,
      isShowRegDialog: false,
      isShowAboutDialog: false,
      username: ''
    }
  },
  methods: {
    openDialog (attr) {
      this[attr]=true
    },
    closeDialog (attr) {
      this[attr]=false
    },
    onSuccessLogin (data) {
      this.closeDialog('isShowLogDialog')
      this.username=data.username
    },
    quit () {
      this.username=''
    },
    resetComponent () {
      eventBus.$emit('reset-component')
    }
  }
}
</script>

<style>
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
body {
  background: #f0f2f5;
  font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
  font-size: 14px;
  color: #444;
}
.app-head {
  background: #363636;
  color: #b2b2b2;
  height: 90px;
  line-height: 90px;
  width: 100%;
}
.app-head-inner {
  width: 1200px;
  margin: 0 auto;
}
.head-logo {
  float: left;
}
.app-head-inner img {
  width: 50px;
  margin-top: 20px;
}
.head-nav {
  float: right;
}
.head-nav ul {
  overflow: hidden;
}
.head-nav li {
  cursor: pointer;
  float: left;
}
.nav-pile {
  padding: 0 10px;
}
.app-foot {
  text-align: center;
  height: 80px;
  width: 100%;
  line-height: 80px;
  background: #e3e4e8;
  clear: both;
  margin-top: 30px;
}
.app-content {
  width: 1200px;
  margin: 0 auto;
}
.hr {
  height: 1px;
  width: 100%;
  background: #ddd;
}
.button {
  background: #4fc08d;
  color: #fff;
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
}
.button:hover {
  background: #4fc08d;
}
.g-form {

}
.g-form-line {
  padding: 15px 0;
}
.g-form-label {
  width: 100px;
  font-size: 16px;
  display: inline-block;
}
.g-form-input {
  display: inline-block;
}
.g-form-input input {
  height: 30px;
  width: 200px;
  line-height: 30px;
  vertical-align: middle;
  padding: 0 10px;
  border: 1px solid #ccc;
}
.g-form-btn {
  padding-left: 100px;
}
.g-form-error {
  color: red;
  padding-left: 15px;
}
</style>
