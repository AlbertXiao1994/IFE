<template>
  <transition name="slide">
    <div class="user-center" ref="userCenter">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches :switches="switches" :currentIndex="currentIndex" @select="toggleIndex"></switches>
      </div>
      <div ref="playBtn" class="play-btn" @click="randomPlayAll">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper">
        <scroll class="list-scroll" v-show="currentIndex===0" ref="playHistory">
          <div class="list-inner">
            <song-list :songs="playHistory" @select="selectFromPlay"></song-list>
          </div>
        </scroll>
        <scroll class="list-scroll" v-show="currentIndex===1" ref="favoriteList">
          <div class="list-inner">
            <song-list :songs="favoriteList" @select="selectFromPlay"></song-list>
          </div>
        </scroll>
      </div>
      <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="noResultDes"></no-result>
      </div>
    </div>
  </transition>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Switches from 'base/switches/switches'
  import {mapGetters, mapActions} from 'vuex'
  import SongList from 'base/song-list/song-list'
  import Song from 'common/js/song'
  import NoResult from 'base/no-result/no-result'
  import {playListMixin} from 'common/js/mixin'

  export default {
    mixins: [playListMixin],
    components: {
      Scroll,
      Switches,
      SongList,
      NoResult
    },
    computed: {
      ...mapGetters([
        'playHistory',
        'favoriteList'
      ]),
      noResult() {
        if (this.currentIndex === 0) {
          return !this.playHistory.length
        } else {
          return !this.favoriteList.length
        }
      },
      noResultDes() {
        if (this.currentIndex === 0) {
          return '没有最近播放歌曲'
        } else {
          return '暂无收藏歌曲'
        }
      }
    },
    data() {
      return {
        switches: [
          {name: '最近听的'},
          {name: '我喜欢的'}
        ],
        currentIndex: 0
      }
    },
    methods: {
      handlePlayList(playList) {
        let bottom = playList.length > 0 ? '60px' : 0
        this.$refs.userCenter.style.bottom = bottom
        this.$refs.playHistory && this.$refs.playHistory.refresh()
        this.$refs.favoriteList && this.$refs.favoriteList.refresh()
      },
      back() {
        this.$router.back()
      },
      toggleIndex(index) {
        this.currentIndex = index
      },
      selectFromPlay(song, index) {
        this.insertSong(new Song(song))
      },
      randomPlayAll() {
        let list = this.currentIndex === 0 ? this.playList : this.favoriteList
        if (list.length === 0) {
          return
        }
        list = list.map((song) => {
          return new Song(song)
        })
        this.randomPlay({
          list
        })
      },
      ...mapActions([
        'insertSong',
        'randomPlay'
      ])
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/sass/variable";

  .user-center {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    background: $color-background;
    &.slide-enter-active, &.slide-leave-active {
      transition: all 0.3s;
    }
    &.slide-enter, &.slide-leave-to {
      transform: translate3d(100%, 0, 0);
    }
    .back {
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 50;
      .icon-back {
        display: block;
        padding: 10px;
        font-size: $font-size-large-x;
        color: $color-theme;
      }
    }
    .switches-wrapper {
      margin: 10px 0 30px 0;
    }
    .play-btn {
      box-sizing: border-box;
      width: 135px;
      padding: 7px 0;
      margin: 0 auto;
      text-align: center;
      border: 1px solid  $color-text-l;
      color: $color-text-l;
      border-radius: 100px;
      font-size: 0;
      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }
    .list-wrapper {
      position: absolute;
      top: 110px;
      bottom: 0;
      width: 100%;
      .list-scroll {
        height: 100%;
        overflow: hidden;
        .list-inner {
          padding: 20px 30px;
        }
      }
    }
    .no-result-wrapper {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>