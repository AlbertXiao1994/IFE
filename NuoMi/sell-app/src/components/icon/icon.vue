<template>
  <div class="icon">
    <span :class="classMap[item.type]"></span>
  </div>
</template>

<script>
export default {
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
