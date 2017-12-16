<template>
  <div class="star">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
const LEN = 5

export default {
  props: {
    score: {
      type: Number
    }
  },
  computed: {
    itemClasses () {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push('on')
      }
      if (hasDecimal) {
        result.push('half')
      }
      while (result.length < LEN) {
        result.push('off')
      }
      return result
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.star {
  font-size: 0;
}
.star-item {
  display: inline-block;
  width: 20px;
  height: 19px;
  margin-right: 12px;
}
.star-item:last-child {
  margin-right: 0;
}
.on {
  background: url('./star48_on@2x.png') no-repeat;
  background-size: 100% 100%;
}
.half {
  background: url('./star48_half@2x.png') no-repeat;
  background-size: 100% 100%;
}
.off {
  background: url('./star48_off@2x.png') no-repeat;
  background-size: 100% 100%;
}
</style>
