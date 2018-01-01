<template>
  <transition name="slide">
    <music-list :bg-image="bgImage" :title="title" :songs="songs"></music-list>
  </transition>
</template>

<script>
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import { mapGetters } from 'vuex'
  import {createSong} from 'common/js/song'
  import MusicList from 'components/music-list/music-list'

  export default {
    components: {
      MusicList
    },
    computed: {
      bgImage() {
        return this.singer.avatar_m
      },
      title() {
        return this.singer.name
      },
      ...mapGetters([
        'singer'
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getSingerDetail()
    },
    methods: {
      _getSingerDetail() {
        if (!this.singer.id) {
          this.$router.push({
            path: '/singer'
          })
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
            // console.log(this.songs)
          }
        }, (err) => {
          console.log(err)
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          ret.push(createSong(musicData))
        })
        return ret
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import '~common/sass/variable';

  .slide-enter-active,.slide-leave-active {
    transition: all 0.5s;
  }
  .slide-enter,.slide-leave-to {
    transform: translate3d(100%,0,0);
  }
</style>
