<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box placeholder="搜索歌曲" @query="queryChange" ref="searchBox"></search-box>
      </div>
      <div class="shortcut" v-show="!query">
        <switches :switches="switches" :currentIndex="currentIndex" @select="toggleIndex"></switches>
        <div class="list-wrapper">
          <scroll class="list-scroll" :data="playHistory" v-show="currentIndex===0" ref="songList">
            <div class="list-inner">
              <song-list :songs="playHistory" @select="selectFromPlay"></song-list>
            </div>
          </scroll>
          <scroll class="list-scroll" :data="searchHistory" v-show="currentIndex===1" ref="searchList">
            <div class="list-inner">
              <search-list :history="searchHistory" @select="addQuery" @delete="deleteSearchHistory"></search-list>
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <suggest :query="query" @listScroll="blurInput" ref="suggest" @select="selectFromSuggest" :showSinger="showSinger"></suggest>
      </div>
      <top-tip ref="topTip">
        <div class="tip-title">
          <i class="icon-ok"></i>
          <span class="text">1首歌曲已经添加到播放列表</span>
        </div>
      </top-tip>
    </div>
  </transition>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Suggest from 'components/suggest/suggest'
  import SearchBox from 'base/search-box/search-box'
  import {searchMixin} from 'common/js/mixin'
  import SearchList from 'base/search-list/search-list'
  import SongList from 'base/song-list/song-list'
  import {mapGetters, mapActions} from 'vuex'
  import Switches from 'base/switches/switches'
  import TopTip from 'base/top-tip/top-tip'
  import Song from 'common/js/song'

  export default {
    mixins: [searchMixin],
    components: {
      Scroll,
      Suggest,
      SearchBox,
      SearchList,
      SongList,
      Switches,
      TopTip
    },
    computed: {
      ...mapGetters([
        'playHistory'
      ])
    },
    data() {
      return {
        showFlag: false,
        showSinger: false,
        switches: [
          {name: '播放历史'},
          {name: '搜索历史'}
        ],
        currentIndex: 0
      }
    },
    methods: {
      show() {
        this.showFlag = true
        setTimeout(() => {
          if (this.currentIndex === 0) {
            this.$refs.songList.refresh()
          } else {
            this.$refs.searchList.refresh()
          }
        }, 20)
      },
      hide() {
        this.showFlag = false
      },
      toggleIndex(index) {
        this.currentIndex = index
      },
      selectFromSuggest(song) {
        this.$refs.topTip.show()
        this.saveSearchHistory(this.query)
      },
      selectFromPlay(song, index) {
        if (index !== 0) {
          this.insertSong(new Song(song))
          this.$refs.topTip.show()
        }
      },
      ...mapActions([
        'insertSong'
      ])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="sheetstyle/scss" scoped>
  @import "~common/sass/variable";
  @import "~common/sass/mixin";

  .add-song {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 200;
    background: $color-background;
    &.slide-enter-active, &.slide-leave-active {
      transition: all 0.3s;
    }
    &.slide-enter, &.slide-leave-to {
      transform: translate3d(100%, 0, 0);
    }
    .header {
      position: relative;
      height: 44px;
      text-align: center;
      .title {
        line-height: 44px;
        font-size: $font-size-large;
        color: $color-text;
      }
      .close {
        position: absolute;
        top: 0;
        right: 8px;
        .icon-close {
          display: block;
          padding: 12px;
          font-size: 20px;
          color: $color-theme;
        }
      }
    }
    .search-box-wrapper {
      margin: 20px;
    }
    .shortcut {
      .list-wrapper {
        position: absolute;
        top: 165px;
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
    }
    .search-result {
      position: fixed;
      top: 124px;
      bottom: 0;
      width: 100%;
    }
    .tip-title {
      text-align: center;
      padding: 18px 0;
      font-size: 0;
      .icon-ok {
        font-size: $font-size-medium;
        color: $color-theme;
        margin-right: 4px;
      }
      .text {
        font-size: $font-size-medium;
        color: $color-text;
      }
    }
  }
</style>