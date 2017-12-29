<template>
  <scroll ref="scroll" class="suggest" :data="result" @scrollToEnd="searchMore" :pullup="pullup" @beforeScroll="listScroll" :beforeScroll="beforeScroll">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="(item,index) in result" v-if="!(item.type&&index!==0)" @click="selectItem(item)">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getText(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore"></loading>
    </ul>
    <div class="no-result-wrapper" v-show="!hasMore&&!result.length">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
  import {getSearch} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import NoResult from 'base/no-result/no-result'
  import {mapMutations, mapActions} from 'vuex'
  import Singer from 'common/js/singer'

  const PER_PAGE = 20
  const TYPE_SINGER = 'singer'

  export default {
    components: {
      Scroll,
      Loading,
      NoResult
    },
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        pageNum: 1,
        result: [],
        hasMore: true,
        pullup: true,
        beforeScroll: true
      }
    },
    watch: {
      query(newQuery) {
        this.result = []
        this.pageNum = 1
        this.hasMore = true
        this.$refs.scroll.scrollTo(0, 0)
        if (!newQuery) {
          return
        }
        this.search(newQuery)
      }
    },
    methods: {
      search(query) {
        getSearch(query, PER_PAGE, this.pageNum, this.showSinger).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this.result.concat(this._normalize(res.data))
            this._checkMore(res.data)
          }
        })
      },
      searchMore() {
        if (!this.hasMore) {
          return
        }
        this.pageNum++
        this.search(this.query)
      },
      getIconCls(item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getText(item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      listScroll() {
        this.$emit('listScroll')
      },
      selectItem(item) {
        if (item.type === TYPE_SINGER) {
          let singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
          this.$router.push({
            path: `/search/${singer.id}`
          })
          this.setSinger(singer)
        } else {
          this.insertSong(item)
        }
        this.$emit('select', item)
      },
      refresh() {
        this.$refs.scroll.refresh()
      },
      _checkMore(data) {
        const song = data.song
        if (!song.list.length || (song.curnum * song.curpage) >= song.totalnum) {
          this.hasMore = false
        }
      },
      _normalize(data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        return ret.concat(this._normalizeSongs(data.song.list))
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          ret.push(createSong(musicData))
        })
        return ret
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ])
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "~common/sass/variable";
  @import "~common/sass/mixin";

  .suggest {
    height: 100%;
    overflow: hidden;
    .suggest-list {
      padding: 0 30px;
      .suggest-item {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        .icon {
          flex: 0 0 30px;
          width: 30px;
          [class^="icon-"] {
            font-size: 14px;
            color: $color-text-d;
          }
        }
        .name {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-d;
          overflow: hidden;
          .text {
            @include no-wrap();
          }
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