<template>
  <scroll class="listview"
          :data="data"
          @scroll="scroll"
          :probeType="probeType"
          :listen-scroll="listenScroll"
          ref="listview">
    <ul>
      <li class="list-group" v-for="group in data" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <uL>
          <li class="list-group-item" v-for="item in group.items" @click="selectItem(item)">
            <img class="avatar" v-lazy="item.avatar_s">
            <span class="name" v-html="item.name"></span>
          </li>
        </uL>
      </li>
    </ul>
    <div class="list-shortcut" 
        @touchstart.stop.prevent="shortcutToggle"
        @touchmove.stop.prevent="stcToggleMove"
        @touchend.stop>
      <ul>
        <li v-for="(item, index) in shortcutList" class="item"
            :class="{'current':currentIndex===index}" :data-index="index">{{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" ref="topFixed" v-show="scrollY<0">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
    <div class="loading-container">
      <loading v-if="!data.length"></loading>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getAttr} from 'common/js/dom'

  const AHCHOR_HEIGHT = 18
  const TITLE_HEIGHT = 30

  export default {
    components: {
      Scroll,
      Loading
    },
    props: {
      data: {
        type: Array,
        default: null
      }
    },
    computed: {
      shortcutList() {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      fixedTitle() {
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    created() {
      this.listHeight = []
      this.touch = {}
      this.listenScroll = true
      this.probeType = 3
    },
    data() {
      return {
        currentIndex: 0,
        scrollY: -1,
        diff: -1
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calListHeight()
        }, 20)
      },
      scrollY(newY) {
        // 当滚到顶部
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        // 当在中部
        for (let i = 0; i < this.listHeight.length - 2; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
        }
        // 当在底部
        this.currentIndex = this.listHeight.length - 2
      },
      diff(newVal) {
        let offset = (newVal < TITLE_HEIGHT && newVal > 0) ? TITLE_HEIGHT - newVal : 0
        if (this.offset === offset) {
          return
        }
        this.offset = offset
        this.$refs.topFixed.style.transform = `translate3d(0,${-offset}px,0)`
      }
    },
    methods: {
      shortcutToggle(e) {
        let anchorIndex = getAttr(e.target, 'index')
        anchorIndex = parseInt(anchorIndex)
        this.currentIndex = anchorIndex
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
      },
      stcToggleMove(e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / AHCHOR_HEIGHT | 0
        let anchorIndex = this.touch.anchorIndex + delta
        this._scrollTo(anchorIndex)
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      refresh() {
        this.$refs.listview.refresh()
      },
      _scrollTo(index) {
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.currentIndex = index
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 400)
      },
      _calListHeight() {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          height += list[i].clientHeight
          this.listHeight.push(height)
        }
      },
      selectItem(item) {
        this.$emit('select', item)
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/sass/variable";

  .listview {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $color-background;
    .list-group {
      padding-bottom: 30px;
      .list-group-title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
        background: $color-highlight-background;
      }
      .list-group-item {
        display: flex;
        align-items: center;
        padding: 20px 0 0 30px;
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .name {
          margin-left: 20px;
          color: $color-text-l;
          font-size: $font-size-medium;
        }
      }
    }
    .list-shortcut {
      position: absolute;
      z-index: 30;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      padding: 20px 0;
      border-radius: 10px;
      text-align: center;
      background: $color-background-d;
      font-family: Helvetica;
      .item {
        padding: 3px;
        line-height: 1;
        color: $color-text-l;
        font-size: $font-size-small;
        &.current {
          color: $color-theme;
        }
      }
    }
    .list-fixed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      .fixed-title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: $font-size-small;
        color: $color-text-l;
        background: $color-highlight-background;
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
