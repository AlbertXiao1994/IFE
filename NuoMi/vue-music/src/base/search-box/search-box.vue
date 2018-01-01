<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="input" class="box" v-model="query" :placeholder="placeholder"/>
    <i class="icon-dismiss" @click="clear" v-show="query"></i>
  </div>
</template>

<script>
  import {debounce} from 'common/js/util'

  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    created() {
      this.$watch('query', debounce((newVal) => {
        this.$emit('query', newVal)
      }, 200))
    },
    data() {
      return {
        query: ''
      }
    },
    methods: {
      clear() {
        this.query = ''
      },
      setQuery(newVal) {
        this.query = newVal
      },
      blur() {
        this.$refs.input.blur()
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/sass/variable";

  .search-box {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 6px;
    height: 40px;
    background: $color-highlight-background;
    border-radius: 6px;
    .icon-search {
      font-size: 24px;
      color: $color-background;
    }
    .box {
      flex: 1;
      margin: 0 5px;
      line-height: 18px;
      background: $color-highlight-background;
      color: $color-text;
      font-size: $font-size-medium;
      outline: none;
      &::placeholder {
        color: $color-text-d;
      }
    }
    .icon-dismiss {
      font-size: 16px;
      color: $color-background;
    }
  }
</style>