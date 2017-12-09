<template>
  <div>
    <div class="header-wrapper">
      <!-- 商家头像 -->
      <div class="avatar">
        <img width='64' height="64" :src="seller.avatar"></div>
      </div>
      <!-- 详细信息 -->
      <div class="detail">
        <div class="name"></div>
        <div class="description"></div>
        <div class="supports"></div>
      </div>
      <!-- 公告 -->
      <div class="bulletin"></div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.$http.get('/api/seller')
    .then((res) => {
      this.seller = res.data
    }, (err) => {
      console.log(err)
    })
  },
  data () {
    return {
      seller: {}
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
.header-wrapper {
  position: relative;
  width: 100%;
  height: 126px;
  background-color: #000;
  color: rgb(255,255,255);
}
.avatar {
  position: absolute;
  left: 24px;
  top: 24px;
}
</style>
