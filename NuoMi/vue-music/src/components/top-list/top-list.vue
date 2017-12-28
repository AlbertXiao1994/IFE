<template>
  <transition name="slide">
    <music-list :bg-image="bgImage" :title="title" :songs="songs" :rank="rank"></music-list>
  </transition>
</template>

<script>
  import {ERR_OK} from 'api/config'
  import { mapGetters } from 'vuex'
  import {createSong} from 'common/js/song'
  import MusicList from 'components/music-list/music-list'
  import {getClassifiedTop} from 'api/rank'

  export default {
    components: {
      MusicList
    },
    computed: {
      bgImage() {
        if (this.songs.length) {
          return this.songs[0].image
        } else {
          return ''
        }
      },
      title() {
        return this.topList.ListName
      },
      ...mapGetters([
        'topList'
      ])
    },
    data() {
      return {
        songs: [],
        rank: true
      }
    },
    created() {
      this._getClassifiedTop()
    },
    methods: {
      _getClassifiedTop() {
        if (!this.topList.topID) {
          this.$router.push({
            path: '/rank'
          })
          return
        }
        getClassifiedTop(this.topList.topID).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.songlist)
          }
        }, (err) => {
          console.log(err)
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let musicData = item.data
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
