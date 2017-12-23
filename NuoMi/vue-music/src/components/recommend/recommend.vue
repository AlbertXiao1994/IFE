<template>
  <div class="recommend">
    <scroll class="recommend-content" ref="scroll" :data="playlists">
      <div>
        <div class="slider-wrapper" v-if="recommends.length">
          <slider :click="false">
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" @load="loadImg" class="needsClick">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="item in playlists">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.cover_url_small">
              </div>
              <div class="text">
                <h2 class="name">{{item.creator_info.nick}}</h2>
                <p class="desc">{{item.title}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container">
        <loading v-if="!playlists.length"></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import {getRecommend, getPlayList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'

  export default {
    components: {
      Slider,
      Scroll,
      Loading
    },
    created () {
      this._getRecommend()
      this._getPlatList()
    },
    data() {
      return {
        recommends: [],
        playlists: []
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
      },
      _getPlatList() {
        getPlayList().then((res) => {
          if (res.code === ERR_OK) {
            this.playlists = res.playlist.data.v_playlist
          }
        }, (err) => {
          console.log(err)
        })
      },
      loadImg() {
        if (!this.checkLoad) {
          this.$refs.scroll.refresh()
          this.checkLoad = true
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/sass/variable";

  .recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .recommend-content {
      height: 100%;
      overflow: hidden;
      .slider-wrapper {
        position: relative;
        width: 100%;
        overflow: hidden;
      }
      .recommend-list {
        .list-title {
          height: 65px;
          line-height: 65px;
          text-align: center;
          font-size: $font-size-medium;
          color: $color-theme;
        }
        .item {
          display: flex;
          box-sizing: border-box;
          align-items: center;
          padding: 0 20px 20px 20px;
          .icon {
            flex: 0 0 60px;
            width: 60px;
            padding-right: 20px;
          }
          .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            font-size: $font-size-medium;
            .name {
              margin-bottom: 10px;
              color: $color-text;
            }
            .desc {
              color: $color-text-d;
            }
          }
        }
      }
      .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>