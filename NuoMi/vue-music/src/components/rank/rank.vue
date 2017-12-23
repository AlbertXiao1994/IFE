<template>
  <div class="rank">
    <scroll class="toplist">
      <ul>
        <li class="item" v-for="list in topList">
          <div class="icon">
            <img v-lazy="list.pic_v12" width="100" height="100">
          </div>
          <ul class="songlist">
            <li class="song" v-for="(item,index) in list.songlist"
            v-if="index<3">
              <span>{{index+1}}</span>
              <span>{{item.songname}}-{{item.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getTopList} from 'api/rank'

  export default {
    components: {
      Scroll,
      Loading
    },
    data() {
      return {
        topList: []
      }
    },
    created() {
      this._getTopList()
    },
    methods: {
      _getTopList() {
        getTopList().then((res) => {
          this.topList = res[0].List
        }, (err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/sass/variable";
  @import "~common/sass/mixin";

  .rank {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .toplist {
      height: 100%;
      overflow: hidden;
      .item {
        display: flex;
        margin: 0 20px;
        padding-top: 20px;
        height: 100px;
        &:last-child {
          padding-bottom: 20px;
        }
        .icon {
          flex: 0 0 100px;
          width: 100px;
          height: 100px;
        }
        .songlist {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 20px;
          height: 100px;
          overflow: hidden;
          background: $color-highlight-background;
          color: $color-text-d;
          font-size: $font-size-small;
          .song {
            @include no-wrap();
            line-height: 26px;
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