<template>
  <div>
    <div class="header-wrapper">
      <div class="avatar">
        
      </div>
      <div class="content"></div>
      <div class="bullet"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      seller: {}
    }
  },
  // created () {
  //   this.$http.get('/api/seller')
  //   .then((res) => {

  //   },(err) => {
  //     console.log(err)
  //   })
  // }
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
</style>
