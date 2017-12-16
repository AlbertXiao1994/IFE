<template>
  <div class="rating" ref="ratingWrapper">
    <div class="rating-content">
      <div class="rating-header">
        <div class="header-left">
          <div class="score">{{ seller.score }}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
        </div>
        <div class="header-right">
          <div class="service-score">
            <span class="label">服务评分</span>
            <star class="star" :score="seller.serviceScore"></star>
          </div>
          <div class="food-score">
            <span class="label">食物评分</span>
            <star class="star" :score="seller.serviceScore"></star>
          </div>
          <div class="delivery-score">
            <span class="label">送达时间</span>
            <span class="time">{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <div class="split"></div>
      <rating-control  :ratingTypes="ratingTypes" :ratings="ratings"
        @on-change="updateState"></rating-control>
      <div class="rating-list">
        <ul>
          <li v-for="rating in ratings" class="rating-item" v-show="(allFlag&&(!contentFlag||rating.text))||(rating.rateType==selectedType&&(!contentFlag||rating.text))">
            <div class="line-one">
              <div class="avatar">
                <img :src="rating.avatar">
              </div>
              <div class="user">
                <div class="username">{{ rating.username }}</div>
                <div class="score">{{ rating.score }}<span class="time" v-if="rating.deliveryTime">{{ rating.deliveryTime }}分钟送达</span></div>
              </div>
              <span class="rating-time">{{ rating.rateTime | formateTime }}
              </span>
            </div>
            <div class="line-two">
              <p class="rating-text">{{ rating.text }}</p>
            </div>
            <div class="line-three">
                <span class="icon-thumb_up" v-if="rating.rateType==0"></span>
                <span class="icon-thumb_down" v-if="rating.rateType==1">
                </span>
                <span class="recommend" v-for="(item,index) in rating.recommend" v-if="item&&index<3">{{ item }}</span>
            </div>
          </li>
        </ul>
      </div>   
    </div>
  </div>
</template>

<script>
import star from '../star/star'
import ratingControl from '../ratingControl/ratingControl'
import BScroll from 'better-scroll'
import {formateDate} from '@/common/js/date.js'
export default {
  components: {
    star,
    ratingControl
  },
  props: {
    seller: {
      type: Object,
      default: {}
    }
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
  filters: {
    formateTime (time) {
      let date = new Date(time)
      return formateDate(date, 'yyyy-MM-dd hh:mm')
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
      this.ratingScroll = new BScroll(this.$refs.ratingWrapper, {click: true})
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
  position: absolute;
  top: 177px;
  bottom: 0;
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
.rating .rating-content {
  width: 100%;
}
.rating-content .rating-header {
  display: flex;
  padding: 18px 0;
}
.header-left {
  flex: 0 0 137px;
  text-align: center;
  border-right: 1px solid rgba(7,17,27,0.1);
}
.header-left .score {
  font-size: 24px;
  color: rgb(255,153,0);
  line-height: 28px;
  margin-bottom: 6px;
}
.header-left .title {
  font-size: 12px;
  color: rgb(7,17,27);
  line-height: 12px;
  margin-bottom: 8px;
}
.header-left .rank {
  font-size: 10px;
  color: rgb(147,153,159);
  line-height: 10px;
  margin-bottom: 6px;
}
.header-right {
  flex: 1;
  padding-left: 24px;
}
.header-right .label {
  font-size: 12px;
  color: rgb(7,17,27);
  line-height: 18px;
}
.header-right .service-score,.food-score {
  margin-bottom: 8px;
}
.header-right .star {
  display: inline-block;
  padding-left: 12px;
}
.delivery-score .time {
  display: inline-block;
  padding-left: 12px;
  font-size: 12px;
  color: rgb(147,153,159);
  line-height: 18px;
}
.rating-list {
  padding: 0 18px;
}
.rating-item {
  position: relative;
  display: block;
  padding: 18px 0;
  border-bottom: 1px solid rgba(7,17,27,0.1);
}
 .rating-item .line-one {
  position: relative;
  height: 28px;
}
.rating-item .line-two {
  margin-top: 6px;
}
.rating-item .line-three {
  margin-top: 6px;
  padding-left: 40px;
}
.user {
  position: absolute;
  left: 40px;
  top: 0;
}
.user .score {
  margin-top: 4px;
  font-size: 10px;
  color: rgb(255,153,0);
  line-height: 12px;
}
.score .time {
  display: inline-block;
  margin-left: 6px;
  font-size: 10px;
  font-weight: 200;
  color: rgb(147,153,159);
  line-height: 12px;
}
.rating-content .avatar {
  position: absolute;
  left: 0;
  top: 0;
}
.avatar img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}
.rating-time,.username {
  font-size: 10px;
  color: rgb(7,17,27);
  line-height: 12px;
}
.rating-time {
  position: absolute;
  right: 0;
  top: 0;
  color: rgb(147,153,159);
}
.rating-text {
  padding-left: 40px;
  font-size: 12px;
  color: rgb(7,17,27);
  line-height: 18px;
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
.recommend {
  display: inline-block;
  max-width: 50px;
  height: 16px;
  font-size: 9px;
  color: rgb(147,153,159);
  line-height: 16px;
  margin-right: 8px;
  padding: 0 6px;
  border: 1px solid rgba(7,17,27,0.1);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
