<template>
  <transition name="slide">
    <music-list :bg-image="bgImage" :title="title" :songs="songs"></music-list>
  </transition>
</template>

<script>
  import {getDiscDetail} from 'api/disc'
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
        return this.disc.imgurl
      },
      title() {
        return this.disc.dissname
      },
      ...mapGetters([
        'disc'
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getDiscDetail()
    },
    methods: {
      _getDiscDetail() {
        if (!this.disc.dissid) {
          this.$router.push({
            path: '/recommend'
          })
          return
        }
        getDiscDetail(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
            // console.log(res.cdlist[0].songlist)
          }
        }, (err) => {
          console.log(err)
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          ret.push(createSong(item))
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
