<template>
  <div class="progress-bar" ref="progressBar" @click="straightToggle">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
          @touchstart.prevent="progressTourchStart"
          @touchmove.prevent="progressTourchMove"
          @touchend="progressTourchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {prefixStyle} from 'common/js/dom'

  const transform = prefixStyle('transform')
  const BTN_WIDTH = 16

  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.touch = {}
    },
    watch: {
      percent(newVal) {
        if (newVal >= 0) {
          let offsetWidth = (this.$refs.progressBar.clientWidth - BTN_WIDTH) * newVal
          this._setOffset(offsetWidth)
        }
      }
    },
    methods: {
      progressTourchStart(e) {
        this.touch.initialed = true
        this.touch.startX = e.touches[0].pageX
        this.touch.progress = this.$refs.progress.clientWidth
      },
      progressTourchMove(e) {
        if (!this.touch.initialed) {
          return
        }
        let delta = e.touches[0].pageX - this.touch.startX
        let offsetWidth = Math.min(this.$refs.progressBar.clientWidth - BTN_WIDTH, Math.max(0, this.touch.progress + delta))
        this._setOffset(offsetWidth)
      },
      progressTourchEnd() {
        this.touch.initialed = false
        this._triggerPercent()
      },
      straightToggle(e) {
        let rect = this.$refs.progressBar.getBoundingClientRect()
        let offsetWidth = e.pageX - rect.left
        this._setOffset(offsetWidth)
        this._triggerPercent()
      },
      _triggerPercent() {
        let barWidth = this.$refs.progressBar.clientWidth - BTN_WIDTH
        let percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('changePercent', percent)
      },
      _setOffset(offset) {
        this.$refs.progress.style.width = `${offset}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${offset}px,0,0)`
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/sass/variable";

  .progress-bar {
    height: 30px;
    .bar-inner {
      position: relative;
      top: 13px;
      height: 4px;
      background: rgba(0, 0, 0, 0.3);
      .progress {
        position: absolute;
        height: 100%;
        background: $color-theme;
      }
      .progress-btn-wrapper {
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;
        .progress-btn {
          position: relative;
          top: 7px;
          left: 7px;
          box-sizing: border-box;
          width: 16px;
          height: 16px;
          border: 3px solid $color-text;
          border-radius: 50%;
          background: $color-theme;
        }
      }
    }
  }
</style>