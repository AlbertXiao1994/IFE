<template>
  <span :class="classMap[type]" class="icon"></span>
</template>

<script>
export default {
  props: {
    type: {
      type: Number
    }
  },
  data () {
    return {
      classMap: []
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.icon {
  display: inline-block;
  width: 16px;
  height: 16px;
}
.decrease {
  background: url('./decrease_2@2x.png') no-repeat;
  background-size: 100% 100%;
}
.discount {
  background: url('./discount_2@2x.png') no-repeat;
  background-size: 100% 100%;
}
.special {
  background: url('./special_2@2x.png') no-repeat;
  background-size: 100% 100%;
}
.invoice {
  background: url('./invoice_2@2x.png') no-repeat;
  background-size: 100% 100%;
}
.guarantee {
  background: url('./guarantee_2@2x.png') no-repeat;
  background-size: 100% 100%;
}
</style>
