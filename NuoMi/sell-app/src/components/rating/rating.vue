<template>
  <div class="rating">
    <div class="rating-content" ref="ratingWrapper">
      <div class="rating-header">
      </div>
      <div class="split"></div>
      <rating-control  :ratingTypes="ratingTypes" :ratings="ratings"
        @on-change="updateState"></rating-control>
      <!-- <div class="rating-content">
          <ul>
            <li v-for="rating in food.ratings" class="rating-item" v-show="(allFlag&&(!contentFlag||rating.text))||(rating.rateType==selectedType&&(!contentFlag||rating.text))">
          <span class="rating-time">{{ rating.rateTime | formateTime }}</span>
          <div class="user">
            <span class="username">{{ rating.username }}</span>
            <div class="avatar">
              <img :src="rating.avatar"></img>
            </div>
          </div>
          <div class="text-wrapper">
            <span class="icon-thumb_up" v-if="rating.rateType==0"></span>
            <span class="icon-thumb_down" v-if="rating.rateType==1"></span>
            <span class="rating-text">{{ rating.text }}</span>
          </div>
            </li>
          </ul>
      </div>
 -->    </div>
  </div>
</template>

<script>
import ratingControl from '../ratingControl/ratingControl'
import BScroll from 'better-scroll'
export default {
  components: {
    ratingControl
  },
  data () {
    return {
      ratings: [],
      ratingTypes: [
        {
          name: '满意'
        },
        {
          name: '不满意'
        }
      ],
      selectedType: '',
      contentFlag: false,
      allFlag: true
    }
  },
  created () {
    this.$nextTick(() => {
      this.$http.get('/api/ratings')
      .then((res) => {
        this.ratings = res.data
      }, (err) => {
        console.log(err)
      })
      this.scroll = new BScroll(this.$refs.ratingWrapper, {click: true})
    })
  },
  methods: {
    updateState (obj) {
      this.selectedType = obj.selectedType
      this.allFlag = obj.allFlag
      this.contentFlag = obj.contentFlag
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rating {
  display: flex;
  position: absolute;
  top: 177px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
}
.split {
  width: 100%;
  height: 16px;
  background: #f3f5f7;
  border-top: 1px solid rgba(7,17,27,0.1);
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.rating-content {
  padding: 0 18px;
}
.rating-item {
  position: relative;
  display: block;
  padding: 16px 0;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
.user {
  position: absolute;
  right: 0;
  top: 16px;
}
.avatar {
  display: inline-block;
}
.avatar img {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.rating-time,.username {
  font-size: 10px;
  color: rgb(147,153,159);
  line-height: 12px;
}
.text-wrapper {
  margin-top: 6px;
}
.rating-text {
  font-size: 12px;
  color: rgb(7,17,27);
  line-height: 24px;
}
.icon-thumb_up {
  font-size: 12px;
  line-height: 24px;
  color: rgb(0,160,220);
}
.icon-thumb_down {
  font-size: 12px;
  line-height: 24px;
  color: rgb(147,153,159);
}
</style>
