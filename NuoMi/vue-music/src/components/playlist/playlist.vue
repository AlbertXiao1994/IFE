<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="modeIcon" @click="toggleMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="clearAll"><i class="icon-clear"></i></span>
          </h1>
        </div>
        <scroll ref="listContent" class="list-content" :data="sequenceList">
          <transition-group ref="list" name="list" tag="ul">
            <li :key="song.id" class="item" v-for="(song,index) in sequenceList" @click="selectItem(song, index)">
              <i class="current" :class="getCurrentPlay(song)"></i>
              <span class="text" v-html="song.name"></span>
              <span class="like" @click.stop="toggleFavorite(song)">
                <i :class="getFavoriteIcon(song)"></i>
              </span>
              <span class="delete" @click.stop="deleteOne(song)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div class="add" @click="addSong">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
      <confirm ref="confirm" text="是否清空播放列表" confirmBtnText="清空" @confirm="onConfirm"></confirm>
      <add-song ref="addSong"></add-song>
    </div>
  </transition>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import {mapGetters, mapActions} from 'vuex'
  import Confirm from 'base/confirm/confirm'
  import {playMode} from 'common/js/config'
  import {playModeMixin, favoriteMixin} from 'common/js/mixin'
  import AddSong from 'components/add-song/add-song'

  export default {
    mixins: [playModeMixin, favoriteMixin],
    components: {
      Scroll,
      Confirm,
      AddSong
    },
    computed: {
      ...mapGetters([
        'currentSong',
        'mode',
        'playList'
      ]),
      modeText() {
        return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.random ? '随机播放' : '单曲循环'
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    watch: {
      currentSong(newSong, oldSong) {
        if (!this.showFlag && newSong.id === oldSong.id) {
          return
        }
        setTimeout(() => {
          this.scrollTocurrent(newSong)
        }, 20)
      }
    },
    methods: {
      show() {
        this.showFlag = true
        setTimeout(() => {
          this.$refs.listContent.refresh()
          this.scrollTocurrent(this.currentSong)
        }, 20)
      },
      hide() {
        this.showFlag = false
      },
      getCurrentPlay(song) {
        if (song.id === this.currentSong.id) {
          return 'icon-play'
        } else {
          return ''
        }
      },
      scrollTocurrent(song) {
        let index = this.sequenceList.findIndex((item) => {
          return item.id === song.id
        })
        this.$refs.listContent.scrollToElement(this.$refs.list.$el.children[index], 300)
      },
      deleteOne(song) {
        this.deleteSong(song)
        if (!this.sequenceList.length) {
          this.hide()
        }
      },
      clearAll() {
        this.$refs.confirm.show()
      },
      selectItem(song, index) {
        if (this.mode === playMode.random) {
          index = this.playList.findIndex((item) => {
            return item.id === song.id
          })
        }
        this.setCurrentIndex(index)
        this.setPlayingState(true)
      },
      onConfirm() {
        this.clearSong()
        this.hide()
      },
      addSong() {
        this.$refs.addSong.show()
      },
      ...mapActions([
        'deleteSong',
        'clearSong'
      ])
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/sass/variable";
  @import "~common/sass/mixin";

  .playlist {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 200;
    background-color: $color-background-d;
    &.list-fade-enter-active, &.list-fade-leave-active {
      transition: opacity 0.3s;
      .list-wrapper {
        transition: all 0.3s;
      }
    }
    &.list-fade-enter, &.list-fade-leave-to {
      opacity: 0;
      .list-wrapper {
        transform: translate3d(0, 100%, 0);
      }
    }
    .list-wrapper {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: $color-highlight-background;
      .list-header {
        position: relative;
        padding: 20px 30px 10px 20px;
        .title {
          display: flex;
          align-items: center;
          .icon {
            margin-right: 10px;
            font-size: 30px;
            color: $color-theme-d;
          }
          .text {
            flex: 1;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
          .clear {
            @include extend-click();
            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-d;
            }
          }
        }
      }
      .list-content {
        max-height: 240px;
        overflow: hidden;
        .item {
          display: flex;
          align-items: center;
          height: 40px;
          padding: 0 30px 0 20px;
          overflow: hidden;
          &.list-enter-active, &.list-leave-active {
            transition: all 0.1s;
          }
          &.list-enter, &.list-leave-to {
            height: 0;
          }
          .current {
            flex: 0 0 20px;
            width: 20px;
            font-size: $font-size-small;
            color: $color-theme-d;
          }
          .text {
            flex: 1;
            @include no-wrap();
            font-size: $font-size-medium;
            color: $color-text-d;
          }
          .like {
            @include extend-click();
            margin-right: 15px;
            font-size: $font-size-small;
            color: $color-theme;
            .icon-favorite {
              color: $color-sub-theme;
            }
          }
          .delete {
            @include extend-click();
            font-size: $font-size-small;
            color: $color-theme;
          }
        }
      }
      .list-operate {
        width: 140px;
        margin: 20px auto 30px auto;
        .add {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          border: 1px solid $color-text-l;
          border-radius: 100px;
          color: $color-text-l;
          .icon-add {
            margin-right: 5px;
            font-size: $font-size-small-s;
          }
          .text {
            font-size: $font-size-small;
          }
        }
      }
      .list-close {
        text-align: center;
        line-height: 50px;
        background: $color-background;
        font-size: $font-size-medium-x;
        color: $color-text-l;
      }
    }
  }
</style>