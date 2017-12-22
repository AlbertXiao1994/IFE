<template>
  <div class="recommend">
    <div class="slider-wrapper" v-if="recommends.length">
      <slider>
        <div v-for="item in recommends">
          <a :href="item.linkUrl">
            <img :src="item.picUrl">
          </a>
        </div>
      </slider>
    </div>
  </div>
</template>

<script>
  import {getRecommend} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import Slider from 'base/slider/slider'

  export default {
    components: {
      Slider
    },
    created () {
      this._getRecommend()
    },
    data() {
      return {
        recommends: {}
      }
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        }, (err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">

</style>