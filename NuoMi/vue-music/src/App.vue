<template>
  <div id="app">
    <m-header></m-header>
    hello world
  </div>
</template>

<script>
import mHeader from 'components/m-header/m-header'

export default {
  components: {
    mHeader
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import "common/sass/variable";

	#app {
		color: $color-theme;
	}
</style>
